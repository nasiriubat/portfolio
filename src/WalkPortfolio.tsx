import React,{useEffect,useRef,useState} from 'react';
import {ArrowRight,ArrowUpRight,ChevronDown,ChevronUp,Mail, Github,Linkedin,MousePointer2,Accessibility,MapPin} from 'lucide-react';
import {motion} from 'motion/react';
import {education,experience,certifications,capabilities} from './PortfolioData';
import {projects,publications,publicLink} from './content';
import {mountWorld} from './WalkWorld';
import './walk.css';

const EMAIL='dev.nasirshuvo@gmail.com';
const chapters=[
 {id:'home',title:'Hello, I’m Nasir.',kicker:'01 / THE INTRO',line:'Full stack developer. AI researcher. An incurable builder.',desc:'Welcome to my little world. Scroll to follow a cartoon version of me across the places, people and products that shaped my work.'},
 {id:'education',title:'Where it began.',kicker:'02 / EDUCATION',line:'Curiosity became an engineering career.',desc:'Two universities, two countries and a lot of learning.'},
 {id:'experience',title:'From code to research.',kicker:'03 / EXPERIENCE',line:'I build things, then ask how to make them better.',desc:'A journey across software development, engineering and applied AI research.'},
 {id:'projects',title:'Things I have built.',kicker:'04 / SELECTED PRODUCTS',line:'Real projects. Different problems. A lot of experiments.',desc:'Select a product to see what it does, or explore all projects in the plain portfolio.'},
 {id:'research',title:'Questions worth asking.',kicker:'05 / RESEARCH',line:'Can we make intelligent systems more dependable?',desc:'I study agent memory, retrieval, evaluation and the reliability of AI workflows.'},
 {id:'services',title:'My engineering toolkit.',kicker:'06 / EXPERTISE',line:'From ideas to products and systems.',desc:'Product engineering, agentic AI systems and research driven development.'},
 {id:'contact',title:'Your turn to say hello.',kicker:'07 / CONTACT',line:'Have a product idea or an interesting problem?',desc:'I am always up for a conversation about software, intelligent systems and research.'}
] as const;
const clamp=(n:number)=>Math.max(0,Math.min(6,n));
function StoryDetails({index,onOpen}:{index:number;onOpen:(slug:string)=>void}){
 if(index===0)return <div className="walk-social walk-intro-social"><a href="https://github.com/nasiriubat" target="_blank" rel="noopener noreferrer"><Github size={18}/> GitHub</a><a href="https://www.linkedin.com/in/nasir-shuvo" target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> LinkedIn</a><a href="mailto:dev.nasirshuvo@gmail.com"><Mail size={18}/> Email</a></div>;
 if(index===1)return <div className="walk-list">{education.map(e=><div className="walk-list-item" key={e.institution}><span>{e.period}</span><strong>{e.degree}</strong><small>{e.institution} · {e.detail}</small></div>)}</div>;
 if(index===2)return <div className="walk-list scrollable">{experience.map(e=><div className="walk-list-item" key={e.role+e.organization}><span>{e.period}</span><strong>{e.role}</strong><small>{e.organization}</small></div>)}</div>;
 if(index===3)return <div className="walk-projects">{['scholarbro','leave-management','trip-planner','wcag-checker'].map(slug=>projects.find(p=>p.slug===slug)).filter((p):p is (typeof projects)[number]=>Boolean(p)).map(p=><button key={p.slug} onClick={()=>onOpen(p.slug)}><span>{p.category}</span><strong>{p.title}</strong><ArrowUpRight size={17}/></button>)}<a className="walk-inline-link" href={import.meta.env.BASE_URL+'?view=plain#projects'}>See every project <ArrowRight size={16}/></a></div>;
 if(index===4)return <div className="walk-list">{['Agent memory and continual learning','Retrieval augmented applications','Reliable agent workflows','Reproducible evaluation'].map(x=><div key={x} className="walk-interest">{x}</div>)}{publications.length>0&&<a className="walk-inline-link" href={import.meta.env.BASE_URL+'?view=plain#research'}>Research and publications <ArrowRight size={16}/></a>}</div>;
 if(index===5)return <div className="walk-list">{capabilities.map(c=><div className="walk-list-item" key={c.number}><strong>{c.title}</strong><small>{c.details}</small></div>)}<small className="walk-small">{certifications.length} certifications and training entries in the plain view</small></div>;
 return <div className="walk-social"><a href={'mailto:'+EMAIL}><Mail size={18}/> Write an email</a><button onClick={()=>navigator.clipboard?.writeText(EMAIL).then(()=>{const toast=document.getElementById('walk-toast');if(toast)toast.textContent='Email copied: '+EMAIL}).catch(()=>{const toast=document.getElementById('walk-toast');if(toast)toast.textContent=EMAIL})}>Copy email</button><a href="https://github.com/nasiriubat" target="_blank" rel="noopener noreferrer"><Github size={18}/> GitHub</a></div>;
}
function ProjectDialog({slug,onClose}:{slug:string|null;onClose:()=>void}){
 const p=projects.find(x=>x.slug===slug);
 useEffect(()=>{if(!slug)return;const key=(event:KeyboardEvent)=>{if(event.key==='Escape')onClose()};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[slug,onClose]);
 if(!p)return null;
 const live=publicLink(p);
 return <div className="walk-modal-underlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className="walk-modal" role="dialog" aria-modal="true" aria-labelledby="walk-modal-title"><button className="walk-close" onClick={onClose} aria-label="Close project">×</button><div className="walk-kicker">{p.category} · {p.status}</div><h2 id="walk-modal-title">{p.title}</h2><p>{p.description}</p>{p.features&&<ul>{p.features.slice(0,4).map(x=><li key={x}>{x}</li>)}</ul>}<div className="walk-chips">{(p.stack||[]).slice(0,6).map(x=><span key={x}>{x}</span>)}</div><div className="walk-modal-links"><a href={import.meta.env.BASE_URL+'projects/'+p.slug+'/'}>Read case study <ArrowUpRight size={16}/></a>{live&&<a href={live} target="_blank" rel="noopener noreferrer">Open product <ArrowUpRight size={16}/></a>}</div></section></div>;
}
export default function WalkPortfolio(){
 const scene=useRef<HTMLDivElement>(null);
 const progress=useRef({current:0});
 const [active,setActive]=useState(0);
 const [failed,setFailed]=useState(false);
 const [selected,setSelected]=useState<string|null>(null);
 const reduced=useRef(typeof window!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches);
 const current=useRef(0);
 useEffect(()=>{
   const element=scene.current;if(!element)return;
   return mountWorld(element,progress.current,()=>setFailed(true));
 },[]);
 useEffect(()=>{
   let frame=0;
   const update=()=>{
     const area=document.getElementById('walk-track');
     if(!area)return;
     const scroll=window.scrollY-area.offsetTop;
     const total=Math.max(1,area.offsetHeight-window.innerHeight);
     const p=Math.max(0,Math.min(1,scroll/total));
     progress.current.current=p;
     const index=clamp(Math.round(p*6));
     if(index!==current.current){current.current=index;setActive(index)}
   };
   const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)};
   window.addEventListener('scroll',schedule,{passive:true});
   window.addEventListener('resize',schedule);update();
   return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule)};
 },[]);
 function goTo(i:number){
   const target=clamp(i);const area=document.getElementById('walk-track');
   if(!area)return;
   window.scrollTo({top:area.offsetTop+(area.offsetHeight-window.innerHeight)*(target/6),behavior:reduced.current?'instant':'smooth'});
 }
 useEffect(()=>{
   const hash=window.location.hash.replace('#','');
   const i=chapters.findIndex(c=>c.id===hash);
   if(i>=0){const timer=setTimeout(()=>goTo(i),250);return()=>clearTimeout(timer)}
 },[]);
 return <main className="walk-app">
   <a className="walk-skip" href={import.meta.env.BASE_URL+'?view=plain'}>Skip animation and read the plain portfolio</a>
   <div className="walk-header"><a className="walk-logo" href="#home" onClick={e=>{e.preventDefault();goTo(0)}}>nasir<span>.</span></a><span className="walk-header-meta"><MapPin size={14}/> TAMPERE · FINLAND</span><div className="walk-switch" role="group" aria-label="Portfolio view"><span aria-current="page">3D journey</span><a href={import.meta.env.BASE_URL+'?view=plain'}>Plain view <ArrowUpRight size={15}/></a></div></div>
   <div id="walk-track" className="walk-track" style={{height:'700vh'}}><div className="walk-stage"><div ref={scene} className={'walk-canvas '+(failed?'walk-failed':'')} aria-hidden="true"/>{failed&&<div className="walk-fallback" aria-hidden="true"><span>✦</span><span>✳</span><span>✦</span></div>}
     <div className="walk-left"><div className="walk-card" key={active}><motion.div initial={reduced.current?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.46}}>
       <div className="walk-kicker"><span className="walk-dot"/> {chapters[active].kicker}</div><h1>{chapters[active].title}</h1><h2>{chapters[active].line}</h2><p>{chapters[active].desc}</p><StoryDetails index={active} onOpen={setSelected}/></motion.div></div>
       <div className="walk-help"><MousePointer2 size={15}/> SCROLL TO WALK <span>·</span> SELECT A STOP TO JUMP</div>
     </div>
     <aside className="walk-rail" aria-label="Story chapters">{chapters.map((c,i)=><button aria-current={active===i?'step':undefined} aria-label={'Go to '+c.id} className={active===i?'is-active':''} key={c.id} onClick={()=>goTo(i)}><span>{String(i+1).padStart(2,'0')}</span><span className="walk-rail-label">{c.id}</span></button>)}</aside>
     <div className="walk-bottom"><button disabled={active===0} onClick={()=>goTo(active-1)} aria-label="Previous chapter"><ChevronUp size={20}/></button><div className="walk-progress"><div style={{width:(active/6*100)+'%'}}/></div><span>{String(active+1).padStart(2,'0')} / 07</span><button disabled={active===6} onClick={()=>goTo(active+1)} aria-label="Next chapter"><ChevronDown size={20}/></button></div>
     <div role="status" id="walk-toast" className="walk-toast" aria-live="polite"/>
   </div></div>
   <footer className="walk-end"><p>Made with curiosity, code and a little 3D magic.</p><a href={import.meta.env.BASE_URL+'?view=plain'}><Accessibility size={17}/> Read the accessible plain portfolio <ArrowRight size={16}/></a></footer>
   <ProjectDialog slug={selected} onClose={()=>setSelected(null)}/>
 </main>;
}
