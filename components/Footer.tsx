import Link from "next/link";
import Logo from "./Logo";
import { CONTACT, STOPS } from "@/lib/data";
import { serviceHrefByStop } from "@/lib/services";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="border-strip border-strip-footer" aria-hidden="true" />
      <div className="footer-grid">
        <div>
          <Link href="/" aria-label="SNAD Media home"><Logo variant="footer" /></Link>
          <p className="footer-about">Creative, media and technology agency. Fassst, young and sorted.</p>
        </div>
        <div className="footer-col">
          <Link href="/services" className="footer-h">THE STOPS</Link>
          {STOPS.map((s) => (
            <Link key={s.id} href={serviceHrefByStop(s.id)}>{s.name} · {s.service}</Link>
          ))}
        </div>
        <div className="footer-col">
          <div className="footer-h">EXPLORE</div>
          <Link href="/services">Services</Link>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
          <div className="socials">
            <a href="#" aria-label="SNAD Media on Instagram">Instagram</a>
            <a href="#" aria-label="SNAD Media on LinkedIn">LinkedIn</a>
          </div>
        </div>
        <div>
          <div className="footer-h">THE ADDA</div>
          <p className="footer-addr">{CONTACT.address[0]}<br />{CONTACT.address[1]}</p>
          <a className="footer-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a className="footer-link" href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 SNAD Media. Made in Vadodara with chai &amp; chaos.</span>
        <a href="#top">Back to the start ↑</a>
      </div>
    </footer>
  );
}
