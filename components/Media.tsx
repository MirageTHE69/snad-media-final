import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  radius?: number;
  shape?: "rounded" | "circle" | "pill";
  fit?: "cover" | "contain";
  white?: boolean;
  priority?: boolean;
  sizes?: string;
};

/**
 * Fills its parent (which sets the aspect ratio), like the design's <image-slot>.
 * SVG illustrations are served as-is so their built-in animation keeps running.
 */
export default function Media({
  src,
  alt,
  radius = 28,
  shape = "rounded",
  fit = "cover",
  white,
  priority,
  sizes = "(max-width: 900px) 100vw, 33vw",
}: Props) {
  const cls = [
    "media",
    shape === "circle" && "media--circle",
    shape === "pill" && "media--pill",
    fit === "contain" && "media--contain",
    white && "media--white",
  ]
    .filter(Boolean)
    .join(" ");

  const isSvg = src.endsWith(".svg");
  return (
    <div className={cls} style={{ ["--radius" as string]: `${radius}px` }}>
      {isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element -- animated SVG, must not be rasterised
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
      ) : (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: fit }} />
      )}
    </div>
  );
}
