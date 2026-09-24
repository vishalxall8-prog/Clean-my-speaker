import React, { useState, useEffect, useRef } from 'react';
import { CleanerMode } from '../types';
import { CLEANER_PRESETS } from '../data/content';
import { audioEngine } from '../lib/audioEngine';
import { analytics } from '../lib/analytics';
import { cleaningHistory } from '../lib/cleaningHistory';
import { viralGrowthEngine } from '../lib/viralGrowthEngine';
import { haptic } from '../lib/haptics';
import { SpeakerVisualizer } from './SpeakerVisualizer';
import { Play, Pause, Square, Sparkles, AlertTriangle, CheckCircle2, RotateCcw, Volume2, ShieldAlert, Zap, Activity, Shield, Share2 } from 'lucide-react';

interface SpeakerCleanerToolProps {
  initialDuration?: number;
  initialMode?: CleanerMode;
  onNavigateToTest?: () => void;
}

export const SpeakerCleanerTool: React.FC<SpeakerCleanerToolProps> = ({
  initialDuration = 30,
  initialMode = 'deep',
  onNavigateToTest,
}) => {
  const [selectedMode, setSelectedMode] = useState<CleanerMode>(initialMode);
  const [duration, setDuration] = useState<number>(initialDuration);
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [volumeLevel, setVolumeLevel] = useState<number>(0.75);

  const timerRef = useRef<number | null>(null);

  // Sync initial duration if changed
  useEffect(() => {
    if (!isPlaying && !isPaused) {
      setTimeLeft(duration);
    }
  }, [duration, isPlaying, isPaused]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      audioEngine.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStartCleaning = async () => {
    haptic.start();
    await audioEngine.resume();
    setIsCompleted(false);
    setIsPaused(false);
    setIsPlaying(true);

    audioEngine.setMasterVolume(volumeLevel);
    audioEngine.playCleanerPreset(selectedMode);
    analytics.track('cleaner_started', { mode: selectedMode, duration, volumeLevel });

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          audioEngine.stop();
          setIsPlaying(false);
          setIsPaused(false);
          setIsCompleted(true);
          haptic.success();
          analytics.track('cleaner_completed', { mode: selectedMode, duration });
          cleaningHistory.recordSession({
            toolType: 'speaker-cleaner',
            modeName: activePreset.name,
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
    analytics.track('cleaner_paused', { timeLeft });
  };

  const handleResume = async () => {
    haptic.start();
    await audioEngine.resume();
    setIsPlaying(true);
    setIsPaused(false);
    audioEngine.setMasterVolume(volumeLevel);
    audioEngine.playCleanerPreset(selectedMode);
    analytics.track('cleaner_resumed', { timeLeft });

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          audioEngine.stop();
          setIsPlaying(false);
          setIsPaused(false);
          setIsCompleted(true);
          haptic.success();
          analytics.track('cleaner_completed', { mode: selectedMode, duration });
          cleaningHistory.recordSession({
            toolType: 'speaker-cleaner',
            modeName: activePreset.name,
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
    analytics.track('cleaner_stopped', { mode: selectedMode });
  };

  const handleModeChange = (mode: CleanerMode) => {
    haptic.light();
    setSelectedMode(mode);
    if (isPlaying) {
      audioEngine.playCleanerPreset(mode);
    }
  };

  const progressPercentage = Math.min(100, Math.max(0, ((duration - timeLeft) / duration) * 100));

  const activePreset = CLEANER_PRESETS.find((p) => p.id === selectedMode) || CLEANER_PRESETS[0];

  const getPresetIcon = (id: string) => {
    switch (id) {
      case 'deep':
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'pulse':
        return <Zap className="w-4 h-4 text-blue-400" />;
      case 'sweep':
        return <Activity className="w-4 h-4 text-emerald-400" />;
      case 'vibrate':
        return <Volume2 className="w-4 h-4 text-purple-400" />;
      case 'gentle':
        return <Shield className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div id="speaker-cleaner-tool" className="w-full max-w-3xl mx-auto">
      <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Web Audio Precision Engine
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Safe acoustic resonance
            </span>
          </div>

          {/* Quick Duration Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
            <button
              id="duration-30s-btn"
              disabled={isPlaying}
              onClick={() => {
                setDuration(30);
                setTimeLeft(30);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                duration === 30
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              30s
            </button>
            <button
              id="duration-60s-btn"
              disabled={isPlaying}
              onClick={() => {
                setDuration(60);
                setTimeLeft(60);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                duration === 60
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              60s
            </button>
            <button
              id="duration-120s-btn"
              disabled={isPlaying}
              onClick={() => {
                setDuration(120);
                setTimeLeft(120);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                duration === 120
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2m
            </button>
          </div>
        </div>

        {/* Live Visualizer Area */}
        <div className="py-2 flex flex-col items-center justify-center">
          <SpeakerVisualizer
            isPlaying={isPlaying}
            mode={selectedMode}
            showDroplets={false}
          />

          {/* Countdown & Status */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                {String(timeLeft % 60).padStart(2, '0')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-1">
              {isPlaying
                ? `Playing: ${activePreset.name} (${activePreset.baseFreq} Hz)`
                : isPaused
                ? 'Cleaning Paused'
                : isCompleted
                ? 'Cycle Completed Successfully'
                : 'Ready — Click START CLEANING below'}
            </p>
          </div>

          {/* Active Cleaning Cycle Progress Bar */}
          <div className="w-full max-w-lg mt-5 p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner space-y-2.5">
            {/* Top Progress Info */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isPlaying
                      ? 'bg-cyan-400 animate-ping'
                      : isPaused
                      ? 'bg-amber-400'
                      : isCompleted
                      ? 'bg-emerald-400'
                      : 'bg-slate-600'
                  }`}
                />
                <span className="text-slate-200">
                  {isPlaying
                    ? 'Active Cleaning Cycle'
                    : isPaused
                    ? 'Cleaning Paused'
                    : isCompleted
                    ? 'Cycle Complete'
                    : 'Cleaning Cycle Progress'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-300 font-bold">
                  {Math.round(progressPercentage)}%
                </span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-slate-300 font-medium">
                  <strong className="text-cyan-300">{timeLeft}s</strong> remaining
                </span>
              </div>
            </div>

            {/* Progress Bar Track */}
            <div
              className="relative w-full bg-slate-900 rounded-full h-3.5 overflow-hidden border border-slate-800/80 p-0.5"
              role="progressbar"
              aria-valuenow={Math.round(progressPercentage)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Speaker cleaning cycle remaining time"
            >
              <div
                className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                style={{ width: `${progressPercentage}%` }}
              >
                {/* Live shimmer effect during playback */}
                {isPlaying && (
                  <div className="absolute inset-0 bg-white/25 animate-pulse rounded-full" />
                )}
              </div>
            </div>

            {/* Bottom Meta & Remaining Time Breakdown */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-0.5">
              <span>Elapsed: {duration - timeLeft}s of {duration}s</span>
              <span className="flex items-center gap-1">
                <span>Time Remaining:</span>
                <span className="font-mono font-bold text-cyan-300">{timeLeft}s</span>
              </span>
            </div>

            {/* Quick 1-Tap 'Clean Again' Trigger inside Progress Bar Area */}
            {isCompleted && !isPlaying && (
              <div className="pt-2 border-t border-slate-800/80 animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  id="progress-bar-clean-again-btn"
                  onClick={handleStartCleaning}
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-900/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
                  title="One-tap quick restart of the 165Hz tone"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clean Again (165Hz Tone)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {!isPlaying && !isPaused && (
            <button
              id="start-cleaning-btn"
              onClick={handleStartCleaning}
              className="w-full sm:w-auto min-w-[260px] py-4 px-8 rounded-2xl font-extrabold text-lg sm:text-xl text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>START CLEANING</span>
            </button>
          )}

          {isPlaying && (
            <>
              <button
                id="pause-cleaning-btn"
                onClick={handlePause}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-base text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </button>
              <button
                id="stop-cleaning-btn"
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
                id="resume-cleaning-btn"
                onClick={handleResume}
                className="w-full sm:w-auto min-w-[180px] py-3.5 px-6 rounded-xl font-bold text-base text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-400/20"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Resume</span>
              </button>
              <button
                id="reset-cleaning-btn"
                onClick={handleStop}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-base text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </>
          )}
        </div>

        {/* Cleaning Presets Selector */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Acoustic Cleaning Mode
            </h3>
            <span className="text-[11px] text-cyan-400 font-medium">
              {activePreset.tagline}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {CLEANER_PRESETS.map((preset) => {
              const isSelected = selectedMode === preset.id;
              return (
                <button
                  key={preset.id}
                  id={`preset-btn-${preset.id}`}
                  onClick={() => handleModeChange(preset.id)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500/70 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      {getPresetIcon(preset.id)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                        {preset.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {preset.baseFreq} Hz {preset.pulseRate ? `• ${preset.pulseRate}Hz pulse` : ''}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Volume Safety & Advice Bar */}
        <div className="mt-6 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong className="text-slate-100">Volume Safety:</strong> Set device volume to 70–80%. Do NOT use maximum distorted volume or place speaker right next to your ear.
            </span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <Volume2 className="w-4 h-4 text-slate-400" />
            <input
              id="cleaner-volume-slider"
              type="range"
              min="0.2"
              max="0.85"
              step="0.05"
              value={volumeLevel}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolumeLevel(val);
                audioEngine.setMasterVolume(val);
              }}
              className="w-24 accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              aria-label="Web Audio Engine Gain Level"
            />
            <span className="text-[11px] font-mono text-slate-400">
              {Math.round(volumeLevel * 100)}%
            </span>
          </div>
        </div>

        {/* Completion Modal / Banner */}
        {isCompleted && (
          <div
            id="cleaning-completed-banner"
            className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/40 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white">
                  Cleaning Cycle Finished!
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  The acoustic resonance cycle has concluded. Hold your phone upside down and lightly brush away any dislodged dust from the speaker grille.
                </p>
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  {onNavigateToTest && (
                    <button
                      id="test-speaker-after-clean-btn"
                      onClick={onNavigateToTest}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                    >
                      Run Speaker Audio Test Now →
                    </button>
                  )}
                  <button
                    onClick={() => viralGrowthEngine.shareNative()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-950/40 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share With Friends</span>
                  </button>
                  <button
                    id="rerun-clean-btn"
                    onClick={handleStartCleaning}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 cursor-pointer"
                  >
                    Run Another Cycle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
