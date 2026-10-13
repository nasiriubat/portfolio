# Nasir Uddin Shuvo — Portfolio

Two distinct, content-complete experiences use the same verified CMS records:

- **Animated assembly story (default):** https://nasiriubat.github.io/portfolio/
- **Plain portfolio:** https://nasiriubat.github.io/portfolio/?view=plain

## Animated story

The animated portfolio tells the real story of a full-stack engineer and AI researcher through **scroll-linked transformation of content**. It does not use a character, virtual tour, cartoon objects, or WebGL.

The seven chapters have deliberately different animation languages:

1. **Introduction:** real product cards converge into a structured composition, then separate as the visitor advances.
2. **Education:** two academic documents unfold in 3D perspective, then leave the scene; certifications remain readable.
3. **Experience:** a career rail draws progressively through four verified roles and technologies.
4. **Projects:** four CMS projects (ScholarBro, NextEuroTrip, WCAG Checker, LeaveHub) each assemble from four independent parts and disassemble as the next product appears. Other projects have full case-study links.
5. **Research:** five connected stages (sources, retrieval, memory, reasoning and evaluation) move from scattered to ordered positions; real publications appear below.
6. **Expertise:** three capability cards fan out from a shared deck with the technologies listed separately.
7. **Contact:** the final email card settles into view with a copy button, email action and professional social links.

**Design:** Stripe-inspired white/ice-blue/electric-blue/navy identity, polished typography and glass-free editorial cards. The Plain view retains its previous layout/content with a color-only blue-white refresh.

## Technology and CMS

React 18 · Vite · TypeScript · Motion · Lucide; no Three.js or custom character rigs.

- `src/MotionPortfolio.tsx`: separate scroll narratives and real data-driven project panels.
- `src/motion.css`: layout, interactions, premium blue-white palette and responsive behavior.
- `src/PlainPortfolio.tsx`, `src/plain.css`: accessible text-first alternative and same CMS content.
- `src/PortfolioData.ts`: verified education, roles, expertise and certifications.
- `content/projects/*.json`, `content/publications/*.json`: editable through Pages CMS.
- `scripts/generate-pages.mjs`: generates static case-study HTML and sitemap from CMS records.
- `scripts/visual-check.mjs`: Playwright visual and functional tests.

Public links are displayed only when explicitly available and are filtered to avoid private GitHub source links. Conceptual illustrations are not presented as screenshots of products or measured performance.

## Build and release

```sh
npm install
npm run build
npm run test:visual
```

Pull requests run the production build and browser QA at 1440, 1024, 390 and 320px, capturing each major motion stage and Plain screenshots. GitHub Actions deploys `dist/` on pushes to `main` and then checks both public entrypoints.

The story respects reduced-motion settings, simplifies pinned sequences on narrow screens, and keeps a persistent Plain switch, semantic sections, direct navigation and interactive links accessible.
