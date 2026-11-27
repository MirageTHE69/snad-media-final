"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Rickshaw from "./Rickshaw";

/* Shop-shutter loader. Rolls up at ~2.9s. Shown once per browser session
 * (an inline script in layout adds html.no-splash on repeat visits). */
export default function Splash() {
  const [gone, setGone] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("no-splash")) {
      // already hidden by CSS; unmount on the next tick
      const t = setTimeout(() => setGone(true), 0);
      return () => clearTimeout(t);
    }
    try { sessionStorage.setItem("snad-splash", "1"); } catch {}
    html.classList.add("splash-lock");
    let raf = 0;
    const t0 = performance.now();
    const f = (t: number) => {
      const k = Math.min(1, (t - t0) / 2200);
      if (countRef.current) countRef.current.textContent = String(Math.round((1 - Math.pow(1 - k, 2)) * 100));
      if (k < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    const unlock = setTimeout(() => html.classList.remove("splash-lock"), 3000);
    const done = setTimeout(() => setGone(true), 3950);
    return () => { cancelAnimationFrame(raf); clearTimeout(unlock); clearTimeout(done); html.classList.remove("splash-lock"); };
  }, []);

  const skip = () => {
    setSkipped(true);
    document.documentElement.classList.add("intro-skip");
    document.documentElement.classList.remove("splash-lock");
    setTimeout(() => setGone(true), 800);
  };

  if (gone) return null;

  return (
    <div className={`splash ${skipped ? "is-skipped" : ""}`} role="presentation">
      <div className="splash-ribs" aria-hidden="true" />
      <div className="splash-border" aria-hidden="true" />
      <button type="button" className="splash-skip" onClick={skip}>Skip →</button>
      <div className="splash-center">
        <div className="splash-logo"><Logo variant="splash" /></div>
        <div className="splash-words">
          <span style={{ color: "#FFC72C", animationDelay: "1.75s" }}>Fassst.</span>
          <span style={{ color: "#fff", animationDelay: "1.95s" }}>Young.</span>
          <span style={{ color: "#FFF4DC", animationDelay: "2.15s" }}>Sorted.</span>
        </div>
      </div>
      <div className="splash-road" aria-hidden="true" />
      <div className="splash-rick">
        <Rickshaw width="100%" spin=".3s" />
      </div>
      <div className="splash-count"><span ref={countRef}>0</span>%</div>
      <div className="splash-curb" aria-hidden="true"><span /><span /></div>
    </div>
  );
}
