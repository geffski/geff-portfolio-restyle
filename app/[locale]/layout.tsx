import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import "../globals.css";

const locales = ["it", "en"] as const;
type Locale = (typeof locales)[number];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl = "https://geffweb.it";

const metadataCopy = {
  it: {
    title: "Geff - Design e sviluppo di siti web",
    description:
      "Siti web chiari, veloci e curati per piccole attività: €650, fino a 5 pagine anche in italiano e inglese. Design, testi e pubblicazione seguiti da Geff.",
    imageAlt: "Geff. — Web design & development. €650.",
    openGraphLocale: "it_IT",
  },
  en: {
    title: "Geff - Website design and development",
    description:
      "Clear, fast and polished websites for small businesses: €650 for up to 5 pages, including Italian and English. Design, copy and launch handled by Geff.",
    imageAlt: "Geff. — Web design & development. €650.",
    openGraphLocale: "en_GB",
  },
} satisfies Record<Locale, {
  title: string;
  description: string;
  imageAlt: string;
  openGraphLocale: string;
}>;

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam;
  const copy = metadataCopy[locale];
  const requestHeaders = await headers();
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000")
    .split(",")[0]
    .trim();
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProtocol ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const canonicalUrl = `${siteUrl}/${locale}`;
  const socialImage = `${origin}/${locale === "it" ? "og.png?v=7" : "og-en.png?v=3"}`;

  return {
    metadataBase: new URL(siteUrl),
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "it-IT": `${siteUrl}/it`,
        en: `${siteUrl}/en`,
        "x-default": `${siteUrl}/it`,
      },
    },
    icons: {
      icon: "/favicon.svg?v=2",
      shortcut: "/favicon.svg?v=2",
    },
    openGraph: {
      type: "website",
      locale: copy.openGraphLocale,
      alternateLocale: locale === "it" ? ["en_GB"] : ["it_IT"],
      url: canonicalUrl,
      siteName: "Geff. — Web Designer",
      title: copy.title,
      description: copy.description,
      images: [{
        url: socialImage,
        width: 1672,
        height: 941,
        alt: copy.imageAlt,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [socialImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${dmSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
