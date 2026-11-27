"use client";

import { useState } from "react";
import Link from "next/link";
import { accent } from "@/lib/data";
import { SERVICES, serviceHref, stopFor } from "@/lib/services";

type Opt = { label: string; score: Record<string, number> };
const QUESTIONS: { q: string; opts: Opt[] }[] = [
  {
    q: "What do you want most right now?",
    opts: [
      { label: "More leads & sales", score: { "media-mandi": 3, "tech-tapri": 2 } },
      { label: "A brand people love", score: { "brand-bazaar": 3, "logo-lohar": 2, "chai-pe-charcha": 2 } },
      { label: "Launch something new", score: { "chai-pe-charcha": 3, "brand-bazaar": 2, "printing-press": 1 } },
      { label: "Understand my customers", score: { "research-raddiwala": 3, "chai-pe-charcha": 1 } },
    ],
  },
  {
    q: "Where is your brand today?",
    opts: [
      { label: "Just starting out", score: { "logo-lohar": 3, "chai-pe-charcha": 2, "printing-press": 1 } },
      { label: "Growing fassst", score: { "media-mandi": 2, "brand-bazaar": 2, "tech-tapri": 1 } },
      { label: "Established, needs a refresh", score: { "logo-lohar": 2, "research-raddiwala": 2, "brand-bazaar": 1 } },
    ],
  },
  {
    q: "What do you need first?",
    opts: [
      { label: "A website or store", score: { "tech-tapri": 3 } },
      { label: "Content & social", score: { "brand-bazaar": 3 } },
      { label: "Ads that perform", score: { "media-mandi": 3 } },
      { label: "Packaging & print", score: { "printing-press": 3 } },
    ],
  },
];

/* "Not sure which stop?": three taps, then the fortune-teller parrot picks your shops. */
export default function RideQuiz({ parrot }: { parrot: string | null }) {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const doneAll = answers.every((a) => a !== null);

  const picks = (() => {
    if (!doneAll) return [];
    const score: Record<string, number> = {};
    answers.forEach((a, qi) => Object.entries(QUESTIONS[qi].opts[a!].score).forEach(([k, v]) => (score[k] = (score[k] || 0) + v)));
    return Object.entries(score).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => SERVICES.find((s) => s.slug === k)!);
  })();

  return (
    <div className="quiz">
      <div className="quiz-parrot">
        {parrot ? <img src={parrot} alt="The fortune-teller parrot picking a card" width={900} height={844} loading="lazy" /> : null}
        <div className={`quiz-bubble ${doneAll ? "is-done" : ""}`}>
          {doneAll ? "Tota ne card nikaal diya! Your stops are ready." : "Teen sawaal, teen jawaab. Main bataunga kahaan jaana hai!"}
        </div>
      </div>
      <div className="quiz-panel">
        {QUESTIONS.map((q, qi) => (
          <fieldset key={q.q} className="quiz-q">
            <legend><span className="quiz-n">{qi + 1}</span>{q.q}</legend>
            <div className="toggle-chips">
              {q.opts.map((o, oi) => (
                <button
                  key={o.label}
                  type="button"
                  aria-pressed={answers[qi] === oi}
                  className={`tchip ${answers[qi] === oi ? "is-on tchip-yellow" : ""}`}
                  onClick={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="quiz-result" aria-live="polite">
          {doneAll ? (
            <>
              <div className="quiz-result-h">Your ride: {picks.length} stops</div>
              <div className="quiz-cards">
                {picks.map((s, i) => {
                  const stop = stopFor(s);
                  return (
                    <Link key={s.slug} href={serviceHref(s)} className="quiz-card" style={{ ["--c" as string]: accent(stop), ["--ct" as string]: stop.badgeText, animationDelay: `${i * 0.12}s` } as React.CSSProperties}>
                      <span className="quiz-card-no">{stop.no}</span>
                      <b>{stop.name}</b>
                      <small>{stop.service}</small>
                    </Link>
                  );
                })}
              </div>
              <button type="button" className="link-btn" onClick={() => setAnswers([null, null, null])}>Ask again ↺</button>
            </>
          ) : (
            <div className="quiz-wait">Answer all three and the parrot picks a card.</div>
          )}
        </div>
      </div>
    </div>
  );
}
