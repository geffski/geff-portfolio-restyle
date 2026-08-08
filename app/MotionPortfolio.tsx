"use client";

import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "000000000000";

const projects = [
  {
    number: "01",
    slug: "serena",
    title: "Serena Previdi",
    type: "Studio di psicologia",
    className: "motion-preview-psych",
    screenClass: "motion-case-psych",
    copy: "Uno spazio digitale calmo, chiaro e umano.",
    before:
      "Serviva presentare competenze, percorsi e studio senza rendere la navigazione fredda o dispersiva.",
    built:
      "Un sito professionale responsive con servizi, profilo, immagini dello studio e contatti diretti.",
    decision:
      "Tipografia editoriale, palette morbida e molto spazio bianco per sostenere leggibilità e fiducia.",
    delivery:
      "Struttura dei contenuti, direzione visiva, sviluppo desktop e mobile, controllo finale.",
    scope: ["Design", "Sviluppo", "Mobile", "Pubblicazione"],
  },
  {
    number: "02",
    slug: "alpha-elite",
    title: "Alpha Elite Fitness Club",
    type: "Palestra",
    className: "motion-preview-gym",
    screenClass: "motion-case-gym",
    copy: "Un’identità più forte, dentro e fuori dalla palestra.",
    before:
      "Orari, tariffe, spazi e servizi avevano bisogno di una gerarchia unica, rapida da consultare anche da telefono.",
    built:
      "Una pagina completa con aree di allenamento, personal training, tariffe, orari, mappa e contatti.",
    decision:
      "Contrasto deciso, ritmo tipografico e fotografie grandi per comunicare energia senza sacrificare le informazioni.",
    delivery:
      "Raccolta dei materiali, anteprima, sviluppo responsive, revisioni e preparazione alla pubblicazione.",
    scope: ["Restyling", "UX", "Sviluppo", "Mappa"],
  },
  {
    number: "03",
    slug: "cargef",
    title: "Cargef",
    type: "Progetto B2B di famiglia",
    className: "motion-preview-cargef",
    screenClass: "motion-case-cargef",
    copy: "Prodotti autentici, presentati con ordine.",
    before:
      "Un assortimento ampio richiedeva una presentazione più ordinata per interlocutori e clienti professionali.",
    built:
      "Una direzione digitale B2B con categorie leggibili, racconto aziendale e percorso chiaro verso la richiesta.",
    decision:
      "Categorie visive e gerarchie nette per rendere il catalogo comprensibile prima ancora di entrare nel dettaglio.",
    delivery:
      "Confronto diretto con lo stakeholder di famiglia, organizzazione dei contenuti e prototipo responsive.",
    scope: ["B2B", "Struttura", "Design", "Prototipo"],
  },
];

const testimonials = [
  {
    quote:
      "Geff ha trasformato informazioni complesse in un sito chiaro, delicato e semplice da usare anche da telefono.",
    name: "Serena Previdi",
    role: "Studio di psicologia · bozza da approvare",
  },
  {
    quote:
      "Ha ascoltato quello che volevamo comunicare e lo ha tradotto in una presenza online molto più forte e ordinata.",
    name: "Alpha Elite Fitness Club",
    role: "Palestra · bozza da approvare",
  },
  {
    quote:
      "Il nuovo impianto rende l’offerta più leggibile e ci dà una base concreta per presentare il progetto ai clienti.",
    name: "Stakeholder Cargef",
    role: "Progetto B2B di famiglia · bozza da approvare",
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
      "Sì. Posso collegare un dominio esistente oppure aiutarti a scegliere e registrare quello giusto. Il costo del dominio resta separato dal progetto.",
  },
  {
    question: "Chi gestisce l’hosting?",
    answer:
      "Ti consiglio una soluzione adatta al sito e mi occupo della configurazione tecnica. Gli eventuali costi del servizio di hosting non sono inclusi nel prezzo di partenza.",
  },
  {
    question: "Posso chiedere modifiche?",
    answer:
      "Sì. Le revisioni concordate vengono definite nel preventivo; prima della pubblicazione controlliamo insieme testi, immagini e versione mobile.",
  },
  {
    question: "Il sito sarà mio?",
    answer:
      "Sì. Dopo il saldo finale ricevi il sito e gli elementi concordati nel preventivo, senza vincoli nascosti.",
  },
  {
    question: "Chi prepara testi e immagini?",
    answer:
      "Partiamo dai materiali che hai già. Ti aiuto a organizzarli e a capire cosa manca; copywriting, shooting o identità visiva completa vengono quotati separatamente quando servono.",
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

function WorkCue() {
  return <span className="motion-work-cue" aria-hidden="true"><i /><b>APRI</b></span>;
}

export default function MotionPortfolio() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const directWhatsAppUrl = whatsappUrl("Ciao Geff, vorrei parlarti di un sito web.");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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

  const moveHero = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--hero-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--hero-y", y.toFixed(3));
  };

  const resetHero = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--hero-x", "0");
    event.currentTarget.style.setProperty("--hero-y", "0");
  };

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

  const moveProject = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--preview-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--preview-y", `${event.clientY - rect.top}px`);
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

  return (
    <>
      <div className="motion-progress" aria-hidden="true" />
      <div className="motion-grain" aria-hidden="true" />

      {menuOpen && (
        <nav className="motion-menu" aria-label="Navigazione principale mobile">
          <a href="#lavori" onClick={() => setMenuOpen(false)}>Lavori</a>
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
          <div className="motion-stage" onPointerMove={moveHero} onPointerLeave={resetHero}>
            <div className="motion-title-block">
              <p className="motion-hero-kicker">PER PICCOLE ATTIVITÀ · MODENA E DINTORNI</p>
              <h1 id="motion-title">
                <span><i>Siti web</i></span>
                <span><i>professionali,</i></span>
                <span><i>senza</i></span>
                <span><i>complicazioni.</i></span>
              </h1>
              <p className="motion-hero-intro">
                Mi occupo personalmente di design, versione mobile, pubblicazione e modifiche.
                Progetti a partire da €300.
              </p>
              <div className="motion-hero-actions">
                <a href={directWhatsAppUrl} target="_blank" rel="noreferrer">
                  Parliamo del tuo sito su WhatsApp
                </a>
              </div>
              <small className="motion-placeholder-note">Numero WhatsApp temporaneo · da sostituire</small>
            </div>
            <img
              className="motion-object"
              src="/geff-dark-fold-accordion.png"
              alt="Portfolio editoriale aperto a fisarmonica con pannelli grafici neri e blu"
              width="1600"
              height="1050"
            />
            <div className="motion-orbit" aria-hidden="true"><i /><span>MOVE</span></div>
          </div>

          <div className="motion-marquee" aria-hidden="true"><div>Siti web — Versione mobile — Pubblicazione — Siti web — Versione mobile — Pubblicazione —</div></div>
        </section>

        <section className="motion-work" id="lavori" aria-labelledby="motion-work-title">
          <div className="motion-work-heading" data-reveal>
            <p className="motion-label">PROGETTI REALI · 2026</p>
            <h2 id="motion-work-title">Tre problemi.<br />Tre soluzioni concrete.</h2>
            <span>Apri ogni progetto</span>
          </div>
          <div className="motion-work-list">
            {projects.map((project) => (
              <a
                className="motion-work-row"
                href={`#caso-${project.slug}`}
                key={project.title}
                onPointerMove={moveProject}
                data-reveal
              >
                <span>{project.number}</span>
                <h3>{project.title}</h3>
                <p>{project.type}</p>
                <WorkCue />
                <div className={`motion-work-preview ${project.className}`} aria-hidden="true">
                  <small>{project.type}</small>
                  <strong>{project.copy}</strong>
                  <i /><b /><em />
                </div>
              </a>
            ))}
          </div>

          <div className="motion-case-studies">
            {projects.map((project) => (
              <article className="motion-case" id={`caso-${project.slug}`} key={project.slug}>
                <header data-reveal>
                  <p className="motion-label">CASO {project.number} · {project.type}</p>
                  <h3>{project.title}</h3>
                </header>
                <div className="motion-case-layout">
                  <figure className={`motion-case-screen ${project.screenClass}`} data-reveal>
                    <div className="motion-browser-bar" aria-hidden="true"><i /><i /><i /><span>{project.slug}.it</span></div>
                    <div className="motion-phone" aria-hidden="true">
                      <small>{project.type}</small>
                      <strong>{project.copy}</strong>
                      <div><i /><b /><em /></div>
                      <span>SCOPRI IL PROGETTO</span>
                    </div>
                    <figcaption>Anteprima mobile del progetto</figcaption>
                  </figure>
                  <div className="motion-case-copy" data-reveal>
                    <dl>
                      <div><dt>Situazione iniziale</dt><dd>{project.before}</dd></div>
                      <div><dt>Cosa ho realizzato</dt><dd>{project.built}</dd></div>
                      <div><dt>Decisione importante</dt><dd>{project.decision}</dd></div>
                      <div><dt>Consegna</dt><dd>{project.delivery}</dd></div>
                    </dl>
                    <div className="motion-scope" aria-label="Ambito del progetto">
                      {project.scope.map((item) => <span key={item}>{item}</span>)}
                    </div>
                    <a className="motion-case-link" href="#contatti">Vorrei un progetto così <Signal /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="motion-offer" id="offerta" aria-labelledby="motion-offer-title">
          <div className="motion-offer-lead" data-reveal>
            <p className="motion-label">L’OFFERTA</p>
            <h2 id="motion-offer-title">Il necessario per andare online bene.</h2>
            <div className="motion-price"><span>A partire da</span><strong>€300</strong></div>
          </div>
          <div className="motion-offer-details" data-reveal>
            <h3>Nel progetto base</h3>
            <ul>
              <li><span>01</span>Struttura e direzione visiva del sito</li>
              <li><span>02</span>Design desktop e versione mobile</li>
              <li><span>03</span>Sviluppo, controlli e pubblicazione</li>
              <li><span>04</span>Modifiche concordate prima del lancio</li>
              <li><span>05</span>Consegna del sito e supporto iniziale</li>
            </ul>
            <div className="motion-exclusions">
              <h3>Da quotare a parte</h3>
              <p>Dominio e hosting, e-commerce o funzioni avanzate, shooting fotografico, copywriting completo e identità visiva.</p>
            </div>
            <p className="motion-payment"><strong>Pagamento:</strong> 50% all’avvio, 50% alla pubblicazione.</p>
          </div>
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
            <h2 id="motion-testimonials-title">Le parole giuste,<br />dopo l’approvazione.</h2>
            <p className="motion-draft-warning">Bozze provvisorie da inviare ai clienti: non sono ancora testimonianze approvate.</p>
          </div>
          <div className="motion-testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <blockquote key={testimonial.name} data-reveal>
                <span>BOZZA {String(index + 1).padStart(2, "0")}</span>
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
              <i aria-hidden="true">WA</i> Apri WhatsApp <Signal />
            </a>
            <small className="motion-contact-placeholder">Numero temporaneo: {WHATSAPP_NUMBER}</small>
          </div>

          <form className="motion-form" onSubmit={openWhatsApp} data-reveal>
            <label><span>01 · IL TUO NOME</span><input name="nome" type="text" placeholder="Come ti chiami?" autoComplete="name" required /></label>
            <label><span>02 · LA TUA ATTIVITÀ</span><input name="attivita" type="text" placeholder="Di cosa ti occupi?" /></label>
            <label><span>03 · IL PROGETTO</span><textarea name="messaggio" rows={3} placeholder="Raccontami brevemente cosa ti serve" required /></label>
            <button className="magnetic" type="submit" onPointerMove={moveMagnet} onPointerLeave={resetMagnet}>
              Prepara il messaggio <Signal />
            </button>
            <small>Nessun invio automatico: controlli il messaggio prima di spedirlo.</small>
          </form>
        </section>

        <footer className="motion-footer">
          <span>© 2026 Geff</span><span>Modena · CET</span><a href="#inizio">Torna su ↑</a>
        </footer>
      </main>
    </>
  );
}
