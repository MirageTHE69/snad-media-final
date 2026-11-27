"use client";

import { useEffect, useRef, useState } from "react";
import { WORDS } from "@/lib/data";

/* SNAD = seven words painted on the back of the rickshaw. Auto-flips every 2.4s until the user picks one. */
export default function Acronym() {
  const [word, setWord] = useState(0);
  const hold = useRef(false);

  useEffect(() => {
    const t = setInterval(() => { if (!hold.current) setWord((w) => (w + 1) % WORDS.length); }, 2400);
    return () => clearInterval(t);
  }, []);

  const pick = (i: number) => { hold.current = true; setWord(i); };

  return (
    <section className="acronym" aria-labelledby="acr-h">
      <div className="split">
        <div data-reveal="">
          <div className="pill pill-ink">Painted on the back</div>
          <h2 id="acr-h" className="h2 acr-h">Every rickshaw has a slogan. <span className="red">Ours has seven.</span></h2>
          <p className="lead">S-N-A-D. Four letters, seven words. Don’t ask, it’s a long ride. Tap the rickshaw to flip the slogan.</p>
          <div className="toggle-chips">
            {WORDS.map(([w], i) => (
              <button key={w} type="button" aria-pressed={i === word} className={`tchip ${i === word ? "is-on tchip-red" : ""}`} onClick={() => pick(i)}>
                {w}
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="rick-back" aria-label="Flip to the next slogan" data-reveal="120" onClick={() => pick((word + 1) % WORDS.length)}>
          <img src="/img/rickshaw-back.webp" alt="Back of the SNAD rickshaw" width={568} height={673} />
          <div className="rick-back-plate">
            <span key={word} className="rick-back-word">{WORDS[word][0]}</span>
            <span className="rick-back-line">{WORDS[word][1]}</span>
          </div>
          <span className="rick-back-count">0{word + 1} / 07</span>
        </button>
      </div>
    </section>
  );
}
