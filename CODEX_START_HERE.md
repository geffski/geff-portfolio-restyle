# Geff Portfolio — Motion Edition

This is the complete source export of the deployed Motion Edition portfolio.

## Open it in Codex

1. Extract the ZIP.
2. Open the extracted `geff-portfolio-motion` folder as the project/workspace.
3. Tell Codex what you want changed. For example:

   > Work on this portfolio without changing its black, white, and cobalt visual identity. Preserve the existing motion system, responsive layout, and WhatsApp contact flow. First inspect `app/MotionPortfolio.tsx` and `app/globals.css`, then implement my requested edits and verify the result.

## Main files

- `app/MotionPortfolio.tsx` — page structure, copy, animations, and WhatsApp form logic.
- `app/globals.css` — complete visual system, responsive layout, hover effects, and motion.
- `app/page.tsx` — primary route entry point.
- `public/geff-dark-fold-accordion.png` — main portfolio artwork.
- `.openai/hosting.json` — identifies the existing ChatGPT Site.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Then open the local URL printed by the terminal.

## Production check

```bash
npm run build
```

## Before publishing

The current WhatsApp links prepare a generic message. Replace the `https://wa.me/?text=...` links in `app/MotionPortfolio.tsx` with `https://wa.me/INTERNATIONAL_NUMBER?text=...` to send directly to Geff. Use digits only, including the country code and no `+` sign.

The included `.openai/hosting.json` belongs to the existing Motion Edition Site. If you use the Sites workflow in Codex, instruct it to edit the existing Site rather than create a new one.
