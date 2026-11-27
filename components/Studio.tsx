"use client";

import { useEffect, useRef } from "react";
import { STUDIO } from "@/lib/data";
import { canMotion } from "@/lib/motion";

/* Studio Seven Nine: SNAD's martech sub-brand. The wheel turns as you scroll. */
export default function Studio() {
  const wheel = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf || !canMotion()) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (wheel.current) wheel.current.style.rotate = `${window.scrollY * 0.22}deg`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="garage" className="studio" aria-labelledby="studio-h">
      <div className="studio-stars" aria-hidden="true" />
      <div className="split">
        <div data-reveal="">
          <div className="pill pill-teal">The garage</div>
          <h2 id="studio-h" className="h2 studio-h">Studio <span className="yel">Seven Nine</span></h2>
          <p className="lead lead-light">Where we build the engines behind the ride. Our martech studio for finding, guiding and catching customers.</p>
          <div className="studio-list">
            {STUDIO.map((s, i) => (
              <div key={s.n} className={`studio-item ${i % 2 ? "tilt-r" : "tilt-l"}`} style={{ borderColor: s.color }}>
                <span className="studio-n" style={{ background: s.color }}>{s.n}</span>
                <span>
                  <span className="studio-label">{s.label}</span>
                  <span className="studio-desc">{s.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="studio-wheel" data-reveal="120">
          <img ref={wheel} src="/img/rickshaw-wheel.webp" alt="" width={640} height={632} loading="lazy" />
          <div className="studio-badge">Studio 79</div>
        </div>
      </div>
    </section>
  );
}
