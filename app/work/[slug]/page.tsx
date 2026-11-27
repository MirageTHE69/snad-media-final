import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PosterCard from "@/components/work/PosterCard";
import Tickets from "@/components/work/Tickets";
import CtaBand from "@/components/services/CtaBand";
import { CASE_STUDIES, caseBySlug } from "@/lib/cases";
import { serviceBySlug, serviceHref, stopFor } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = caseBySlug((await params).slug);
  return c ? { title: `${c.client}: ${c.logline}`, description: `${c.plot} Result: ${c.metric} ${c.metricLabel}.` } : {};
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = caseBySlug((await params).slug);
  if (!c) notFound();
  const others = CASE_STUDIES.filter((x) => x.slug !== c.slug);
  const scenes = [
    { no: "01", title: "The plot", body: <p>{c.plot}</p> },
    { no: "02", title: "The twist", body: <p>{c.twist}</p> },
    { no: "03", title: "The climax", body: <ul>{c.climax.map((x) => <li key={x}>{x}</li>)}</ul> },
  ];

  return (
    <main className="case-page" style={{ ["--c" as string]: c.color } as React.CSSProperties}>
      <section className="case-hero">
        <div className="case-poster" data-reveal="">
          <img src={c.poster} alt={`${c.client} campaign poster`} width={c.posterW} height={c.posterH} />
        </div>
        <div className="case-info">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/work">Work</Link><span>/</span><b>{c.client}</b></nav>
          <div className="pill pill-ink">Now showing · {c.genre}</div>
          <h1 className="page-h1">{c.client}</h1>
          <p className="case-logline">{c.logline}</p>
          <div className="case-big">
            <b>{c.metric}</b>
            <span>{c.metricLabel}</span>
          </div>
          <dl className="credits">
            <div><dt>Client</dt><dd>{c.client}</dd></div>
            <div><dt>Industry</dt><dd>{c.industry}</dd></div>
            <div><dt>Year</dt><dd>{c.year}</dd></div>
            <div>
              <dt>Crew</dt>
              <dd className="credits-crew">
                {c.services.map((slug) => {
                  const s = serviceBySlug(slug);
                  return s ? <Link key={slug} href={serviceHref(s)} className="chip">{stopFor(s).name}</Link> : null;
                })}
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <div className="border-strip" aria-hidden="true" />

      <section className="scenes">
        {scenes.map((s, i) => (
          <article key={s.no} className="case-scene" data-reveal={i * 90}>
            <div className="case-clap" aria-hidden="true"><span>Scene {s.no}</span><span>Take 1</span></div>
            <h2>{s.title}</h2>
            {s.body}
          </article>
        ))}
      </section>

      <section className="box-office">
        <div className="center-head" data-reveal="">
          <div className="pill pill-yellow">Box office</div>
          <h2 className="h2 h2-shadow">The <span className="yel">collections.</span></h2>
        </div>
        <Tickets items={c.results} />
      </section>

      <section className="review">
        <figure className="review-paper" data-reveal="">
          <div className="review-mast">The Daily Sawari · Film review</div>
          <div className="review-stars" aria-label={`${c.rating} out of 5 stars`}>{"★".repeat(c.rating)}{"☆".repeat(5 - c.rating)}</div>
          <blockquote>“{c.quote}”</blockquote>
          <figcaption>{c.quoteBy}</figcaption>
        </figure>
      </section>

      <section className="now-next">
        <div className="center-head" data-reveal="">
          <h2 className="h2">Also <span className="red">now showing.</span></h2>
        </div>
        <div className="film-wall film-wall-2">
          {others.map((o, i) => <PosterCard key={o.slug} c={o} reveal={i * 90} />)}
        </div>
        <p className="proof-note case-note">Example case study for now. Real work coming soon.</p>
      </section>

      <CtaBand title="Want a sequel?" accentText="Let’s talk." line="Tell us about your brand. We’ll come back with a plan, usually before your chai goes cold." />
    </main>
  );
}
