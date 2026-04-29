import type { LanguageCode } from "./translations";

/** Post-Soviet states where Russian is a common default for the UI. */
const RUSSIAN_DEFAULT_COUNTRIES = new Set([
  "RU",
  "KZ",
  "BY",
  "KG",
  "UZ",
  "TJ",
]);

export function countryCodeToLanguage(country: string | undefined | null): LanguageCode {
  if (!country || typeof country !== "string") return "en";
  const cc = country.trim().toUpperCase();
  if (cc === "AM") return "hy";
  if (RUSSIAN_DEFAULT_COUNTRIES.has(cc)) return "ru";
  return "en";
}

function inferFromNavigator(): LanguageCode {
  if (typeof navigator === "undefined") return "en";
  const candidates = [navigator.language, ...(navigator.languages ?? [])];
  for (const raw of candidates) {
    const base = raw?.split("-")[0]?.toLowerCase();
    if (base === "hy") return "hy";
    if (base === "ru") return "ru";
  }
  return "en";
}

/**
 * Resolves default UI language from approximate country (IP geolocation).
 * Falls back to browser language hints, then English.
 */
export async function fetchDefaultLanguageFromGeo(): Promise<LanguageCode> {
  try {
    const res = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(4500),
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as { country_code?: string; error?: boolean };
    if (data.error) throw new Error("ipapi error");
    return countryCodeToLanguage(data.country_code);
  } catch {
    return inferFromNavigator();
  }
}
