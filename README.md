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
- `wrangler.jsonc`: direct Cloudflare Worker deployment configuration.
- `.openai/hosting.json`: legacy Sites manifest retained for the build artifact.

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

The production Worker is `geffweb` on Cloudflare. Build the site, then deploy the
validated artifact with:

```bash
npm run build
./node_modules/.bin/wrangler deploy --config wrangler.jsonc
```

The Worker is currently available at `https://geffweb.geff.workers.dev`. The
custom domain `geffweb.it` still points to the legacy Sites service until the
domain DNS is moved into the Cloudflare account. Once that is complete, attach
`geffweb.it` and `www.geffweb.it` with Wrangler's `--domain` option and verify
both hosts before removing the old Sites domains.

Rollback is a Cloudflare Worker deployment rollback using the previous version
shown by `wrangler deployments list --name geffweb`.

## DNS migration — 2026-09-07

Cloudflare Free plan selected; Edward and Virginia now answer authoritatively.
All 19 existing records were compared against both Cloudflare nameservers.
The seven mail-host A records and all other imported records are DNS-only.
Three verification TXT records omitted by the scan were restored.
The owner confirmed no domain email usage. Aruba recorded the nameserver change
to Edward and Virginia at 22:19 CEST; registry propagation remains pending.
Wrangler authentication was renewed and the unchanged artifact uploaded, but
custom-domain attachment still failed with conflict code 100117.
The Cloudflare dialog to remove only the two old apex A records and the www
CNAME is prepared, awaiting permanent-delete confirmation. Mail records are
untouched. Old Sites domains and web targets remain attached.

### Aruba DNS snapshot before nameserver change

Full standard-record list inspected in Aruba (18 rows), plus its separate MX.
BIND export was requested in Aruba; download completion was not verified.
The following snapshot was independently retrieved from Aruba authoritative DNS.
Original TTL: 3600 seconds. DNSSEC was disabled.

```bind
$ORIGIN geffweb.it.
$TTL 3600
@ IN A 162.159.143.30
@ IN A 172.66.3.26
localhost IN A 127.0.0.1
mx IN A 62.149.128.151
mx IN A 62.149.128.154
mx IN A 62.149.128.157
mx IN A 62.149.128.160
mx IN A 62.149.128.163
mx IN A 62.149.128.166
mx IN A 62.149.128.74
_domainconnect IN CNAME _domainconnect.hst.aruba.it.
admin IN CNAME admin.redirect.aruba.it.
ftp IN CNAME www.geffweb.it.
www IN CNAME custom-domains.chatgpt.site.
@ IN MX 10 mx.geffweb.it.
_cf-custom-hostname IN TXT "c607cd37-2bdb-4491-9a79-c3b5e9960ba8"
_cf-custom-hostname.www IN TXT "a3dae4fe-1f5e-4e3a-bdeb-b46d06d31edd"
_openai-site-verification IN TXT "openai-site-verification=lCuDiGNFWH2p4j9Yp0DVGBP6m_L-ONsqCghqmmwDWbM"
_openai-site-verification.www IN TXT "openai-site-verification=nz-4XapYbY0sJC8nB745PpDi1uXDlA6mK9yos7uXyug"
@ IN NS dns.technorail.com.
@ IN NS dns2.technorail.com.
@ IN NS dns3.arubadns.net.
@ IN NS dns4.arubadns.cz.
```

## Private GitHub repository and Cloudflare Builds

Source repository: https://github.com/geffski/geff-portfolio-restyle (private).
Production branch: `main`. Existing Cloudflare Worker: `geffweb`.

Cloudflare Builds settings for this repository:

- Root directory: repository root
- Build command: `npm run build && npm run lint && node --test tests/rendered-html.test.mjs`
- Deploy command: `npx wrangler deploy --config wrangler.jsonc`

The private repository is pushed and verified. Local production build, artifact
validation, lint, and four route tests passed on 2026-09-08.
Cloudflare does not yet list the repository. Its existing GitHub installation
requires an account verification code before repository access can be reviewed.
The Git connection and first automatic deployment remain pending that step.
The custom-domain cutover remains separate from this repository connection.
