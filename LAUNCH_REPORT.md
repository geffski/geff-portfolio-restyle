# Launch Report

This report covers the exact local release below. Part 1 records Goal 1 readiness. Part 2 remains empty because no launch was authorized.

## Part 1 — Release readiness

### Executive summary

- Readiness: NOT READY
- Decision timestamp/timezone: 2026-08-12 11:16 CEST (UTC+02:00)
- Exact website path: /Users/nkuah/personal-projects/website-repo/geff-portfolio-motion
- Exact release commit/artifact: Git fa28dd7c6f357eb2859e17d1f94397894957551c plus the preserved dirty worktree; dist fingerprint b060d04beb73df7b01daf374531cdc7b9ae794a677bba04784b168d834db224f
- Environment tested: macOS 15.7.7 arm64, Node.js 24.1.0, npm 11.6.0, Chrome extension browser, local production server
- Production action occurred during Goal 1: NO
- Plain-English decision: All three focused pre-launch items are resolved and no related deployed application defect remains. The strict checklist is still NOT READY because the standalone TypeScript safety check fails and previously recorded specialist QA evidence remains incomplete; neither is a confirmed browser defect.
- Already completed: Production audit is clean; the exact production build and full test entry point pass on this Mac; all preview iframes are click-to-load.
- Fix before launch: F-TYPE-01.
- Owner decisions: The owner selected click-to-load embeds; no legal wording, consent mechanism, or privacy page was requested. No owner decision remains for the three focused items.
- Additional confidence or polish: F-QA-01 and F-POLISH-01.
- Production-only verification: F-PROD-01.
- Practical launch recommendation: The three requested items no longer block launch. Repair the standalone typecheck in one separate approved pass, then proceed to an authorized deployment with immediate production verification.

### Release profile

| Item | Exact value |
| --- | --- |
| Repository and website path | website-repo / geff-portfolio-motion |
| Site name | Geff Portfolio — Motion Edition |
| Release commit and artifact | fa28dd7c6f357eb2859e17d1f94397894957551c plus dirty working-tree changes; dist fingerprint b060d04beb73df7b01daf374531cdc7b9ae794a677bba04784b168d834db224f |
| Build output | dist/, 94 files, approximately 12 MiB |
| Local/tested URL | http://127.0.0.1:3000; server stopped after testing |
| Configured or existing production URL | https://geff-portfolio-showcases-20260809.geff.workers.dev is configured in metadata only; it was not tied to this exact local artifact |
| Stack, rendering model, and router | Next.js 16.3.0 compatibility through vinext 0.0.50; React 19.2.6; Vite 8.0.13; server-rendered locale route with client interactions; App Router-compatible Worker output |
| Package manager, lockfile, and runtime | npm 11.6.0; package-lock.json lockfileVersion 3; Node.js >=22.13.0, tested on 24.1.0 |
| Production build command | npm run build |
| Intended host and deployment mechanism | OpenAI Sites backed by Cloudflare Workers; the saved dist artifact is the deployment input |
| Audit window and operator | 2026-08-12 09:00–11:16 CEST; Codex |
| Scope and material limitations | Focused only on production dependency advisories, build verification, and iframe/WhatsApp privacy behavior. No Linux runner was available. No deployment, DNS, real message, real form submission, consent text, or external-service change occurred. Existing dirty-worktree changes were preserved. |

### Applicable capabilities

| Applicable capability | Evidence/reason | Check IDs |
| --- | --- | --- |
| Server/runtime rendering | dist/server/index.js exposes the Cloudflare Worker fetch handler. | BLD-01, BLD-03 |
| Client interactions and third-party previews | Nine preview controls can create one selected iframe after activation. | PRV-01, JRN-01 |
| Internationalized public routes | / redirects to /it; /it and /en render localized metadata and content. | SEO-13, CAP-I18N-01 |
| Browser-only WhatsApp handoff | Contact data remains client-side until the visitor opens WhatsApp; the site sends no message itself. | PRV-05, JRN-07 |

- Not applicable capability groups: CMS, authentication, application database use, payments, bookings, uploads, public API, background jobs, server-side form submission, and user-generated content.
- Reason: Those capabilities are absent from the tested website journeys and hosting manifest.

### Verification results

| Area/check IDs | Exact command or method | Result | What it means in plain English | Limitation/finding ID | Environment/time/evidence |
| --- | --- | --- | --- | --- | --- |
| Production dependencies / SEC-03 | npm install --save-exact next@16.3.0; npm ls next postcss nanoid sharp --omit=dev; npm audit --omit=dev --audit-level=high --json | PASS | The intended production tree is Next 16.3.0, PostCSS 8.5.23, nanoid 3.3.18, and sharp 0.35.3; the audit reports 0 vulnerabilities at all severities. | NONE | npm 11.6.0, 2026-08-12 CEST |
| Portable timeout and exact build / BLD-01 | SITES_BUILD_TIMEOUT=1ms SITES_BUILD_KILL_AFTER=1s npm run build; npm run build; bash -n scripts/build-verified.sh | PASS | The deadline returns status 124, while the normal exact build completes and validates the Worker artifact on macOS without GNU timeout. | Linux execution was unavailable; the same Node/Bash path is portable to the intended Linux environment. | macOS arm64, Node.js 24.1.0 |
| Lint, tests, artifact / BLD-02–06 | npm run lint; npm test; npm run validate:artifact | PASS | Lint passes, the exact build is exercised by the full test entry point, all 4 rendered tests pass, and the artifact exposes the expected Worker entry and manifest. | NONE | Local locked install and dist artifact |
| Standalone TypeScript check / BLD-02 | bash scripts/sites-env.sh -- ./node_modules/.bin/tsc --noEmit --pretty false | FAIL | The safety check still reads stale .next route declarations and lacks Cloudflare ambient binding types. This is not evidence that the tested website is broken. | F-TYPE-01 | Exit 2; unchanged before and after the focused fixes |
| Browser and privacy smoke / PRV-01–08, JRN-01 | Local production server; inspect /it and /en; inventory initial resources; activate one client and one demo preview | PASS | Both locales render, initial iframe count is 0, and only the selected client or demo host loads after its button. No application-origin console error appeared. | A wallet-extension ethereum error was excluded because it originates from chrome-extension://. | Chrome extension browser, local production build |
| Real host, TLS, edge cache, logs, rollback, and real recipient / BLD-09, SEC-09, JRN-11 | Not run; Goal 1 forbids these production actions | NOT VERIFIED | Local checks cannot prove the deployed release or contact a real person. No defect was inferred. | F-PROD-01 | Production-only |

### Fixes completed and retested

| ID/check IDs | What changed in plain English | Files | Retest and result | Owner outcome | Status |
| --- | --- | --- | --- | --- | --- |
| FIX-DEP / SEC-03 | Upgraded only Next from 16.2.6 to 16.3.0; npm refreshed the compatible transitive security fixes in the existing lockfile. | package.json, package-lock.json | Production audit: 0 total; lint, build, tests, artifact, and browser smoke pass. | RESOLVED | RETESTED — CLOSED |
| FIX-BUILD / BLD-01 | Replaced the GNU-only build deadline with the required Node runtime while preserving TERM, grace-period KILL, exit propagation, and artifact validation. | scripts/build-verified.sh | Deliberate timeout exits 124; exact npm run build and npm test pass. | RESOLVED | RETESTED — CLOSED |
| FIX-PRIVACY / PRV-01–08 | Client previews now follow the demos and create no iframe until activation; the existing control is centered in the unloaded state. | app/MotionPortfolio.tsx, app/globals.css, tests/rendered-html.test.mjs | Initial HTML and browser contain 0 iframes; client and demo activation each load only the selected host; 4/4 tests pass. | RESOLVED | RETESTED — CLOSED |

### Remaining work — single source of truth

| ID/check IDs | Formal severity | Practical priority | Finding type | Plain-English finding and impact | Evidence | One next action and owner | Status/retest |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F-TYPE-01 / BLD-02 | HIGH | FIX BEFORE LAUNCH | SAFETY CHECK | The standalone TypeScript check fails on stale Next-generated route files and missing Cloudflare ambient types. The production build, tests, and browser journeys pass, so this is not a confirmed website defect, but static regression assurance is incomplete. | Exit 2 references removed app/fold, app/page, app/stack, app/layout paths plus cloudflare:workers, Fetcher, and D1Database types. | Maintainer proposes the smallest generated-type/Cloudflare-type repair, obtains approval for any TypeScript or hosting-config change, then reruns the full suite. | OPEN |
| F-QA-01 / RWD-04, RWD-06, A11Y-12, PERF-07 | HIGH | ADDITIONAL CONFIDENCE | MISSING COVERAGE | Actual zoom/enlarged-text behavior, a second browser engine, specialist accessibility checks, and repeatable performance profiles remain from the prior report. No defect was observed in the available Chrome checks. | Required tooling was unavailable and this focused task explicitly excluded optional coverage work. | QA owner runs one recorded specialist pass before strict sign-off. | OPEN |
| F-POLISH-01 / JRN-06, SEO-09 | MEDIUM | POLISH | CONFIRMED DEFECT | The existing plain-text 404 and absent touch-icon/theme metadata remain outside this focused task. They affect recovery/presentation, not the tested primary journeys. | Carried forward from the prior report; intentionally not changed. | Site owner schedules only if desired after launch-critical work. | OPEN |
| F-PROD-01 / BLD-09, SEC-09, SEO-15, PERF-10, JRN-11 | INFORMATIONAL | PRODUCTION ONLY | PRODUCTION VERIFICATION | The exact local artifact has not been deployed, so public TLS, routes, headers, caching, logs, rollback, indexing, performance, and any authorized real WhatsApp handoff are unverified. | No external action was authorized or performed. | Launch operator verifies the exact deployed release immediately during an authorized Goal 2; real messaging requires separate explicit authorization. | OPEN — GOAL 2 |

#### Counts

- Open — fix before launch: 1
- Open — owner decision: 0
- Open — additional confidence: 1
- Open — polish: 1
- Deferred — production only: 1
- Fixed and retested: 3
- Fixed awaiting retest: 0

### Goal 2 verification plan

| Finding IDs | Production check group | Immediate method | Expected result | Failure action |
| --- | --- | --- | --- | --- |
| F-PROD-01 | URL, TLS, routes, localized metadata, robots, sitemap | Request canonical and invalid routes from the exact deployed version and inspect certificate/status/output. | Correct HTTPS, redirects, statuses, locale metadata, and search files. | Stop promotion or roll back; correct the smallest route/domain issue. |
| F-PROD-01 | Assets, logs, headers, cache, performance | Load both locales cleanly; inspect network, browser errors, Worker logs, response policy, compression/cache, and recorded profiles. | No first-party failure and policy/caching match the tested artifact. | Roll back a severe regression or make a measured forward fix. |
| F-PROD-01 | Authorized external journey, if separately approved | Open or send only the minimum approved WhatsApp test to the exact recipient. | Correct destination and encoding with no unintended disclosure. | Stop immediately and document/correct the destination or content. |

### Goal 1 conclusion

The production audit, exact build, full tests, artifact validator, and focused browser/privacy journeys now pass, and all three requested items are RESOLVED. The strict decision remains NOT READY because F-TYPE-01 and previously recorded specialist coverage are still open; these are safety/coverage gaps, not confirmed runtime defects. Practically, the focused release risks are cleared and the next useful action is a separately approved TypeScript repair. No deployment or external interaction occurred.

<details>
<summary>Material technical references</summary>

- Next.js security releases and GitHub Advisory Database entries for GHSA-6gpp-xcg3-4w24, GHSA-m99w-x7hq-7vfj, GHSA-89xv-2m56-2m9x, GHSA-p9j2-gv94-2wf4, GHSA-68g3-v927-f742, GHSA-4633-3j49-mh5q, GHSA-4c39-4ccg-62r3, GHSA-q8wf-6r8g-63ch, and GHSA-955p-x3mx-jcvp.
- PostCSS advisories GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849, and GHSA-fxqj-rqcc-2cmp.
- nanoid advisories GHSA-28wg-ghj8-5hjv and GHSA-2v37-7h3g-55p8; sharp advisory GHSA-f88m-g3jw-g9cj.
- Current OpenAI Sites and Cloudflare Workers Vite/static-assets documentation informed the artifact-versus-deployment distinction.

</details>

## Part 2 — Launch and production record
