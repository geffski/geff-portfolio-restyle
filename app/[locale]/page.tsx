import { notFound } from "next/navigation";
import MotionPortfolio from "../MotionPortfolio";

const locales = ["it", "en"] as const;
type Locale = (typeof locales)[number];

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

  return <MotionPortfolio feedbackPreview reviewMode locale={locale} />;
}
