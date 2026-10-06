import { notFound } from "next/navigation";
import MotionPortfolio from "../MotionPortfolio";

const locales = ["it", "en"] as const;
type Locale = (typeof locales)[number];

const siteUrl = "https://geffweb.it";

const structuredDataCopy = {
  it: "Web design e sviluppo di siti web per piccole attività. Sito di una pagina a €300, fino a 5 pagine a €500.",
  en: "Website design and development for small businesses. One-page website for €300, up to 5 pages for €500.",
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
    priceRange: "€300–€500",
    areaServed: { "@type": "City", name: "Modena" },
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
          name: locale === "en" ? "Essential Website" : "Sito Essenziale",
        },
      },
      {
        "@type": "Offer",
        price: "500",
        priceCurrency: "EUR",
        itemOffered: {
          "@type": "Service",
          name: locale === "en" ? "Complete Website" : "Sito Completo",
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
