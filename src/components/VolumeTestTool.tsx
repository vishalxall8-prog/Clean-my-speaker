import React, { useState, useEffect } from 'react';
import { audioEngine } from '../lib/audioEngine';
import { analytics } from '../lib/analytics';
import { Sliders, Play, Square, Volume2, ShieldCheck, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const VolumeTestTool: React.FC = () => {
  const [testType, setTestType] = useState<'tone' | 'pink'>('tone');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [ladderLevel, setLadderLevel] = useState<number>(3); // 1 to 5

  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  const ladderSteps = [
    { level: 1, label: 'Whisper Quiet', gain: 0.15, desc: 'Checks low-level DAC noise floor and quiet background clarity' },
    { level: 2, label: 'Soft Normal', gain: 0.35, desc: 'Typical indoor listening level for podcasts and speech' },
    { level: 3, label: 'Optimal Standard', gain: 0.55, desc: 'Recommended baseline volume for phone speakers' },
    { level: 4, label: 'Loud & Clear', gain: 0.75, desc: 'High acoustic output to test speaker headroom' },
    { level: 5, label: 'Maximum Safe', gain: 0.85, desc: 'Capped ceiling to prevent amplifier clipping and membrane damage' },
  ];

  const handleStart = async (type: 'tone' | 'pink', stepLevel: number = ladderLevel) => {
    await audioEngine.resume();
    setTestType(type);
    setLadderLevel(stepLevel);
    setIsPlaying(true);

    const step = ladderSteps.find((s) => s.level === stepLevel) || ladderSteps[2];
    audioEngine.setMasterVolume(step.gain);

    if (type === 'tone') {
      audioEngine.playTone(1000, 'sine');
    } else {
      audioEngine.playPinkNoise();
    }

    analytics.track('volume_test_started', { type, level: stepLevel });
  };

  const handleStop = () => {
    audioEngine.stop();
    setIsPlaying(false);
    analytics.track('volume_test_stopped');
  };

  return (
    <div id="volume-test-tool" className="w-full max-w-3xl mx-auto space-y-6">
      <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800/60">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            Acoustic Volume & Clarity Assessment
          </span>
          <span className="text-xs text-slate-400">
            Safe Calibrated Decibel Ladder
          </span>
        </div>

        {/* Level Step Indicator */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-4 text-center">
            Calibrated Sound Level Ladder
          </div>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {ladderSteps.map((step) => {
              const isCurrent = ladderLevel === step.level;
              return (
                <button
                  key={step.level}
                  id={`volume-step-${step.level}`}
                  onClick={() => handleStart(testType, step.level)}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${
                    isCurrent
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-mono font-bold">Lvl {step.level}</span>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 my-1.5 overflow-hidden">
                    <div
                      className={`h-full ${isCurrent ? 'bg-amber-400' : 'bg-slate-600'}`}
                      style={{ width: `${(step.level / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] truncate max-w-full font-medium">{step.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <div className="text-xs font-bold text-slate-200">
              {ladderSteps[ladderLevel - 1]?.label} ({Math.round(ladderSteps[ladderLevel - 1]?.gain * 100)}% Gain)
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {ladderSteps[ladderLevel - 1]?.desc}
            </p>
          </div>
        </div>

        {/* Test Type Selectors */}
        <div className="mt-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Select Test Audio Signal
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              id="volume-tone-test-btn"
              onClick={() => handleStart('tone')}
              className={`p-4 rounded-xl border text-left transition-all ${
                isPlaying && testType === 'tone'
                  ? 'bg-amber-950/80 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold">1,000 Hz Speech Reference Tone</span>
              </div>
              <p className="text-xs text-slate-400">
                Standard acoustic reference frequency for testing phone ear-piece clarity and distortion.
              </p>
            </button>

            <button
              id="volume-pink-test-btn"
              onClick={() => handleStart('pink')}
              className={`p-4 rounded-xl border text-left transition-all ${
                isPlaying && testType === 'pink'
                  ? 'bg-amber-950/80 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold">Pink Noise Full-Spectrum</span>
              </div>
              <p className="text-xs text-slate-400">
                Equal energy per octave. Tests all frequencies simultaneously to check for cabinet buzzing.
              </p>
            </button>
          </div>
        </div>

        {/* Master Stop Button */}
        {isPlaying && (
          <div className="mt-6 flex justify-center">
            <button
              id="stop-volume-test-btn"
              onClick={handleStop}
              className="py-3 px-8 rounded-xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Stop Volume Test</span>
            </button>
          </div>
        )}
      </div>

      {/* Safety Instructions */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          Safe Listening & Phone Volume Guidelines
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400 leading-relaxed">
          <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
            <strong className="text-slate-200 block mb-1">Prevent Ear Fatigue:</strong>
            Do not place the phone speaker right beside your eardrum when playing test signals. Keep the phone at an arm's distance on a flat surface.
          </div>
          <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
            <strong className="text-slate-200 block mb-1">Hardware Safety Ceiling:</strong>
            Our tools implement digital headroom damping to prevent harsh clipping even if your phone amplifier is pushed to higher levels.
          </div>
        </div>
      </div>
    </div>
  );
};
