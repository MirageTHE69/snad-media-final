/* Text logo (no SVG supplied yet): black block "SNAD MEDIA" + red dot. */
export default function Logo({ variant = "nav" }: { variant?: "nav" | "footer" | "splash" }) {
  return (
    <span className={`logo logo-${variant}`}>
      SNAD MEDIA<span className="logo-dot" />
    </span>
  );
}
