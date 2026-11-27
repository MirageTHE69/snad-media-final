import { NextResponse } from "next/server";

/* Contact form endpoint. It validates the booking and logs it on the server.
 * TODO: forward it somewhere real (email via Resend/SMTP, a CRM, or WhatsApp). */

type Booking = { name?: unknown; contact?: unknown; message?: unknown; stops?: unknown };

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
  const stops = Array.isArray(body.stops) ? body.stops.filter((s): s is string => typeof s === "string").slice(0, 7) : [];

  if (!name || !contact) {
    return NextResponse.json({ error: "Arre, we need your name and a phone or email." }, { status: 422 });
  }
  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const looksLikePhone = /^[+\d][\d\s-]{6,}$/.test(contact);
  if (!looksLikeEmail && !looksLikePhone) {
    return NextResponse.json({ error: "That phone or email doesn’t look right." }, { status: 422 });
  }

  console.log("[contact] new booking", { name, contact, stops, message, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
