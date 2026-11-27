export const canMotion = () =>
  typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

export const isDesktopRide = () => typeof window !== "undefined" && window.innerWidth >= 900;

export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
