import React,{useRef,useState} from 'react';
import {motion,useReducedMotion,useScroll,useMotionValueEvent} from 'motion/react';
import {ArrowUpRight,BookOpen,Compass,GitBranch,ShieldCheck} from 'lucide-react';

const beats=[
 {number:'01',overline:'THE QUESTION',headline:'Start with the problem.',summary:'Whether it is a product workflow or a research question, the first challenge is understanding what people need—not choosing a fashionable technology.',graphic:'Discover',detail:'Turn uncertainty into requirements'},
 {number:'02',overline:'THE SYSTEM',headline:'Connect the moving parts.',summary:'Build the interfaces, APIs, retrieval layers and supporting services that turn ideas into something people can actually use.',graphic:'Engineer',detail:'Full-stack engineering + AI workflows'},
 {number:'03',overline:'THE EVIDENCE',headline:'Make it dependable.',summary:'Measure what works. Test the edge cases. Track failures, improve the architecture and learn from real use instead of settling for a polished demo.',graphic:'Evaluate',detail:'Reliability, evaluation and iteration'}
] as const;

export function ProcessChapter(){
 const ref=useRef<HTMLElement>(null);
 const [active,setActive]=useState(0);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
 useMotionValueEvent(scrollYProgress,'change',v=>{if(!reduced)setActive(v<.34?0:v<.68?1:2)});
 return <section className="process-chapter" id="approach" ref={ref} aria-label="How I approach building software">
  <div className="process-sticky">
   <div className="process-container">
    <div className="process-intro"><span className="story-label">CHAPTER ONE <i/> THE PROCESS</span>
     <h2>It begins with<br/><em>a question.</em></h2>
     <p>What if we could make complex work feel surprisingly simple?</p>
     <div className="process-steps" role="group" aria-label="Steps in my engineering approach">
      {beats.map((beat,i)=><button key={beat.number} type="button" className={'process-step '+(active===i?'current':'')}
       aria-pressed={active===i} onClick={()=>setActive(i)}>
       <span>{beat.number}</span><strong>{beat.overline}</strong><span className="process-step-track"><i/></span>
      </button>)}
     </div>
    </div>
    <div className="process-stage">
     <div className="process-stage-frame">
      <div className="process-card-header"><span><GitBranch size={17}/> WORKFLOW / {beats[active].number}</span><span>✳</span></div>
      <svg viewBox="0 0 540 285" role="img" aria-label="Conceptual software development workflow from question through implementation to testing">
       <defs><linearGradient id="processLine" x1="0" x2="1"><stop stopColor="#df9b7c"/><stop offset="1" stopColor="#95baca"/></linearGradient></defs>
       <path d="M78 130 C162 40 215 222 276 130 S395 57 463 130" stroke="url(#processLine)" strokeWidth="4" strokeLinecap="round" fill="none" strokeDasharray="6 9" opacity=".7"/>
       {[[77,130,0],[275,130,1],[463,130,2]].map(([x,y,i])=><g key={i}>
        <motion.circle cx={x} cy={y} r={i===active?38:25} fill={i===active?'#f1b293':'#293f51'} stroke={i===active?'#f7e4ce':'#7696a9'} strokeWidth="2" animate={{r:i===active?38:25}} transition={{duration:.55}}/>
        <text x={x} y={Number(y)+5} fontSize="14" fontWeight="700" textAnchor="middle" fill={i===active?'#3d3b37':'#c1d3d9'}>{String(Number(i)+1).padStart(2,'0')}</text>
       </g>)}
       <text x="78" y="206" fill="#9dadaf" textAnchor="middle" fontSize="13">DISCOVER</text>
       <text x="275" y="206" fill="#9dadaf" textAnchor="middle" fontSize="13">BUILD</text>
       <text x="463" y="206" fill="#9dadaf" textAnchor="middle" fontSize="13">VERIFY</text>
      </svg>
      <div className="process-card-footer"><span>{beats[active].detail}</span><span>0{active+1} / 03</span></div>
     </div>
     <motion.div key={active} className="process-story" initial={reduced?false:{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.4}}>
       <div>{beats[active].overline}</div><h3>{beats[active].headline}</h3><p>{beats[active].summary}</p>
     </motion.div>
    </div>
   </div>
  </div>
 </section>;
}

export type IllustrationKind='scholarbro'|'trip-planner'|'wcag-checker';

export function ProductIllustration({kind}:{kind:IllustrationKind}){
 const reduced=useReducedMotion();
 return <div className={'artifact artifact-'+kind} aria-label={
  kind==='scholarbro'?'Illustration of research discovery and related academic topics':
  kind==='trip-planner'?'Illustration of a journey planning interface and route':
  'Illustration of accessibility audit workflow'
 }>
  {kind==='scholarbro'&&<>
   <div className="artifact-header"><span><BookOpen size={16}/> SCHOLARBRO</span><span>Discover / Follow</span></div>
   <div className="research-illustration">
    <div className="research-illustration-caption">Ideas worth exploring.</div>
    <svg viewBox="0 0 600 360" aria-hidden="true">
     <motion.path d="M118 176 C200 58 296 74 314 176 S458 280 506 133 M118 176 C206 310 252 245 314 176"
       fill="none" stroke="#a4b9e0" strokeWidth="2" strokeDasharray="5 8"
       initial={reduced?false:{pathLength:0}} whileInView={reduced?undefined:{pathLength:1}}
       viewport={{once:true}} transition={{duration:1.4}}/>
     {[[118,176,18],[205,95,11],[314,176,24],[506,133,16],[235,257,11]].map(([x,y,r],i)=>
      <motion.circle key={i} cx={x} cy={y} r={r} stroke="#a5c6ef" strokeWidth="2"
       fill={i===2?'#eb9b7e':'#425c90'} initial={reduced?false:{scale:0}} whileInView={reduced?undefined:{scale:1}}
       viewport={{once:true}} transition={{delay:.17*i,duration:.6}}/>)}
     <text x="115" y="223">SOURCES</text><text x="305" y="231">INTERESTS</text><text x="475" y="174">DISCOVER</text>
    </svg>
   </div><div className="artifact-note">Research becomes easier when the connections become visible.</div>
  </>}
  {kind==='trip-planner'&&<>
    <div className="artifact-header"><span><Compass size={16}/> NEXT EURO TRIP</span><span>Journey / Explore</span></div>
    <div className="travel-illustration">
     <span className="travel-small-title">Build a journey,<br/>not a checklist.</span>
     <svg viewBox="0 0 620 340" aria-hidden="true">
      <path d="M40 90 C135 50 157 152 233 110 S360 39 407 98 S483 214 570 156" stroke="#839fa0" strokeDasharray="4 8" strokeWidth="2" fill="none"/>
      <motion.path d="M79 247 C152 193 172 275 263 168 S414 95 525 161" stroke="#be7558" strokeWidth="5" fill="none" strokeLinecap="round"
       initial={reduced?false:{pathLength:0}} whileInView={reduced?undefined:{pathLength:1}}
       viewport={{once:true}} transition={{duration:1.5,ease:'easeInOut'}}/>
      {[[79,247],[263,168],[525,161]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="14" fill="#fff" stroke="#b96849" strokeWidth="4"/><text x={x} y={y-27} textAnchor="middle">{['START','EXPLORE','ARRIVE'][i]}</text></g>)}
      <circle cx="310" cy="170" r="132" fill="none" stroke="#6f9e9a" opacity=".22"/><circle cx="310" cy="170" r="210" fill="none" stroke="#6f9e9a" opacity=".16"/>
     </svg>
     <div className="travel-route-label"><span>01 / Where to begin?</span><span>02 / Where next?</span><span>03 / How to get there?</span></div>
    </div><div className="artifact-note">Places, routes and travel days brought into one usable plan.</div>
  </>}
  {kind==='wcag-checker'&&<>
   <div className="artifact-header"><span><ShieldCheck size={16}/> WCAG CHECKER</span><span>Audit / Improve</span></div>
   <div className="audit-illustration">
    <div className="audit-browser">
     <div className="audit-toolbar"><i/><i/><i/><span>Accessibility review</span></div>
     <div className="audit-browser-body">
      <div className="audit-page">
       <div className="audit-skeleton-heading"/>
       <div className="audit-skeleton-line"/><div className="audit-skeleton-line short"/>
       <div className="audit-skeleton-button"/>
       <div className="audit-focus-ring"/>
      </div>
      <div className="audit-side"><strong>WHAT TO CHECK</strong>
       {['Semantic structure','Keyboard navigation','Contrast & labels'].map((x,i)=><motion.div key={x} initial={reduced?false:{opacity:0,x:15}} whileInView={reduced?undefined:{opacity:1,x:0}}
        viewport={{once:true}} transition={{delay:.15*i}}><span>{String(i+1).padStart(2,'0')}</span>{x}</motion.div>)}
      </div>
     </div>
    </div>
   </div><div className="artifact-note">An accessibility finding should lead to an actionable fix.</div>
  </>}
 </div>;
}
