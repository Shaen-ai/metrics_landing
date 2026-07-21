"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./Button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { track } from "@/lib/analytics";
import { splitHeroHighlight, splitHeroSubtitle } from "@/lib/heroCopyLayout";
import { fadeUpInitial, fadeUpVisible, motionTransition, usePrefersReducedMotion } from "@/lib/motion";

export function HeroSection() {
  const { t, lang } = useTranslation();
  const reduceMotion = usePrefersReducedMotion();
  const prefersReducedMotion = useReducedMotion();

  const highlightLines = useMemo(
    () => splitHeroHighlight(t("hero.umbrella.highlight")),
    [t, lang],
  );
  const subtitleLines = useMemo(
    () => splitHeroSubtitle(t("hero.umbrella.subtitle"), lang),
    [t, lang],
  );

  const stagger = (delay: number) =>
    reduceMotion
      ? { initial: false as const, animate: fadeUpVisible, transition: motionTransition(0) }
      : {
          initial: fadeUpInitial(false),
          animate: fadeUpVisible,
          transition: motionTransition(delay),
        };

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 12, 0], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-secondary/30 blur-3xl dark:bg-muted/40"
        />
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-32 top-1/3 h-[280px] w-[280px] rounded-full bg-primary/5 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-4xl text-center" lang={lang}>
          <motion.h1
            {...stagger(0)}
            className="font-serif italic text-[1.875rem] font-normal leading-[1.18] tracking-tight text-foreground sm:text-5xl sm:leading-[1.14] lg:text-[3.35rem] lg:leading-[1.12]"
          >
            {highlightLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            {...stagger(0.08)}
            className="mx-auto mt-6 max-w-[34rem] text-pretty text-base leading-[1.7] text-muted-foreground sm:mt-7 sm:max-w-[38rem] sm:text-[1.125rem] sm:leading-[1.75] lg:max-w-[44rem]"
          >
            {subtitleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>

          <motion.div
            {...stagger(0.16)}
            className="mt-8 flex justify-center sm:mt-10"
          >
            <Button
              href="#products"
              className="w-full sm:w-auto"
              onClick={() => track("landing_cta_clicked", { cta: "hero", target: "products" })}
            >
              {t("hero.umbrella.primaryCta")}
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={fadeUpInitial(reduceMotion)}
          animate={fadeUpVisible}
          transition={motionTransition(0.4, 0.8)}
          className="relative mx-auto mt-12 max-w-5xl sm:mt-20"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="aspect-video overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary/80 to-card p-1 shadow-2xl shadow-foreground/5 dark:from-card dark:to-muted/30"
          >
            <video
              src="/product-demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full rounded-xl object-cover"
              aria-label={t("hero.umbrella.demoPlaceholder")}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
