"use client";

import { useState } from "react";
import { useSound } from "../SoundProvider";
import { ROLES } from "@/lib/careers";

type Status = "idle" | "sending" | "sent" | "error";

/* Wanted posters for each open role + the "apply for your permit" form. Picking a poster pre-fills the form. */
export default function RolesAndApply({ poster, children }: { poster: string | null; children?: React.ReactNode }) {
  const { honk } = useSound();
  const [role, setRole] = useState("");
  const [f, setF] = useState({ name: "", contact: "", portfolio: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const pick = (title: string) => {
    setRole(title);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
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
        body: JSON.stringify({ kind: "job", name: f.name, contact: f.contact, portfolio: f.portfolio, message: f.message, role: role || "Open application" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("sent");
      honk();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Try again?");
    }
  };

  return (
    <>
      <section className="roles" id="roles">
        <div className="center-head" data-reveal="">
          <div className="pill pill-red">Open roles</div>
          <h2 className="h2">Wanted: <span className="red">sorted humans.</span></h2>
          <p className="lead">Pick a poster to apply. Don&apos;t see your role? Send an open application anyway.</p>
        </div>
        <div className="wanted-grid">
          {ROLES.map((r, i) => (
            <article key={r.slug} className="wanted" data-reveal={i * 90} id={`role-${r.slug}`}>
              <div className="wanted-art">
                {poster ? <img src={poster} alt="" width={603} height={900} loading="lazy" /> : <div className="wanted-fallback" />}
                <div className="wanted-circle" style={{ left: "35.4%", top: "11%", width: "29%", height: "19.4%" }} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="wanted-body" style={{ left: "15.2%", top: "32%", width: "69.6%", height: "54%" }}>
                  <span className="wanted-kicker">Wanted</span>
                  <h3>{r.title}</h3>
                  <span className="wanted-meta">{r.type} · {r.where}</span>
                  <p>{r.desc}</p>
                  <button type="button" className="btn btn-red wanted-btn" onClick={() => pick(r.title)}>Apply ↗</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {children}

      <section className="apply" id="apply">
        <div className="apply-card" data-reveal="">
          {status === "sent" ? (
            <div className="form-sent" role="status">
              <img src="/img/tiger-wink.webp" alt="" width={751} height={691} />
              <h3>Application received!</h3>
              <p>We read every one. Expect a reply within a week, chai pe.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="permit-top apply-top"><span>SNAD SAWARI PERMIT</span><span>Application</span></div>
              <h2 className="booking-h">Apply for your permit</h2>
              <div className="form-fields">
                <fieldset>
                  <legend>Role</legend>
                  <div className="toggle-chips">
                    {[...ROLES.map((r) => r.title), "Open application"].map((t) => (
                      <button key={t} type="button" aria-pressed={role === t} className={`tchip ${role === t ? "is-on tchip-yellow" : ""}`} onClick={() => setRole(role === t ? "" : t)}>{t}</button>
                    ))}
                  </div>
                </fieldset>
                <div className="form-row">
                  <label>Your name *<input value={f.name} onChange={set("name")} autoComplete="name" required /></label>
                  <label>Phone or email *<input value={f.contact} onChange={set("contact")} autoComplete="email" required /></label>
                </div>
                <label>Portfolio / LinkedIn / GitHub<input value={f.portfolio} onChange={set("portfolio")} placeholder="https://" inputMode="url" /></label>
                <label>Why SNAD?<textarea value={f.message} onChange={set("message")} rows={4} placeholder="Tell us something you made that you're proud of." /></label>
                {error && <div className="form-error" role="alert">{error}</div>}
                <button type="submit" className="btn btn-red btn-submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send application ↗"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
