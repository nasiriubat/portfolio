import React, {useEffect,useMemo,useState} from 'react';
import {ArrowDownRight,ArrowRight,ArrowUpRight,ExternalLink,Mail,MapPin,Linkedin,Github,Globe,BookOpen} from 'lucide-react';
import {projects,publications,publicLink,type Project} from './content';
import {experience,education,certifications,capabilities} from './PortfolioData';
import './plain.css';

type Filter='All'|'AI & research'|'Products'|'Tools & experiments';
const filters:Filter[]=['All','AI & research','Products','Tools & experiments'];
const classify=(p:Project):Exclude<Filter,'All'>=>{
  const category=(p.category+' '+p.slug).toLowerCase();
  if(/wcag|chrome|extension|stack|game|developer|accessibility|education|tool/.test(category))return 'Tools & experiments';
  if(/ai|agent|research|rag|thesis|memory|notebook|interview|coscribe/.test(category))return 'AI & research';
  return 'Products';
};
const projectLink=(slug:string)=>import.meta.env.BASE_URL+'projects/'+slug+'/';

function Heading({number,label,title,subtitle}:{number:string;label:string;title:string;subtitle?:string}){
 return <div className="plain-section-heading"><div className="plain-eyebrow"><span>{number}</span> {label}</div>
   <h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div>;
}
function PlainCard({p}:{p:Project}){
 const href=publicLink(p);
 return <article className="plain-project">
  <div className="plain-project-top"><span>{p.category}</span><ArrowUpRight size={20} aria-hidden="true"/></div>
  <h3>{p.title}</h3><p>{p.description}</p>
  {p.stack&&p.stack.length>0&&<div className="plain-tags">{p.stack.slice(0,3).map(t=><span key={t}>{t}</span>)}</div>}
  <div className="plain-project-links"><a href={projectLink(p.slug)}>Case study <ArrowRight size={16}/></a>
   {href&&<a href={href} target="_blank" rel="noopener noreferrer">Live product <ExternalLink size={15}/></a>}</div>
 </article>;
}
export default function PlainPortfolio(){
 useEffect(()=>{const id=decodeURIComponent(window.location.hash.slice(1));if(!id)return;
   requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));},[]);
 const [filter,setFilter]=useState<Filter>('All');
 const filtered=useMemo(()=>filter==='All'?projects:projects.filter(p=>classify(p)===filter),[filter]);
 return <main className="plain-portfolio" id="top">
  <section className="plain-hero plain-container">
   <div className="plain-availability"><span className="plain-availability-dot"/> FULL-STACK SOFTWARE DEVELOPER · AI RESEARCHER</div>
   <div className="plain-hero-body"><div><h1>Nasir Uddin<br/><span>Shuvo.</span></h1>
    <p>Software engineer and researcher at GPT Lab, Tampere University. I build full-stack applications, AI tools and intelligent systems—and work to make them more reliable.</p>
    <div className="plain-hero-social" role="group" aria-label="Profile and contact links">
     <a href="https://github.com/nasiriubat" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Github size={19}/><span>GitHub</span></a>
     <a href="https://www.linkedin.com/in/nasir-shuvo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin size={19}/><span>LinkedIn</span></a>
     <a href="mailto:dev.nasirshuvo@gmail.com" aria-label="Send email"><Mail size={19}/><span>Email</span></a>
     <a href="https://scholarbro.com" target="_blank" rel="noopener noreferrer" aria-label="ScholarBro research platform"><Globe size={19}/><span>ScholarBro</span></a>
     <a href="#research" aria-label="Research and publications"><BookOpen size={19}/><span>Research</span></a>
    </div>
    <div className="plain-actions"><a href="#projects" className="plain-button">View my work <ArrowUpRight size={19}/></a>
      <a className="plain-button-text" href="mailto:dev.nasirshuvo@gmail.com">Get in touch <ArrowUpRight size={18}/></a></div>
   </div><div className="plain-hero-aside"><p>What I work on</p>{capabilities.map(c=><div key={c.number}><strong>{c.title}</strong><small>{c.details}</small></div>)}<span><MapPin size={15}/> Tampere, Finland</span></div></div>
   <div className="plain-hero-bottom"><span>RESEARCH & ENGINEERING / SELECTED WORK</span><a href="#projects">Explore below <ArrowDownRight size={16}/></a></div>
  </section>

  <section className="plain-section plain-container" id="projects">
   <Heading number="01" label="WORK" title="Projects & products." subtitle="Selected applications, AI systems, research tools, games and extensions—each with a closer look at the work behind it."/>
   <div className="plain-filter-row" role="group" aria-label="Project filter">{filters.map(f=><button key={f} type="button" aria-pressed={filter===f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}</button>)}</div>
   <div className="plain-projects">{filtered.map(p=><PlainCard key={p.slug} p={p}/>)}</div>
  </section>

  <section className="plain-section plain-paper" id="research"><div className="plain-container">
   <Heading number="02" label="RESEARCH" title="Research & publications." subtitle="My research explores agent memory, retrieval, evaluation and the engineering of dependable AI systems."/>
   <div className="plain-interest-grid">{['Agent memory & continual learning','Retrieval-grounded applications','Reliable agent workflows','Reproducible evaluation'].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div>
   <h3 className="plain-subheading">Published & linked work</h3>
   <div className="plain-paper-list">{publications.length?publications.map((p,i)=><a key={p.title} href={p.url} rel="noopener noreferrer" target="_blank">
    <span>0{i+1}</span><div><strong>{p.title}</strong><small>{p.venue||'Research output'} · {p.year||'Year not specified'}</small></div><ExternalLink size={18}/></a>):
    <p className="plain-empty">No linked publications in the CMS yet.</p>}</div>
  </div></section>

  <section className="plain-section plain-container" id="experience">
   <Heading number="03" label="CAREER" title="Professional experience." subtitle="A progression from software engineering to applied AI systems research."/>
   <div className="plain-timeline">{experience.map((e,i)=><article key={e.organization+e.role} className="plain-job">
    <div className="plain-job-meta"><span>{String(i+1).padStart(2,'0')}</span><small>{e.period}</small></div>
    <div><h3>{e.role}</h3><strong>{e.organization}</strong><p>{e.summary}</p><div className="plain-tags">{e.technologies.map(t=><span key={t}>{t}</span>)}</div></div>
   </article>)}</div>
  </section>

  <section className="plain-section plain-education" id="education"><div className="plain-container">
   <Heading number="04" label="FOUNDATION" title="Education & continued learning."/>
   <div className="plain-degree-grid">{education.map(e=><article key={e.institution}><span>{e.period}</span><h3>{e.degree}</h3><strong>{e.institution}</strong><p>{e.place} · {e.detail}</p></article>)}</div>
   <h3 className="plain-subheading">Certifications & training</h3>
   <div className="plain-cert-grid">{certifications.map((c,i)=><div key={c}><span>{String(i+1).padStart(2,'0')}</span><strong>{c}</strong></div>)}</div>
  </div></section>

  <section className="plain-contact" id="contact"><div className="plain-container">
   <div className="plain-eyebrow">05 / CONTACT</div><h2>Have something<br/><em>in mind?</em></h2>
   <p>For a product, technical collaboration, or research conversation, feel free to get in touch.</p>
   <a href="mailto:dev.nasirshuvo@gmail.com" className="plain-button">Let's talk <Mail size={19}/></a>
   <footer><span>© {new Date().getFullYear()} Nasir Uddin Shuvo</span>
    <div><a href="https://github.com/nasiriubat" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.linkedin.com/in/nasir-shuvo" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    <a href={import.meta.env.BASE_URL+'?view=story'}>Enter the story ↗</a></div></footer>
  </div></section>
 </main>;
}
