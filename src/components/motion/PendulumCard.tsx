import { useEffect, useRef, useState, type ReactNode } from "react";

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

    let angle = 0;
    let angularVel = 0;
    let introAngularVel = 6.6;
    let introGate = false;
    let attractAngle = 0;
    let targetAttract = 0;
    let pointerAngle: number | null = null;
    let lastCursorMoveAt = -Infinity;
    let lastX = window.innerWidth / 2;
    let startedAt = performance.now();
    let lastTime = performance.now();
    let raf = 0;
    let forcedSafety = false;

    const INTRO_DELAY_MS = 2800;
    const SAFETY_FORCE_REST_MS = 5000;
    const GRAVITY = 11.5;
    const DAMPING_PER_SEC = 1.15;
    const MAX_ANGLE = 0.55;
    const ATTRACT_MAX = 0.42;
    const FOLLOW_SMOOTH = 6.2;
    const RETURN_SMOOTH = 2.0;
    const CURSOR_IDLE_MS = 520;
    const DRAG_KP = 26;
    const DRAG_KD = 10;
    const WRAP_WIDTH = 320;

    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const elapsed = now - startedAt;

      if (!introGate && elapsed >= INTRO_DELAY_MS) {
        introGate = true;
        angularVel = introAngularVel;
      }
      if (!forcedSafety && elapsed >= SAFETY_FORCE_REST_MS && !introGate) {
        forcedSafety = true;
        introGate = true;
        angularVel = 0;
        angle = 0;
      }

      const idleMs = now - lastCursorMoveAt;
      if (idleMs > CURSOR_IDLE_MS) {
        targetAttract = 0;
        attractAngle += (targetAttract - attractAngle) * Math.min(1, RETURN_SMOOTH * dt);
      } else {
        attractAngle += (targetAttract - attractAngle) * Math.min(1, FOLLOW_SMOOTH * dt);
      }

      if (pointerAngle !== null) {
        const accel = (pointerAngle - angle) * DRAG_KP - angularVel * DRAG_KD;
        angularVel += accel * dt;
        angle += angularVel * dt;
      } else if (introGate) {
        const offset = angle - attractAngle;
        const accel = -GRAVITY * Math.sin(offset) - DAMPING_PER_SEC * angularVel;
        angularVel += accel * dt;
        angle += angularVel * dt;
      }

      if (angle > MAX_ANGLE) {
        angle = MAX_ANGLE;
        if (angularVel > 0) angularVel *= -0.38;
      } else if (angle < -MAX_ANGLE) {
        angle = -MAX_ANGLE;
        if (angularVel < 0) angularVel *= -0.38;
      }

      const deg = (angle * 180) / Math.PI;
      card.style.transform = `rotate(${deg.toFixed(3)}deg)`;

      if (cordRef.current) {
        const unit = 100 / WRAP_WIDTH;
        cordRef.current.setAttribute("x2", `${50 + Math.sin(angle) * cordHeight * unit}`);
        cordRef.current.setAttribute("y2", `${Math.cos(angle) * cordHeight}`);
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pivot = () => {
      const r = wrap.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top };
    };

    const computeAttract = (clientX: number) => {
      const p = pivot();
      const refWidth = Math.max(window.innerWidth * 0.42, 320);
      const ndx = clamp((clientX - p.x) / refWidth, -1, 1);
      const shaped = ndx * Math.abs(ndx) * 1.25;
      targetAttract = shaped * ATTRACT_MAX;
      lastCursorMoveAt = performance.now();
    };

    const down = (e: PointerEvent) => {
      card.setPointerCapture(e.pointerId);
      setDragging(true);
      pointerAngle = angle;
      lastCursorMoveAt = performance.now();
    };
    const move = (e: PointerEvent) => {
      if (pointerAngle === null) return;
      const p = pivot();
      const a = Math.atan2(e.clientX - p.x, Math.max(e.clientY - p.y, 40));
      pointerAngle = clamp(a, -MAX_ANGLE, MAX_ANGLE);
    };
    const up = () => {
      pointerAngle = null;
      setDragging(false);
    };

    const onPointerMove = (e: PointerEvent) => {
      lastX = e.clientX;
      computeAttract(e.clientX);
    };
    const onMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      computeAttract(e.clientX);
    };
    const onScroll = () => computeAttract(lastX);

    card.addEventListener("pointerdown", down);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerup", up);
    card.addEventListener("pointercancel", up);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerdown", down);
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerup", up);
      card.removeEventListener("pointercancel", up);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [cordHeight]);

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
          x1="50"
          y1="0"
          x2="50"
          y2={cordHeight}
          stroke="currentColor"
          className="text-border-strong"
          strokeWidth="1.5"
        />
      </svg>
      <div
        ref={cardRef}
        className={`touch-none select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ transformOrigin: `50% ${-cordHeight}px`, willChange: "transform" }}
        data-cursor="hover"
      >
        {children}
      </div>
    </div>
  );
}
