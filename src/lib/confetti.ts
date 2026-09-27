/**
 * Lightweight, zero-dependency HTML5 Canvas Confetti & Sparkle Burst Engine
 * High-performance, self-contained, and automatically cleans up after animation finishes.
 */

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angularVelocity: number;
  color: string;
  width: number;
  height: number;
  shape: 'rect' | 'circle' | 'sparkle';
  alpha: number;
  decay: number;
  gravity: number;
}

const PALETTE = [
  '#06b6d4', // cyan-500
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#8b5cf6', // purple-500
  '#ec4899', // pink-500
  '#38bdf8', // sky-400
  '#34d399', // emerald-400
];

export const triggerConfetti = (options?: {
  particleCount?: number;
  originY?: number;
}) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const count = options?.particleCount || 75;
  const originY = options?.originY !== undefined ? options.originY : 0.6; // normalized 0 to 1

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = (canvas.width = window.innerWidth * dpr);
  let height = (canvas.height = window.innerHeight * dpr);
  ctx.scale(dpr, dpr);

  const particles: ConfettiParticle[] = [];

  for (let i = 0; i < count; i++) {
    // Launch angle spread between upward left and upward right
    const angle = (Math.PI / 4) + Math.random() * (Math.PI / 2);
    // Speed with strong burst
    const speed = 7 + Math.random() * 11;
    const direction = Math.random() > 0.5 ? 1 : -1;
    const spreadX = (Math.random() - 0.5) * 12;

    const shapes: ('rect' | 'circle' | 'sparkle')[] = ['rect', 'circle', 'sparkle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    particles.push({
      x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 60,
      y: window.innerHeight * originY,
      vx: Math.cos(angle) * speed * direction + spreadX,
      vy: -Math.sin(angle) * speed - (3 + Math.random() * 5),
      angle: Math.random() * Math.PI * 2,
      angularVelocity: (Math.random() - 0.5) * 0.2,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      width: 7 + Math.random() * 6,
      height: 4 + Math.random() * 8,
      shape,
      alpha: 1,
      decay: 0.008 + Math.random() * 0.012,
      gravity: 0.28 + Math.random() * 0.12,
    });
  }

  let animId: number;

  const render = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let activeParticles = 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.alpha <= 0) continue;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.985;
      p.angle += p.angularVelocity;
      p.alpha -= p.decay;

      if (p.alpha > 0) {
        activeParticles++;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'sparkle') {
          // 4-pointed star / sparkle
          ctx.beginPath();
          const r = p.width;
          ctx.moveTo(0, -r);
          ctx.lineTo(r * 0.3, -r * 0.3);
          ctx.lineTo(r, 0);
          ctx.lineTo(r * 0.3, r * 0.3);
          ctx.lineTo(0, r);
          ctx.lineTo(-r * 0.3, r * 0.3);
          ctx.lineTo(-r, 0);
          ctx.lineTo(-r * 0.3, -r * 0.3);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }
    }

    if (activeParticles > 0) {
      animId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animId);
      canvas.remove();
    }
  };

  animId = requestAnimationFrame(render);

  // Safety fallback cleanup
  setTimeout(() => {
    cancelAnimationFrame(animId);
    if (canvas.parentNode) {
      canvas.remove();
    }
  }, 4500);
};
