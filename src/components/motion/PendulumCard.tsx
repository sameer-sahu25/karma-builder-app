import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Real-time pendulum rigid body: gravity + angular spring + damping, draggable with
 * inertia so the card keeps swinging after release. Renders a lanyard cord to the pivot.
 */
export function PendulumCard({ children, cordHeight = 90 }: { children: ReactNode; cordHeight?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<SVGLineElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let angle = 0.28; // radians
    let velocity = 0;
    const gravity = 9.4;
    const damping = 0.992;
    const springK = 1.6;
    let pointerAngle: number | null = null;
    let attractAngle = 0; // target angle from global cursor position
    let last = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (pointerAngle !== null) {
        const next = pointerAngle;
        velocity = (next - angle) / Math.max(dt, 0.001);
        angle = next;
      } else {
        // pendulum torque + restoring spring + gentle pull toward the cursor
        const accel =
          -(gravity / 1.1) * Math.sin(angle) -
          springK * angle * 0.25 +
          (attractAngle - angle) * 6.5;
        velocity += accel * dt;
        velocity *= damping;
        angle += velocity * dt;
      }

      const deg = (angle * 180) / Math.PI;
      card.style.transform = `rotate(${deg.toFixed(3)}deg)`;
      if (cordRef.current) {
        const x = 50 + Math.sin(angle) * 22;
        cordRef.current.setAttribute("x2", `${x}%`);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pivot = () => {
      const r = wrap.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top };
    };

    const down = (e: PointerEvent) => {
      card.setPointerCapture(e.pointerId);
      setDragging(true);
      pointerAngle = angle;
    };
    const move = (e: PointerEvent) => {
      if (pointerAngle === null) return;
      const p = pivot();
      const a = Math.atan2(e.clientX - p.x, Math.max(e.clientY - p.y, 40));
      pointerAngle = Math.max(-1.05, Math.min(1.05, a));
    };
    const up = () => {
      pointerAngle = null;
      setDragging(false);
    };

    // follow the cursor anywhere on the page
    const globalMove = (e: PointerEvent) => {
      if (pointerAngle !== null) return;
      const p = pivot();
      const a = Math.atan2(e.clientX - p.x, Math.max(e.clientY - p.y, 120));
      attractAngle = Math.max(-0.55, Math.min(0.55, a * 0.55));
    };

    card.addEventListener("pointerdown", down);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerup", up);
    card.addEventListener("pointercancel", up);
    window.addEventListener("pointermove", globalMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerdown", down);
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerup", up);
      card.removeEventListener("pointercancel", up);
      window.removeEventListener("pointermove", globalMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative flex flex-col items-center" style={{ width: 320 }}>
      <div className="w-3 h-3 rounded-full bg-border-strong ring-4 ring-surface z-10" />
      <svg
        className="w-full pointer-events-none"
        height={cordHeight}
        viewBox={`0 0 100 ${cordHeight}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          ref={cordRef}
          x1="50%"
          y1="0"
          x2="50%"
          y2={cordHeight}
          stroke="currentColor"
          className="text-border-strong"
          strokeWidth="1.5"
        />
      </svg>
      <div
        ref={cardRef}
        className={`origin-top touch-none select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ transformOrigin: `50% ${-cordHeight}px` }}
        data-cursor="hover"
      >
        {children}
      </div>
    </div>
  );
}
