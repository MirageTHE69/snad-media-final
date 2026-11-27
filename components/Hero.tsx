"use client";

import { useEffect, useRef, useState } from "react";
import Rickshaw from "./Rickshaw";
import HeroScene from "./HeroScene";
import { useSound } from "./SoundProvider";
import { ROTATOR } from "@/lib/data";
import { canMotion, clamp, finePointer } from "@/lib/motion";

const d = (s: number) => ({ ["--d" as string]: `${s}s` }) as React.CSSProperties;

export default function Hero() {
  const { honk } = useSound();
  const heroRef = useRef<HTMLElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const rickRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const hillsRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState(0);

  /* headline word rotator */
  useEffect(() => {
    if (!canMotion()) return;
    const t = setInterval(() => setRot((r) => (r + 1) % ROTATOR.length), 2300);
    return () => clearInterval(t);
  }, []);

  /* eyes, parallax depth, magnetic CTAs, blink, always-driving road, drive-off on scroll */
  useEffect(() => {
    const hero = heroRef.current!;
    const irises = () => Array.from(hero.querySelectorAll<HTMLElement>("[data-iris]"));
    const depths = Array.from(hero.querySelectorAll<HTMLElement>("[data-depth]"));
    const magnets = Array.from(hero.querySelectorAll<HTMLElement>("[data-magnet]"));
    let hot = false;

    const onMove = (e: PointerEvent) => {
      if (!canMotion() || !finePointer()) return;
      const hr = hero.getBoundingClientRect();
      if (hr.bottom < 0) return;
      const dx = e.clientX - hr.width / 2, dy = e.clientY - hr.top - hr.height / 2;
      depths.forEach((el) => {
        const k = parseFloat(el.dataset.depth || "0");
        el.style.translate = `${-dx * k}px ${-dy * k}px`;
      });
      magnets.forEach((m) => {
        const b = m.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
        const dd = Math.hypot(e.clientX - cx, e.clientY - cy);
        m.style.translate = dd < 110 ? `${(e.clientX - cx) * 0.22}px ${(e.clientY - cy) * 0.3}px` : "0 0";
      });
      const target = e.target as Element | null;
      const isHot = !!target?.closest?.("[data-magnet]");
      if (isHot !== hot) { hot = isHot; irises().forEach((ir) => (ir.style.scale = hot ? "1.3" : "1")); }
      const eyes = eyesRef.current;
      if (!eyes) return;
      const r = eyes.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const mx = r.width * 0.018, my = r.height * 0.05;
      irises().forEach((ir) => {
        const b = ir.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
        const a = Math.atan2(e.clientY - cy, e.clientX - cx), k = Math.min(1, Math.hypot(e.clientX - cx, e.clientY - cy) / 300);
        ir.style.translate = `${Math.cos(a) * mx * k}px ${Math.sin(a) * my * k}px`;
      });
    };

    /* touch devices: eyes look around on their own */
    let wander = 0;
    if (!finePointer() && canMotion()) {
      wander = window.setInterval(() => {
        const eyes = eyesRef.current; if (!eyes) return;
        const r = eyes.getBoundingClientRect();
        const a = Math.random() * Math.PI * 2, k = Math.random();
        irises().forEach((ir) => (ir.style.translate = `${Math.cos(a) * r.width * 0.018 * k}px ${Math.sin(a) * r.height * 0.05 * k}px`));
      }, 1600);
    }

    const blink = window.setInterval(() => {
      irises().forEach((ir) => {
        ir.style.scale = "1 .08";
        setTimeout(() => (ir.style.scale = "1 1"), 140);
      });
    }, 3600);

    const onScroll = () => {
      const r = hero.getBoundingClientRect();
      if (canMotion()) hero.style.setProperty("--hs", `${Math.max(0, -r.top).toFixed(1)}px`);
      const rk = rickRef.current;
      if (!rk || !canMotion()) return;
      const p = clamp(-r.top / (r.height * 0.7));
      rk.style.translate = `${p * window.innerWidth * 1.05}px 0`;
    };

    let raf = 0, last = performance.now(), drive = 0;
    const loop = (t: number) => {
      const dt = Math.min(64, t - last); last = t;
      if (canMotion() && !document.hidden && hero.getBoundingClientRect().bottom > 0) {
        drive += dt * 0.16;
        if (roadRef.current) roadRef.current.style.backgroundPositionX = `${-drive}px`;
        if (hillsRef.current) hillsRef.current.style.backgroundPositionX = `${-drive * 0.25}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    /* pause the live background while the hero is off screen */
    const io = new IntersectionObserver(([e]) => hero.classList.toggle("scene-paused", !e.isIntersecting), { threshold: 0 });
    io.observe(hero);

    /* phones (Android): tilt the device to shift the scene layers */
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: unknown } | undefined;
    const onTilt = (e: DeviceOrientationEvent) => {
      if (!canMotion() || e.gamma == null || e.beta == null) return;
      const w = hero.clientWidth, h = hero.clientHeight;
      const dx = Math.max(-1, Math.min(1, e.gamma / 30)) * w * 0.5;
      const dy = Math.max(-1, Math.min(1, (e.beta - 45) / 30)) * h * 0.5;
      depths.forEach((el) => {
        const k = parseFloat(el.dataset.depth || "0");
        el.style.translate = `${-dx * k}px ${-dy * k}px`;
      });
    };
    const useTilt = !finePointer() && !!DOE && typeof DOE.requestPermission !== "function";
    if (useTilt) window.addEventListener("deviceorientation", onTilt);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      if (useTilt) window.removeEventListener("deviceorientation", onTilt);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      clearInterval(blink); clearInterval(wander); cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero" id="top">
      <HeroScene />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-eyes-wrap" data-depth="0.02">
          <div ref={eyesRef} className="hero-eyes intro intro-open" style={d(0.1)}>
            <img src="/img/eye-frame.webp" alt="SNAD's big poster eyes, watching you" width={1313} height={526} />
            <img data-iris="" className="iris" src="/img/iris.webp" alt="" style={{ left: "22.05%" }} />
            <img data-iris="" className="iris" src="/img/iris.webp" alt="" style={{ left: "69.45%" }} />
          </div>
        </div>
        <div className="hero-tag intro intro-word" style={d(0.35)}>#FassstYoung&amp;Sorted</div>
        <h1 className="hero-title">
          <span className="hero-line">
            <span className="intro intro-word" style={d(0.45)}>Brands</span>{" "}
            <span className="intro intro-word" style={d(0.52)}>people</span>{" "}
            <span className="intro intro-word yel" style={d(0.59)}>can’t</span>{" "}
            <span className="intro intro-word yel" style={d(0.66)}>stop</span>
          </span>
          <span className="rotator intro intro-word" style={d(0.78)} aria-live="polite">
            {ROTATOR.map((w, i) => {
              const prev = (rot - 1 + ROTATOR.length) % ROTATOR.length;
              const cls = i === rot ? "is-on" : i === prev ? "is-out" : "is-wait";
              return (
                <span key={w} className={`rot-word ${cls}`} aria-hidden={i !== rot}>
                  {w}
                </span>
              );
            })}
          </span>
        </h1>
        <p className="hero-sub intro intro-word" style={d(0.92)}>
          A creative, media and technology agency from Alkapuri, Vadodara. We make brands that get noticed, remembered and chosen.
        </p>
        <div className="hero-ctas intro intro-word" style={d(1.02)}>
          <a data-magnet="" href="#ride" className="btn btn-red btn-lg">Start the ride ↓</a>
          <a data-magnet="" href="#contact" className="btn btn-yellow btn-lg">Book a ride ↗</a>
        </div>
      </div>

      <div className="hero-ground">
        <div ref={hillsRef} className="hero-hills" aria-hidden="true" />
        <div ref={rickRef} className="hero-rick intro intro-drive" style={d(0.2)}>
          <button type="button" data-horn="" className="horn-btn" aria-label="Honk the rickshaw horn" onClick={(e) => honk(e.currentTarget)}>
            <span data-honk-bubble="" className="honk-bubble" style={{ left: "58%", top: "-22%" }}>Peep peep!</span>
            <div className="bob">
              <Rickshaw width="clamp(130px,13vw,210px)" alt="SNAD auto-rickshaw with three happy passengers" />
            </div>
          </button>
        </div>
        <div ref={roadRef} className="hero-road" aria-hidden="true" />
        <a href="#ride" className="scroll-cue hide-sm">
          Scroll to ride <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
