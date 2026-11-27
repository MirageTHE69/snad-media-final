import Image from "next/image";
import { CAST } from "@/lib/data";

export default function Cast() {
  return (
    <section id="cast" className="cast" aria-labelledby="cast-h">
      <div className="center-head" data-reveal="">
        <div className="pill pill-ink">Starring</div>
        <h2 id="cast-h" className="h2 h2-shadow cast-h">The <span className="yel">sorted</span> cast.</h2>
      </div>
      <div className="cast-grid">
        {CAST.map((m, i) => (
          <article key={m.name} className="cast-card" data-reveal={i * 90} style={{ ["--r" as string]: `${m.rot}deg` } as React.CSSProperties}>
            <div className="cast-photo" style={{ background: m.color }}>
              <Image src={m.img} alt={`${m.name}, ${m.role}`} width={640} height={800} sizes="(max-width: 600px) 45vw, 280px" />
            </div>
            <div className="cast-meta">
              <div>
                <h3>{m.name}</h3>
                <div className="cast-role">{m.role}</div>
              </div>
              <span className="cast-arrow" style={{ background: m.color }} aria-hidden="true">↗</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
