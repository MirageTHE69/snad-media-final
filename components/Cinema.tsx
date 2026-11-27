"use client";

import { useRef } from "react";
import { CASES } from "@/lib/data";
import { CASE_STUDIES } from "@/lib/cases";
import Link from "next/link";
import { canMotion, finePointer } from "@/lib/motion";

function Poster({ c, i }: { c: (typeof CASES)[number]; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !canMotion() || !finePointer()) return;
    const b = el.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5, py = (e.clientY - b.top) / b.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 14}deg) rotateX(${-py * 12}deg) translateY(-6px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <Link ref={ref} href={`/work/${CASE_STUDIES[i]?.slug ?? ""}`} className="poster" data-reveal={i * 100} onPointerMove={move} onPointerLeave={leave}>
      <div className="poster-screen" style={{ background: c.bg }}>
        <div className="poster-client">{c.client} · {c.service}</div>
        <div className="poster-metric">{c.metric}</div>
        <div className="poster-label">{c.label}</div>
      </div>
      <img src="/img/poster-frame.webp" alt="" width={888} height={647} loading="lazy" />
      <div className="poster-line">{c.line}</div>
    </Link>
  );
}

export default function Cinema() {
  return (
    <section id="work" className="cinema" aria-labelledby="work-h">
      <div className="cinema-hall" data-reveal="">
        <img src="/img/cinema-hall.webp" alt="SNAD single-screen cinema hall" width={1221} height={663} />
        <div className="cinema-board">
          <span className="cinema-now">NOW SHOWING</span>
          <span className="cinema-title">HOUSEFULL RESULTS</span>
        </div>
      </div>
      <div className="cinema-head">
        <h2 id="work-h" className="h2 h2-shadow" data-reveal="">Blockbusters, <span className="yel">not reruns.</span></h2>
        <p>A few recent releases. Ratings: housefull.</p>
      </div>
      <div className="posters">
        {CASES.map((c, i) => <Poster key={c.client} c={c} i={i} />)}
      </div>
      <div className="cinema-cta">
        <Link href="/work" className="ticket">🎟 Grab a ticket: all work →</Link>
      </div>
    </section>
  );
}
