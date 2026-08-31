/**
 * Web Audio Engine for CleanMySpeaker
 * Handles precision tone synthesis, frequency sweeping, pulsing LFOs,
 * stereo channel panning, and live spectrum/waveform analysis.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;

  // Active nodes for current playback session
  private activeOscillators: OscillatorNode[] = [];
  private activeGains: GainNode[] = [];
  private activePanners: StereoPannerNode[] = [];
  private activeIntervals: number[] = [];
  private activeTimeouts: number[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;

  private isRunning: boolean = false;
  private currentMode: string | null = null;
  private currentVolume: number = 0.8;

  /**
   * Initializes or returns the AudioContext and the master gain/analyser graph
   */
  public initContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }

    // Set up Master Audio Graph: [Sources] -> MasterGain -> Analyser -> Destination
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }

    if (!this.analyser && this.ctx && this.masterGain) {
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      // Connect master gain to analyser, and analyser to speakers
      this.masterGain.disconnect();
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch((err) => {
        console.warn('AudioContext resume failed:', err);
      });
    }

    return this.ctx;
  }

  /**
   * Unlocks and resumes the AudioContext synchronously within user gestures
   */
  public async resume(): Promise<void> {
    const ctx = this.initContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    // Also create a tiny silent buffer to guarantee iOS/Safari audio pipeline unblocks
    try {
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch {
      // Ignore if silent buffer fails
    }
  }

  public getAnalyser(): AnalyserNode | null {
    this.initContext();
    return this.analyser;
  }

  public setMasterVolume(val: number): void {
    const clamped = Math.max(0.01, Math.min(1.0, val));
    this.currentVolume = clamped;
    if (!this.masterGain || !this.ctx) return;
    try {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.02);
    } catch {
      this.masterGain.gain.value = clamped;
    }
  }

  public setPan(panValue: number): void {
    if (!this.ctx) return;
    const clamped = Math.max(-1, Math.min(1, panValue));
    this.activePanners.forEach((p) => {
      try {
        p.pan.setTargetAtTime(clamped, this.ctx!.currentTime, 0.02);
      } catch {
        p.pan.value = clamped;
      }
    });
  }

  /**
   * Stops all currently playing sound immediately without interfering with subsequent tones
   */
  public stop(): void {
    this.isRunning = false;
    this.currentMode = null;

    // Clear active timers
    this.activeIntervals.forEach((id) => window.clearInterval(id));
    this.activeIntervals = [];
    this.activeTimeouts.forEach((id) => window.clearTimeout(id));
    this.activeTimeouts = [];

    // Capture existing nodes to stop cleanly
    const oscsToStop = [...this.activeOscillators];
    const gainsToStop = [...this.activeGains];
    const pannersToStop = [...this.activePanners];
    const noiseToStop = this.noiseNode;

    // Reset instance references immediately so new sounds won't be killed
    this.activeOscillators = [];
    this.activeGains = [];
    this.activePanners = [];
    this.noiseNode = null;

    if (this.ctx && this.ctx.state !== 'closed') {
      const now = this.ctx.currentTime;
      gainsToStop.forEach((g) => {
        try {
          g.gain.cancelScheduledValues(now);
          g.gain.setValueAtTime(g.gain.value, now);
          g.gain.linearRampToValueAtTime(0.0001, now + 0.02);
        } catch {
          // Ignore
        }
      });
    }

    // Safely disconnect old nodes after quick fade-out
    setTimeout(() => {
      oscsToStop.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore
        }
      });

      gainsToStop.forEach((g) => {
        try {
          g.disconnect();
        } catch {
          // Ignore
        }
      });

      pannersToStop.forEach((p) => {
        try {
          p.disconnect();
        } catch {
          // Ignore
        }
      });

      if (noiseToStop) {
        try {
          noiseToStop.stop();
          noiseToStop.disconnect();
        } catch {
          // Ignore
        }
      }
    }, 30);
  }

  /**
   * Plays a clean continuous pure tone with smooth fade-in
   */
  public playTone(freq: number, waveType: OscillatorType = 'sine', pan = 0): void {
    this.stop();
    const ctx = this.initContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    this.isRunning = true;
    this.currentMode = `tone-${freq}`;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Fade in
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.75, ctx.currentTime + 0.04);

    if (ctx.createStereoPanner) {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(pan, ctx.currentTime);
      osc.connect(gainNode);
      gainNode.connect(panner);
      panner.connect(this.masterGain!);
      this.activePanners.push(panner);
    } else {
      osc.connect(gainNode);
      gainNode.connect(this.masterGain!);
    }

    osc.start();
    this.activeOscillators.push(osc);
    this.activeGains.push(gainNode);
  }

  /**
   * Water Ejection acoustic pulse pattern:
   * 165Hz base tone with high-amplitude 8Hz pulsing and periodic sub-bass bursts
   * specifically engineered to move the speaker diaphragm with maximum air displacement.
   */
  public playWaterEject(): void {
    this.stop();
    const ctx = this.initContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    this.isRunning = true;
    this.currentMode = 'water-eject';

    // Primary carrier oscillator (165 Hz - acoustic resonance sweet spot for small phone speakers)
    const carrier = ctx.createOscillator();
    carrier.type = 'sawtooth'; // Rich harmonic content to push physical air
    carrier.frequency.setValueAtTime(165, ctx.currentTime);

    // Sub-harmonic vibrator (55 Hz)
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(55, ctx.currentTime);

    // Modulating LFO for sharp acoustic pulsation (8 Hz)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'square';
    lfo.frequency.setValueAtTime(8, ctx.currentTime);

    const voiceGain = ctx.createGain();
    voiceGain.gain.setValueAtTime(0.01, ctx.currentTime);
    voiceGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.05);

    // Connect LFO to voice gain for pulsed bursts
    lfoGain.gain.setValueAtTime(0.4, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(voiceGain.gain);

    carrier.connect(voiceGain);
    subOsc.connect(voiceGain);
    voiceGain.connect(this.masterGain!);

    carrier.start();
    subOsc.start();
    lfo.start();

    this.activeOscillators.push(carrier, subOsc, lfo);
    this.activeGains.push(voiceGain, lfoGain);

    // Periodic sweep modulation to push trapped liquid across micro-mesh pores
    let cycle = 0;
    const interval = window.setInterval(() => {
      if (!this.isRunning || !this.ctx) return;
      cycle++;
      const now = this.ctx.currentTime;
      if (cycle % 4 === 0) {
        // Sudden upward sweep then drop back to create pressure wave
        try {
          carrier.frequency.cancelScheduledValues(now);
          carrier.frequency.setValueAtTime(165, now);
          carrier.frequency.exponentialRampToValueAtTime(320, now + 0.25);
          carrier.frequency.exponentialRampToValueAtTime(165, now + 0.5);
        } catch {
          // Ignore
        }
      }
    }, 1000);

    this.activeIntervals.push(interval);
  }

  /**
   * Cleaner Presets
   */
  public playCleanerPreset(presetId: 'deep' | 'pulse' | 'sweep' | 'vibrate' | 'gentle'): void {
    this.stop();
    const ctx = this.initContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    this.isRunning = true;
    this.currentMode = presetId;

    switch (presetId) {
      case 'deep': {
        // 165Hz Acoustic Pulse with 6Hz square pulse
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const mainGain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(165, ctx.currentTime);

        lfo.type = 'square';
        lfo.frequency.setValueAtTime(6, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.45, ctx.currentTime);

        mainGain.gain.setValueAtTime(0.01, ctx.currentTime);
        mainGain.gain.linearRampToValueAtTime(0.75, ctx.currentTime + 0.05);

        lfo.connect(lfoGain);
        lfoGain.connect(mainGain.gain);
        osc.connect(mainGain);
        mainGain.connect(this.masterGain!);

        osc.start();
        lfo.start();
        this.activeOscillators.push(osc, lfo);
        this.activeGains.push(mainGain, lfoGain);
        break;
      }

      case 'pulse': {
        // High/low alternating resonance: 150Hz to 440Hz fast alternation
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.05);

        osc.connect(gainNode);
        gainNode.connect(this.masterGain!);
        osc.start();

        this.activeOscillators.push(osc);
        this.activeGains.push(gainNode);

        let high = false;
        const interval = window.setInterval(() => {
          if (!this.isRunning || !this.ctx) return;
          high = !high;
          const now = this.ctx.currentTime;
          try {
            osc.frequency.setTargetAtTime(high ? 420 : 160, now, 0.03);
          } catch {
            // Ignore
          }
        }, 180);
        this.activeIntervals.push(interval);
        break;
      }

      case 'sweep': {
        // Continuous upward & downward frequency sweep (120Hz - 2200Hz)
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.05);

        osc.connect(gainNode);
        gainNode.connect(this.masterGain!);
        osc.start();

        this.activeOscillators.push(osc);
        this.activeGains.push(gainNode);

        let goingUp = true;
        const sweepLoop = () => {
          if (!this.isRunning || !this.ctx) return;
          const now = this.ctx.currentTime;
          const targetHz = goingUp ? 2200 : 120;
          try {
            osc.frequency.cancelScheduledValues(now);
            osc.frequency.setValueAtTime(osc.frequency.value, now);
            osc.frequency.exponentialRampToValueAtTime(targetHz, now + 2.4);
          } catch {
            // Ignore
          }
          goingUp = !goingUp;
        };

        sweepLoop();
        const interval = window.setInterval(sweepLoop, 2500);
        this.activeIntervals.push(interval);
        break;
      }

      case 'vibrate': {
        // Low-frequency physical diaphragm thumper (65Hz - 90Hz)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(65, ctx.currentTime);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(70, ctx.currentTime); // Creates 5Hz acoustic beating

        gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.85, ctx.currentTime + 0.05);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(this.masterGain!);

        osc1.start();
        osc2.start();

        this.activeOscillators.push(osc1, osc2);
        this.activeGains.push(gainNode);
        break;
      }

      case 'gentle': {
        // Softer harmonic cycle for delicate or vintage speakers
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(250, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.1);

        osc.connect(gainNode);
        gainNode.connect(this.masterGain!);
        osc.start();

        this.activeOscillators.push(osc);
        this.activeGains.push(gainNode);

        let step = 0;
        const freqs = [250, 320, 440, 350, 200];
        const interval = window.setInterval(() => {
          if (!this.isRunning || !this.ctx) return;
          step = (step + 1) % freqs.length;
          try {
            osc.frequency.setTargetAtTime(freqs[step], this.ctx!.currentTime, 0.15);
          } catch {
            // Ignore
          }
        }, 1200);
        this.activeIntervals.push(interval);
        break;
      }
    }
  }

  /**
   * Continuous full-range sweep test from startHz to endHz over durationSec
   */
  public playSweepTest(
    startHz: number,
    endHz: number,
    durationSec: number,
    onProgress?: (progress: number, currentHz: number) => void
  ): void {
    this.stop();
    const ctx = this.initContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    this.isRunning = true;
    this.currentMode = 'sweep-test';

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(Math.max(20, startHz), now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endHz), now + durationSec);

    gainNode.gain.setValueAtTime(0.01, now);
    gainNode.gain.linearRampToValueAtTime(0.7, now + 0.05);
    gainNode.gain.setValueAtTime(0.7, now + durationSec - 0.1);
    gainNode.gain.linearRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gainNode);
    gainNode.connect(this.masterGain!);

    osc.start(now);
    osc.stop(now + durationSec);

    this.activeOscillators.push(osc);
    this.activeGains.push(gainNode);

    // Progress updates
    const startTime = Date.now();
    const totalMs = durationSec * 1000;
    const interval = window.setInterval(() => {
      if (!this.isRunning) {
        clearInterval(interval);
        return;
      }
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / totalMs);
      const currentHz = startHz * Math.pow(endHz / startHz, progress);
      onProgress?.(progress, Math.round(currentHz));

      if (progress >= 1) {
        clearInterval(interval);
        this.stop();
      }
    }, 50);

    this.activeIntervals.push(interval);
  }

  /**
   * Stereo Channel Test (Left, Right, Alternating, or Both)
   */
  public playChannelTest(side: 'left' | 'right' | 'alternate' | 'both'): void {
    this.stop();
    const ctx = this.initContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    this.isRunning = true;
    this.currentMode = `channel-${side}`;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.05);

    if (ctx.createStereoPanner) {
      const panner = ctx.createStereoPanner();
      let initialPan = 0;
      if (side === 'left') initialPan = -1;
      else if (side === 'right') initialPan = 1;
      else if (side === 'both') initialPan = 0;
      else if (side === 'alternate') initialPan = -1;

      panner.pan.setValueAtTime(initialPan, ctx.currentTime);
      osc.connect(gainNode);
      gainNode.connect(panner);
      panner.connect(this.masterGain!);
      this.activePanners.push(panner);

      if (side === 'alternate') {
        let isLeft = true;
        const interval = window.setInterval(() => {
          if (!this.isRunning || !this.ctx) return;
          isLeft = !isLeft;
          try {
            panner.pan.setTargetAtTime(isLeft ? -1 : 1, this.ctx.currentTime, 0.03);
            osc.frequency.setTargetAtTime(isLeft ? 440 : 880, this.ctx.currentTime, 0.02);
          } catch {
            // Ignore
          }
        }, 1000);
        this.activeIntervals.push(interval);
      }
    } else {
      osc.connect(gainNode);
      gainNode.connect(this.masterGain!);
    }

    osc.start();
    this.activeOscillators.push(osc);
    this.activeGains.push(gainNode);
  }

  /**
   * Pink Noise generator for volume & distortion assessment
   */
  public playPinkNoise(): void {
    this.stop();
    const ctx = this.initContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    this.isRunning = true;
    this.currentMode = 'pink-noise';

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.153852;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.15; // Gain normalization
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.05);

    whiteNoise.connect(gainNode);
    gainNode.connect(this.masterGain!);

    whiteNoise.start();
    this.noiseNode = whiteNoise;
    this.activeGains.push(gainNode);
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  public getCurrentMode(): string | null {
    return this.currentMode;
  }
}

export const audioEngine = new AudioEngine();
