"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useSound } from "./SoundProvider";
import { NAV } from "@/lib/data";

export default function Nav() {
  const { sound, toggle } = useSound();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onResize = () => { if (window.innerWidth >= 900) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-lock", open);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-bar">
        <a href="#top" aria-label="SNAD Media home" onClick={close}><Logo /></a>
        <nav className="nav-links hide-sm" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.label} className="hv-red" href={n.href}>{n.label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button type="button" className="sound-btn" aria-pressed={sound} onClick={toggle}>
            <span className="sound-ico" aria-hidden="true">♪</span>
            <span className="sound-txt">{sound ? "Sound on" : "Sound off"}</span>
          </button>
          <a href="#contact" className="nav-cta hide-sm">Book a ride ↗</a>
          <button
            type="button"
            className="menu-btn show-sm"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`burger ${open ? "is-open" : ""}`} aria-hidden="true"><i /><i /><i /></span>
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} hidden={!open}>
        <nav aria-label="Mobile">
          {NAV.map((n, i) => (
            <a key={n.label} href={n.href} onClick={close} style={{ animationDelay: `${i * 0.05}s` }}>
              {n.label}
            </a>
          ))}
          <a href="#contact" onClick={close} className="mobile-menu-cta" style={{ animationDelay: `${NAV.length * 0.05}s` }}>
            Book a ride ↗
          </a>
        </nav>
        <div className="mobile-menu-foot">
          <a href="mailto:hello@snadmedia.com">hello@snadmedia.com</a>
          <a href="tel:+918980207979">089802 07979</a>
        </div>
      </div>
    </header>
  );
}
