"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { getVistaConsumerDesignHref } from "@/lib/appUrl";
import { track } from "@/lib/analytics";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-secondary/30 blur-3xl dark:bg-muted/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:pt-40">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="group mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/90 px-4 py-1.5 text-sm text-muted-foreground dark:bg-secondary/80"
          >
            <Sparkles size={14} className="text-muted-foreground transition-colors group-hover:text-primary" />
            {t("hero.badge")}
          </motion.div>

          <h1 className="font-serif italic text-4xl font-normal tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="block">{t("hero.brand")}</span>
            <span className="mt-2 block text-3xl text-foreground sm:mt-3 sm:text-5xl lg:text-6xl">
              {t("hero.highlight")}
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Button
              href={getVistaConsumerDesignHref()}
              sameTab
              className="w-full sm:w-auto"
              onClick={() => track("landing_cta_clicked", { cta: "hero", target: "vista" })}
            >
              {t("hero.primaryCta")}
              <ArrowRight size={16} />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto mt-12 max-w-5xl sm:mt-20"
        >
          <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary/80 to-card p-1 shadow-2xl shadow-foreground/5 dark:from-card dark:to-muted/30">
            <video
              src="/product-demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full rounded-xl object-cover"
              aria-label={t("hero.demoPlaceholder")}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
