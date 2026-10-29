// Profile, career, education, certifications and skills are edited in Pages CMS
// ("Profile & career" → content/site.json). This module only gives them types.
import site from '../content/site.json';

export type CareerEntry = {
  role: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  technologies: string[];
};
export type EducationEntry = {
  degree: string;
  institution: string;
  place: string;
  period: string;
  detail: string;
  url?: string;
};
export type Certification = { title: string; issuer?: string; url?: string };
export type Capability = { title: string; details: string };

export type SiteProfile = {
  name: string;
  role: string;
  location: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  status: string;
  photo: string;
  email: string;
  github: string;
  linkedin: string;
  researchTitle: string;
  researchText: string;
  contactTitle: string;
  contactText: string;
  capabilities: Capability[];
  experience: CareerEntry[];
  education: EducationEntry[];
  certifications: Certification[];
  skillsPrimary: string[];
  skillsSecondary: string[];
};

export const profile = site as SiteProfile;
export const experience: CareerEntry[] = profile.experience ?? [];
export const education: EducationEntry[] = profile.education ?? [];
export const certifications: Certification[] = profile.certifications ?? [];
export const capabilities = (profile.capabilities ?? []).map((c, i) => ({
  number: String(i + 1).padStart(2, '0'),
  title: c.title,
  details: c.details
}));

/** Resolve a CMS media path ("/images/x.webp") against the site base ("/portfolio/"). */
export function asset(path: string | undefined): string {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '');
}
