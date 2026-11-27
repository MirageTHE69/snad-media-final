"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSound } from "../SoundProvider";
import { STOPS } from "@/lib/data";

const BUDGETS = ["Under ₹1L", "₹1L – 5L", "₹5L – 15L", "₹15L+", "Not sure yet"];
const TIMELINES = ["ASAP", "This month", "In 1–3 months", "Just exploring"];

type Status = "idle" | "sending" | "sent" | "error";

/* The booking form with a live auto-rickshaw fare meter that ticks up as you fill it in. */
export default function BookingForm({ meter }: { meter: string | null }) {
  const { roar, honk } = useSound();
  const [f, setF] = useState({ name: "", contact: "", company: "", message: "" });
  /* ?stop=Strategy pre-selects a stop (links from the services pages) */
  const params = useSearchParams();
  const [stops, setStops] = useState<string[]>(() => {
    const s = params.get("stop");
    return s && STOPS.some((x) => x.short === s) ? [s] : [];
  });
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const filled = [f.name, f.contact, stops.length ? "y" : "", budget, timeline, f.message].filter(Boolean).length;
  const ready = !!(f.name && f.contact && stops.length);
  const fare = String(filled * 137 + stops.length * 49).padStart(4, "0");

  const toggleStop = (s: string) => setStops((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.contact.trim()) { setError("Arre, we need your name and a phone or email."); return; }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "booking", ...f, stops, budget, timeline }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("sent");
      honk();
      roar();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Try again?");
    }
  };

  return (
    <div className="booking">
      <div className="booking-form-card">
        {status === "sent" ? (
          <div className="form-sent" role="status">
            <img src="/img/tiger-wink.webp" alt="" width={751} height={691} />
            <h3>Peep peep, ride booked!</h3>
            <p>We’ll call you back fassst, mostly within a day. Chai ready rakhna.</p>
            <button type="button" className="link-btn" onClick={() => { setStatus("idle"); setF({ name: "", contact: "", company: "", message: "" }); setStops([]); setBudget(""); setTimeline(""); }}>Book another ride ↺</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h2 className="booking-h">Book your ride</h2>
            <div className="form-fields">
              <div className="form-row">
                <label>Your name *<input value={f.name} onChange={set("name")} autoComplete="name" placeholder="Bunty from Alkapuri" required /></label>
                <label>Phone or email *<input value={f.contact} onChange={set("contact")} autoComplete="email" placeholder="So we can call you back" required /></label>
              </div>
              <label>Company / brand<input value={f.company} onChange={set("company")} autoComplete="organization" placeholder="Optional" /></label>
              <fieldset>
                <legend>Which stops do you need? *</legend>
                <div className="toggle-chips">
                  {STOPS.map((s) => {
                    const on = stops.includes(s.short);
                    return (
                      <button key={s.id} type="button" aria-pressed={on} className={`tchip ${on ? "is-on tchip-yellow" : ""}`} onClick={() => toggleStop(s.short)}>
                        {on ? "✓ " : ""}{s.short}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <fieldset>
                <legend>Rough budget</legend>
                <div className="toggle-chips">
                  {BUDGETS.map((b) => (
                    <button key={b} type="button" aria-pressed={budget === b} className={`tchip ${budget === b ? "is-on tchip-yellow" : ""}`} onClick={() => setBudget(budget === b ? "" : b)}>{b}</button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>When do you want to start?</legend>
                <div className="toggle-chips">
                  {TIMELINES.map((t) => (
                    <button key={t} type="button" aria-pressed={timeline === t} className={`tchip ${timeline === t ? "is-on tchip-yellow" : ""}`} onClick={() => setTimeline(timeline === t ? "" : t)}>{t}</button>
                  ))}
                </div>
              </fieldset>
              <label>Tell us more<textarea value={f.message} onChange={set("message")} rows={4} placeholder="What are you building? Any deadline?" /></label>
              {error && <div className="form-error" role="alert">{error}</div>}
              <button type="submit" className="btn btn-red btn-submit" disabled={status === "sending"}>
                {status === "sending" ? "Honking…" : "Honk & book ↗"}
              </button>
            </div>
          </form>
        )}
      </div>

      <aside className="booking-side">
        <div className={`meter ${ready ? "is-ready" : ""} ${status === "sent" ? "is-done" : ""}`} aria-live="polite">
          {meter ? <img src={meter} alt="Auto-rickshaw fare meter" width={895} height={900} /> : <div className="meter-fallback" />}
          <div className="meter-screen">
            <span className="meter-label">{status === "sent" ? "Ride booked" : ready ? "Fare" : "Meter running"}</span>
            <span className="meter-digits">{status === "sent" || (ready && filled >= 5) ? "SORTED" : `₹${fare}`}</span>
            <span className="meter-sub">{stops.length} stop{stops.length === 1 ? "" : "s"} · {filled}/6 filled</span>
          </div>
        </div>
        <p className="meter-note">The meter ticks up as you fill the form. Final fare? <b>Always sorted.</b></p>
      </aside>
    </div>
  );
}
