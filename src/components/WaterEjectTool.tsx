import React, { useState, useEffect, useRef } from 'react';
import { audioEngine } from '../lib/audioEngine';
import { analytics } from '../lib/analytics';
import { cleaningHistory } from '../lib/cleaningHistory';
import { viralGrowthEngine } from '../lib/viralGrowthEngine';
import { haptic } from '../lib/haptics';
import { triggerConfetti } from '../lib/confetti';
import { SpeakerVisualizer } from './SpeakerVisualizer';
import { Droplets, Play, Square, Pause, AlertTriangle, ShieldCheck, ArrowDown, HelpCircle, CheckCircle2, RotateCcw, Share2 } from 'lucide-react';

interface WaterEjectToolProps {
  onNavigateToCleaner?: () => void;
  onNavigateToTest?: () => void;
}

export const WaterEjectTool: React.FC<WaterEjectToolProps> = ({
  onNavigateToCleaner,
  onNavigateToTest,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [duration, setDuration] = useState<number>(30);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [ejectCycleCount, setEjectCycleCount] = useState<number>(0);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      audioEngine.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStart = async () => {
    haptic.start();
    await audioEngine.resume();
    setIsCompleted(false);
    setIsPaused(false);
    setIsPlaying(true);

    audioEngine.setMasterVolume(0.8);
    audioEngine.playWaterEject();
    analytics.track('water_eject_started', { duration, cycle: ejectCycleCount + 1 });

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          audioEngine.stop();
          setIsPlaying(false);
          setIsPaused(false);
          setIsCompleted(true);
          setEjectCycleCount((c) => c + 1);
          haptic.success();
          triggerConfetti({ particleCount: 85, originY: 0.55 });
          analytics.track('water_eject_completed', { duration });
          cleaningHistory.recordSession({
            toolType: 'water-eject',
            modeName: '165Hz Water Ejection',
            durationSeconds: duration,
          });
          return duration;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePause = () => {
    haptic.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    audioEngine.stop();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleResume = async () => {
    haptic.start();
    await audioEngine.resume();
    setIsPlaying(true);
    setIsPaused(false);
    audioEngine.playWaterEject();

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          audioEngine.stop();
          setIsPlaying(false);
          setIsPaused(false);
          setIsCompleted(true);
          setEjectCycleCount((c) => c + 1);
          haptic.success();
          triggerConfetti({ particleCount: 85, originY: 0.55 });
          analytics.track('water_eject_completed', { duration });
          cleaningHistory.recordSession({
            toolType: 'water-eject',
            modeName: '165Hz Water Ejection',
            durationSeconds: duration,
          });
          return duration;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStop = () => {
    haptic.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    audioEngine.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setTimeLeft(duration);
    analytics.track('water_eject_stopped');
  };

  const progressPercentage = ((duration - timeLeft) / duration) * 100;

  return (
    <div id="water-eject-tool" className="w-full max-w-3xl mx-auto space-y-6">
      {/* Tool Container */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-blue-900/40 p-5 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800/60">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              165Hz Hydro-Acoustic Pulse
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Surface Tension Breaker
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
            <button
              id="water-duration-30s-btn"
              disabled={isPlaying}
              onClick={() => {
                setDuration(30);
                setTimeLeft(30);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                duration === 30
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              30s
            </button>
            <button
              id="water-duration-60s-btn"
              disabled={isPlaying}
              onClick={() => {
                setDuration(60);
                setTimeLeft(60);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                duration === 60
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              60s
            </button>
          </div>
        </div>

        {/* Visualizer */}
        <div className="py-2 flex flex-col items-center justify-center">
          <SpeakerVisualizer
            isPlaying={isPlaying}
            mode="water-eject"
            showDroplets={true}
          />

          {/* Countdown Display */}
          <div className="mt-4 text-center">
            <span className="font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
              {String(timeLeft % 60).padStart(2, '0')}
            </span>
            <p className="text-xs sm:text-sm text-blue-300 font-medium mt-1">
              {isPlaying
                ? 'Ejecting Water: High-Displacement Resonant Pulse (165 Hz)'
                : isPaused
                ? 'Water Ejection Paused'
                : isCompleted
                ? `Cycle #${ejectCycleCount} Complete! Wipe speaker area now.`
                : 'Turn phone speaker facing down and tap Start'}
            </p>
          </div>

          {/* Active Water Eject Cycle Progress Bar */}
          <div className="w-full max-w-lg mt-5 p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isPlaying
                      ? 'bg-blue-400 animate-ping'
                      : isPaused
                      ? 'bg-amber-400'
                      : isCompleted
                      ? 'bg-emerald-400'
                      : 'bg-slate-600'
                  }`}
                />
                <span className="text-slate-200">
                  {isPlaying
                    ? 'Active Water Expulsion'
                    : isPaused
                    ? 'Ejection Paused'
                    : isCompleted
                    ? 'Ejection Complete'
                    : 'Water Ejection Progress'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-blue-300 font-bold">
                  {Math.round(progressPercentage)}%
                </span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-slate-300 font-medium">
                  <strong className="text-blue-300">{timeLeft}s</strong> remaining
                </span>
              </div>
            </div>

            <div
              className="relative w-full bg-slate-900 rounded-full h-3.5 overflow-hidden border border-slate-800/80 p-0.5"
              role="progressbar"
              aria-valuenow={Math.round(progressPercentage)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Water ejection remaining time"
            >
              <div
                className="relative bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-300 h-full rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                style={{ width: `${progressPercentage}%` }}
              >
                {isPlaying && (
                  <div className="absolute inset-0 bg-white/25 animate-pulse rounded-full" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-0.5">
              <span>Elapsed: {duration - timeLeft}s of {duration}s</span>
              <span className="flex items-center gap-1">
                <span>Time Remaining:</span>
                <span className="font-mono font-bold text-blue-300">{timeLeft}s</span>
              </span>
            </div>

            {/* Quick 1-Tap 'Clean Again' Trigger inside Progress Bar Area */}
            {isCompleted && !isPlaying && (
              <div className="pt-2 border-t border-slate-800/80 animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  id="water-eject-clean-again-btn"
                  onClick={handleStart}
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-blue-900/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
                  title="One-tap quick restart of the water ejection tone"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clean Again (Eject Water 165Hz)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {!isPlaying && !isPaused && (
            <button
              id="start-water-eject-btn"
              onClick={handleStart}
              className="w-full sm:w-auto min-w-[280px] py-4 px-8 rounded-2xl font-extrabold text-lg sm:text-xl text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Droplets className="w-6 h-6 fill-current animate-bounce" />
              <span>START WATER EJECT</span>
            </button>
          )}

          {isPlaying && (
            <>
              <button
                id="pause-water-eject-btn"
                onClick={handlePause}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-base text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </button>
              <button
                id="stop-water-eject-btn"
                onClick={handleStop}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-base text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Square className="w-5 h-5 fill-current" />
                <span>Stop</span>
              </button>
            </>
          )}

          {isPaused && (
            <>
              <button
                id="resume-water-eject-btn"
                onClick={handleResume}
                className="w-full sm:w-auto min-w-[180px] py-3.5 px-6 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Resume</span>
              </button>
              <button
                id="reset-water-eject-btn"
                onClick={handleStop}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-base text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </>
          )}
        </div>

        {/* Safety Warning */}
        <div className="mt-8 p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold text-amber-300">Important Safety Notice:</strong>{' '}
            Do not use maximum blasting volume or hold the speaker against your ears. If your phone was fully submerged in deep water or saltwater, turn it off immediately and allow it to dry thoroughly. Never insert needles or toothpicks into wet speaker ports.
          </div>
        </div>

        {/* Completed Cycle Summary */}
        {isCompleted && (
          <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-blue-500/40 animate-in fade-in duration-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white">
                  Water Ejection Cycle #{ejectCycleCount} Completed
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Dab any liquid micro-droplets on the exterior with a microfiber cloth. If your speaker still sounds slightly muffled, wait 15 seconds and run a second cycle.
                </p>
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleStart}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors cursor-pointer"
                  >
                    Run Another Cycle
                  </button>
                  <button
                    onClick={() => viralGrowthEngine.shareNative({
                      title: 'Clean My Speaker — 165Hz Water Eject Tool',
                      text: '💦 Dropped your phone in water or coffee? Use this free 165Hz water eject sound to push droplets out of your speaker grille:',
                      url: viralGrowthEngine.getShareUrl('copy'),
                    })}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-950/40 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Water Eject Tool</span>
                  </button>
                  {onNavigateToTest && (
                    <button
                      onClick={onNavigateToTest}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 cursor-pointer"
                    >
                      Test Sound Clarity
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Visual Step-by-Step Positioning Guide */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          How to Position Your Phone for Maximum Water Ejection
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                STEP 1
              </span>
              <h4 className="text-sm font-bold text-white mt-2">Tilt Speaker Downward</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hold your smartphone vertically or at a 45° angle with the bottom speaker grille facing toward the ground so gravity helps pull droplets out.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center p-3 bg-slate-900 rounded-lg text-cyan-400">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60">
                STEP 2
              </span>
              <h4 className="text-sm font-bold text-white mt-2">Place on Microfiber Cloth</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Rest the bottom edge gently against a dry, lint-free microfiber towel to immediately absorb any ejected liquid beads.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center p-3 bg-slate-900 rounded-lg text-blue-400">
              <Droplets className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                STEP 3
              </span>
              <h4 className="text-sm font-bold text-white mt-2">Allow Full Air Dry</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                After running the tone, do not charge the phone immediately. Allow the acoustic chamber to sit in a dry, ventilated room for 1–2 hours.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center p-3 bg-slate-900 rounded-lg text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
