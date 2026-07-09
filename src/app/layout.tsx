import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";
import "./design.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TranslationProvider } from "@/components/TranslationProvider";
import { countryFromRequestHeaders, languageFromCookieOrGeo } from "@/lib/requestLanguage";
import type { LanguageCode } from "@/lib/translations";
import { themeBootScript } from "@/lib/theme";

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300..600;1,300..600&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+Armenian:wght@300;400;500;600;700&family=Noto+Sans+Armenian:wght@400;500;600;700&display=swap";

const siteUrl = "https://tunzone.com";
const title = "Tunzone — 3D Furniture Platform";
const description =
  "Transform product photos into 3D models, build immersive room planners, and sell modular furniture online.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Tunzone",
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Tunzone",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tunzone 3D furniture platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

function htmlLangFromCode(code: LanguageCode): string {
  if (code === "hy") return "hy";
  if (code === "ru") return "ru";
  return "en";
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const cookieStore = await cookies();
  const initialLang: LanguageCode = languageFromCookieOrGeo(
    cookieStore.get("tunzone-lang")?.value,
    countryFromRequestHeaders(h),
  );

  return (
    <html lang={htmlLangFromCode(initialLang)} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: themeBootScript,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-background text-foreground transition-colors duration-300"
      >
        <GoogleAnalytics />
        <PostHogProvider>
          <ThemeProvider>
            <TranslationProvider initialLang={initialLang}>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </TranslationProvider>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
