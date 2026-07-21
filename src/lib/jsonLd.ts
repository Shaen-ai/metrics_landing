import { TUNZONE_SITE_URL } from "@/lib/siteUrl";
import { getVistaBaseUrl, getStudioBaseUrl } from "@/lib/appUrl";

/**
 * Structured-data (schema.org) builders for the marketing site.
 *
 * These declare the Tunzone *entity graph* — the umbrella Organization plus one
 * SoftwareApplication per product (Vista, Studio) — so search and AI answer
 * engines can identify what each product is and recommend it by name. Keep the
 * Organization name/url/logo/sameAs identical to the Vista app's Organization
 * so the engines merge them into one entity.
 */

const ORG_ID = `${TUNZONE_SITE_URL}/#organization`;
const WEBSITE_ID = `${TUNZONE_SITE_URL}/#website`;

/** Off-site profiles that reinforce the Tunzone entity. Extend as they exist. */
const SAME_AS = [`${TUNZONE_SITE_URL}/about`];

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Tunzone",
    url: TUNZONE_SITE_URL,
    logo: `${TUNZONE_SITE_URL}/logo.png`,
    description:
      "Tunzone is a multi-project platform building tools that improve everyday life — including Vista (interior design for homeowners) and Studio (catalog, planner, and storefront automation for furniture brands).",
    sameAs: SAME_AS,
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: TUNZONE_SITE_URL,
    name: "Tunzone",
    publisher: { "@id": ORG_ID },
  };
}

function vistaAppNode() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${getVistaBaseUrl()}/#software`,
    name: "Vista",
    url: getVistaBaseUrl(),
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    description:
      "Vista is an interior design tool for homeowners: upload a room photo and get photorealistic redesigns featuring real, purchasable furniture. Pay-as-you-go with no subscription.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description:
        "Free to start with bonus tokens; pay-per-design token packs from $5.",
    },
    publisher: { "@id": ORG_ID },
  };
}

function studioAppNode() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${getStudioBaseUrl()}/#software`,
    name: "Tunzone Studio",
    url: `${TUNZONE_SITE_URL}/studio`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Studio helps furniture brands and manufacturers automate their catalog: turn product photos into 3D models, publish a branded storefront, and let customers plan rooms with drag-and-drop planners.",
    audience: {
      "@type": "BusinessAudience",
      name: "Furniture manufacturers and brands",
    },
    offers: {
      "@type": "Offer",
      price: "59",
      priceCurrency: "USD",
      description: "Monthly subscription; plans start at $59/month.",
      url: `${TUNZONE_SITE_URL}/pricing`,
    },
    publisher: { "@id": ORG_ID },
  };
}

/** Full entity graph — render once from the root layout. */
export function buildPlatformGraphJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      vistaAppNode(),
      studioAppNode(),
    ],
  };
}

/** Standalone SoftwareApplication node for a product landing page. */
export function buildVistaAppJsonLd(): object {
  return { "@context": "https://schema.org", ...vistaAppNode() };
}

export function buildStudioAppJsonLd(): object {
  return { "@context": "https://schema.org", ...studioAppNode() };
}

export interface JsonLdFaqPage {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }>;
}

export function buildFaqJsonLd(
  questions: Array<{ question: string; answer: string }>,
): JsonLdFaqPage {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
