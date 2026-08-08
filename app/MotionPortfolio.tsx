"use client";

import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "000000000000";

const projects = [
  {
    number: "01",
    title: "Serena Previdi",
    type: "Studio di psicologia",
    copy: "Uno spazio digitale calmo, chiaro e umano.",
  },
  {
    number: "02",
    title: "Alpha Elite Fitness Club",
    type: "Palestra",
    copy: "Un’identità più forte, dentro e fuori dalla palestra.",
  },
  {
    number: "03",
    title: "Cargef",
    type: "Progetto B2B di famiglia",
    copy: "Prodotti autentici, presentati con ordine.",
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
      "Ti consiglio una soluzione adatta al sito e mi occupo della configurazione tecnica. Gli eventuali costi del servizio di hosting non sono inclusi nel pacchetto da €300.",
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
                Il sito essenziale completo costa €300.
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
            <span>Tre identità distinte</span>
          </div>
          <div className="motion-work-list">
            {projects.map((project) => (
              <article
                className="motion-work-row"
                key={project.title}
                data-reveal
              >
                <span>{project.number}</span>
                <div>
                  <h3>{project.title}</h3>
                  <small>{project.type}</small>
                </div>
                <p>{project.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="motion-offer" id="offerta" aria-labelledby="motion-offer-title">
          <div className="motion-offer-lead" data-reveal>
            <p className="motion-label">SITO ESSENZIALE</p>
            <h2 id="motion-offer-title">€300. Un prezzo chiaro, per un sito completo.</h2>
            <p className="motion-offer-intro">Non è un prezzo-esca: se il progetto resta nel perimetro qui indicato, il totale resta €300.</p>
            <div className="motion-price"><span>Pacchetto essenziale</span><strong>€300</strong><small>Prezzo completo</small></div>
          </div>
          <div className="motion-offer-details" data-reveal>
            <h3>Cosa comprende</h3>
            <ul>
              <li><span>01</span>Una pagina su misura con le sezioni essenziali</li>
              <li><span>02</span>Design personalizzato per desktop e mobile</li>
              <li><span>03</span>Inserimento dei testi e delle immagini che mi fornisci</li>
              <li><span>04</span>Contatti diretti, WhatsApp, telefono o mappa</li>
              <li><span>05</span>Sviluppo, controlli e pubblicazione</li>
              <li><span>06</span>Modifiche concordate prima del lancio</li>
            </ul>
            <div className="motion-exclusions">
              <h3>Il prezzo sale solo se aggiungiamo</h3>
              <div className="motion-extra-grid">
                <span>Più pagine o lingue</span>
                <span>Booking o e-commerce</span>
                <span>Logo e identità visiva</span>
                <span>Testi o foto da produrre</span>
                <span>Funzioni su misura</span>
                <span>Gestione continuativa</span>
              </div>
              <p>Ogni extra viene definito e approvato prima di iniziare. Dominio e hosting sono costi esterni separati, sempre comunicati in anticipo.</p>
            </div>
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
            <h2 id="motion-testimonials-title">Com’è lavorare<br />insieme.</h2>
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
