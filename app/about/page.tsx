import type { Metadata } from "next";
import Link from "next/link";
import Cast from "@/components/Cast";
import CtaBand from "@/components/services/CtaBand";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "About: The garage",
  description: "SNAD Media is a creative, media and technology agency from Alkapuri, Vadodara. Fassst, young and sorted since 2017.",
};

/* EXAMPLE timeline: replace with SNAD's real story */
const ROAD = [
  { y: "2017", t: "First ride", d: "Three people, one laptop and a lot of chai in Alkapuri." },
  { y: "2019", t: "Tech Tapri opens", d: "Our first websites and online stores go live." },
  { y: "2021", t: "100 brands on board", d: "Studio Seven Nine, our martech garage, is born." },
  { y: "2023", t: "The press rolls", d: "Print and packaging join the bazaar." },
  { y: "2025", t: "45+ sorted humans", d: "250+ brands, seven shops, one very full adda." },
];

const VALUES = [
  { k: "Fassst.", d: "Ideas by tomorrow, not next quarter. We move quickly because the feed does." },
  { k: "Young.", d: "Curious, a little cheeky and always learning. Age is a number; freshness is a habit." },
  { k: "Sorted.", d: "Clear plans, honest numbers and no drama. You always know where the ride is going." },
];
const PANELS = [
  { left: 30.2, top: 19, width: 39.6, height: 10.2 },
  { left: 28.4, top: 36.5, width: 43.2, height: 9.6 },
  { left: 28.4, top: 52.1, width: 43.2, height: 9.8 },
];

export default function AboutPage() {
  const garage = asset("/img/pages/about/about-garage.webp");
  const truck = asset("/img/pages/about/about-truck-back.webp");
  const vadodara = asset("/img/pages/about/about-vadodara.webp");

  return (
    <main className="about-page">
      <section className="page-hero page-hero-yellow">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><b>About</b></nav>
        <div className="pill pill-ink">The garage</div>
        <h1 className="page-h1">Where the <span className="red">rickshaw</span> was built.</h1>
        <p className="lead">SNAD Media started in a small garage-sized office in Alkapuri with one idea: brands deserve to be noticed, remembered and chosen. We&apos;ve been painting, tuning and driving ever since.</p>
      </section>

      {garage ? (
        <div className="pano pano-garage" data-reveal="">
          <img src={garage} alt="The SNAD rickshaw being painted in a truck-art garage" width={2000} height={1372} />
          <div className="pano-card" style={{ left: "1.8%", top: "80.7%", width: "24.5%", height: "17.5%" }} aria-hidden="true">
            <b>Est. 2017</b><small>Workshop always open</small>
          </div>
        </div>
      ) : null}
      <div className="border-strip" aria-hidden="true" />

      <section className="story">
        <div className="story-grid">
          <div data-reveal="">
            <div className="pill pill-red">Our story</div>
            <h2 className="h2">Seven shops, <span className="red">one ride.</span></h2>
          </div>
          <div className="story-text" data-reveal="100">
            <p>We&apos;re a creative, media and technology agency, which is a long way of saying we do everything a brand needs to get from &ldquo;who?&rdquo; to &ldquo;wow&rdquo;. Strategy, identity, content, media, tech, research and print, all under one roof, all talking to each other.</p>
            <p>We&apos;re proudly from Vadodara. We think like a bazaar: loud, colourful, quick on our feet and honest about the price. And like every good rickshaw, we&apos;ll get you there faster than you expected.</p>
          </div>
        </div>
      </section>

      <section className="roadtrip">
        <div className="center-head" data-reveal="">
          <div className="pill pill-yellow">The road so far</div>
          <h2 className="h2 h2-shadow">Kilometres <span className="yel">covered.</span></h2>
        </div>
        <ol className="road-stops">
          {ROAD.map((r, i) => (
            <li key={r.y} className="road-stop" data-reveal={i * 90}>
              <div className="stone road-stone" style={{ transform: `rotate(${[-2, 1.5, -1, 2, -1.5][i]}deg)` }}>
                <img src="/img/milestone.webp" alt="" width={525} height={657} loading="lazy" />
                <div className="stone-text"><span className="stone-num">{r.y}</span></div>
              </div>
              <h3>{r.t}</h3>
              <p>{r.d}</p>
            </li>
          ))}
        </ol>
        <div className="signposts-road" aria-hidden="true" />
      </section>

      <section className="values">
        <div className="values-grid">
          <div className="truck" data-reveal="">
            {truck ? <img src={truck} alt="The back of a painted truck with our three rules" width={761} height={900} loading="lazy" /> : null}
            {VALUES.map((v, i) => (
              <div key={v.k} className="truck-panel" style={{ left: `${PANELS[i].left}%`, top: `${PANELS[i].top}%`, width: `${PANELS[i].width}%`, height: `${PANELS[i].height}%` }}>
                {v.k}
              </div>
            ))}
          </div>
          <div data-reveal="120">
            <div className="pill pill-ink">Rules of the road</div>
            <h2 className="h2">Painted on the back, <span className="red">lived every day.</span></h2>
            <ol className="values-list">
              {VALUES.map((v, i) => (
                <li key={v.k}><span className="values-n">{i + 1}</span><div><b>{v.k}</b><p>{v.d}</p></div></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {vadodara ? (
        <section className="vadodara">
          <img src={vadodara} alt="Illustrated Vadodara skyline with Laxmi Vilas Palace, a banyan tree, garba dancers and kites" width={2600} height={859} loading="lazy" />
          <div className="vadodara-text">
            <h2 className="h2 h2-shadow">Made in <span className="yel">Vadodara.</span></h2>
            <p>Sanskari Nagari, garba capital, home of the best sev usal. And of us.</p>
          </div>
        </section>
      ) : null}

      <Cast />

      <CtaBand title="Like the ride?" accentText="Hop in." line="Whether you need one shop or all seven, we’d love to hear what you’re building." />
    </main>
  );
}
