"use client";

import Image from "next/image";
import Link from "next/link";
import { mailtoSupportHref } from "@/lib/contact";
import { useTranslation } from "@/hooks/useTranslation";

const donateUrl = process.env.NEXT_PUBLIC_DONATE_URL?.trim();
const contactHref = mailtoSupportHref();

const linkKeys = [
  { key: "footer.home", href: "/" },
  { key: "footer.pricing", href: "/pricing" },
  { key: "footer.faq", href: "/faq" },
  { key: "footer.about", href: "/about" },
  { key: "footer.contact", href: contactHref },
  ...(donateUrl ? [{ key: "footer.donate", href: donateUrl, external: true as const }] : []),
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-zinc-200/60 bg-white dark:border-zinc-800/60 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <Image
              src="/logo.png"
              alt="Tunzone logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg object-contain"
            />
            <span aria-label="Tunzone" className="font-extrabold tracking-tight">
              <span className="text-zinc-900 dark:text-zinc-100">Tun</span>
              <span className="text-[#f26a21]">zone</span>
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
              ) : l.href.startsWith("mailto:") ? (
                <a
                  key={l.href}
                  href={l.href}
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
