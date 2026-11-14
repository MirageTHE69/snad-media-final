"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { Logo } from "./Logo";
import { noteLanding } from "@/lib/visit";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  noteLanding(); // first render happens on the page the visit started on

  // Close the mobile menu when the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href);
  const close = () => setOpen(false);

  return (
    <>
      <header className="nav">
        <Link href="/" className="nav__brand" aria-label="SNAD Media — home" onClick={close}>
          <Logo />
        </Link>
        <nav className="nav__links" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav__right">
          <a href="#contact" className="nav__cta">
            Contact us ↗
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
        <span className="nav__progress" data-progress="" aria-hidden="true" />
      </header>
      {open && (
        <nav id="mobile-menu" className="nav__menu" aria-label="Mobile">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={close}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
