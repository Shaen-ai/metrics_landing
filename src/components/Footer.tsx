"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const donateUrl = process.env.NEXT_PUBLIC_DONATE_URL?.trim();

const linkKeys = [
  { key: "footer.home", href: "/" },
  { key: "footer.pricing", href: "/pricing" },
  { key: "footer.faq", href: "/faq" },
  { key: "footer.about", href: "/about" },
  ...(donateUrl ? [{ key: "footer.donate", href: donateUrl, external: true as const }] : []),
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-zinc-200/60 bg-white dark:border-zinc-800/60 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              Mebel
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {linkKeys.map((l) =>
              "external" in l && l.external ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
                >
                  {t(l.key)}
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
                >
                  {t(l.key)}
                </Link>
              ),
            )}
          </div>

        </div>

        <p className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-600">
          {t("footer.copyright").replace("{year}", String(new Date().getFullYear()))}
        </p>
      </div>
    </footer>
  );
}
