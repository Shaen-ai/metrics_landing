"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { getAppBaseUrl, getStartedHref } from "@/lib/appUrl";
import { cn } from "@/lib/cn";

const linkKeys = [
  { key: "nav.home", href: "/" },
  { key: "nav.pricing", href: "/pricing" },
  { key: "nav.faq", href: "/faq" },
  { key: "nav.about", href: "/about" },
];

const appBase = getAppBaseUrl();

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl dark:border-border/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 text-lg font-bold tracking-tight sm:text-xl">
          <Image
            src="/logo.png"
            alt="Tunzone logo"
            width={40}
            height={40}
            priority
            unoptimized
            className="h-9 w-9 rounded-xl object-contain sm:h-10 sm:w-10"
          />
          <span aria-label="Tunzone" className="font-extrabold tracking-tight">
            <span className="text-foreground">Tun</span>
            <span className="text-primary">zone</span>
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
          <Button href={getStartedHref()} className="ml-1">
            {t("nav.getStarted")}
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1.5 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
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
          open ? "max-h-[28rem]" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-2 px-4 pb-5 sm:px-6 sm:pb-6">
          {linkKeys.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {t(l.key)}
          </Link>
          ))}
          {appBase ? (
            <a
              href={`${appBase}/login`}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg border-t border-zinc-200/80 px-2 pt-4 pb-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              {t("nav.signIn")}
            </a>
          ) : null}
          <Button href={getStartedHref()} className="w-full">
            {t("nav.getStarted")}
          </Button>
        </div>
      </div>
    </header>
  );
}
