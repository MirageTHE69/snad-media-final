"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSound } from "./SoundProvider";

/* Tiger mascot: peeks from bottom-left after the hero, hides during the ride and at contact.
 * Hover winks, click roars. */
export default function Tiger() {
  const { roar } = useSound();
  const ref = useRef<HTMLDivElement>(null);
  const [wink, setWink] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current; if (!el) return;
      const vh = window.innerHeight;
      const hero = document.querySelector(".hero"), ride = document.querySelector("#ride"), contact = document.querySelector("#contact");
      const on = hero ? hero.getBoundingClientRect().bottom < vh * 0.4 : window.scrollY > 320;
      const atContact = !!contact && contact.getBoundingClientRect().top < vh * 0.7;
      const rr = ride?.getBoundingClientRect();
      const inRide = !!rr && window.innerWidth >= 900 && rr.top < vh * 0.5 && rr.bottom > vh * 0.5;
      const show = on && !atContact && !inRide;
      el.style.transform = show ? "translateX(-14%)" : "translateX(-110%)";
      if (!show) setWink(false);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="tiger" onMouseLeave={() => setWink(false)}>
      <span className="tiger-bubble" style={{ opacity: wink ? 1 : 0, pointerEvents: wink ? "auto" : "none" }}>
        Kya soch rahe ho? <Link href="/contact">Let’s talk →</Link>
      </span>
      <button
        type="button"
        className="tiger-btn"
        aria-label="Poke the SNAD tiger"
        onMouseEnter={() => setWink(true)}
        onClick={(e) => { e.stopPropagation(); setWink(true); roar(); }}
      >
        <img src={wink ? "/img/tiger-wink.webp" : "/img/tiger-peek.webp"} alt="" width={505} height={690} />
      </button>
    </div>
  );
}
