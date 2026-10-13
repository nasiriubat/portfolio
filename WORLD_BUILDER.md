# World Builder / portfolio

The interactive World Builder experience is served from `/portfolio/world-builder/`; the original React **Plain** version remains `/portfolio/?view=plain`.

## Build
`npm run build` runs `scripts/generate-pages.mjs`, then `scripts/sync-worldbuilder-cms.mjs`, then TypeScript + Vite.
The CMS bridge reads `content/projects/*.json` and `content/publications/*.json`, deduplicates known aliases, and generates `public/world-builder/assets/content-data.json`. Both portfolio experiences share the same editable CMS data.

## QA
`npm run test:world-builder` uses Playwright Chromium to check 1440, 1024, 390, and 320 pixel widths, seven chapters, image loading, overflow, project detail dialog, filters, tabs, navigation, copy-email, published CMS, and Plain view. Screenshots are attached to PR workflow artifacts at `preview/world-builder/`. The normal `npm run test:visual` remains unchanged.

## Design / technical fidelity
This character-driven experience uses original flat illustration plus CSS perspective, layered scroll choreography, and interactive HTML. It is not a skeletal 3D character rig. The blue-white design is an original composition, taking inspiration from premium digital product sites. No screenshots of private products or private repository links are exposed.

## Deploy
GitHub Actions uploads Vite's dist folder, including `public/world-builder`. The standalone story link is `https://nasiriubat.github.io/portfolio/world-builder/`, while Plain remains at `https://nasiriubat.github.io/portfolio/?view=plain`. Confirm GitHub Pages deployment status after merging before advertising the URL.
