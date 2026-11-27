import { boardColor, type Stop } from "@/lib/data";

/* A shop exterior with its live (EN + हिंदी) signboard text, same as on the homepage ride. */
export default function ShopFront({ stop, className = "", eager = false }: { stop: Stop; className?: string; eager?: boolean }) {
  const b = stop.board;
  // board text scales with the shop's own width (container units); long names get a smaller size
  const fs = stop.name.length > 15 ? 4.9 : stop.name.length > 12 ? 5.6 : 6.6;
  return (
    <div className={`shopfront ${className}`} style={{ ["--fs" as string]: fs } as React.CSSProperties}>
      <img src={stop.img} alt={`${stop.name} shop, ${stop.service}`} width={stop.w} height={stop.h} loading={eager ? "eager" : "lazy"} />
      <div className="shop-board" style={{ left: `${b.left}%`, top: `${b.top}%`, width: `${b.width}%`, height: `${b.height}%` }}>
        <span className="shop-board-en" style={{ color: boardColor(stop) }}>{stop.name.toUpperCase()}</span>
        <span className="shop-board-hi">{stop.hindi}</span>
      </div>
    </div>
  );
}
