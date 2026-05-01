import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TranslationProvider } from "@/components/TranslationProvider";
import type { LanguageCode } from "@/lib/translations";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });

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
  const raw = h.get("x-tunzone-lang");
  const initialLang: LanguageCode =
    raw === "en" || raw === "ru" || raw === "hy" ? raw : "en";

  return (
    <html lang={htmlLangFromCode(initialLang)} className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.classList.remove("dark");else if(t==="dark"||!window.matchMedia("(prefers-color-scheme: light)").matches)document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <GoogleAnalytics />
        <ThemeProvider>
          <TranslationProvider initialLang={initialLang}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
