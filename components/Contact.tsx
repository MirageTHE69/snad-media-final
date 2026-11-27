"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "./SoundProvider";
import { CONTACT, STOPS } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const { roar } = useSound();
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const plateRef = useRef<HTMLDivElement>(null);
  const roarRef = useRef<HTMLImageElement>(null);

  /* "Step inside" on a shop pre-selects that stop */
  useEffect(() => {
    const on = (e: Event) => {
      const k = (e as CustomEvent<string>).detail;
      setPicked((p) => ({ ...p, [k]: true }));
    };
    window.addEventListener("snad:pick-stop", on);
    return () => window.removeEventListener("snad:pick-stop", on);
  }, []);

  /* tiger roars when the plate scrolls into view */
  useEffect(() => {
    let roared = false;
    const onScroll = () => {
      const plate = plateRef.current, img = roarRef.current;
      if (!plate || !img) return;
      const r = plate.getBoundingClientRect(), vh = window.innerHeight;
      if (r.top < vh * 0.7 && r.bottom > 0) {
        if (!roared) {
          roared = true;
          img.style.transform = "scale(1)";
          setTimeout(() => { img.style.animation = "sw-shake .6s 2"; }, 450);
          roar();
        }
      } else if (r.top > vh) {
        roared = false;
        img.style.transform = "scale(0)";
        img.style.animation = "";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [roar]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      name: String(fd.get("name") || "").trim(),
      contact: String(fd.get("contact") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      stops: Object.keys(picked).filter((k) => picked[k]),
    };
    if (!body.name || !body.contact) {
      setError("Arre, we need your name and a phone or email.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("sent");
      roar();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Try again?");
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-h">
      <div className="split split-contact">
        <div data-reveal="" className="contact-left">
          <div ref={plateRef} className="plate">
            <img src="/img/horn-ok-plate.webp" alt="Horn OK Please" width={1107} height={648} loading="lazy" />
            <img ref={roarRef} className="plate-tiger" src="/img/tiger-roar.webp" alt="" width={744} height={687} loading="lazy" />
          </div>
          <h2 id="contact-h" className="h2 contact-h">Got a brand to build? <span>Honk.</span></h2>
          <p className="lead">Tell us what you’re building. We’ll come back with a plan, usually before your chai goes cold.</p>
          <div className="contact-links">
            <a className="btn-pill btn-pill-ink" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a className="btn-pill btn-pill-cream" href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a>
          </div>
        </div>

        <div className="form-card" data-reveal="120">
          {status === "sent" ? (
            <div className="form-sent" role="status">
              <img src="/img/tiger-wink.webp" alt="" width={751} height={691} />
              <h3>Peep peep, received!</h3>
              <p>We’ll call you back fassst. Mostly within a day.</p>
              <button type="button" className="link-btn" onClick={() => { setStatus("idle"); setPicked({}); }}>Send another ↺</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3>Book your ride</h3>
              <div className="form-fields">
                <label>
                  Your name
                  <input name="name" type="text" autoComplete="name" placeholder="Bunty from Alkapuri" required />
                </label>
                <label>
                  Phone or email
                  <input name="contact" type="text" autoComplete="email" placeholder="So we can call you back" required />
                </label>
                <fieldset>
                  <legend>Which stop do you need?</legend>
                  <div className="toggle-chips">
                    {STOPS.map((s) => {
                      const on = !!picked[s.short];
                      return (
                        <button
                          key={s.id}
                          type="button"
                          aria-pressed={on}
                          className={`tchip ${on ? "is-on tchip-yellow" : ""}`}
                          onClick={() => setPicked((p) => ({ ...p, [s.short]: !p[s.short] }))}
                        >
                          {on ? "✓ " : ""}{s.short}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <label>
                  Tell us more
                  <textarea name="message" rows={3} placeholder="What are you building?" />
                </label>
                {error && <div className="form-error" role="alert">{error}</div>}
                <button type="submit" className="btn btn-red btn-submit" disabled={status === "sending"}>
                  {status === "sending" ? "Honking…" : "Honk & send ↗"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
