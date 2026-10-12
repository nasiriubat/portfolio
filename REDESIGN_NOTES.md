# Portfolio — storytelling and plain experiences

## Visitor entry points

- **Interactive storytelling (default):** `https://nasiriubat.github.io/portfolio/`
- **Plain, content-first portfolio:** `https://nasiriubat.github.io/portfolio/?view=plain`
- `?view=story` is also accepted. The persistent header toggles between views.
- Both experiences share the **same CMS-managed projects/publications** and verified professional background.
- Chapter hashes work after each lazy-loaded view mounts (for example, `?view=plain#projects`).

## Design direction

The interactive view is an original warm, illustrated engineering workspace with project-specific artifacts, a question → system → evidence scroll narrative, three roomy product stories, a project index, research publications, work history, education, certifications and contact.

David Heckhoff's portfolio was an **inspiration for storytelling and craft, not a component or asset source**. No proprietary visuals or source modules were copied.

**Do not restore:** random 3D monograms, tech-brag captions, unnecessary scroll-jacking, cramped horizontal galleries, placeholder achievements, or links to private GitHub repositories.

## Architecture

| File | Purpose |
| --- | --- |
| `src/main.tsx` | Shared navigation and URL mode resolution; lazy loads one of two views |
| `src/StoryPortfolio.tsx` | Story chapter composition and live project/research mapping |
| `src/StoryStudio.tsx` | Original pointer-responsive development workspace with linked product artifacts |
| `src/StoryNarrative.tsx` | Scroll-controlled process chapter and three illustrative product workflows |
| `src/story.css` | Story's responsive visual design |
| `src/PlainPortfolio.tsx` | No-animation catalog of all verified portfolio content |
| `src/plain.css` | Plain mode's clean visual layout |
| `src/experience.css` | Global theme, accessibility and mode navigation |
| `src/content.ts` | Loads CMS project/publication JSON, deduplicates known aliases and hides private links |
| `src/PortfolioData.ts` | Experience, education, certifications and capabilities |
| `scripts/generate-pages.mjs` | Creates case-study pages and sitemap from CMS project records |
| `scripts/visual-check.mjs` | Production browser testing and visual snapshots |

The plain mode is a separate, lazy-loaded view. It doesn't require Three.js, and the superseded WebGL components have been removed.

## Content editing

Projects and publications are edited through **Pages CMS** using `.pages.yml` and JSON files in:
- `content/projects/*.json`
- `content/publications/*.json`

Editing these files on `main` triggers the Pages build. Titles, descriptions, technologies, features and workflows flow into site and case-study pages. A publication is displayed only if it has both a title and a URL. Do not claim a research output is peer-reviewed unless verified.

Illustrated workflows on the story page are **purpose-built concept illustrations**, not screenshots or fabricated product results. When genuine screenshots are ready to share, integrate them without exposing private data.

## Pre-release quality gate

`npm run build` and `npm run test:visual` must pass on the PR head. The PR workflow uploads `portfolio-visual-preview` screenshot artifacts. Review at least the desktop and mobile hero, each of the three featured projects, process interactions, research and career, and the plain view.

The automated checks cover direct Story/Plain links, actual mode switching, six viewport sizes, CV completeness, CMS content, internal case-study routes, navigation, scroll phase changes and private-link protection. Still review the browser visually before merging; a green build alone is not design approval.

## Deploy

GitHub Pages should use **GitHub Actions** as the source; the push-to-main workflow deploys `dist/`. Verify the published URL and built asset loading after merge. Preserve the `old-portfolio` backup branch.
