"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ShopFront from "../ShopFront";
import { accent } from "@/lib/data";
import { SERVICES, serviceCta, serviceHref, stopFor } from "@/lib/services";
import { canMotion, clamp } from "@/lib/motion";

/* Seven shop cards zig-zagging down the page. On desktop a dashed road draws itself between them
 * as you scroll, and a little rickshaw drives along its tip. */
export default function RouteList() {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const road = useRef<SVGPathElement>(null);
  const done = useRef<SVGPathElement>(null);
  const lane = useRef<SVGPathElement>(null);
  const rick = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current!, s = svg.current!, base = road.current!, line = done.current!, ln = lane.current!, rk = rick.current!;
    let len = 0, raf = 0, lastP = -1;

    const build = () => {
      const r = el.getBoundingClientRect();
      if (window.innerWidth < 900) { len = 0; return; }
      // layout offsets (ignore the reveal animation's translate)
      const pts = Array.from(el.querySelectorAll<HTMLElement>("[data-route-dot]")).map((d) => {
        let x = d.offsetWidth / 2, y = d.offsetHeight / 2, n: HTMLElement | null = d;
        while (n && n !== el) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
        return [x, y];
      });
      if (pts.length < 2) return;
      let d = `M${pts[0][0]},${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], my = (y1 - y0) / 2;
        d += ` C${x0},${y0 + my} ${x1},${y1 - my} ${x1},${y1}`;
      }
      s.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
      base.setAttribute("d", d);
      ln.setAttribute("d", d);
      line.setAttribute("d", d);
      len = line.getTotalLength();
      line.style.strokeDasharray = `${len}`;
      lastP = -1;
      tick();
    };

    const tick = () => {
      raf = 0;
      if (!len) return;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const p = canMotion() ? clamp((vh * 0.55 - r.top) / r.height) : 1;
      if (Math.abs(p - lastP) < 0.0005) return;
      const dir = p >= lastP ? 1 : -1;
      lastP = p;
      line.style.strokeDashoffset = `${len * (1 - p)}`;
      const at = line.getPointAtLength(len * p), ahead = line.getPointAtLength(Math.min(len, len * p + 2));
      const goingRight = (ahead.x - at.x) * dir >= 0;
      rk.style.transform = `translate(${at.x}px, ${at.y}px) translate(-50%, -78%) scaleX(${goingRight ? -1 : 1})`;
      rk.style.opacity = p > 0.002 && p < 0.998 ? "1" : "0";
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const ro = new ResizeObserver(build);
    ro.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", build);
    build();
    return () => { ro.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", build); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="route" ref={wrap}>
      <svg ref={svg} className="route-svg" aria-hidden="true" preserveAspectRatio="none">
        <path ref={road} className="route-road" />
        <path ref={lane} className="route-lane" />
        <path ref={done} className="route-done" />
      </svg>
      <div ref={rick} className="route-rick" aria-hidden="true">
        <img src="/img/rickshaw-body.webp" alt="" width={1032} height={708} />
      </div>
      {SERVICES.map((s, i) => {
        const stop = stopFor(s);
        return (
          <article
            key={s.slug}
            className={`route-stop ${i % 2 ? "is-right" : "is-left"}`}
            style={{ ["--c" as string]: accent(stop), ["--ct" as string]: stop.badgeText } as React.CSSProperties}
            data-reveal=""
          >
            <span className="route-dot" data-route-dot="" aria-hidden="true">{stop.no}</span>
            <Link href={serviceHref(s)} className="route-card" aria-label={`${stop.name}: ${stop.service}. ${s.detail ? "Step inside" : "Book this stop"}`}>
              <ShopFront stop={stop} className="route-shop" />
              <div className="route-info">
                <div className="route-top">
                  <span className="stop-badge" style={{ background: accent(stop), color: stop.badgeText }}>STOP {stop.no}</span>
                  <span className="ride-card-service">{stop.service}</span>
                </div>
                <h3>{stop.name} <span className="route-hi">{stop.hindi}</span></h3>
                <p>{stop.blurb}</p>
                <div className="chips">{stop.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                <span className="step-inside" style={{ borderBottomColor: accent(stop) }}>{serviceCta(s)}</span>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
