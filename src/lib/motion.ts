"use client";

import { useEffect, useState } from "react";

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUpHidden = { opacity: 0, y: 20 } as const;
export const fadeUpVisible = { opacity: 1, y: 0 } as const;

export function motionTransition(delay = 0, duration = 0.55) {
  return {
    delay,
    duration,
    ease: MOTION_EASE,
  };
}

/** Client-side prefers-reduced-motion (matches ProjectShowcaseSection pattern). */
export function usePrefersReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduceMotion;
}

export function fadeUpInitial(reduceMotion: boolean) {
  return reduceMotion ? false : fadeUpHidden;
}
