"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ORB_COLORS = ["#FFC531", "#9B8CFF", "#48C78E", "#FF4A1C", "#FFC531", "#9B8CFF", "#48C78E"];

/**
 * Scroll-driven behaviour from the design, ported 1:1:
 *  - [data-reveal]       fade/rise in when scrolled into view (value = delay in ms)
 *  - [data-sx]           horizontal drift of hero lines while scrolling
 *  - [data-px]/[data-py] parallax relative to the viewport centre
 *  - [data-wheel-wrap]   the "What SNAD stands for" 3D word wheel
 *  - [data-stack]        stacked service cards that shrink as the next one covers them
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const vh = () => window.innerHeight;
    // Next keeps previously visited pages mounted but hidden; only touch what is on screen.
    const visible = <T extends HTMLElement>(sel: string) =>
      Array.from(document.querySelectorAll<T>(sel)).filter((el) => el.getClientRects().length > 0);
    const first = <T extends HTMLElement>(sel: string) => visible<T>(sel)[0] ?? null;

    // ---------- Reveal ----------
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.remove("is-hidden");
          io.unobserve(el);
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          el.addEventListener("transitionend", () => (el.style.transitionDelay = ""), { once: true });
        }),
      { threshold: 0.1 },
    );
    visible("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top > vh() * 0.92) {
        el.style.transitionDelay = (el.dataset.reveal || "0") + "ms";
        el.classList.add("is-hidden");
        io.observe(el);
      }
    });

    // ---------- Count-up numbers (e.g. "3.4x", "42%", "18K") ----------
    const counters: number[] = [];
    function countUp(el: HTMLElement) {
      const m = (el.dataset.count || "").match(/^([^\d]*)([\d.]+)(.*)$/);
      if (!m) return;
      const [, pre, num, post] = m;
      const target = parseFloat(num);
      const dec = (num.split(".")[1] || "").length;
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        const v = target * (1 - Math.pow(1 - k, 3));
        el.textContent = pre + v.toFixed(dec) + post;
        if (k < 1) counters.push(requestAnimationFrame(tick));
      };
      el.textContent = pre + (0).toFixed(dec) + post;
      counters.push(requestAnimationFrame(tick));
    }

    // ---------- Wheel ----------
    const wheel = first("[data-wheel-wrap]");
    const words = wheel ? Array.from(wheel.querySelectorAll<HTMLElement>("[data-word]")) : [];
    const count = wheel?.querySelector<HTMLElement>("[data-wheel-count]");
    const bar = wheel?.querySelector<HTMLElement>("[data-wheel-bar]");
    const orb = wheel?.querySelector<HTMLElement>("[data-wheel-orb]");
    wheel?.classList.add("wheel--on");
    const runWheel = () => {
      if (!wheel) return;
      const h = vh();
      const r = wheel.getBoundingClientRect();
      if (r.bottom < -100 || r.top > h + 100) return;
      const last = words.length - 1;
      const p = Math.max(0, Math.min(1, -r.top / (r.height - h))) * last;
      const act = Math.round(p);
      words.forEach((el, i) => {
        const d = i - p;
        const a = Math.abs(d);
        const H = el.offsetHeight;
        el.style.transform = `translateY(calc(-50% + ${d * H * 0.92}px)) rotateX(${d * -42}deg) scale(${1 - Math.min(a, 2.5) * 0.14})`;
        el.style.opacity = String(Math.max(0, 1 - a * 0.6));
        el.style.color = i === act ? "#FF4A1C" : "#DAD8D0";
      });
      if (count) count.textContent = "0" + (act + 1);
      if (bar) bar.style.transform = `scaleX(${(p + 1) / words.length})`;
      if (orb) {
        orb.style.background = ORB_COLORS[act % ORB_COLORS.length];
        orb.style.borderRadius = act % 2 ? "28%" : "50%";
        orb.style.rotate = p * 60 + "deg";
      }
    };

    // ---------- Stacked cards ----------
    const cards = visible("[data-stack]");
    // On phones each card is taller than the screen, so stacking would hide content.
    const canStack = () => window.innerWidth >= 700;
    const layoutStack = () => {
      const h = vh();
      if (!canStack()) {
        cards.forEach((el) => {
          el.style.position = "relative";
          el.style.top = "0px";
          el.style.transform = "";
          el.style.filter = "";
          el.style.willChange = "";
        });
        return;
      }
      cards.forEach((el, i) => {
        el.style.position = "sticky";
        el.style.top = Math.min(96 + i * 10, h - el.offsetHeight - 24) + "px";
        el.style.willChange = "transform";
      });
    };
    const runStack = () => {
      if (!cards.length || !canStack()) return;
      const h = vh();
      const tops = cards.map((el) => el.getBoundingClientRect().top);
      const hs = cards.map((el) => el.offsetHeight);
      cards.forEach((el, i) => {
        let depth = 0;
        for (let j = i + 1; j < cards.length; j++) {
          depth += Math.max(0, Math.min(1, (tops[i] + hs[i] - tops[j]) / Math.min(hs[i], h * 0.8)));
        }
        const d = Math.min(depth, 3);
        el.style.transform = d > 0.001 ? `scale(${1 - d * 0.035})` : "";
        el.style.filter = d > 0.001 ? `brightness(${1 - d * 0.12})` : "";
      });
    };

    // ---------- Parallax ----------
    const hero = first("[data-hero]");
    const sx = visible("[data-sx]");
    const pxy = visible("[data-px],[data-py]");
    const runParallax = () => {
      const h = vh();
      const sy = hero ? -hero.getBoundingClientRect().top : 0;
      sx.forEach((el) => (el.style.translate = `${sy * parseFloat(el.dataset.sx!)}px 0`));
      pxy.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > h + 200) return;
        const d = r.top + r.height / 2 - h / 2;
        el.style.translate = el.dataset.px ? `${d * parseFloat(el.dataset.px)}px 0` : `0 ${d * parseFloat(el.dataset.py!)}px`;
      });
    };

    const progress = first("[data-progress]");
    const runProgress = () => {
      if (!progress) return;
      const max = document.documentElement.scrollHeight - vh();
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };

    const frame = () => {
      runProgress();
      runWheel();
      runStack();
      runParallax();
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        frame();
      });
    };
    const onResize = () => {
      layoutStack();
      onScroll();
    };

    layoutStack();
    frame();
    // Fonts and images can shift layout shortly after load; settle once more.
    const settle = window.setTimeout(onResize, 600);
    document.fonts?.ready.then(onResize);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(settle);
      cancelAnimationFrame(raf);
      counters.forEach(cancelAnimationFrame);
      io.disconnect();
      wheel?.classList.remove("wheel--on");
    };
  }, [pathname]);

  return null;
}
