# Legacy World Builder

This is a **previous illustration-based portfolio**, intentionally preserved at `/portfolio/world-builder/` for comparison and rollback. It is not the default homepage. The default `/portfolio/` now opens the real Three.js walkthrough in React.

The legacy static files live in `public/world-builder/`. The build's CMS bridge still generates `public/world-builder/assets/content-data.json` from project and publication records. Its Playwright test remains available through `npm run test:world-builder`.

The Plain portfolio is accessible at `/portfolio/?view=plain`. For the new 3D experience, see `README.md`, `src/WalkPortfolio.tsx` and `src/WalkWorld.ts`.
