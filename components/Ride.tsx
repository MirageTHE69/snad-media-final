"use client";

import { useEffect, useRef } from "react";
import Rickshaw from "./Rickshaw";
import { useSound } from "./SoundProvider";
import { STOPS, accent, boardColor } from "@/lib/data";
import { canMotion, clamp } from "@/lib/motion";

/* "SNAD ki Sawari": pinned horizontal scroll on desktop (>=900px).
 * Section height = track overflow + one viewport; the track translates X with scroll.
 * Mobile: a vertical list of shops. */
export default function Ride() {
  const { honk } = useSound();
  const secRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rickRef = useRef<HTMLDivElement>(null);
  const stopRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current!, track = trackRef.current!;
    const layers = Array.from(sec.querySelectorAll<HTMLElement>("[data-layer]"));
    const panels = Array.from(sec.querySelectorAll<HTMLElement>("[data-stop-panel]"));
    let dist = 0, lastX = 0, drive = 0, raf = 0, last = performance.now(), lastStop = -1;
    const desktop = () => window.innerWidth >= 900;

    const setup = () => {
      if (!desktop()) { dist = 0; sec.style.height = ""; return; }
      dist = Math.max(0, track.scrollWidth - window.innerWidth);
      sec.style.height = `${dist + window.innerHeight}px`;
    };

    const render = () => {
      if (!desktop() || !dist) return;
      const vh = window.innerHeight, vw = window.innerWidth;
      const r = sec.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      const p = clamp(-r.top / (r.height - vh)), x = p * dist;
      const mo = canMotion();
      track.style.transform = `translate3d(${-x}px,0,0)`;
      layers.forEach((el) => {
        const f = parseFloat(el.dataset.layer || "0");
        el.style.backgroundPositionX = `${-(x + (mo ? drive : 0)) * f}px`;
      });
      const rk = rickRef.current;
      if (rk && mo) {
        const v = Math.min(1, Math.abs(x - lastX) / 30);
        rk.style.transform = `translateY(${Math.sin(x / 38) * 3 * v}px) rotate(${-v * 1.5}deg)`;
      }
      lastX = x;
      let stop = 0;
      panels.forEach((pn, i) => {
        const b = pn.getBoundingClientRect();
        if (b.left < vw * 0.55) stop = i + 1;
        const c = b.left + b.width * 0.45, k = 1 - Math.min(1, Math.abs(c - vw * 0.55) / (vw * 0.55));
        const cd = pn.querySelector<HTMLElement>("[data-card]"), sh = pn.querySelector<HTMLElement>("[data-shop]");
        if (cd) {
          const op = clamp((k - 0.42) / 0.33);
          cd.style.opacity = op.toFixed(3);
          cd.style.pointerEvents = op < 0.2 ? "none" : "";
          cd.style.translate = `0 ${((1 - k) * 34).toFixed(1)}px`;
          cd.style.rotate = `${((1 - k) * 2.5).toFixed(2)}deg`;
        }
        if (sh) {
          sh.style.scale = (0.9 + 0.1 * k).toFixed(3);
          sh.style.filter = `saturate(${(0.55 + 0.45 * k).toFixed(2)})`;
        }
      });
      if (stop !== lastStop && stopRef.current) { stopRef.current.textContent = `0${stop}`; lastStop = stop; }
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };

    const loop = (t: number) => {
      const dt = Math.min(64, t - last); last = t;
      if (canMotion() && !document.hidden) drive += dt * 0.16;
      if (desktop()) {
        const r = sec.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) render();
      }
      raf = requestAnimationFrame(loop);
    };

    /* on desktop the shops live inside a translated track: map #stop-* links to the matching scroll position */
    const onLink = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#stop-"]') as HTMLAnchorElement | null;
      if (!a || !desktop() || !dist) return;
      const panel = document.getElementById(a.getAttribute("href")!.slice(1));
      if (!panel) return;
      e.preventDefault();
      const vw = window.innerWidth;
      const x = clamp(panel.offsetLeft + panel.offsetWidth * 0.45 - vw * 0.5, 0, dist);
      const top = sec.getBoundingClientRect().top + window.scrollY + x;
      window.scrollTo({ top, behavior: canMotion() ? "smooth" : "auto" });
    };
    document.addEventListener("click", onLink);

    const onResize = () => { setup(); render(); };
    const ro = new ResizeObserver(onResize);
    ro.observe(track);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", render, { passive: true });
    setup();
    render();
    raf = requestAnimationFrame(loop);
    return () => {
      ro.disconnect();
      document.removeEventListener("click", onLink);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", render);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="ride" ref={secRef} className="ride" aria-label="The ride: our seven services">
      <div className="ride-sticky">
        <div className="ride-layer" data-layer="0.08" style={{ top: "9vh", height: "16vh", backgroundImage: "url(/img/stars-set.webp)", opacity: 0.35 }} />
        <div className="ride-layer" data-layer="0.18" style={{ top: "15vh", height: "13vh", backgroundImage: "url(/img/clouds-set.webp)", opacity: 0.6 }} />
        <div className="ride-layer" data-layer="0.32" style={{ bottom: "20vh", height: "34vh", backgroundImage: "url(/img/hills-blue.webp)", backgroundPositionY: "bottom" }} />
        <div className="ride-layer" data-layer="0.55" style={{ bottom: "11vh", height: "28vh", backgroundImage: "url(/img/hills-green.webp)", backgroundPositionY: "bottom" }} />
        <div className="ride-layer ride-road" data-layer="1" />

        <div className="ride-hud">
          <div className="ride-hud-title">SNAD ki Sawari</div>
          <div className="ride-hud-meter">
            <span className="ride-hud-count">
              Stop <span ref={stopRef} className="ride-hud-stop">00</span>/07
            </span>
            <div className="ride-hud-bar"><div ref={barRef} /></div>
          </div>
        </div>

        <div className="ride-rick">
          <button type="button" data-horn="" className="horn-btn" aria-label="Honk the rickshaw horn" onClick={(e) => honk(e.currentTarget)}>
            <span data-honk-bubble="" className="honk-bubble" style={{ left: "30%", top: "-26%" }}>Peep peep!</span>
            <Rickshaw innerRef={rickRef} width="clamp(200px,21vw,320px)" alt="SNAD auto-rickshaw with three happy passengers" />
          </button>
        </div>

        <div className="ride-track" ref={trackRef}>
          <div className="ride-panel ride-intro" style={{ width: "78vw" }}>
            <div className="ride-inner ride-inner-text" style={{ left: "clamp(20px,27vw,420px)", top: "22vh" }}>
              <div className="ride-hop" data-reveal="">Hop in.</div>
              <p className="ride-hop-note">
                7 stops. One very sorted agency. <span>Keep scrolling, we’ll drive.</span>
              </p>
            </div>
          </div>

          {STOPS.map((s) => (
            <div key={s.id} id={s.id} data-stop-panel="" className="ride-panel" style={{ width: "62vw" }}>
              <div className="ride-inner">
                <div className="ride-shop" data-shop="">
                  <img src={s.img} alt={`${s.name} shop, ${s.service}`} width={s.w} height={s.h} loading="lazy" />
                  <div
                    className="shop-board"
                    style={{ left: `${s.board.left}%`, top: `${s.board.top}%`, width: `${s.board.width}%`, height: `${s.board.height}%` }}
                  >
                    <span className="shop-board-en" style={{ color: boardColor(s) }}>{s.name.toUpperCase()}</span>
                    <span className="shop-board-hi">{s.hindi}</span>
                  </div>
                </div>
                <article className="ride-card" data-card="">
                  <div className="ride-card-top">
                    <span className="stop-badge" style={{ background: accent(s), color: s.badgeText }}>STOP {s.no}</span>
                    <span className="ride-card-service">{s.service}</span>
                  </div>
                  <h3>{s.name}</h3>
                  <p>{s.blurb}</p>
                  <div className="chips">
                    {s.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                  <a
                    href="#contact"
                    className="step-inside"
                    style={{ borderBottomColor: accent(s) }}
                    onClick={() => window.dispatchEvent(new CustomEvent("snad:pick-stop", { detail: s.short }))}
                  >
                    Step inside →
                  </a>
                </article>
              </div>
            </div>
          ))}

          <div className="ride-panel ride-outro" style={{ width: "84vw" }}>
            <div className="ride-inner ride-inner-text" style={{ left: "8vw", top: "20vh" }}>
              <div className="ride-last" data-reveal="">
                Last stop? <span>Nahi yaar.</span>
                <br />
                This is where your brand starts.
              </div>
              <a href="#contact" className="btn btn-yellow btn-xl hv-lift">Book your ride ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
