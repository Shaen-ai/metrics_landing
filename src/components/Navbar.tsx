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
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Image
            src="/logo.png"
            alt="Tunzone logo"
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-xl object-contain"
          />
          <span aria-label="Tunzone" className="font-extrabold tracking-tight">
            <span className="text-zinc-900 dark:text-zinc-100">Tun</span>
            <span className="text-[#f26a21]">zone</span>
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
          <Button href={getStartedHref()} className="w-full">
            {t("nav.getStarted")}
          </Button>
        </div>
      </div>
    </header>
  );
}
