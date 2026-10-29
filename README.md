# Nasir Uddin Shuvo — Portfolio

Two distinct, content-complete experiences use the same verified CMS records:

- **Animated assembly story (default):** https://nasiriubat.github.io/portfolio/
- **Plain portfolio:** https://nasiriubat.github.io/portfolio/?view=plain

## Story view (default)

A light, single-page story with scroll-linked motion (CSS scroll timelines, no animation library):

1. **Hero:** portrait and floating product chips assemble on load and drift apart as you scroll.
2. **Selected work:** spotlight projects, each with its own SVG drawing that assembles from fragments as it scrolls in.
3. **More projects:** cards with looping illustrations, then a compact list.
4. **Experience:** a timeline rail that draws itself, education cards that fold up, linked certificates.
5. **Research:** publications from the CMS beside an animated research pipeline.
6. **Stack:** two rows of tools you can swipe, drag or move with arrows; they also drift as the page scrolls.
7. **Contact:** email, GitHub and LinkedIn.

Phones get a bottom navigation bar that follows the current section. Browsers without scroll timelines (and visitors who prefer reduced motion) see the finished, static layout.

## Technology and CMS

React 18 · Vite · TypeScript · Lucide (Plain view icons).

- `src/MotionPortfolio.tsx`: the Story view, rendered entirely from CMS data.
- `src/illustrations.tsx`: per-project SVG drawings (keyed by project slug) with generic fallbacks for new projects.
- `src/story.css`: Story layout, motion and responsive rules.
- `src/PlainPortfolio.tsx`, `src/plain.css`: accessible text-first alternative and same CMS content.
- `content/site.json`: profile, experience, education, certifications, skills (Pages CMS → "Profile & career").
- `content/projects/*.json`, `content/publications/*.json`: editable through Pages CMS.
- `src/PortfolioData.ts`, `src/content.ts`: typed access to the CMS JSON.
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
