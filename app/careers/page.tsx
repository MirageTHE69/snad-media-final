import type { Metadata } from "next";
import Link from "next/link";
import RolesAndApply from "@/components/careers/RolesAndApply";
import Steps from "@/components/services/Steps";
import { asset } from "@/lib/assets";
import { HIRING_STEPS, PERKS, ROLES } from "@/lib/careers";
import { IMG, STEPS } from "@/lib/services";

export const metadata: Metadata = {
  title: "Careers: Drivers wanted",
  description: "Join SNAD Media in Vadodara. Open roles for designers, editors, marketers and developers. Licence optional.",
};

/* the 4 blank oval posters painted on the wall */
const OVALS = [17.8, 35.2, 52.6, 70].map((left) => ({ left, top: 23.2, width: 14, height: 31.7 }));

export default function CareersPage() {
  const wall = asset("/img/pages/careers/hire-wall.webp");
  const poster = asset("/img/pages/careers/wanted-poster.webp");
  const tiffin = asset("/img/pages/careers/tiffin.webp");
  const icons = STEPS.map((_, i) => asset(IMG.step(i)));
  const signpost = asset("/img/pages/services/signpost.webp");

  return (
    <main className="careers-page">
      <section className="page-hero page-hero-purple">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><b>Careers</b></nav>
        <div className="pill pill-yellow">Drivers wanted</div>
        <h1 className="page-h1">Licence <span className="yel">optional.</span> Talent compulsory.</h1>
        <p className="lead">We&apos;re looking for curious, kind and slightly obsessive people to help drive brands across India. From Vadodara, with chai.</p>
      </section>

      {wall ? (
        <div className="pano wall" data-reveal="">
          <img src={wall} alt="A street wall covered with posters" width={2200} height={1288} />
          {ROLES.slice(0, 4).map((r, i) => (
            <a key={r.slug} href={`#role-${r.slug}`} className="wall-oval" style={{ left: `${OVALS[i].left}%`, top: `${OVALS[i].top}%`, width: `${OVALS[i].width}%`, height: `${OVALS[i].height}%` }}>
              <small>Wanted</small>
              <b>{r.short}</b>
              <span>{r.where.split(" · ")[0]}</span>
            </a>
          ))}
        </div>
      ) : null}
      <div className="border-strip" aria-hidden="true" />

      <RolesAndApply poster={poster}>
      <section className="perks">
        <div className="perks-grid">
          <div className="tiffin-art" data-reveal="">
            {tiffin ? <img src={tiffin} alt="An open steel tiffin full of food" width={885} height={900} loading="lazy" /> : null}
          </div>
          <div data-reveal="120">
            <div className="pill pill-ink">What&apos;s in the tiffin</div>
            <h2 className="h2">Perks, <span className="red">ghar jaisa.</span></h2>
            <ul className="perks-list">
              {PERKS.map((p) => <li key={p.t}><b>{p.t}</b><span>{p.d}</span></li>)}
            </ul>
            <p className="proof-note perks-note">Example perks for now.</p>
          </div>
        </div>
      </section>

      <section className="howwe">
        <div className="center-head" data-reveal="">
          <div className="pill pill-ink">How hiring works</div>
          <h2 className="h2">Four stops <span className="shop-accent-text" style={{ ["--c" as string]: "#FFC72C" } as React.CSSProperties}>to your permit.</span></h2>
        </div>
        <Steps icons={icons} signpost={signpost} variant="signposts" steps={HIRING_STEPS} />
      </section>
      </RolesAndApply>
    </main>
  );
}
