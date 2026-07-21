"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./Button";
import { useTranslation } from "@/hooks/useTranslation";
import { getVistaConsumerDesignHref } from "@/lib/appUrl";
import { track } from "@/lib/analytics";

const actionKeys = [
  "pricing.vista.actionGenerate",
  "pricing.vista.actionRegenerate",
  "pricing.vista.actionEdit",
] as const;

const noteKeys = [
  "pricing.vista.freeTokens",
  "pricing.vista.noSubscription",
  "pricing.vista.topUp",
] as const;

export function VistaPricingSection() {
  const { t } = useTranslation();

  return (
    <section id="vista" className="scroll-mt-24 border-b border-border/50 dark:border-border/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground dark:bg-secondary/30">
              {t("product.vista.audience")}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground dark:bg-secondary/30">
              <Sparkles size={14} />
              {t("pricing.chooser.vistaPayment")}
            </span>
          </div>
          <h2 className="font-serif italic text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
            {t("pricing.vista.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("pricing.vista.desc")}</p>
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex justify-center">
            <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              {t("pricing.chooser.vistaPayment")}
            </span>
          </div>
          <p className="mt-5 text-center text-lg font-semibold text-foreground">{t("pricing.vista.unitPrice")}</p>

          <ul className="mt-6 space-y-3">
            {actionKeys.map((key) => (
              <li key={key} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {t(key)}
              </li>
            ))}
          </ul>

          <ul className="mt-6 space-y-2 border-t border-border/60 pt-6">
            {noteKeys.map((key) => (
              <li key={key} className="text-sm text-muted-foreground">
                {t(key)}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center">
            <Button
              href={getVistaConsumerDesignHref()}
              sameTab
              onClick={() => track("landing_cta_clicked", { cta: "pricing_vista", target: "vista" })}
            >
              {t("pricing.vista.cta")}
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
