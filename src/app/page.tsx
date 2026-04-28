"use client";

import { HeroSection } from "@/components/HeroSection";
import { SectionWrapper } from "@/components/SectionWrapper";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/Button";
import { mailtoSupportHref } from "@/lib/contact";
import { getStartedHref } from "@/lib/appUrl";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import {
  ImageIcon,
  Box,
  MessageSquare,
  Camera,
  LayoutGrid,
  ShoppingCart,
  Upload,
  Sparkles,
  Move3D,
  ArrowRight,
} from "lucide-react";

const featureKeys = [
  { icon: ImageIcon, titleKey: "features.imageTo3d", descKey: "features.imageTo3dDesc" },
  { icon: Box, titleKey: "features.roomPlanners", descKey: "features.roomPlannersDesc" },
  { icon: MessageSquare, titleKey: "features.aiChat", descKey: "features.aiChatDesc" },
  { icon: Camera, titleKey: "features.photoAssist", descKey: "features.photoAssistDesc" },
  { icon: LayoutGrid, titleKey: "features.modularCatalog", descKey: "features.modularCatalogDesc" },
  { icon: ShoppingCart, titleKey: "features.orders", descKey: "features.ordersDesc" },
];

const stepKeys = [
  { icon: Upload, titleKey: "howItWorks.upload", descKey: "howItWorks.uploadDesc" },
  { icon: Sparkles, titleKey: "howItWorks.generate", descKey: "howItWorks.generateDesc" },
  { icon: Move3D, titleKey: "howItWorks.design", descKey: "howItWorks.designDesc" },
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <HeroSection />

      {/* Features */}
      <SectionWrapper id="features">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            {t("features.title")}
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((f, i) => (
            <FeatureCard
              key={f.titleKey}
              index={i}
              icon={f.icon}
              title={t(f.titleKey)}
              description={t(f.descKey)}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* How it works */}
      <SectionWrapper className="border-t border-zinc-200/40 dark:border-zinc-800/40">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            {t("howItWorks.title")}
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {stepKeys.map((s, i) => (
            <motion.div
              key={s.titleKey}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-500 dark:text-blue-400">
                <s.icon size={26} />
              </div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500 dark:text-blue-400">
                {t("howItWorks.step")} {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t(s.titleKey)}</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{t(s.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Social proof */}
      <SectionWrapper className="border-t border-zinc-200/40 dark:border-zinc-800/40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {t("socialProof.title")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 rounded bg-zinc-100 dark:bg-zinc-800/50"
                title="Logo placeholder"
              />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Banner */}
      <SectionWrapper>
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white p-12 text-center shadow-xl dark:border-zinc-800 dark:from-blue-600/10 dark:via-indigo-600/5 dark:to-zinc-900 sm:p-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-500 dark:text-zinc-400">
            {t("cta.subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href={getStartedHref()}>
              {t("cta.getStarted")}
              <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" href={mailtoSupportHref("Sales inquiry")}>
              {t("cta.contactSales")}
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
