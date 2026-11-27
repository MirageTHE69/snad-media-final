import Image from "next/image";
import { CAST, COLORS } from "@/lib/data";

const DARK_BG: string[] = [COLORS.red, COLORS.purple];

/* The Cast: every team member gets a "SNAD Sawari Permit", a driver's ID card. */
export default function Cast() {
  return (
    <section id="cast" className="cast" aria-labelledby="cast-h">
      <div className="cast-head" data-reveal="">
        <div>
          <div className="pill pill-red">Licensed drivers</div>
          <h2 id="cast-h" className="h2 cast-h">The <span className="red">sorted</span> cast.</h2>
        </div>
        <p className="cast-intro">
          Every brand gets a driver who knows the route. Meet the people behind the wheel.
        </p>
      </div>

      <div className="cast-grid" role="list">
        {CAST.map((m, i) => (
          <article
            key={m.name}
            role="listitem"
            className="permit"
            data-reveal={i * 90}
            style={{ ["--c" as string]: m.color, ["--t" as string]: DARK_BG.includes(m.color) ? "#fff" : "#141414" } as React.CSSProperties}
          >
            <header className="permit-top">
              <span className="permit-title">SNAD SAWARI PERMIT</span>
              <span className="permit-no">No. 0{i + 1}</span>
            </header>

            <div className="permit-photo">
              <Image src={m.img} alt={`${m.name}, ${m.role}`} width={640} height={800} sizes="(max-width: 600px) 78vw, (max-width: 1100px) 45vw, 280px" />
              <span className="permit-stamp" aria-hidden="true">
                <span>Verified</span>
                <b>✓</b>
                <span>Sorted</span>
              </span>
            </div>

            <div className="permit-body">
              <h3>{m.name}</h3>
              <div className="permit-role">{m.role}</div>
              <dl className="permit-facts">
                <div><dt>Route</dt><dd>{m.route}</dd></div>
                <div><dt>Runs on</dt><dd>{m.fuel}</dd></div>
                <div><dt>On the road since</dt><dd>{m.since}</dd></div>
              </dl>
            </div>

            <footer className="permit-foot" aria-hidden="true">
              <span className="permit-barcode" />
              <span className="permit-plate">GJ 06 · SNAD</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
