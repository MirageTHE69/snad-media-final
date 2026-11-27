import { CLIENTS_A, CLIENTS_B, type Client } from "@/lib/data";

function Wordmark({ c }: { c: Client }) {
  return (
    <div className="client">
      <span className={`client-name client-${c.style}`} style={{ color: c.color }}>{c.name}</span>
      <span className="client-tag">{c.tag}</span>
    </div>
  );
}

function Row({ list, reverse }: { list: Client[]; reverse?: boolean }) {
  // duplicated so the -50% marquee loops seamlessly
  const items = [...list, ...list];
  return (
    <div className={`marquee ${reverse ? "marquee-rev" : ""}`}>
      {items.map((c, i) => (
        <div key={i} aria-hidden={i >= list.length}>
          <Wordmark c={c} />
        </div>
      ))}
    </div>
  );
}

export default function Clients() {
  return (
    <section className="clients" aria-labelledby="clients-h">
      <div className="clients-head" data-reveal="">
        <div>
          <div className="pill pill-yellow">Passenger list</div>
          <h2 id="clients-h" className="h2">Passengers we’ve <span className="yel">carried.</span></h2>
        </div>
        <p>Hundreds of brands have taken the ride. A few of them, waving from the back seat.</p>
      </div>
      <div className="marquee-wrap">
        <Row list={CLIENTS_A} />
        <Row list={CLIENTS_B} reverse />
      </div>
    </section>
  );
}
