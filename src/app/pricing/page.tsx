"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { PricingCard } from "@/components/PricingCard";
import { PricingToggle } from "@/components/PricingToggle";
import { PricingProductChooser } from "@/components/PricingProductChooser";
import { VistaPricingSection } from "@/components/VistaPricingSection";
import { tiers, features } from "@/lib/pricing-data";
import { useTranslation } from "@/hooks/useTranslation";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <SectionWrapper className="pt-24 text-center sm:pt-32">
        <h1 className="font-serif italic text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
          {t("pricing.umbrella.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {t("pricing.umbrella.subtitle")}
        </p>
      </SectionWrapper>

      <PricingProductChooser />

      <VistaPricingSection />

      <section id="studio" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground dark:bg-secondary/30">
                {t("product.studio.audience")}
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground dark:bg-secondary/30">
                {t("pricing.chooser.studioPayment")}
              </span>
            </div>
            <h2 className="mt-3 font-serif italic text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
              {t("pricing.platform.title")}
            </h2>
          </div>
          <div className="mt-8 flex justify-center">
            <PricingToggle annual={annual} onChange={setAnnual} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 lg:px-8">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-y-0">
            {tiers.map((tier, i) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                features={features}
                annual={annual}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
