"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getTranslation,
  translatePricing,
  setLanguage as setLangStorage,
  type LanguageCode,
} from "@/lib/translations";

type TranslationContextValue = {
  t: (key: string) => string;
  tp: (text: string) => string;
  lang: LanguageCode;
  changeLang: (code: LanguageCode) => void;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

const COOKIE_NAME = "tunzone-lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function setLanguageCookie(code: LanguageCode) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${code}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function normalizeStoredLanguage(value: string | null | undefined): LanguageCode | null {
  if (value === "en" || value === "ru" || value === "hy") return value;
  return null;
}

function readCookieLanguage(): LanguageCode | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  return normalizeStoredLanguage(match?.[1]);
}

function readStoredLanguage(): LanguageCode | null {
  if (typeof window === "undefined") return null;
  return normalizeStoredLanguage(localStorage.getItem("tunzone-lang"));
}

export function TranslationProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: LanguageCode;
}) {
  const [lang, setLang] = useState<LanguageCode>(initialLang);

  useLayoutEffect(() => {
    const preferred = readCookieLanguage() ?? readStoredLanguage();
    if (preferred !== null) {
      setLangStorage(preferred);
      setLanguageCookie(preferred);
      if (preferred !== initialLang) {
        setLang(preferred);
      }
    }
  }, [initialLang]);

  useEffect(() => {
    if (readStoredLanguage() === null) {
      setLangStorage(lang);
    }
  }, [lang]);

  const changeLang = useCallback((code: LanguageCode) => {
    setLangStorage(code);
    setLanguageCookie(code);
    setLang(code);
  }, []);

  const t = useCallback(
    (key: string): string => getTranslation(lang, key),
    [lang],
  );

  const tp = useCallback(
    (text: string): string => translatePricing(lang, text),
    [lang],
  );

  const value = useMemo(
    () => ({ t, tp, lang, changeLang }),
    [t, tp, lang, changeLang],
  );

  return (
    <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>
  );
}

export function useTranslationContext(): TranslationContextValue {
  const ctx = useContext(TranslationContext);
  if (ctx === null) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return ctx;
}
