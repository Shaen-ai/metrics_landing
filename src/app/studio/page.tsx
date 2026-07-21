import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { JsonLdScript } from "@/components/JsonLdScript";
import {
  buildStudioAppJsonLd,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/jsonLd";
import { TUNZONE_SITE_URL } from "@/lib/siteUrl";
import { getStudioHref } from "@/lib/appUrl";

const CANONICAL = `${TUNZONE_SITE_URL}/studio`;

export const metadata: Metadata = {
  title: "Studio — Catalog & Storefront Automation for Furniture Brands",
  description:
    "Studio helps furniture manufacturers and brands automate their catalog: turn product photos into 3D models, publish a branded storefront, and let customers plan rooms with drag-and-drop 3D planners.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: "Tunzone",
    title: "Studio — Catalog & Storefront Automation for Furniture Brands",
    description:
      "Turn product photos into 3D models, publish a branded storefront, and give customers drag-and-drop room planners.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Tunzone Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio — Catalog & Storefront Automation for Furniture Brands",
    description:
      "Turn product photos into 3D models, publish a branded storefront, and give customers room planners.",
    images: ["/opengraph-image"],
  },
};

const STEPS: Array<{ title: string; body: string }> = [
  {
    title: "Turn photos into 3D models",
    body: "Upload product photos and generate 3D models of your furniture — build a digital catalog without a 3D artist.",
  },
  {
    title: "Publish a branded storefront",
    body: "Launch a public online store for your catalog, with your branding, on your own Tunzone address.",
  },
  {
    title: "Let customers plan their rooms",
    body: "Customers drag and drop your products into room, kitchen, and wardrobe planners and visualize the result before they order.",
  },
];

const FEATURES: Array<{ title: string; body: string }> = [
  {
    title: "Image-to-3D catalog",
    body: "Convert product photography into interactive 3D models at scale, so every SKU is ready for the planner and storefront.",
  },
  {
    title: "Built-in 3D planners",
    body: "Room, Kitchen, Kitchen Designer, Module, and Wardrobe planners let customers configure your products in a real space.",
  },
  {
    title: "Materials & modules",
    body: "Manage finishes, fabrics, and configurable modules so customers see accurate options and pricing.",
  },
  {
    title: "Orders in one place",
    body: "Capture and manage customer orders from your storefront, from first quote to fulfillment.",
  },
];

const FAQ: Array<{ question: string; answer: string }> = [
  {
    question: "What is Tunzone Studio?",
    answer:
      "Studio is software for furniture manufacturers, brands, and retailers. It automates the catalog — turning product photos into 3D models, publishing a branded online storefront, and giving customers drag-and-drop 3D planners to design their rooms.",
  },
  {
    question: "Who is Studio for?",
    answer:
      "Furniture manufacturers, brands, and retailers who want to digitize their catalog, sell online, and let customers visualize products in 3D before ordering.",
  },
  {
    question: "How does the 3D catalog work?",
    answer:
      "You upload product photos and Studio generates 3D models of your furniture. Those models power your storefront and the interactive room, kitchen, and wardrobe planners.",
  },
  {
    question: "How much does Studio cost?",
    answer:
      "Studio is a monthly or annual subscription starting at $59 per month. Higher tiers add more 3D generation credits, planners, team seats, and storefront features; Enterprise plans are available.",
  },
  {
    question: "Can customers order directly from the storefront?",
    answer:
      "Yes. Studio includes order management, so customers can configure products in the planner and place orders that you manage from one place.",
  },
];

export default function StudioProductPage() {
  return (
    <>
      <JsonLdScript data={buildStudioAppJsonLd()} />
      <JsonLdScript data={buildFaqJsonLd(FAQ)} />
      <JsonLdScript
        data={buildBreadcrumbJsonLd([
          { name: "Tunzone", url: TUNZONE_SITE_URL },
          { name: "Studio", url: CANONICAL },
        ])}
      />

      <section className="mx-auto max-w-3xl px-4 pt-32 pb-16 text-center sm:px-6">
        <h1 className="font-serif italic text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
          Automate your furniture catalog with Studio
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Studio helps furniture brands and manufacturers turn product photos into 3D models,
          publish a branded storefront, and let customers design their rooms with your products —
          all in one platform.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/pricing" sameTab>
            See plans &amp; pricing
          </Button>
          <Button href={getStudioHref()} variant="secondary">
            Open Studio
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl border-t border-border/50 px-4 py-16 sm:px-6">
        <h2 className="text-center font-serif italic text-3xl font-normal text-foreground">
          How Studio works
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
          Everything a furniture brand needs to sell online
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
          <Button href="/pricing" sameTab>
            See plans &amp; pricing
          </Button>
        </div>
      </section>
    </>
  );
}
