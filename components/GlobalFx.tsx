"use client";

import { useEffect, useRef } from "react";
import { STICKERS } from "@/lib/data";
import { canMotion, finePointer } from "@/lib/motion";

/* Site-wide effects: scroll reveals, doodle cursor, and stickers that pop where you click empty space. */
export default function GlobalFx() {
  const cursor = useRef<HTMLImageElement>(null);

  /* reveal on scroll: only elements below the fold start hidden, so nothing is lost without JS */
  useEffect(() => {
    if (!canMotion()) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("rv-in");
        io.unobserve(e.target);
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top <= window.innerHeight * 0.92) return;
      el.style.transitionDelay = `${el.dataset.reveal || 0}ms`;
      el.classList.add("rv");
      el.addEventListener("transitionend", () => (el.style.transitionDelay = "0ms"), { once: true });
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* doodle cursor (pointer devices only) */
  useEffect(() => {
    if (!finePointer()) return;
    const root = document.documentElement;
    root.classList.add("doodle-cursor");
    const cur = cursor.current!;
    let src = "";
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cur.style.display = "block";
      const t = e.target as Element | null;
      const want = t?.closest?.("a,button,label,input,textarea,select") ? "/img/cursor-hand.webp" : "/img/cursor-pencil.webp";
      if (src !== want) { src = want; cur.src = want; }
      cur.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
    };
    const leave = () => (cur.style.display = "none");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      root.classList.remove("doodle-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  /* stickers on click */
  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (!canMotion()) return;
      const t = e.target as Element | null;
      if (!t?.closest || t.closest("a,button,input,textarea,label,select,header,nav,form,.tiger,.splash")) return;
      const root = document.querySelector<HTMLElement>("[data-root]");
      if (!root) return;
      const rr = root.getBoundingClientRect();
      const img = document.createElement("img");
      img.src = `/img/${STICKERS[Math.floor(Math.random() * STICKERS.length)]}.webp`;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.className = "sticker";
      img.style.width = `${64 + Math.random() * 40}px`;
      img.style.left = `${e.clientX - rr.left}px`;
      img.style.top = `${e.clientY - rr.top}px`;
      img.style.setProperty("--r", `${Math.random() * 40 - 20}deg`);
      root.appendChild(img);
      setTimeout(() => img.remove(), 3500);
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);

  return <img ref={cursor} className="doodle" src="/img/cursor-pencil.webp" alt="" aria-hidden="true" />;
}
