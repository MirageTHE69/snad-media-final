import Link from "next/link";
import { Fragment } from "react";
import { CONTACT, SOCIALS, VERTICALS } from "@/lib/content";
import { Logo } from "./Logo";

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Studio Seven Nine", href: "/#studio" },
  { label: "Team", href: "/#team" },
  { label: "Blog", href: "/#blog" },
];

const WORDS = ["Fassst", "Young", "Sorted", "Fassst", "Young", "Sorted"];

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__big" data-px="-0.08" aria-hidden="true">
        Let&apos;s talk ✦ Let&apos;s talk
      </div>
      <h2 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        Let&apos;s talk
      </h2>
      <div className="contact__row" data-reveal="">
        <p>Tell us what you are building. We will come back with a plan.</p>
        <div className="btn-row">
          <a href={`mailto:${CONTACT.email}`} className="btn btn--lg btn--ink">
            {CONTACT.email} ↗
          </a>
          <a href={CONTACT.phoneHref} className="btn btn--lg btn--ghost-ink">
            {CONTACT.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div data-reveal="0" style={{ minWidth: 0 }}>
          <Link href="/" style={{ color: "var(--cream)", display: "inline-flex" }} aria-label="SNAD Media — home">
            <Logo size="footer" />
          </Link>
          <p className="footer__about">
            Digital marketing and creative agency. A strategic partner across creative, media and technology.
          </p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="pill-link" target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col" data-reveal="80">
          <div className="footer__label">Services</div>
          {VERTICALS.map((v) => (
            <Link key={v.id} href={`/services#${v.id}`}>
              {v.title}
            </Link>
          ))}
        </div>

        <div className="footer__col" data-reveal="160">
          <div className="footer__label">Explore</div>
          {EXPLORE.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>

        <div data-reveal="240">
          <div className="footer__label" style={{ marginBottom: 18 }}>
            Visit
          </div>
          <address className="footer__addr">
            {CONTACT.addressLines[0]}
            <br />
            {CONTACT.addressLines[1]}
          </address>
          <div className="footer__contact">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </div>
        </div>
      </div>

      <div className="footer__marquee-wrap" aria-hidden="true">
        <div className="marquee footer__marquee">
          {[...WORDS, ...WORDS].map((w, i) => (
            <Fragment key={i}>
              <span>{w}</span>
              <span className="star">✦</span>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <span>
          © 2026 SNAD Media. All rights reserved.
          <br />
          <small>
            Illustrations by <a href="https://storyset.com/" target="_blank" rel="noopener noreferrer">Storyset</a>
            {" · "}Photos from <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a>
          </small>
        </span>
        <a href="#top" className="to-top">
          Back to top<span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
