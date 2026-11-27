import { STEPS } from "@/lib/services";

/* The 4-step process. variant "signposts": each step written on a road signpost (service detail pages).
 * variant "cards": compact sticker cards (services overview). */
type Step = { key: string; hi: string; en: string; desc: string };

export default function Steps({ icons, signpost, variant, steps = STEPS }: { icons: (string | null)[]; signpost: string | null; variant: "signposts" | "cards"; steps?: Step[] }) {
  if (variant === "cards") {
    return (
      <ol className="steps-cards">
        {steps.map((s, i) => (
          <li key={s.key} className="step-card" data-reveal={i * 90}>
            <div className="step-card-ico">
              {icons[i] ? <img src={icons[i]!} alt="" width={900} height={800} loading="lazy" /> : <span className="step-token">{i + 1}</span>}
            </div>
            <div className="step-card-n">0{i + 1}</div>
            <h3>{s.hi} <span>· {s.en}</span></h3>
            <p>{s.desc}</p>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <div className="signposts">
      <ol className="signposts-row">
        {steps.map((s, i) => (
          <li key={s.key} className="signpost" data-reveal={i * 110}>
            <div className="signpost-art">
              {signpost ? <img src={signpost} alt="" width={758} height={900} loading="lazy" /> : <div className="signpost-fallback" />}
              <div className="signpost-board"><b>{s.hi}</b><small>Step 0{i + 1}</small></div>
              {icons[i] ? <img className="signpost-ico" src={icons[i]!} alt="" width={900} height={800} loading="lazy" /> : null}
            </div>
            <div className="signpost-text">
              <h3>{s.en}</h3>
              <p>{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="signposts-road" aria-hidden="true" />
    </div>
  );
}
