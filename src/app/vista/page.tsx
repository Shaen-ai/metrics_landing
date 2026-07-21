import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { JsonLdScript } from "@/components/JsonLdScript";
import {
  buildVistaAppJsonLd,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/jsonLd";
import { TUNZONE_SITE_URL } from "@/lib/siteUrl";
import { getVistaConsumerDesignHref } from "@/lib/appUrl";

const CANONICAL = `${TUNZONE_SITE_URL}/vista`;

export const metadata: Metadata = {
  title: "Vista — Interior Design Tool to Redesign Any Room from a Photo",
  description:
    "Vista is an interior design tool for homeowners. Upload a room photo and get photorealistic redesigns featuring real, purchasable furniture. Pay-as-you-go, no subscription.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: "Tunzone",
    title: "Vista — Interior Design Tool to Redesign Any Room from a Photo",
    description:
      "Upload a room photo and get photorealistic redesigns with real, purchasable furniture. Pay-as-you-go, no subscription.",
    images: [{ url: "/vista-hero.png", width: 1200, height: 630, alt: "Vista interior design" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vista — Interior Design Tool to Redesign Any Room from a Photo",
    description:
      "Upload a room photo and get photorealistic redesigns with real, purchasable furniture.",
    images: ["/vista-hero.png"],
  },
};

const STEPS: Array<{ title: string; body: string }> = [
  {
    title: "Upload a photo of your room",
    body: "Snap or upload a picture of the space you want to change — living room, bedroom, kitchen, or a whole apartment from a floor plan.",
  },
  {
    title: "Get photorealistic redesigns",
    body: "Vista returns finished, photorealistic concepts of your room in seconds — restyled, refurnished, and ready to compare.",
  },
  {
    title: "Shop the exact furniture",
    body: "Every piece in the design is a real, purchasable product from local retailers, with links so you can buy what you see.",
  },
];

const FEATURES: Array<{ title: string; body: string }> = [
  {
    title: "Real, buyable furniture",
    body: "Designs are built from an actual furniture catalog, not generic renders — so what you visualize is what you can order.",
  },
  {
    title: "Quick Room & Full Project",
    body: "Redesign a single room in minutes, or plan a whole apartment room-by-room from a floor plan with a coordinated look.",
  },
  {
    title: "Edit in plain language",
    body: "Ask for changes — “make the sofa darker”, “add a rug” — and refine the design conversationally until it’s right.",
  },
  {
    title: "Pay only for what you use",
    body: "No subscription. Start free with bonus tokens, then top up token packs from $5 whenever you design.",
  },
];

const FAQ: Array<{ question: string; answer: string }> = [
  {
    question: "What is Vista?",
    answer:
      "Vista is an interior design tool for homeowners. You upload a photo of your room and Vista produces photorealistic redesigns featuring real, purchasable furniture — no designer appointment needed.",
  },
  {
    question: "Is Vista free?",
    answer:
      "Vista is free to start with bonus tokens and has no monthly subscription. You pay per design with token packs starting at $5 (about $0.10 per token); a new room design costs roughly 10 tokens.",
  },
  {
    question: "Can I buy the furniture in the designs?",
    answer:
      "Yes. Every product placed in a Vista design is a real item from a furniture retailer, with a link so you can purchase it.",
  },
  {
    question: "Do I need any design experience?",
    answer:
      "No. Upload a room photo, and Vista does the design work. You can refine the result in plain language until you are happy with it.",
  },
  {
    question: "What kinds of rooms can Vista redesign?",
    answer:
      "Living rooms, bedrooms, kitchens, and more. Use Quick Room for a single space, or Full Project to design an entire apartment from a floor plan.",
  },
];

export default function VistaProductPage() {
  return (
    <>
      <JsonLdScript data={buildVistaAppJsonLd()} />
      <JsonLdScript data={buildFaqJsonLd(FAQ)} />
      <JsonLdScript
        data={buildBreadcrumbJsonLd([
          { name: "Tunzone", url: TUNZONE_SITE_URL },
          { name: "Vista", url: CANONICAL },
        ])}
      />

      <section className="mx-auto max-w-3xl px-4 pt-32 pb-16 text-center sm:px-6">
        <h1 className="font-serif italic text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
          Redesign any room from a single photo
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Vista is the interior design tool for homeowners. Upload a photo of your space and get
          photorealistic redesigns furnished with real products you can actually buy — no designer,
          no subscription.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={getVistaConsumerDesignHref()}>Try Vista</Button>
          <Button href="/pricing" variant="secondary" sameTab>
            See pricing
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl border-t border-border/50 px-4 py-16 sm:px-6">
        <h2 className="text-center font-serif italic text-3xl font-normal text-foreground">
          How Vista works
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title}>
              <div className="text-sm font-semibold text-primary">Step {i + 1}</div>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl border-t border-border/50 px-4 py-16 sm:px-6">
        <h2 className="text-center font-serif italic text-3xl font-normal text-foreground">
          Why homeowners choose Vista
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-secondary/40 p-6">
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl border-t border-border/50 px-4 py-16 sm:px-6">
        <h2 className="text-center font-serif italic text-3xl font-normal text-foreground">
          Frequently asked questions
        </h2>
        <div className="mt-10 space-y-3">
          {FAQ.map((item) => (
            <details
              key={item.question}
              className="rounded-xl border border-border bg-card p-5"
            >
              <summary className="cursor-pointer text-base font-semibold text-foreground">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href={getVistaConsumerDesignHref()}>Start designing your room</Button>
        </div>
      </section>
    </>
  );
}
