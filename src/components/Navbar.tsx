"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/cn";

const linkKeys = [
  { key: "nav.home", href: "/" },
  { key: "nav.pricing", href: "/pricing" },
  { key: "nav.faq", href: "/faq" },
  { key: "nav.about", href: "/about" },
];

const appBase = (process.env.NEXT_PUBLIC_APP_URL ?? "").replace(/\/$/, "");

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            Mebel
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {linkKeys.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {t(l.key)}
            </Link>
          ))}
          {appBase ? (
            <a
              href={`${appBase}/login`}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {t("nav.signIn")}
            </a>
          ) : null}
          <LanguageSwitcher />
          <ThemeToggle />
          <Button href="/pricing" className="ml-1">
            {t("nav.getStarted")}
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-4 px-6 pb-6">
          {linkKeys.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {t(l.key)}
          </Link>
          ))}
          {appBase ? (
            <a
              href={`${appBase}/login`}
              onClick={() => setOpen(false)}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/80"
            >
              {t("nav.signIn")}
            </a>
          ) : null}
          <Button href="/pricing" className="w-full">
            {t("nav.getStarted")}
          </Button>
        </div>
      </div>
    </header>
  );
}
