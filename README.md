# Geff Portfolio — Restyle

Independent redesign copied from `../geff-portfolio-motion`. The original directory
is preserved. The npm lockfile, dependencies, and build configuration are unchanged.

The restyle uses warm white, charcoal, and cobalt, with real project screenshots,
a personal introduction, client reviews alongside the work, and a simplified
navigation. Italian, English, and the WhatsApp handoff are retained.

The fixed offer is €650 for up to five content pages, including their Italian
and English versions. Payment is €325 at the start and €325 on publication.
Corrections to the agreed project before launch and small copy/image adjustments
for 30 days after launch are included; later updates and additional scope require
a separate approved quote. Domain registration and renewal are paid by the client.
Hosting is included while compatible with the free service used; changes to those
conditions or paid resources must be discussed and approved in advance.

Local preview: `npm run dev -- --host 127.0.0.1 --port 5174`, then open
`http://127.0.0.1:5174/it` or `http://127.0.0.1:5174/en`.

Localized portfolio for Geff's web-design service. Italian is the default
language at `/it`; English is available at `/en`; `/` redirects to `/it`.
The canonical production origin is `https://geffweb.it`.

## Prerequisites

- Node.js `>=22.13.0`
- Linux with `flock`, `curl`, and GNU `timeout`

## Main files

- `app/MotionPortfolio.tsx`: localized content, page structure, interactions,
  embedded project previews, and the WhatsApp handoff.
- `app/globals.css`: shared visual, responsive, focus, and reduced-motion styles.
- `app/[locale]/layout.tsx`: localized metadata, canonicals, alternate languages,
  fonts, and social cards.
- `app/[locale]/page.tsx`: validates and renders the `it` and `en` routes.
- `worker/index.ts`: Cloudflare Worker entry point, image handling, and response
  security headers.
- `.openai/hosting.json`: existing Sites project identity and bindings.

The site has no database, authentication, CMS, or server-side form handler.
Contact fields remain in the browser and are encoded into a WhatsApp URL only
when the visitor chooses to continue.

## Local development and verification

- `npm run install:ci`: perform the one bounded lockfile install
- `npm run dev`: start the Vite/Vinext development server
- `npm run build`: build and validate the deployable Sites artifact
- `npm run start`: start the built Vinext application
- `node --test tests/rendered-html.test.mjs`: verify the current built artifact's
  routes, localized content, metadata, and response headers
- `npm run validate:artifact`: recheck an existing artifact's manifest and ESM `default.fetch` export

The build helpers target Linux and require GNU `timeout`. On macOS, use the same
locked compiler directly for local diagnosis:

```bash
bash scripts/sites-env.sh -- ./node_modules/.bin/vinext build
npm run validate:artifact
node --test tests/rendered-html.test.mjs
```

The timeout defaults can be overridden for a controlled canary with `SITES_INSTALL_TIMEOUT`, `SITES_INSTALL_KILL_AFTER`, `SITES_BUILD_TIMEOUT`, and `SITES_BUILD_KILL_AFTER`. A timeout fails the command; the helpers never retry an unchanged install or build.

## Content updates

Keep Italian and English copy aligned in `app/MotionPortfolio.tsx`. When the
canonical host or social-card version changes, update the matching values in
`app/[locale]/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, and the rendered
HTML tests together.

## Deployment and rollback

This clone retains the original hosting identity for build compatibility. Do not
publish it to that identity: provision a separate site before deploying this redesign.

The original target is the existing OpenAI Sites project declared in
`.openai/hosting.json`, which produces a Cloudflare Worker artifact in `dist`.
Production deployment requires an authorized Sites launch for the exact tested
commit and artifact. Preserve the previous Sites deployment/version until the
new release passes its production smoke tests; rollback is promotion of that
recorded previous version through the same authorized Sites workflow.
