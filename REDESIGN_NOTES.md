# Creative direction — Scroll Assembly Portfolio

## User-approved direction
- **No characters, robots, roads or fictional dioramas.** The content itself moves.
- **White, blue and navy.** No beige, sepia or newspaper palette.
- **Purposeful motion:** cards assemble as visitors scroll, settle for reading, and disassemble before the next chapter.
- Different composition and motion behavior per section rather than repeated fades.
- Plain portfolio remains a standalone complete reading view with identical CMS content.

## Animation sequence
Hero / convergence → education / hinged documents → career / growing rail →
products / four-part assembly, hold and breakup per project →
research / connected five-stage system → services / fan-out deck →
contact / resolved communication card.

Desktop scroll is scrubbed through Motion's `useScroll` and `useTransform`; mobile and reduced-motion modes preserve complete content and avoid pinned long-form reading.

## Quality and content policy
Inspect desktop/mobile screenshots for overlaps and clipped content. Run `npm run build` and `npm run test:visual`; test actual scroll states, links, case studies, CMS consistency and copy-email. Never claim working behavior from visual placeholders. Do not link private source repos or invent academic publications.

The old character-led 3D road and legacy World Builder illustration files are deliberately removed.
