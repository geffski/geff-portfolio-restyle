"use client";

import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const WHATSAPP_NUMBER = "393341394895";
const WHATSAPP_DISPLAY = "+39 334 139 4895";

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
  {
    number: "03",
    slug: "cargef",
    title: "Cargef",
    type: "Progetto B2B di famiglia",
    eyebrow: "Ghana · Distribuzione · Italia",
    headline: "Prodotti autentici, presentati con ordine.",
  },
];

const showcases = [
  {
    number: "D01",
    title: "Alma Nutre",
    type: "Magazine alimentare",
    label: "Demo",
    description: "Un sistema editoriale ampio, naturale e leggibile, costruito per contenuti, ricette e risorse.",
    image: "/showcases/alma-nutre.webp",
    url: "https://geff-demo-alma-nutre-20260809.geff.workers.dev/",
  },
  {
    number: "D02",
    title: "Etera Studio",
    type: "Beauty & wellness",
    label: "Concept",
    description: "Un’esperienza luminosa e tattile per raccontare rituali, atmosfera e cura dei dettagli.",
    image: "/showcases/etera-studio.webp",
    url: "https://geff-demo-etera-studio-20260809.geff.workers.dev/",
  },
  {
    number: "D03",
    title: "Fidalgo Bistro",
    type: "Bistro & ristorante",
    label: "Demo",
    description: "Un’esperienza immersiva e materica che racconta cucina, atmosfera e ospitalità con un taglio editoriale.",
    image: "/showcases/velaria-wedding.webp",
    url: "https://geff-demo-fidalgo-bistro-20260810.geff.workers.dev/",
  },
  {
    number: "D04",
    title: "Casa Lieve",
    type: "Event studio",
    label: "Demo",
    description: "Un’identità espressiva e contemporanea per eventi privati, feste e celebrazioni su misura.",
    image: "/showcases/casa-lieve-events.webp",
    url: "https://geff-demo-casa-lieve-20260809.geff.workers.dev/",
  },
  {
    number: "D05",
    title: "Sottoportico",
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
      "Geff ha trasformato informazioni complesse in un sito chiaro, delicato e semplice da usare anche da telefono.",
    name: "Serena Previdi",
    role: "Studio di psicologia",
  },
  {
    quote:
      "Ha ascoltato quello che volevamo comunicare e lo ha tradotto in una presenza online molto più forte e ordinata.",
    name: "Alpha Elite Fitness Club",
    role: "Palestra",
  },
  {
    quote:
      "Il nuovo impianto rende l’offerta più leggibile e ci dà una base concreta per presentare il progetto ai clienti.",
    name: "Stakeholder Cargef",
    role: "Progetto B2B di famiglia",
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
      "Sì. Posso collegare un dominio esistente oppure aiutarti a scegliere e registrare quello giusto. Il dominio resta intestato a te e ne paghi direttamente il rinnovo annuale.",
  },
  {
    question: "Chi gestisce l’hosting?",
    answer:
      "L’hosting è incluso e lo gestisco io. Non hai costi di hosting e non devi occuparti della configurazione o della gestione tecnica del servizio.",
  },
  {
    question: "Posso chiedere modifiche?",
    answer:
      "Sì. Correzioni a testi, immagini e piccoli dettagli fanno parte del lavoro. Nuove pagine o sezioni, un restyling completo o nuove funzioni vengono invece quotati a parte.",
  },
  {
    question: "Il sito sarà mio?",
    answer:
      "Sì. Dopo il saldo finale ricevi il sito e gli elementi concordati nel preventivo, senza vincoli nascosti.",
  },
  {
    question: "Chi prepara testi e immagini?",
    answer:
      "Possiamo partire dai materiali che hai già oppure scrivere e organizzare da zero i testi necessari. Le immagini vengono fornite da te; inserisco anche il tuo logo esistente. La creazione del logo viene quotata separatamente.",
  },
  {
    question: "Come funziona il pagamento?",
    answer:
      "Il pagamento standard è diviso in due parti: 50% all’avvio del progetto e 50% alla pubblicazione del sito.",
  },
];

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function Signal() {
  return <span className="motion-signal" aria-hidden="true"><i /></span>;
}

function FeedbackProjectVisual({ slug, title, url }: { slug: string; title: string; url?: string }) {
  return (
    <div
      className={`motion-feedback-site motion-feedback-site--${slug}${url ? " motion-feedback-site--live" : ""}`}
      aria-hidden={url ? undefined : true}
    >
      <div className="motion-feedback-browser-bar"><i /><i /><i /><span>{slug === "serena" ? "serenaprevidi.com" : slug === "alpha" ? "alpha-fitness-mo.netlify.app" : "Cargef"}</span></div>
      {url && (
        <iframe
          className="motion-feedback-live-frame"
          src={url}
          title={`Anteprima del sito ${title}`}
          loading="lazy"
          tabIndex={-1}
        />
      )}
      {!url && slug === "cargef" && (
        <div className="motion-feedback-cargef">
          <small>SELEZIONE PROFESSIONALE</small>
          <strong>Prodotti autentici,<br />presentati con ordine.</strong>
          <span /><b /><i />
        </div>
      )}
    </div>
  );
}

export default function MotionPortfolio({
  palettePreview = false,
  feedbackPreview = false,
}: {
  palettePreview?: boolean;
  feedbackPreview?: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [palette, setPalette] = useState(paletteOptions[0].id);
  const [contactStarted, setContactStarted] = useState(false);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const directWhatsAppUrl = whatsappUrl("Ciao Geff, vorrei parlarti di un sito web.");
  const activePalette = paletteOptions.find((option) => option.id === palette) ?? paletteOptions[0];
  const selectedProject = projects.find((project) => project.slug === selectedProjectSlug);

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

  const openWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nome = String(form.get("nome") || "").trim();
    const attivita = String(form.get("attivita") || "").trim();
    const messaggio = String(form.get("messaggio") || "").trim();
    const text = [
      `Ciao Geff, sono ${nome || "un potenziale cliente"}.`,
      attivita ? `La mia attività: ${attivita}.` : "",
      messaggio || "Vorrei parlarti di un sito web.",
    ].filter(Boolean).join("\n");

    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  };

  const updateContactStarted = (event: FormEvent<HTMLFormElement>) => {
    const form = new FormData(event.currentTarget);
    setContactStarted(
      ["nome", "attivita", "messaggio"].some((field) => String(form.get(field) || "").trim()),
    );
  };

  return (
    <div
      className={`motion-shell motion-shell--palette${feedbackPreview ? " motion-shell--feedback" : ""}`}
      data-palette={palettePreview ? palette : "cobalt"}
    >
      <div className="motion-progress" aria-hidden="true" />
      <div className="motion-grain" aria-hidden="true" />

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
          <Link href="/">Sito live ↗</Link>
        </aside>
      )}

      {menuOpen && (
        <nav className="motion-menu" aria-label="Navigazione principale mobile">
          <a href="#lavori" onClick={() => setMenuOpen(false)}>Lavori</a>
          <a href="#showcase" onClick={() => setMenuOpen(false)}>Demo</a>
          <a href="#offerta" onClick={() => setMenuOpen(false)}>Offerta</a>
          <a href="#processo" onClick={() => setMenuOpen(false)}>Come funziona</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="#contatti" onClick={() => setMenuOpen(false)}>Contatti</a>
        </nav>
      )}

      <header className="motion-header">
        <a className="motion-mark" href="#inizio"><b>Geff</b><small>Web Designer</small></a>
        <nav aria-label="Navigazione principale">
          <a href="#lavori">Lavori</a>
          <a href="#showcase">Demo</a>
          <a href="#offerta">Offerta</a>
          <a href="#processo">Come funziona</a>
          <a href="#faq">FAQ</a>
          <a href="#contatti">Contatti</a>
        </nav>
        <button
          className={`motion-burger${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i /><i /><i />
        </button>
      </header>

      <main className="motion-site" ref={rootRef}>
        <section className="motion-hero" id="inizio" aria-labelledby="motion-title">
          <div className="motion-stage">
            <div className="motion-hero-ghost" aria-hidden="true">WEB</div>
            <div className="motion-title-block">
              <p className="motion-hero-kicker">SITI WEB PER PICCOLE ATTIVITÀ · MODENA</p>
              <h1 id="motion-title">
                <span><i>Fatti capire.</i></span>
                <span><i>Fatti trovare.</i></span>
                <span><i><em>Fatti scegliere.</em></i></span>
              </h1>
              <div className="motion-hero-copy">
                <p className="motion-hero-intro">
                  Un sito chiaro, veloce e curato, con tutto quello che serve per presentarti
                  e farti contattare.
                </p>
                <div className="motion-hero-actions">
                  {feedbackPreview ? (
                    <>
                      <a href="#lavori">Guarda i siti realizzati ↓</a>
                      <a className="is-secondary" href="#contatti">Parliamo del tuo sito</a>
                    </>
                  ) : (
                    <a href="#contatti">Parliamo del tuo sito</a>
                  )}
                </div>
              </div>
            </div>
            {feedbackPreview && (
              <div className="motion-feedback-hero-showcase" aria-label="Anteprime dei progetti realizzati">
                {projects.map((project) => (
                  <div
                    className={`motion-feedback-window motion-feedback-window--${project.slug}`}
                    key={project.slug}
                  >
                    <FeedbackProjectVisual slug={project.slug} title={project.title} url={project.url} />
                    <a
                      className="motion-feedback-window-hit"
                      href={project.url ?? `#progetto-${project.slug}`}
                      target={project.url ? "_blank" : undefined}
                      rel={project.url ? "noreferrer" : undefined}
                      aria-label={project.url ? `Visita il sito di ${project.title}` : `Vai al progetto ${project.title}`}
                    >
                      <span aria-hidden="true">{project.url ? "APRI ↗" : "VEDI →"}</span>
                    </a>
                  </div>
                ))}
                <a className="motion-feedback-showcase-label" href="#lavori">PROGETTI REALI · TOCCA PER ESPLORARE ↓</a>
              </div>
            )}
            {!feedbackPreview && (
              <a className="motion-price-badge" href="#offerta" aria-label="Scopri cosa include il sito completo a 300 euro">
                <div><strong>€300</strong><span>Scopri cosa include ↓</span></div>
              </a>
            )}
            <div className="motion-hero-facts" aria-label="Caratteristiche principali">
              <span>{feedbackPreview ? "Tre progetti reali" : "Desktop · Tablet · Mobile"}</span>
              <span>{feedbackPreview ? "Apri · Guarda · Esplora" : "Hosting gestito"}</span>
              <span>{feedbackPreview ? "Design diversi per attività diverse" : "Design · Testi · Pubblicazione"}</span>
            </div>
          </div>
        </section>

        <section className="motion-work" id="lavori" aria-labelledby="motion-work-title">
          <div className="motion-work-heading" data-reveal>
            <p className="motion-label">{feedbackPreview ? "PROGETTI REALI · CLICCA PER ESPLORARE" : "PROGETTI REALI · 2026"}</p>
            <h2 id="motion-work-title">
              {feedbackPreview ? (
                <><span>Tre attività.</span><span>Tre siti da esplorare.</span></>
              ) : (
                <><span>Tre problemi.</span><span>Tre soluzioni concrete.</span></>
              )}
            </h2>
            <span>{feedbackPreview ? "Ogni progetto si può aprire" : "Tre identità distinte"}</span>
          </div>
          {feedbackPreview ? (
            <div className="motion-feedback-work-grid">
                {projects.map((project) => (
                  <article
                    className="motion-feedback-project"
                    id={`progetto-${project.slug}`}
                    key={project.slug}
                    data-reveal
                  >
                    <span className="motion-feedback-project-meta"><i>{project.number}</i><i>{project.type}</i></span>
                    <FeedbackProjectVisual slug={project.slug} title={project.title} url={project.url} />
                    <span className="motion-feedback-project-caption">
                      <span><strong>{project.title}</strong><small>{project.eyebrow}</small></span>
                      {project.url ? (
                        <a
                          className="motion-feedback-project-action"
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          SITO ONLINE · VISITA ↗
                        </a>
                      ) : (
                        <button
                          className="motion-feedback-project-action"
                          type="button"
                          onClick={() => setSelectedProjectSlug(project.slug)}
                        >
                          ESPLORA IL PROGETTO →
                        </button>
                      )}
                    </span>
                  </article>
                ))}
              </div>
          ) : (
            <div className="motion-work-list">
              {projects.map((project) => (
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
                          {project.title}<sup aria-hidden="true">↗</sup>
                        </a>
                      ) : project.title}
                    </h3>
                    <small>{project.type}</small>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="motion-showcase" id="showcase" aria-labelledby="motion-showcase-title">
          <div className="motion-showcase-heading" data-reveal>
            <p className="motion-label">SHOWCASE / CONCEPT · IDENTITÀ FITTIZIE</p>
            <h2 id="motion-showcase-title"><span>Siti demo</span><span>da esplorare.</span></h2>
            <p>Direzioni di design create per il portfolio. Ogni sito è una dimostrazione esplorabile e non rappresenta un’attività operativa.</p>
          </div>
          <div className="motion-showcase-grid">
            {showcases.map((showcase) => (
              <article className="motion-showcase-card" key={showcase.title} data-reveal>
                <a href={showcase.url} target="_blank" rel="noreferrer" aria-label={`Apri la demo ${showcase.title}`}>
                  <span className="motion-showcase-image">
                    <Image
                      src={showcase.image}
                      alt={`Anteprima della demo ${showcase.title}`}
                      width={1425}
                      height={891}
                      loading="lazy"
                      unoptimized
                      sizes="(max-width: 760px) calc(100vw - 44px), 60vw"
                    />
                    <span className="motion-showcase-badge">{showcase.label}</span>
                  </span>
                  <span className="motion-showcase-meta"><i>{showcase.number}</i><i>{showcase.type}</i></span>
                  <span className="motion-showcase-copy">
                    <span><strong>{showcase.title}</strong><small>{showcase.description}</small></span>
                    <b>Apri la demo ↗</b>
                  </span>
                </a>
              </article>
            ))}
          </div>
          {feedbackPreview && (
            <a className="motion-feedback-price-reveal" href="#offerta" data-reveal>
              <span>SITI COMPLETI COME QUESTI</span>
              <strong>€300</strong>
              <i>Scopri cosa include ↓</i>
            </a>
          )}
        </section>

        <section className="motion-offer" id="offerta" aria-labelledby="motion-offer-title">
          <div className="motion-offer-main" data-reveal>
            <p className="motion-label">UN SITO COMPLETO, FATTO BENE</p>
            <h2 id="motion-offer-title">Semplice nella struttura.<br /><em>Completo in tutto il resto.</em></h2>
            <div className="motion-offer-promise">
              <strong>€300</strong>
              <div>
                <p>€300 è il prezzo fisso per il sito concordato: struttura, design, testi, funzioni essenziali e pubblicazione.</p>
                <div className="motion-offer-price-facts" aria-label="Condizioni del prezzo">
                  <span>Pagamento unico</span>
                  <span>Nessun abbonamento</span>
                </div>
                <small>Prima di iniziare decidiamo insieme quali pagine e sezioni servono alla tua attività. Il prezzo comprende tutte le voci qui accanto.</small>
              </div>
            </div>
          </div>
          <aside className="motion-offer-scope" data-reveal>
            <div>
              <h3>Cosa ricevi con €300</h3>
              <ul className="motion-offer-inclusions">
                <li><strong>Pagine e sezioni definite insieme</strong><span>Costruiamo la struttura più adatta a presentare la tua attività.</span></li>
                <li><strong>Design su ogni dispositivo</strong><span>Il sito si adatta a desktop, tablet e smartphone.</span></li>
                <li><strong>Testi e contenuti</strong><span>Scrivo o adatto i testi e organizzo immagini, materiali e il tuo logo esistente.</span></li>
                <li><strong>Contatti e funzioni essenziali</strong><span>Form di contatto, pulsanti, link e Google Maps incorporata, quando servono.</span></li>
                <li><strong>Pubblicazione e hosting</strong><span>Controllo il sito, lo porto online e gestisco l’hosting.</span></li>
                {feedbackPreview && (
                  <li><strong>Modifiche</strong><span>Correzioni ai testi, sostituzione di immagini e contenuti e rifinitura dei dettagli grafici.</span></li>
                )}
              </ul>
            </div>
            {feedbackPreview ? (
              <div className="motion-feedback-offer-boundaries">
                <section className="motion-feedback-offer-list">
                  <h3>Extra</h3>
                  <ul>
                    <li>Nuove pagine o sezioni</li>
                    <li>Creazione del logo o restyling completo</li>
                    <li>E-commerce, prenotazioni o funzioni personalizzate</li>
                  </ul>
                </section>
                <div className="motion-feedback-fixed-price">
                  <span>Prezzo fisso</span>
                  <div>
                    <strong>€300. Nessun abbonamento.</strong>
                    <p>L’unico costo ricorrente è il rinnovo annuale del dominio, pagato direttamente da te. Hosting e gestione tecnica sono inclusi.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="motion-offer-boundaries">
                <div className="motion-offer-boundary">
                  <div>
                    <span className="motion-offer-term-label">Dentro i €300</span>
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
                    <strong>€300 una volta. Nessun costo mensile.</strong>
                    <p>L’unico costo ricorrente è il rinnovo annuale del dominio, pagato direttamente da te. Hosting e gestione tecnica sono inclusi.</p>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </section>

        <section className="motion-method" id="processo" aria-labelledby="motion-method-title">
          <div className="motion-method-sticky" data-reveal>
            <p className="motion-label">COME FUNZIONA</p>
            <h2 id="motion-method-title">Dal primo messaggio<br /><em>al sito online.</em></h2>
            <div className="motion-method-line" aria-hidden="true"><i /></div>
          </div>
          <ol className="motion-method-list">
            <li data-reveal><span>01</span><div><h3>Call breve</h3><p>Parliamo della tua attività, del pubblico e dell’obiettivo del sito.</p></div><Signal /></li>
            <li data-reveal><span>02</span><div><h3>Raccolta contenuti</h3><p>Mi invii testi, immagini e informazioni. Ti aiuto a capire cosa manca.</p></div><Signal /></li>
            <li data-reveal><span>03</span><div><h3>Anteprima</h3><p>Preparo una direzione concreta da vedere e discutere prima dello sviluppo completo.</p></div><Signal /></li>
            <li data-reveal><span>04</span><div><h3>Build e revisioni</h3><p>Costruisco il sito responsive e applichiamo le modifiche concordate.</p></div><Signal /></li>
            <li data-reveal><span>05</span><div><h3>Pubblicazione</h3><p>Controllo tutto, collego dominio e hosting e porto il progetto online.</p></div><Signal /></li>
          </ol>
        </section>

        <section className="motion-testimonials" id="testimonianze" aria-labelledby="motion-testimonials-title">
          <div className="motion-testimonials-heading" data-reveal>
            <p className="motion-label">TESTIMONIANZE</p>
            <h2 id="motion-testimonials-title">Com’è lavorare insieme.</h2>
          </div>
          <div className="motion-testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <blockquote key={testimonial.name} data-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>“{testimonial.quote}”</p>
                <footer><strong>{testimonial.name}</strong><small>{testimonial.role}</small></footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="motion-about" id="chi-sono">
          <div className="motion-about-art" data-reveal aria-hidden="true">
            <span>G</span><i /><b>MODENA<br />UNIMORE</b>
          </div>
          <div className="motion-about-copy" data-reveal>
            <p className="motion-label">CHI C’È DIETRO</p>
            <h2>Sono Geff.<br />Informatica e design, senza passaggi di mano.</h2>
            <p>
              Vivo a Modena e studio Informatica all’Unimore. Seguo personalmente ogni progetto:
              dalla prima conversazione alla versione mobile, dalle modifiche alla pubblicazione.
              Parli direttamente con chi progetta e consegna il tuo sito.
            </p>
            <div><span>Modena, Italia</span><span>Unimore · Informatica</span><span>Responsabile diretto della consegna</span></div>
          </div>
        </section>

        <section className="motion-faq" id="faq" aria-labelledby="motion-faq-title">
          <div className="motion-faq-heading" data-reveal>
            <p className="motion-label">DOMANDE FREQUENTI</p>
            <h2 id="motion-faq-title">Prima di iniziare.</h2>
          </div>
          <div className="motion-faq-list">
            {faq.map((item, index) => (
              <details key={item.question} data-reveal>
                <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.question}</strong><i aria-hidden="true">+</i></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="motion-contact" id="contatti" aria-labelledby="motion-contact-title">
          <div className="motion-contact-copy" data-reveal>
            <p className="motion-label">CONTATTO DIRETTO</p>
            <h2 id="motion-contact-title">Parliamo del<br />tuo sito.</h2>
            <p>Raccontami cosa fai e cosa ti serve. Il messaggio si apre su WhatsApp e ti rispondo personalmente.</p>
            <a
              className="motion-whatsapp-direct magnetic"
              href={directWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              onPointerMove={moveMagnet}
              onPointerLeave={resetMagnet}
            >
              Apri WhatsApp <Signal />
            </a>
            <small className="motion-contact-placeholder">WhatsApp: {WHATSAPP_DISPLAY}</small>
          </div>

          <form className="motion-form" onSubmit={openWhatsApp} onInput={updateContactStarted} data-reveal>
            <label><span>01 · IL TUO NOME</span><input name="nome" type="text" placeholder="Come ti chiami?" autoComplete="name" required /></label>
            <label><span>02 · LA TUA ATTIVITÀ</span><input name="attivita" type="text" placeholder="Di cosa ti occupi?" required /></label>
            <label><span>03 · IL PROGETTO</span><textarea name="messaggio" rows={3} placeholder="Raccontami brevemente cosa ti serve" required /></label>
            <button className="magnetic" type="submit" onPointerMove={moveMagnet} onPointerLeave={resetMagnet}>
              {contactStarted ? "Continua su WhatsApp" : "Prepara il messaggio"} <Signal />
            </button>
            <small>Completa i tre campi. Il messaggio si apre su WhatsApp: sarai tu a inviarlo.</small>
          </form>
        </section>

        <footer className="motion-footer">
          <span>© 2026 Geff</span><span>Modena · CET</span><a href="#inizio">Torna su ↑</a>
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
            <button className="motion-feedback-modal-close" type="button" onClick={() => setSelectedProjectSlug(null)} aria-label="Chiudi il progetto">Chiudi ×</button>
            <div className="motion-feedback-modal-visual"><FeedbackProjectVisual slug={selectedProject.slug} title={selectedProject.title} url={selectedProject.url} /></div>
            <div className="motion-feedback-modal-copy">
              <p>{selectedProject.type} · Progetto reale</p>
              <h2 id="motion-feedback-modal-title">{selectedProject.title}</h2>
              <strong>{selectedProject.headline}</strong>
              {selectedProject.url ? (
                <a href={selectedProject.url} target="_blank" rel="noreferrer">Visita il sito live ↗</a>
              ) : (
                <span>Anteprima del progetto</span>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
