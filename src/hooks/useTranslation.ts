"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getTranslation,
  translatePricing,
  getLanguage,
  setLanguage as setLangStorage,
  type LanguageCode,
} from "@/lib/translations";
import { fetchDefaultLanguageFromGeo } from "@/lib/geoLanguage";

const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((fn) => fn());
}

function readStoredLanguage(): LanguageCode | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("tunzone-lang");
  if (stored === "en" || stored === "ru" || stored === "hy") return stored;
  return null;
}

export function useTranslation() {
  const [lang, setLang] = useState<LanguageCode>("hy");

  useEffect(() => {
    const stored = readStoredLanguage();
    if (stored !== null) {
      setLang(stored);
    } else {
      void fetchDefaultLanguageFromGeo().then((code) => {
        setLangStorage(code);
        setLang(code);
        notify();
      });
    }

    const handler = () => setLang(getLanguage());
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  const t = useCallback(
    (key: string): string => getTranslation(lang, key),
    [lang],
  );

  const tp = useCallback(
    (text: string): string => translatePricing(lang, text),
    [lang],
  );

  const changeLang = useCallback((code: LanguageCode) => {
    setLangStorage(code);
    setLang(code);
    notify();
  }, []);

  return { t, tp, lang, changeLang };
}
