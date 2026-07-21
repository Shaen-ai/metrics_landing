import type { Metadata } from "next";
import { JsonLdScript } from "@/components/JsonLdScript";
import { buildFaqJsonLd } from "@/lib/jsonLd";
import { TUNZONE_SITE_URL } from "@/lib/siteUrl";
import { translations } from "@/lib/translations";

const CANONICAL = `${TUNZONE_SITE_URL}/faq`;
const title = "Tunzone FAQ — Vista & Studio Questions Answered";
const description =
  "Answers to common questions about Tunzone, Vista interior design tokens, and Studio subscription plans for furniture brands.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: CANONICAL },
  openGraph: { type: "website", url: CANONICAL, siteName: "Tunzone", title, description },
  twitter: { card: "summary_large_image", title, description },
};

/** Same key set the FAQ page renders (see faq/page.tsx). */
const FAQ_KEYS: Array<{ q: string; a: string }> = [
  { q: "faq.umbrella.q1", a: "faq.umbrella.a1" },
  ...[1, 2, 3, 4, 5].map((i) => ({ q: `faq.vista.q${i}`, a: `faq.vista.a${i}` })),
  ...[1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12].map((i) => ({ q: `faq.q${i}`, a: `faq.a${i}` })),
];

function faqQuestions() {
  const en = translations.en;
  return FAQ_KEYS.map(({ q, a }) => ({ question: en[q] ?? q, answer: en[a] ?? a })).filter(
    (item) => item.question !== "" && item.answer !== "",
  );
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLdScript data={buildFaqJsonLd(faqQuestions())} />
      {children}
    </>
  );
}
