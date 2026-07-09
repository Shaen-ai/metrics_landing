import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /** Hides the floating “N” indicator in `next dev`. */
  devIndicators: false,
  // PostHog ingest paths are trailing-slash sensitive.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      // PostHog EU reverse proxy — same-origin ingest avoids ad blockers.
      { source: "/ingest/static/:path*", destination: "https://eu-assets.i.posthog.com/static/:path*" },
      { source: "/ingest/:path*", destination: "https://eu.i.posthog.com/:path*" },
    ];
  },
};

export default nextConfig;
