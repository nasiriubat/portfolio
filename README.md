# Nasir Uddin Shuvo — Portfolio

Two ways to explore the same portfolio:

- **3D circular journey:** https://nasiriubat.github.io/portfolio/
- **Plain content-first version:** https://nasiriubat.github.io/portfolio/?view=plain
- **Older illustrated design (legacy):** https://nasiriubat.github.io/portfolio/world-builder/

## Experience

The current journey is a miniature 3D island. A closed, curved road connects a developer studio, two universities, career offices, product exhibition, research laboratory, expertise workshop and contact station before returning home. The character follows the road, turns with the tangent and walks forward as the visitor reads and scrolls through each chapter.

An eighth chapter closes the loop at the starting point. Visitors can select any chapter through the stop selector or next/previous controls and can zoom out with **View entire loop**.

This is **real WebGL geometry**, not a CSS visual trick. It uses Three.js with a custom cartoon character, detailed station models, dynamic lighting and a follow camera.

### Content-first by design

Desktop: a full-height scrollable content column sits **beside** the 3D world.
Mobile: the world is in the upper viewport and the scrollable reading column sits **below** it.
There are no opaque floating cards layered over content. Every section is allowed its full height. Longer sections such as projects and career scroll naturally inside the reading column.

The 3D story includes:
1. Introduction, overview and working social links.
2. Both education records and expandable certifications.
3. All four employment records, descriptions and technology tags.
4. Four featured CMS projects with key features, stacks, expandable workflow descriptions, case studies and public demo links; all other CMS projects are available in an expandable catalog.
5. Research themes and linked publication records.
6. Expertise and technology capabilities.
7. Contact with email, clipboard and professional links.
8. A full-circle finale and restart.

The original Plain experience remains separate and **never requires WebGL**.

## Development

```sh
npm install
npm run dev
npm run build
npm run test:visual
npm run test:world-builder
```

Important files:

- `src/WalkWorld.ts` Closed CatmullRom road, stations, animated traveler and camera.
- `src/WalkPortfolio.tsx` Accessible story chapters and CMS-backed product content.
- `src/walk.css` Non-overlapping responsive split layout.
- `src/PlainPortfolio.tsx` Independent, static reading experience.
- `src/PortfolioData.ts` Education, experience and capabilities.
- `content/projects/*.json` CMS project data.
- `content/publications/*.json` CMS research outputs.
- `scripts/visual-check.mjs` Playwright QA across desktop, laptop, mobile and 320px, including layout separation, all chapters, project details, navigation, complete loop and plain version.

## Security and claims

Do not publish private project repository URLs. Public demo links appear only for explicitly public non-GitHub sites. Project card visuals are original conceptual art rather than screenshots or fabricated performance evidence. The Plain view remains accessible from every scene and is the default fallback when WebGL is unavailable.

## Deployment

GitHub Actions tests pull requests and produces screenshot artifacts. Merging to `main` triggers a GitHub Pages deployment. Build and browser checks must pass before a version is merged.
