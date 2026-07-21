import type { LanguageCode } from "@/lib/translations";

/** Split hero headline on sentence boundaries without changing copy. */
export function splitHeroHighlight(text: string): string[] {
  const parts = text
    .split(/(?<=[.։])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [text];
}

/** Split hero subtitle at natural phrase breaks per locale. */
export function splitHeroSubtitle(text: string, lang: LanguageCode): string[] {
  const bySentence = text
    .split(/(?<=\.)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (bySentence.length > 1) return bySentence;

  if (lang === "hy" && text.includes(", և ")) {
    const [first, second] = text.split(", և ");
    if (first && second) {
      return [`${first.trim()},`, `և ${second.trim()}`];
    }
  }

  if (text.includes(" — ")) {
    return text
      .split(" — ")
      .map((part) => part.trim())
      .filter(Boolean);
  }

  return [text];
}
