# Nasir Uddin Shuvo — Portfolio

An interactive, scroll-controlled Three.js journey with a separate, content-first portfolio for visitors who prefer a conventional site.

## Visitor routes

- **3D journey:** [nasiriubat.github.io/portfolio/](https://nasiriubat.github.io/portfolio/)
- **Plain portfolio:** [nasiriubat.github.io/portfolio/?view=plain](https://nasiriubat.github.io/portfolio/?view=plain)
- **Previous illustrated version:** [nasiriubat.github.io/portfolio/world-builder/](https://nasiriubat.github.io/portfolio/world-builder/). Retained as a reference, not the default experience.

The 3D experience features seven chapters: Introduction, Education, Experience, Projects, Research, Expertise, and Contact. Scroll or use the numbered chapter rail to navigate. Every chapter uses actual Three.js geometry and a cartoon traveler that follows the path. The story UI includes animated transitions via Motion.

The Plain version is a separate lazy-loaded React view and does not load Three.js. The 3D view provides a WebGL failure fallback and a direct Plain link for accessibility.

## Local development

```sh
npm install
npm run dev
```

The Vite app is hosted under `/portfolio/`, including in local preview.

```sh
npm run build
npm run test:visual
npm run test:world-builder
```

`test:visual` validates the Plain and current 3D versions, including scroll navigation, links, responsiveness, and project dialogs. `test:world-builder` validates the retained, separate legacy version.

## How to edit content

Project and publication JSON files are edited using Pages CMS or directly:

- `content/projects/*.json`
- `content/publications/*.json`

The React experiences use `src/content.ts`, with `src/PortfolioData.ts` for education, career and capabilities. Do not put private repository URLs in public content.

## Key files

| File | Purpose |
| --- | --- |
| `src/WalkWorld.ts` | Three.js 3D world, scenery, toon traveler, animation and camera |
| `src/WalkPortfolio.tsx` | Scroll-driven chapters and content interactions |
| `src/walk.css` | 3D journey panels and responsive styling |
| `src/PlainPortfolio.tsx` | Independent content-first experience |
| `src/main.tsx` | Routes / modes and lazy loading |
| `scripts/generate-pages.mjs` | Static project case studies and sitemap |
| `public/world-builder/` | Previous illustrated version, preserved |

## Deployment

GitHub Actions builds and deploys the site to GitHub Pages on a push to `main`. Pull requests run the build, browser tests, and screenshot generation. Review both desktop and mobile images before release.

Site uses GitHub Pages, so no server or paid hosting is required.
