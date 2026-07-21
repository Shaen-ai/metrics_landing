"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { getStartedHref, getStudioHref, getVistaConsumerDesignHref } from "@/lib/appUrl";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

const linkKeys = [
  { key: "nav.home", href: "/" },
  { key: "nav.aiDesign", href: getVistaConsumerDesignHref() },
  { key: "nav.platform", href: getStudioHref() },
  { key: "nav.pricing", href: "/pricing" },
  { key: "nav.faq", href: "/faq" },
  { key: "nav.about", href: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 text-lg font-bold tracking-tight sm:text-xl">
          <Image
            src="/logo.png"
            alt="Tunzone logo"
            width={56}
            height={56}
            priority
            unoptimized
            className="h-12 w-12 rounded-xl object-contain sm:h-14 sm:w-14"
          />
          <span aria-label="Tunzone" className="font-serif italic text-3xl font-normal tracking-tight text-foreground sm:text-[1.85rem]">
            Tunzone
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {linkKeys.map((l) => {
            const className = "text-sm text-muted-foreground transition-colors hover:text-foreground";
            if (l.href.startsWith("http")) {
              return (
                <a key={l.key} href={l.href} className={className}>
                  {t(l.key)}
                </a>
              );
            }
            return (
              <Link key={l.key} href={l.href} className={className}>
                {t(l.key)}
              </Link>
            );
          })}
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            variant="secondary"
            href={getStartedHref()}
            sameTab
            className="ml-1 rounded-full px-5 py-2.5"
            onClick={() => track("landing_cta_clicked", { cta: "navbar", target: "get_started" })}
          >
            {t("nav.getStarted")}
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1.5 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="cd-header-menu-btn flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
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
          {linkKeys.map((l) => {
            const className =
              "rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";
            if (l.href.startsWith("http")) {
              return (
                <a
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={className}
                >
                  {t(l.key)}
                </a>
              );
            }
            return (
              <Link
                key={l.key}
                href={l.href}
                onClick={() => setOpen(false)}
                className={className}
              >
                {t(l.key)}
              </Link>
            );
          })}
          <Button
            variant="secondary"
            href={getStartedHref()}
            sameTab
            className="w-full"
            onClick={() => track("landing_cta_clicked", { cta: "navbar_mobile", target: "get_started" })}
          >
            {t("nav.getStarted")}
          </Button>
        </div>
      </div>
    </header>
  );
}
