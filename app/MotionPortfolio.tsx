"use client";

import { FormEvent, MouseEvent, PointerEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const WHATSAPP_NUMBER = "393341394895";
const WHATSAPP_DISPLAY = "+39 334 139 4895";
type PortfolioLocale = "it" | "en";

const paletteOptions = [
  { id: "cobalt", number: "P1", name: "Blu + Bianco + Nero" },
  { id: "forest", number: "P2", name: "Harbour Slate" },
  { id: "bordeaux", number: "P3", name: "Bordeaux + Sabbia" },
  { id: "plum", number: "P4", name: "Prugna + Nebbia" },
];

const projects = [
  {
    number: "01",
    slug: "serena",
    title: "Serena Previdi",
    type: "Studio di psicologia",
    eyebrow: "Ascolto · Percorsi · Benessere",
    headline: "Uno spazio digitale calmo, chiaro e umano.",
    url: "https://serenaprevidi.com",
  },
  {
    number: "02",
    slug: "alpha",
    title: "Alpha Elite Fitness Club",
    type: "Palestra",
    eyebrow: "Allenamento · Metodo · Risultati",
    headline: "Un’identità più forte, dentro e fuori dalla palestra.",
    url: "https://alpha-fitness-mo.netlify.app/",
  },
];

const showcases = [
  {
    number: "D01",
    title: "Nutrizione",
    type: "Magazine alimentare",
    label: "Demo",
    description: "Un sistema editoriale ampio, naturale e leggibile, costruito per contenuti, ricette e risorse.",
    image: "/showcases/alma-nutre.webp",
    url: "https://geff-demo-alma-nutre-20260809.geff.workers.dev/",
  },
  {
    number: "D02",
    title: "Centro estetico",
    type: "Beauty & wellness",
    label: "Concept",
    description: "Un’esperienza luminosa e tattile per raccontare rituali, atmosfera e cura dei dettagli.",
    image: "/showcases/etera-studio.webp",
    url: "https://geff-demo-etera-studio-20260809.geff.workers.dev/",
  },
  {
    number: "D03",
    title: "Ristorante",
    mobileFeature: "second",
    type: "Bistro & ristorante",
    label: "Demo",
    description: "Un’esperienza immersiva e materica che racconta cucina, atmosfera e ospitalità con un taglio editoriale.",
    image: "/showcases/velaria-wedding.webp",
    url: "https://geff-demo-fidalgo-bistro-20260810.geff.workers.dev/",
  },
  {
    number: "D04",
    title: "Event planner",
    mobileFeature: "first",
    type: "Event studio",
    label: "Demo",
    description: "Un’identità espressiva e contemporanea per eventi privati, feste e celebrazioni su misura.",
    image: "/showcases/casa-lieve-events.webp",
    url: "https://geff-demo-casa-lieve-20260809.geff.workers.dev/",
  },
  {
    number: "D05",
    title: "Forno artigianale",
    type: "Forno di quartiere",
    label: "Demo",
    description: "Un sito caldo e diretto per presentare prodotti, storie e servizi quotidiani di un forno artigianale.",
    image: "/showcases/nativa-wedding-studio.webp",
    url: "https://geff-demo-sottoportico-forno-20260810.geff.workers.dev/",
  },
];

const testimonials = [
  {
    quote:
      "Ho ricontattato Geffery dopo alcuni mesi dalla sua proposta per poter migliorare il mio sito e sono molto soddisfatta del lavoro realizzato, in quanto molta è stata la collaborazione a partire da un costante scambio costruttivo di idee. Geffery si è mostrato, inoltre, puntuale, disponibile e attento ad ogni richiesta, ma anche flessibile e preciso nella realizzazione del prodotto finale.",
    name: "Serena Previdi",
    role: "Studio di psicologia",
    mobileCollapsible: true,
  },
  {
    quote:
      "Molto professionale. Ascolta le richieste con attenzione e si assicura che il cliente sia soddisfatto. È molto veloce nella progettazione e sa muoversi con competenza nel suo campo. Lo consiglio.",
    name: "Christian",
    role: "Alpha Elite Fitness Club · precedentemente Evolution Fit Marzaglia",
  },
];

const faq = [
  {
    question: "Quanto tempo serve?",
    answer:
      "La tempistica viene definita dopo la prima call e dipende soprattutto dalla quantità di contenuti e dalla complessità del sito. Nel preventivo trovi sempre una consegna concordata.",
  },
  {
    question: "Posso usare il dominio che ho già?",
    answer:
      "Sì. Posso collegare un dominio esistente oppure aiutarti a scegliere e registrare quello giusto. Il dominio resta intestato a te: acquisto e rinnovo annuale sono esclusi dai €650 e li paghi direttamente al fornitore.",
  },
  {
    question: "Come si contano le pagine e le lingue?",
    answer:
      "Sono incluse fino a 5 pagine di contenuto, con struttura e sezioni concordate prima di iniziare. Puoi avere le stesse pagine in italiano e inglese senza supplementi: le versioni tradotte non raddoppiano il conteggio. Preparo i testi nelle due lingue e tu approvi informazioni, termini specifici e traduzioni prima della pubblicazione. Pagine aggiuntive e altre lingue si quotano a parte.",
  },
  {
    question: "Chi gestisce l’hosting?",
    answer:
      "Per il sito concordato, l’hosting è incluso senza canone finché resta compatibile con il servizio gratuito utilizzato. Se cambiano le condizioni del servizio o servono risorse a pagamento, ti presento prima costi e alternative. Puoi scegliere un altro hosting e non attivo servizi a pagamento senza la tua approvazione. La gestione dell’hosting non comprende modifiche continue ai contenuti.",
  },
  {
    question: "Posso chiedere modifiche?",
    answer:
      "Prima della pubblicazione sono incluse le correzioni a testi, immagini e dettagli del design concordato. Nei 30 giorni successivi sono inclusi anche piccoli aggiustamenti a testi e immagini. Nuove pagine o sezioni, funzioni aggiuntive, un cambio di direzione rispetto al design approvato e aggiornamenti successivi a questo periodo vengono preventivati a parte. Non è un servizio di modifiche illimitate nel tempo.",
  },
  {
    question: "Il sito sarà mio?",
    answer:
      "Sì. Dopo il saldo finale ricevi il sito e gli elementi concordati nel preventivo, senza vincoli nascosti.",
  },
  {
    question: "Chi prepara testi e immagini?",
    answer:
      "Scrivo o adatto i testi delle pagine concordate, anche in italiano e inglese. Tu fornisci le informazioni sulla tua attività, le immagini utilizzabili e il logo esistente, e approvi contenuti e traduzioni prima della pubblicazione. Servizi fotografici, immagini a pagamento e creazione del logo non sono inclusi.",
  },
  {
    question: "€650 è il prezzo totale?",
    answer:
      "Sì, €650 è il prezzo totale del pacchetto descritto, senza abbonamento obbligatorio. Acquisto e rinnovo del dominio sono esclusi. Eventuali extra e servizi a pagamento vengono indicati separatamente nel preventivo e attivati solo dopo la tua approvazione. Prima dell’avvio ricevi il riepilogo scritto di ciò che è incluso e dei costi concordati.",
  },
  {
    question: "Posso aggiungere un negozio online o prenotazioni?",
    answer:
      "Il pacchetto da €650 è pensato per presentare la tua attività, i servizi e i contatti. E-commerce, pagamenti online, sistemi di prenotazione, aree riservate e altre funzioni personalizzate richiedono un preventivo separato.",
  },
  {
    question: "Come funziona il pagamento?",
    answer:
      "Per il pacchetto da €650 paghi €325 all’avvio del progetto e €325 alla pubblicazione del sito approvato. Prima di iniziare confermiamo per iscritto contenuti, tempi ed eventuali extra.",
  },
];

const englishProjects = [
  {
    number: "01",
    slug: "serena",
    title: "Serena Previdi",
    type: "Psychology practice",
    eyebrow: "Listening · Support · Wellbeing",
    headline: "A calm, clear and human digital space.",
    url: "https://serenaprevidi.com",
  },
  {
    number: "02",
    slug: "alpha",
    title: "Alpha Elite Fitness Club",
    type: "Fitness club",
    eyebrow: "Training · Method · Results",
    headline: "A stronger identity, inside and outside the gym.",
    url: "https://alpha-fitness-mo.netlify.app/",
  },
];

const englishShowcases = [
  {
    number: "D01",
    title: "Nutrition",
    type: "Food magazine",
    label: "Demo",
    description: "A spacious, natural and readable editorial system designed for content, recipes and resources.",
    image: "/showcases/alma-nutre.webp",
    url: "https://geff-demo-alma-nutre-20260809.geff.workers.dev/",
  },
  {
    number: "D02",
    title: "Beauty studio",
    type: "Beauty & wellness",
    label: "Concept",
    description: "A bright, tactile experience designed to communicate rituals, atmosphere and attention to detail.",
    image: "/showcases/etera-studio.webp",
    url: "https://geff-demo-etera-studio-20260809.geff.workers.dev/",
  },
  {
    number: "D03",
    title: "Restaurant",
    mobileFeature: "second",
    type: "Bistro & restaurant",
    label: "Demo",
    description: "An immersive, tactile experience that presents food, atmosphere and hospitality with an editorial feel.",
    image: "/showcases/velaria-wedding.webp",
    url: "https://geff-demo-fidalgo-bistro-20260810.geff.workers.dev/",
  },
  {
    number: "D04",
    title: "Event planner",
    mobileFeature: "first",
    type: "Event studio",
    label: "Demo",
    description: "An expressive, contemporary identity for private events, parties and bespoke celebrations.",
    image: "/showcases/casa-lieve-events.webp",
    url: "https://geff-demo-casa-lieve-20260809.geff.workers.dev/",
  },
  {
    number: "D05",
    title: "Artisan bakery",
    type: "Neighbourhood bakery",
    label: "Demo",
    description: "A warm, direct website for presenting the products, stories and everyday services of an artisan bakery.",
    image: "/showcases/nativa-wedding-studio.webp",
    url: "https://geff-demo-sottoportico-forno-20260810.geff.workers.dev/",
  },
];

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  mobileCollapsible?: boolean;
  translationNote?: string;
};

const englishTestimonials: Testimonial[] = [
  {
    quote:
      "I got back in touch with Geffery a few months after his proposal because I wanted to improve my website, and I am very happy with the result. The process was highly collaborative, with a constant and constructive exchange of ideas. Geffery was punctual, helpful and attentive to every request, as well as flexible and precise in delivering the final website.",
    name: "Serena Previdi",
    role: "Psychology practice",
    mobileCollapsible: true,
    translationNote: "Translated from Italian",
  },
  {
    quote:
      "Very professional. He listens carefully to requests and makes sure the client is satisfied. He works very quickly and knows his field well. I recommend him.",
    name: "Christopher Paparella",
    role: "Owner · Alpha Elite Fitness Club · formerly Evolution Fit Marzaglia",
    translationNote: "Translated from Italian",
  },
];

const englishFaq = [
  {
    question: "How long does it take?",
    answer:
      "Once all the necessary content is available and the design direction has been agreed, standard delivery is approximately 48–78 hours. The timeframe starts at that point. Feedback time, new requests or a change of direction may move the delivery date; we will always confirm it before starting.",
  },
  {
    question: "Can I use a domain I already own?",
    answer:
      "Yes. I can connect an existing domain or help you choose and register the right one. The domain stays in your name: registration and annual renewal are excluded from the €650 and paid directly to the provider.",
  },
  {
    question: "How are pages and languages counted?",
    answer:
      "The package includes up to 5 content pages, with their structure and sections agreed before we start. You can have the same pages in Italian and English at no extra charge: translated versions do not count as additional pages. I prepare both versions, and you approve the information, specialist terms and translations before launch. Additional pages and other languages are quoted separately.",
  },
  {
    question: "Who manages the hosting?",
    answer:
      "Hosting for the agreed website is included without a recurring fee while it remains compatible with the free service used. If the service terms change or paid resources are needed, I explain the costs and alternatives first. You can choose another host, and I do not activate paid services without your approval. Hosting management does not include ongoing content changes.",
  },
  {
    question: "Can I request changes?",
    answer:
      "Before launch, corrections to copy, images and details of the agreed design are included. Small copy and image adjustments are also included for 30 days after launch. New pages or sections, extra functionality, changes of direction from the approved design and updates after that period are quoted separately. This is not an unlimited ongoing editing service.",
  },
  {
    question: "Will I own the website?",
    answer:
      "Yes. After the final payment, you receive the website and everything agreed in the proposal, with no hidden restrictions.",
  },
  {
    question: "Who prepares the copy and images?",
    answer:
      "I write or adapt the copy for the agreed pages, including Italian and English versions. You provide your business information, images you can use and your existing logo, and approve the content and translations before launch. Photography, paid images and logo design are not included.",
  },
  {
    question: "Is €650 the total price?",
    answer:
      "Yes, €650 is the total price for the package described, with no mandatory subscription. Domain registration and renewal are excluded. Extras and paid services are listed separately in the proposal and activated only with your approval. Before starting, you receive a written summary of what is included and the agreed costs.",
  },
  {
    question: "Can I add an online shop or bookings?",
    answer:
      "The €650 package is designed to present your business, services and contact details. E-commerce, online payments, booking systems, private accounts and other custom functionality require a separate quote.",
  },
  {
    question: "How does payment work?",
    answer:
      "For the €650 package, you pay €325 when the project starts and €325 when the approved website is published. We confirm the content, timeline and any extras in writing before starting.",
  },
];

const pageCopy = {
  it: {
    navigationLabel: "Navigazione principale",
    mobileNavigationLabel: "Navigazione principale mobile",
    skipToContent: "Vai al contenuto principale",
    nav: [
      ["#lavori", "Lavori"],
      ["#showcase", "Demo"],
      ["#offerta", "Offerta"],
      ["#processo", "Come funziona"],
      ["#testimonianze", "Recensioni"],
      ["#chi-sono", "Chi sono"],
      ["#faq", "FAQ"],
      ["#contatti", "Contatti"],
    ],
    openMenu: "Apri il menu",
    closeMenu: "Chiudi il menu",
    languageLabel: "Cambia lingua",
    whatsappMenu: "Scrivi a Geff su WhatsApp",
    directWhatsappMessage: "Ciao Geff, ho visto i tuoi lavori e vorrei parlarti del sito da €650, fino a 5 pagine anche in italiano e inglese, per la mia attività.",
    heroKicker: "SITI WEB PER PICCOLE ATTIVITÀ · MODENA",
    heroLines: ["La prima impressione", "comincia online."],
    heroIntro: "Progetto e realizzo siti web per piccole attività e professionisti. Design, testi e pubblicazione: segui ogni passo direttamente con me.",
    heroWorkCta: "Guarda i siti realizzati",
    heroContactCta: "Parliamo del tuo sito",
    projectPreviews: "Anteprime dei progetti realizzati",
    visitProject: "Visita il sito di",
    viewProject: "Vai al progetto",
    open: "APRI",
    view: "VEDI",
    realProjectsHint: "PROGETTI REALI · TOCCA PER ESPLORARE",
    heroFactsLabel: "Caratteristiche principali",
    heroFacts: ["Due progetti reali", "Apri · Guarda · Esplora", "Design diversi per attività diverse"],
    workLabel: "PROGETTI REALI · CLICCA PER ESPLORARE",
    workTitle: ["Due attività.", "Due siti da esplorare."],
    workNote: "Ogni progetto si può aprire",
    activatePreview: "Attiva l’anteprima",
    continuePage: "Continua nella pagina",
    liveSite: "SITO ONLINE · VISITA",
    fullSites: "SITI COMPLETI COME QUESTI",
    discoverIncluded: "Scopri cosa include",
    projectQuestion: "HAI UN PROGETTO IN MENTE?",
    letsTalk: "Parliamone.",
    showcaseLabel: "SHOWCASE / CONCEPT · IDENTITÀ FITTIZIE",
    showcaseTitle: ["Siti demo", "da esplorare."],
    showcaseIntro: "Direzioni di design create per il portfolio. Ogni sito è una dimostrazione esplorabile e non rappresenta un’attività operativa.",
    interactiveDemo: "Anteprima interattiva della demo",
    scrollToExplore: "Scorri qui per esplorare",
    openDemo: "Apri la demo",
    openDemoLabel: "Apri la demo",
    showLessDemos: "Mostra solo le principali",
    showMoreDemos: "Vedi altre 3 demo",
    offerLabel: "UN SITO COMPLETO, FATTO BENE",
    offerTitle: ["Semplice nella struttura.", "Completo in tutto il resto."],
    offerIntro: "Il tuo sito vetrina, fino a 5 pagine, anche in italiano e inglese. Design, testi e pubblicazione, seguiti direttamente da me.",
    priceConditions: "Condizioni del prezzo",
    priceFacts: ["Prezzo totale del pacchetto", "Nessun abbonamento obbligatorio", "€325 all’avvio · €325 alla pubblicazione"],
    offerClarification: "€650 è il prezzo totale del pacchetto descritto. Prima di iniziare confermiamo per iscritto struttura, contenuti e tempi. Dominio escluso; eventuali extra vengono preventivati separatamente e realizzati solo dopo la tua approvazione.",
    includedTitle: "Cosa ricevi con €650",
    inclusions: [
      ["Fino a 5 pagine di contenuto", "Definiamo insieme struttura e sezioni per presentare la tua attività."],
      ["Italiano e inglese inclusi", "Le stesse pagine in due lingue, senza supplementi e senza raddoppiare il conteggio."],
      ["Design su ogni dispositivo", "Il sito si adatta a desktop, tablet e smartphone."],
      ["Testi e contenuti", "Preparo i testi e le traduzioni. Tu fornisci informazioni, immagini e logo e approvi i contenuti."],
      ["Contatti e funzioni essenziali", "Form di contatto, pulsanti, link e Google Maps incorporata, quando servono."],
      ["Pubblicazione e hosting", "Controllo e pubblico il sito. Hosting senza canone alle condizioni indicate nelle FAQ."],
      ["Modifiche al progetto concordato", "Correzioni prima della pubblicazione e piccoli aggiustamenti a testi e immagini nei 30 giorni successivi."],
    ],
    extrasTitle: "Extra",
    extras: ["Pagine oltre le 5 incluse, nuove sezioni o altre lingue", "Logo, servizi fotografici o immagini a pagamento", "Cambio del design approvato o aggiornamenti dopo i 30 giorni", "E-commerce, prenotazioni o funzioni personalizzate"],
    fixedPrice: "Prezzo fisso",
    fixedPriceLine: "€650, in due pagamenti da €325.",
    paymentDomain: "50% all’avvio e 50% alla pubblicazione. Il dominio resta intestato a te: acquisto e rinnovo sono a tuo carico. Ogni extra richiede un preventivo e la tua approvazione.",
    testimonialsLabel: "TESTIMONIANZE",
    testimonialsTitle: "Com’è lavorare insieme.",
    collapseReview: "Riduci",
    expandReview: "Leggi la recensione completa",
    processLabel: "COME FUNZIONA",
    processTitle: ["Dal primo messaggio", "al sito online."],
    processSteps: [
      ["Call breve", "Parliamo della tua attività, del pubblico e dell’obiettivo del sito."],
      ["Raccolta contenuti", "Mi invii testi, immagini e informazioni. Ti aiuto a capire cosa manca."],
      ["Anteprima", "Preparo una direzione concreta da vedere e discutere prima dello sviluppo completo."],
      ["Build e revisioni", "Costruisco il sito responsive e applichiamo le modifiche concordate."],
      ["Pubblicazione", "Controllo tutto, collego dominio e hosting e porto il progetto online."],
    ],
    portraitAlt: "Ritratto di Geff",
    aboutLabel: "CHI C’È DIETRO",
    aboutTitle: ["Sono Geff.", "Dal primo messaggio al sito online, parli sempre con me."],
    aboutBody: "Vivo a Modena e studio Informatica all’Unimore. Seguo personalmente ogni progetto: dalla prima conversazione alla versione mobile, dalle modifiche alla pubblicazione. Parli direttamente con chi progetta e consegna il tuo sito.",
    aboutFacts: ["Modena, Italia", "Unimore · Informatica", "Responsabile diretto della consegna"],
    faqLabel: "DOMANDE FREQUENTI",
    faqTitle: "Prima di iniziare.",
    contactLabel: "CONTATTO DIRETTO",
    contactTitle: ["Parliamo del", "tuo sito."],
    contactIntro: "Raccontami cosa fai e cosa ti serve. Il messaggio si apre su WhatsApp e ti rispondo personalmente.",
    responseTime: "Di solito rispondo entro 12 ore.",
    directWhatsapp: "Scrivi a Geff su WhatsApp",
    formChoice: "OPPURE · PREPARA UN MESSAGGIO PIÙ DETTAGLIATO",
    formName: "01 · IL TUO NOME",
    formNamePlaceholder: "Come ti chiami?",
    formBusiness: "02 · LA TUA ATTIVITÀ",
    formBusinessPlaceholder: "Di cosa ti occupi?",
    formProject: "03 · IL PROGETTO",
    formProjectPlaceholder: "Raccontami brevemente cosa ti serve",
    formContinue: "Continua su WhatsApp",
    formPrepare: "Prepara il messaggio",
    formNote: "Completa i tre campi. Il messaggio si apre su WhatsApp: sarai tu a inviarlo.",
    formGreeting: "Ciao Geff, sono",
    potentialClient: "un potenziale cliente",
    businessPrefix: "La mia attività:",
    formFallback: "Vorrei parlarti di un sito web.",
    backToTop: "Torna su",
    closeProject: "Chiudi il progetto",
    close: "Chiudi ×",
    realProject: "Progetto reale",
    visitLiveSite: "Visita il sito live",
    projectPreview: "Anteprima del progetto",
  },
  en: {
    navigationLabel: "Main navigation",
    mobileNavigationLabel: "Main mobile navigation",
    skipToContent: "Skip to main content",
    nav: [
      ["#lavori", "Work"],
      ["#showcase", "Demos"],
      ["#offerta", "Offer"],
      ["#processo", "How it works"],
      ["#testimonianze", "Reviews"],
      ["#chi-sono", "About"],
      ["#faq", "FAQ"],
      ["#contatti", "Contact"],
    ],
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Change language",
    whatsappMenu: "Message Geff on WhatsApp",
    directWhatsappMessage: "Hi Geff, I saw your work and I’d like to discuss the €650 website package, with up to 5 pages including Italian and English versions, for my business.",
    heroKicker: "WEBSITES FOR SMALL BUSINESSES · MODENA",
    heroLines: ["First impressions", "start online."],
    heroIntro: "I design and build websites for small businesses and independent professionals. Design, copy and launch: you work directly with me at every step.",
    heroWorkCta: "See the websites I’ve built",
    heroContactCta: "Let’s talk about your website",
    projectPreviews: "Previews of completed projects",
    visitProject: "Visit the website for",
    viewProject: "View the project",
    open: "OPEN",
    view: "VIEW",
    realProjectsHint: "REAL PROJECTS · TAP TO EXPLORE",
    heroFactsLabel: "Key features",
    heroFacts: ["Two real projects", "Open · View · Explore", "Different designs for different businesses"],
    workLabel: "REAL PROJECTS · CLICK TO EXPLORE",
    workTitle: ["Two businesses.", "Two websites to explore."],
    workNote: "You can open and explore each project",
    activatePreview: "Activate preview",
    continuePage: "Continue down the page",
    liveSite: "LIVE WEBSITE · VISIT",
    fullSites: "COMPLETE WEBSITES LIKE THESE",
    discoverIncluded: "See what’s included",
    projectQuestion: "HAVE A PROJECT IN MIND?",
    letsTalk: "Let’s talk.",
    showcaseLabel: "SHOWCASE / CONCEPT · FICTIONAL BRANDS",
    showcaseTitle: ["Website demos", "to explore."],
    showcaseIntro: "Design directions created for the portfolio. Each website is an interactive demonstration and does not represent an operating business.",
    interactiveDemo: "Interactive preview of the demo",
    scrollToExplore: "Scroll here to explore",
    openDemo: "Open the demo",
    openDemoLabel: "Open the demo",
    showLessDemos: "Show featured demos only",
    showMoreDemos: "View 3 more demos",
    offerLabel: "A COMPLETE WEBSITE, DONE PROPERLY",
    offerTitle: ["Simple in structure.", "Complete where it matters."],
    offerIntro: "Your business website, with up to 5 pages, including Italian and English versions. Design, copy and launch, handled directly by me.",
    priceConditions: "Price terms",
    priceFacts: ["Total package price", "No subscription required", "€325 to start · €325 on publication"],
    offerClarification: "€650 is the total price for the package described. We confirm the structure, content and timeline in writing before starting. The domain is excluded; extras are quoted separately and carried out only with your approval.",
    includedTitle: "What you get for €650",
    inclusions: [
      ["Up to 5 content pages", "We agree the structure and sections that best present your business."],
      ["Italian and English included", "The same pages in both languages, at no extra charge and without doubling the page count."],
      ["Designed for every device", "The website adapts to desktop, tablet and smartphone screens."],
      ["Copy and content", "I prepare the copy and translations. You provide business information, images and your logo, and approve the content."],
      ["Contact and essential functionality", "Contact forms, buttons, links and an embedded Google Map when needed."],
      ["Publishing and hosting", "I check and launch the website. Hosting has no recurring fee under the conditions explained in the FAQ."],
      ["Changes to the agreed project", "Corrections before launch and small copy and image adjustments during the following 30 days."],
    ],
    extrasTitle: "Extras",
    extras: ["Pages beyond the 5 included, new sections or other languages", "Logo design, photography or paid images", "Changes to the approved design or updates after 30 days", "E-commerce, booking or custom functionality"],
    fixedPrice: "Fixed price",
    fixedPriceLine: "€650, in two payments of €325.",
    paymentDomain: "50% to start and 50% on publication. Your domain stays in your name: registration and renewal are your responsibility. Every extra requires a quote and your approval.",
    testimonialsLabel: "TESTIMONIALS",
    testimonialsTitle: "What it’s like to work together.",
    collapseReview: "Show less",
    expandReview: "Read the full review",
    processLabel: "HOW IT WORKS",
    processTitle: ["From the first message", "to a live website."],
    processSteps: [
      ["Short call", "We talk about your business, audience and the goal of the website."],
      ["Content collection", "You send me copy, images and information. I help you identify what is missing."],
      ["Preview", "I prepare a concrete design direction for us to review before completing development."],
      ["Build and revisions", "I build the responsive website and apply the changes we agreed."],
      ["Publication", "I check everything, connect the domain and hosting, and put the website online."],
    ],
    portraitAlt: "Portrait of Geff",
    aboutLabel: "WHO’S BEHIND THE WORK",
    aboutTitle: ["I’m Geff.", "From the first message to launch, you work directly with me."],
    aboutBody: "I live in Modena and study Computer Science at Unimore. I personally handle every project: from the first conversation to the mobile version, from revisions to publication. You speak directly with the person designing and delivering your website.",
    aboutFacts: ["Modena, Italy", "Unimore · Computer Science", "Directly responsible for delivery"],
    faqLabel: "FREQUENTLY ASKED QUESTIONS",
    faqTitle: "Before we start.",
    contactLabel: "DIRECT CONTACT",
    contactTitle: ["Let’s talk about", "your website."],
    contactIntro: "Tell me what you do and what you need. Your message opens in WhatsApp, and I reply personally.",
    responseTime: "I usually reply within 12 hours.",
    directWhatsapp: "Message Geff on WhatsApp",
    formChoice: "OR · PREPARE A MORE DETAILED MESSAGE",
    formName: "01 · YOUR NAME",
    formNamePlaceholder: "What’s your name?",
    formBusiness: "02 · YOUR BUSINESS",
    formBusinessPlaceholder: "What does your business do?",
    formProject: "03 · THE PROJECT",
    formProjectPlaceholder: "Briefly tell me what you need",
    formContinue: "Continue on WhatsApp",
    formPrepare: "Prepare the message",
    formNote: "Complete all three fields. The message will open in WhatsApp, and you decide whether to send it.",
    formGreeting: "Hi Geff, I’m",
    potentialClient: "a potential client",
    businessPrefix: "My business:",
    formFallback: "I’d like to talk to you about a website.",
    backToTop: "Back to top",
    closeProject: "Close project",
    close: "Close ×",
    realProject: "Real project",
    visitLiveSite: "Visit the live website",
    projectPreview: "Project preview",
  },
} as const;

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function Signal({ direction = "up-right" }: { direction?: "up-right" | "right" | "down" | "up" | "check" }) {
  return (
    <svg
      className={`motion-signal motion-signal--${direction}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={direction === "check" ? "m5 12 4 4L19 6" : "M7 17 17 7M7 7h10v10"} />
    </svg>
  );
}

function FeedbackProjectVisual({
  slug,
  title,
  url,
  locale,
  mobileActive = false,
  onMobileToggle,
  activationLabel = "Tocca per esplorare",
}: {
  slug: string;
  title: string;
  url?: string;
  locale: PortfolioLocale;
  mobileActive?: boolean;
  onMobileToggle?: () => void;
  activationLabel?: string;
}) {
  const text = pageCopy[locale];

  return (
    <div
      className={`motion-feedback-site motion-feedback-site--${slug}${url ? " motion-feedback-site--live" : ""}${onMobileToggle ? " motion-preview-mobile-activatable" : ""}${mobileActive ? " is-mobile-active" : ""}`}
      aria-hidden={url ? undefined : true}
    >
      <div className="motion-feedback-browser-bar"><i /><i /><i /><span>{slug === "serena" ? "serenaprevidi.com" : "alpha-fitness-mo.netlify.app"}</span><Signal /></div>
      <Image
        className="motion-project-screenshot"
        src={slug === "serena" ? "/showcases/serena-previdi.png" : "/showcases/alpha-elite.png"}
        alt={`${text.projectPreview}: ${title}`}
        width={1440}
        height={900}
        loading="lazy"
        unoptimized
        sizes="(max-width: 760px) 100vw, 45vw"
      />
      {url && onMobileToggle && (
        <button
          className="motion-preview-activate"
          type="button"
          aria-pressed={mobileActive}
          onClick={onMobileToggle}
        >
          <span>{mobileActive ? text.continuePage : activationLabel}</span> <Signal direction={mobileActive ? "down" : "up-right"} />
        </button>
      )}
      {url && mobileActive && (
        <iframe
          className="motion-feedback-live-frame"
          src={url}
          title={`${locale === "en" ? "Website preview" : "Anteprima del sito"} ${title}`}
          loading="lazy"
          tabIndex={0}
        />
      )}
    </div>
  );
}

export default function MotionPortfolio({
  palettePreview = false,
  feedbackPreview = false,
  reviewMode = false,
  locale = "it",
}: {
  palettePreview?: boolean;
  feedbackPreview?: boolean;
  reviewMode?: boolean;
  locale?: PortfolioLocale;
}) {
  const text = pageCopy[locale];
  const projectItems = locale === "en" ? englishProjects : projects;
  const showcaseItems = locale === "en" ? englishShowcases : showcases;
  const rootRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [palette, setPalette] = useState(paletteOptions[0].id);
  const [contactReady, setContactReady] = useState(false);
  const [showAllShowcases, setShowAllShowcases] = useState(false);
  const [expandedTestimonialName, setExpandedTestimonialName] = useState<string | null>(null);
  const [activeMobilePreviewKey, setActiveMobilePreviewKey] = useState<string | null>(null);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const directWhatsAppUrl = whatsappUrl(
    reviewMode
      ? text.directWhatsappMessage
      : text.formFallback,
  );
  const activePalette = paletteOptions.find((option) => option.id === palette) ?? paletteOptions[0];
  const selectedProject = projectItems.find((project) => project.slug === selectedProjectSlug);
  const testimonialItems: Testimonial[] = locale === "en"
    ? englishTestimonials
    : reviewMode
      ? testimonials.map((testimonial) => testimonial.name === "Christian"
      ? {
          ...testimonial,
          name: "Christopher Paparella",
          role: "Proprietario · Alpha Elite Fitness Club · precedentemente Evolution Fit Marzaglia",
        }
        : testimonial)
      : testimonials;
  const faqItems = locale === "en"
    ? englishFaq
    : reviewMode
      ? faq.map((item) => item.question === "Quanto tempo serve?"
      ? {
          ...item,
          answer:
            "Con tutti i contenuti necessari già disponibili e la direzione grafica concordata, la consegna standard è indicativamente di 48–78 ore. Il conteggio parte da quel momento. Tempi di feedback, nuove richieste o cambi di direzione possono spostare la consegna; confermiamo comunque la data prima di iniziare.",
        }
        : item)
      : faq;

  useEffect(() => {
    document.body.style.overflow = menuOpen || selectedProjectSlug ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, selectedProjectSlug]);

  useEffect(() => {
    if (!selectedProjectSlug) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProjectSlug(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedProjectSlug]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      burgerRef.current?.focus();
    };
    window.addEventListener("keydown", closeMenuOnEscape);
    return () => window.removeEventListener("keydown", closeMenuOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
    );

    root.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const moveMagnet = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
    event.currentTarget.style.setProperty("--magnet-x", `${x}px`);
    event.currentTarget.style.setProperty("--magnet-y", `${y}px`);
  };

  const resetMagnet = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--magnet-x", "0px");
    event.currentTarget.style.setProperty("--magnet-y", "0px");
  };

  const preserveSectionOnLanguageChange = (
    event: MouseEvent<HTMLAnchorElement>,
    targetLocale: PortfolioLocale,
  ) => {
    if (!window.location.hash) return;
    event.preventDefault();
    window.location.assign(`/${targetLocale}${window.location.hash}`);
  };

  const openWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nome = String(form.get("nome") || "").trim();
    const attivita = String(form.get("attivita") || "").trim();
    const messaggio = String(form.get("messaggio") || "").trim();
    const text = [
      `${pageCopy[locale].formGreeting} ${nome || pageCopy[locale].potentialClient}.`,
      attivita ? `${pageCopy[locale].businessPrefix} ${attivita}.` : "",
      messaggio || pageCopy[locale].formFallback,
    ].filter(Boolean).join("\n");

    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  };

  const updateContactReadiness = (event: FormEvent<HTMLFormElement>) => {
    const form = new FormData(event.currentTarget);
    setContactReady(
      ["nome", "attivita", "messaggio"].every((field) => String(form.get(field) || "").trim()),
    );
  };

  return (
    <div
      className={`motion-shell motion-shell--palette${feedbackPreview ? " motion-shell--feedback" : ""}${reviewMode ? " motion-shell--review" : ""}`}
      data-palette={palettePreview ? palette : "cobalt"}
    >
      <div className="motion-progress" aria-hidden="true" />
      <div className="motion-grain" aria-hidden="true" />
      <a className="motion-skip-link" href="#main-content">{text.skipToContent}</a>

      {palettePreview && (
        <aside className="motion-palette-switcher" aria-label="Confronta le palette del sito">
          <div className="motion-palette-current">
            <small>Palette lab</small>
            <strong>{activePalette.name}</strong>
          </div>
          <div className="motion-palette-options" role="group" aria-label="Scegli una palette">
            {paletteOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                data-palette-choice={option.id}
                aria-label={`${option.number} · ${option.name}`}
                aria-pressed={palette === option.id}
                onClick={() => setPalette(option.id)}
              >
                <i aria-hidden="true" />
                <span>{option.number}</span>
              </button>
            ))}
          </div>
          <Link href={`/${locale}`}>{locale === "en" ? "Live website" : "Sito live"} <Signal /></Link>
        </aside>
      )}

      <header className="motion-header">
        <a className="motion-mark" href="#inizio"><b>Geff</b><small>Web Designer</small></a>
        <nav className="motion-primary-nav" aria-label={text.navigationLabel}>
          {text.nav.filter(([href]) => ["#lavori", "#chi-sono", "#testimonianze", "#offerta"].includes(href)).map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="motion-language-switch" aria-label={text.languageLabel}>
          <Link
            href="/it"
            hrefLang="it"
            lang="it"
            aria-current={locale === "it" ? "page" : undefined}
            onClick={(event) => preserveSectionOnLanguageChange(event, "it")}
          >
            IT
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/en"
            hrefLang="en"
            lang="en"
            aria-current={locale === "en" ? "page" : undefined}
            onClick={(event) => preserveSectionOnLanguageChange(event, "en")}
          >
            EN
          </Link>
        </div>
        <a className="motion-header-contact" href="#contatti">{text.letsTalk} <Signal /></a>
        <button
          ref={burgerRef}
          className={`motion-burger${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? text.closeMenu : text.openMenu}
          aria-controls="motion-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i /><i /><i />
        </button>
      </header>

      {menuOpen && (
        <nav id="motion-menu" className="motion-menu" aria-label={text.mobileNavigationLabel}>
          {text.nav.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a
            className="motion-menu-whatsapp"
            href={directWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            {text.whatsappMenu} <Signal />
          </a>
        </nav>
      )}

      <main id="main-content" className="motion-site" ref={rootRef} tabIndex={-1} inert={menuOpen ? true : undefined}>
        <section className="motion-hero" id="inizio" aria-labelledby="motion-title">
          <div className="motion-stage">
            <div className="motion-hero-topline">
              <p className="motion-hero-kicker">WEB DESIGN & DEVELOPMENT</p>
              <span>MODENA, {locale === "en" ? "ITALY" : "ITALIA"}</span>
            </div>
            <div className="motion-title-block">
              <h1 id="motion-title">
                <span>{text.heroLines[0]}</span>
                <em>{text.heroLines[1]}</em>
              </h1>
              <div className="motion-hero-copy">
                <p className="motion-hero-intro">{text.heroIntro}</p>
                <div className="motion-hero-actions">
                  <a href="#lavori">{text.heroWorkCta} <Signal direction="down" /></a>
                  <a className="is-secondary" href="#contatti">{text.heroContactCta} <Signal /></a>
                </div>
              </div>
            </div>
            <a className="motion-hero-person" href="#chi-sono">
              <Image src="/geff-portrait.webp" alt={text.portraitAlt} width={1124} height={1399} priority unoptimized sizes="240px" />
              <span><strong>{locale === "en" ? "Hi, I’m Geff." : "Ciao, sono Geff."}</strong><Signal /></span>
              <small>{locale === "en" ? "The person behind your website." : "La persona dietro al tuo sito."}</small>
            </a>
            <div className="motion-hero-facts" aria-label={text.heroFactsLabel}>
              <span>{locale === "en" ? "DESIGN WITH PURPOSE" : "DESIGN CON UNO SCOPO"}</span>
              <span>{locale === "en" ? "BUILT WITH CARE" : "SVILUPPO CURATO"}</span>
              <span>{locale === "en" ? "ONE PERSON, START TO FINISH" : "UNA PERSONA, DALL’INIZIO ALLA FINE"}</span>
              <a href="#lavori">{locale === "en" ? "SELECTED WORK" : "LAVORI SELEZIONATI"} <Signal direction="down" /></a>
            </div>
          </div>
        </section>

        <section className="motion-work" id="lavori" aria-labelledby="motion-work-title">
          <div className="motion-work-heading" data-reveal>
            <p className="motion-label">{feedbackPreview ? text.workLabel : "PROGETTI REALI · 2026"}</p>
            <h2 id="motion-work-title">
              {feedbackPreview ? (
                <><span>{text.workTitle[0]}</span><span>{text.workTitle[1]}</span></>
              ) : (
                <><span>Due problemi.</span><span>Due soluzioni concrete.</span></>
              )}
            </h2>
            <span>{feedbackPreview ? text.workNote : "Due identità distinte"}</span>
          </div>
          {feedbackPreview ? (
            <div className="motion-feedback-work-grid">
                {projectItems.map((project) => (
                  <article
                    className="motion-feedback-project"
                    id={`progetto-${project.slug}`}
                    key={project.slug}
                    data-reveal
                  >
                    <span className="motion-feedback-project-meta"><i>{project.number}</i><i>{project.type}</i></span>
                    <FeedbackProjectVisual
                      slug={project.slug}
                      title={project.title}
                      url={project.url}
                      locale={locale}
                      mobileActive={activeMobilePreviewKey === `project-${project.slug}`}
                      onMobileToggle={() => setActiveMobilePreviewKey((active) => active === `project-${project.slug}` ? null : `project-${project.slug}`)}
                      activationLabel={reviewMode ? text.activatePreview : "Tocca per esplorare"}
                    />
                    <span className="motion-feedback-project-caption">
                      <span><strong>{project.title}</strong><small>{project.headline}</small></span>
                      {project.url ? (
                        <a
                          className="motion-feedback-project-action"
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {text.liveSite} <Signal />
                        </a>
                      ) : (
                        <button
                          className="motion-feedback-project-action"
                          type="button"
                          onClick={() => setSelectedProjectSlug(project.slug)}
                        >
                          ESPLORA IL PROGETTO <Signal direction="right" />
                        </button>
                      )}
                    </span>
                  </article>
                ))}
              </div>
          ) : (
            <div className="motion-work-list">
              {projectItems.map((project) => (
                <article
                  className="motion-work-row"
                  key={project.title}
                  data-reveal
                >
                  <span>{project.number}</span>
                  <div>
                    <h3>
                      {project.url ? (
                        <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Apri il sito di ${project.title}`}>
                          {project.title} <Signal />
                        </a>
                      ) : project.title}
                    </h3>
                    <small>{project.type}</small>
                  </div>
                </article>
              ))}
            </div>
          )}
          {feedbackPreview && reviewMode && (
            <a className="motion-feedback-price-reveal motion-review-price-reveal" href="#offerta" data-reveal>
              <span>{text.fullSites}</span>
              <strong>€650</strong>
              <i>{text.discoverIncluded} <Signal direction="down" /></i>
            </a>
          )}
          {feedbackPreview && (
            <a
              className="motion-feedback-price-reveal motion-work-whatsapp-cta"
              href={directWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              data-reveal
            >
              <span>{text.projectQuestion}</span>
              <strong>{text.letsTalk}</strong>
              <i>{text.whatsappMenu} <Signal /></i>
            </a>
          )}
        </section>

        <section className="motion-testimonials" id="testimonianze" aria-labelledby="motion-testimonials-title">
          <div className="motion-testimonials-heading" data-reveal>
            <p className="motion-label">{text.testimonialsLabel}</p>
            <h2 id="motion-testimonials-title">{text.testimonialsTitle}</h2>
          </div>
          <div className="motion-testimonial-grid">
            {testimonialItems.map((testimonial, index) => {
              const isExpanded = expandedTestimonialName === testimonial.name;
              return (
                <blockquote
                  className={`${testimonial.mobileCollapsible ? "has-mobile-toggle" : ""}${isExpanded ? " is-expanded" : ""}`}
                  key={testimonial.name}
                  data-reveal
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>“{testimonial.quote}”</p>
                  {testimonial.mobileCollapsible && (
                    <button
                      className="motion-testimonial-more"
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => setExpandedTestimonialName(isExpanded ? null : testimonial.name)}
                    >
                      {isExpanded ? text.collapseReview : text.expandReview} <Signal direction={isExpanded ? "up" : "down"} />
                    </button>
                  )}
                  {testimonial.translationNote && <em className="motion-testimonial-translation">{testimonial.translationNote}</em>}
                  <footer><strong>{testimonial.name}</strong><small>{testimonial.role}</small></footer>
                </blockquote>
              );
            })}
          </div>
        </section>

        <section className="motion-showcase" id="showcase" aria-labelledby="motion-showcase-title">
          <div className="motion-showcase-heading" data-reveal>
            <p className="motion-label">{text.showcaseLabel}</p>
            <h2 id="motion-showcase-title"><span>{text.showcaseTitle[0]}</span><span>{text.showcaseTitle[1]}</span></h2>
            <p>{text.showcaseIntro}</p>
          </div>
          <div className="motion-showcase-grid" id="motion-showcase-grid">
            {showcaseItems.map((showcase) => (
              <article
                className={`motion-showcase-card${showcase.mobileFeature ? ` motion-showcase-card--mobile-${showcase.mobileFeature}` : ""}${showAllShowcases ? " is-mobile-visible" : ""}`}
                key={showcase.title}
                data-reveal
              >
                <div className={`motion-showcase-image motion-preview-mobile-activatable${activeMobilePreviewKey === `showcase-${showcase.title}` ? " is-mobile-active" : ""}`}>
                  <Image
                    src={showcase.image}
                    alt=""
                    aria-hidden="true"
                    width={1425}
                    height={891}
                    loading="lazy"
                    unoptimized
                    sizes="(max-width: 760px) calc(100vw - 44px), 60vw"
                  />
                  <div className="motion-feedback-browser-bar" aria-hidden="true">
                    <i /><i /><i /><span>{showcase.url.replace("https://", "").replace(/\/$/, "")}</span>
                  </div>
                  <button
                    className="motion-preview-activate"
                    type="button"
                    aria-pressed={activeMobilePreviewKey === `showcase-${showcase.title}`}
                    onClick={() => setActiveMobilePreviewKey((active) => active === `showcase-${showcase.title}` ? null : `showcase-${showcase.title}`)}
                  >
                    <span>
                      {activeMobilePreviewKey === `showcase-${showcase.title}`
                        ? text.continuePage
                        : reviewMode ? text.activatePreview : "Tocca per esplorare"}
                    </span>
                    <Signal direction={activeMobilePreviewKey === `showcase-${showcase.title}` ? "down" : "up-right"} />
                  </button>
                  {activeMobilePreviewKey === `showcase-${showcase.title}` && (
                    <iframe
                      className="motion-showcase-frame"
                      src={showcase.url}
                      title={`${text.interactiveDemo} ${showcase.title}`}
                      loading="lazy"
                      tabIndex={0}
                    />
                  )}
                  <span className="motion-showcase-scroll-hint" aria-hidden="true">{text.scrollToExplore}</span>
                  <span className="motion-showcase-badge">{showcase.label}</span>
                </div>
                <span className="motion-showcase-meta"><i>{showcase.number}</i><i>{showcase.type}</i></span>
                <div className="motion-showcase-copy">
                  <span><strong>{showcase.title}</strong><small>{showcase.description}</small></span>
                  <a className="motion-showcase-open" href={showcase.url} target="_blank" rel="noreferrer" aria-label={`${text.openDemoLabel} ${showcase.title}`}>{text.openDemo} <Signal /></a>
                </div>
              </article>
            ))}
            <button
              className="motion-showcase-more"
              type="button"
              aria-controls="motion-showcase-grid"
              aria-expanded={showAllShowcases}
              onClick={() => setShowAllShowcases((visible) => !visible)}
            >
              {showAllShowcases ? text.showLessDemos : text.showMoreDemos} <Signal direction={showAllShowcases ? "up" : "down"} />
            </button>
          </div>
          {feedbackPreview && !reviewMode && (
            <a className="motion-feedback-price-reveal" href="#offerta" data-reveal>
              <span>SITI COMPLETI COME QUESTI</span>
              <strong>€650</strong>
              <i>Scopri cosa include <Signal direction="down" /></i>
            </a>
          )}
        </section>

        <section className="motion-offer" id="offerta" aria-labelledby="motion-offer-title">
          <div className="motion-offer-main" data-reveal>
            <p className="motion-label">{text.offerLabel}</p>
            <h2 id="motion-offer-title">{text.offerTitle[0]}<br /><em>{text.offerTitle[1]}</em></h2>
            <div className="motion-offer-promise">
              <strong>€650</strong>
              <div>
                <p>{text.offerIntro}</p>
                <div className="motion-offer-price-facts" aria-label={text.priceConditions}>
                  <span>{text.priceFacts[0]}</span>
                  <span>{text.priceFacts[1]}</span>
                  {reviewMode && <span>{text.priceFacts[2]}</span>}
                </div>
                <small>
                  {text.offerClarification}
                </small>
              </div>
            </div>
          </div>
          <aside className="motion-offer-scope" data-reveal>
            <div>
              <h3>{text.includedTitle}</h3>
              <ul className="motion-offer-inclusions">
                {text.inclusions.map(([title, description]) => (
                  <li key={title}><Signal direction="check" /><strong>{title}</strong><span>{description}</span></li>
                ))}
              </ul>
            </div>
            {feedbackPreview ? (
              <div className="motion-feedback-offer-boundaries">
                <section className="motion-feedback-offer-list">
                  <h3>{text.extrasTitle}</h3>
                  <ul>
                    {text.extras.map((extra) => <li key={extra}>{extra}</li>)}
                  </ul>
                </section>
                <div className="motion-feedback-fixed-price">
                  <span>{text.fixedPrice}</span>
                  <div>
                    <strong>{text.fixedPriceLine}</strong>
                    {reviewMode && <p>{text.paymentDomain}</p>}
                  </div>
                </div>
              </div>
            ) : (
              <div className="motion-offer-boundaries">
                <div className="motion-offer-boundary">
                  <div>
                    <span className="motion-offer-term-label">Dentro i €650</span>
                    <strong>Modifiche al sito concordato</strong>
                  </div>
                  <ul className="motion-offer-term-tags">
                    <li>Correzioni testi</li>
                    <li>Cambio immagini</li>
                    <li>Dettagli grafici</li>
                  </ul>
                </div>
                <div className="motion-offer-boundary">
                  <div>
                    <span className="motion-offer-term-label">A parte, solo se richiesto</span>
                    <strong>Nuove aggiunte al progetto</strong>
                  </div>
                  <ul className="motion-offer-term-tags">
                    <li>Nuove pagine</li>
                    <li>Logo o restyling</li>
                    <li>E-commerce o prenotazioni</li>
                  </ul>
                </div>
                <div className="motion-offer-price-note">
                  <span>Prezzo fisso</span>
                  <div>
                    <strong>€650. Nessun abbonamento obbligatorio.</strong>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </section>

        <section className="motion-method" id="processo" aria-labelledby="motion-method-title">
          <div className="motion-method-sticky" data-reveal>
            <p className="motion-label">{text.processLabel}</p>
            <h2 id="motion-method-title">{text.processTitle[0]}<br /><em>{text.processTitle[1]}</em></h2>
            <div className="motion-method-line" aria-hidden="true"><i /></div>
          </div>
          <ol className="motion-method-list">
            {text.processSteps.map(([title, description], index) => (
              <li key={title} data-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
                <Signal />
              </li>
            ))}
          </ol>
        </section>

        <section className="motion-about" id="chi-sono">
          <div className="motion-about-art" data-reveal aria-hidden={reviewMode ? undefined : true}>
            {reviewMode ? (
              <Image
                className="motion-about-photo"
                src="/geff-portrait.webp"
                alt={text.portraitAlt}
                fill
                unoptimized
                sizes="(max-width: 760px) 100vw, 48vw"
              />
            ) : (
              <div className="motion-about-photo-placeholder">
                <span>FOTO</span>
                <small>Ritratto di Geff · foto da inserire</small>
              </div>
            )}
          </div>
          <div className="motion-about-copy" data-reveal>
            <p className="motion-label">{text.aboutLabel}</p>
            <h2>{text.aboutTitle[0]}<br /><em>{locale === "en" ? "Let’s make it personal." : "Piacere di conoscerti."}</em></h2>
            <strong className="motion-about-intro">{text.aboutTitle[1]}</strong>
            <p>{text.aboutBody}</p>
            <div>{text.aboutFacts.map((fact) => <span key={fact}>{fact}</span>)}</div>
          </div>
        </section>

        <section className="motion-faq" id="faq" aria-labelledby="motion-faq-title">
          <div className="motion-faq-heading" data-reveal>
            <p className="motion-label">{text.faqLabel}</p>
            <h2 id="motion-faq-title">{text.faqTitle}</h2>
          </div>
          <div className="motion-faq-list">
            {faqItems.map((item, index) => (
              <details key={item.question} data-reveal>
                <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.question}</strong><i aria-hidden="true">+</i></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="motion-contact" id="contatti" aria-labelledby="motion-contact-title">
          <div className="motion-contact-copy" data-reveal>
            <p className="motion-label">{text.contactLabel}</p>
            <h2 id="motion-contact-title">{text.contactTitle[0]}<br />{text.contactTitle[1]}</h2>
            <p>{text.contactIntro}</p>
            {reviewMode && <p className="motion-contact-response-time">{text.responseTime}</p>}
            <a
              className="motion-whatsapp-direct magnetic"
              href={directWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              onPointerMove={moveMagnet}
              onPointerLeave={resetMagnet}
            >
              {reviewMode ? text.directWhatsapp : "Apri WhatsApp"} <Signal />
            </a>
            <small className="motion-contact-number">WhatsApp: {WHATSAPP_DISPLAY}</small>
          </div>

          <form className="motion-form" onSubmit={openWhatsApp} onInput={updateContactReadiness} data-reveal>
            {reviewMode && <p className="motion-form-choice">{text.formChoice}</p>}
            <label><span>{text.formName}</span><input name="nome" type="text" placeholder={text.formNamePlaceholder} autoComplete="name" required /></label>
            <label><span>{text.formBusiness}</span><input name="attivita" type="text" placeholder={text.formBusinessPlaceholder} autoComplete="organization" required /></label>
            <label><span>{text.formProject}</span><textarea name="messaggio" rows={3} placeholder={text.formProjectPlaceholder} required /></label>
            <button className="magnetic" type="submit" onPointerMove={moveMagnet} onPointerLeave={resetMagnet}>
              {contactReady ? text.formContinue : text.formPrepare} <Signal />
            </button>
            <small>{text.formNote}</small>
          </form>
        </section>

        <footer className="motion-footer">
          <a className="motion-footer-mark" href="#inizio" aria-label="Geff">Geff<span>.</span></a>
          <div><span>© 2026 Geff · Web design & development</span><span>Modena, {locale === "en" ? "Italy" : "Italia"}</span><a href="#inizio">{text.backToTop} <Signal direction="up" /></a></div>
        </footer>
      </main>

      {feedbackPreview && selectedProject && (
        <div
          className="motion-feedback-modal-backdrop"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelectedProjectSlug(null);
          }}
        >
          <section
            className="motion-feedback-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="motion-feedback-modal-title"
          >
            <button className="motion-feedback-modal-close" type="button" onClick={() => setSelectedProjectSlug(null)} aria-label={text.closeProject}>{text.close}</button>
            <div className="motion-feedback-modal-visual">
              <FeedbackProjectVisual
                slug={selectedProject.slug}
                title={selectedProject.title}
                url={selectedProject.url}
                locale={locale}
                mobileActive={activeMobilePreviewKey === `modal-${selectedProject.slug}`}
                onMobileToggle={() => setActiveMobilePreviewKey((active) => active === `modal-${selectedProject.slug}` ? null : `modal-${selectedProject.slug}`)}
                activationLabel={reviewMode ? text.activatePreview : "Tocca per esplorare"}
              />
            </div>
            <div className="motion-feedback-modal-copy">
              <p>{selectedProject.type} · {text.realProject}</p>
              <h2 id="motion-feedback-modal-title">{selectedProject.title}</h2>
              <strong>{selectedProject.headline}</strong>
              {selectedProject.url ? (
                <a href={selectedProject.url} target="_blank" rel="noreferrer">{text.visitLiveSite} <Signal /></a>
              ) : (
                <span>{text.projectPreview}</span>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
