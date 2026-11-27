/* The SNAD auto-rickshaw. The art faces left, so it is mirrored; wheels spin in reverse.
 * Wheel overlays are squashed (scaleY .858) to match the drawing's angle. */

type Props = {
  width: string;
  spin?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  innerRef?: React.Ref<HTMLDivElement>;
};

export default function Rickshaw({ width, spin = ".55s", alt = "", className, style, innerRef }: Props) {
  return (
    <div ref={innerRef} className={`rick ${className ?? ""}`} style={{ width, ...style }}>
      <div className="rick-wheel" style={{ left: "0.55%" }}>
        <img src="/img/rickshaw-wheel.webp" alt="" style={{ animationDuration: spin }} />
      </div>
      <div className="rick-wheel" style={{ left: "78.65%" }}>
        <img src="/img/rickshaw-wheel.webp" alt="" style={{ animationDuration: spin }} />
      </div>
      <img className="rick-body" src="/img/rickshaw-body.webp" alt={alt} width={1032} height={708} />
    </div>
  );
}
