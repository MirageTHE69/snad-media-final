"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Glyph } from "./Logo";
import { markSplashPlayed, shouldPlaySplash } from "@/lib/visit";


const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Splash() {
  const [show, setShow] = useState(shouldPlaySplash);
  const countRef = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    if (!show) {
      document.documentElement.style.setProperty("--splash", "0s");
      return;
    }
    markSplashPlayed();
    document.documentElement.style.removeProperty("--splash");
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const el = countRef.current;
    if (!el) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 2200);
      el.textContent = String(Math.round((1 - Math.pow(1 - k, 2)) * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Remove the splash once it has slid away, so it can never replay when Next
    // shows this (kept-alive) page again after navigating back.
    const done = window.setTimeout(() => setShow(false), 3500);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(done);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="splash" aria-hidden="true">
      <div className="splash__top">
        <span>SNAD Media</span>
        <span>Vadodara, IN</span>
      </div>
      <div className="splash__mark">
        <div className="splash__letters">
          {["S", "N", "A", "D"].map((ch, i) => (
            <Glyph key={ch} ch={ch} className="splash__letter" style={{ animationDelay: `${0.1 + i * 0.12}s` }} />
          ))}
        </div>
        <span className="splash__dot" />
      </div>
      <div>
        <div className="splash__foot">
          <span className="splash__tag">Fassst Young &amp; Sorted.</span>
          <span className="splash__count">
            <span ref={countRef}>0</span>%
          </span>
        </div>
        <div className="splash__track">
          <div className="splash__bar" />
        </div>
      </div>
    </div>
  );
}
