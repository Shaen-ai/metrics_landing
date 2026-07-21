import type { Metadata } from "next";
import { TUNZONE_SITE_URL } from "@/lib/siteUrl";

const CANONICAL = `${TUNZONE_SITE_URL}/about`;
const title = "About Tunzone — The Platform Behind Vista & Studio";
const description =
  "Tunzone is a multi-project platform building tools that improve everyday life: Vista interior design for homeowners and Studio catalog automation for furniture brands. Get in touch.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: CANONICAL },
  openGraph: { type: "website", url: CANONICAL, siteName: "Tunzone", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
