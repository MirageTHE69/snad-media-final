import { NextResponse } from "next/server";

/* Contact form endpoint. It validates the booking and logs it on the server.
 * TODO: forward it somewhere real (email via Resend/SMTP, a CRM, or WhatsApp). */

type Booking = { name?: unknown; contact?: unknown; message?: unknown; stops?: unknown; company?: unknown; budget?: unknown; timeline?: unknown; kind?: unknown; role?: unknown; portfolio?: unknown };

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Booking;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = str(body.name, 120);
  const contact = str(body.contact, 160);
  const message = str(body.message, 4000);
  const extra = {
    kind: str(body.kind, 20) || "booking",
    company: str(body.company, 160),
    budget: str(body.budget, 60),
    timeline: str(body.timeline, 60),
    role: str(body.role, 80),
    portfolio: str(body.portfolio, 300),
  };
  const stops = Array.isArray(body.stops) ? body.stops.filter((s): s is string => typeof s === "string").slice(0, 7) : [];

  if (!name || !contact) {
    return NextResponse.json({ error: "Arre, we need your name and a phone or email." }, { status: 422 });
  }
  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const looksLikePhone = /^[+\d][\d\s-]{6,}$/.test(contact);
  if (!looksLikeEmail && !looksLikePhone) {
    return NextResponse.json({ error: "That phone or email doesn’t look right." }, { status: 422 });
  }

  console.log(`[contact] new ${extra.kind}`, { name, contact, stops, message, ...extra, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
