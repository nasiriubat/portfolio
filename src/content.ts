export type Placement = 'spotlight' | 'card' | 'list' | 'hidden';
export type Project = {
  title: string;
  category: string;
  status: string;
  url: string;
  website?: string;
  description: string;
  summary?: string;
  featured: boolean;
  placement?: Placement;
  order?: number;
  slug: string;
  image?: string;
  features?: string[];
  workflow?: string[];
  stack?: string[];
};
export type Publication = { title: string; venue: string; year: string; url: string };

const raw = import.meta.glob('../content/projects/*.json', { eager: true, import: 'default' }) as Record<string, Omit<Project, 'slug'>>;
const papers = import.meta.glob('../content/publications/*.json', { eager: true, import: 'default' }) as Record<string, Publication>;
const aliases: Record<string, string> = { leavehub: 'leave-management', 'leave-management': 'leave-management', nexteurotrip: 'trip-planner', 'trip-planner': 'trip-planner' };
const entries = Object.entries(raw).map(([file, p]) => ({ ...p, slug: file.split('/').pop()!.replace('.json', '') }));
const preferred = new Map<string, Project>();
for (const p of entries) {
  const key = aliases[p.slug] || p.slug;
  const previous = preferred.get(key);
  if (!previous || p.description.length > previous.description.length) preferred.set(key, p);
}
export const projects = [...preferred.values()].sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title));
export const publications = Object.values(papers).filter(p => p.title && p.url);

/** Projects for one placement on the Story page, in CMS order. Projects without a placement appear as list rows. */
export function placed(where: Placement): Project[] {
  return projects
    .filter(p => (p.placement || 'list') === where)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title));
}

/** "RelayDesk — AI Support Platform" → "RelayDesk" */
export const displayTitle = (p: Project) => p.title.split(' — ')[0].trim();

export function publicLink(project: Project): string | null {
  for (const candidate of [project.website, project.url]) {
    try {
      if (!candidate) continue;
      const url = new URL(candidate);
      if (url.protocol === 'https:' && !url.hostname.endsWith('github.com')) return url.href;
    } catch { /* ignore malformed */ }
  }
  return null;
}

/** Human label for a public link: "nexteurotrip.com", "Chrome Web Store". */
export function linkLabel(href: string): string {
  const host = new URL(href).hostname.replace(/^www\./, '');
  if (host === 'chromewebstore.google.com') return 'On the Chrome Web Store';
  return host;
}

export const caseStudy = (slug: string) => import.meta.env.BASE_URL + 'projects/' + slug + '/';
