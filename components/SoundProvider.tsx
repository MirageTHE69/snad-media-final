"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

/* Horn + roar are synthesised with Web Audio: no audio files. Sound is off by default. */

type SoundCtx = {
  sound: boolean;
  toggle: () => void;
  honk: (btn?: HTMLElement | null) => void;
  roar: () => void;
};

const Ctx = createContext<SoundCtx | null>(null);

export function useSound() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSound must be used inside <SoundProvider>");
  return c;
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [sound, setSound] = useState(false);
  const soundRef = useRef(false);
  const acRef = useRef<AudioContext | null>(null);

  const ctx = useCallback(() => {
    if (!acRef.current) {
      const C = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!C) return null;
      acRef.current = new C();
    }
    if (acRef.current.state === "suspended") void acRef.current.resume();
    return acRef.current;
  }, []);

  const playHorn = useCallback(() => {
    const ac = ctx();
    if (!ac) return;
    const t = ac.currentTime;
    [0, 0.2].forEach((off) => {
      const g = ac.createGain();
      g.gain.setValueAtTime(0, t + off);
      g.gain.linearRampToValueAtTime(0.13, t + off + 0.015);
      g.gain.setValueAtTime(0.13, t + off + 0.12);
      g.gain.linearRampToValueAtTime(0, t + off + 0.16);
      const lp = ac.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 2200;
      [415, 520].forEach((f) => {
        const o = ac.createOscillator();
        o.type = "square";
        o.frequency.value = f;
        o.connect(lp);
        o.start(t + off);
        o.stop(t + off + 0.17);
      });
      lp.connect(g);
      g.connect(ac.destination);
    });
  }, [ctx]);

  const honk = useCallback(
    (btn?: HTMLElement | null) => {
      if (btn) {
        const bub = btn.querySelector<HTMLElement>("[data-honk-bubble]");
        if (bub) {
          bub.style.animation = "none";
          void bub.offsetWidth;
          bub.style.animation = "sw-bubble 1.6s ease forwards";
        }
        btn.animate?.(
          [{ transform: "translateX(0)" }, { transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "translateX(0)" }],
          { duration: 260 }
        );
      }
      if (soundRef.current) playHorn();
    },
    [playHorn]
  );

  const roar = useCallback(() => {
    if (!soundRef.current) return;
    const ac = ctx();
    if (!ac) return;
    const t = ac.currentTime, dur = 1.1;
    const buf = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const n = ac.createBufferSource();
    n.buffer = buf;
    const lp = ac.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(300, t);
    lp.frequency.linearRampToValueAtTime(900, t + 0.25);
    lp.frequency.linearRampToValueAtTime(180, t + dur);
    const o = ac.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(95, t);
    o.frequency.linearRampToValueAtTime(140, t + 0.25);
    o.frequency.linearRampToValueAtTime(60, t + dur);
    const og = ac.createGain();
    og.gain.value = 0.35;
    const g = ac.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.32, t + 0.12);
    g.gain.linearRampToValueAtTime(0.22, t + 0.6);
    g.gain.linearRampToValueAtTime(0, t + dur);
    n.connect(lp); o.connect(og); og.connect(lp); lp.connect(g); g.connect(ac.destination);
    n.start(t); o.start(t); n.stop(t + dur); o.stop(t + dur);
  }, [ctx]);

  const toggle = useCallback(() => {
    const on = !soundRef.current;
    soundRef.current = on;
    setSound(on);
    if (on) {
      ctx();
      setTimeout(() => honk(document.querySelector<HTMLElement>("[data-horn]")), 30);
    }
  }, [ctx, honk]);

  const value = useMemo(() => ({ sound, toggle, honk, roar }), [sound, toggle, honk, roar]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
