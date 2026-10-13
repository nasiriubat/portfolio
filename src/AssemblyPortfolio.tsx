import React,{useEffect,useRef,useState} from 'react';
import {motion,useScroll,useTransform,useReducedMotion,useMotionValueEvent,AnimatePresence,type MotionValue} from 'motion/react';
import {ArrowDownRight,ArrowRight,ArrowUpRight,BookOpen,BrainCircuit,Check,CheckCheck,Code2,Compass,ExternalLink,FileText,Github,GraduationCap,Layers3,Linkedin,Mail,MapPin,MoveUpRight,Network,ShieldCheck,Sparkles,Terminal,Workflow} from 'lucide-react';
import {projects,publications,publicLink,type Project} from './content';
import {experience,education,certifications,capabilities} from './PortfolioData';
import './kinetic.css';

const base=import.meta.env.BASE_URL;
const detail=(p:Project)=>base+'projects/'+p.slug+'/';
const reduceTransition={duration:0};
const ease=[.22,1,.36,1] as const;
const topics=[
 {name:'Retrieval',explanation:'Making grounded information available when an agent needs it.',icon:BookOpen},
 {name:'Memory',explanation:'Studying what agent systems retain, update and forget.',icon:BrainCircuit},
 {name:'Reasoning',explanation:'Tools, decisions, context and multi-step workflows.',icon:Workflow},
 {name:'Evaluation',explanation:'Reproducible tests, robustness and failure analysis.',icon:CheckCheck}
];
const services=[
 {name:'Full-stack applications',detail:'Interfaces, APIs, data and deployment that work together.',icon:Code2},
 {name:'AI apps and agents',detail:'Workflow automation, tool use and practical LLM integrations.',icon:BrainCircuit},
 {name:'RAG and search',detail:'Retrieval, knowledge systems, evaluation and citations.',icon:BookOpen},
 {name:'Research engineering',detail:'Prototypes, experiment harnesses and reliable evaluation.',icon:Network}
];
function SectionMark({number,children}:{number:string;children:React.ReactNode}){
 return <div className="k-section-mark"><span>{number}</span><span className="k-mark-line"/>{children}</div>;
}
function Appear({children,className='',delay=0}:{children:React.ReactNode;className?:string;delay?:number}){
 const reduced=useReducedMotion();
 return <motion.div className={className} initial={reduced?false:{opacity:0,y:46,filter:'blur(7px)'}} whileInView={reduced?undefined:{opacity:1,y:0,filter:'blur(0px)'}} viewport={{once:true,amount:.14}} transition={{duration:.8,ease,delay}}>{children}</motion.div>;
}
function Socials({className=''}:{className?:string}){
 return <div className={'k-social '+className}>
  <a href="https://github.com/nasiriubat" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Github size={18}/><span>GitHub</span></a>
  <a href="https://www.linkedin.com/in/nasir-shuvo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin size={18}/><span>LinkedIn</span></a>
  <a href="mailto:dev.nasirshuvo@gmail.com" aria-label="Send Nasir an email"><Mail size={18}/><span>Email</span></a>
 </div>;
}
type OrbitCard={name:string;meta:string;icon:React.ElementType;className:string};
const orbitCards:OrbitCard[]=[
 {name:'Full-stack',meta:'MAKE IT WORK',icon:Code2,className:'k-card-code'},
 {name:'AI agents',meta:'MAKE IT SMART',icon:BrainCircuit,className:'k-card-agents'},
 {name:'Research',meta:'MAKE IT RELIABLE',icon:Network,className:'k-card-research'},
 {name:'Products',meta:'MAKE IT REAL',icon:Layers3,className:'k-card-product'}
];
function OrbitPiece({data,index,progress}:{data:OrbitCard;index:number;progress:MotionValue<number>}){
 const reduced=useReducedMotion();
 const x=useTransform(progress,[0,.36,.72,1],
  [index%2===0?-290:290,index%2===0?-74:74,[0,134,-118,12][index],[0,160,-134,28][index]]);
 const y=useTransform(progress,[0,.36,.72,1],
  [index<2?-160:160,index<2?-60:60,[-115,-14,44,153][index],[-118,-26,63,159][index]]);
 const rotate=useTransform(progress,[0,.4,.8,1],[[ -29,23,-23,35][index],0,[-13,11,-8,13][index],[-10,8,-7,12][index]]);
 const scale=useTransform(progress,[0,.3,.65,1],[.63,.92,1,1]);
 const opacity=useTransform(progress,[0,.13,.35,1],[0,1,1,1]);
 const Icon=data.icon;
 return <motion.div className={'k-orbit-piece '+data.className}
   style={reduced?undefined:{x,y,rotate,scale,opacity}}>
   <span className="k-piece-icon"><Icon size={25}/></span>
   <span className="k-piece-copy"><strong>{data.name}</strong><small>{data.meta}</small></span>
   <ArrowUpRight size={19} className="k-piece-arrow"/>
 </motion.div>;
}
function Hero(){
 const ref=useRef<HTMLElement>(null);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
 const p=useTransform(scrollYProgress,[0,.76],[0,1]);
 const centerScale=useTransform(p,[0,.36,.72,1],[.74,1,1.06,.96]);
 const centerRotate=useTransform(p,[0,.4,1],[-13,0,5]);
 const halo=useTransform(p,[0,.5,1],[.56,1,.72]);
 return <section className="k-hero k-scroll-area" id="home" ref={ref}>
  <div className="k-hero-sticky">
   <div className="k-hero-noise" aria-hidden="true"/>
   <div className="k-shell k-hero-layout">
    <div className="k-hero-copy">
     <Appear><div className="k-overline"><span className="k-live-dot"/> FULL-STACK DEVELOPER · AI RESEARCHER <span className="k-location"><MapPin size={12}/> TAMPERE</span></div></Appear>
     <h1 className="k-hero-title"><span className="k-title-line"><motion.span initial={reduced?false:{y:'110%'}} animate={{y:0}} transition={{duration:.85,ease}}>Hi, I'm</motion.span></span>
     <span className="k-title-line k-name"><motion.span initial={reduced?false:{y:'110%'}} animate={{y:0}} transition={{duration:.9,delay:.11,ease}}>Nasir<span className="k-period">.</span></motion.span></span></h1>
     <Appear delay={.22}><h2 className="k-hero-promise">I build software.<br/><em>I question how it works.</em></h2>
      <p>Full-stack developer and project researcher at GPT Lab, Tampere University. I build products, explore intelligent systems, and study what makes them reliable.</p></Appear>
     <Appear delay={.28}><Socials/></Appear>
     <Appear delay={.37}><div className="k-hero-buttons"><a className="k-primary" href="#projects">Explore the work <ArrowDownRight size={19}/></a><a className="k-underlink" href={base+'?view=plain'}>Just the facts — plain view <ArrowUpRight size={16}/></a></div></Appear>
    </div>
    <div className="k-hero-visual">
     <motion.div className="k-stage-halo" style={reduced?undefined:{scale:halo}}/>
     <motion.div className="k-hero-core" style={reduced?undefined:{scale:centerScale,rotate:centerRotate}}>
       <div className="k-core-header"><span><i/><i/><i/></span><span>NASIR / SYSTEMS</span><span>01. BUILD</span></div>
       <div className="k-core-content"><span>MAKE IDEAS</span><strong>WORK.</strong><div className="k-core-lines"><b/><b/><b/></div></div>
       <div className="k-core-bottom"><span>ENGINEER</span><span>RESEARCH</span><span>SHIP</span></div>
     </motion.div>
     <div className="k-orbit-field">{orbitCards.map((data,i)=><OrbitPiece key={data.name} data={data} index={i} progress={p}/>)}</div>
     <span className="k-visual-label">INTERACTIVE SYSTEM / 001</span>
    </div>
   </div>
   <div className="k-hero-bottom k-shell"><span>SCROLL TO ASSEMBLE</span><span>IDEAS → SYSTEMS → PRODUCTS</span><span>↓</span></div>
  </div>
 </section>;
}
function DegreeScene(){
 const ref=useRef<HTMLElement>(null);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 return <section className="k-section k-education" id="education" ref={ref}>
  <div className="k-shell">
   <Appear><SectionMark number="01">THE FOUNDATION</SectionMark><div className="k-chapter-heading"><h2>Learning shapes<br/><em>what we build.</em></h2><p>From computer science fundamentals to advanced software and cloud systems.</p></div></Appear>
   <div className="k-degree-track">
    <div className="k-connecting-spine" aria-hidden="true"><motion.span style={reduced?undefined:{scaleX:useTransform(scrollYProgress,[.2,.7],[0,1])}}/></div>
    {education.map((d,i)=><DegreeCard key={d.degree} data={d} index={i} progress={scrollYProgress}/>)}
   </div>
   <Appear><div className="k-credentials-line"><strong>Continued learning</strong><div>{certifications.map(c=><span key={c}>{c}</span>)}</div></div></Appear>
  </div>
 </section>;
}
function DegreeCard({data,index,progress}:{data:(typeof education)[number];index:number;progress:MotionValue<number>}){
 const reduced=useReducedMotion();
 const offset=index===0?-1:1;
 const x=useTransform(progress,[.06,.38,.73,.97],[offset*-160,0,0,offset*120]);
 const y=useTransform(progress,[.06,.35,.75,.97],[80,0,0,-30]);
 const rotateY=useTransform(progress,[.06,.42,.75,.97],[offset*28,0,0,offset*-19]);
 const opacity=useTransform(progress,[.04,.24,.83,1],[0,1,1,.28]);
 return <motion.article className="k-degree-card" style={reduced?undefined:{x,y,rotateY,opacity}}>
   <div className="k-degree-symbol"><GraduationCap size={27}/><span>{String(index+1).padStart(2,'0')}</span></div>
   <div className="k-degree-years">{data.period}</div><h3>{data.degree}</h3>
   <p className="k-degree-school">{data.institution}</p><p className="k-degree-detail">{data.detail}</p>
   <div className="k-degree-bottom"><span><MapPin size={13}/> {data.place}</span><ArrowUpRight size={19}/></div>
 </motion.article>;
}
function ExperienceScene(){
 const ref=useRef<HTMLElement>(null);const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const progress=useTransform(scrollYProgress,[.2,.77],[0,1]);
 return <section id="experience" className="k-section k-experience" ref={ref}>
  <div className="k-shell">
   <Appear><SectionMark number="02">THE JOURNEY</SectionMark>
    <div className="k-chapter-heading"><h2>Experience built<br/><em>one system at a time.</em></h2><p>Software engineering in industry, followed by applied AI research at Tampere University.</p></div></Appear>
   <div className="k-career-layout">
    <div className="k-career-rail" aria-hidden="true"><motion.div style={reduced?undefined:{scaleY:progress}}/><span>2021</span><span>2026 +</span></div>
    <div className="k-career-entries">{[...experience].reverse().map((e,i)=><CareerCard key={e.organization+e.role} data={e} index={i} progress={scrollYProgress}/>)}</div>
   </div>
  </div>
 </section>;
}
function CareerCard({data,index,progress}:{data:(typeof experience)[number];index:number;progress:MotionValue<number>}){
 const reduced=useReducedMotion();
 const x=useTransform(progress,[Math.max(0,.06+index*.11),Math.min(.95,.32+index*.12)],[index%2===0?-75:75,0]);
 const opacity=useTransform(progress,[Math.max(0,.05+index*.11),Math.min(.95,.28+index*.12)],[.22,1]);
 return <motion.article className="k-career-card" style={reduced?undefined:{x,opacity}}>
  <span className="k-career-index">{String(index+1).padStart(2,'0')}</span>
  <div><span className="k-career-years">{data.period}</span><h3>{data.role}</h3><strong>{data.organization}</strong><p>{data.summary}</p><div className="k-tech-tags">{data.technologies.map(t=><span key={t}>{t}</span>)}</div></div>
 </motion.article>;
}
const featuredKeys=['scholarbro','trip-planner','wcag-checker'];
const featuredDefaults=[
 {title:'ScholarBro',slug:'scholarbro',category:'Research discovery',description:'Discover academic work and follow research interests.',status:'Live',url:'https://scholarbro.com',featured:true,stack:['Research','Discovery']},
 {title:'NextEuroTrip',slug:'trip-planner',category:'Travel product',description:'Create thoughtful travel routes and itineraries.',status:'Live',url:'https://nexteurotrip.com',featured:true,stack:['Maps','Planning']},
 {title:'WCAG Checker',slug:'wcag-checker',category:'Accessibility engineering',description:'Inspect accessibility issues and work toward actionable fixes.',status:'Live',url:'',featured:true,stack:['Web','Accessibility']}
] as Project[];
const featured=featuredKeys.map((slug,i)=>projects.find(p=>p.slug===slug)||featuredDefaults[i]);
function ProductVisual({index}:{index:number}){
 if(index===0)return <div className="k-product-network" aria-label="Illustration of connected research topics">
  <span className="k-network-label">RESEARCH DISCOVERY</span>
  <svg viewBox="0 0 600 310" role="img" aria-label="Research interests connected to research papers">
   <path d="M100 175 Q210 18 303 138 T516 78 M100 175 Q160 295 303 138 T510 245 M303 138 L308 42" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="5 7"/>
   {[[100,175,18],[303,138,29],[516,78,18],[510,245,15],[308,42,13]].map(([x,y,r],i)=><circle key={i} cx={x} cy={y} r={r} fill={i===1?'#4c76ff':'#d5e5ff'} stroke="#7c9df8" strokeWidth="3"/>)}
  </svg>
  <div className="k-product-nodes"><span>Find papers</span><span>Follow topics</span><span>Discover connections</span></div>
 </div>;
 if(index===1)return <div className="k-product-travel" aria-label="Illustration of a European journey">
  <div className="k-travel-globe"><Compass size={54}/></div>
  <svg viewBox="0 0 560 240" role="img" aria-label="Route winding between travel destinations"><path d="M40 172 C145 185 151 30 255 92 S360 220 512 58" fill="none" stroke="#5c8bed" strokeWidth="7" strokeLinecap="round" strokeDasharray="12 15"/>{[[40,172],[255,92],[512,58]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="16" fill="#fff" stroke="#4677ec" strokeWidth="5"/><text x={x} y={y-27} textAnchor="middle">{['START','EXPLORE','ARRIVE'][i]}</text></g>)}</svg>
  <div className="k-travel-bottom"><span>WHERE TO GO</span><span>WHAT TO SEE</span><span>HOW TO GET THERE</span></div>
 </div>;
 return <div className="k-product-audit" aria-label="Illustration of an accessibility review">
  <div className="k-audit-browser"><div className="k-audit-top"><i/><i/><i/><span>Accessibility inspection</span></div>
   <div className="k-audit-body"><div><b/><i/><i/><strong>Get started</strong><div className="k-audit-focus"/></div><aside><span>ISSUES TO REVIEW</span><p><Check size={15}/> Labels</p><p><Check size={15}/> Contrast</p><p><Check size={15}/> Keyboard</p></aside></div>
  </div>
 </div>;
}
function ProjectPanel({project,index}:{project:Project;index:number}){
 const link=publicLink(project);
 return <article className="k-featured-panel">
  <div className="k-featured-meta"><span>FEATURED PRODUCT / 0{index+1}</span><span>{project.category}</span></div>
  <div className="k-featured-grid">
   <div className="k-featured-copy"><div className="k-featured-num">0{index+1}</div><h3>{project.title}</h3><p>{project.description}</p>
    <div className="k-tech-tags">{(project.stack||[]).slice(0,4).map(t=><span key={t}>{t}</span>)}</div>
    <div className="k-featured-links"><a className="k-primary" href={detail(project)}>Read case study <ArrowUpRight size={18}/></a>{link&&<a href={link} target="_blank" rel="noopener noreferrer" className="k-underlink">Visit product <ExternalLink size={16}/></a>}</div>
   </div>
   <div className={'k-featured-render k-product-'+index}><ProductVisual index={index}/></div>
  </div>
 </article>;
}
function FeatureStep({project,index}:{project:Project;index:number}){
 const ref=useRef<HTMLDivElement>(null);const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const y=useTransform(scrollYProgress,[0,.35,.58,1],[125,0,0,-140]);
 const x=useTransform(scrollYProgress,[0,.28,.62,1],[index%2===0?-135:135,0,0,index%2===0?155:-155]);
 const rotateY=useTransform(scrollYProgress,[0,.3,.64,1],[index%2===0?22:-22,0,0,index%2===0?-26:26]);
 const scale=useTransform(scrollYProgress,[0,.3,.63,1],[.78,1,1,.79]);
 const opacity=useTransform(scrollYProgress,[0,.2,.76,1],[.25,1,1,.28]);
 return <div ref={ref} className="k-featured-step"><motion.div className="k-featured-perspective" style={reduced?undefined:{x,y,rotateY,scale,opacity}}><ProjectPanel project={project} index={index}/></motion.div></div>;
}
function ProjectScene(){
 const [all,setAll]=useState(false);
 const remaining=projects.filter(p=>!featuredKeys.includes(p.slug));
 return <section className="k-projects k-section" id="projects">
  <div className="k-shell">
   <Appear><SectionMark number="03">WORK IN THE WILD</SectionMark><div className="k-chapter-heading k-project-heading"><h2>Ideas, engineered<br/><em>into real products.</em></h2><p>Three problems, three transformations. Scroll to watch each product assemble and unfold.</p></div></Appear>
  </div>
  <div className="k-featured-stack">{featured.map((p,i)=><FeatureStep key={p.slug} project={p} index={i}/>)}</div>
  <div className="k-shell k-more-work">
   <Appear><div className="k-more-work-title"><div><SectionMark number="03.1">MORE OF THE WORK</SectionMark><h3>Still building.</h3></div><p>More products, experimental systems and useful developer tools, sourced from the portfolio CMS.</p></div></Appear>
   <div className="k-more-grid">{(all?remaining:remaining.slice(0,6)).map((p,i)=><Appear key={p.slug} delay={(i%3)*.06}><a href={detail(p)} className="k-work-card">
    <span className="k-work-card-top"><span>{p.category}</span><ArrowUpRight size={19}/></span><strong>{p.title}</strong><p>{p.description}</p><span className="k-work-card-foot">CASE STUDY <ArrowRight size={18}/></span>
   </a></Appear>)}</div>
   {remaining.length>6&&<button className="k-show-all" type="button" aria-expanded={all} onClick={()=>setAll(!all)}>{all?'Show fewer':`Show all ${remaining.length} projects`} <ArrowDownRight size={17}/></button>}
  </div>
 </section>;
}
function ResearchScene(){
 const ref=useRef<HTMLElement>(null);const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const lines=useTransform(scrollYProgress,[.12,.62],[0,1]);
 const nodeScale=useTransform(scrollYProgress,[.2,.55,.86],[.65,1,1]);
 return <section className="k-research k-section" id="research" ref={ref}>
  <div className="k-shell">
   <Appear><SectionMark number="04">UNDER THE HOOD</SectionMark><div className="k-chapter-heading"><h2>Not just building.<br/><em>Understanding why.</em></h2><p>Reliable intelligent systems need retrieval, memory, reasoning and evaluation working as one.</p></div></Appear>
   <div className="k-research-system">
    <motion.div className="k-research-diagram" style={reduced?undefined:{scale:nodeScale}}>
     <svg className="k-research-lines" viewBox="0 0 540 410" role="img" aria-label="Four connected research areas"><motion.path d="M270 205 L112 78 M270 205 L430 78 M270 205 L112 330 M270 205 L430 330" stroke="#83b3ff" strokeWidth="2.5" strokeDasharray="7 9" fill="none" style={reduced?undefined:{pathLength:lines}}/></svg>
     <div className="k-center-node"><Network size={39}/><strong>AI SYSTEMS</strong></div>
     {topics.map((topic,i)=><div className={'k-diagram-node k-node-'+i} key={topic.name}><topic.icon size={20}/><strong>{topic.name}</strong></div>)}
    </motion.div>
    <div className="k-research-list">{topics.map((t,i)=><Appear key={t.name} delay={i*.08}><div><span>0{i+1}</span><div><strong>{t.name}</strong><p>{t.explanation}</p></div><ArrowUpRight size={18}/></div></Appear>)}</div>
   </div>
   <Appear className="k-publication-section"><SectionMark number="04.1">RESEARCH OUTPUTS</SectionMark><h3>Published & linked work.</h3>
    <div className="k-publications">{publications.map((p,i)=><a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer"><span>{String(i+1).padStart(2,'0')}</span><div><strong>{p.title}</strong><small>{p.venue} · {p.year}</small></div><ArrowUpRight size={20}/></a>)}</div>
   </Appear>
  </div>
 </section>;
}
function ServiceScene(){
 return <section className="k-services k-section" id="services">
  <div className="k-shell">
   <Appear><SectionMark number="05">WHAT I CAN HELP WITH</SectionMark><div className="k-chapter-heading"><h2>Let's build<br/><em>something useful.</em></h2><p>Research-informed engineering, from a rough idea to reliable software.</p></div></Appear>
   <div className="k-service-grid">{services.map((s,i)=><ServiceCard key={s.name} data={s} index={i}/>)}</div>
  </div>
 </section>;
}
function ServiceCard({data,index}:{data:(typeof services)[number];index:number}){
 const reduced=useReducedMotion();const Icon=data.icon;
 return <motion.article className="k-service-card" initial={reduced?false:{opacity:0,rotateY:index%2?20:-20,y:120,x:index%2?80:-80,scale:.78}} whileInView={reduced?undefined:{opacity:1,rotateY:0,x:0,y:0,scale:1}} viewport={{once:true,amount:.3}} transition={{duration:.85,delay:index*.095,ease}}>
   <div className="k-service-card-header"><span>0{index+1}</span><Icon size={25}/></div><h3>{data.name}</h3><p>{data.detail}</p><ArrowUpRight size={19}/>
 </motion.article>;
}
function ContactScene(){
 const [copied,setCopied]=useState(false);
 const copy=async()=>{
  try{await navigator.clipboard.writeText('dev.nasirshuvo@gmail.com');setCopied(true);window.setTimeout(()=>setCopied(false),2500)}
  catch{window.location.href='mailto:dev.nasirshuvo@gmail.com'}
 };
 return <section className="k-contact" id="contact">
  <div className="k-shell">
   <Appear><SectionMark number="06">THE NEXT COLLABORATION</SectionMark></Appear>
   <Appear><h2>What's next?<br/><em>Let's make it real.</em></h2></Appear>
   <Appear><p>Have a product, collaboration or research challenge in mind? I'd be glad to hear about it.</p>
    <div className="k-contact-actions"><button className="k-primary" type="button" onClick={copy}>{copied?<Check size={19}/>:<Mail size={19}/>} {copied?'Copied email':'Copy email'}</button>
     <a href="mailto:dev.nasirshuvo@gmail.com" className="k-contact-secondary">Send an email <ArrowUpRight size={20}/></a></div>
    <Socials/>
   </Appear>
   <footer className="k-footer"><span>© {new Date().getFullYear()} Nasir Uddin Shuvo · Tampere, Finland</span><a href={base+'?view=plain'}>Switch to Plain portfolio <ArrowUpRight size={16}/></a><a href="#home">Back to top ↑</a></footer>
  </div>
 </section>;
}
export default function AssemblyPortfolio(){
 useEffect(()=>{const id=decodeURIComponent(window.location.hash.slice(1));if(!id)return;requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start',behavior:'instant'}))},[]);
 return <main className="k-portfolio">
  <Hero/>
  <DegreeScene/>
  <ExperienceScene/>
  <ProjectScene/>
  <ResearchScene/>
  <ServiceScene/>
  <ContactScene/>
 </main>;
}
