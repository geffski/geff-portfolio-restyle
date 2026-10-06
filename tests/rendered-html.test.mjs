import assert from "node:assert/strict";
import test from "node:test";

test("redirects the root to Italian and renders localized metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const rootResponse = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(rootResponse.status, 308);
  assert.equal(rootResponse.headers.get("location"), "http://localhost/it");

  const response = await worker.fetch(
    new Request("http://localhost/it", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'self'/i);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  const html = await response.text();
  assert.match(html, /<html[^>]+lang=["']it["']/i);
  assert.match(html, /Geff - Design e sviluppo di siti web/i);
  assert.match(html, /Siti web chiari, veloci e curati per piccole attività/i);
  assert.match(html, /property=["']og:image["'][^>]+\/og\.png\?v=8/i);
  assert.match(html, /rel=["']canonical["'][^>]+https:\/\/geffweb\.it\/it/i);
  assert.match(html, /hreflang=["']en["'][^>]+\/en/i);
  assert.match(html, /href=["']#main-content["'][^>]*>Vai al contenuto principale/i);
  assert.match(html, /id=["']main-content["']/i);
  assert.match(html, /aria-controls=["']motion-menu["']/i);
  assert.doesNotMatch(html, /codex-preview/i);
});

test("renders the restyled Italian portfolio with client proof before the offer", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("feedback-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const environment = {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
  const context = {
    waitUntil() {},
    passThroughOnException() {},
  };

  const homeResponse = await worker.fetch(
    new Request("http://localhost/it", { headers: { accept: "text/html" } }),
    environment,
    context,
  );
  const homeHtml = await homeResponse.text();

  assert.equal(homeResponse.status, 200);
  assert.match(homeHtml, /La prima impressione/i);
  assert.match(homeHtml, /comincia online\./i);
  assert.match(homeHtml, /Guarda i siti realizzati/i);
  assert.match(homeHtml, /Due attività/i);
  assert.match(homeHtml, /Due siti da esplorare/i);
  assert.match(homeHtml, /Modifiche/i);
  assert.match(homeHtml, /Prima della pubblicazione sono incluse le correzioni/i);
  assert.match(homeHtml, /Dopo la pubblicazione, ogni modifica si preventiva a parte/i);
  assert.doesNotMatch(homeHtml, /€\s*(?:650|325)|%E2%82%AC(?:650|325)/i);
  assert.match(homeHtml, />Extra</i);
  assert.match(homeHtml, /Com’è lavorare insieme\./i);
  assert.match(homeHtml, /href=["']#testimonianze["'][^>]*>Recensioni</i);
  assert.match(homeHtml, /href=["']#chi-sono["'][^>]*>Chi sono</i);
  assert.match(homeHtml, /Sono molto soddisfatta del lavoro realizzato/i);
  assert.match(homeHtml, /Puntuale, disponibile e attento ad ogni richiesta\./i);
  assert.match(homeHtml, /Leggi la recensione completa/i);
  assert.match(homeHtml, /Molto professionale\. Ascolta le richieste con attenzione/i);
  assert.match(homeHtml, /Christopher Paparella/i);
  assert.match(homeHtml, /Proprietario · Alpha Elite Fitness Club/i);
  assert.doesNotMatch(homeHtml, /Cargef/i);
  assert.doesNotMatch(homeHtml, /bozz[ae]/i);
  assert.doesNotMatch(homeHtml, /Più lingue/i);
  assert.doesNotMatch(homeHtml, /A parte, solo se richiesto/i);
  assert.doesNotMatch(homeHtml, /Nuove aggiunte al progetto/i);
  assert.match(homeHtml, /Siti completi come questi/i);
  assert.match(homeHtml, /https:\/\/serenaprevidi\.com/i);
  assert.match(homeHtml, /https:\/\/alphaelitefitnessclub\.it\//i);
  assert.match(homeHtml, /Hai un progetto in mente/i);
  assert.match(homeHtml, /Scrivi a Geff su WhatsApp/i);
  assert.match(homeHtml, /Apri il menu/i);
  assert.match(homeHtml, /motion-preview-mobile-activatable/i);
  assert.match(homeHtml, /Attiva l’anteprima/i);
  assert.doesNotMatch(homeHtml, /<iframe\b/i);
  assert.match(homeHtml, /Siti concept/i);
  assert.match(homeHtml, /Cliente reale/i);
  assert.match(homeHtml, /Nutrizione/i);
  assert.match(homeHtml, /Centro estetico/i);
  assert.match(homeHtml, /Ristorante/i);
  assert.match(homeHtml, /Event planner/i);
  assert.match(homeHtml, /Forno artigianale/i);
  assert.match(homeHtml, /motion-showcase-card--mobile-first/i);
  assert.match(homeHtml, /motion-showcase-card--mobile-second/i);
  assert.match(homeHtml, /Vedi altri 3 concept/i);
  assert.match(homeHtml, /geff-portrait\.webp/i);
  assert.match(homeHtml, /alt=["']Ritratto di Geff["']/i);
  assert.doesNotMatch(homeHtml, /Velaria Atelier|Nativa Studio/i);
  assert.match(homeHtml, /https:\/\/geff-demo-fidalgo-bistro-20260810\.geff\.workers\.dev\//i);
  assert.match(homeHtml, /https:\/\/geff-demo-sottoportico-forno-20260810\.geff\.workers\.dev\//i);
  assert.match(homeHtml, /Apri il concept/i);
  assert.doesNotMatch(homeHtml, /Anteprima interattiva della demo Ristorante/i);
  assert.match(homeHtml, /Scorri qui per esplorare/i);
  assert.match(homeHtml, /https:\/\/geff-demo-alma-nutre-20260809\.geff\.workers\.dev\//i);
  assert.match(homeHtml, /motion-shell--review/i);
  assert.match(homeHtml, /Progetto e realizzo siti web per piccole attività e professionisti/i);
  assert.match(homeHtml, /Di solito rispondo entro 12 ore/i);
  assert.match(homeHtml, /consegna standard è indicativamente di 48–72 ore/i);
  assert.match(homeHtml, /application\/ld\+json[^<]*"@type":"ProfessionalService"/i);
  assert.match(homeHtml, /Sito Essenziale/i);
  assert.match(homeHtml, /motion-plan--recommended[\s\S]*Per iniziare/i);
  assert.match(homeHtml, /Sito Completo/i);
  assert.match(homeHtml, /€300/i);
  assert.match(homeHtml, /€500/i);
  assert.match(homeHtml, /\+ €50 all’anno/i);
  assert.match(homeHtml, /Una pagina sola, che scorre/i);
  assert.match(homeHtml, /Prezzo lancio: ultimi 5 posti/i);
  assert.match(homeHtml, /Non sai quale scegliere\?/i);
  assert.match(homeHtml, /Seconda lingua/i);
  assert.match(homeHtml, /Metà per iniziare, metà quando il sito va online/i);
  assert.match(homeHtml, /Cosa comprendono i €50 all’anno\?/i);
  assert.match(homeHtml, /non sono disponibili/i);
  assert.match(homeHtml, /mailto:info@geffweb\.it/i);
  assert.match(homeHtml, /https:\/\/wa\.me\/393341394895\?text=[^"']*Sito%20Essenziale/i);
  assert.doesNotMatch(homeHtml, /Gestione|€\s*25\b|€\s*600|anteprima gratuita/i);
  assert.doesNotMatch(homeHtml, /foto da inserire/i);
  assert.doesNotMatch(homeHtml, /Commenti modifiche/i);
  assert.doesNotMatch(homeHtml, /motion-review-(?:toggle|note)/i);

  const pricePosition = homeHtml.indexOf("motion-review-price-reveal");
  const showcasePosition = homeHtml.indexOf("motion-showcase\"");
  assert.ok(pricePosition >= 0 && pricePosition < showcasePosition);

  const recommendedPosition = homeHtml.indexOf("motion-plan--recommended");
  const soloPosition = homeHtml.indexOf("motion-plan--completo");
  assert.ok(recommendedPosition >= 0 && recommendedPosition < soloPosition);

  const offerPosition = homeHtml.indexOf("Due siti, due prezzi.");
  const testimonialsPosition = homeHtml.indexOf("Com’è lavorare insieme.");
  const processPosition = homeHtml.indexOf("Dal primo messaggio");
  assert.ok(testimonialsPosition >= 0 && testimonialsPosition < showcasePosition);
  assert.ok(showcasePosition < offerPosition);
  assert.ok(offerPosition < processPosition);
});

test("renders the complete English portfolio and localized conversion copy", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("english-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/en", { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<html[^>]+lang=["']en["']/i);
  assert.match(html, /Geff - Website design and development/i);
  assert.match(html, /rel=["']canonical["'][^>]+\/en/i);
  assert.match(html, /property=["']og:image["'][^>]+\/og-en\.png\?v=4/i);
  assert.match(html, /href=["']\/it["'][^>]+hreflang=["']it["']/i);
  assert.match(html, /href=["']\/en["'][^>]+hreflang=["']en["']/i);
  assert.match(html, /First impressions/i);
  assert.match(html, /start online\./i);
  assert.match(html, /From the first message to launch, you work directly with me\./i);
  assert.match(html, /I design and build websites for small businesses and independent professionals/i);
  assert.match(html, /Two websites to explore\./i);
  assert.match(html, /Concept websites/i);
  assert.match(html, /Real client/i);
  assert.match(html, /Punctual, helpful and attentive to every request\./i);
  assert.match(html, /Essential Website/i);
  assert.match(html, /To get started/i);
  assert.match(html, /Complete Website/i);
  assert.match(html, /\+ €50 per year/i);
  assert.match(html, /Launch price: last 5 spots/i);
  assert.match(html, /Not sure which one\?/i);
  assert.match(html, /What does the €50 per year cover\?/i);
  assert.match(html, /are not available/i);
  assert.match(html, /Or send an email/i);
  assert.match(html, /https:\/\/wa\.me\/393341394895\?text=[^"']*Essential%20Website/i);
  assert.doesNotMatch(html, /Website \+ Care|€\s*25\b|€\s*600|free homepage preview/i);
  assert.doesNotMatch(html, /€\s*(?:650|325)|%E2%82%AC(?:650|325)/i);
  assert.match(html, /Translated from Italian/i);
  assert.match(html, /Christopher Paparella/i);
  assert.match(html, /How long does it take\?/i);
  assert.match(html, /approximately 48–72 hours/i);
  assert.match(html, /I usually reply within 12 hours/i);
  assert.match(html, /Message Geff on WhatsApp/i);
  assert.match(html, /Hi%20Geff%2C%20I%20saw%20your%20work/i);
  assert.doesNotMatch(html, /Fatti capire|Sito Essenziale|Scrivi a Geff/i);
});

test("publishes search metadata and keeps old concept pages private", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("routes-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const environment = {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
  const context = {
    waitUntil() {},
    passThroughOnException() {},
  };

  const paths = [
    "/robots.txt",
    "/sitemap.xml",
    "/feedback",
    "/fold",
    "/palettes",
    "/stack",
    "/hero-design-options.html",
    "/offerta-design-options.html",
  ];
  const responses = await Promise.all(
    paths.map((path) => worker.fetch(new Request(`http://localhost${path}`), environment, context)),
  );
  const [robotsResponse, sitemapResponse, ...oldPageResponses] = responses;
  const [robotsText, sitemapText] = await Promise.all([
    robotsResponse.text(),
    sitemapResponse.text(),
  ]);

  assert.equal(robotsResponse.status, 200);
  assert.match(robotsText, /Sitemap: https:\/\/geffweb\.it\/sitemap\.xml/i);
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapText, /<loc>https:\/\/geffweb\.it\/it<\/loc>/i);
  assert.match(sitemapText, /<loc>https:\/\/geffweb\.it\/en<\/loc>/i);
  assert.match(sitemapText, /hreflang="it-IT"[^>]+\/it/i);
  assert.match(sitemapText, /hreflang="en"[^>]+\/en/i);
  for (const response of oldPageResponses) {
    assert.equal(response.status, 404);
  }
});
