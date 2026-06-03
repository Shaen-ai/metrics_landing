"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BarChart3, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { getVistaConsumerDesignHref } from "@/lib/appUrl";
import { ProjectShowcaseCard } from "./ProjectShowcaseCard";

export function ProjectShowcaseSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blobY1 = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-4%", "8%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["6%", "-6%"]);
  const blobY3 = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "10%"]);

  const vistaFeatures = [
    t("showcase.vista.feature1"),
    t("showcase.vista.feature2"),
    t("showcase.vista.feature3"),
    t("showcase.vista.feature4"),
  ];

  const metricFeatures = [
    t("showcase.metric.feature1"),
    t("showcase.metric.feature2"),
    t("showcase.metric.feature3"),
    t("showcase.metric.feature4"),
  ];

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative overflow-hidden border-t border-border/50 py-16 dark:border-border/40 sm:py-20 lg:py-24"
      aria-labelledby="showcase-heading"
    >
      <motion.div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          style={{ y: blobY1 }}
          className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/5 blur-3xl dark:bg-primary/8"
        />
        <motion.div
          style={{ y: blobY2 }}
          className="absolute -right-24 top-1/3 h-[380px] w-[380px] rounded-full bg-primary/4 blur-3xl dark:bg-primary/6"
        />
        <motion.div
          style={{ y: blobY3 }}
          className="absolute bottom-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-primary/4 blur-3xl dark:bg-primary/6"
        />
      </motion.div>

      <motion.div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-medium uppercase tracking-widest text-primary"
          >
            {t("showcase.eyebrow")}
          </motion.p>
          <motion.h2
            id="showcase-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-serif italic text-3xl font-normal tracking-tight text-foreground sm:text-4xl"
          >
            {t("showcase.title")}
          </motion.h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-muted-foreground"
          >
            {t("showcase.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={false}
          className="mt-10 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8 lg:items-stretch"
        >
          <ProjectShowcaseCard
            id="vista"
            index={0}
            title={t("showcase.vista.title")}
            subtitle={t("showcase.vista.subtitle")}
            description={t("showcase.vista.desc")}
            features={vistaFeatures}
            ctaLabel={t("showcase.vista.cta")}
            ctaHref={getVistaConsumerDesignHref()}
            ctaSameTab
            icon={Sparkles}
          />
          <ProjectShowcaseCard
            id="metric"
            index={1}
            title={t("showcase.metric.title")}
            subtitle={t("showcase.metric.subtitle")}
            description={t("showcase.metric.desc")}
            features={metricFeatures}
            ctaLabel={t("showcase.metric.cta")}
            ctaHref="#features"
            icon={BarChart3}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
