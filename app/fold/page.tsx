import Link from "next/link";

const work = [
  { number: "01", title: "Studio di psicologia", type: "Sito professionale", className: "fold-work-psych" },
  { number: "02", title: "Palestra locale", type: "Restyling digitale", className: "fold-work-gym" },
  { number: "03", title: "Cargef", type: "Catalogo B2B", className: "fold-work-cargef" },
];

function ConceptSwitcher() {
  return (
    <aside className="concept-switcher concept-switcher-dark" aria-label="Cambia concept">
      <span>CONCEPT</span>
      <Link href="/stack">02</Link>
      <Link className="is-active" href="/fold" aria-current="page">03</Link>
    </aside>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function FoldPage() {
  return (
    <main className="fold-site">
      <ConceptSwitcher />

      <section className="fold-hero" id="inizio" aria-labelledby="fold-title">
        <header className="fold-header">
          <a className="fold-mark" href="#inizio" aria-label="Torna all’inizio">© Portfolio di Geff</a>
          <nav aria-label="Navigazione principale">
            <a href="#inizio">Home</a><a href="#lavori">Lavori</a><a href="#chi-sono">Chi sono</a><a href="#contatti">Contatti</a>
          </nav>
          <span>Web designer<br />/ Modena</span>
        </header>

        <div className="fold-stage">
          <img
            className="fold-object"
            src="/geff-dark-fold-accordion.png"
            alt="Portfolio editoriale aperto a fisarmonica con pannelli grafici neri e blu"
            width="1600"
            height="1050"
          />
          <div className="fold-title-card">
            <h1 id="fold-title">Semplice<br />fuori.<br />Solido<br />dentro.</h1>
            <span>WEB / 01</span>
          </div>
          <div className="drag-cue" aria-hidden="true"><i /> <span>MOVE</span></div>
        </div>

        <div className="fold-marquee" aria-hidden="true"><div>Siti web — Restyling — Attività locali — Siti web — Restyling — Attività locali —</div></div>
      </section>

      <section className="fold-intro" id="chi-sono">
        <div className="fold-intro-main reveal">
          <p>
            Sono <strong>Geff</strong>, studente di Informatica a Modena. Creo siti web
            che fanno sembrare semplice quello che dietro è progettato con cura.
          </p>
        </div>
        <div className="fold-intro-side reveal">
          <p>Ogni progetto parte da una domanda: cosa deve capire e fare una persona appena arriva sul tuo sito?</p>
          <a href="#metodo">Il mio approccio <Arrow /></a>
        </div>
      </section>

      <section className="fold-work" id="lavori" aria-labelledby="fold-work-title">
        <div className="fold-section-label"><span>LAVORI</span><span>SELEZIONE · 2026</span></div>
        <h2 className="sr-only" id="fold-work-title">Lavori selezionati</h2>
        <div className="fold-work-list">
          {work.map((project) => (
            <article className="fold-work-row" key={project.title}>
              <span>{project.number}</span>
              <h3>{project.title}</h3>
              <p>{project.type}</p>
              <Arrow />
              <div className={`fold-work-preview ${project.className}`} aria-hidden="true">
                <i /><b /><em />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="fold-method" id="metodo" aria-labelledby="fold-method-title">
        <div className="fold-method-heading reveal">
          <p>COME LAVORO</p>
          <h2 id="fold-method-title">Pochi passaggi.<br />Tutti chiari.</h2>
        </div>
        <ol className="fold-method-list">
          <li className="reveal"><span>01</span><div><h3>Ascolto</h3><p>Capisco l’attività, il cliente e l’obiettivo prima di pensare alla grafica.</p></div></li>
          <li className="reveal"><span>02</span><div><h3>Progetto</h3><p>Creo un’anteprima concreta: struttura, contenuti e direzione visiva.</p></div></li>
          <li className="reveal"><span>03</span><div><h3>Realizzo</h3><p>Sviluppo il sito, lo ottimizzo per mobile e lo preparo alla pubblicazione.</p></div></li>
          <li className="reveal"><span>04</span><div><h3>Resto disponibile</h3><p>Se serve, continuo a seguire aggiornamenti, dominio e manutenzione.</p></div></li>
        </ol>
      </section>

      <section className="fold-about">
        <div className="fold-about-number reveal">20<span>anni</span></div>
        <div className="fold-about-copy reveal">
          <p className="fold-small-label">DIETRO IL PORTFOLIO</p>
          <h2>Studio Informatica.<br />Costruisco cose utili.</h2>
          <p>
            Lavoro in modo diretto, senza il rumore di una grande agenzia. Per te significa
            parlare sempre con la persona che pensa, disegna e realizza il progetto.
          </p>
          <div><span>Modena, Italia</span><span>Unimore</span><span>Disponibile per nuovi progetti</span></div>
        </div>
      </section>

      <footer className="fold-footer" id="contatti">
        <div className="fold-footer-top"><span>UN SITO NUOVO?</span><span>UN RESTYLING?</span></div>
        <h2>Let’s work<br /><i>together?</i></h2>
        <a href="mailto:geffnk@gmail.com">Scrivimi <Arrow /></a>
        <div className="fold-footer-bottom"><span>© 2026 Geff</span><span>Modena · CET</span><Link href="/stack">Vedi concept 02 →</Link></div>
      </footer>
    </main>
  );
}
