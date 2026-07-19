import type { LanguageCode } from "./translations";

const ARMENIA_COUNTRY = "AM";

/**
 * Country code from common edge / hosting headers.
 *
 * Production must forward one of these from Cloudflare or the reverse proxy
 * (e.g. Cloudflare `CF-IPCountry` → `cf-ipcountry`) so real AM visitors get
 * Armenian without client-side guessing. Missing headers → English default.
 */
export function countryFromRequestHeaders(
  headers: Headers | { get(name: string): string | null },
): string | null {
  const keys = [
    "x-vercel-ip-country",
    "cf-ipcountry",
    "x-country-code",
    "cloudfront-viewer-country",
  ];
  for (const key of keys) {
    const value = headers.get(key)?.trim().toUpperCase();
    if (value && value.length === 2) return value;
  }
  return null;
}

/**
 * Default language when the user has not chosen one explicitly (no cookie).
 * Only confident Armenia → Armenian; everywhere else → English.
 */
export function defaultLanguageFromGeo(countryCode: string | null | undefined): LanguageCode {
  if (countryCode?.toUpperCase() === ARMENIA_COUNTRY) return "hy";
  return "en";
}

/** User picked a language in the switcher (cookie set via changeLang only). */
export function languageFromExplicitCookie(
  cookieValue: string | undefined,
): LanguageCode | null {
  if (cookieValue === "en" || cookieValue === "ru" || cookieValue === "hy") {
    return cookieValue;
  }
  return null;
}

export function languageFromCookieOrGeo(
  cookieValue: string | undefined,
  countryCode: string | null | undefined,
): LanguageCode {
  const explicit = languageFromExplicitCookie(cookieValue);
  if (explicit !== null) return explicit;
  return defaultLanguageFromGeo(countryCode);
}
