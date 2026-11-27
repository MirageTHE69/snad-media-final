import Link from "next/link";

/* Closing call to action used on the inner pages. */
export default function CtaBand({ title, accentText, line }: { title: string; accentText: string; line: string }) {
  return (
    <section className="cta-band" aria-label="Book a ride">
      <div className="cta-band-inner">
        <img className="cta-plate" src="/img/horn-ok-plate.webp" alt="Horn OK Please" width={1107} height={648} loading="lazy" />
        <div>
          <h2 className="h2">{title} <span>{accentText}</span></h2>
          <p className="lead">{line}</p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-yellow btn-lg">Book a ride ↗</Link>
            <a href="https://wa.me/918980207979" className="btn btn-cream btn-lg" target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
