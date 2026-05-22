import { useRef, useCallback } from 'react';

/**
 * Subtle 3D tilt wrapper — follows mouse with perspective rotation.
 * Professional, not cartoonish. Max 4-6deg rotation, smooth transitions.
 *
 * Props:
 *   - intensity: rotation multiplier (default 6)
 *   - className / style: forwarded to wrapper
 *   - glare: show a subtle glare highlight (default false)
 *   - perspective: CSS perspective value (default 800)
 */
export default function Tilt3D({ children, intensity = 6, className = '', style = {}, glare = false, perspective = 800 }) {
  const ref = useRef(null);
  const glareRef = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * intensity;
    const rotateY = (x - 0.5) * intensity;
    el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '1';
      glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
    }
  }, [intensity, perspective, glare]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }, [perspective, glare]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: 'transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        position: 'relative',
        ...style,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          style={{
            position: 'absolute', inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
