"use client";

import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

const projects = [
  {
    number: "01",
    title: "Serena Previdi",
    type: "Studio di psicologia",
    className: "motion-preview-psych",
    copy: "Uno spazio digitale calmo, chiaro e umano.",
  },
  {
    number: "02",
    title: "Alpha Elite Fitness Club",
    type: "Palestra",
    className: "motion-preview-gym",
    copy: "Un’identità più forte, dentro e fuori dalla palestra.",
  },
  {
    number: "03",
    title: "Cargef",
    type: "Distribuzione B2B · Prodotti etnici",
    className: "motion-preview-cargef",
    copy: "Prodotti autentici, presentati con ordine.",
  },
];

function Signal() {
  return <span className="motion-signal" aria-hidden="true"><i /></span>;
}

function WorkCue() {
  return <span className="motion-work-cue" aria-hidden="true"><i /><b>VIEW</b></span>;
}

export default function MotionPortfolio() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

    // Add Geff's real international-format phone number after approval.
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="motion-progress" aria-hidden="true" />
      <div className="motion-grain" aria-hidden="true" />

      {menuOpen && (
        <nav className="motion-menu" aria-label="Navigazione principale mobile">
          <a href="#lavori" onClick={() => setMenuOpen(false)}>Lavori</a>
          <a href="#metodo" onClick={() => setMenuOpen(false)}>Metodo</a>
          <a href="#chi-sono" onClick={() => setMenuOpen(false)}>Chi sono</a>
          <a href="#contatti" onClick={() => setMenuOpen(false)}>Contatti</a>
        </nav>
      )}

      <header className="motion-header">
        <a className="motion-mark" href="#inizio"><b>Geff</b><small>Web Designer</small></a>
        <nav aria-label="Navigazione principale">
          <a href="#lavori">Lavori</a>
          <a href="#metodo">Metodo</a>
          <a href="#chi-sono">Chi sono</a>
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
            <p className="motion-hero-kicker">WEB DESIGN + SVILUPPO · INFORMATICA @ UNIMORE</p>
            <h1 id="motion-title">
              <span><i>Siti web che</i></span>
              <span><i>raccontano</i></span>
              <span><i>bene il tuo</i></span>
              <span><i>lavoro.</i></span>
            </h1>
            <p className="motion-hero-intro">
              Sono Geff, studio Informatica all’Unimore e progetto siti chiari, veloci e
              riconoscibili per attività e professionisti.
            </p>
            <div className="motion-hero-actions">
              <a href="#lavori">Guarda i lavori</a>
              <a href="#contatti">Parliamo del tuo sito</a>
            </div>
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

        <div className="motion-marquee" aria-hidden="true"><div>Siti web — Restyling — Identità visiva — Siti web — Restyling — Identità visiva —</div></div>
      </section>

      <section className="motion-intro" id="intro">
        <p className="motion-label" data-reveal>QUELLO CHE FACCIO</p>
        <div className="motion-intro-grid">
          <h2 data-reveal>Il tuo sito deve parlare chiaro.</h2>
          <div data-reveal>
            <p>
              Progetto siti chiari, veloci e riconoscibili che aiutano attività e professionisti a
              raccontare meglio ciò che fanno e a presentarsi con più sicurezza.
            </p>
            <a className="motion-pill magnetic" href="#chi-sono" onPointerMove={moveMagnet} onPointerLeave={resetMagnet}>
              Chi sono <Signal />
            </a>
          </div>
        </div>
      </section>

      <section className="motion-work" id="lavori" aria-labelledby="motion-work-title">
        <div className="motion-work-heading" data-reveal>
          <p className="motion-label">LAVORI SELEZIONATI · 2026</p>
          <h2 id="motion-work-title">Quello che ho realizzato.</h2>
          <span>Passa il mouse sui progetti</span>
        </div>
        <div className="motion-work-list">
          {projects.map((project) => (
            <article className="motion-work-row" key={project.title} onPointerMove={moveProject} data-reveal>
              <span>{project.number}</span>
              <h3>{project.title}</h3>
              <p>{project.type}</p>
              <WorkCue />
              <div className={`motion-work-preview ${project.className}`} aria-hidden="true">
                <small>{project.type}</small>
                <strong>{project.copy}</strong>
                <i /><b /><em />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="motion-method" id="metodo" aria-labelledby="motion-method-title">
        <div className="motion-method-sticky" data-reveal>
          <p className="motion-label">COME LAVORO</p>
          <h2 id="motion-method-title">Prima capiamo.<br /><em>Poi costruiamo.</em></h2>
          <div className="motion-method-line" aria-hidden="true"><i /></div>
        </div>
        <ol className="motion-method-list">
          <li data-reveal><span>01</span><div><h3>Mettiamo a fuoco</h3><p>Prima di parlare di colori, capisco cosa fai, a chi ti rivolgi e cosa deve ottenere il sito.</p></div><Signal /></li>
          <li data-reveal><span>02</span><div><h3>Diamo una direzione</h3><p>Definisco struttura, contenuti e stile visivo in un’anteprima concreta da vedere e discutere insieme.</p></div><Signal /></li>
          <li data-reveal><span>03</span><div><h3>Lo costruisco</h3><p>Trasformo il progetto in un sito veloce, responsive e curato in ogni dettaglio.</p></div><Signal /></li>
          <li data-reveal><span>04</span><div><h3>Andiamo online</h3><p>Pubblico il sito, controllo che tutto funzioni e rimango disponibile quando serve.</p></div><Signal /></li>
        </ol>
      </section>

      <section className="motion-about" id="chi-sono">
        <div className="motion-about-art" data-reveal aria-hidden="true">
          <span>G</span><i /><b>MODENA<br />UNIMORE</b>
        </div>
        <div className="motion-about-copy" data-reveal>
          <p className="motion-label">DIETRO IL PORTFOLIO</p>
          <h2>Sono Geff.<br />Tra informatica e design.</h2>
          <p>
            Vivo a Modena e studio Informatica all’Unimore. Nel web ho trovato il punto d’incontro
            tra ciò che mi interessa di più: risolvere problemi, curare i dettagli e dare forma a
            idee concrete.
          </p>
          <div><span>Modena, Italia</span><span>Unimore · Informatica</span><span>Disponibile per nuovi progetti</span></div>
        </div>
      </section>

      <section className="motion-contact" id="contatti" aria-labelledby="motion-contact-title">
        <div className="motion-contact-copy" data-reveal>
          <p className="motion-label">PARLIAMONE</p>
          <h2 id="motion-contact-title">Hai un progetto<br />in mente?</h2>
          <p>Raccontami in poche righe cosa vuoi realizzare. Ti risponderò personalmente via email.</p>
        </div>

        <form className="motion-form" onSubmit={openWhatsApp} data-reveal>
          <label><span>01 · IL TUO NOME</span><input name="nome" type="text" placeholder="Come ti chiami?" autoComplete="name" /></label>
          <label><span>02 · LA TUA ATTIVITÀ</span><input name="attivita" type="text" placeholder="Di cosa ti occupi?" /></label>
          <label><span>03 · IL PROGETTO</span><textarea name="messaggio" rows={3} placeholder="Raccontami brevemente cosa ti serve" /></label>
          <button className="magnetic" type="submit" onPointerMove={moveMagnet} onPointerLeave={resetMagnet}>
            Invia la richiesta <Signal />
          </button>
          <small>Ti rispondo personalmente appena possibile.</small>
        </form>
      </section>

      <footer className="motion-footer">
        <span>© 2026 Geff</span><span>Modena · CET</span><a href="#inizio">Torna su ↑</a>
      </footer>
      </main>
    </>
  );
}
