"use client";

import { useEffect, useRef } from "react";
import { MILESTONES } from "@/lib/data";
import { canMotion } from "@/lib/motion";

const fmt = (n: number) => n.toLocaleString("en-IN");

/* Stats painted on highway milestone stones. The meter counts up when they come into view. */
export default function Milestones() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current!;
    const nums = Array.from(el.querySelectorAll<HTMLElement>("[data-count]"));
    if (!canMotion()) return;
    nums.forEach((n) => (n.textContent = "0"));
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const k = Math.min(1, (t - t0) / 1600), ease = 1 - Math.pow(1 - k, 3);
          nums.forEach((n) => (n.textContent = fmt(Math.round(Number(n.dataset.count) * ease))));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="milestones" aria-labelledby="ms-h">
      <div className="center-head" data-reveal="">
        <h2 id="ms-h" className="h2">Kilometres <span className="red">covered.</span></h2>
        <p className="lead">Every milestone we’ve passed so far. The meter is still running.</p>
      </div>
      <div className="stones" ref={wrap}>
        {MILESTONES.map((m, i) => (
          <div key={m.label} className="stone" data-reveal={i * 90} style={{ transform: `rotate(${m.rot}deg)` }}>
            <img src="/img/milestone.webp" alt="" width={525} height={657} loading="lazy" />
            <div className="stone-text">
              <span className="stone-num">
                <span data-count={m.value}>{fmt(m.value)}</span>{m.suffix}
              </span>
              <span className="stone-label">{m.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="stones-road" aria-hidden="true" />
    </section>
  );
}
