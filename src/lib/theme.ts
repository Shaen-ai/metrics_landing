export type Theme = "light" | "dark";
export type ThemePreference = Theme | "auto";

/** Light during daytime hours in the visitor's local timezone. */
const LIGHT_START_HOUR = 7;
const LIGHT_END_HOUR = 19;

export function themeFromLocalHour(hour: number): Theme {
  return hour >= LIGHT_START_HOUR && hour < LIGHT_END_HOUR ? "light" : "dark";
}

export function themeFromTime(date = new Date()): Theme {
  return themeFromLocalHour(date.getHours());
}

export function readStoredThemePreference(): ThemePreference {
  if (typeof window === "undefined") return "auto";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "auto";
}

export function resolveTheme(preference: ThemePreference, date = new Date()): Theme {
  if (preference === "light" || preference === "dark") return preference;
  return themeFromTime(date);
}

export function persistThemePreference(preference: Theme): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("theme", preference);
  document.cookie = `tz-theme=${preference};path=/;max-age=31536000;SameSite=Lax`;
}

/** Inline boot script (layout.tsx) — sets data-theme attribute before first paint. */
export const themeBootScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){var h=new Date().getHours();t=h>=7&&h<19?'light':'dark'}document.documentElement.dataset.theme=t;document.cookie='tz-theme='+t+';path=/;max-age=31536000;SameSite=Lax';}catch(e){}})();`;
