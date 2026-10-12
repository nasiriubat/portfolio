import React,{useRef,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion,useScroll,useSpring,useTransform} from 'motion/react';
import {ArrowDown,ArrowRight,ArrowUpRight,BookOpen,Check,Code2,ExternalLink,Mail,MapPin,MousePointer2} from 'lucide-react';
import {projects,publications,publicLink,type Project} from './content';
import {certifications,education,experience} from './PortfolioData';
import StoryStudio from './StoryStudio';
import {ProcessChapter,ProductIllustration,type IllustrationKind} from './StoryNarrative';
import './story.css';

const featured: {slug:IllustrationKind;title:string;eyebrow:string;lead:string;detail:string;accent:string}[]=[
 {slug:'scholarbro',title:'ScholarBro',eyebrow:'RESEARCH DISCOVERY',lead:'Follow ideas, not just papers.',detail:'Discover academic work and follow the topics that matter to you. Research should reward curiosity, not demand endless searching.',accent:'A'},
 {slug:'trip-planner',title:'NextEuroTrip',eyebrow:'TRAVEL TECHNOLOGY',lead:'Turn places into a journey.',detail:'A practical trip planner that balances the excitement of discovery with sensible routes, days, and decisions.',accent:'B'},
 {slug:'wcag-checker',title:'WCAG Checker',eyebrow:'ACCESSIBILITY ENGINEERING',lead:'Help make the web work for more people.',detail:'An accessibility auditing tool that finds issues, explains their impact, and helps turn findings into better interfaces.',accent:'C'}
];
const storyProjectLink=(slug:string)=>import.meta.env.BASE_URL+'projects/'+slug+'/';
const revealEase=[.22,1,.36,1] as const;

function Reveal({children,className='',delay=0}:{children:React.ReactNode;className?:string;delay?:number}){
 const reduced=useReducedMotion();
 return <motion.div className={className}
  initial={reduced?false:{opacity:0,y:38}}
  whileInView={reduced?undefined:{opacity:1,y:0}}
  viewport={{once:true,amount:.16}}
  transition={{duration:.78,delay,ease:revealEase}}>{children}</motion.div>;
}
function StageLabel({number,text}:{number:string;text:string}){
 return <div className="story-label"><span className="label-number">{number}</span><span className="label-rule"/>{text}</div>;
}

function Introduction(){
 const reduced=useReducedMotion();
 const ref=useRef<HTMLElement>(null);
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
 const textLift=useTransform(scrollYProgress,[0,1],[0,-47]);
 return <section className="story-hero" id="start" ref={ref}>
  <div className="story-hero-grid"/>
  <div className="story-hero-inner story-container">
   <motion.div className="story-hero-copy" style={reduced?undefined:{y:textLift}}>
    <Reveal><div className="hero-label"><span className="hello-dot"/> FULL-STACK DEVELOPER & AI RESEARCHER <span className="hero-location-small"><MapPin size={13}/> TAMPERE</span></div></Reveal>
    <h1 className="story-hero-title">
      {['Hi, I’m','Nasir.'].map((line,i)=><span className="hero-title-window" key={line}>
       <motion.span initial={reduced?false:{y:'110%',opacity:0}} animate={{y:'0%',opacity:1}}
        transition={{delay:.13+i*.17,duration:.95,ease:revealEase}} className={i===1?'hero-name-line':''}>{line}</motion.span>
      </span>)}
    </h1>
    <Reveal delay={.22}><p className="hero-main-claim">I turn complex ideas into<br/><strong>useful software.</strong></p></Reveal>
    <Reveal delay={.32}><p className="hero-intro-text">I build full-stack products and research AI systems at GPT Lab, Tampere University. My work lives somewhere between curiosity, engineering, and making things actually work.</p></Reveal>
    <Reveal delay={.41}><div className="hero-actions">
      <a href="#approach" className="story-button story-button-primary">Explore my story <ArrowDown size={18}/></a>
      <a href={import.meta.env.BASE_URL+'?view=plain'} className="story-subtle-link">Prefer the plain portfolio? <ArrowUpRight size={17}/></a>
    </div></Reveal>
    <Reveal delay={.53}><div className="hero-personal-note"><span className="note-squiggle">✳</span><span>4+ years in software engineering. Still finding new things worth building.</span></div></Reveal>
   </motion.div>
   <motion.div className="story-hero-art" initial={reduced?false:{opacity:0,scale:.91,x:42}}
     animate={{opacity:1,scale:1,x:0}} transition={{duration:1.3,delay:.35,ease:revealEase}}>
     <StoryStudio/>
   </motion.div>
  </div>
  <a href="#approach" className="hero-scroll-prompt"><span>SCROLL TO EXPLORE</span><span className="scroll-prompt-line"/></a>
 </section>;
}

function ChapterTransition(){
 const ref=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const x=useTransform(scrollYProgress,[0,1],['4%','-13%']);
 return <div className="story-divider" ref={ref} aria-label="A portfolio about building, researching and learning">
  <motion.div style={reduced?undefined:{x}}>BUILD <span>✳</span> QUESTION <span>✳</span> RESEARCH <span>✳</span> IMPROVE <span>✳</span> BUILD</motion.div>
 </div>;
}
function WorkChapter(){
 const reduced=useReducedMotion();
 return <section className="story-work" id="work">
  <div className="story-container work-intro">
   <Reveal><StageLabel number="02" text="THE WORK"/></Reveal>
   <Reveal><h2>Some ideas deserve<br/><em>to become real.</em></h2></Reveal>
   <Reveal><p>Here are three different problems I chose to work on, each demanding a different kind of engineering.</p></Reveal>
  </div>
  <div className="story-feature-list">{featured.map((item,i)=>{
   const p=projects.find(p=>p.slug===item.slug);
   return <article className={'story-feature feature-'+item.slug} key={item.slug}>
    <div className="story-container feature-stage">
     <Reveal className="feature-description">
      <div className="feature-kicker"><span>0{i+1} / 03</span><span>{item.eyebrow}</span></div>
      <h3>{item.title}</h3><strong className="feature-lead">{item.lead}</strong>
      <p>{item.detail}</p>
      <div className="feature-chips">
       {(p?.stack||[]).slice(0,3).map(v=><span key={v}>{v}</span>)}
      </div>
      <div className="feature-actions">
       <a href={storyProjectLink(item.slug)} className="feature-case">Explore case study <ArrowUpRight size={18}/></a>
       {p&&publicLink(p)&&<a href={publicLink(p)!} target="_blank" rel="noopener noreferrer" className="feature-live">Visit product ↗</a>}
      </div>
     </Reveal>
     <motion.div className="feature-art-wrap"
      initial={reduced?false:{opacity:.65,y:55,scale:.95}}
      whileInView={reduced?undefined:{opacity:1,y:0,scale:1}}
      viewport={{once:true,amount:.23}} transition={{duration:1.1,ease:revealEase}}>
      <ProductIllustration kind={item.slug}/>
     </motion.div>
    </div>
   </article>;
  })}</div>
 </section>;
}

function MoreWork(){
 const [expanded,setExpanded]=useState(false);
 const reduced=useReducedMotion();
 const others=projects.filter(p=>!featured.some(f=>f.slug===p.slug));
 const shown=expanded?others:others.slice(0,6);
 return <section className="story-project-index story-container" id="projects">
  <Reveal><StageLabel number="02.1" text="OTHER EXPERIMENTS & PRODUCTS"/></Reveal>
  <Reveal><div className="additional-work-header"><h2>And a few more<br/>things I've made.</h2><p>A collection of full-stack builds, agent experiments, developer tools and smaller ideas worth exploring.</p></div></Reveal>
  <motion.div className="additional-project-grid" layout={!reduced}>
   <AnimatePresence initial={false}>{shown.map((p,i)=><motion.article key={p.slug} layout={!reduced}
    initial={reduced?false:{opacity:0,y:30,scale:.97}} animate={{opacity:1,y:0,scale:1}}
    exit={reduced?undefined:{opacity:0,y:-10}} transition={{duration:.45,delay:Math.min(i%3,2)*.04}}>
    <a href={storyProjectLink(p.slug)} className="additional-project-link">
     <span className="additional-project-icon">{p.title.charAt(0)}</span>
     <span className="additional-project-type">{p.category}</span>
     <strong>{p.title}</strong><span className="additional-project-desc">{p.description}</span>
     <span className="additional-project-footer">CASE STUDY <ArrowUpRight size={19}/></span>
    </a>
   </motion.article>)}</AnimatePresence>
  </motion.div>
  <Reveal><div className="more-project-actions">{others.length>6&&<button type="button" className="story-button story-button-outline" onClick={()=>setExpanded(v=>!v)} aria-expanded={expanded}>
    {expanded?'Show fewer projects':`Show all ${others.length} projects`} <ArrowRight size={17}/>
   </button>}<a href={import.meta.env.BASE_URL+'?view=plain#projects'} className="story-subtle-link">Browse in plain view <ArrowUpRight size={18}/></a></div></Reveal>
 </section>;
}

function ResearchChapter(){
 const ref=useRef<HTMLElement>(null);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const parallax=useTransform(scrollYProgress,[0,1],[-37,39]);
 const topics=[
  {name:'Grounding',short:'Retrieval, RAG and trustworthy sources',icon:<BookOpen size={21}/>},
  {name:'Memory',short:'What intelligent systems remember—and forget',icon:<Code2 size={21}/>},
  {name:'Reliability',short:'Evaluation, robustness and failure analysis',icon:<Check size={21}/>}
 ];
 return <section className="story-research" id="research" ref={ref}>
  <div className="research-background-lines" aria-hidden="true"/>
  <div className="story-container">
   <Reveal><StageLabel number="03" text="THE RESEARCH"/></Reveal>
   <div className="research-opening"><Reveal><h2>Building things is one part.<br/><em>Understanding them is another.</em></h2></Reveal>
    <Reveal><p>I work with AI agents, retrieval and memory—not just to make them work, but to understand when and why they fail, and how to improve them.</p></Reveal>
   </div>
   <motion.div className="research-focus-layout" style={reduced?undefined:{y:parallax}}>
    <Reveal className="research-symbol" ><svg viewBox="0 0 420 420" role="img" aria-label="Three interconnected areas of research">
      <circle cx="210" cy="210" r="155" fill="none" stroke="#9eada6" strokeDasharray="2 12"/>
      <circle cx="210" cy="210" r="106" fill="none" stroke="#6b8c9a"/>
      <path d="M210 80 L89 294 L329 294 Z" fill="none" stroke="#8fb3b2" strokeWidth="2"/>
      {[[210,80],[89,294],[329,294]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="25" fill={i===0?'#e7a37f':'#a9c6c2'} /><text x={x} y={Number(y)+4} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d3540">0{i+1}</text></g>)}
      <circle cx="210" cy="210" r="12" fill="#e3eee7"/><circle cx="210" cy="210" r="47" stroke="#809da1" fill="none" strokeDasharray="4 8"/>
     </svg><span>QUESTION · EXPERIMENT · EVIDENCE</span></Reveal>
    <div className="research-focus-list">{topics.map((t,i)=><Reveal key={t.name} delay={.12*i}>
      <div className="research-focus-item"><span className="research-focus-number">0{i+1}</span><div>{t.icon}<h3>{t.name}</h3><p>{t.short}</p></div><ArrowUpRight size={19}/></div>
     </Reveal>)}</div>
   </motion.div>
   <div className="story-publications">
    <Reveal><StageLabel number="03.1" text="WRITING & PUBLICATIONS"/></Reveal>
    <Reveal><h3>The work behind the work.</h3></Reveal>
    <div className="story-publications-list">{publications.length?publications.map((p,i)=><Reveal key={p.title}>
      <a href={p.url} target="_blank" rel="noopener noreferrer" className="story-publication">
       <span>{String(i+1).padStart(2,'0')}</span><div><strong>{p.title}</strong><small>{p.venue||'Research output'} · {p.year||'—'}</small></div><ExternalLink size={20}/>
      </a>
     </Reveal>):<p>No linked publications have been published in the CMS yet.</p>}</div>
   </div>
  </div>
 </section>;
}

function AboutChapter(){
 const reduced=useReducedMotion();
 return <section className="story-about" id="about">
  <div className="story-container">
   <Reveal><StageLabel number="04" text="BEHIND THE WORK"/></Reveal>
   <div className="about-heading"><Reveal><h2>From shipping products<br/><em>to researching what comes next.</em></h2></Reveal>
     <Reveal><p>A few years in industry taught me to ship. Research taught me to test assumptions. I bring both perspectives to the same problems.</p></Reveal>
   </div>
   <div className="about-career" id="experience">
     <div className="about-left"><span>MY PATH SO FAR</span><div className="about-big-year" aria-hidden="true">2021<span>→ NOW</span></div></div>
     <div className="about-timeline">{experience.map((e,i)=><Reveal key={e.role+e.organization} className="story-job">
       <span className="story-job-index">{String(i+1).padStart(2,'0')}</span>
       <div className="story-job-main"><small>{e.period}</small><h3>{e.role}</h3><strong>{e.organization}</strong><p>{e.summary}</p></div>
       <span className="story-job-place">{e.location}</span>
      </Reveal>)}</div>
   </div>
   <div className="about-education" id="education">
    <Reveal><StageLabel number="04.1" text="EDUCATION"/></Reveal>
    <div className="education-scene">{education.map((e,i)=><Reveal className="education-story-card" delay={i*.13} key={e.institution}>
      <span>{e.period}</span><h3>{e.degree}</h3><p>{e.institution}</p><small>{e.place} · {e.detail}</small>
     </Reveal>)}</div>
   </div>
   <div className="about-certifications">
    <Reveal><StageLabel number="04.2" text="CONTINUED LEARNING"/></Reveal>
    <div className="story-cert-list">{certifications.map((c,i)=><Reveal key={c} delay={i%3*.04}><div><span>{String(i+1).padStart(2,'0')}</span><strong>{c}</strong></div></Reveal>)}</div>
   </div>
  </div>
 </section>;
}

function EndChapter(){
 const reduced=useReducedMotion();
 return <section className="story-contact" id="contact">
  <div className="contact-grain" aria-hidden="true"/>
  <div className="story-container story-end-inner">
   <Reveal><StageLabel number="05" text="NEXT CHAPTER"/></Reveal>
   <Reveal><div className="ending-prelude">The interesting part is never the end of a project.</div></Reveal>
   <h2 className="ending-heading"><span>It's what</span><motion.span initial={reduced?false:{opacity:0,y:60}} whileInView={reduced?undefined:{opacity:1,y:0}}
     viewport={{once:true}} transition={{duration:1,ease:revealEase}}><em>we build next.</em></motion.span></h2>
   <Reveal><p>Have an idea, an opportunity, or a research problem worth exploring? I'd love to hear about it.</p></Reveal>
   <Reveal><a className="ending-email" href="mailto:dev.nasirshuvo@gmail.com">Start a conversation <ArrowUpRight size={25}/></a></Reveal>
   <div className="end-decoration" aria-hidden="true"><i/><i/><i/></div>
   <footer className="story-footer"><span>© {new Date().getFullYear()} NASIR UDDIN SHUVO · TAMPERE, FINLAND</span>
    <div><a href="https://github.com/nasiriubat" target="_blank" rel="noopener noreferrer">GITHUB</a><a href="https://www.linkedin.com/in/nasir-shuvo" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
     <a href={import.meta.env.BASE_URL+'?view=plain'}>PLAIN PORTFOLIO ↗</a></div>
    <a href="#start" className="backtop">BACK TO TOP ↑</a>
   </footer>
  </div>
 </section>;
}
export default function StoryPortfolio(){
 return <main className="story-portfolio">
  <Introduction/>
  <ProcessChapter/>
  <ChapterTransition/>
  <WorkChapter/>
  <MoreWork/>
  <ResearchChapter/>
  <AboutChapter/>
  <EndChapter/>
 </main>;
}
