import Link from "next/link";

const projects = [
  {
    index: "01",
    title: "Studio di psicologia",
    type: "Sito professionale",
    className: "project-psych",
    eyebrow: "Ascolto · Percorsi · Benessere",
    headline: "Uno spazio digitale calmo, chiaro e umano.",
  },
  {
    index: "02",
    title: "Palestra locale",
    type: "Restyling digitale",
    className: "project-gym",
    eyebrow: "Allenamento · Metodo · Risultati",
    headline: "Un’identità più forte, dentro e fuori dalla palestra.",
  },
  {
    index: "03",
    title: "Cargef",
    type: "Catalogo B2B",
    className: "project-cargef",
    eyebrow: "Ghana · Distribuzione · Italia",
    headline: "Prodotti autentici, presentati con ordine.",
  },
];

function ConceptSwitcher() {
  return (
    <aside className="concept-switcher concept-switcher-light" aria-label="Cambia concept">
      <span>CONCEPT</span>
      <Link className="is-active" href="/stack" aria-current="page">
        02
      </Link>
      <Link href="/fold">03</Link>
    </aside>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function StackPage() {
  return (
    <main className="stack-site">
      <ConceptSwitcher />

      <header className="stack-header">
        <a className="stack-mark" href="#inizio" aria-label="Torna all’inizio">
          © Portfolio di Geff
        </a>
        <nav aria-label="Navigazione principale">
          <a href="#inizio">Home</a>
          <a href="#lavori">Lavori</a>
          <a href="#chi-sono">Chi sono</a>
          <a href="#contatti">Contatti</a>
        </nav>
        <span className="stack-location">Web designer / Modena</span>
      </header>

      <section className="stack-hero" id="inizio" aria-labelledby="stack-title">
        <div className="stack-letter" aria-hidden="true">
          G
        </div>

        <div className="stack-canvas" aria-hidden="true">
          <article className="browser-card browser-gym">
            <div className="browser-bar"><i /><i /><i /></div>
            <div className="gym-inner">
              <span>IL METODO</span>
              <strong>ALLENATI<br />CON FOCUS.</strong>
              <b>SUPERA I TUOI LIMITI.</b>
              <div className="gym-figure" />
            </div>
          </article>

          <article className="browser-card browser-main">
            <div className="browser-bar"><i /><i /><i /></div>
            <div className="main-inner">
              <small>WEB DESIGN · MODENA</small>
              <h1 id="stack-title">Siti web semplici.<br />Fatti per funzionare.</h1>
              <div className="product-scene">
                <span className="product-bag" />
                <span className="product-bottle" />
                <span className="product-box" />
              </div>
              <div className="main-card-footer">
                <span>Identità chiara</span><span>Caricamento veloce</span><span>Gestione semplice</span>
              </div>
            </div>
          </article>

          <article className="browser-card browser-psych">
            <div className="browser-bar"><i /><i /><i /></div>
            <div className="psych-inner">
              <span>STUDIO DI PSICOLOGIA</span>
              <strong>Spazio di ascolto,<br />percorsi di cambiamento.</strong>
              <div className="psych-chair" />
              <div className="psych-floor">Ascolto <i /> Consapevolezza <i /> Benessere</div>
            </div>
          </article>
        </div>

        <a className="stack-scroll" href="#intro" aria-label="Scorri alla presentazione">
          <span>SCOPRI</span><Arrow />
        </a>
        <div className="stack-marquee" aria-hidden="true">
          <div>Siti web — Restyling — Attività locali — Siti web — Restyling — Attività locali —</div>
        </div>
      </section>

      <section className="stack-intro reveal" id="intro">
        <p className="section-kicker">QUELLO CHE FACCIO</p>
        <div className="stack-intro-grid">
          <h2>Rendo semplice avere un sito che rappresenta davvero la tua attività.</h2>
          <div>
            <p>
              Sono Geff, studio Informatica all’Unimore e creo siti web per attività locali.
              Seguo il progetto dall’idea alla pubblicazione, con un processo diretto e senza
              complicazioni inutili.
            </p>
            <a className="round-link" href="#chi-sono">Chi sono <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="stack-work" id="lavori" aria-labelledby="stack-work-title">
        <div className="section-heading reveal">
          <p className="section-kicker">LAVORI SELEZIONATI · 2026</p>
          <h2 id="stack-work-title">Ogni attività ha qualcosa di diverso da far vedere.</h2>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card ${project.className} reveal`} key={project.title}>
              <div className="project-meta">
                <span>{project.index}</span>
                <span>{project.type}</span>
              </div>
              <div className="project-art">
                <span>{project.eyebrow}</span>
                <h3>{project.headline}</h3>
                <div className="project-art-detail" aria-hidden="true" />
              </div>
              <div className="project-caption">
                <h3>{project.title}</h3>
                <span>Apri progetto <Arrow /></span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stack-process" id="metodo" aria-labelledby="stack-process-title">
        <div className="section-heading reveal">
          <p className="section-kicker">UN PROCESSO SEMPLICE</p>
          <h2 id="stack-process-title">Da “mi serve un sito” a online, senza perdersi.</h2>
        </div>
        <ol className="process-list">
          <li className="reveal"><span>01</span><h3>Capisco il necessario</h3><p>Obiettivo, contenuti e clienti: partiamo dalle cose che contano davvero.</p></li>
          <li className="reveal"><span>02</span><h3>Creo l’anteprima</h3><p>Vedi il sito prima di decidere. Lo rifiniamo insieme, con feedback chiari.</p></li>
          <li className="reveal"><span>03</span><h3>Pubblico e semplifico</h3><p>Dominio, versione mobile e messa online: preparo tutto per funzionare bene.</p></li>
        </ol>
      </section>

      <section className="stack-about" id="chi-sono">
        <div className="about-monogram reveal" aria-hidden="true">G.</div>
        <div className="about-copy reveal">
          <p className="section-kicker">CHI SONO</p>
          <h2>Uno studente di Informatica con un approccio molto pratico.</h2>
          <p>
            Non una grande agenzia e nessun passaggio inutile. Parli direttamente con chi
            progetta e realizza il tuo sito. Il risultato deve essere bello, veloce e facile
            da usare — soprattutto per i tuoi clienti.
          </p>
          <div className="about-facts"><span>Basato a Modena</span><span>Unimore · Informatica</span><span>Disponibile per nuovi progetti</span></div>
        </div>
      </section>

      <footer className="stack-footer" id="contatti">
        <p className="section-kicker">HAI UN PROGETTO IN MENTE?</p>
        <h2>Facciamolo diventare<br />un sito fatto bene.</h2>
        <a className="contact-button" href="mailto:geffnk@gmail.com">Parliamone <Arrow /></a>
        <div className="footer-line"><span>© 2026 Geff</span><span>Modena, Italia</span><Link href="/fold">Vedi concept 03 →</Link></div>
      </footer>
    </main>
  );
}
