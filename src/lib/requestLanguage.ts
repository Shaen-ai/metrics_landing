import type { LanguageCode } from "./translations";

/**
 * Prefer explicit hy/ru entries in Accept-Language; otherwise English.
 * Same priority as reading `navigator.language` on the client for hy/ru hints.
 */
export function languageFromAcceptLanguageHeader(
  accept: string | null | undefined,
): LanguageCode {
  if (!accept || typeof accept !== "string") return "en";
  const parts = accept.split(",").map((p) => {
    const [tag, qStr] = p.trim().split(";q=");
    const q = qStr ? parseFloat(qStr) : 1;
    return { tag: tag.trim().toLowerCase(), q: Number.isFinite(q) ? q : 1 };
  });
  parts.sort((a, b) => b.q - a.q);
  for (const { tag } of parts) {
    const base = tag.split("-")[0];
    if (base === "hy") return "hy";
    if (base === "ru") return "ru";
  }
  return "en";
}

export function languageFromCookieOrAccept(
  cookieValue: string | undefined,
  acceptLanguage: string | null,
): LanguageCode {
  if (cookieValue === "en" || cookieValue === "ru" || cookieValue === "hy") {
    return cookieValue;
  }
  return languageFromAcceptLanguageHeader(acceptLanguage);
}
