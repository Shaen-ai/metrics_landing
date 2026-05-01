"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { languages } from "@/lib/translations";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, changeLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === lang) ?? languages[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        className={cn(
          "flex h-10 items-center gap-1.5 rounded-lg px-2 transition-colors cursor-pointer sm:h-9",
          "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
          "hover:bg-zinc-100 dark:hover:bg-zinc-800",
        )}
      >
        <Globe size={18} />
        <span className="text-sm">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 max-w-[calc(100vw_-_1rem)] min-w-[140px] overflow-hidden rounded-xl border border-border bg-card shadow-lg dark:bg-card">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                changeLang(l.code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors cursor-pointer",
                l.code === lang
                  ? "bg-primary-muted text-primary dark:bg-primary-muted-strong"
                  : "text-secondary-foreground/80 hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted",
              )}
            >
              <span>{l.flag}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
