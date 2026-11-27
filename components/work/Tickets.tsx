/* Box-office numbers printed on cinema ticket stubs (drawn in CSS). */
export default function Tickets({ items }: { items: { v: string; l: string }[] }) {
  return (
    <div className="tickets">
      {items.map((t, i) => (
        <div key={t.l} className="ticket-stub" data-reveal={i * 90} style={{ ["--r" as string]: `${[-2, 1.5, -1, 2][i % 4]}deg` } as React.CSSProperties}>
          <span className="ticket-admit">Admit one · Row {String.fromCharCode(65 + i)}</span>
          <b>{t.v}</b>
          <small>{t.l}</small>
          <span className="ticket-no" aria-hidden="true">No. 0{i + 1}79</span>
        </div>
      ))}
    </div>
  );
}
