import { CAP, GLYPHS, TRACK } from "@/lib/logo-glyphs";

const PAD = 14; // room for the round overshoot of S
const WIDTH = GLYPHS.reduce((w, g) => w + g.adv + TRACK, 0) - TRACK;
let x = 0;
const PLACED = GLYPHS.map((g) => {
  const at = x;
  x += g.adv + TRACK;
  return { ...g, x: at };
});

/** The SNAD wordmark as vector paths (Archivo Black Expanded). */
export function Wordmark({ height, color = "currentColor" }: { height: number; color?: string }) {
  return (
    <svg
      viewBox={`0 ${-PAD} ${WIDTH} ${CAP + PAD * 2}`}
      height={height}
      width={(height * WIDTH) / (CAP + PAD * 2)}
      fill={color}
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      {PLACED.map((g) => (
        <path key={g.ch} d={g.d} transform={`translate(${g.x} 0)`} />
      ))}
    </svg>
  );
}

/** One glyph on its own, used for the letter-by-letter splash animation. */
export function Glyph({ ch, className, style }: { ch: string; className?: string; style?: React.CSSProperties }) {
  const g = GLYPHS.find((x) => x.ch === ch)!;
  return (
    <svg
      viewBox={`0 ${-PAD} ${g.adv + TRACK} ${CAP + PAD * 2}`}
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={g.d} />
    </svg>
  );
}

/** Orange dot + wordmark, as used in the nav and footer. */
export function Logo({ size = "nav" }: { size?: "nav" | "footer" }) {
  const cap = size === "nav" ? 15 : 21;
  const dot = size === "nav" ? 12 : 14;
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span className={`logo-dot${size === "nav" ? " logo-dot--pulse" : ""}`} style={{ width: dot, height: dot }} />
      <Wordmark height={(cap * (CAP + PAD * 2)) / CAP} />
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        SNAD Media
      </span>
    </span>
  );
}
