"use client";

import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";

const WHATSAPP_NUMBER = "000000000000";

const paletteOptions = [
  { id: "cobalt", number: "P1", name: "Cobalto + Osso" },
  { id: "forest", number: "P2", name: "Foresta + Lino" },
  { id: "bordeaux", number: "P3", name: "Bordeaux + Sabbia" },
  { id: "plum", number: "P4", name: "Prugna + Nebbia" },
];

const projects = [
  {
    number: "01",
    title: "Serena Previdi",
    type: "Studio di psicologia",
    copy: "Uno spazio digitale calmo, chiaro e umano.",
    url: "https://serenaprevidi.com",
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
      "Possiamo partire dai materiali che hai già oppure scrivere e organizzare da zero i testi necessari. Inserisco anche immagini e il tuo logo esistente; shooting fotografico e creazione del logo vengono quotati separatamente.",
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

export default function MotionPortfolio({ palettePreview = false }: { palettePreview?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [palette, setPalette] = useState(paletteOptions[0].id);
  const directWhatsAppUrl = whatsappUrl("Ciao Geff, vorrei parlarti di un sito web.");
  const activePalette = paletteOptions.find((option) => option.id === palette) ?? paletteOptions[0];

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
    <div
      className={`motion-shell${palettePreview ? " motion-shell--palette" : ""}`}
      data-palette={palettePreview ? palette : undefined}
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
          <div className="motion-stage">
            <div className="motion-hero-ghost" aria-hidden="true">WEB</div>
            <div className="motion-title-block">
              <p className="motion-hero-kicker">SITI WEB PER PICCOLE ATTIVITÀ · MODENA</p>
              <h1 id="motion-title">
                <span><i>Fatti trovare.</i></span>
                <span><i>Fatti capire.</i></span>
                <span><i><em>Fatti scegliere.</em></i></span>
              </h1>
              <div className="motion-hero-copy">
                <p className="motion-hero-intro">
                  Un sito chiaro, veloce e curato, con tutto quello che serve per presentarti
                  e farti contattare.
                </p>
                <div className="motion-hero-actions">
                  <a href="#contatti">Parliamo del tuo sito</a>
                </div>
              </div>
            </div>
            <div className="motion-price-badge" aria-label="Sito completo a 300 euro">
              <div><strong>€300</strong><span>Sito completo</span></div>
            </div>
            <div className="motion-hero-facts" aria-label="Caratteristiche principali">
              <span>Desktop · Tablet · Mobile</span>
              <span>Hosting gestito</span>
              <span>Design · Testi · Pubblicazione</span>
            </div>
          </div>
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
                  <h3>
                    {project.url ? (
                      <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Apri il sito di ${project.title}`}>
                        {project.title}<sup aria-hidden="true">↗</sup>
                      </a>
                    ) : project.title}
                  </h3>
                  <small>{project.type}</small>
                </div>
                <p>{project.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="motion-offer" id="offerta" aria-labelledby="motion-offer-title">
          <div className="motion-offer-main" data-reveal>
            <p className="motion-label">UN SITO COMPLETO, FATTO BENE</p>
            <h2 id="motion-offer-title">Semplice nella struttura.<br /><em>Completo in tutto il resto.</em></h2>
            <div className="motion-offer-promise">
              <strong>€300</strong>
              <div>
                <p>Realizzo il sito concordato, in una lingua, con tutto ciò che normalmente serve per presentare bene la tua attività.</p>
                <small>Definiamo insieme pagine, sezioni e funzioni prima di iniziare. Finché il progetto resta in quel perimetro, il prezzo resta €300.</small>
              </div>
            </div>
          </div>
          <aside className="motion-offer-scope" data-reveal>
            <div>
              <h3>Cosa significa “sito completo”</h3>
              <ul>
                <li><strong>Design su ogni dispositivo</strong><span>Il sito si adatta a desktop, tablet e smartphone.</span></li>
                <li><strong>Testi e contenuti</strong><span>Scrivo o adatto i testi e organizzo immagini, materiali e il tuo logo esistente.</span></li>
                <li><strong>Funzioni essenziali</strong><span>Form di contatto, pulsanti, link e Google Maps incorporata, quando servono.</span></li>
                <li><strong>Sviluppo e pubblicazione</strong><span>Costruisco, controllo e porto online il sito concordato.</span></li>
              </ul>
              <div className="motion-offer-revisions">
                <strong>Le piccole modifiche sono comprese.</strong>
                <p>Correggere un testo, cambiare un’immagine o rifinire un dettaglio fa parte del lavoro: non diventa automaticamente un costo extra.</p>
              </div>
            </div>
            <div className="motion-offer-extras">
              <strong>Si quota a parte quando cambia il progetto.</strong>
              <p>Nuove pagine o sezioni richieste dopo l’accordo, restyling completo, e-commerce, sito multilingua, sistema di prenotazione, creazione del logo o funzioni personalizzate.</p>
              <small>Il dominio viene registrato e pagato da te una volta all’anno. L’hosting è incluso e lo gestisco io: non devi pagarlo né occupartene.</small>
            </div>
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
    </div>
  );
}
