import { notFound } from "next/navigation";
import MotionPortfolio from "../MotionPortfolio";

const locales = ["it", "en"] as const;
type Locale = (typeof locales)[number];

const siteUrl = "https://geffweb.it";

const structuredDataCopy = {
  it: "Web design e sviluppo di siti web per piccole attività in tutta Italia. Sito vetrina a €300, tutto incluso.",
  en: "Website design and development for small businesses across Italy. Showcase website for €300, all included.",
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
    priceRange: "€300",
    areaServed: { "@type": "Country", name: "Italia" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Modena",
      addressCountry: "IT",
    },
    makesOffer: [
      {
        "@type": "Offer",
        price: "300",
        priceCurrency: "EUR",
        itemOffered: {
          "@type": "Service",
          name: locale === "en" ? "Showcase Website" : "Sito Vetrina",
        },
      },
    ],
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
