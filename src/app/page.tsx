"use client";

import { HeroSection } from "@/components/HeroSection";
import { ProjectShowcaseSection } from "@/components/ProjectShowcaseSection";
import { SectionWrapper } from "@/components/SectionWrapper";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/Button";
import { getStudioHref, getVistaConsumerDesignHref } from "@/lib/appUrl";
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
import { fadeUpInitial, fadeUpVisible, motionTransition, usePrefersReducedMotion } from "@/lib/motion";

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

const trustedBrands = [
  {
    name: "Տախտակ Furniture",
    href: "https://www.facebook.com/profile.php?id=100054580504950",
  },
] as const;

export default function HomePage() {
  const { t } = useTranslation();
  const reduceMotion = usePrefersReducedMotion();

  return (
    <>
      <HeroSection />
      <ProjectShowcaseSection />

      {/* Features — Platform */}
      <SectionWrapper id="features">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {t("features.platform.eyebrow")}
          </p>
          <h2 className="mt-3 font-serif italic text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
            {t("features.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
      <SectionWrapper className="border-t border-border/50 dark:border-border/40">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif italic text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
            {t("howItWorks.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-16 md:grid-cols-3">
          {stepKeys.map((s, i) => (
            <motion.div
              key={s.titleKey}
              initial={fadeUpInitial(reduceMotion)}
              whileInView={fadeUpVisible}
              viewport={{ once: true }}
              transition={motionTransition(i * 0.12, 0.5)}
              className="text-center"
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground"
              >
                <s.icon size={26} />
              </motion.div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t("howItWorks.step")} {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t(s.titleKey)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t(s.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Social proof */}
      <SectionWrapper className="border-t border-border/50 dark:border-border/40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {t("socialProof.title")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:mt-10 sm:gap-x-12 sm:gap-y-6">
            {trustedBrands.map((brand) => (
              <a
                key={brand.href}
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold tracking-tight text-foreground/80 transition-colors hover:text-primary"
              >
                {brand.name}
              </a>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Banner */}
      <SectionWrapper>
        <div className="cd-cta-shimmer relative overflow-hidden rounded-3xl border border-border bg-card p-6 text-center sm:p-16">
          <h2 className="font-serif italic text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
            {t("cta.dual.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t("cta.dual.subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Button href={getVistaConsumerDesignHref()} sameTab className="w-full sm:w-auto">
              {t("cta.dual.vista")}
              <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" href={getStudioHref()} sameTab className="w-full sm:w-auto">
              {t("cta.dual.platform")}
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
