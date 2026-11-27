import Link from "next/link";
import { accent } from "@/lib/data";
import { SERVICES, serviceHref, stopFor } from "@/lib/services";

/* The illustrated bazaar map with a numbered pin on each shop. Pins drop in one by one. */
export default function BazaarMap({ src }: { src: string | null }) {
  return (
    <div className="bmap">
      {src ? (
        <img className="bmap-img" src={src} alt="Illustrated map of the SNAD bazaar with seven shops along the road" width={1800} height={1591} />
      ) : (
        <div className="bmap-img bmap-fallback" />
      )}
      {SERVICES.map((s, i) => {
        const stop = stopFor(s);
        return (
          <Link
            key={s.slug}
            href={serviceHref(s)}
            className="pin"
            style={{ left: `${s.pin.x}%`, top: `${s.pin.y}%`, ["--c" as string]: accent(stop), ["--ct" as string]: stop.badgeText, animationDelay: `${0.4 + i * 0.12}s` } as React.CSSProperties}
            aria-label={`Stop ${stop.no}: ${stop.name}, ${stop.service}`}
          >
            <span className="pin-head">{stop.no}</span>
            <span className="pin-tip" aria-hidden="true">
              <b>{stop.name}</b>
              <small>{stop.service}</small>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
