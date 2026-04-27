"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { PricingCard } from "@/components/PricingCard";
import { PricingToggle } from "@/components/PricingToggle";
import { tiers, features } from "@/lib/pricing-data";
import { Check, X, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useTranslation } from "@/hooks/useTranslation";

const donateUrl = process.env.NEXT_PUBLIC_DONATE_URL?.trim();

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const { t, tp } = useTranslation();

  return (
    <>
      {/* Hero */}
      <SectionWrapper className="pt-32 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          {t("pricing.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-500 dark:text-zinc-400">
          {t("pricing.subtitle")}
        </p>
        <div className="mt-8">
          <PricingToggle annual={annual} onChange={setAnnual} />
        </div>
      </SectionWrapper>

      {/* Cards */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-4">
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
      </section>

      {/* Comparison table (desktop) */}
      <SectionWrapper className="border-t border-zinc-200/40 dark:border-zinc-800/40">
        <h2 className="mb-12 text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
          {t("pricing.comparePlans")}
        </h2>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="pb-4 pr-6 font-medium text-zinc-400 dark:text-zinc-400">{t("pricing.feature")}</th>
                {tiers.map((tier) => (
                  <th
                    key={tier.id}
                    className={cn(
                      "pb-4 text-center font-semibold",
                      tier.popular ? "text-blue-500 dark:text-blue-400" : "text-zinc-900 dark:text-zinc-100",
                    )}
                  >
                    {tp(tier.name)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f, fi) => (
                <motion.tr
                  key={f.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: fi * 0.03 }}
                  className="border-b border-zinc-100 dark:border-zinc-800/50"
                >
                  <td className="py-4 pr-6 text-zinc-600 dark:text-zinc-300">{tp(f.label)}</td>
                  {(["starter", "growth", "scale", "enterprise"] as const).map(
                    (tid) => {
                      const val = f[tid];
                      return (
                        <td key={tid} className="py-4 text-center">
                          {typeof val === "boolean" ? (
                            val ? (
                              <Check
                                size={16}
                                className="mx-auto text-blue-500 dark:text-blue-400"
                              />
                            ) : (
                              <X size={16} className="mx-auto text-zinc-300 dark:text-zinc-700" />
                            )
                          ) : (
                            <span className="text-zinc-700 dark:text-zinc-200">{tp(val)}</span>
                          )}
                        </td>
                      );
                    },
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-400 dark:text-zinc-500 lg:hidden">
          {t("pricing.scrollHint")}
        </p>
      </SectionWrapper>

      {donateUrl ? (
        <SectionWrapper className="border-t border-zinc-200/40 dark:border-zinc-800/40">
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
            <Heart
              className="mx-auto mb-4 text-rose-500 dark:text-rose-400"
              size={28}
              aria-hidden
            />
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {t("pricing.donateText")}
            </p>
            <Link
              href={donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
            >
              {t("pricing.donateButton")}
            </Link>
          </div>
        </SectionWrapper>
      ) : null}
    </>
  );
}
