# Pages CMS

Open https://pagescms.org/ and connect GitHub repository `nasiriubat/portfolio`. `.pages.yml` defines three editors; every save commits to `main`, which rebuilds and redeploys the site.

- **Profile & career** (`content/site.json`): name, headline, intro, portrait, email and social links, experience, education, certifications (with certificate links), the two tools rows, and the research/contact copy.
- **Projects** (`content/projects/*.json`): each project has a **Placement** on the Story page — `spotlight` (large row with its own drawing), `card`, `list` or `hidden` — and an **Order** within that placement. **Short summary** is used on cards and list rows (falls back to Description). **Public website** adds a live link (GitHub links are never shown publicly).
- **Publications** (`content/publications/*.json`).

New projects get a generic drawing. Custom drawings live in `src/illustrations.tsx`, keyed by the project's file name (slug).

Upload images through the CMS media library (`public/images`). Do not place credentials in the repository.
