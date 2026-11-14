import type { Metadata } from "next";
import Media from "@/components/Media";
import Motion from "@/components/Motion";
import { VERTICALS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Seven verticals covering creative, media and technology: media, brand, technology, research, identity, strategy and print.",
};

const FLOAT = [
  { dur: "6s", delay: "0s" },
  { dur: "7s", delay: "-2s" },
  { dur: "6.5s", delay: "-1s" },
  { dur: "7s", delay: "-3s" },
  { dur: "6s", delay: "-2s" },
  { dur: "6.5s", delay: "-1s" },
  { dur: "7s", delay: "-3s" },
];

export default function Services() {
  return (
    <>
      {/* HEADER */}
      <section className="svc-hero" data-hero="">
        <div className="svc-hero__ring" aria-hidden="true" />
        <div className="chip chip--light">Services</div>
        <h1 className="display svc-hero__title">
          <span className="hero__line" data-sx="-0.03" style={{ animationDelay: "0s" }}>
            SNAD <span className="accent">X</span>
          </span>
          <span className="hero__line" data-sx="0.03" style={{ animationDelay: ".12s" }}>
            Everything
          </span>
        </h1>
        <div className="svc-hero__row">
          <p className="lede">Seven verticals covering creative, media and technology. Pick one or put them together.</p>
          <nav className="svc-hero__jump" aria-label="Jump to a service">
            {VERTICALS.map((v) => (
              <a key={v.id} href={`#${v.id}`} className="pill-link" style={{ "--hover": v.pillHover } as React.CSSProperties}>
                {v.short}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* STACK */}
      <section className="stack" aria-label="Verticals">
        {VERTICALS.map((v, i) => (
          <article
            key={v.id}
            id={v.id}
            data-stack=""
            className="vertical"
            style={{ background: v.bg, top: 92 + i * 12 }}
          >
            <div>
              <div className="vertical__kicker">
                <span className="vertical__num" style={{ background: v.numBg, color: v.numColor }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                SNAD X
              </div>
              <h2 className="display">{v.title}</h2>
              <p style={{ fontWeight: v.bodyWeight, marginBottom: v.tags.length ? 24 : 0 }}>{v.body}</p>
              {v.tags.length > 0 && (
                <div className="vertical__tags">
                  {v.tags.map((t) => (
                    <span key={t} style={{ background: v.tagBg, color: v.tagColor }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div
              className="vertical__art"
              style={{ "--dur": FLOAT[i].dur, "--delay": FLOAT[i].delay } as React.CSSProperties}
            >
              <Media src={v.art} alt={v.artAlt} white fit="contain" priority={i === 0} />
            </div>
          </article>
        ))}
      </section>
      {/* Runs after this page has hydrated, so it never fights React over inline styles. */}
      <Motion />
    </>
  );
}
