import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../lib/audioEngine';

interface SpeakerVisualizerProps {
  isPlaying: boolean;
  mode?: string;
  intensity?: number;
  showDroplets?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export const SpeakerVisualizer: React.FC<SpeakerVisualizerProps> = ({
  isPlaying,
  mode = 'cleaner',
  showDroplets = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const freqDataRef = useRef<Uint8Array | null>(null);
  const timeDataRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Resize canvas to match display pixel ratio
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for mobile battery & memory efficiency
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    let phase = 0;

    const render = () => {
      if (width === 0 || height === 0) {
        if (isPlaying || particlesRef.current.length > 0) {
          animIdRef.current = requestAnimationFrame(render);
        }
        return;
      }

      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Get real audio data if playing
      const analyser = audioEngine.getAnalyser();
      let audioPower = 0;
      let freqData = freqDataRef.current;

      if (isPlaying && analyser) {
        if (!freqDataRef.current || freqDataRef.current.length !== analyser.frequencyBinCount) {
          freqDataRef.current = new Uint8Array(analyser.frequencyBinCount);
        }
        if (!timeDataRef.current || timeDataRef.current.length !== analyser.fftSize) {
          timeDataRef.current = new Uint8Array(analyser.fftSize);
        }
        freqData = freqDataRef.current;
        analyser.getByteFrequencyData(freqData);
        analyser.getByteTimeDomainData(timeDataRef.current);

        let sum = 0;
        const len = freqData.length;
        for (let i = 0; i < len; i++) {
          sum += freqData[i];
        }
        audioPower = sum / (len * 255);
      }

      phase += isPlaying ? 0.08 : 0.01;

      // Base radius calculation
      const baseRadius = Math.min(width, height) * 0.22;
      const dynamicRadius = baseRadius + (isPlaying ? audioPower * 28 : Math.sin(phase) * 1.5);

      // 1. Draw outer ripple acoustic rings
      if (isPlaying) {
        const ringCount = 3;
        for (let i = 1; i <= ringCount; i++) {
          const ringProgress = (phase * 0.5 + i / ringCount) % 1;
          const ringRadius = baseRadius + ringProgress * (Math.min(width, height) * 0.45);
          const ringAlpha = (1 - ringProgress) * 0.4;

          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = showDroplets
            ? `rgba(56, 189, 248, ${ringAlpha})`
            : `rgba(6, 182, 212, ${ringAlpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // 2. Outer Speaker Chassis Glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        baseRadius * 0.4,
        centerX,
        centerY,
        dynamicRadius * 1.5
      );
      if (showDroplets) {
        glowGrad.addColorStop(0, 'rgba(14, 165, 233, 0.25)');
        glowGrad.addColorStop(0.7, 'rgba(2, 132, 199, 0.08)');
        glowGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
        glowGrad.addColorStop(0.7, 'rgba(59, 130, 246, 0.06)');
        glowGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');
      }
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, dynamicRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // 3. Speaker Surround Ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, dynamicRadius * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.strokeStyle = isPlaying ? (showDroplets ? '#38bdf8' : '#06b6d4') : '#334155';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 4. Speaker Cone Diaphragm
      const coneGrad = ctx.createRadialGradient(
        centerX - dynamicRadius * 0.2,
        centerY - dynamicRadius * 0.2,
        0,
        centerX,
        centerY,
        dynamicRadius
      );
      coneGrad.addColorStop(0, '#0f172a');
      coneGrad.addColorStop(0.8, '#020617');
      coneGrad.addColorStop(1, '#1e293b');

      ctx.beginPath();
      ctx.arc(centerX, centerY, dynamicRadius, 0, Math.PI * 2);
      ctx.fillStyle = coneGrad;
      ctx.fill();

      // 5. Center Dust Cap
      const capRadius = dynamicRadius * 0.42;
      const capGrad = ctx.createRadialGradient(
        centerX - capRadius * 0.3,
        centerY - capRadius * 0.3,
        0,
        centerX,
        centerY,
        capRadius
      );
      if (isPlaying) {
        capGrad.addColorStop(0, showDroplets ? '#0284c7' : '#0891b2');
        capGrad.addColorStop(1, '#0f172a');
      } else {
        capGrad.addColorStop(0, '#334155');
        capGrad.addColorStop(1, '#0f172a');
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, capRadius, 0, Math.PI * 2);
      ctx.fillStyle = capGrad;
      ctx.fill();
      ctx.strokeStyle = isPlaying ? (showDroplets ? '#7dd3fc' : '#22d3ee') : '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 6. Realtime Audio Spectrum / Wave around the perimeter
      if (isPlaying && freqData) {
        const barCount = 32;
        const angleStep = (Math.PI * 2) / barCount;
        for (let i = 0; i < barCount; i++) {
          const angle = i * angleStep;
          const dataIndex = Math.floor((i / barCount) * (freqData.length / 2));
          const barHeight = (freqData[dataIndex] / 255) * 22 + 3;

          const x1 = centerX + Math.cos(angle) * (dynamicRadius * 1.18);
          const y1 = centerY + Math.sin(angle) * (dynamicRadius * 1.18);
          const x2 = centerX + Math.cos(angle) * (dynamicRadius * 1.18 + barHeight);
          const y2 = centerY + Math.sin(angle) * (dynamicRadius * 1.18 + barHeight);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = showDroplets ? '#38bdf8' : '#06b6d4';
          ctx.lineWidth = 2.5;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      // 7. Water Particle Ejection FX (when water-eject mode is active)
      if (showDroplets && isPlaying) {
        // Cap max droplets at 25 for mobile performance
        if (particlesRef.current.length < 25 && Math.random() < 0.5) {
          const spawnAngle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 3.5;
          particlesRef.current.push({
            x: centerX + Math.cos(spawnAngle) * (capRadius * 0.8),
            y: centerY + Math.sin(spawnAngle) * (capRadius * 0.8),
            vx: Math.cos(spawnAngle) * speed,
            vy: Math.sin(spawnAngle) * speed + 1,
            radius: 2 + Math.random() * 2.5,
            alpha: 1,
            life: 0,
            maxLife: 25 + Math.random() * 20,
          });
        }
      }

      // Render and update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${p.alpha * 0.9})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
        }
      }

      // Loop only when audio is playing or particles remain; when idle, stop to save CPU & battery
      if (isPlaying || particlesRef.current.length > 0) {
        animIdRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animIdRef.current) {
        cancelAnimationFrame(animIdRef.current);
      }
    };
  }, [isPlaying, mode, showDroplets]);

  return (
    <div id="speaker-visualizer-container" className="relative w-full aspect-square max-w-[320px] sm:max-w-[360px] mx-auto flex items-center justify-center">
      <canvas
        id="speaker-canvas"
        ref={canvasRef}
        className="w-full h-full block touch-none"
      />
    </div>
  );
};
