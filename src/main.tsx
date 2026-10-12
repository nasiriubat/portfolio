import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Command, Github, Linkedin, Menu, Search, X } from 'lucide-react';
import { projects, publications } from './content';
import './styles.css';
function MagneticLink({href,children,primary=false}:{href:string;children:React.ReactNode;primary?:boolean}) {
 const ref=useRef<HTMLAnchorElement>(null);
 const reduced=useReducedMotion();
 const [xy,setXY]=useState({x:0,y:0});
 return <motion.a ref={ref} className={'button '+(primary?'primary':'secondary')} href={href}
  animate={reduced?{}:{x:xy.x,y:xy.y}} transition={{type:'spring',stiffness:220,damping:17}}
  onMouseMove={e=>{if(reduced||!window.matchMedia('(pointer:fine)').matches)return;const r=ref.current?.getBoundingClientRect();if(r)setXY({x:(e.clientX-r.left-r.width/2)*.14,y:(e.clientY-r.top-r.height/2)*.14})}}
  onMouseLeave={()=>setXY({x:0,y:0})}>{children}</motion.a>;
}
function SpotlightCard({children,className}:{children:React.ReactNode;className:string}) {
 const ref=useRef<HTMLElement>(null);
 return <article ref={ref} className={className} onPointerMove={e=>{if(e.pointerType==='touch')return;const r=ref.current?.getBoundingClientRect();if(r){ref.current?.style.setProperty('--mx',(e.clientX-r.left)+'px');ref.current?.style.setProperty('--my',(e.clientY-r.top)+'px')}}}>{children}</article>;
}
const experience=[
 {role:'Project Researcher',organization:'GPT Lab · Tampere University',dates:'Jan 2026 — Present',detail:'Researching AI agents, long-term memory, retrieval and agentic workflows. Designing and evaluating applied systems for industry use cases.'},
 {role:'Research Assistant',organization:'GPT Lab · Tampere University',dates:'Oct 2024 — Dec 2025',detail:'Developed RAG prototypes, LLM applications and AI-powered research tools. Experimented with retrieval methods and agent workflows.'},
 {role:'Software Developer',organization:'AutonomyBD Ltd.',dates:'Oct 2022 — Jun 2023',detail:'Built and extended production web systems and REST APIs using PHP, Laravel, CodeIgniter, MySQL and JavaScript.'},
 {role:'Software Developer',organization:'Inilabs Network',dates:'Feb 2021 — Sep 2022',detail:'Delivered features, client customizations, APIs and technical support across business web applications.'}
];
const education=[
 {degree:'Master’s in Computing Sciences',school:'Tampere University · Finland',dates:'2023 — 2025',detail:'Software, Web and Cloud specialization.'},
 {degree:'BSc in Computer Science & Engineering',school:'IUBAT · Bangladesh',dates:'2017 — 2021',detail:'CGPA 3.94 / 4.00.'}
];
const certifications=['Full Stack (MERN) Bootcamp','Model Context Protocol: Advanced Topics','Introduction to Model Context Protocol','Claude Code 101','GenAI in Software Engineering · GPT Lab','SQL Intermediate · Sololearn'];
function AssemblyScene(){
 const ref=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const spread=useTransform(scrollYProgress,[0,.35,.65,1],[110,40,0,-35]);
 const turn=useTransform(scrollYProgress,[0,.45,.8,1],[-32,-10,0,8]);
 const fade=useTransform(scrollYProgress,[0,.3,.7,1],[.3,1,1,.5]);
 const midY=useTransform(scrollYProgress,[0,.5,1],[-80,0,28]);
 const midRotate=useTransform(scrollYProgress,[0,.5,1],[20,0,-7]);
 const frontY=useTransform(scrollYProgress,[0,.5,1],[140,0,-45]);
 const frontRotate=useTransform(scrollYProgress,[0,.5,1],[-15,0,6]);
 return <div className="assembly-wrap" ref={ref}><div className="assembly-stage" aria-label="Animated software architecture assembling as you scroll"><div className="assembly-grid"/><motion.div className="assembly-layer assembly-back" style={reduced?{}:{y:spread,rotate:turn,opacity:fade}}><span>01 / INTERFACE</span><div className="assembly-mini-grid"><i/><i/><i/></div></motion.div><motion.div className="assembly-layer assembly-mid" style={reduced?{}:{y:midY,rotate:midRotate}}><span>02 / INTELLIGENCE</span><div className="assembly-node"><i/><i/><i/></div></motion.div><motion.div className="assembly-layer assembly-front" style={reduced?{}:{y:frontY,rotate:frontRotate}}><span>03 / ENGINEERING</span><div className="assembly-terminal"><b>~/build</b><p>→ design()</p><p>→ research()</p><p>→ ship()</p></div></motion.div><div className="assembly-label">IDEAS <span>→</span> SYSTEMS</div></div></div>;
}
function App() {
 const reduce = useReducedMotion();
 const { scrollYProgress } = useScroll();
 const scaleX = useSpring(scrollYProgress,{stiffness:100,damping:30});
 const [command,setCommand] = useState(false);
 const [menu,setMenu] = useState(false);
 const [query,setQuery] = useState('');
 useEffect(()=>{const handler=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setCommand(v=>!v)}if(e.key==='Escape')setCommand(false)};window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler)},[]);
 const reveal = { initial: reduce?{}:{opacity:0,y:28}, whileInView:{opacity:1,y:0}, viewport:{once:true,amount:0.12}, transition:{duration:0.55} };
 const matches=[...projects.map(p=>({label:p.title,href:p.url||'#projects'})),{label:'About',href:'#about'},{label:'Research',href:'#research'},{label:'Contact',href:'#contact'}].filter(x=>x.label.toLowerCase().includes(query.toLowerCase()));
 return <>
 <motion.div className="progress" style={{scaleX}} aria-hidden="true"/>
 <header className="nav shell"><a className="brand" href="#home">nasir<span>.</span></a><nav className={menu?'navlinks open':'navlinks'} aria-label="Main navigation"><a href="#projects" onClick={()=>setMenu(false)}>Projects</a><a href="#research" onClick={()=>setMenu(false)}>Research</a><a href="#experience" onClick={()=>setMenu(false)}>Experience</a><a href="#education" onClick={()=>setMenu(false)}>Education</a><a href="#about" onClick={()=>setMenu(false)}>About</a><a href="#contact" onClick={()=>setMenu(false)}>Contact</a></nav><div className="nav-actions"><button className="iconbutton" aria-label="Open command search" onClick={()=>setCommand(true)}><Search size={19}/></button><button className="iconbutton mobile-menu" aria-label="Toggle menu" onClick={()=>setMenu(v=>!v)}>{menu?<X/>:<Menu/>}</button></div></header>
 <main id="home">
 <section className="hero shell"><motion.div initial={reduce?{}:{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}}><div className="eyebrow"><span className="live-dot"/> FULL STACK DEVELOPER · AI RESEARCHER</div><h1>I build software<br/>that <em>makes an impact.</em></h1><p className="hero-description">From intelligent AI systems to products people actually use. I turn complex ideas into thoughtful, practical software.</p><div className="actions"><MagneticLink href="#projects" primary>Explore my work <ArrowUpRight size={18}/></MagneticLink><MagneticLink href="#research">Research & publications</MagneticLink></div><div className="social"><a href="https://github.com/nasiriubat" target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a><a href="https://www.linkedin.com/in/nasir-shuvo" target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a></div></motion.div><AssemblyScene/></section>
 <section id="projects" className="section shell"><motion.div {...reveal}><div className="section-kicker">01 / SELECTED WORK</div><h2>Products, not just prototypes.</h2><p className="section-lead">A selection of platforms I've designed and developed, from research tools to real world products.</p></motion.div><div className="projects">{projects.map((p,i)=><motion.div initial={reduce?{}:{opacity:0,y:85,rotateX:8,scale:.94}} whileInView={{opacity:1,y:0,rotateX:0,scale:1}} viewport={{once:true,amount:.12}} transition={{duration:.65,delay:(i%3)*.09,type:'spring',stiffness:90,damping:19}} key={p.slug}><SpotlightCard className={'project-card '+(p.featured?'featured':'')}><div className="project-body"><div className="project-number">{String(i+1).padStart(2,'0')} <span>{p.featured?'✦ FEATURED':'SELECTED WORK'}</span></div><div className="project-meta">{p.category}</div><h3>{p.title}</h3><p>{p.description}</p><div className="project-actions">{p.url&&!p.url.includes('github.com/')&&<a className="project-link" href={p.url} target="_blank" rel="noreferrer">Visit product <ArrowUpRight size={17}/></a>}<a className="project-link" href={'/portfolio/projects/'+p.slug+'/'}>Explore project <ArrowUpRight size={17}/></a></div></div></SpotlightCard></motion.div>)}</div></section>
 <section id="research" className="section research"><div className="shell"><motion.div {...reveal}><div className="section-kicker">02 / RESEARCH</div><h2>Curiosity backed by experiments.</h2><p className="section-lead">My interests include AI agents, memory systems, retrieval, and reliable software engineering.</p></motion.div><div className="research-grid"><div className="research-tile"><span>01</span><h3>Agent memory</h3><p>Evaluating how agents retain and apply knowledge over time.</p></div><div className="research-tile"><span>02</span><h3>AI driven engineering</h3><p>Studying software quality, agent workflows, and reproducible evaluation.</p></div><div className="research-tile"><span>03</span><h3>Retrieval and RAG</h3><p>Building grounded systems that make information useful.</p></div></div><div className="publications"><h3>Research outputs & publications</h3><div className="research-outputs">{publications.length?publications.map(p=><div className="research-output" key={p.title}><strong>{p.url?<a href={p.url} target="_blank" rel="noopener noreferrer">{p.title} ↗</a>:p.title}</strong><span>{p.venue} · {p.year}</span></div>):<p>No research outputs have been added through Pages CMS yet.</p>}</div></div></div></section>
 <section id="experience" className="section shell"><motion.div {...reveal}><div className="section-kicker">03 / EXPERIENCE</div><h2>Building in industry. Researching what comes next.</h2><p className="section-lead">A career spanning production software engineering and applied AI research.</p></motion.div><div className="career-list">{experience.map((e,i)=><motion.article {...reveal} className="career-item" key={e.organization+e.role}><div className="career-index">0{i+1}</div><div><h3>{e.role}</h3><strong>{e.organization}</strong><p>{e.detail}</p></div><span className="career-date">{e.dates}</span></motion.article>)}</div></section>
<section id="education" className="section profile-band"><div className="shell"><motion.div {...reveal}><div className="section-kicker">04 / EDUCATION</div><h2>Academic foundation.</h2></motion.div><div className="education-grid">{education.map(e=><div className="profile-card" key={e.school}><span>{e.dates}</span><h3>{e.degree}</h3><strong>{e.school}</strong><p>{e.detail}</p></div>)}</div></div></section>
<section id="certifications" className="section shell"><motion.div {...reveal}><div className="section-kicker">05 / CERTIFICATIONS</div><h2>Always learning.</h2></motion.div><div className="cert-grid">{certifications.map(c=><div className="cert-item" key={c}><span aria-hidden="true">✦</span>{c}</div>)}</div></section>
<section id="about" className="section shell about"><motion.div {...reveal}><div className="section-kicker">03 / ABOUT</div><h2>Engineer by practice.<br/>Researcher by curiosity.</h2><p>I'm a full stack software developer and AI researcher based in Finland. I work across web applications, AI agents, retrieval systems, and practical research. I care about software that ships, works, and solves actual problems.</p></motion.div></section>
 <section id="contact" className="section shell contact"><motion.div {...reveal}><div className="section-kicker">04 / CONNECT</div><h2>Have something interesting in mind?</h2><p>Let's talk about software, research, or building something useful.</p><MagneticLink href="https://www.linkedin.com/in/nasir-shuvo">Get in touch <ArrowUpRight size={18}/></MagneticLink></motion.div></section>
 </main><footer className="footer shell"><span>© {new Date().getFullYear()} Nasir Uddin Shuvo</span><span>Built with care · React + Motion</span></footer>
 {command&&<div className="command-backdrop" onMouseDown={()=>setCommand(false)}><div className="command-panel" role="dialog" aria-modal="true" aria-label="Quick navigation" onMouseDown={e=>e.stopPropagation()}><div className="command-input"><Command size={20}/><input autoFocus placeholder="Search projects or sections…" value={query} onChange={e=>setQuery(e.target.value)}/><button aria-label="Close search" onClick={()=>setCommand(false)}><X size={18}/></button></div><div className="command-results">{matches.map(m=><a key={m.label} href={m.href} onClick={()=>setCommand(false)}>{m.label}<ArrowUpRight size={16}/></a>)}{!matches.length&&<p>No matches found.</p>}</div><div className="command-hint">ESC to close · Ctrl/Cmd + K to toggle</div></div></div>}
 </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
