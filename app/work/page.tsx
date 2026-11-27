import type { Metadata } from "next";
import Link from "next/link";
import WorkGrid from "@/components/work/WorkGrid";
import Tickets from "@/components/work/Tickets";
import CtaBand from "@/components/services/CtaBand";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Work: Now showing",
  description: "Case studies from SNAD Media: campaigns, films and launches that went housefull.",
};

export default function WorkPage() {
  const cinema = asset("/img/pages/work/work-cinema.webp");
  return (
    <main className="work-page">
      <section className="work-hero">
        <div className="work-hero-head">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><b>Work</b></nav>
          <div className="pill pill-yellow">The cinema hall</div>
          <h1 className="page-h1">Blockbusters, <span className="yel">not reruns.</span></h1>
        </div>
        <div className="cinema-big" data-reveal="">
          {cinema ? <img src={cinema} alt="Inside a grand single-screen cinema with a cheering audience" width={2000} height={1457} /> : null}
          <div className="cinema-screen" style={{ left: "29%", top: "29.9%", width: "42.8%", height: "34.4%" }}>
            <span className="cinema-now">● Now showing ●</span>
            <b>Housefull results</b>
            <small>A SNAD Media production</small>
          </div>
        </div>
      </section>
      <div className="border-strip" aria-hidden="true" />

      <section className="work-wall">
        <div className="center-head" data-reveal="">
          <h2 className="h2">Pick a <span className="red">genre.</span></h2>
          <p className="lead">Every campaign is a film: a plot, a twist and a box office. Grab a seat.</p>
        </div>
        <WorkGrid />
      </section>

      <section className="box-office">
        <div className="center-head" data-reveal="">
          <div className="pill pill-yellow">Box office</div>
          <h2 className="h2 h2-shadow">Total <span className="yel">collections.</span></h2>
        </div>
        <Tickets items={[{ v: "12M+", l: "views on our films" }, { v: "₹40Cr+", l: "media managed" }, { v: "250+", l: "brands on board" }, { v: "3.8x", l: "average ROAS" }]} />
        <p className="proof-note">Example numbers for now. Real results coming soon.</p>
      </section>

      <CtaBand title="Your brand, the hero?" accentText="Let’s shoot." line="Tell us the story you want people talking about. We’ll write the script, cast it and make it housefull." />
    </main>
  );
}
