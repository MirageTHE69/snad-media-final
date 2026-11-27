import Link from "next/link";
import type { CaseStudy } from "@/lib/cases";

/* A painted film poster for one case study: title on top, credits band at the bottom. */
export default function PosterCard({ c, reveal = 0 }: { c: CaseStudy; reveal?: number }) {
  return (
    <Link href={`/work/${c.slug}`} className="film-poster" data-reveal={reveal} style={{ ["--c" as string]: c.color } as React.CSSProperties}>
      <div className="film-art">
        <img src={c.poster} alt={`${c.client} campaign poster`} width={c.posterW} height={c.posterH} loading="lazy" />
        <div className="film-title">
          <span className="film-genre">{c.genre}</span>
          <b>{c.client}</b>
        </div>
        <div className="film-credits">
          <span>{c.industry} · {c.year}</span>
          <span className="film-metric">{c.metric} <small>{c.metricLabel}</small></span>
        </div>
      </div>
      <div className="film-logline">{c.logline}</div>
    </Link>
  );
}
