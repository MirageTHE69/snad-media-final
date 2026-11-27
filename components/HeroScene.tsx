/* Live hero background, drawn in SVG so it stays sharp on every screen.
 * Layers (back to front): sky, rainbow sun, stars, clouds, hills + flowers.
 * Each layer has two wrappers: [data-depth] (mouse/tilt parallax, set by Hero)
 * and .scene-scroll (scroll parallax via the --hs custom property). */

const INK = "#141414";
const RAINBOW = ["#E3101B", "#FF6B1A", "#FFC72C", "#2FB55A", "#00A6A6", "#1F5FD1", "#7B3FE4", "#FF2E88"];

const r2 = (n: number) => Math.round(n * 100) / 100;

function starPath(R: number, inner = 0.46, points = 5) {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const rad = i % 2 ? R * inner : R;
    const a = (Math.PI / points) * i - Math.PI / 2;
    pts.push(`${r2(Math.cos(a) * rad)},${r2(Math.sin(a) * rad)}`);
  }
  return `M${pts.join("L")}Z`;
}
const STAR = starPath(20);
const SPARK = starPath(14, 0.22, 4);

/* ---------- sun ---------- */
const RAY = "M30,-7 C84,-26 134,10 188,-8 C228,-21 262,-17 290,-2 C266,-2 248,6 228,10 C172,24 102,-6 30,7 Z";
const RAYS = Array.from({ length: 32 }, (_, i) => ({
  rot: r2(i * 11.25),
  color: RAINBOW[i % RAINBOW.length],
  scale: i % 2 ? 0.8 : i % 4 ? 0.92 : 1.04,
}));

function Sun() {
  return (
    <svg className="sun-svg" viewBox="-320 -320 640 640" aria-hidden="true">
      <g className="sun-breathe">
        <g className="sun-spin">
          {RAYS.map((r) => (
            <path
              key={r.rot}
              d={RAY}
              transform={`rotate(${r.rot}) scale(${r.scale})`}
              fill={r.color}
              stroke={INK}
              strokeWidth={3.5}
              strokeLinejoin="round"
            />
          ))}
          <circle r={44} fill="#FF6B1A" stroke={INK} strokeWidth={4} />
        </g>
      </g>
      <g className="sun-core">
        <path d={starPath(40)} fill="#FFC72C" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* ---------- stars & sparkles (fixed positions so server and client render the same) ---------- */
const STARS = [
  { x: 36, y: 12, s: 1.1, d: 0 }, { x: 44, y: 6, s: 0.8, d: 1.2 }, { x: 52, y: 15, s: 1.3, d: 0.6 },
  { x: 58, y: 7, s: 0.9, d: 2.1 }, { x: 64, y: 22, s: 1.5, d: 1.6 }, { x: 70, y: 12, s: 1, d: 0.3 },
  { x: 77, y: 25, s: 1.2, d: 2.6 }, { x: 82, y: 9, s: 0.85, d: 1.9 }, { x: 88, y: 20, s: 1.35, d: 0.9 },
  { x: 94, y: 6, s: 0.9, d: 2.3 }, { x: 96, y: 30, s: 1, d: 1.1 }, { x: 47, y: 30, s: 0.75, d: 2.8 },
  { x: 60, y: 36, s: 1.1, d: 0.2 }, { x: 72, y: 38, s: 0.8, d: 1.4 }, { x: 86, y: 40, s: 1.15, d: 2.4 },
  { x: 24, y: 44, s: 1.25, d: 1.7 }, { x: 33, y: 52, s: 0.8, d: 0.5 }, { x: 6, y: 56, s: 0.9, d: 2.9 },
];
const SPARKS = [
  { x: 40, y: 20, d: 0.4 }, { x: 55, y: 26, d: 1.8 }, { x: 67, y: 5, d: 1 }, { x: 80, y: 32, d: 2.5 },
  { x: 91, y: 14, d: 0.7 }, { x: 30, y: 34, d: 2.2 }, { x: 98, y: 44, d: 1.4 },
];

/* ---------- clouds: outline trick (inked circles behind white circles) ---------- */
const PUFFS: [number, number, number][] = [[42, 58, 28], [82, 40, 38], [128, 50, 32], [162, 62, 22]];
function Cloud() {
  return (
    <svg viewBox="0 0 200 92" aria-hidden="true">
      <g fill={INK}>
        {PUFFS.map(([cx, cy, r]) => <circle key={cx} cx={cx} cy={cy} r={r + 4} />)}
        <rect x={10} y={56} width={176} height={32} rx={16} />
      </g>
      <g fill="#fff">
        {PUFFS.map(([cx, cy, r]) => <circle key={cx} cx={cx} cy={cy} r={r} />)}
        <rect x={14} y={60} width={168} height={24} rx={12} />
      </g>
    </svg>
  );
}
const CLOUDS = [
  { top: 8, w: 170, dur: 95, delay: -10, rest: 62 },
  { top: 20, w: 120, dur: 120, delay: -70, rest: 34 },
  { top: 4, w: 210, dur: 140, delay: -40, rest: 80 },
  { top: 30, w: 150, dur: 105, delay: -95, rest: 50 },
  { top: 14, w: 100, dur: 85, delay: -30, rest: 92 },
];

/* ---------- hills & flowers (viewBox 1600 x 600, anchored bottom) ---------- */
const HILLS = [
  { d: "M-200,215 C0,110 210,105 410,168 S810,262 1010,170 S1410,82 1800,150 L1800,600 L-200,600 Z", fill: "#2367B3", hl: "M-200,250 C0,150 210,145 410,206 S810,298 1010,208 S1410,122 1800,188", cls: "hill-a" },
  { d: "M-200,300 C100,218 300,226 520,282 S920,336 1120,252 S1500,196 1800,258 L1800,600 L-200,600 Z", fill: "#1A9AA6", hl: "M-200,336 C100,256 300,264 520,318 S920,372 1120,290 S1500,234 1800,296", cls: "hill-b" },
  { d: "M-200,384 C60,318 310,330 560,372 S1010,424 1260,352 S1610,318 1800,356 L1800,600 L-200,600 Z", fill: "#13936F", hl: "M-200,418 C60,356 310,368 560,408 S1010,460 1260,390 S1610,356 1800,394", cls: "hill-c" },
  { d: "M-200,470 C150,420 400,438 700,478 S1200,504 1450,442 S1700,428 1800,446 L1800,600 L-200,600 Z", fill: "#1C4F9C", hl: "M-200,500 C150,454 400,472 700,510 S1200,536 1450,476 S1700,462 1800,480", cls: "hill-d" },
];

function Daisy({ c = "#FF2E88" }: { c?: string }) {
  return (
    <g>
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx={0} cy={-15} rx={7} ry={14} transform={`rotate(${i * 45})`} fill={c} stroke={INK} strokeWidth={2.5} />
      ))}
      <circle r={9} fill="#FFC72C" stroke={INK} strokeWidth={2.5} />
      <circle r={4} fill="#00A6A6" />
    </g>
  );
}
function Arch() {
  return (
    <g>
      {[[36, "#FF2E88"], [28, "#FFC72C"], [20, "#00A6A6"], [12, "#FF6B1A"]].map(([r, c]) => (
        <path key={String(r)} d={`M${-Number(r)},0 A${r},${r} 0 0 1 ${r},0 Z`} fill={String(c)} stroke={INK} strokeWidth={2.5} />
      ))}
      {Array.from({ length: 7 }, (_, i) => {
        const a = Math.PI + (Math.PI / 6) * i;
        return <circle key={i} cx={r2(Math.cos(a) * 41)} cy={r2(Math.sin(a) * 41)} r={5} fill="#E3101B" stroke={INK} strokeWidth={2} />;
      })}
    </g>
  );
}
function Tulip({ c = "#E3101B" }: { c?: string }) {
  return (
    <g>
      <path d="M0,0 C2,-20 -2,-36 0,-52" stroke="#1A7F3C" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M0,-22 C12,-30 22,-28 26,-20 C16,-16 8,-16 0,-22 Z" fill="#2FB55A" stroke={INK} strokeWidth={2} />
      <path d="M-16,-70 C-18,-54 -10,-46 0,-46 C10,-46 18,-54 16,-70 L8,-62 L0,-74 L-8,-62 Z" fill={c} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M-6,-58 C-4,-52 4,-52 6,-58" stroke="#FFC72C" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );
}

/* Top edge of a hill at x: sample the path's cubic segments (only M, C, S, L are used). */
function topEdge(d: string) {
  const tok = d.match(/[MCSL]|-?\d+(?:\.\d+)?/g)!;
  const pts: [number, number][] = [];
  let i = 0, cmd = "", cur: [number, number] = [0, 0], prevC2: [number, number] | null = null;
  const num = () => Number(tok[i++]);
  while (i < tok.length) {
    if (/[MCSL]/.test(tok[i])) cmd = tok[i++];
    if (cmd === "L") break; // the rest closes the shape along the bottom
    if (cmd === "M") { cur = [num(), num()]; pts.push(cur); continue; }
    let c1: [number, number];
    if (cmd === "C") c1 = [num(), num()];
    else c1 = prevC2 ? [2 * cur[0] - prevC2[0], 2 * cur[1] - prevC2[1]] : cur;
    const c2: [number, number] = [num(), num()], end: [number, number] = [num(), num()];
    for (let t = 0.05; t <= 1.0001; t += 0.05) {
      const u = 1 - t;
      pts.push([
        u * u * u * cur[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * end[0],
        u * u * u * cur[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * end[1],
      ]);
    }
    prevC2 = c2; cur = end;
  }
  return (x: number) => {
    for (let k = 1; k < pts.length; k++) {
      if (pts[k][0] >= x) {
        const [x0, y0] = pts[k - 1], [x1, y1] = pts[k];
        return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0 || 1);
      }
    }
    return pts[pts.length - 1][1];
  };
}

type Flower = { hill: number; x: number; kind: "daisy" | "arch" | "tulip"; c?: string; s: number; d: number };
const FLOWER_SPOTS: Flower[] = [
  { hill: 0, x: 70, kind: "daisy", s: 1, d: 0 },
  { hill: 0, x: 420, kind: "daisy", c: "#FF6B1A", s: 0.8, d: 1.6 },
  { hill: 0, x: 980, kind: "daisy", c: "#7B3FE4", s: 0.9, d: 1.1 },
  { hill: 0, x: 1350, kind: "tulip", c: "#FF2E88", s: 1, d: 2.7 },
  { hill: 0, x: 1420, kind: "tulip", c: "#E3101B", s: 0.85, d: 1.9 },
  { hill: 1, x: 200, kind: "arch", s: 1, d: 0.8 },
  { hill: 1, x: 700, kind: "tulip", s: 1, d: 0.4 },
  { hill: 1, x: 1180, kind: "arch", s: 0.9, d: 2.2 },
  { hill: 1, x: 1530, kind: "daisy", c: "#FFC72C", s: 0.9, d: 1.2 },
  { hill: 2, x: 330, kind: "tulip", c: "#FF2E88", s: 0.9, d: 0.2 },
  { hill: 2, x: 820, kind: "daisy", c: "#FFC72C", s: 1.05, d: 2.4 },
  { hill: 2, x: 1300, kind: "arch", s: 0.9, d: 1.3 },
  { hill: 0, x: 760, kind: "arch", s: 0.75, d: 2.9 },
  { hill: 1, x: 40, kind: "daisy", c: "#FF6B1A", s: 0.8, d: 3.1 },
  { hill: 1, x: 940, kind: "daisy", c: "#FF2E88", s: 0.85, d: 0.9 },
  { hill: 2, x: 60, kind: "arch", s: 0.85, d: 1.7 },
  { hill: 2, x: 1060, kind: "tulip", c: "#7B3FE4", s: 0.9, d: 2.1 },
];
const HILL_STAR_SPOTS = [
  { hill: 0, x: 200, s: 0.9 }, { hill: 0, x: 600, s: 0.65 }, { hill: 0, x: 1180, s: 0.7 },
  { hill: 1, x: 450, s: 0.6 }, { hill: 1, x: 950, s: 0.7 }, { hill: 2, x: 600, s: 0.6 }, { hill: 2, x: 1500, s: 0.7 },
];

const EDGES = HILLS.map((h) => topEdge(h.d));
/* a point inside the visible band of hill i: between its top edge and the next hill's top edge */
const bandY = (hill: number, x: number, at: number) => {
  const top = EDGES[hill](x), next = EDGES[hill + 1] ? EDGES[hill + 1](x) : top + 120;
  return r2(top + (next - top) * at);
};
const FLOWERS = FLOWER_SPOTS.map((f) => ({ ...f, y: bandY(f.hill, f.x, f.kind === "daisy" ? 0.5 : 0.78) }));
const HILL_STARS = HILL_STAR_SPOTS.map((s) => ({ ...s, y: bandY(s.hill, s.x, 0.45) }));

function Hills() {
  return (
    <svg className="hills-svg" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {HILLS.map((h, i) => (
        <g key={h.cls} className={`hill ${h.cls}`}>
          <path d={h.d} fill={h.fill} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <path d={h.hl} fill="none" stroke="rgba(255,255,255,.16)" strokeWidth={14} strokeLinecap="round" />
          <path d={h.hl} transform="translate(0 26)" fill="none" stroke="rgba(255,255,255,.42)" strokeWidth={7} strokeLinecap="round" strokeDasharray="0 26" />
          {HILL_STARS.filter((s) => s.hill === i).map((s) => (
            <path key={s.x} d={STAR} transform={`translate(${s.x} ${s.y}) scale(${s.s})`} fill="#FFC72C" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          ))}
          {FLOWERS.filter((f) => f.hill === i).map((f) => (
            <g key={f.x} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
              <g className="flower" style={{ animationDelay: `${-f.d}s` }}>
                {f.kind === "daisy" ? <Daisy c={f.c} /> : f.kind === "arch" ? <Arch /> : <Tulip c={f.c} />}
              </g>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function HeroScene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="scene-layer" data-depth="0.004"><div className="scene-scroll" style={{ ["--k" as string]: 0.45 } as React.CSSProperties}><div className="scene-sky" /></div></div>

      <div className="scene-layer" data-depth="0.01">
        <div className="scene-scroll" style={{ ["--k" as string]: 0.38 } as React.CSSProperties}>
          <div className="scene-sun"><Sun /></div>
        </div>
      </div>

      <div className="scene-layer" data-depth="0.016">
        <div className="scene-scroll" style={{ ["--k" as string]: 0.32 } as React.CSSProperties}>
          {STARS.map((s, i) => (
            <svg key={i} className={`sky-star ${s.y > 26 && s.x > 14 && s.x < 90 ? "hide-on-phone" : ""}`} viewBox="-24 -24 48 48" style={{ left: `${s.x}%`, top: `${s.y}%`, width: `clamp(${r2(s.s * 24)}px, ${r2(s.s * 3)}vw, ${r2(s.s * 46)}px)`, animationDelay: `${-s.d}s` }}>
              <path d={STAR} fill="#FFC72C" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
            </svg>
          ))}
          {SPARKS.map((s, i) => (
            <svg key={i} className="sky-spark" viewBox="-16 -16 32 32" style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${-s.d}s` }}>
              <path d={SPARK} fill="#fff" />
            </svg>
          ))}
        </div>
      </div>

      <div className="scene-layer" data-depth="0.022">
        <div className="scene-scroll" style={{ ["--k" as string]: 0.26 } as React.CSSProperties}>
          {CLOUDS.map((c, i) => (
            <div key={i} className="cloud" style={{ top: `${c.top}%`, width: `clamp(${Math.round(c.w * 0.6)}px, ${r2(c.w / 14.4)}vw, ${c.w}px)`, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s`, ["--rest" as string]: `${c.rest}vw` } as React.CSSProperties}>
              <Cloud />
            </div>
          ))}
        </div>
      </div>

      <div className="scene-layer scene-hills-layer" data-depth="0.03">
        <div className="scene-scroll" style={{ ["--k" as string]: 0.1 } as React.CSSProperties}>
          <Hills />
        </div>
      </div>
    </div>
  );
}
