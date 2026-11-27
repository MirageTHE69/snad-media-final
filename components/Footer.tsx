import Logo from "./Logo";
import { CONTACT, STOPS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="border-strip border-strip-footer" aria-hidden="true" />
      <div className="footer-grid">
        <div>
          <a href="#top" aria-label="Back to top"><Logo variant="footer" /></a>
          <p className="footer-about">Creative, media and technology agency. Fassst, young and sorted.</p>
        </div>
        <div className="footer-col">
          <div className="footer-h">THE STOPS</div>
          {STOPS.map((s) => (
            <a key={s.id} href={`#${s.id}`}>{s.name} · {s.service}</a>
          ))}
        </div>
        <div className="footer-col">
          <div className="footer-h">EXPLORE</div>
          <a href="#work">Work</a>
          <a href="#garage">Studio Seven Nine</a>
          <a href="#cast">The Cast</a>
          <a href="#contact">Contact</a>
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
