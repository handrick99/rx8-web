import { Outfit, Syne } from "next/font/google";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { businessJsonLd } from "@/lib/structuredData";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  ...pageMetadata({ path: "/", title: SITE_TITLE, description: SITE_DESCRIPTION }),
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  keywords: [
    "watch protection film",
    "watch PPF",
    "Rolex protection film",
    "Patek Philippe protection film",
    "Audemars Piguet protection film",
    "Richard Mille protection film",
    "watch scratch protection",
    "Los Angeles",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable} h-full`}>
      <body className="min-h-full bg-bg text-ink antialiased">
        <JsonLd data={businessJsonLd()} />
        {children}
      </body>
    </html>
   
  );
}
