import { useCallback, useEffect, useRef, useState } from "react";

export type CubeFace = {
  label: string;
  from: string;
  to: string;
  icon: "brain" | "database" | "chart" | "code" | "layers" | "shield" | "target" | "users" | "bulb";
};

const SIZE = 250;
const HALF = SIZE / 2;

function FaceIcon({ name }: { name: CubeFace["icon"] }) {
  const common = {
    width: 88,
    height: 88,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "rgba(255,255,255,0.92)",
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "brain":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M9 4a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 5 9a2.5 2.5 0 0 0 1 2 2.5 2.5 0 0 0 1 4.5A2.5 2.5 0 0 0 9.5 20H12V4Z" />
          <path d="M15 4a2.5 2.5 0 0 1 2.5 2.5A2.5 2.5 0 0 1 19 9a2.5 2.5 0 0 1-1 2 2.5 2.5 0 0 1-1 4.5A2.5 2.5 0 0 1 14.5 20H12" />
        </svg>
      );
    case "database":
      return (
        <svg {...common} aria-hidden="true">
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4 20V10M9.5 20V5M15 20v-7M20.5 20V8" />
          <path d="M3 21h18" />
        </svg>
      );
    case "code":
      return (
        <svg {...common} aria-hidden="true">
          <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common} aria-hidden="true">
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 13 9 5 9-5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
        </svg>
      );
    case "target":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1.4" />
        </svg>
      );
    case "users":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3 20a6 6 0 0 1 12 0" />
          <path d="M16 5.5a3.2 3.2 0 0 1 0 6.4M17 20a6.4 6.4 0 0 0-2-4.6" />
        </svg>
      );
    case "bulb":
    default:
      return (
        <svg {...common} aria-hidden="true">
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5.9 1.2.9 1.9v.2h5.2v-.2c0-.7.3-1.4.9-1.9A6 6 0 0 0 12 3Z" />
        </svg>
      );
  }
}

const transforms = [
  `rotateY(0deg) translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
];

export function Cube3D({ faces }: { faces: CubeFace[] }) {
  const [angle, setAngle] = useState<{ x: number; y: number } | null>(null);
  const drag = useRef<{ id: number; x: number; y: number; ax: number; ay: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const start = angle ?? { x: -22, y: 0 };
      drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, ax: start.x, ay: start.y };
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      setAngle(start);
      setDragging(true);
    },
    [angle],
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const nx = Math.max(-75, Math.min(75, d.ax - (e.clientY - d.y) * 0.4));
    setAngle({ x: nx, y: d.ay + (e.clientX - d.x) * 0.4 });
  }, []);

  const endDrag = useCallback(() => {
    drag.current = null;
    setDragging(false);
  }, []);

  useEffect(() => () => void (drag.current = null), []);

  // cursor-anywhere tilt: the cube leans toward the pointer wherever it moves on the page
  const tiltRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = stageRef.current?.getBoundingClientRect();
      if (!r) return;
      const dx = (e.clientX - (r.left + r.width / 2)) / Math.max(window.innerWidth / 2, 1);
      const dy = (e.clientY - (r.top + r.height / 2)) / Math.max(window.innerHeight / 2, 1);
      ty = Math.max(-1, Math.min(1, dx)) * 26;
      tx = Math.max(-1, Math.min(1, -dy)) * 18;
    };

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="cube-stage animate-float-slow relative select-none touch-none cursor-grab active:cursor-grabbing"
      data-dragging={dragging}
      style={{ width: SIZE, height: SIZE }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div
        ref={tiltRef}
        style={{ width: SIZE, height: SIZE, transformStyle: "preserve-3d", willChange: "transform" }}
      >
      <div
        className="cube-3d"
        style={{
          width: SIZE,
          height: SIZE,
          ...(angle
            ? { animation: "none", transform: `rotateX(${angle.x}deg) rotateY(${angle.y}deg)` }
            : {}),
        }}
      >
        {faces.slice(0, 6).map((face, i) => (
          <div
            key={face.label + i}
            className="cube-face"
            style={{
              transform: transforms[i],
              background: `linear-gradient(140deg, ${face.from}, ${face.to})`,
            }}
          >
            <FaceIcon name={face.icon} />
            <span
              className="absolute bottom-5 right-4 px-3 py-1.5 rounded-md bg-black/75 text-[11px] font-mono font-bold tracking-[0.25em] text-white/90"
              style={{ writingMode: "vertical-rl" }}
            >
              {face.label}
            </span>
          </div>
        ))}
      </div>
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%] blur-2xl bg-black/70"
        style={{ width: SIZE * 0.9, height: 28, top: SIZE + 26 }}
        aria-hidden="true"
      />
    </div>
  );
}
