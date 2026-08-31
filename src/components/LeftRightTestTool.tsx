import React, { useState, useEffect } from 'react';
import { ChannelSide } from '../types';
import { audioEngine } from '../lib/audioEngine';
import { analytics } from '../lib/analytics';
import { Headphones, Play, Square, Volume2, ArrowLeft, ArrowRight, RotateCw, CheckCircle2 } from 'lucide-react';

export const LeftRightTestTool: React.FC = () => {
  const [activeSide, setActiveSide] = useState<ChannelSide>('both');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [panValue, setPanValue] = useState<number>(0);

  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  const handlePlaySide = async (side: ChannelSide) => {
    await audioEngine.resume();
    setActiveSide(side);
    setIsPlaying(true);

    if (side === 'left') setPanValue(-1);
    else if (side === 'right') setPanValue(1);
    else if (side === 'both') setPanValue(0);

    audioEngine.playChannelTest(side);
    analytics.track('channel_test_started', { side });
  };

  const handlePanSliderChange = (val: number) => {
    setPanValue(val);
    audioEngine.setPan(val);
    if (!isPlaying) {
      handlePlaySide('both');
    }
  };

  const handleStop = () => {
    audioEngine.stop();
    setIsPlaying(false);
    analytics.track('channel_test_stopped');
  };

  return (
    <div id="left-right-audio-tool" className="w-full max-w-3xl mx-auto space-y-6">
      <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/60">
            <Headphones className="w-3.5 h-3.5 text-indigo-400" />
            Stereo Channel & Balance Diagnostic
          </span>
          <span className="text-xs text-slate-400">
            Supports Speakers, Earbuds & Headphones
          </span>
        </div>

        {/* Interactive Visual Stereo Headstage */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm flex items-center justify-between mb-4">
            {/* Left Channel Indicator */}
            <div
              className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${
                isPlaying && (activeSide === 'left' || panValue < -0.2 || activeSide === 'both' || activeSide === 'alternate')
                  ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/20 scale-105'
                  : 'bg-slate-900/60 border-slate-800 text-slate-500'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center mb-2 border border-slate-800">
                <ArrowLeft className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-sm tracking-wider">LEFT (L)</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Left Ear / Speaker</span>
            </div>

            {/* Center Headset Icon */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-inner text-indigo-400">
                <Headphones className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-mono text-slate-400 mt-2">
                Pan: {panValue === 0 ? 'Center' : panValue < 0 ? `L ${Math.round(Math.abs(panValue) * 100)}%` : `R ${Math.round(panValue * 100)}%`}
              </span>
            </div>

            {/* Right Channel Indicator */}
            <div
              className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${
                isPlaying && (activeSide === 'right' || panValue > 0.2 || activeSide === 'both' || activeSide === 'alternate')
                  ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/20 scale-105'
                  : 'bg-slate-900/60 border-slate-800 text-slate-500'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center mb-2 border border-slate-800">
                <ArrowRight className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-sm tracking-wider">RIGHT (R)</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Right Ear / Speaker</span>
            </div>
          </div>

          {/* Pan Slider */}
          <div className="w-full max-w-sm mt-3">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>Full Left (-1.0)</span>
              <button
                onClick={() => handlePanSliderChange(0)}
                className="text-[10px] text-indigo-400 hover:underline"
              >
                Reset Center
              </button>
              <span>Full Right (+1.0)</span>
            </div>
            <input
              id="stereo-pan-slider"
              type="range"
              min="-1"
              max="1"
              step="0.05"
              value={panValue}
              onChange={(e) => handlePanSliderChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            />
          </div>
        </div>

        {/* Channel Selection Buttons */}
        <div className="mt-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Select Channel Output Test
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              id="test-left-channel-btn"
              onClick={() => handlePlaySide('left')}
              className={`p-3.5 rounded-xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1.5 ${
                isPlaying && activeSide === 'left'
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Left Only (L)</span>
            </button>

            <button
              id="test-right-channel-btn"
              onClick={() => handlePlaySide('right')}
              className={`p-3.5 rounded-xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1.5 ${
                isPlaying && activeSide === 'right'
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
              <span>Right Only (R)</span>
            </button>

            <button
              id="test-both-channels-btn"
              onClick={() => handlePlaySide('both')}
              className={`p-3.5 rounded-xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1.5 ${
                isPlaying && activeSide === 'both'
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>Both (Stereo Center)</span>
            </button>

            <button
              id="test-alternate-channels-btn"
              onClick={() => handlePlaySide('alternate')}
              className={`p-3.5 rounded-xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-1.5 ${
                isPlaying && activeSide === 'alternate'
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'
              }`}
            >
              <RotateCw className="w-4 h-4" />
              <span>Alternating (Ping-Pong)</span>
            </button>
          </div>
        </div>

        {/* Master Stop Button */}
        {isPlaying && (
          <div className="mt-6 flex justify-center">
            <button
              id="stop-lr-test-btn"
              onClick={handleStop}
              className="py-3 px-8 rounded-xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Stop Audio Test</span>
            </button>
          </div>
        )}
      </div>

      {/* Troubleshooting tips */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
        <h3 className="text-sm font-bold text-white mb-3">
          Stereo Audio Diagnostics Tips
        </h3>
        <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <span>
              <strong>Mono Audio Setting:</strong> If sound comes out of both speakers when testing "Left Only", check if your device has <code className="text-slate-200 bg-slate-950 px-1 py-0.5 rounded">Mono Audio</code> enabled in Accessibility Settings.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <span>
              <strong>Earpiece Receiver vs Bottom Speaker:</strong> On iPhones and modern Android phones, the top earpiece handles one stereo channel while the bottom port handles the other. Make sure both sides sound equally loud.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
