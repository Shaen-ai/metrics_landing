"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  type Theme,
  type ThemePreference,
  persistThemePreference,
  readStoredThemePreference,
  resolveTheme,
} from "@/lib/theme";

const ThemeContext = createContext<{
  theme: Theme;
  preference: ThemePreference;
  toggle: () => void;
}>({ theme: "dark", preference: "auto", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>("auto");
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = readStoredThemePreference();
    setPreference(stored);
    setTheme(resolveTheme(stored));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted || preference !== "auto") return;

    const sync = () => setTheme(resolveTheme("auto"));
    sync();
    const id = window.setInterval(sync, 60_000);
    return () => window.clearInterval(id);
  }, [preference, mounted]);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      setPreference(next);
      persistThemePreference(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, preference, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
