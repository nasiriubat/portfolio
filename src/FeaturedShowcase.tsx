import React, { useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { projects, type Project } from './content';
import { Reveal, SectionIntro, useCompact } from './MotionLanguage';

type Drawing = 'discovery' | 'journey' | 'audit';

const features:{slug:string;name:string;category:string;headline:string;note:string;art:Drawing}[]=[
  {
    slug:'scholarbro',
    name:'ScholarBro',
    category:'RESEARCH DISCOVERY',
    headline:'A better way to stay curious.',
    note:'A platform for finding research, following interests and making academic discovery feel less fragmented.',
    art:'discovery'
  },
  {
    slug:'trip-planner',
    name:'NextEuroTrip',
    category:'TRAVEL TECHNOLOGY',
    headline:'Good journeys need a good system.',
    note:'An itinerary planner for exploring Europe, with deterministic routes, thoughtful day plans and shareable visited maps.',
    art:'journey'
  },
  {
    slug:'wcag-checker',
    name:'WCAG Checker',
    category:'DEVELOPER TOOLS',
    headline:'Make the invisible visible.',
    note:'A browser-driven accessibility analysis system, revealing violations, affected elements and actionable remediation paths.',
    art:'audit'
  }
];

function Diagram({variant}:{variant:Drawing}) {
  const reduced=useReducedMotion();
  const renderPath=(d:string,i:number,accent=false)=><motion.path
    key={i} d={d} fill="none"
    stroke={accent?'#a5c8ff':'#6e91bb'} strokeWidth={accent?2.6:1.25}
    strokeDasharray={accent?undefined:'4 9'}
    initial={reduced?false:{pathLength:0,opacity:.3}}
    whileInView={reduced?undefined:{pathLength:1,opacity:1}}
    viewport={{once:true,amount:.05}}
    transition={{duration:1.45,delay:.15+i*.13,ease:'easeInOut'}}
  />;

  return <div className={'feature-visual visual-'+variant}>
    <div className="diagram-cap"><span>FIELD NOTES / {variant==='discovery'?'KNOWLEDGE':variant==='journey'?'ROUTING':'ACCESSIBILITY'}</span><span>◌ / 0{variant==='discovery'?1:variant==='journey'?2:3}</span></div>
    <svg className="diagram-svg" viewBox="0 0 660 490" role="img" aria-label={
      variant==='discovery'?'Conceptual map connecting papers, topics and research interests':
      variant==='journey'?'Conceptual route map connecting places in a travel itinerary':
      'Conceptual accessibility report connecting scans, findings and fixes'
    }>
      <defs>
        <pattern id={'dots-'+variant} width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#5d7594" opacity=".28"/></pattern>
        <linearGradient id={'glass-'+variant} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#263e5d"/><stop offset="1" stopColor="#132439"/></linearGradient>
      </defs>
      <rect x="0" y="0" width="660" height="490" fill={'url(#dots-'+variant+')'}/>
      {variant==='discovery'&&<>
        {renderPath('M100 110 C190 110 175 235 315 240',1)}
        {renderPath('M110 360 C205 360 190 268 315 240',2)}
        {renderPath('M315 240 C430 240 444 128 558 135',3,true)}
        {renderPath('M315 240 C430 240 455 360 556 355',4,true)}
        {[
          [92,109,'01','PAPERS'],
          [105,363,'02','TOPICS'],
          [313,240,'03','INTERESTS'],
          [553,133,'04','DISCOVER'],
          [554,354,'05','FOLLOW']
        ].map(([x,y,num,label])=><g key={num}>
          <circle cx={x} cy={y} r={num==='03'?43:33} fill={'url(#glass-'+variant+')'} stroke={num==='03'?'#a5c8ff':'#587a9d'} strokeWidth="1.5"/>
          <circle cx={x} cy={y} r="5" fill={num==='03'?'#d7e7ff':'#8aabda'} />
          <text x={x} y={Number(y)-51} textAnchor="middle" className="diagram-label">{label}</text>
        </g>)}
        <text x="315" y="319" textAnchor="middle" className="diagram-micro">RELEVANCE ENGINE</text>
      </>}
      {variant==='journey'&&<>
        {renderPath('M97 369 C153 302 204 352 241 270 S348 107 441 151 S527 267 566 105',1,true)}
        {renderPath('M95 369 L95 104 L570 104 L570 367 L95 367',2)}
        {[[97,369,'START'],[241,270,'DAY 01'],[441,151,'DAY 02'],[566,105,'ARRIVE']].map(([x,y,label],i)=>
          <g key={i}><circle cx={x} cy={y} r="21" fill="#152840" stroke="#9dbbf2" strokeWidth="1.8"/><circle cx={x} cy={y} r="5" fill="#d4e4ff"/><text x={x} y={Number(y)-31} textAnchor="middle" className="diagram-label">{label}</text></g>)}
        <text x="350" y="409" textAnchor="middle" className="diagram-micro">PLACES → DAYS → ROUTE</text>
        <circle cx="350" cy="240" r="124" stroke="#45617e" strokeWidth=".8" fill="none" opacity=".35"/>
      </>}
      {variant==='audit'&&<>
        <rect x="89" y="86" width="484" height="310" rx="12" fill={'url(#glass-'+variant+')'} stroke="#58789d"/>
        <path d="M89 135 H573" stroke="#55749b"/>
        {[0,1,2].map(i=><circle key={i} cx={118+i*20} cy="111" r="5" fill="#5a7a9d"/>)}
        {[0,1,2,3,4,5].map(i=><g key={i}>
          <rect x="123" y={160+i*36} width="232" height="13" rx="5" fill="#304c6c"/>
          <rect x="379" y={159+i*36} width={i%3===0?83:104} height="15" rx="4" fill={i%3===0?'#b1ceff':'#55779d'} opacity={i%3===0?.9:.5}/>
          <path d={'M128 '+(184+i*36)+' H530'} stroke="#354c66" opacity=".5"/>
        </g>)}
        {renderPath('M420 188 C478 188 480 231 530 231',2,true)}
        <rect x="402" y="340" width="125" height="33" rx="5" fill="#abcbff"/>
        <text x="464" y="361" textAnchor="middle" className="diagram-dark">REVIEW FINDINGS</text>
        <text x="330" y="444" textAnchor="middle" className="diagram-micro">SCAN → PRIORITIZE → REMEDIATE</text>
      </>}
    </svg>
    <div className="diagram-foot"><span>{variant==='discovery'?'DISCOVER / FOLLOW':variant==='journey'?'PLACES / ROUTES':'AUDIT / IMPROVE'}</span><span className="diagram-pulse"><i/> {variant==='discovery'?'RESEARCH':variant==='journey'?'JOURNEYS':'QUALITY'}</span></div>
  </div>;
}

function FeaturePanel({item,index,project}:{item:typeof features[number];index:number;project?:Project}) {
  return <article className="feature-panel">
    <div className="feature-content">
      <div className="feature-overline"><span>{String(index+1).padStart(2,'0')} / 03</span><span>{item.category}</span></div>
      <div className="feature-copy">
        <div className="feature-wordmark">{item.name}</div>
        <h3>{item.headline}</h3>
        <p>{item.note}</p>
        <a href={'/portfolio/projects/'+(project?.slug??item.slug)+'/'} className="feature-view">
          Explore the project <ArrowUpRight size={20} aria-hidden="true"/>
        </a>
      </div>
      <div className="feature-bottom"><span>SELECTED WORK / {2026}</span><ArrowDownRight size={22} aria-hidden="true"/></div>
    </div>
    <Diagram variant={item.art}/>
  </article>;
}

export default function FeaturedShowcase() {
  const ref=useRef<HTMLDivElement>(null);
  const compact=useCompact(900);
  const reduced=useReducedMotion();
  const stationary=compact||Boolean(reduced);
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
  const x=useTransform(scrollYProgress,[0,1],['0%','-66.6667%']);
  const match=(slug:string)=>projects.find(p=>p.slug===slug);
  return <section className="selected-work" id="work">
    <div className="shell"><SectionIntro
      chapter="01" eyebrow="SELECTED WORK" title="A few things I've brought into the world."
      description="From research discovery to trip planning and accessibility—real problems, different domains, deliberate engineering."
    /></div>
    <Reveal><div className="work-preface shell"><span>THREE SYSTEMS / THREE DIFFERENT PROBLEMS</span><span>RESEARCH · TRAVEL · ACCESSIBILITY</span></div></Reveal>
    <div ref={ref} className={'showcase-scroller '+(stationary?'showcase-static':'')} data-static={stationary}>
      <div className="showcase-sticky">
        <motion.div className="showcase-track" style={stationary?undefined:{x}}>
          {features.map((item,i)=><FeaturePanel key={item.slug} item={item} index={i} project={match(item.slug)}/>)}
        </motion.div>
        {!stationary&&<div className="showcase-progress" aria-hidden="true">
          <motion.div className="showcase-progress-fill" style={{scaleX:scrollYProgress}}/>
        </div>}
      </div>
    </div>
  </section>;
}
