import { notFound } from "next/navigation";
import MotionPortfolio from "../MotionPortfolio";

const locales = ["it", "en"] as const;
type Locale = (typeof locales)[number];

const siteUrl = "https://geffweb.it";

const structuredDataCopy = {
  it: "Web design e sviluppo di siti web per piccole attività. Sito fino a 5 pagine, anche in italiano e inglese, a €650.",
  en: "Website design and development for small businesses. Up to 5 pages, including Italian and English, for €650.",
} satisfies Record<Locale, string>;

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Geff",
    url: `${siteUrl}/${locale}`,
    description: structuredDataCopy[locale],
    telephone: "+39 334 139 4895",
    priceRange: "€650",
    areaServed: { "@type": "City", name: "Modena" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Modena",
      addressCountry: "IT",
    },
    makesOffer: {
      "@type": "Offer",
      price: "650",
      priceCurrency: "EUR",
      itemOffered: {
        "@type": "Service",
        name: locale === "en" ? "Website design for small businesses" : "Web design per piccole attività",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <MotionPortfolio feedbackPreview reviewMode locale={locale} />
    </>
  );
}
