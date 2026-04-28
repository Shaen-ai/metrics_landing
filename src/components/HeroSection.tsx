"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { getStartedHref } from "@/lib/appUrl";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      {/* Gradient background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-600/10" />
        <div className="absolute -top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-3xl dark:bg-indigo-600/8" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-8 lg:pt-40">
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
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200/60 bg-zinc-50/80 px-4 py-1.5 text-sm text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-900/80 dark:text-zinc-400"
          >
            <Sparkles size={14} className="text-blue-500 dark:text-blue-400" />
            {t("hero.badge")}
          </motion.div>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl lg:text-7xl">
            {t("hero.title1")}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              {t("hero.highlight")}
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-xl">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href={getStartedHref()}>
              {t("hero.startTrial")}
              <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" href="/pricing">
              {t("hero.seePricing")}
            </Button>
          </div>
        </motion.div>

        {/* Placeholder visual */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="aspect-video rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-1 shadow-2xl shadow-blue-500/5 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                  <Sparkles size={28} className="text-blue-500 dark:text-blue-400" />
                </div>
                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                  {t("hero.demoPlaceholder")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
