import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform
} from 'motion/react';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Command,
  Github, Linkedin, Menu, Search, X, Copy
} from 'lucide-react';
import CinematicAssembly from './CinematicAssembly';
import FeaturedShowcase from './FeaturedShowcase';
import ProjectIndex from './ProjectIndex';
import { CareerStory, Credentials, ResearchStudio } from './ResearchCareer';
import { capabilities } from './PortfolioData';
import {
  Kicker, MagneticAnchor, Reveal, ScrollTypeBand,
  SectionIntro, WordReveal, useSectionObserver
} from './MotionLanguage';
import { projects, publications } from './content';
import './styles.css';

const navigation=[
  {id:'work',label:'Work'},
  {id:'projects',label:'Index'},
  {id:'research',label:'Research'},
  {id:'experience',label:'Experience'},
  {id:'contact',label:'Contact'}
];
const chapters=['home','work','projects','research','experience','education','contact'];

function Header(){
  const [menu,setMenu]=useState(false);
  const [search,setSearch]=useState(false);
  const [query,setQuery]=useState('');
  const current=useSectionObserver(chapters);
  useEffect(()=>{
    const shortcut=(event:KeyboardEvent)=>{
      if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){
        event.preventDefault();setSearch(v=>!v);setMenu(false);
      }
      if(event.key==='Escape'){setSearch(false);setMenu(false);}
    };
    window.addEventListener('keydown',shortcut);
    return()=>window.removeEventListener('keydown',shortcut);
  },[]);
  const results=[
    ...projects.map(p=>({label:p.title,detail:p.category,href:'/portfolio/projects/'+p.slug+'/'})),
    ...publications.map(p=>({label:p.title,detail:'Research output',href:'#publications'})),
    ...navigation.map(p=>({label:p.label,detail:'Section',href:'#'+p.id}))
  ].filter(p=>(p.label+' '+p.detail).toLowerCase().includes(query.toLowerCase())).slice(0,9);
  return <>
    <header className="site-header">
      <a className="site-brand" href="#home" aria-label="Nasir Uddin Shuvo, return to top">
        <span className="brand-monogram">N<span>.</span></span>
        <span className="brand-name">NASIR UDDIN SHUVO</span>
      </a>
      <nav className="desktop-navigation" aria-label="Primary navigation">
        {navigation.map(item=><a href={'#'+item.id} key={item.id}
          className={current===item.id?'active':''}
          aria-current={current===item.id?'location':undefined}>
          {item.label}
          {current===item.id&&<motion.span layoutId="navigation-indicator" className="nav-active-mark" transition={{type:'spring',stiffness:380,damping:33}}/>}
        </a>)}
      </nav>
      <div className="header-actions">
        <button className="header-icon" type="button" onClick={()=>{setSearch(true);setMenu(false)}} aria-label="Open quick search"><Search size={18}/><span className="keycap">⌘ K</span></button>
        <a className="nav-contact" href="mailto:dev.nasirshuvo@gmail.com">LET'S TALK <ArrowUpRight size={16}/></a>
        <button className="header-icon menu-toggle" type="button" aria-expanded={menu} aria-controls="mobile-nav" onClick={()=>setMenu(m=>!m)} aria-label={menu?'Close menu':'Open menu'}>{menu?<X size={22}/>:<Menu size={22}/>}</button>
      </div>
    </header>
    <AnimatePresence>{menu&&<motion.nav className="mobile-navigation" id="mobile-nav" aria-label="Mobile navigation"
      initial={{opacity:0,clipPath:'inset(0 0 100% 0)'}}
      animate={{opacity:1,clipPath:'inset(0 0 0% 0)'}}
      exit={{opacity:0,clipPath:'inset(0 0 100% 0)'}}
      transition={{duration:.35,ease:[.22,1,.36,1]}}>
      {navigation.map((item,index)=><a href={'#'+item.id} key={item.id} onClick={()=>setMenu(false)}><span>0{index+1}</span>{item.label}<ArrowUpRight size={20}/></a>)}
    </motion.nav>}</AnimatePresence>
    <AnimatePresence>{search&&<motion.div className="search-backdrop"
      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      role="presentation" onMouseDown={()=>setSearch(false)}>
      <motion.div className="search-dialog" role="dialog" aria-modal="true" aria-label="Navigate portfolio"
        initial={{opacity:0,y:-20,scale:.97}} animate={{opacity:1,y:0,scale:1}}
        exit={{opacity:0,y:-12,scale:.98}}
        transition={{duration:.24}}
        onMouseDown={e=>e.stopPropagation()}>
        <div className="search-field"><Command size={19}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects, research, sections…" aria-label="Search portfolio"/><button type="button" aria-label="Close search" onClick={()=>setSearch(false)}><X size={20}/></button></div>
        <div className="search-results">{results.map(result=><a href={result.href} key={result.label+result.href} onClick={()=>setSearch(false)}><span><strong>{result.label}</strong><small>{result.detail}</small></span><ArrowUpRight size={17}/></a>)}
          {!results.length&&<p>No matching projects or sections.</p>}
        </div>
        <div className="search-footer">ESC TO CLOSE <span>CTRL / ⌘ + K</span></div>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </>;
}

function ScrollProgress(){
  const {scrollYProgress}=useScroll();
  const scaleY=useSpring(scrollYProgress,{stiffness:100,damping:25});
  const scaleX=useSpring(scrollYProgress,{stiffness:100,damping:25});
  const current=useSectionObserver(chapters);
  const chapter=Math.max(0,chapters.indexOf(current));
  return <>
    <motion.div className="top-progress" style={{scaleX}} aria-hidden="true"/>
    <div className="side-progress" aria-hidden="true"><span>{String(chapter+1).padStart(2,'0')}</span><div className="side-progress-rail"><motion.div style={{scaleY}}/></div><span>{String(chapters.length).padStart(2,'0')}</span></div>
  </>;
}

function Hero(){
  const ref=useRef<HTMLElement>(null);
  const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
  const textY=useTransform(scrollYProgress,[0,1],[0,-70]);
  const textOpacity=useTransform(scrollYProgress,[0,.8,1],[1,.95,.3]);
  const rise={hidden:{y:'110%',opacity:0},show:{y:0,opacity:1}};
  return <section id="home" className="hero-section" ref={ref}>
    <div className="hero-grain" aria-hidden="true"/>
    <div className="hero-grid shell">
      <motion.div className="hero-identity" style={reduced?undefined:{y:textY,opacity:textOpacity}}>
        <Reveal><div className="hero-eyebrow"><span className="hero-signal"/><span>FULL-STACK SOFTWARE DEVELOPMENT</span><i/>APPLIED AI RESEARCH</div></Reveal>
        {reduced?<h1 className="hero-name"><span className="hero-name-row">Nasir</span><span className="hero-name-row">Uddin</span><span className="hero-name-row"><em>Shuvo.</em></span></h1>:<motion.h1 className="hero-name" initial="hidden" animate="show" transition={{staggerChildren:.16,delayChildren:.14}} aria-label="Nasir Uddin Shuvo">
          {['Nasir','Uddin','Shuvo.'].map((part,i)=><span className="hero-name-row" key={part} aria-hidden="true">
            <motion.span variants={rise} transition={{duration:.95,ease:[.22,1,.36,1]}}>{i===2?<em>{part}</em>:part}</motion.span>
          </span>)}
        </motion.h1>}
        <Reveal delay={.32}><p className="hero-declaration">Full-stack engineering.<br/><span>Applied AI research.</span></p></Reveal>
        <Reveal delay={.45}><p className="hero-bio">I create full-stack products and investigate agent memory, retrieval and reliable AI systems at GPT Lab, Tampere University.</p></Reveal>
        <Reveal delay={.54}><div className="hero-links">
          <MagneticAnchor href="#work" className="hero-primary">Explore my work</MagneticAnchor>
          <a href="#research" className="hero-text-link">Research & publications <ArrowUpRight size={17}/></a>
        </div></Reveal>
        <div className="hero-location"><span>BASED IN TAMPERE, FINLAND</span><span>SOFTWARE · SYSTEMS · RESEARCH</span></div>
      </motion.div>
      <div className="hero-visual"><CinematicAssembly/><span className="hero-watermark" aria-hidden="true">N<span>—</span>S</span></div>
    </div>
    <a className="hero-bottom-anchor" href="#approach" aria-label="Continue to approach"><span>DISCOVER MORE</span><ArrowDown size={17}/></a>
  </section>;
}

function Approach(){
  const reduced=useReducedMotion();
  const ref=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const left=useTransform(scrollYProgress,[0,1],['-7%','6%']);
  const right=useTransform(scrollYProgress,[0,1],['5%','-7%']);
  return <section className="approach-section" id="approach" ref={ref}>
    <div className="approach-lines" aria-hidden="true">
      <motion.span style={reduced?undefined:{x:left}}>RESEARCH / ENGINEERING / REAL WORLD SYSTEMS</motion.span>
      <motion.span className="approach-outline" style={reduced?undefined:{x:right}}>THOUGHT / ARCHITECTURE / EXECUTION</motion.span>
    </div>
    <div className="shell approach-body">
      <div className="approach-index"><Kicker index="00">WHAT CONNECTS THE WORK</Kicker></div>
      <WordReveal text="Good software starts with asking better questions." className="approach-statement"/>
      <Reveal><p className="approach-copy">I move between writing production code and studying the systems behind it. The goal isn't an impressive demo. It's software that holds up once people start using it.</p></Reveal>
      <div className="approach-pillars">
        {capabilities.map((cap,i)=><motion.article className="approach-pillar" key={cap.number}
          initial={reduced?false:{opacity:0,y:80,rotateY:12}}
          whileInView={reduced?undefined:{opacity:1,y:0,rotateY:0}}
          viewport={{once:true,amount:.16}}
          transition={{duration:.78,delay:i*.12,ease:[.22,1,.36,1]}}>
          <span>{cap.number} / {cap.label}</span>
          <strong>{cap.title}</strong>
          <p>{cap.details}</p>
          <ArrowDownRight size={25} aria-hidden="true"/>
        </motion.article>)}
      </div>
    </div>
  </section>;
}

function Contact(){
  const ref=useRef<HTMLElement>(null);
  const [copied,setCopied]=useState(false);
  const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const scale=useTransform(scrollYProgress,[0,.65,1],[.84,1,1.06]);
  const rotate=useTransform(scrollYProgress,[0,1],[-7,4]);
  const copyEmail=async()=>{
    const email='dev.nasirshuvo@gmail.com';
    try{await navigator.clipboard.writeText(email);setCopied(true);}
    catch{window.location.href='mailto:'+email;}
  };
  useEffect(()=>{
    if(!copied)return;
    const timer=window.setTimeout(()=>setCopied(false),2300);
    return()=>window.clearTimeout(timer);
  },[copied]);
  return <section id="contact" className="contact-stage" ref={ref}>
    <motion.div className="contact-halo" style={reduced?undefined:{scale,rotate}} aria-hidden="true"/>
    <div className="shell contact-inner">
      <Reveal><Kicker index="06">LET'S CONNECT</Kicker></Reveal>
      <WordReveal text="The interesting part is what we build next." className="contact-headline"/>
      <Reveal delay={.13}><p>For thoughtful engineering, applied AI projects or research collaborations, I'd be glad to hear from you.</p></Reveal>
      <Reveal delay={.18}><div className="contact-actions">
        <MagneticAnchor href="mailto:dev.nasirshuvo@gmail.com" className="contact-primary">Start a conversation</MagneticAnchor>
        <button className="contact-copy" type="button" onClick={copyEmail} aria-live="polite" aria-label="Copy email address">
          {copied?<Check size={17}/>:<Copy size={17}/>} {copied?'Copied':'Copy email'}
        </button>
      </div></Reveal>
      <div className="contact-footer">
        <span>NASIR UDDIN SHUVO</span>
        <span>TAMPERE, FINLAND</span>
        <div><a href="https://github.com/nasiriubat" target="_blank" rel="noopener noreferrer">GITHUB <Github size={15}/></a>
          <a href="https://www.linkedin.com/in/nasir-shuvo" target="_blank" rel="noopener noreferrer">LINKEDIN <Linkedin size={15}/></a></div>
        <a href="#home" className="back-to-top">TOP ↑</a>
      </div>
    </div>
  </section>;
}

function App(){
  return <React.StrictMode>
    <ScrollProgress/>
    <Header/>
    <main>
      <Hero/>
      <Approach/>
      <FeaturedShowcase/>
      <ScrollTypeBand/>
      <ProjectIndex/>
      <ResearchStudio/>
      <CareerStory/>
      <Credentials/>
      <Contact/>
    </main>
  </React.StrictMode>;
}

createRoot(document.getElementById('root')!).render(<App/>);
