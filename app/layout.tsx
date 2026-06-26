import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorFx } from "@/components/motion/CursorFx";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.manifesto,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.manifesto,
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <body className="grain min-h-screen antialiased">
        <CursorFx />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
