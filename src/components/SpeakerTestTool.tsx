import React, { useState, useEffect } from 'react';
import { FrequencyBand } from '../types';
import { FREQUENCY_PRESETS } from '../data/content';
import { audioEngine } from '../lib/audioEngine';
import { analytics } from '../lib/analytics';
import { Play, Square, Activity, Volume2, Sliders, Waves, Gauge, Check, Info } from 'lucide-react';

export const SpeakerTestTool: React.FC = () => {
  const [activeBand, setActiveBand] = useState<FrequencyBand>('mid');
  const [customHz, setCustomHz] = useState<number>(440);
  const [waveType, setWaveType] = useState<OscillatorType>('sine');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sweepProgress, setSweepProgress] = useState<number>(0);
  const [sweepHz, setSweepHz] = useState<number>(20);
  const [sweepDuration, setSweepDuration] = useState<number>(10);

  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  const handlePlayPreset = async (presetId: FrequencyBand) => {
    await audioEngine.resume();
    setActiveBand(presetId);

    if (presetId === 'sweep') {
      setIsPlaying(true);
      setSweepProgress(0);
      setSweepHz(20);
      analytics.track('speaker_test_sweep_started', { duration: sweepDuration });

      audioEngine.playSweepTest(20, 20000, sweepDuration, (prog, hz) => {
        setSweepProgress(prog);
        setSweepHz(hz);
        if (prog >= 1) {
          setIsPlaying(false);
          analytics.track('speaker_test_sweep_completed');
        }
      });
    } else {
      const preset = FREQUENCY_PRESETS.find((p) => p.id === presetId);
      const hz = preset ? preset.defaultHz : 440;
      setCustomHz(hz);
      setIsPlaying(true);
      analytics.track('speaker_test_tone_started', { band: presetId, hz, waveType });
      audioEngine.playTone(hz, waveType);
    }
  };

  const handleCustomHzChange = (hz: number) => {
    setCustomHz(hz);
    if (isPlaying && activeBand !== 'sweep') {
      audioEngine.playTone(hz, waveType);
    }
  };

  const handleWaveTypeChange = (type: OscillatorType) => {
    setWaveType(type);
    if (isPlaying && activeBand !== 'sweep') {
      audioEngine.playTone(customHz, type);
    }
  };

  const handleStop = () => {
    audioEngine.stop();
    setIsPlaying(false);
    setSweepProgress(0);
    analytics.track('speaker_test_stopped');
  };

  const currentPreset = FREQUENCY_PRESETS.find((p) => p.id === activeBand);

  return (
    <div id="speaker-test-tool" className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Diagnostic Board */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Full Frequency Diagnostic Suite (20 Hz – 20 kHz)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Waveform:</span>
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
              {(['sine', 'triangle', 'square', 'sawtooth'] as OscillatorType[]).map((wt) => (
                <button
                  key={wt}
                  id={`wave-btn-${wt}`}
                  onClick={() => handleWaveTypeChange(wt)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize transition-all ${
                    waveType === wt
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {wt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Frequency Readout Display */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
            {activeBand === 'sweep' ? 'Full Spectrum Sweep' : 'Active Frequency Output'}
          </div>

          <div className="flex items-baseline justify-center gap-2 my-2">
            <span className="font-mono text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
              {activeBand === 'sweep' ? sweepHz : customHz}
            </span>
            <span className="text-xl font-bold text-emerald-400 font-mono">Hz</span>
          </div>

          <div className="text-xs text-slate-400 max-w-md">
            {activeBand === 'sweep'
              ? `Sweeping from 20 Hz to 20,000 Hz (${Math.round(sweepProgress * 100)}% complete)`
              : currentPreset?.targetAcoustics || 'Real-time tone generation for speaker testing'}
          </div>

          {/* Sweep Progress Bar */}
          {activeBand === 'sweep' && (
            <div className="w-full max-w-md bg-slate-900 rounded-full h-3 mt-4 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full transition-all duration-75 rounded-full"
                style={{ width: `${sweepProgress * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Frequency Band Presets */}
        <div className="mt-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Select Test Frequency Band
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FREQUENCY_PRESETS.map((preset) => {
              const isSelected = activeBand === preset.id;
              return (
                <button
                  key={preset.id}
                  id={`freq-band-${preset.id}`}
                  onClick={() => handlePlayPreset(preset.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500/70 shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-100">{preset.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60">
                      {preset.hzRange}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full Sine Sweep CTA Box */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Logarithmic Sweep Test (20 Hz – 20,000 Hz)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                Full Spectrum
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Plays an uninterrupted glide across the entire human hearing range to reveal frequency dropouts, resonance rattling, and blown drivers.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={sweepDuration}
              onChange={(e) => setSweepDuration(parseInt(e.target.value))}
              disabled={isPlaying}
              className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-2.5 py-2 text-slate-200"
            >
              <option value={5}>5s Fast</option>
              <option value={10}>10s Standard</option>
              <option value={20}>20s Deep</option>
            </select>

            <button
              id="start-sweep-test-btn"
              onClick={() => handlePlayPreset('sweep')}
              disabled={isPlaying && activeBand === 'sweep'}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 active:scale-95 transition-all shadow-md shadow-emerald-400/20 flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Sweep Test</span>
            </button>
          </div>
        </div>

        {/* Interactive Custom Hz Slider */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Custom Frequency Slider
            </span>
            <div className="flex items-center gap-2">
              {[60, 165, 440, 1000, 4000, 10000].map((hz) => (
                <button
                  key={hz}
                  onClick={() => {
                    setActiveBand('custom');
                    handleCustomHzChange(hz);
                  }}
                  className="hidden md:inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
                >
                  {hz >= 1000 ? `${hz / 1000}k` : `${hz}`}Hz
                </button>
              ))}
            </div>
          </div>

          <input
            id="custom-freq-slider"
            type="range"
            min="20"
            max="16000"
            step="5"
            value={customHz}
            onChange={(e) => {
              setActiveBand('custom');
              handleCustomHzChange(parseInt(e.target.value));
            }}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
            <span>20 Hz (Sub-Bass)</span>
            <span>250 Hz</span>
            <span>1 kHz (Voice)</span>
            <span>4 kHz</span>
            <span>16 kHz (Treble)</span>
          </div>
        </div>

        {/* Master Control Buttons */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {!isPlaying ? (
            <button
              id="start-custom-tone-btn"
              onClick={() => handlePlayPreset(activeBand)}
              className="py-3 px-8 rounded-xl font-bold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-400/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play Active Tone</span>
            </button>
          ) : (
            <button
              id="stop-speaker-test-btn"
              onClick={handleStop}
              className="py-3 px-8 rounded-xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Stop Sound</span>
            </button>
          )}
        </div>
      </div>

      {/* Diagnostic Interpretation Guide */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-emerald-400" />
          How to Interpret Your Speaker Test Results
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-emerald-300">Clean Whistle / Pure Tone</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              If the tone sounds like a smooth, clear flute without raspy undertones, your speaker cone and voice coil are operating in healthy acoustic alignment.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-amber-300">Rattling at Specific Bass Notes</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Buzzing at 80–180 Hz usually indicates a loose external dust particle or sand grain trapped against the outer mesh. Run the 165Hz Cleaner to blow it clear.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-rose-300">Harsh Fuzz Across All Frequencies</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              A scratchy sound across both low and high frequencies suggests a warped coil or physical tear in the waterproof diaphragm, requiring hardware repair.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
