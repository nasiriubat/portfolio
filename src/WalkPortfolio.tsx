import React,{useCallback,useEffect,useRef,useState} from 'react';
import {Accessibility,ArrowDown,ArrowLeft,ArrowRight,ArrowUpRight,BookOpen,Check,ChevronDown,Code2,Compass,ExternalLink,GraduationCap,Github,Layers3,Linkedin,Mail,MapPin,RotateCcw,Route,Send,Sparkles,X} from 'lucide-react';
import {education,experience,certifications,capabilities} from './PortfolioData';
import {projects,publications,publicLink,type Project} from './content';
import {mountWorld,type WalkProgress} from './WalkWorld';
import './walk.css';

const BASE=import.meta.env.BASE_URL;
const EMAIL='dev.nasirshuvo@gmail.com';
const chapters=[
 {id:'home',name:'Welcome',marker:'01',eyebrow:'THE BEGINNING'},
 {id:'education',name:'Education',marker:'02',eyebrow:'THE FOUNDATION'},
 {id:'experience',name:'Career',marker:'03',eyebrow:'THE EXPERIENCE'},
 {id:'projects',name:'Projects',marker:'04',eyebrow:'THINGS I BUILT'},
 {id:'research',name:'Research',marker:'05',eyebrow:'QUESTIONS I EXPLORE'},
 {id:'services',name:'Expertise',marker:'06',eyebrow:'WHAT I CAN HELP WITH'},
 {id:'contact',name:'Contact',marker:'07',eyebrow:'LET’S CONNECT'},
 {id:'finish',name:'Full circle',marker:'08',eyebrow:'BACK WHERE WE STARTED'}
] as const;

function TagList({tags}:{tags:string[]}){return <div className="j-tags">{tags.map(t=><span key={t}>{t}</span>)}</div>}
function Intro({num,kicker,title,children}:{num:string;kicker:string;title:string;children?:React.ReactNode}){
 return <header className="j-intro"><div className="j-kicker"><span>{num}</span>{kicker}</div><h2>{title}</h2>{children&&<p className="j-summary">{children}</p>}</header>;
}
function Next({to,label,goTo}:{to:number;label:string;goTo:(x:number)=>void}){
 return <button type="button" className="j-next" onClick={()=>goTo(to)}>
  <span>CONTINUE THE JOURNEY <strong>{label}</strong></span><span className="j-next-circle"><ArrowRight size={22}/></span>
 </button>;
}
function CopyEmail(){
 const [feedback,setFeedback]=useState('');
 async function copy(){
  try{await navigator.clipboard.writeText(EMAIL);setFeedback('Email copied');}
  catch{setFeedback('Copy manually: '+EMAIL);}
 }
 return <div className="j-copy-wrap"><button className="j-button j-button-light" type="button" onClick={copy}><Mail size={18}/> Copy my email</button><span className="j-copy-feedback" role="status">{feedback}</span></div>;
}
function CaseStudy({p}:{p:Project}){
 const live=publicLink(p);
 return <article className="j-project" data-project={p.slug}>
  <div className={'j-project-icon j-product-'+p.slug.replace(/[^a-z0-9-]/g,'')} aria-hidden="true">
   <span>{p.title.slice(0,1)}</span><span className="j-project-icon-mini"><Code2 size={20}/></span>
  </div>
  <div className="j-project-body">
   <div className="j-project-top"><span>{p.category}</span><span>{p.status}</span></div>
   <h3>{p.title}</h3><p>{p.description}</p>
   {p.features&&p.features.length>0&&<div className="j-features"><span className="j-minilabel">WHAT IT DOES</span><ul>{p.features.slice(0,3).map(t=><li key={t}>{t}</li>)}</ul></div>}
   {p.stack&&<TagList tags={p.stack.slice(0,5)}/>}
   {p.workflow&&p.workflow.length>0&&<details className="j-expand"><summary>See how it works <ChevronDown size={17}/></summary><ol>{p.workflow.map(step=><li key={step}>{step}</li>)}</ol></details>}
   <div className="j-project-actions"><a href={BASE+'projects/'+p.slug+'/'}>Full case study <ArrowUpRight size={17}/></a>{live&&<a href={live} target="_blank" rel="noopener noreferrer">Visit live site <ExternalLink size={16}/></a>}</div>
  </div>
 </article>;
}
function JourneyContent({goTo}:{goTo:(x:number)=>void}){
 const featuredSlugs=['scholarbro','leave-management','trip-planner','wcag-checker'];
 const featured=featuredSlugs.map(s=>projects.find(p=>p.slug===s)).filter((x):x is Project=>Boolean(x));
 const other=projects.filter(p=>!featuredSlugs.includes(p.slug));
 return <>
  <section className="j-section j-home" id="home" data-index="0" aria-labelledby="intro-name">
   <div className="j-intro-badge"><span className="j-live-dot"/> OPEN TO BUILDING INTERESTING THINGS</div>
   <p className="j-small-top">HELLO THERE, I'M</p>
   <h1 id="intro-name">Nasir Uddin<br/><em>Shuvo.</em></h1>
   <p className="j-hero-subtitle">Full Stack Software Developer <span>&</span> AI Researcher</p>
   <p className="j-home-lead">I turn ideas into working software, from web products to AI agents and research prototypes. Currently a Project Researcher at GPT Lab, Tampere University.</p>
   <div className="j-metrics" aria-label="At a glance">
    <div><strong>2021</strong><span>Building software since</span></div>
    <div><strong>2</strong><span>University degrees</span></div>
    <div><strong>{projects.length}</strong><span>Portfolio projects</span></div>
   </div>
   <div className="j-location"><MapPin size={16}/> Tampere, Finland</div>
   <div className="j-social"><a href="https://github.com/nasiriubat" target="_blank" rel="noopener noreferrer"><Github size={17}/> GitHub</a><a href="https://www.linkedin.com/in/nasir-shuvo" target="_blank" rel="noopener noreferrer"><Linkedin size={17}/> LinkedIn</a><a href={'mailto:'+EMAIL}><Mail size={17}/> Email</a></div>
   <Next to={1} label="Visit my campus" goTo={goTo}/>
  </section>

  <section className="j-section j-education" id="education" data-index="1">
   <Intro num="02 / 08" kicker="MY FOUNDATION" title="First, a little curiosity. Then a lot of code.">Two degrees and a growing fascination with how real software systems work.</Intro>
   <div className="j-degrees">
    {education.map((e,i)=><article key={e.institution} className="j-degree">
     <div className="j-degree-num"><GraduationCap size={20}/>{String(i+1).padStart(2,'0')}</div>
     <div className="j-deg-years">{e.period}</div>
     <h3>{e.degree}</h3>
     <strong>{e.institution}</strong>
     <p>{e.place}</p><p className="j-degree-speciality">{e.detail}</p>
    </article>)}
   </div>
   <details className="j-expand j-education-certs"><summary>Explore my training & certifications ({certifications.length}) <ChevronDown size={18}/></summary><ul>{certifications.map(c=><li key={c}>{c}</li>)}</ul></details>
   <Next to={2} label="Where I've worked" goTo={goTo}/>
  </section>

  <section className="j-section j-career" id="experience" data-index="2">
   <Intro num="03 / 08" kicker="MY JOURNEY SO FAR" title="From shipping features to studying intelligent systems.">I've worked on production software and research prototypes. Both taught me that dependable systems matter more than impressive demos.</Intro>
   <div className="j-timeline">
    {experience.map((e,i)=><article className="j-job" key={e.role+e.organization}>
      <div className="j-job-dot">{String(i+1).padStart(2,'0')}</div>
      <div className="j-job-content"><div className="j-job-date">{e.period} · {e.location}</div>
       <h3>{e.role}</h3><strong className="j-job-org">{e.organization}</strong><p>{e.summary}</p><TagList tags={e.technologies}/></div>
     </article>)}
   </div>
   <Next to={3} label="See the products" goTo={goTo}/>
  </section>

  <section className="j-section j-products" id="projects" data-index="3">
   <Intro num="04 / 08" kicker="THE PRODUCT EXHIBITION" title="Less talk. Here's what I build.">A selection of web products, research tools and experiments. Each exhibit contains actual project information, technologies and a case study.</Intro>
   <div className="j-gallery-note"><Layers3 size={17}/> Click “See how it works” to explore the system workflow without leaving this journey.</div>
   <div className="j-project-list">{featured.map(p=><CaseStudy p={p} key={p.slug}/>)}</div>
   {other.length>0&&<details className="j-expand j-more-work"><summary>Explore {other.length} more projects <ChevronDown size={18}/></summary><div className="j-more-grid">{other.map(p=><article key={p.slug}><span>{p.category}</span><h3>{p.title}</h3><p>{p.description}</p><a href={BASE+'projects/'+p.slug+'/'}>Read case study <ArrowUpRight size={15}/></a></article>)}</div></details>}
   <Next to={4} label="Enter the AI lab" goTo={goTo}/>
  </section>

  <section className="j-section j-research" id="research" data-index="4">
   <Intro num="05 / 08" kicker="INSIDE THE RESEARCH LAB" title="Making AI systems more dependable.">At GPT Lab, my work explores agents that retrieve information, use memory and improve decisions. I build experimental systems and evaluate their behaviour.</Intro>
   <div className="j-research-map" aria-label="Research themes">
     <div className="j-brain"><Sparkles size={28}/><strong>Agent systems</strong></div>
     <div className="j-node j-node-1">Memory</div><div className="j-node j-node-2">Retrieval</div>
     <div className="j-node j-node-3">Evaluation</div><div className="j-node j-node-4">Reliability</div>
   </div>
   <div className="j-research-themes">
    {[
     ['01','Agent memory','How can an AI agent use long term context without retaining mistakes?'],
     ['02','Retrieval & grounding','How can systems respond using the right evidence rather than guesses?'],
     ['03','Experimental evaluation','How do we measure accuracy, consistency, cost and failure modes?']
    ].map(([n,title,desc])=><article key={n}><span>{n}</span><div><h3>{title}</h3><p>{desc}</p></div></article>)}
   </div>
   <div className="j-publications"><span className="j-minilabel"><BookOpen size={15}/> RESEARCH OUTPUTS</span>
    {publications.length?publications.map(p=><a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer"><strong>{p.title}</strong><small>{p.venue||'Research output'}{p.year?' · '+p.year:''}</small><ExternalLink size={16}/></a>):<p>Publications and linked outputs are added here when available.</p>}
   </div>
   <Next to={5} label="See what I work with" goTo={goTo}/>
  </section>

  <section className="j-section j-skills" id="services" data-index="5">
   <Intro num="06 / 08" kicker="THE ENGINEERING WORKSHOP" title="Ideas, systems, and everything between.">My work covers application development, practical AI systems and engineering research. I care about shipping something that actually works.</Intro>
   <div className="j-capability-list">{capabilities.map((c,i)=><article key={c.number}>
    <div className="j-capability-icon">{i===0?<Code2 size={25}/>:i===1?<Layers3 size={25}/>:<Compass size={25}/>}</div>
    <div><span>{c.label}</span><h3>{c.title}</h3><p>{c.details}</p></div></article>)}</div>
   <div className="j-skill-categories">
    <div><span>APPLICATIONS</span><TagList tags={['React','TypeScript','Laravel','PHP','Node.js','Python','Flask','PostgreSQL','MySQL']}/></div>
    <div><span>INTELLIGENT SYSTEMS</span><TagList tags={['AI agents','RAG','LLMs','Agent memory','Embeddings','Vector search','Evaluation']}/></div>
    <div><span>ENGINEERING PRACTICE</span><TagList tags={['REST APIs','Testing','Research prototypes','System design','Deployment']}/></div>
   </div>
   <Next to={6} label="Let's get in touch" goTo={goTo}/>
  </section>

  <section className="j-section j-contact" id="contact" data-index="6">
   <Intro num="07 / 08" kicker="ONE MORE STOP" title="Let's build something worth sharing.">A product idea, a research collaboration, or a system that needs improving? Tell me about the problem.</Intro>
   <a className="j-email-display" href={'mailto:'+EMAIL}><span>SEND ME AN EMAIL</span><strong>{EMAIL}</strong><ArrowUpRight size={25}/></a>
   <CopyEmail/>
   <div className="j-contact-links"><a href="https://github.com/nasiriubat" target="_blank" rel="noopener noreferrer"><Github size={20}/> GitHub <ArrowUpRight size={16}/></a><a href="https://www.linkedin.com/in/nasir-shuvo" target="_blank" rel="noopener noreferrer"><Linkedin size={20}/> LinkedIn <ArrowUpRight size={16}/></a><a href="https://scholarbro.com" target="_blank" rel="noopener noreferrer"><BookOpen size={20}/> ScholarBro <ArrowUpRight size={16}/></a></div>
   <Next to={7} label="Complete the loop" goTo={goTo}/>
  </section>

  <section className="j-section j-finish" id="finish" data-index="7">
   <div className="j-full-circle"><Route size={36}/><span>THE ROAD LEADS HOME</span></div>
   <h2>Full circle.<br/><em>Still building.</em></h2>
   <p>We started at my desk, visited where I studied, worked, built products and researched intelligent systems, and made it back. Thanks for coming along.</p>
   <div className="j-end-actions"><button className="j-button j-button-primary" type="button" onClick={()=>{goTo(0)}}><RotateCcw size={18}/> Walk it again</button><a className="j-button j-button-light" href={BASE+'?view=plain'}><Accessibility size={18}/> View the plain portfolio</a></div>
   <span className="j-footer-credit">© {new Date().getFullYear()} Nasir Uddin Shuvo · Built with a little curiosity.</span>
  </section>
 </>;
}

export default function WalkPortfolio(){
 const canvas=useRef<HTMLDivElement>(null),scrollRoot=useRef<HTMLDivElement>(null);
 const status=useRef<WalkProgress>({current:0,overview:false});
 const [active,setActive]=useState(0),[overview,setOverview]=useState(false),[failed,setFailed]=useState(false);
 const reduced=useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const sections=useRef<HTMLElement[]>([]);
 const goTo=useCallback((index:number)=>{
  const root=scrollRoot.current;
  if(!root)return;
  const bounded=Math.max(0,Math.min(7,index));
  const destination=sections.current[bounded];
  if(!destination)return;
  // The last stop and the first stop share the same world coordinates.
  if(bounded===0 && root.scrollTop>(sections.current[6]?.offsetTop??Infinity)){
   status.current.current=0;root.scrollTo({top:0,behavior:'instant'});setActive(0);return;
  }
  root.scrollTo({top:destination.offsetTop,behavior:reduced.current?'instant':'smooth'});
 },[]);
 useEffect(()=>{
  if(!canvas.current)return;
  return mountWorld(canvas.current,status.current,()=>setFailed(true));
 },[]);
 useEffect(()=>{
  const root=scrollRoot.current;if(!root)return;
  sections.current=Array.from(root.querySelectorAll<HTMLElement>('.j-section'));
  let frame=0;
  const update=()=>{
   const stops=sections.current.map(s=>s.offsetTop),y=root.scrollTop;
   let current=0;
   for(let i=1;i<stops.length;i++)if(y>=stops[i]-4)current=i;
   if(current!==last.current){last.current=current;setActive(current)}
   if(current===7){status.current.current=1;return;}
   const span=Math.max(1,stops[current+1]-stops[current]);
   const fraction=Math.max(0,Math.min(1,(y-stops[current])/span));
   const advance=Math.max(0,Math.min(1,(fraction-.46)/.54));
   status.current.current=(current+advance)/7;
  };
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)};
  const key=(e:KeyboardEvent)=>{
   const tag=(e.target as HTMLElement)?.tagName;
   if(tag==='INPUT'||tag==='TEXTAREA'||tag==='BUTTON'||tag==='A'||tag==='SUMMARY')return;
   if(e.key==='PageDown' || e.key==='ArrowDown'){e.preventDefault();root.scrollBy({top:e.key==='PageDown'?root.clientHeight*.84:72,behavior:'smooth'})}
   if(e.key==='PageUp' || e.key==='ArrowUp'){e.preventDefault();root.scrollBy({top:e.key==='PageUp'?-root.clientHeight*.84:-72,behavior:'smooth'})}
  };
  root.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
  window.addEventListener('keydown',key);
  const hash=decodeURIComponent(window.location.hash.slice(1));const index=chapters.findIndex(c=>c.id===hash);
  if(index>0){root.scrollTo({top:sections.current[index].offsetTop,behavior:'instant'})}
  update();
  return()=>{cancelAnimationFrame(frame);root.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);window.removeEventListener('keydown',key)};
 },[]);
 const last=useRef(0);
 const toggleOverview=()=>{status.current.overview=!overview;setOverview(x=>!x)};
 return <main className="journey" aria-label="Nasir's interactive 3D portfolio">
  <a className="j-skip" href={BASE+'?view=plain'}>Skip 3D and open the plain portfolio</a>
  <header className="j-header">
   <a className="j-logo" href="#home" onClick={e=>{e.preventDefault();goTo(0)}} aria-label="Back to the beginning">nasir<span>.</span></a>
   <div className="j-header-center"><span className="j-header-pulse"/> AN INTERACTIVE LITTLE WORLD</div>
   <div className="j-header-actions"><span className="j-current-stop">{chapters[active].marker} / 08</span><a className="j-plain" href={BASE+'?view=plain'}>Plain version <ArrowUpRight size={15}/></a></div>
  </header>
  <div className="j-shell">
   <div className="j-panel" ref={scrollRoot} id="journey-content" tabIndex={0} aria-label="Portfolio chapters, scroll for next stop">
    <JourneyContent goTo={goTo}/>
   </div>
   <aside className="j-world" aria-label="Animated miniature world following the portfolio chapters">
    <div ref={canvas} className="j-three" aria-hidden="true"/>
    {failed&&<div className="j-webgl-fallback"><Route size={52}/><strong>Seven stops, one journey.</strong><p>3D is unavailable in this browser, but every chapter still works.</p></div>}
    <div className="j-world-top"><div className="j-loop-map" aria-label="Closed circuit connecting all seven stops">
      <svg viewBox="0 0 130 75" aria-hidden="true"><ellipse cx="65" cy="37" rx="52" ry="27" fill="none" stroke="#7faea8" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 0"/>{chapters.slice(0,7).map((chapter,i)=>{const angle=Math.PI/2-i*2*Math.PI/7;return <circle key={chapter.id} cx={65+52*Math.cos(angle)} cy={37-27*Math.sin(angle)} r={active===i||active===7&&i===0?6:3.5} fill={active===i||active===7&&i===0?'#d97961':'#fdfbf5'} stroke="#466f7c" strokeWidth="2"/>})}</svg>
      <span>THE ROUND TRIP</span>
     </div><button className={'j-overview '+(overview?'is-active':'')} type="button" aria-pressed={overview} onClick={toggleOverview}><Compass size={17}/> {overview?'Follow character':'View entire loop'}</button></div>
    <nav className="j-route-nav" aria-label="Jump to portfolio stop">{chapters.map((chapter,i)=><button key={chapter.id} type="button" aria-label={'Go to '+chapter.name} aria-current={active===i?'step':undefined} className={active===i?'is-active':''} onClick={()=>goTo(i)}><span>{chapter.marker}</span><span className="j-route-tip">{chapter.name}</span></button>)}</nav>
    <div className="j-world-foot"><div className="j-instructions"><span className="j-foot-circle"><Route size={17}/></span><div><strong>{chapters[active].name}</strong><span>Scroll the story to walk the loop</span></div></div>
     <div className="j-walk-buttons"><button disabled={active===0} aria-label="Previous chapter" onClick={()=>goTo(active-1)}><ArrowLeft size={18}/></button><button disabled={active===7} aria-label="Next chapter" onClick={()=>goTo(active+1)}><ArrowRight size={18}/></button></div></div>
   </aside>
  </div>
 </main>;
}
