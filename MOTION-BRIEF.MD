# MOTION BRIEF — three effects to add to this existing site

You are adding three interaction effects to the site in this repo. Do NOT
scaffold a new project, do not change the framework, do not restructure files.

## STEP 0 — before you touch anything
1. If this folder is not a git repo, run `git init` and commit everything as
   "before motion work". If it is, commit any uncommitted changes first.
2. Detect the stack yourself: check for package.json, index.html, app/, src/,
   wp-content/, astro.config, vite.config, etc. Report in one sentence what
   this site is built with and which files hold the header/logo, the hero, and
   the global stylesheet.
3. Tell me your plan and WAIT for my approval before editing.

## Adapting to the stack
- Load GSAP the way this project already loads its JS. If it uses npm, run
  `npm i gsap`. If it's plain HTML, add the GSAP + ScrollTrigger CDN script tags
  before the closing </body>. Do not introduce a bundler or framework.
- Effect 1 is pure CSS and works as-is on any stack.
- Effect 2 is GSAP and works on any stack; only the element-selection differs
  (React refs vs document.querySelector).
- Effect 3: use Framer Motion ONLY if this project already uses React AND
  framer-motion. Otherwise use the GSAP fallback given below. Never add
  framer-motion to a non-React site.

## Shared motion tokens — never hard-code an easing anywhere else
  EASE_WIPE = cubic-bezier(0.76, 0, 0.24, 1)      // [0.76, 0, 0.24, 1]
  EASE_SOFT = cubic-bezier(0.25, 0.46, 0.45, 0.94) // [0.25, 0.46, 0.45, 0.94]
  EASE_POP  = cubic-bezier(0.22, 1.12, 0.42, 1)    // [0.22, 1.12, 0.42, 1]
Put these in the existing global stylesheet as CSS custom properties and, if
there's a JS module system, in a small src/motion tokens file. Every value
below must reference these, not literals.

## Global rules
- Animate transform / opacity / clip-path only. Never width/height/top/left.
- Wrap pointer-driven effects in
  matchMedia('(hover: hover) and (pointer: fine)').matches
- Wrap everything in a prefers-reduced-motion guard: content stays visible,
  motion is dropped.
- Kill every rAF loop and ScrollTrigger on teardown / route change.
- Touch only the files needed for each effect. No drive-by refactors, no
  reformatting, no dependency upgrades.
- Do the three effects ONE AT A TIME. After each: confirm the site still builds
  and runs, commit with a conventional-commit message, then stop and let me look.

────────────────────────────────────────────────────────────────────────
## EFFECT 1 — logo that rewrites itself on hover  (pure CSS, do this first)
────────────────────────────────────────────────────────────────────────
Turn the site's header logo into a hover-morph: at rest it reads
"© Word1 Word2", on hover it becomes "© Word2 Word3". Ask me for the two
strings if it isn't obvious from the existing markup.

Markup (adapt class names to this project's convention):
  <a href="/" class="logo">
    <p class="copyright">©</p>
    <div class="name">
      <p class="portfolioOf">Word1</p>
      <p class="lorenzo">Word2</p>
      <p class="cerato">Word3</p>
    </div>
  </a>

CSS:
  .logo { display: flex; cursor: pointer; }
  .logo p { margin: 0; transition: 0.5s var(--ease-wipe); }
  .logo .name {
    display: flex; position: relative; overflow: hidden;
    white-space: nowrap; margin-left: 5px;
    transition: 0.5s var(--ease-wipe);
  }
  .logo .name p { position: relative; transition: transform 0.5s var(--ease-wipe); }
  .logo .name p:nth-of-type(2) { padding-left: 0.3em; }
  .logo .name p:nth-of-type(3) { position: absolute; left: 155px; padding-left: 0.3em; }

  .logo:hover .copyright   { transform: rotate(1turn); }
  .logo:hover .name        { padding-right: 30px; }
  .logo:hover .portfolioOf { transform: translateX(-100%); }
  .logo:hover .lorenzo     { transform: translateX(-83px); }
  .logo:hover .cerato      { transform: translateX(-95px); }

The 155px / -83px / -95px are tied to the pixel widths of the original words.
Recompute them for MY words: measure each <p>'s offsetWidth once on load and
write them into CSS custom properties, so the effect stays correct if the text
or font size changes. Verify at 3 viewport widths that no word is clipped
mid-animation and nothing overflows the header.

────────────────────────────────────────────────────────────────────────
## EFFECT 2 — bidirectional infinite marquee
────────────────────────────────────────────────────────────────────────
A full-width horizontal text ribbon that drifts continuously, speeds up while
scrolling, and REVERSES direction when the user scrolls up. Place it as a band
at the bottom of the hero / between two sections. Ask me for the text if it
isn't obvious; format is "Item — Item — Item —".

Markup:
  <div class="sliderContainer">              <!-- overflow: hidden -->
    <div class="slider">                     <!-- display:flex; white-space:nowrap -->
      <p class="firstText">TEXT </p>
      <p class="secondText">TEXT </p>        <!-- exact duplicate -->
    </div>
  </div>
.secondText is position:absolute; left:100%; top:0 so the copies form one
continuous ribbon with no gap.

Type: ~15vw, font-weight 300–400, LOW contrast against the background so it
reads as texture rather than content.

Layer A — constant drift (requestAnimationFrame):
  let xPercent = 0;
  let direction = -1;
  function animate() {
    if (xPercent < -100) xPercent = 0;
    if (xPercent > 0)    xPercent = -100;
    gsap.set(firstText,  { xPercent });
    gsap.set(secondText, { xPercent });
    xPercent += 0.03 * direction;      // keep 0.03 exactly — deliberately slow
    raf = requestAnimationFrame(animate);
  }
The wrap at -100/0 is what makes it seamless. Never snap to 0.

Layer B — scroll-linked speed-up + direction flip, on the SAME element:
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(slider, {
    x: "-=500px",                       // tune
    scrollTrigger: {
      trigger: document.documentElement,
      start: 0,
      end: window.innerHeight,
      scrub: 0.25,
      onUpdate: (self) => { direction = self.direction * -1; },
    },
  });
The onUpdate line is the entire trick. scrub 0.25 gives the rubber-band lag.

Self-verify before saying it's done: read the inline transform on .slider at
scrollY 0, 400 and 800; x must decrease scrolling down and increase scrolling
up, and xPercent on both copies must always stay within [-100, 0]. Report the
actual numbers. Confirm there is never a visible gap between the two copies.

────────────────────────────────────────────────────────────────────────
## EFFECT 3 — hero image that rests tilted and straightens on hover
────────────────────────────────────────────────────────────────────────
The hero image sits permanently at rotate(3deg) and eases to rotate(0deg)
while the pointer is over it, easing back on leave. Plus a one-time entrance:
it drops in from above while unwinding from 135deg.

Entrance (once, on load):
  from { y: -700px; rotate: 135deg; opacity: 0 }
  to   { y: 0;      rotate: 3deg;   opacity: 1 }
  duration 1.2s, EASE_POP; opacity fades over just 0.05s
Hover:
  rotate: 3deg -> 0deg, duration 0.5s, EASE_SOFT, both directions.
Nothing else changes on hover — no scale, no shadow, no translate.
Transform origin = element centre.

React + framer-motion version:
  <motion.div
    initial={{ y: -700, rotate: 135, opacity: 0 }}
    animate={{ y: 0, rotate: 3, opacity: 1 }}
    transition={{ duration: 1.2, ease: EASE_POP, opacity: { duration: 0.05 } }}
    whileHover={{ rotate: 0, transition: { duration: 0.5, ease: EASE_SOFT } }}
  >

GSAP fallback (any stack):
  gsap.fromTo(el,
    { y: -700, rotate: 135, autoAlpha: 0 },
    { y: 0, rotate: 3, autoAlpha: 1, duration: 1.2,
      ease: "power2.out" /* approximate EASE_POP via CustomEase if available */ });
  el.addEventListener('mouseenter', () =>
    gsap.to(el, { rotate: 0, duration: 0.5, ease: "power2.out" }));
  el.addEventListener('mouseleave', () =>
    gsap.to(el, { rotate: 3, duration: 0.5, ease: "power2.out" }));
  (Prefer CustomEase with the exact cubic-beziers above if the project can use it.)

If the current hero image is a photo of a scene rather than a single object on
a plain background, tell me — the tilt reads badly on scenes and we should pick
a different element.

────────────────────────────────────────────────────────────────────────
## FINAL PASS (only after all three are approved)
Report as a table: any easing/duration not referencing the shared tokens, any
animation touching layout properties, any rAF loop or ScrollTrigger without
cleanup, any pointer effect missing the hover/fine-pointer or reduced-motion
guard. Fix only after I approve. Then confirm the site builds and every
pre-existing page still works.