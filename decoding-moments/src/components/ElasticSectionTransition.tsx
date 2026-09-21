import React, { useRef, useEffect, useState } from 'react';

interface ElasticSectionTransitionProps {
  topColor?: string;
  bottomColor?: string;
}

export const ElasticSectionTransition: React.FC<ElasticSectionTransitionProps> = ({
  topColor = '#F5EFE6',
  bottomColor = '#0D0D0B',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [pull, setPull] = useState(0);

  // Track scroll and compute hero scroll progress manually
  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          const heroHeight = hero.offsetHeight;
          // 0 = hero top at viewport top, 1 = hero bottom at viewport top
          const scrolled = -rect.top;
          const progress = Math.max(0, Math.min(1, scrolled / heroHeight));
          setPull(progress);
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Spring physics simulation ──────────────────────────────────
  const [springPull, setSpringPull] = useState(0);
  const velocityRef = useRef(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    targetRef.current = pull;
  }, [pull]);

  useEffect(() => {
    let running = true;
    const stiffness = 70;
    const damping = 13;
    const mass = 1.4;

    const tick = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      const velocity = velocityRef.current;

      // Spring force: F = -k * x - d * v
      const displacement = current - target;
      const springForce = -stiffness * displacement;
      const dampingForce = -damping * velocity;
      const acceleration = (springForce + dampingForce) / mass;

      velocityRef.current += acceleration * 0.016; // ~60fps timestep
      currentRef.current += velocityRef.current * 0.016;

      // Snap if close enough
      if (Math.abs(velocityRef.current) < 0.001 && Math.abs(displacement) < 0.001) {
        currentRef.current = target;
        velocityRef.current = 0;
      }

      setSpringPull(currentRef.current);

      if (running) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => { running = false; };
  }, []);

  // ── SVG Curve Math ──────────────────────────────────────────────
  const w = 1440;
  const h = 260;
  const MAX_PULL = 160;

  const depth = springPull * MAX_PULL;
  const baseY = 70;

  // Asymmetric cubic bezier for natural "stretched membrane" feel
  const midY = baseY - depth;
  const tension = Math.min(1, depth / MAX_PULL);
  const bulge = tension * tension;

  const cp1x = w * 0.22;
  const cp1y = baseY - depth * (0.15 + bulge * 0.35);
  const cp2x = w * 0.78;
  const cp2y = baseY - depth * (0.08 + bulge * 0.25);

  const curvePath = `M0,${baseY} C${cp1x},${cp1y} ${cp2x},${cp2y} ${w},${baseY}`;
  const fillPath = `${curvePath} L${w},${h} L0,${h} Z`;

  // Gold stroke opacity peaks at max pull
  const strokeOpacity = springPull > 0.1 ? Math.min(0.65, (springPull - 0.1) * 1.2) : 0;

  return (
    <div
      ref={sectionRef}
      className="relative w-full pointer-events-none"
      style={{
        height: `${h}px`,
        marginTop: `-${h}px`,
        zIndex: 30,
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="elastic-edge-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={topColor} stopOpacity={0.3 * (1 - springPull)} />
            <stop offset="100%" stopColor={bottomColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Black fill that stretches upward */}
        <path d={fillPath} fill={bottomColor} />

        {/* Soft blend at the top edge */}
        <rect x="0" y="0" width={w} height={h * 0.4} fill="url(#elastic-edge-fade)" />

        {/* Gold accent stroke along the elastic boundary */}
        {strokeOpacity > 0.01 && (
          <path
            d={curvePath}
            fill="none"
            stroke="#B68A55"
            strokeWidth="1.5"
            opacity={strokeOpacity}
          />
        )}
      </svg>
    </div>
  );
};
