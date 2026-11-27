import Link from "next/link";
import ShopFront from "../ShopFront";
import { CASES, accent, type Stop } from "@/lib/data";
import { DETAIL_SERVICES, stopFor, type ServiceDetail } from "@/lib/services";

/* ---------- hero: the shutter rolls up and you step inside ---------- */
export function ShopHero({ svc, stop, interior }: { svc: ServiceDetail; stop: Stop; interior: string | null }) {
  return (
    <section className="shop-hero">
      <div className="shop-hero-text">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><b>{stop.name}</b>
        </nav>
        <div className="shop-hero-badges">
          <span className="stop-badge stop-badge-lg">STOP {stop.no} / 07</span>
          <span className="shop-hero-service">{stop.service}</span>
        </div>
        <h1 className="page-h1 shop-h1">{stop.name}</h1>
        <div className="shop-hindi">{stop.hindi}</div>
        <p className="shop-tagline">{svc.tagline}</p>
        <p className="lead">{svc.intro}</p>
        <div className="hero-ctas-left">
          <Link href={`/contact?stop=${encodeURIComponent(stop.short)}`} className="btn btn-ink btn-lg">Book this stop ↗</Link>
          <a href="#shelf" className="btn btn-cream btn-lg">See the shelf ↓</a>
        </div>
      </div>
      <div className="shop-window">
        <div className="shop-window-awning" aria-hidden="true" />
        <div className="shop-window-frame">
          {interior ? (
            <img className="shop-interior" src={interior} alt={`Inside ${stop.name}`} width={1800} height={1591} fetchPriority="high" />
          ) : (
            <div className="shop-interior shop-interior-fallback"><ShopFront stop={stop} eager /></div>
          )}
          {interior && svc.sign ? (
            <div className="shop-sign" style={{ left: `${svc.sign.left}%`, top: `${svc.sign.top}%`, width: `${svc.sign.width}%`, height: `${svc.sign.height}%` }} aria-hidden="true">
              <b>{stop.hindi}</b>
              <small>Stop {stop.no} · Khula hai</small>
            </div>
          ) : null}
          <div className="shutter" aria-hidden="true"><span /></div>
          {!svc.sign ? <div className="shop-window-sign" aria-hidden="true">Khula hai · Open</div> : null}
        </div>
      </div>
    </section>
  );
}

/* ---------- what's on the shelf ---------- */
export function Shelf({ svc, stop, keeper, items }: { svc: ServiceDetail; stop: Stop; keeper: string | null; items: (string | null)[] }) {
  return (
    <section id="shelf" className="shelf">
      <div className="shelf-top">
        <div className="shelf-keeper" data-reveal="">
          <div className="keeper-bubble">{svc.keeperLine}</div>
          <img
            className={`keeper-img ${keeper ? "" : "is-tiger"}`}
            src={keeper ?? "/img/tiger-wink.webp"}
            alt={keeper ? `The ${stop.name} shopkeeper` : "The SNAD tiger"}
            width={900}
            height={885}
            loading="lazy"
          />
        </div>
        <div className="shelf-intro" data-reveal="100">
          <div className="pill pill-ink">What&apos;s on the shelf</div>
          <h2 className="h2">Fresh at <span className="shop-accent-text">{stop.name}.</span></h2>
          <div className="rate-board">
            <img src="/img/pages/services/rate-board.webp" alt="" width={747} height={900} loading="lazy" />
            <ol className="rate-list" style={{ ["--rows" as string]: svc.items.length } as React.CSSProperties}>
              {svc.items.map((it, i) => (
                <li key={it.key}>
                  <a href={`#item-${it.key}`}>
                    <span className="rate-n">{i + 1}.</span>
                    <span className="rate-name">{it.name}</span>
                    <span className="rate-dots" aria-hidden="true" />
                    <span className="rate-price">sorted</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="shelf-items" style={{ ["--n" as string]: svc.items.length } as React.CSSProperties}>
        {svc.items.map((it, i) => (
          <article key={it.key} id={`item-${it.key}`} className="shelf-item" data-reveal={i * 80}>
            <div className="shelf-item-art">
              {items[i] ? <img src={items[i]!} alt="" width={900} height={850} loading="lazy" /> : <span className="shelf-token">{String(i + 1).padStart(2, "0")}</span>}
            </div>
            <h3>{it.name}</h3>
            <p>{it.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- proof: numbers on milestones + a related case-study poster ---------- */
export function Proof({ svc }: { svc: ServiceDetail }) {
  const c = CASES[svc.caseIdx];
  return (
    <section className="proof">
      <div className="center-head" data-reveal="">
        <div className="pill pill-yellow">Proof, not promises</div>
        <h2 className="h2 h2-shadow">The meter <span className="yel">doesn&apos;t lie.</span></h2>
      </div>
      <div className="proof-grid">
        <div className="proof-stones">
          {svc.stats.map((s, i) => (
            <div key={s.l} className="stone" data-reveal={i * 90} style={{ transform: `rotate(${[-2, 1.5, -1][i]}deg)` }}>
              <img src="/img/milestone.webp" alt="" width={525} height={657} loading="lazy" />
              <div className="stone-text">
                <span className="stone-num">{s.v}</span>
                <span className="stone-label">{s.l}</span>
              </div>
            </div>
          ))}
        </div>
        <Link href="/work" className="poster proof-poster" data-reveal="200">
          <div className="poster-screen" style={{ background: c.bg }}>
            <div className="poster-client">{c.client} · {c.service}</div>
            <div className="poster-metric">{c.metric}</div>
            <div className="poster-label">{c.label}</div>
          </div>
          <img src="/img/poster-frame.webp" alt="" width={888} height={647} loading="lazy" />
          <div className="poster-line">{c.line}</div>
        </Link>
      </div>
      <p className="proof-note">Example numbers for now. Real results coming soon.</p>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function Faq({ faqs, title = "Pooch lo,", accentText = "sharmao mat." }: { faqs: { q: string; a: string }[]; title?: string; accentText?: string }) {
  return (
    <section className="faq">
      <div className="center-head" data-reveal="">
        <div className="pill pill-red">Chai pe questions</div>
        <h2 className="h2">{title} <span className="red">{accentText}</span></h2>
      </div>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <details key={f.q} className="faq-item" data-reveal={i * 60} open={i === 0}>
            <summary>
              <span className="faq-glass" aria-hidden="true" />
              <span className="faq-q">{f.q}</span>
              <span className="faq-plus" aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------- next / previous stop ---------- */
export function NextStop({ svc }: { svc: ServiceDetail }) {
  const list = DETAIL_SERVICES;
  const i = list.findIndex((s) => s.slug === svc.slug);
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  const card = (s: ServiceDetail, dir: "prev" | "next") => {
    const st = stopFor(s);
    return (
      <Link href={`/services/${s.slug}`} className={`next-card next-${dir}`} style={{ ["--c" as string]: accent(st), ["--ct" as string]: st.badgeText } as React.CSSProperties}>
        <span className="next-label">{dir === "next" ? "Next stop →" : "← Previous stop"}</span>
        <ShopFront stop={st} className="next-shop" />
        <b>{st.name}</b>
        <small>{st.service}</small>
      </Link>
    );
  };
  return (
    <section className="next-stop" aria-label="More stops">
      {card(prev, "prev")}
      <div className="next-mid">
        <div className="next-rick" aria-hidden="true"><img src="/img/rickshaw-body.webp" alt="" width={1032} height={708} loading="lazy" /></div>
        <Link href="/services" className="btn btn-cream btn-lg">All 7 shops</Link>
      </div>
      {card(next, "next")}
    </section>
  );
}
