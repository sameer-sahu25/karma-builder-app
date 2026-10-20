import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 pos;
void main() { gl_Position = vec4(pos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5) * 0.6;

  // warp / hyperspeed streaks radiating from a mouse-shifted centre
  vec2 c = uv - m;
  float r = length(c);
  float a = atan(c.y, c.x);
  float speed = uTime * 0.35 + uScroll * 2.5;
  float streaks = fbm(vec2(a * 3.5, log(r + 0.08) * 3.0 - speed));
  streaks = pow(smoothstep(0.42, 1.0, streaks), 2.4) * smoothstep(0.02, 0.75, r);

  // slow drifting noise field
  vec2 w = uv * 1.6 + vec2(fbm(uv * 1.3 + uTime * 0.05), fbm(uv * 1.3 - uTime * 0.04));
  float field = fbm(w + uTime * 0.03);

  vec3 cyan = vec3(0.22, 0.72, 0.95);
  vec3 amber = vec3(0.96, 0.62, 0.16);
  vec3 col = mix(cyan, amber, smoothstep(0.35, 0.75, field + uScroll * 0.3));
  col *= field * 0.16;
  col += cyan * streaks * 0.5;
  col += amber * streaks * streaks * 0.22;

  // vignette + subtle grain
  col *= 1.0 - smoothstep(0.35, 1.25, length(uv));
  col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.012;

  fragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/** GPU background: GLSL warp/hyperspeed streaks + drifting noise, driven by time, mouse and scroll. */
export function ShaderBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uScroll = gl.getUniformLocation(prog, "uScroll");

    const mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let checkTimer: number | undefined;
    let fallbackTimer: number | undefined;
    const start = performance.now();
    const render = (now: number) => {
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uScroll, max > 0 ? window.scrollY / max : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    const startShader = () => {
      if (checkTimer !== undefined) window.clearInterval(checkTimer);
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      if (!raf) {
        raf = requestAnimationFrame(render);
      }
    };

    if (document.documentElement.dataset["preloaded"] === "true") {
      startShader();
    } else {
      checkTimer = window.setInterval(() => {
        if (document.documentElement.dataset["preloaded"] === "true") {
          startShader();
        }
      }, 50);
      fallbackTimer = window.setTimeout(startShader, 2100);
    }

    return () => {
      if (checkTimer !== undefined) window.clearInterval(checkTimer);
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.deleteProgram(prog);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
