import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const locales = ["it", "en"] as const;
type Locale = (typeof locales)[number];

const siteUrl = "https://geffweb.it";
// Data controller shown in the policy: replace with full legal name (and P.IVA once issued).
const CONTROLLER_NAME = "Geff";
const CONTACT_EMAIL = "info@geffweb.it";

type Section = { title: string; body: string[] };

const policyCopy = {
  it: {
    title: "Privacy policy · Geff",
    description: "Come geffweb.it tratta i dati personali di chi visita il sito o mi contatta.",
    back: "Torna al sito",
    label: "INFORMATIVA PRIVACY",
    heading: "Privacy policy",
    updated: "Ultimo aggiornamento: 14 ottobre 2026",
    intro:
      "Questa pagina spiega quali dati personali tratto quando visiti geffweb.it o mi contatti, perché lo faccio e quali diritti hai. È scritta ai sensi dell’articolo 13 del Regolamento UE 2016/679 (GDPR).",
    sections: [
      {
        title: "1. Chi è il titolare",
        body: [
          `Il titolare del trattamento è ${CONTROLLER_NAME}, web designer con sede a Modena, Italia.`,
          `Per qualsiasi domanda sulla privacy puoi scrivere a ${CONTACT_EMAIL}.`,
        ],
      },
      {
        title: "2. Dati di navigazione",
        body: [
          "Quando visiti il sito, il servizio di hosting (Cloudflare) registra in automatico alcuni dati tecnici: indirizzo IP, tipo di browser, pagine richieste, data e ora.",
          "Servono solo a far funzionare il sito e a proteggerlo da abusi. Non li uso per profilarti. Base giuridica: legittimo interesse (art. 6.1.f GDPR).",
        ],
      },
      {
        title: "3. Quando mi contatti",
        body: [
          "Se mi scrivi su WhatsApp o via email ricevo il tuo nome, il tuo numero o indirizzo email e il contenuto del messaggio.",
          "Il modulo nella pagina Contatti non invia nulla a un server: prepara solo un messaggio che si apre su WhatsApp, e sei tu a decidere se inviarlo.",
          "Uso questi dati solo per risponderti e, se lavoriamo insieme, per preparare il preventivo e realizzare il sito. Base giuridica: misure precontrattuali e contratto (art. 6.1.b GDPR).",
        ],
      },
      {
        title: "4. Cookie",
        body: [
          "Il sito non usa cookie di profilazione, pubblicitari o di statistica.",
          "Se attivi l’anteprima di un sito nella sezione Lavori o Concept, quella pagina esterna viene caricata dentro geffweb.it e può ricevere il tuo indirizzo IP, come succede quando visiti un sito qualsiasi.",
        ],
      },
      {
        title: "5. Chi altro tratta i dati",
        body: [
          "Cloudflare, Inc. per l’hosting del sito. I dati possono essere trattati negli Stati Uniti, con le garanzie dell’EU-US Data Privacy Framework.",
          "WhatsApp (Meta Platforms Ireland Ltd.) se scegli di scrivermi su WhatsApp.",
          "Aruba S.p.A. per la casella email.",
          "Non vendo e non cedo i tuoi dati a nessuno.",
        ],
      },
      {
        title: "6. Per quanto tempo",
        body: [
          "Conservo i messaggi per il tempo necessario a risponderti e a seguire l’eventuale lavoro.",
          "Se diventi cliente, conservo i documenti fiscali per il tempo previsto dalla legge (di solito 10 anni).",
          "I dati tecnici di navigazione sono conservati da Cloudflare per periodi brevi, secondo le sue regole.",
        ],
      },
      {
        title: "7. I tuoi diritti",
        body: [
          `Puoi chiedere in qualsiasi momento di vedere, correggere o cancellare i tuoi dati, di limitarne l’uso, di opporti al trattamento o di riceverli in un formato leggibile. Basta scrivere a ${CONTACT_EMAIL}.`,
          "Se pensi che i tuoi dati siano trattati in modo scorretto puoi presentare reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).",
          "Darmi i tuoi dati non è obbligatorio, ma senza un contatto non posso risponderti. Non uso decisioni automatizzate.",
        ],
      },
    ] satisfies Section[],
  },
  en: {
    title: "Privacy policy · Geff",
    description: "How geffweb.it handles the personal data of visitors and people who get in touch.",
    back: "Back to the website",
    label: "PRIVACY NOTICE",
    heading: "Privacy policy",
    updated: "Last updated: 14 October 2026",
    intro:
      "This page explains which personal data I process when you visit geffweb.it or contact me, why I do it and what your rights are. It is written under Article 13 of EU Regulation 2016/679 (GDPR).",
    sections: [
      {
        title: "1. Who is responsible",
        body: [
          `The data controller is ${CONTROLLER_NAME}, a web designer based in Modena, Italy.`,
          `For any privacy question you can write to ${CONTACT_EMAIL}.`,
        ],
      },
      {
        title: "2. Browsing data",
        body: [
          "When you visit the website, the hosting service (Cloudflare) automatically records some technical data: IP address, browser type, pages requested, date and time.",
          "This is only used to run the website and protect it from abuse. I do not use it to profile you. Legal basis: legitimate interest (Art. 6.1.f GDPR).",
        ],
      },
      {
        title: "3. When you contact me",
        body: [
          "If you message me on WhatsApp or by email, I receive your name, your number or email address and the content of your message.",
          "The form in the Contact section does not send anything to a server: it only prepares a message that opens in WhatsApp, and you decide whether to send it.",
          "I only use this data to reply and, if we work together, to prepare the quote and build the website. Legal basis: pre-contractual steps and contract (Art. 6.1.b GDPR).",
        ],
      },
      {
        title: "4. Cookies",
        body: [
          "The website does not use profiling, advertising or analytics cookies.",
          "If you activate the preview of a website in the Work or Concepts section, that external page loads inside geffweb.it and may receive your IP address, as happens when you visit any website.",
        ],
      },
      {
        title: "5. Who else processes data",
        body: [
          "Cloudflare, Inc. for website hosting. Data may be processed in the United States, under the safeguards of the EU-US Data Privacy Framework.",
          "WhatsApp (Meta Platforms Ireland Ltd.) if you choose to message me on WhatsApp.",
          "Aruba S.p.A. for the email inbox.",
          "I do not sell or share your data with anyone else.",
        ],
      },
      {
        title: "6. How long",
        body: [
          "I keep messages for as long as needed to reply and to handle any work together.",
          "If you become a client, I keep tax documents for the period required by law (usually 10 years).",
          "Technical browsing data is kept by Cloudflare for short periods, under its own rules.",
        ],
      },
      {
        title: "7. Your rights",
        body: [
          `At any time you can ask to see, correct or delete your data, to restrict its use, to object to processing or to receive it in a readable format. Just write to ${CONTACT_EMAIL}.`,
          "If you think your data is being handled incorrectly, you can complain to the Italian data protection authority, the Garante per la protezione dei dati personali (garanteprivacy.it).",
          "Giving me your data is not mandatory, but without a contact I cannot reply. I do not use automated decision-making.",
        ],
      },
    ] satisfies Section[],
  },
} satisfies Record<Locale, {
  title: string;
  description: string;
  back: string;
  label: string;
  heading: string;
  updated: string;
  intro: string;
  sections: Section[];
}>;

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = policyCopy[locale];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/privacy`,
      languages: {
        "it-IT": `${siteUrl}/it/privacy`,
        en: `${siteUrl}/en/privacy`,
      },
    },
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = policyCopy[locale];

  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link className="motion-mark" href={`/${locale}`}><b>Geff</b></Link>
        <Link className="legal-back" href={`/${locale}`}>← {copy.back}</Link>
      </header>
      <article className="legal-body">
        <p className="motion-label">{copy.label}</p>
        <h1>{copy.heading}</h1>
        <p className="legal-updated">{copy.updated}</p>
        <p className="legal-intro">{copy.intro}</p>
        {copy.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
      </article>
    </main>
  );
}
