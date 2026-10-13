# Portfolio redesign notes

## Current primary experience

The homepage and `?view=story` now render a **genuine WebGL Three.js walkthrough**, not the older flat illustrated World Builder. The character is a deliberately cartoonish miniature and walks between seven themed 3D dioramas. React/Motion handle chapter transitions. Scroll controls both the character's world position and camera; the chapter rail and previous/next buttons offer alternatives to scrolling.

- Live homepage: `https://nasiriubat.github.io/portfolio/`
- Plain view: `https://nasiriubat.github.io/portfolio/?view=plain`
- Former illustrated design retained: `https://nasiriubat.github.io/portfolio/world-builder/`

The separate **Plain** view uses the same CMS data without WebGL. The 3D experience includes WebGL fallback and reduced-motion support. Links, featured project dialogs, research, education, career and contact are backed by existing verified content.

## Design and accessibility

The 3D world is a miniature explorable scene rather than a photo or video backdrop. It uses real Three.js mesh geometry, lighting, shadows, islands and a simple skeletal-like animated cartoon body. It is intentionally not a high-poly rigged character model. The camera follows scroll progress but does not trap scroll or disable normal browser navigation.

The walkthrough is an optional enhancement to the content-first Plain view. Key information and all projects are available in Plain even if the browser cannot render WebGL.

## Content and verification

CMS project files are under `content/projects/*.json`, and publications under `content/publications/*.json`. The same source data is used by the main React pages and generated case-study pages. Keep project information accurate and avoid exposing private repositories.

Pre-release checks: `npm run build`, `npm run test:visual` and `npm run test:world-builder`. Inspect screenshot artifacts and verify the public GitHub Pages URL after merging. See `README.md` for development and architecture details.

## Older components

The old React story components (`StoryPortfolio.tsx`, `StoryStudio.tsx`, `StoryNarrative.tsx`) remain in the repository for reference but are no longer routed. `public/world-builder/` remains available at its legacy path. The Plain view remains independently maintained.
