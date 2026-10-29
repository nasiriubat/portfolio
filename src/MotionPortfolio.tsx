import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { placed, publications, displayTitle, publicLink, linkLabel, caseStudy, type Project } from './content';
import { profile, experience, education, certifications, asset } from './PortfolioData';
import {
  spotlightArt, cardArt, SpotlightFallback, CardFallback, HeroArt, eduArt, CertArt,
  ResearchArt, ContactArt, ResearchRings, ContactRings, Topo
} from './illustrations';
import './story.css';

type SectionId = 'top' | 'work' | 'experience' | 'research' | 'stack' | 'contact';
const base = import.meta.env.BASE_URL;
const mask = (m: string): React.CSSProperties => ({ WebkitMaskImage: m, maskImage: m });
const pad2 = (n: number) => String(n).padStart(2, '0');

function useStoryBehaviour() {
  const [active, setActive] = useState<SectionId>('top');
  const activeRef = useRef<SectionId>('top');
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let lastY = window.scrollY;
    let drag: { row: HTMLElement; x: number; left: number } | null = null;
    const rowA = () => document.querySelector<HTMLElement>('.mrow-a');
    const rowB = () => document.querySelector<HTMLElement>('.mrow-b');

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (!reduce && dy) {
        const a = rowA(), b = rowB();
        if (a && !a.classList.contains('drag')) a.scrollLeft += dy * 0.35;
        if (b && !b.classList.contains('drag')) b.scrollLeft -= dy * 0.35;
      }
      const limit = window.innerHeight * 0.4;
      let next: SectionId = 'top';
      (['work', 'experience', 'research', 'stack', 'contact'] as SectionId[]).forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= limit) next = id;
      });
      if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) next = 'contact';
      if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
    };
    const onDown = (e: PointerEvent) => {
      const row = (e.target as HTMLElement).closest?.('.mrow') as HTMLElement | null;
      if (!row || e.pointerType !== 'mouse') return;
      drag = { row, x: e.clientX, left: row.scrollLeft };
      row.classList.add('drag');
    };
    const onMove = (e: PointerEvent) => { if (drag) drag.row.scrollLeft = drag.left - (e.clientX - drag.x); };
    const onUp = () => { drag?.row.classList.remove('drag'); drag = null; };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    const timer = window.setTimeout(() => {
      const b = rowB();
      if (b) b.scrollLeft = (b.scrollWidth - b.clientWidth) / 2;
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) document.getElementById(id)?.scrollIntoView({ block: 'start' });
      lastY = window.scrollY;
      onScroll();
    }, 120);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      window.clearTimeout(timer);
    };
  }, []);
  return active;
}

const nudgeRows = (dir: number) =>
  document.querySelectorAll<HTMLElement>('.mrow').forEach(r => r.scrollBy({ left: dir * 320, behavior: 'smooth' }));

const Arrow = ({ d }: { d: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d}></path></svg>
);
const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

function ProjectLinks({ p }: { p: Project }) {
  const live = publicLink(p);
  return (
    <div className="s-links-row">
      <a href={caseStudy(p.slug)}>Case study →</a>
      {live && <a href={live} target="_blank" rel="noopener noreferrer">{linkLabel(live)} ↗</a>}
    </div>
  );
}

function Spotlight({ p, index }: { p: Project; index: number }) {
  const Art = spotlightArt[p.slug];
  const visual = <div className="fvis">{Art ? <Art /> : <SpotlightFallback title={displayTitle(p)} />}</div>;
  const copy = (
    <div className="rv s-spot-copy">
      <span className="eb">{p.category}</span>
      <h3>{displayTitle(p)}</h3>
      <p className="s-desc">{p.summary || p.description}</p>
      {p.stack && p.stack.length > 0 && <div className="chips">{p.stack.slice(0, 5).map(t => <span className="chip" key={t}>{t}</span>)}</div>}
      <ProjectLinks p={p} />
    </div>
  );
  return <article className="scene frow">{index % 2 === 0 ? <>{copy}{visual}</> : <>{visual}{copy}</>}</article>;
}

function ProjectCard({ p }: { p: Project }) {
  const Art = cardArt[p.slug];
  return (
    <article className="card rv s-card">
      <div className="s-card-art">{Art ? <Art /> : <CardFallback />}</div>
      <div className="s-card-body">
        <span className="eb eb-sm">{p.category}</span>
        <h3>{displayTitle(p)}</h3>
        <p>{p.summary || p.description}</p>
        {p.stack && p.stack.length > 0 && <div className="chips-sm">{p.stack.slice(0, 3).map(t => <span className="chipg" key={t}>{t}</span>)}</div>}
        <ProjectLinks p={p} />
      </div>
    </article>
  );
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

function useCopyEmail(email: string) {
  const [toast, setToast] = useState('');
  const timer = useRef<number>();
  const copy = useCallback(async () => {
    const ok = await copyText(email);
    setToast(ok ? 'Email copied: ' + email : 'Copy failed. The address is ' + email);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(''), 2600);
  }, [email]);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return { toast, copy };
}

function SocialIcons({ onCopy, copied }: { onCopy: () => void; copied: boolean }) {
  return (
    <div className="s-socials">
      <button type="button" className="s-icon" onClick={onCopy} aria-label={'Copy email address ' + profile.email} title="Copy email">
        {copied ? <Check size={20} aria-hidden="true" /> : <Mail size={20} aria-hidden="true" />}
      </button>
      <a className="s-icon" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub"><Github size={20} aria-hidden="true" /></a>
      <a className="s-icon" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn"><Linkedin size={20} aria-hidden="true" /></a>
    </div>
  );
}

export default function StoryPortfolio() {
  const active = useStoryBehaviour();
  const { toast, copy } = useCopyEmail(profile.email);
  const copied = toast.startsWith('Email copied');
  const on = (id: SectionId) => (active === id ? 'on' : '');
  const spotlights = placed('spotlight');
  const cards = placed('card');
  const rows = placed('list');
  const photo = asset(profile.photo);
  const firstName = profile.name;

  return (
    <div className="pf" id="top">
      <header className="s-header">
        <nav className="wrap s-nav" aria-label="Main">
          <a href={base} className="s-logo">{firstName}<span>.</span></a>
          <div className="s-links">
            <a className={'navl ' + on('work')} href="#work">Work</a>
            <a className={'navl ' + on('experience')} href="#experience">Experience</a>
            <a className={'navl ' + on('research')} href="#research">Research</a>
            <a className={'navl ' + on('stack')} href="#stack">Stack</a>
          </div>
          <div className="s-right">
            <div className="s-switch" role="group" aria-label="Portfolio view">
              <a className="on" href={base} aria-current="page">Story</a>
              <a href={base + '?view=plain'}>Plain</a>
            </div>
            <a className="btn-p" href="#contact">Get in touch</a>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="wrap s-hero iso">
          <div className="decor dots" aria-hidden="true" style={{ inset: '-40px -400px 0 -400px', ...mask('radial-gradient(ellipse 34% 62% at 66% 46%, #000 0%, transparent 72%)') }}></div>
          <div className="s-hero-copy">
            <span className="eb">{profile.role} · {profile.location}</span>
            <h1>{profile.headline} <span>{profile.headlineAccent}</span></h1>
            <p className="s-intro">{profile.intro}</p>
            <div className="s-actions">
              <a className="btn-p" href="#work">See selected work <Arrow d="M5 12h14M13 6l6 6-6 6" /></a>
              <a className="btn-s" href="#contact">Get in touch</a>
            </div>
            <div className="s-hero-social">
              <SocialIcons onCopy={copy} copied={copied} />
              <span className="s-email-text mono">{profile.email}</span>
            </div>
            {profile.status && <div className="s-status"><i></i><span>{profile.status}</span></div>}
          </div>
          <HeroArt photo={photo} name={profile.name} />
        </section>

        {/* WORK */}
        <section id="work" className="wrap sec s-work iso">
          <div className="decor plx" aria-hidden="true" style={{ left: -330, top: 260, width: 620, height: 620 }}><Topo seed={0.6} /></div>
          <div className="decor plx2" aria-hidden="true" style={{ right: -360, top: 1500, width: 620, height: 620 }}><Topo seed={2.1} /></div>
          <div className="decor plx" aria-hidden="true" style={{ left: -300, top: 2700, width: 560, height: 560 }}><Topo seed={4} rings={8} size={560} /></div>
          <div className="rv s-head">
            <span className="eb">Selected work</span>
            <h2 className="s-h2">Products, research tools and AI systems I've built.</h2>
          </div>
          {spotlights.map((p, i) => <Spotlight key={p.slug} p={p} index={i} />)}
        </section>

        {/* MORE PROJECTS */}
        {(cards.length > 0 || rows.length > 0) && (
          <section className="wrap sec s-more iso">
            <div className="decor gridl" aria-hidden="true" style={{ inset: '0 -400px 0 -400px', ...mask('radial-gradient(ellipse 40% 45% at 78% 18%, #000 0%, transparent 70%)') }}></div>
            <div className="rv s-head">
              <span className="eb">More projects</span>
              <h2 className="s-h2-sm">Games, extensions, platforms and tools.</h2>
            </div>
            {cards.length > 0 && <div className="s-cards">{cards.map(p => <ProjectCard key={p.slug} p={p} />)}</div>}
            {rows.length > 0 && (
              <div className="rv s-list">
                {rows.map(p => (
                  <a className="prow" key={p.slug} href={caseStudy(p.slug)}>
                    <strong>{displayTitle(p)}</strong>
                    <span>{p.summary || p.description}</span>
                    <small className="mono">{(p.stack || []).slice(0, 3).join(' · ')}</small>
                  </a>
                ))}
              </div>
            )}
          </section>
        )}

        {/* EXPERIENCE */}
        <section id="experience" className="s-exp">
          <svg className="decor" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ left: 0, top: -1, width: '100%', height: 80 }} aria-hidden="true"><path d="M0 0 H1440 V22 C1120 78 420 6 0 52 Z" fill="#fbfbfa"></path></svg>
          <svg className="decor" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ left: 0, bottom: -1, width: '100%', height: 80 }} aria-hidden="true"><path d="M0 80 V40 C380 4 1060 74 1440 26 V80 Z" fill="#fbfbfa"></path></svg>
          <div className="decor dots" aria-hidden="true" style={{ inset: 0, ...mask('radial-gradient(ellipse 30% 40% at 88% 22%, #000 0%, transparent 70%)') }}></div>
          <div className="decor plx2" aria-hidden="true" style={{ left: -280, top: '46%', width: 560, height: 560 }}><Topo seed={5.2} rings={8} size={560} /></div>
          <div className="wrap sec s-exp-inner">
            <div className="rv s-head">
              <span className="eb">Experience</span>
              <h2 className="s-h2">From building features to researching systems.</h2>
              <p className="s-lead">Every role shaped how I think about software: build it well, understand its limits, and make it useful.</p>
            </div>
            <div className="tl">
              <div className="tlr"></div>
              <div className="tlr rail"></div>
              <ol>
                {experience.map((e, i) => (
                  <li className="rv" key={e.role + e.organization + e.period}>
                    <span className={'mono tlm' + (i === 0 ? ' first' : '')}>{pad2(i + 1)}</span>
                    <div className="job">
                      <div className="mono job-meta"><b>{e.period}</b><span>{e.location}</span></div>
                      <h3>{e.role}</h3>
                      <strong>{e.organization}</strong>
                      <p>{e.summary}</p>
                      <div className="chips-sm">{e.technologies.map(t => <span className="chipg" key={t}>{t}</span>)}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="s-edu">
              {education.map((e, i) => {
                const Art = eduArt[i % eduArt.length];
                return (
                  <article key={e.degree} className={'card s-card unfold' + (i % 2 ? ' uf2' : '')}>
                    <div className="s-edu-art"><Art /></div>
                    <div className="s-card-body">
                      <span className="eb eb-sm">Education · {e.period}</span>
                      <h3>{e.degree}</h3>
                      <span style={{ color: 'var(--muted)' }}>{e.institution}, {e.place} · {e.detail}</span>
                      {e.url && <div className="s-links-row"><a href={e.url} target="_blank" rel="noopener noreferrer">{new URL(e.url).hostname.replace(/^www\./, '')} ↗</a></div>}
                    </div>
                  </article>
                );
              })}
            </div>

            {certifications.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div className="rv s-head" style={{ gap: 10 }}>
                  <span className="eb">Certifications</span>
                  <h3 style={{ fontSize: 28 }}>Always learning. Always iterating.</h3>
                </div>
                <div className="s-certs">
                  {certifications.map((c, i) => (
                    <article className="card rv s-card" key={c.title}>
                      <div className="s-cert-art"><CertArt n={pad2(i + 1)} float={(i % 6) + 1} /></div>
                      <div className="s-card-body">
                        <h3>{c.title}</h3>
                        {c.issuer && <span className="mono" style={{ fontSize: 12, color: 'var(--dim)' }}>{c.issuer}</span>}
                        {c.url && <div className="s-links-row"><a href={c.url} target="_blank" rel="noopener noreferrer">View certificate ↗</a></div>}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research" className="wrap sec s-research scene iso">
          <div className="decor" aria-hidden="true" style={{ left: -160, top: 20, width: 600, height: 600 }}><ResearchRings /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div className="rv s-head">
              <span className="eb">Research</span>
              <h2 className="s-h2">{profile.researchTitle}</h2>
              <p className="s-lead">{profile.researchText}</p>
            </div>
            <ResearchArt />
          </div>
          <div className="s-pubs">
            {publications.map((p, i) => (
              <a className="card rv pub" key={p.title} href={p.url} target="_blank" rel="noopener noreferrer">
                <span className="mono" style={{ fontSize: 12, color: 'var(--accent)', paddingTop: 4 }}>{pad2(i + 1)}</span>
                <span className="pub-text"><strong>{p.title}</strong><span className="mono" style={{ fontSize: 12, color: 'var(--dim)' }}>{[p.venue, p.year].filter(Boolean).join(' · ')}</span></span>
                <span aria-hidden="true" style={{ color: 'var(--accent)' }}>↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="s-stack">
          <svg className="decor" viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ left: 0, top: -1, width: '100%', height: 70, zIndex: 0 }} aria-hidden="true"><path d="M0 0 H1440 V14 C1000 70 440 70 0 14 Z" fill="#fbfbfa"></path></svg>
          <svg className="decor" viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ left: 0, bottom: -1, width: '100%', height: 70, zIndex: 0 }} aria-hidden="true"><path d="M0 70 V30 C460 -6 980 -6 1440 30 V70 Z" fill="#f3f4f6"></path></svg>
          <div className="decor dots-dk" aria-hidden="true" style={{ inset: 0, ...mask('radial-gradient(ellipse 50% 70% at 50% 50%, #000 0%, transparent 75%)') }}></div>
          <div className="wrap rv" style={{ width: '100%', paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="eb">Tools and technologies</span>
            <div className="s-stack-head">
              <h2 className="s-h2-sm">Full-stack, intelligent systems, reliability.</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="mono swhint" style={{ fontSize: 12, color: '#9aa6c6' }}>Swipe or drag</span>
                <button type="button" className="arw" aria-label="Scroll tools left" onClick={() => nudgeRows(-1)}><Arrow d="M15 6l-6 6 6 6" /></button>
                <button type="button" className="arw" aria-label="Scroll tools right" onClick={() => nudgeRows(1)}><Arrow d="M9 6l6 6-6 6" /></button>
              </div>
            </div>
          </div>
          <div className="mrow mrow-a" role="list" aria-label="Languages, frameworks and databases" tabIndex={0}>
            {profile.skillsPrimary.map((s, i) => <span role="listitem" key={s} className={i === 7 ? 'hl' : ''}>{s}</span>)}
          </div>
          <div className="mrow mrow-b" role="list" aria-label="AI and infrastructure tools" tabIndex={0}>
            {profile.skillsSecondary.map((s, i) => <span role="listitem" key={s} className={i === 1 ? 'hl2' : ''}>{s}</span>)}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="s-contact scene">
          <div className="decor dots" aria-hidden="true" style={{ inset: 0, ...mask('radial-gradient(ellipse 36% 60% at 76% 50%, #000 0%, transparent 72%)') }}></div>
          <div className="decor" aria-hidden="true" style={{ right: -220, top: -160, width: 620, height: 620 }}><ContactRings /></div>
          <div className="wrap sec s-contact-grid">
            <div className="rv" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <span className="eb">Let's connect</span>
              <h2>{profile.contactTitle}</h2>
              <p className="s-lead" style={{ maxWidth: '32em' }}>{profile.contactText}</p>
              <div className="s-email-box">
                <span className="s-email-text s-email-lg">{profile.email}</span>
                <button type="button" className="btn-p" onClick={copy}>
                  {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy email'}
                </button>
              </div>
              <div className="s-contact-links">
                <SocialIcons onCopy={copy} copied={copied} />
                <a href={'mailto:' + profile.email}>Or write an email ↗</a>
              </div>
            </div>
            <div style={{ position: 'relative', height: 300 }} aria-hidden="true"><ContactArt /></div>
          </div>
        </section>
      </main>

      <footer className="s-footer">
        <div className="wrap">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="s-email-text">{profile.email}</span>
          <a href={base + '?view=plain'}>Plain view</a>
        </div>
      </footer>

      <div className={'s-toast' + (toast ? ' show' : '')} role="status" aria-live="polite">
        {toast && <><Check size={16} aria-hidden="true" />{toast}</>}
      </div>

      <nav className="bnav" aria-label="Section navigation">
        <a className={on('top')} href="#top"><Icon><path d="m3 11 9-7 9 7"></path><path d="M5 10v10h14V10"></path></Icon><span>Home</span></a>
        <a className={on('work')} href="#work"><Icon><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></Icon><span>Work</span></a>
        <a className={on('experience')} href="#experience"><Icon><path d="M12 8v4l3 2"></path><circle cx="12" cy="12" r="9"></circle></Icon><span>Journey</span></a>
        <a className={on('research')} href="#research"><Icon><path d="M4 19.5V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-1.5z"></path><path d="M8 7h6"></path></Icon><span>Research</span></a>
        <a className={on('contact')} href="#contact"><Icon><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></Icon><span>Contact</span></a>
      </nav>
    </div>
  );
}
