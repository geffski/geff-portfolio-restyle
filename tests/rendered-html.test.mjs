import assert from "node:assert/strict";
import test from "node:test";

test("renders finished portfolio metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
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

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Geff - Web Designer/i);
  assert.match(html, /property=["']og:image["'][^>]+\/og\.png\?v=2/i);
  assert.match(html, /rel=["']canonical["'][^>]+https:\/\/geff-palette-lab\.geff\.workers\.dev\//i);
  assert.doesNotMatch(html, /codex-preview/i);
});

test("renders the approved portfolio on the homepage", async () => {
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
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    environment,
    context,
  );
  const homeHtml = await homeResponse.text();

  assert.equal(homeResponse.status, 200);
  assert.match(homeHtml, /Guarda i siti realizzati/i);
  assert.match(homeHtml, /Tre attività/i);
  assert.match(homeHtml, /Tre siti da esplorare/i);
  assert.match(homeHtml, /Modifiche/i);
  assert.match(homeHtml, /Correzioni ai testi, sostituzione di immagini e contenuti e rifinitura dei dettagli grafici/i);
  assert.doesNotMatch(homeHtml, /Dentro i €300/i);
  assert.match(homeHtml, />Extra</i);
  assert.match(homeHtml, /Com’è lavorare insieme\./i);
  assert.doesNotMatch(homeHtml, /bozz[ae]/i);
  assert.doesNotMatch(homeHtml, /Più lingue/i);
  assert.doesNotMatch(homeHtml, /A parte, solo se richiesto/i);
  assert.doesNotMatch(homeHtml, /Nuove aggiunte al progetto/i);
  assert.match(homeHtml, /Siti completi come questi/i);
  assert.match(homeHtml, /https:\/\/serenaprevidi\.com/i);
  assert.match(homeHtml, /https:\/\/alpha-fitness-mo\.netlify\.app\//i);
  assert.match(homeHtml, /Siti demo/i);
  assert.match(homeHtml, /Alma Nutre/i);
  assert.match(homeHtml, /Fidalgo Bistro/i);
  assert.match(homeHtml, /Sottoportico/i);
  assert.doesNotMatch(homeHtml, /Velaria Atelier|Nativa Studio/i);
  assert.match(homeHtml, /https:\/\/geff-demo-fidalgo-bistro-20260810\.geff\.workers\.dev\//i);
  assert.match(homeHtml, /https:\/\/geff-demo-sottoportico-forno-20260810\.geff\.workers\.dev\//i);
  assert.match(homeHtml, /Apri la demo/i);
  assert.match(homeHtml, /https:\/\/geff-demo-alma-nutre-20260809\.geff\.workers\.dev\//i);
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
  assert.match(robotsText, /Sitemap: https:\/\/geff-palette-lab\.geff\.workers\.dev\/sitemap\.xml/i);
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapText, /<loc>https:\/\/geff-palette-lab\.geff\.workers\.dev<\/loc>/i);
  for (const response of oldPageResponses) {
    assert.equal(response.status, 404);
  }
});
