import React, { useEffect, useRef, useState } from 'react';
import { audioEngine } from '../lib/audioEngine';
import { Activity, Waves, BarChart2 } from 'lucide-react';

interface FrequencyWaveformVisualizerProps {
  isPlaying: boolean;
  frequencyHz?: number;
  waveType?: OscillatorType;
  label?: string;
}

export const FrequencyWaveformVisualizer: React.FC<FrequencyWaveformVisualizerProps> = ({
  isPlaying,
  frequencyHz = 440,
  waveType = 'sine',
  label,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timeDataRef = useRef<Uint8Array | null>(null);
  const freqDataRef = useRef<Uint8Array | null>(null);
  const [viewMode, setViewMode] = useState<'waveform' | 'spectrum'>('waveform');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let idlePhase = 0;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Background oscilloscope grid lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Horizontal center line
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      // Quarter horizontal lines
      ctx.moveTo(0, height / 4);
      ctx.lineTo(width, height / 4);
      ctx.moveTo(0, (3 * height) / 4);
      ctx.lineTo(width, (3 * height) / 4);
      // Vertical grid lines
      const gridColumns = 8;
      for (let i = 1; i < gridColumns; i++) {
        const x = (width / gridColumns) * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      ctx.stroke();

      const analyser = audioEngine.getAnalyser();

      if (isPlaying && analyser) {
        if (!timeDataRef.current || timeDataRef.current.length !== analyser.fftSize) {
          timeDataRef.current = new Uint8Array(analyser.fftSize);
        }
        if (!freqDataRef.current || freqDataRef.current.length !== analyser.frequencyBinCount) {
          freqDataRef.current = new Uint8Array(analyser.frequencyBinCount);
        }

        analyser.getByteTimeDomainData(timeDataRef.current);
        analyser.getByteFrequencyData(freqDataRef.current);

        if (viewMode === 'waveform') {
          // Render real-time audio oscilloscope waveform
          const timeData = timeDataRef.current;
          const sliceWidth = width / timeData.length;

          // Glowing under-glow
          ctx.beginPath();
          ctx.lineWidth = 3;
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.25)'; // Emerald glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#10b981';

          let x = 0;
          for (let i = 0; i < timeData.length; i++) {
            const v = timeData[i] / 128.0; // 0 to 2, 1 is center
            const y = (v * height) / 2;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          ctx.stroke();

          // Crisp primary wave stroke
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#34d399'; // Bright emerald-400
          ctx.shadowBlur = 0;

          x = 0;
          for (let i = 0; i < timeData.length; i++) {
            const v = timeData[i] / 128.0;
            const y = (v * height) / 2;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          ctx.stroke();
        } else {
          // Frequency Spectrum Bar Analyzer view
          const freqData = freqDataRef.current;
          const bufferLength = Math.min(freqData.length, 64);
          const barWidth = (width / bufferLength) * 0.8;
          const barGap = (width / bufferLength) * 0.2;

          for (let i = 0; i < bufferLength; i++) {
            const barHeight = (freqData[i] / 255) * (height - 8);
            const x = i * (barWidth + barGap) + barGap / 2;
            const y = height - barHeight;

            // Gradient bars from emerald to cyan
            const gradient = ctx.createLinearGradient(0, height, 0, y);
            gradient.addColorStop(0, '#059669');
            gradient.addColorStop(0.5, '#10b981');
            gradient.addColorStop(1, '#06b6d4');

            ctx.fillStyle = gradient;
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
            ctx.fillRect(x, y, barWidth, barHeight);
          }
          ctx.shadowBlur = 0;
        }
      } else {
        // Idle flat-line or gentle breathing resting wave
        idlePhase += 0.03;
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.4)'; // Subtle muted green

        ctx.moveTo(0, height / 2);
        for (let x = 0; x < width; x += 3) {
          const y = height / 2 + Math.sin(x * 0.02 + idlePhase) * 2;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, viewMode]);

  return (
    <div className="w-full rounded-2xl bg-slate-950 border border-slate-800/80 p-3 sm:p-4 overflow-hidden relative shadow-inner">
      {/* Top Header & Visualizer Controls */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-900">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'
              }`}
            />
            <span className="text-slate-300 font-semibold">
              {isPlaying ? 'Live Audio Output Detected' : 'Output Standby'}
            </span>
          </div>
          {isPlaying && (
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
              {Math.round(frequencyHz)} Hz • {waveType.toUpperCase()}
            </span>
          )}
        </div>

        {/* View Mode Toggle: Waveform vs Frequency Spectrum */}
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setViewMode('waveform')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors ${
              viewMode === 'waveform'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Oscilloscope Waveform View"
          >
            <Waves className="w-3 h-3" />
            <span>Waveform</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('spectrum')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors ${
              viewMode === 'spectrum'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Frequency Spectrum Bars"
          >
            <BarChart2 className="w-3 h-3" />
            <span>Spectrum</span>
          </button>
        </div>
      </div>

      {/* Real-time Oscilloscope / Spectrum Canvas */}
      <div className="relative w-full h-24 sm:h-28 bg-[#070b12] rounded-xl overflow-hidden border border-slate-900">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Center overlay indicator when idle */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-slate-950/20 backdrop-blur-[1px]">
            <span className="text-[11px] font-mono text-slate-500 tracking-wide flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-slate-600" />
              Press Play To Measure Real-time Acoustic Waveform
            </span>
          </div>
        )}

        {/* Audio frequency readout stamp */}
        {isPlaying && (
          <div className="absolute bottom-1.5 right-2 pointer-events-none bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
            {viewMode === 'waveform' ? 'Time-Domain (FFT 256)' : 'Real-Time FFT Bins'}
          </div>
        )}
      </div>

      {/* Subtext info */}
      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Acoustic Output Verification: {isPlaying ? 'ACTIVE' : 'IDLE'}</span>
        <span className="text-slate-500">
          {label || (isPlaying ? 'Web Audio Oscilloscope Live' : 'Hardware Ready')}
        </span>
      </div>
    </div>
  );
};
