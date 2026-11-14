import Link from "next/link";
import { Fragment } from "react";
import Media from "@/components/Media";
import Splash from "@/components/Splash";
import {
  ACRONYM,
  CASES,
  CLIENT_LOGOS,
  MARQUEE,
  POSTS,
  STUDIO_POINTS,
  TAGS,
  TEAM,
  VERTICALS,
  WHY,
} from "@/lib/content";

const rise = (extra: number) => ({ animationDelay: `calc(var(--splash) + ${extra}s)` });

export default function Home() {
  const half = Math.ceil(CLIENT_LOGOS.length / 2);
  const logoRows = [CLIENT_LOGOS.slice(0, half), CLIENT_LOGOS.slice(half)];

  return (
    <>
      <Splash />

      {/* HERO */}
      <section className="hero" data-hero="">
        <div className="hero__ring" data-py="-0.12" />
        <div className="hero__diamond" data-py="0.18" />

        <h1 className="display hero__title">
          <span className="hero__line" data-sx="-0.10" style={rise(0)}>
            <span className="accent">#</span>Fassst
          </span>
          <span className="hero__line hero__line--indent" data-sx="0.14" style={rise(0.12)}>
            Young <span className="accent">&amp;</span>
          </span>
          <span className="hero__line" data-sx="-0.06" style={rise(0.24)}>
            Sorted<span className="accent">.</span>
          </span>
          <span className="hero__badge" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="snad-ring" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
              </defs>
              <text style={{ font: "700 15px var(--display)" }} fill="#262724">
                <textPath href="#snad-ring" textLength="440" lengthAdjust="spacing">
                  CREATIVE · MEDIA · TECHNOLOGY · VADODARA ·
                </textPath>
              </text>
              <circle cx="100" cy="100" r="16" fill="#262724" />
            </svg>
          </span>
        </h1>

        <div className="hero__row">
          <p className="lede">
            SNAD Media is a digital marketing and creative agency in Alkapuri, Vadodara. A strategic partner across{" "}
            <strong>creative, media and technology.</strong>
          </p>
          <div className="btn-row">
            <a href="#contact" className="btn btn--orange">
              Start a project ↗
            </a>
            <Link href="/services" className="btn btn--ghost-light">
              See services
            </Link>
          </div>
        </div>

        <div className="hero__cards">
          <div className="hero__card hero__card--l">
            <Media src="/illustrations/hero-social.svg" alt="Illustration of a person on a laptop surrounded by social media icons" priority />
          </div>
          <div className="hero__card hero__card--mid hero__card--m">
            <Media src="/illustrations/hero-designer.svg" alt="Illustration of a designer working at a desk" priority />
          </div>
          <div className="hero__card hero__card--r">
            <Media src="/illustrations/hero-strategy.svg" alt="Illustration of two strategists sketching a plan on a board" priority />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="band" aria-hidden="true">
        <div className="marquee band__track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <Fragment key={i}>
              <span>{m}</span>
              <span>✦</span>
            </Fragment>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="section-cream services">
        <div className="services__head">
          <div data-reveal="" style={{ flex: "1 1 380px" }}>
            <div className="chip">What we do</div>
            <h2 className="display h-section services__title">
              Seven verticals,
              <br />
              <span className="accent">one team.</span>
            </h2>
          </div>
          <div className="tags" data-reveal="120">
            {TAGS.map((t) => (
              <span
                key={t.label}
                className="tag"
                style={
                  {
                    background: t.bg,
                    color: t.color,
                    "--r": t.r,
                    "--dur": t.dur,
                    "--delay": t.delay,
                  } as React.CSSProperties
                }
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>

        <div className="svc-grid">
          {VERTICALS.map((v, i) => (
            <Link
              key={v.id}
              href={`/services#${v.id}`}
              data-reveal={String((i % 4) * 80)}
              className={`svc-card${v.homeDark ? " svc-card--dark" : ""}`}
              style={{ "--hover": v.homeHover, "--tilt": v.homeTilt } as React.CSSProperties}
            >
              <div className="svc-card__top">
                <span className="svc-card__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="svc-card__arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
              <div>
                <div className="svc-card__kicker">SNAD X</div>
                <h3>{v.title}</h3>
                <p>{v.summary}</p>
              </div>
            </Link>
          ))}
          <Link href="/services" data-reveal="240" className="svc-card svc-card--all" style={{ "--tilt": "-1deg" } as React.CSSProperties}>
            <span className="spin-star" aria-hidden="true">
              ✦
            </span>
            <h3>All services →</h3>
          </Link>
        </div>
      </section>

      {/* ACRONYM */}
      <section className="wheel" data-wheel-wrap="" aria-label="What SNAD stands for">
        <div className="wheel__sticky" data-wheel-sticky="">
          <div className="wheel__head">
            <h2 className="h-small">What SNAD stands for</h2>
            <span className="wheel__count">
              <span data-wheel-count="" className="accent">
                01
              </span>{" "}
              / 07
            </span>
          </div>
          <div className="wheel__words" data-wheel="">
            {ACRONYM.map((w) => (
              <div key={w} className="wheel__word" data-word="">
                {w}
              </div>
            ))}
            <div className="wheel__orb" data-wheel-orb="" aria-hidden="true">
              <span>✦</span>
            </div>
          </div>
          <div className="wheel__foot">
            <span>Seven words we work by</span>
            <div className="wheel__track">
              <div className="wheel__bar" data-wheel-bar="" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section-cream why">
        <div className="why__grid">
          <div className="why__intro" data-reveal="">
            <div className="chip">Why SNAD</div>
            <h2 className="display">
              Young, passionate <span className="accent">and fun.</span>
            </h2>
            <p>We are client-centric by habit. Hundreds of companies worldwide trust us with their marketing.</p>
            <div className="why__art">
              <Media src="/illustrations/why-team.svg" alt="Illustration of a team celebrating with a high-five" white />
            </div>
          </div>
          <div className="why__list">
            {WHY.map((w, i) => (
              <div key={w.title} className={`why__item${w.dark ? " why__item--dark" : ""}`} data-reveal={String(i * 60)}>
                <span className={`why__num${w.square ? " why__num--sq" : ""}`} style={{ background: w.bg }}>
                  {i + 1}
                </span>
                <h3>{w.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="section-cream clients">
        <h2 className="h-small" data-reveal="">
          Brands that trust us
        </h2>
        <div className="clients__rows">
          {logoRows.map((row, r) => (
            <div key={r} className={`marquee clients__row${r ? " clients__row--rev" : ""}`}>
              {[...row, ...row].map((l, i) => (
                <div key={i} className="logo-card" aria-hidden={i >= row.length || undefined}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- tiny vector logos */}
                  <img src={l.src} alt={i < row.length ? l.name : ""} loading="lazy" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" className="section-cream cases">
        <div className="cases__head" data-reveal="">
          <h2 className="display h-section">
            Selected <span className="accent">work</span>
          </h2>
        </div>
        <div className="grid-3">
          {CASES.map((c, i) => (
            <article key={c.title} className="case" data-reveal={String(i * 100)}>
              <div className="case__img">
                <Media src={c.img} alt={c.alt} radius={18} />
              </div>
              <div className="case__body">
                <div className="case__meta">{c.meta}</div>
                <h3>{c.title}</h3>
                <div className="case__stat">
                  <b data-count={c.stat}>{c.stat}</b>
                  <span>{c.statLabel}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STUDIO SEVEN NINE */}
      <section id="studio" className="section-cream studio">
        <div className="studio__card" data-reveal="">
          <div className="studio__ring" aria-hidden="true" />
          <div style={{ position: "relative" }}>
            <div className="chip chip--orange">From SNAD</div>
            <h2 className="display studio__title">
              Studio
              <br />
              Seven <span style={{ color: "var(--yellow)" }}>Nine</span>
            </h2>
            <div className="studio__list">
              {STUDIO_POINTS.map((p) => (
                <div key={p.label}>
                  <i style={p.shape} aria-hidden="true" />
                  {p.label}
                </div>
              ))}
            </div>
          </div>
          <div className="studio__art" data-py="-0.06">
            <Media
              src="/illustrations/studio-funnel.svg"
              alt="Illustration of a magnet pulling customers through a marketing journey"
              radius={32}
            />
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="section-cream team">
        <h2 className="display h-section" data-reveal="">
          The <span className="accent">sorted</span> ones
        </h2>
        <div className="team__grid">
          {TEAM.map((m, i) => (
            <div key={m.name} className="member" data-reveal={String(i * 100)}>
              <div className="member__photo" style={{ aspectRatio: m.shape === "circle" ? "1 / 1" : "3 / 4" }}>
                <Media src={m.img} alt={`Portrait of ${m.name}`} shape={m.shape} sizes="(max-width: 900px) 50vw, 25vw" />
              </div>
              <span className="member__name" style={{ background: m.tag, transform: `rotate(${m.rot})` }}>
                {m.name}
              </span>
              <span className="member__role">{m.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="section-cream blog">
        <div className="blog__head" data-reveal="">
          <h2 className="h-small">From the blog</h2>
          <a href="#blog" className="underline-link">
            All posts →
          </a>
        </div>
        <div className="blog__grid">
          {POSTS.map((p, i) => (
            <a key={p.title} href="#blog" className="post" data-reveal={String(i * 100)}>
              <div className="post__img">
                <Media src={p.img} alt={p.alt} radius={24} />
              </div>
              <div className="post__meta">{p.meta}</div>
              <h3>{p.title}</h3>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
