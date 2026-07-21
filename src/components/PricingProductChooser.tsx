"use client";

import { ArrowDown, BarChart3, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  href: string;
  icon: typeof Sparkles;
  title: string;
  audienceLabel: string;
  paymentLabel: string;
  description: string;
  seeDetailsLabel: string;
  accent: "vista" | "studio";
};

function ProductCard({
  href,
  icon: Icon,
  title,
  audienceLabel,
  paymentLabel,
  description,
  seeDetailsLabel,
  accent,
}: ProductCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group flex flex-col rounded-2xl border p-6 text-left transition-colors sm:p-8",
        accent === "vista"
          ? "border-border bg-card hover:border-primary/40"
          : "border-border bg-card hover:border-primary/40",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            accent === "vista" ? "bg-secondary/80 dark:bg-secondary/40" : "bg-secondary/80 dark:bg-secondary/40",
          )}
        >
          <Icon size={20} className="text-foreground" aria-hidden />
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
            accent === "vista"
              ? "bg-primary/10 text-primary"
              : "bg-foreground/8 text-foreground dark:bg-foreground/12",
          )}
        >
          {paymentLabel}
        </span>
      </div>

      <h2 className="mt-5 font-serif italic text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 text-sm font-medium text-foreground/80">{audienceLabel}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
        {seeDetailsLabel}
        <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" aria-hidden />
      </span>
    </a>
  );
}

export function PricingProductChooser() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-5xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <ProductCard
          href="#vista"
          icon={Sparkles}
          title={t("pricing.vista.title")}
          audienceLabel={t("product.vista.audience")}
          paymentLabel={t("pricing.chooser.vistaPayment")}
          description={t("pricing.vista.desc")}
          seeDetailsLabel={t("pricing.chooser.seeDetails")}
          accent="vista"
        />
        <ProductCard
          href="#studio"
          icon={BarChart3}
          title={t("pricing.platform.title")}
          audienceLabel={t("product.studio.audience")}
          paymentLabel={t("pricing.chooser.studioPayment")}
          description={t("showcase.platform.desc")}
          seeDetailsLabel={t("pricing.chooser.seeDetails")}
          accent="studio"
        />
      </div>
    </div>
  );
}
