import React,{useEffect,useRef,useState} from 'react';
import {motion,useScroll,useTransform,useMotionValueEvent,useReducedMotion,type MotionValue} from 'motion/react';
import {
 ArrowDown,ArrowRight,ArrowUpRight,BookOpen,BriefcaseBusiness,Check,ChevronDown,
 Code2,Copy,ExternalLink,Github,GraduationCap,Layers3,Linkedin,Mail,MapPin,
 Route,ShieldCheck,Sparkles,Database,Network,Compass,ArrowLeft,CalendarDays
} from 'lucide-react';
import {projects,publications,publicLink,type Project} from './content';
import {education,experience,certifications,capabilities} from './PortfolioData';
import './motion.css';

const BASE=import.meta.env.BASE_URL;
const EMAIL='dev.nasirshuvo@gmail.com';
const featuredSlugs=['scholarbro','trip-planner','wcag-checker','leave-management'];
const featured=featuredSlugs.map(slug=>projects.find(p=>p.slug===slug)).filter((p):p is Project=>Boolean(p));
const rest=projects.filter(p=>!featuredSlugs.includes(p.slug));
const storyPath=(slug:string)=>BASE+'projects/'+slug+'/';
const ease=[.22,1,.36,1] as const;
const themes:Record<string,{number:string,tag:string,headline:string,color:string}> = {
 scholarbro:{number:'01',tag:'RESEARCH DISCOVERY',headline:'Follow an idea. Find the research.',color:'indigo'},
 'trip-planner':{number:'02',tag:'TRAVEL TECHNOLOGY',headline:'Turn destinations into a journey.',color:'azure'},
 'wcag-checker':{number:'03',tag:'ACCESSIBILITY TOOLING',headline:'See the web from another perspective.',color:'cyan'},
 'leave-management':{number:'04',tag:'WORKPLACE SOFTWARE',headline:'Make time off simple to manage.',color:'cobalt'}
};
const clamp=(v:number)=>Math.min(1,Math.max(0,v));

function useSmallScreen(){
 const [small,setSmall]=useState(()=>typeof window!=='undefined'&&window.matchMedia('(max-width: 900px)').matches);
 useEffect(()=>{const media=window.matchMedia('(max-width: 900px)');
  const sync=()=>setSmall(media.matches);sync();
  media.addEventListener('change',sync);return()=>media.removeEventListener('change',sync);
 },[]);
 return small;
}
function InView({children,className='',delay=0}:{children:React.ReactNode;className?:string;delay?:number}){
 const reduced=Boolean(useReducedMotion());
 return <motion.div className={className} initial={reduced?false:{opacity:0,y:22}}
  whileInView={reduced?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.12}}
  transition={{duration:.65,delay,ease}}>{children}</motion.div>;
}
function Eyebrow({index,children}:{index:string;children:React.ReactNode}){
 return <span className="s-eyebrow"><span>{index}</span><i/>{children}</span>;
}
function SocialLinks({light=false}:{light?:boolean}){
 return <nav className={'s-social '+(light?'s-social-light':'')} aria-label="Social and contact links">
  <a href="https://github.com/nasiriubat" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17}/> <span>GitHub</span></a>
  <a href="https://www.linkedin.com/in/nasir-shuvo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17}/><span>LinkedIn</span></a>
  <a href={'mailto:'+EMAIL} aria-label="Email"><Mail size={17}/><span>Email</span></a>
 </nav>;
}

const heroObjects=[
 {id:'research',title:'ScholarBro',subtitle:'Research discovery',type:'research',x:-245,y:-115,outX:-410,outY:-190,r:-14},
 {id:'systems',title:'Agent memory',subtitle:'Research and evaluation',type:'memory',x:280,y:-160,outX:390,outY:-225,r:16},
 {id:'travel',title:'NextEuroTrip',subtitle:'Journeys, intelligently planned',type:'travel',x:285,y:140,outX:430,outY:215,r:15},
 {id:'access',title:'WCAG Checker',subtitle:'Better accessibility',type:'access',x:-260,y:150,outX:-400,outY:240,r:-16}
] as const;
function HeroTile({item,progress,staticView}:{item:typeof heroObjects[number];progress:MotionValue<number>;staticView:boolean}){
 const x=useTransform(progress,[0,.29,.7,1],[item.x,0,0,item.outX]);
 const y=useTransform(progress,[0,.29,.7,1],[item.y,0,0,item.outY]);
 const rotate=useTransform(progress,[0,.29,.7,1],[item.r,0,0,-item.r*1.5]);
 const scale=useTransform(progress,[0,.29,.7,1],[.76,1,1,.78]);
 const opacity=useTransform(progress,[0,.17,.72,1],[.48,1,1,0]);
 return <motion.div className={'s-hero-tile s-tile-'+item.type}
   style={staticView?undefined:{x,y,rotate,scale,opacity}} aria-hidden="true">
   <div className="s-hero-tile-head"><span className="s-tile-badge">
      {item.type==='travel'?<Route size={17}/>:item.type==='access'?<ShieldCheck size={17}/>:item.type==='memory'?<Network size={17}/>:<BookOpen size={17}/>}
     </span><span className="s-tile-corner">↗</span></div>
   <strong>{item.title}</strong><small>{item.subtitle}</small>
   <div className={'s-tile-pattern s-pattern-'+item.type}>
    <i/><i/><i/><i/><i/>
   </div>
 </motion.div>;
}
function Hero(){
 const ref=useRef<HTMLElement>(null),reduced=Boolean(useReducedMotion()),small=useSmallScreen();
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
 const lift=useTransform(scrollYProgress,[0,.66,1],[0,0,-85]);
 const fade=useTransform(scrollYProgress,[0,.75,1],[1,1,.1]);
 return <section className="s-hero" id="home" ref={ref}>
  <div className="s-hero-sticky">
   <div className="s-hero-glow" aria-hidden="true"/>
   <div className="s-hero-grid s-wrap">
    <motion.div className="s-hero-copy" style={reduced||small?undefined:{y:lift,opacity:fade}}>
     <InView><span className="s-presence"><i/> SOFTWARE ENGINEER · AI RESEARCHER <span>BASED IN TAMPERE, FINLAND</span></span></InView>
     <h1 className="s-hero-name"><span>Nasir Uddin</span><em>Shuvo.</em></h1>
     <p className="s-hero-statement">I build software.<br/><span>And investigate how it thinks.</span></p>
     <p className="s-hero-desc">Full-stack developer and Project Researcher at GPT Lab, Tampere University. I turn ambitious ideas into useful products and research more dependable AI systems.</p>
     <div className="s-hero-actions">
      <a className="s-primary" href="#projects">Explore selected work <ArrowUpRight size={17}/></a>
      <a className="s-quiet" href={BASE+'?view=plain'}>Plain portfolio <ArrowRight size={16}/></a>
     </div>
     <SocialLinks/>
    </motion.div>
    <div className="s-hero-composition" aria-label="Animated composition of four real portfolio projects">
     <div className="s-hero-orbit s-orbit-a" aria-hidden="true"/>
     <div className="s-hero-orbit s-orbit-b" aria-hidden="true"/>
     <div className="s-composition-label"><span>SELECTED WORK</span><strong>Designed. Built. Researched.</strong></div>
     {heroObjects.map(item=><HeroTile key={item.id} item={item} progress={scrollYProgress} staticView={reduced||small}/>)}
     <div className="s-composition-foot" aria-hidden="true"><span>FOUR SYSTEMS / ONE WAY OF THINKING</span><Layers3 size={16}/></div>
    </div>
   </div>
   <div className="s-hero-bottom s-wrap"><span>SCROLL TO ASSEMBLE THE STORY</span><ArrowDown size={16}/><span>01 / 07</span></div>
  </div>
 </section>;
}

function FoldedDegree({entry,index,progress,staticView}:{entry:typeof education[number];index:number;progress:MotionValue<number>;staticView:boolean}){
 const dir=index===0?-1:1;
 const x=useTransform(progress,[0,.32,.72,1],[dir*205,0,0,dir*250]);
 const y=useTransform(progress,[0,.3,.72,1],[52,0,0,-72]);
 const rotateY=useTransform(progress,[0,.32,.72,1],[-dir*66,0,0,dir*58]);
 const rotateZ=useTransform(progress,[0,.32,.72,1],[dir*10,0,0,dir*-14]);
 const opacity=useTransform(progress,[0,.16,.81,1],[.25,1,1,.06]);
 return <motion.article className={'s-degree-card s-degree-'+index}
   style={staticView?undefined:{x,y,rotateY,rotateZ,opacity}}>
  <div className="s-degree-top"><div className="s-degree-insignia"><GraduationCap size={23}/></div><span>{String(index+1).padStart(2,'0')} / ACADEMIC FOUNDATION</span></div>
  <span className="s-degree-period">{entry.period}</span>
  <h3>{entry.degree}</h3>
  <strong>{entry.institution}</strong>
  <p>{entry.detail}</p>
  <div className="s-degree-footer"><span>{entry.place}</span><ArrowUpRight size={17}/></div>
 </motion.article>;
}
function Education(){
 const ref=useRef<HTMLDivElement>(null),reduced=Boolean(useReducedMotion()),small=useSmallScreen();
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
 return <section className="s-education s-chapter" id="education">
  <div className="s-degree-scroll" ref={ref}><div className="s-degree-sticky">
   <div className="s-wrap">
    <Eyebrow index="01">THE FOUNDATION</Eyebrow>
    <div className="s-chapter-heading"><h2>Curiosity had<br/><em>to start somewhere.</em></h2>
     <p>Two degrees, years of experimentation, and a habit of asking how complex systems actually work.</p></div>
    <div className="s-degrees"><div className="s-fold-line" aria-hidden="true"/>
     {education.map((entry,index)=><FoldedDegree key={entry.institution} entry={entry} index={index} progress={scrollYProgress} staticView={reduced||small}/>)}
    </div>
   </div>
  </div></div>
  <div className="s-wrap s-cert-band">
   <div><span className="s-micro">CONTINUOUS LEARNING</span><h3>Always learning. Always iterating.</h3></div>
   <div className="s-cert-grid">{certifications.map((c,i)=><span key={c}><b>{String(i+1).padStart(2,'0')}</b>{c}</span>)}</div>
  </div>
 </section>;
}

function Career(){
 const ref=useRef<HTMLElement>(null),reduced=Boolean(useReducedMotion());
 const {scrollYProgress}=useScroll({target:ref,offset:['start .65','end .85']});
 const rail=useTransform(scrollYProgress,[0,1],[0,1]);
 return <section id="experience" className="s-career s-chapter" ref={ref}>
  <div className="s-wrap">
   <Eyebrow index="02">EXPERIENCE / THE PATH</Eyebrow>
   <div className="s-chapter-heading"><h2>From building features<br/><em>to researching systems.</em></h2>
    <p>Every role shaped how I think about software: build it well, understand its limits, and make it useful.</p></div>
   <div className="s-career-layout">
    <div className="s-career-aside">
     <span>2021 — NOW</span><strong>Build.<br/>Study.<br/><em>Improve.</em></strong>
     <div className="s-career-loop" aria-hidden="true"><i/><i/><i/></div>
    </div>
    <div className="s-career-track">
     <div className="s-career-rail" aria-hidden="true"><motion.div style={reduced?undefined:{scaleY:rail}}/></div>
     {experience.map((e,i)=><InView className="s-career-entry" delay={.04*Math.min(3,i)} key={e.role+e.organization}>
      <div className="s-career-marker">{String(i+1).padStart(2,'0')}</div>
      <article><div className="s-career-date"><span>{e.period}</span><span>{e.location}</span></div>
       <h3>{e.role}</h3><strong>{e.organization}</strong><p>{e.summary}</p>
       <div className="s-pills">{e.technologies.map(t=><span key={t}>{t}</span>)}</div>
      </article>
     </InView>)}
    </div>
   </div>
  </div>
 </section>;
}

function ProjectCanvas({p}:{p:Project}){
 if(p.slug==='scholarbro')return <div className="s-product-ui s-ui-scholar">
   <div className="s-ui-toolbar"><span><BookOpen size={17}/> ScholarBro</span><span>Explore research <ArrowUpRight size={12}/></span></div>
   <div className="s-ui-scholar-intro"><span>Discover what matters.</span><strong>Research, connected.</strong></div>
   <div className="s-ui-search"><span>Search topics, papers & interests</span><span>⌕</span></div>
   <div className="s-ui-graph"><div className="s-ui-beam b1"/><div className="s-ui-beam b2"/><div className="s-ui-beam b3"/>
    <i className="n1"/><i className="n2"/><i className="n3"/><i className="n4"/><i className="n5"/>
    <span className="s-graph-label">Research interests → discovery</span></div>
  </div>;
 if(p.slug==='trip-planner')return <div className="s-product-ui s-ui-trip">
   <div className="s-ui-toolbar"><span><Compass size={17}/> NextEuroTrip</span><span>Routes & places</span></div>
   <div className="s-ui-trip-heading"><span>A better way to explore.</span><strong>Make a journey,<br/>not a checklist.</strong></div>
   <svg className="s-trip-route" viewBox="0 0 420 190" aria-hidden="true">
    <path d="M31 155 C105 90 137 161 196 94 S316 26 380 87" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="8 7"/>
    <path d="M25 32 C132 68 265 10 394 39" stroke="#a8c4e5" strokeWidth="2" fill="none" strokeDasharray="4 10"/>
    {[[31,155],[196,94],[380,87]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="11" fill="#fff" stroke="#2563eb" strokeWidth="3"/><text x={x} y={y-20} textAnchor="middle">{['START','EXPLORE','ARRIVE'][i]}</text></g>)}
   </svg>
   <div className="s-ui-trip-tabs"><span>Explore places</span><span>Plan your days</span><span>Route your journey</span></div>
  </div>;
 if(p.slug==='wcag-checker')return <div className="s-product-ui s-ui-audit">
   <div className="s-ui-toolbar"><span><ShieldCheck size={17}/> WCAG Checker</span><span>Inspect / Improve</span></div>
   <div className="s-ui-audit-columns"><div className="s-ui-mockpage">
    <span>Accessible by design.</span><strong>Make every<br/>interaction count.</strong>
    <div className="s-ui-mockline"/><div className="s-ui-mockline short"/><div className="s-ui-mockbutton">Continue →</div>
    <div className="s-ui-focus-ring"/>
   </div><div className="s-ui-audit-checks"><span>REVIEW CATEGORIES</span>
    {['Semantic structure','Keyboard focus','Contrast & labels','Usable interactions'].map(t=><div key={t}><Check size={13}/>{t}</div>)}
   </div></div>
  </div>;
 return <div className="s-product-ui s-ui-leave">
   <div className="s-ui-toolbar"><span><CalendarDays size={17}/> LeaveHub</span><span>Time off / Team view</span></div>
   <div className="s-ui-leave-summary"><span>TIME OFF, CLEARLY</span><strong>Less admin.<br/>More clarity.</strong></div>
   <div className="s-ui-calendar">{['M','T','W','T','F','S','S',...Array.from({length:28},(_,i)=>String(i+1))].map((d,i)=><span key={i} className={i>6&&i%9===0?'selected':''}>{d}</span>)}</div>
   <div className="s-ui-leave-tags"><span>Requests</span><span>Approvals</span><span>Team calendar</span></div>
  </div>;
}
const partStart=[{x:-250,y:130,r:-16},{x:210,y:-160,r:13},{x:290,y:150,r:15},{x:-210,y:-155,r:-12}];
const partExit=[{x:190,y:-225,r:13},{x:-220,y:-160,r:-18},{x:-245,y:210,r:-13},{x:260,y:165,r:22}];
function ProjectPart({progress,index,children}:{progress:MotionValue<number>;index:number;children:React.ReactNode}){
 const a=partStart[index],b=partExit[index];
 const x=useTransform(progress,[0,.20,.73,1],[a.x,0,0,b.x]);
 const y=useTransform(progress,[0,.20,.73,1],[a.y,0,0,b.y]);
 const rotate=useTransform(progress,[0,.20,.73,1],[a.r,0,0,b.r]);
 const rotateY=useTransform(progress,[0,.2,.73,1],[a.r*1.2,0,0,b.r*.9]);
 const scale=useTransform(progress,[0,.2,.73,1],[.65,1,1,.65]);
 const opacity=useTransform(progress,[0,.13,.76,1],[0,1,1,0]);
 return <motion.div className={'s-project-part s-project-part-'+index}
    style={{x,y,rotate,rotateY,scale,opacity}}>{children}</motion.div>;
}
function ProjectStage({p,index,count,progress,active}:{p:Project;index:number;count:number;progress:MotionValue<number>;active:boolean}){
 const phase=useTransform(progress,v=>clamp((v-index/count)*count));
 const fade=useTransform(phase,index===0?[0,.1,.7,1]:[0,.11,.7,1],index===0?[1,1,1,0]:[0,1,1,0]);
 const move=useTransform(phase,[0,.19,.73,1],[34,0,0,-40]);
 const theme=themes[p.slug]||{number:String(index+1).padStart(2,'0'),tag:p.category,headline:p.description,color:'azure'};
 const live=publicLink(p);
 return <motion.div className={'s-theater-stage s-theme-'+theme.color} style={{opacity:fade,pointerEvents:active?'auto':'none'}}
  aria-hidden={!active}>
   <motion.div className="s-project-copy" style={{y:move}}>
    <span className="s-project-index">{theme.number} / {String(count).padStart(2,'0')} · {theme.tag}</span>
    <h3>{p.title}</h3>
    <strong>{theme.headline}</strong>
    <p>{p.description}</p>
    <div className="s-pills">{(p.stack||[]).slice(0,5).map(t=><span key={t}>{t}</span>)}</div>
    <div className="s-stage-links">
     <a href={storyPath(p.slug)} tabIndex={active?0:-1}>View case study <ArrowUpRight size={17}/></a>
     {live&&<a href={live} target="_blank" rel="noopener noreferrer" tabIndex={active?0:-1}>Live product <ExternalLink size={16}/></a>}
    </div>
   </motion.div>
   <div className="s-project-stage-art" aria-label={p.title+' conceptual interface composition'}>
    <div className="s-project-floor" aria-hidden="true"/>
    <ProjectPart progress={phase} index={0}><ProjectCanvas p={p}/></ProjectPart>
    <ProjectPart progress={phase} index={1}><div className="s-project-fragment fragment-1"><span>THE PRODUCT</span><strong>{p.title}</strong><i/></div></ProjectPart>
    <ProjectPart progress={phase} index={2}><div className="s-project-fragment fragment-2"><span>BUILT WITH</span>
     {(p.stack||[]).slice(0,3).map(t=><strong key={t}>{t}</strong>)}</div></ProjectPart>
    <ProjectPart progress={phase} index={3}><div className="s-project-fragment fragment-3">
     <div><Layers3 size={21}/><span>FROM IDEA TO IMPLEMENTATION</span></div><span>{p.category}</span>
    </div></ProjectPart>
   </div>
  </motion.div>;
}
function MobileProject({p,index}:{p:Project;index:number}){
 const theme=themes[p.slug]||{number:'0'+(index+1),tag:p.category,headline:'',color:'azure'};
 const live=publicLink(p);
 return <InView className={'s-mobile-product s-theme-'+theme.color}>
  <div className="s-project-index">{theme.number} / {String(featured.length).padStart(2,'0')} · {theme.tag}</div>
  <div className="s-mobile-art"><ProjectCanvas p={p}/></div>
  <h3>{p.title}</h3><p>{p.description}</p>
  <div className="s-pills">{(p.stack||[]).slice(0,4).map(t=><span key={t}>{t}</span>)}</div>
  <div className="s-stage-links"><a href={storyPath(p.slug)}>Case study <ArrowUpRight size={17}/></a>
    {live&&<a href={live} target="_blank" rel="noopener noreferrer">Live product <ExternalLink size={16}/></a>}</div>
 </InView>;
}
function Projects(){
 const ref=useRef<HTMLElement>(null),reduced=Boolean(useReducedMotion()),small=useSmallScreen();
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
 const [active,setActive]=useState(0),[showAll,setShowAll]=useState(false);
 const count=featured.length;
 useMotionValueEvent(scrollYProgress,'change',v=>{
  if(count&&!small&&!reduced){const next=Math.min(count-1,Math.max(0,Math.floor(v*count)));
   setActive(current=>current===next?current:next);}
 });
 return <section className="s-projects s-chapter" id="projects">
   <div className="s-wrap s-projects-intro">
    <Eyebrow index="03">SELECTED WORK / PRODUCT STORIES</Eyebrow>
    <div className="s-chapter-heading"><h2>Products that don't<br/><em>stay as ideas.</em></h2>
     <p>Watch interfaces assemble from their parts. Each project explores a different problem—and each has a proper case study behind the visuals.</p></div>
   </div>
   {small||reduced||!count?<div className="s-wrap s-mobile-projects">{featured.map((p,i)=><MobileProject key={p.slug} p={p} index={i}/>)}</div>:
    <div ref={ref} className="s-project-scroll" style={{height:count*118+'vh'}}>
     <div className="s-project-sticky">
      <div className="s-theater-top s-wrap"><span>PROJECT ASSEMBLY / SCROLL TO TRANSFORM</span><span>{String(active+1).padStart(2,'0')} / {String(count).padStart(2,'0')}</span></div>
      <div className="s-theater-window s-wrap">
       {featured.map((p,i)=><ProjectStage key={p.slug} p={p} index={i} count={count} progress={scrollYProgress} active={i===active}/>)}
      </div>
      <div className="s-theater-bottom s-wrap"><div className="s-theater-dots" aria-label="Selected project sequence">{featured.map((p,i)=><span key={p.slug} className={i===active?'active':''}/>)}</div>
       <span>ASSEMBLE → EXPLORE → DISASSEMBLE</span></div>
     </div>
    </div>}
   <div className="s-wrap s-other-projects">
    <div className="s-other-heading"><div><span className="s-micro">MORE BUILDS & EXPERIMENTS</span><h3>More than the highlights.</h3></div>
     <p>Applications, developer tools, research prototypes, and experiments. All linked to their individual case studies.</p></div>
    <div className="s-other-grid">{(showAll?rest:rest.slice(0,6)).map((p,i)=><InView className="s-other-card" key={p.slug} delay={i%3*.05}>
      <a href={storyPath(p.slug)}><span className="s-other-category">{p.category}</span>
       <span className="s-other-icon">{p.title.slice(0,1)}</span>
       <strong>{p.title}</strong><span className="s-other-description">{p.description}</span>
       <span className="s-other-foot">EXPLORE THE CASE STUDY <ArrowUpRight size={18}/></span></a>
     </InView>)}</div>
    {rest.length>6&&<button type="button" className="s-more-button" onClick={()=>setShowAll(v=>!v)} aria-expanded={showAll}>
      {showAll?'Show fewer projects':'View all '+rest.length+' other projects'} <ChevronDown size={17}/></button>}
   </div>
 </section>;
}

const researchNodes=[
 {name:'Sources',label:'Files · web · context',icon:BookOpen},
 {name:'Retrieval',label:'Grounded information',icon:Database},
 {name:'Memory',label:'Long-term context',icon:Layers3},
 {name:'Reasoning',label:'Agents · tools · plans',icon:Network},
 {name:'Evaluation',label:'Reliability · evidence',icon:ShieldCheck}
];
function ResearchNode({item,index,progress,staticView}:{item:typeof researchNodes[number];index:number;progress:MotionValue<number>;staticView:boolean}){
 const offsets=[[-170,105,13],[0,-155,-11],[10,185,9],[0,-160,-10],[170,103,11]];
 const a=offsets[index];
 const x=useTransform(progress,[0,.28,.75,1],[a[0],0,0,-a[0]]);
 const y=useTransform(progress,[0,.28,.75,1],[a[1],0,0,-a[1]]);
 const rotate=useTransform(progress,[0,.28,.75,1],[a[2],0,0,-a[2]]);
 const opacity=useTransform(progress,[0,.16,.78,1],[.2,1,1,.35]);
 const Icon=item.icon;
 return <motion.div className={'s-research-node s-research-node-'+index} style={staticView?undefined:{x,y,rotate,opacity}}>
  <span className="s-node-number">0{index+1}</span>
  <div className="s-node-icon"><Icon size={28}/></div>
  <strong>{item.name}</strong><small>{item.label}</small>
 </motion.div>;
}
function Research(){
 const ref=useRef<HTMLDivElement>(null),reduced=Boolean(useReducedMotion()),small=useSmallScreen();
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
 const line=useTransform(scrollYProgress,[0,.28,.76,1],[0,1,1,0]);
 return <section className="s-research s-chapter" id="research">
  <div className="s-research-scroll" ref={ref}><div className="s-research-sticky">
   <div className="s-wrap">
    <Eyebrow index="04">AI / MEMORY / EVIDENCE</Eyebrow>
    <div className="s-chapter-heading"><h2>Engineering is the craft.<br/><em>Research asks why it works.</em></h2>
     <p>I research agent memory, retrieval, reproducibility, and reliability. Here is how the building blocks relate to each other.</p></div>
    <div className="s-research-pipeline">
     <motion.div className="s-research-connector" aria-hidden="true" style={reduced||small?undefined:{scaleX:line}}/>
     {researchNodes.map((item,i)=><ResearchNode key={item.name} item={item} index={i} progress={scrollYProgress} staticView={reduced||small}/>)}
    </div>
    <div className="s-research-bottom">CONTEXT IN <span>→</span> USEFUL, TESTABLE SYSTEMS OUT</div>
   </div>
  </div></div>
  <div className="s-wrap s-publications">
    <div className="s-other-heading"><div><span className="s-micro">PUBLISHED / LINKED RESEARCH</span><h3>The work behind the work.</h3></div>
     <p>Actual linked research outputs. No fabricated publications, experiments, or performance claims.</p></div>
    <div className="s-paper-list">{publications.length?publications.map((p,i)=><a key={p.title} href={p.url} rel="noopener noreferrer" target="_blank">
      <span>{String(i+1).padStart(2,'0')}</span><div><strong>{p.title}</strong><small>{p.venue}{p.year?' · '+p.year:''}</small></div><ExternalLink size={18}/>
    </a>):<p>No linked publications in the CMS yet.</p>}</div>
  </div>
 </section>;
}
function ServiceCard({item,index,progress,staticView}:{item:typeof capabilities[number];index:number;progress:MotionValue<number>;staticView:boolean}){
 const startX=[250,0,-250][index],spin=[-18,0,18][index];
 const x=useTransform(progress,[0,.35,.75,1],[startX,0,0,-startX*.6]);
 const y=useTransform(progress,[0,.35,.75,1],[32,0,0,-30]);
 const rotate=useTransform(progress,[0,.35,.75,1],[spin,0,0,-spin]);
 const opacity=useTransform(progress,[0,.13,.85,1],[.25,1,1,.42]);
 return <motion.article className="s-service-card" style={staticView?undefined:{x,y,rotate,opacity}}>
   <span className="s-service-number">{item.number} <ArrowUpRight size={19}/></span>
   <div className="s-service-icon">{index===0?<Code2 size={35}/>:index===1?<Network size={35}/>:<BookOpen size={35}/>}</div>
   <h3>{item.title}</h3><p>{item.details}</p>
   <span className="s-service-footer">{item.label}</span>
 </motion.article>;
}
function Services(){
 const ref=useRef<HTMLDivElement>(null),reduced=Boolean(useReducedMotion()),small=useSmallScreen();
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
 return <section id="services" className="s-services s-chapter">
  <div className="s-service-scroll" ref={ref}><div className="s-service-sticky">
   <div className="s-wrap">
    <Eyebrow index="05">EXPERTISE / WHAT I CAN BUILD</Eyebrow>
    <div className="s-chapter-heading"><h2>Different disciplines.<br/><em>One connected skill set.</em></h2>
     <p>From full-stack product delivery to agent-based tools and careful experimental research.</p></div>
    <div className="s-service-grid">{capabilities.map((item,i)=><ServiceCard key={item.number} item={item} index={i} progress={scrollYProgress} staticView={reduced||small}/>)}</div>
   </div>
  </div></div>
  <div className="s-wrap s-skills-below"><span className="s-micro">TOOLS & TECHNOLOGIES</span>
   <div className="s-skill-groups">
    <div><strong>FULL-STACK</strong><p>React · TypeScript · Laravel · PHP · Python · Flask · PostgreSQL · Node.js</p></div>
    <div><strong>INTELLIGENT SYSTEMS</strong><p>AI agents · RAG · Retrieval · Embeddings · Agent memory · Evaluation</p></div>
    <div><strong>RELIABILITY</strong><p>Testing · System design · Reproducible benchmarking · REST APIs · Deployment</p></div>
   </div>
  </div>
 </section>;
}
function Contact(){
 const ref=useRef<HTMLElement>(null),reduced=Boolean(useReducedMotion());
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end end']});
 const x=useTransform(scrollYProgress,[0,.35,.7,1],[165,0,0,-70]);
 const y=useTransform(scrollYProgress,[0,.35,.7,1],[90,0,0,-45]);
 const rotate=useTransform(scrollYProgress,[0,.35,.7,1],[11,0,0,-5]);
 const [message,setMessage]=useState('');
 async function copyEmail(){try{await navigator.clipboard.writeText(EMAIL);setMessage('Email copied to clipboard');}
 catch{setMessage('Copy this address: '+EMAIL);}}
 return <section className="s-contact s-chapter" id="contact" ref={ref}>
  <div className="s-wrap s-contact-grid">
   <div className="s-contact-copy"><Eyebrow index="06">YOUR TURN / LET'S CONNECT</Eyebrow>
    <h2>Something in mind?<br/><em>Let's make it real.</em></h2>
    <p>Looking for a full-stack developer, an AI engineering collaborator, or someone who cares about reliable systems? I'd love to hear what you're building.</p>
    <SocialLinks light/>
   </div>
   <motion.div className="s-contact-panel" style={reduced?undefined:{x,y,rotate}}>
    <span className="s-contact-caption">START A CONVERSATION <Mail size={20}/></span>
    <strong>{EMAIL}</strong>
    <p>For products, collaborations, and research conversations.</p>
    <div className="s-contact-actions"><button type="button" onClick={copyEmail}><Copy size={18}/> Copy email</button>
     <a href={'mailto:'+EMAIL}>Send email <ArrowUpRight size={18}/></a></div>
    <div className="s-copy-status" aria-live="polite" role="status">{message}</div>
   </motion.div>
  </div>
  <footer className="s-wrap s-story-footer"><span>© {new Date().getFullYear()} Nasir Uddin Shuvo</span>
   <span>Tampere, Finland · Research and engineering</span><a href="#home">Back to top ↑</a></footer>
 </section>;
}
export default function MotionPortfolio(){
 useEffect(()=>{const id=decodeURIComponent(window.location.hash.slice(1));if(!id)return;
  requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'})));},[]);
 return <main className="s-portfolio" id="start">
  <Hero/><Education/><Career/><Projects/><Research/><Services/><Contact/>
 </main>;
}
