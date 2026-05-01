"use client";

import { cn } from "@/lib/cn";
import { useTranslation } from "@/hooks/useTranslation";

interface PricingToggleProps {
  annual: boolean;
  onChange: (annual: boolean) => void;
}

export function PricingToggle({ annual, onChange }: PricingToggleProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          !annual ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500",
        )}
      >
        {t("pricing.monthly")}
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={annual}
        onClick={() => onChange(!annual)}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-200",
          annual
            ? "border-primary bg-primary"
            : "border-border bg-muted dark:border-border dark:bg-muted",
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
            annual ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>

      <span
        className={cn(
          "text-sm font-medium transition-colors",
          annual ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500",
        )}
      >
        {t("pricing.annual")}{" "}
        <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-600 dark:text-green-400">
          {t("pricing.monthFree")}
        </span>
      </span>
    </div>
  );
}
