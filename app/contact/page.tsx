import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BookingForm from "@/components/contact/BookingForm";
import { Faq } from "@/components/services/Detail";
import { asset } from "@/lib/assets";
import { CONTACT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact: Book a ride",
  description: "Book a ride with SNAD Media. Tell us what you're building and we'll come back with a plan. 23 Nandanvan Society, Alkapuri, Vadodara.",
};

const MAPS = "https://www.google.com/maps/search/?api=1&query=23+Nandanvan+Society+Faramji+Rd+Alkapuri+Vadodara+390007";

const FAQS = [
  { q: "How fast will you reply?", a: "Usually within one working day. If it's urgent, WhatsApp us and say so." },
  { q: "Do you work with brands outside Vadodara?", a: "Yes. We work with brands across India, and most of our work happens just fine over video calls." },
  { q: "Is there a minimum budget?", a: "No fixed minimum. Tell us your goal and budget, and we'll tell you honestly what's possible." },
  { q: "Can I just come for chai?", a: "Of course. Drop us a line first so someone's at the adda with the kettle on." },
];

export default function ContactPage() {
  const stand = asset("/img/pages/contact/contact-stand.webp");
  const meter = asset("/img/pages/contact/fare-meter.webp");
  const map = asset("/img/pages/contact/contact-map.webp");

  return (
    <main className="contact-page">
      <section className="page-hero page-hero-teal">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><b>Contact</b></nav>
        <div className="pill pill-ink">The rickshaw stand</div>
        <h1 className="page-h1">Kahaan chalna hai? <span className="cream-text">Book a ride.</span></h1>
        <p className="lead">Tell us what you’re building. We’ll come back with a plan, usually before your chai goes cold.</p>
      </section>

      {stand ? (
        <div className="pano" data-reveal="">
          <img src={stand} alt="An auto-rickshaw stand with a friendly driver waving you in" width={2600} height={859} />
          <div className="pano-card" style={{ left: "1.4%", top: "77%", width: "17.2%", height: "19.4%" }} aria-hidden="true">
            <b>Stand No. 79</b><small>Alkapuri, Vadodara</small>
          </div>
          <div className="pano-board" style={{ left: "89.8%", top: "32.7%", width: "7.2%", height: "30.9%" }} aria-hidden="true">
            <small>Fare</small><b>Sorted</b><small>24×7</small>
          </div>
        </div>
      ) : null}
      <div className="border-strip" aria-hidden="true" />

      <section className="booking-sec" id="book">
        <Suspense fallback={<div className="booking-loading">Starting the meter…</div>}>
          <BookingForm meter={meter} />
        </Suspense>
      </section>

      <section className="horns" aria-label="Quick contact">
        <a className="horn-card horn-wa" href="https://wa.me/918980207979" target="_blank" rel="noopener noreferrer" data-reveal="0">
          <span className="horn-ico" aria-hidden="true">💬</span><b>WhatsApp</b><small>Fastest reply</small>
        </a>
        <a className="horn-card horn-call" href={`tel:${CONTACT.tel}`} data-reveal="80">
          <span className="horn-ico" aria-hidden="true">📞</span><b>{CONTACT.phone}</b><small>Mon–Sat, 10 to 7</small>
        </a>
        <a className="horn-card horn-mail" href={`mailto:${CONTACT.email}`} data-reveal="160">
          <span className="horn-ico" aria-hidden="true">✉️</span><b>{CONTACT.email}</b><small>For briefs & decks</small>
        </a>
      </section>

      <section className="adda">
        <div className="adda-map" data-reveal="">
          {map ? <img src={map} alt="Illustrated map of Alkapuri with the SNAD office marked" width={1800} height={1235} loading="lazy" /> : null}
          <span className="adda-ping" style={{ left: "49.7%", top: "47%" }} aria-hidden="true" />
          <span className="adda-label" style={{ left: "49.7%", top: "18%" }}>The Adda</span>
        </div>
        <div className="adda-info" data-reveal="120">
          <div className="pill pill-yellow">Find the adda</div>
          <h2 className="h2">Come for chai, <span className="red">stay for ideas.</span></h2>
          <p className="adda-addr">{CONTACT.address[0]}<br />{CONTACT.address[1]}</p>
          <div className="cta-actions">
            <a className="btn btn-red btn-lg" href={MAPS} target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a>
          </div>
        </div>
      </section>

      <Faq faqs={FAQS} title="Before you" accentText="honk." />
    </main>
  );
}
