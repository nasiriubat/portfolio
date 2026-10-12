import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, ChevronDown, ExternalLink, GraduationCap } from 'lucide-react';
import { publications } from './content';
import { certifications, education, experience } from './PortfolioData';
import { Kicker, Reveal, SectionIntro, WordReveal } from './MotionLanguage';

const topics=[
  {
    index:'01',word:'Ground',
    name:'Retrieval & grounding',
    description:'Designing retrieval-augmented systems that use source material, rather than confidence alone, to support useful answers.',
    detail:'DOCUMENTS / RETRIEVAL / CITATIONS'
  },
  {
    index:'02',word:'Remember',
    name:'Agent memory',
    description:'Studying how agents retain information, retrieve prior decisions, and update what they know over time.',
    detail:'MEMORY / LEARNING / UPDATES'
  },
  {
    index:'03',word:'Reason',
    name:'Agentic workflows',
    description:'Connecting LLM reasoning with tools, planning, feedback and controlled execution in real applications.',
    detail:'AGENTS / TOOLS / CONTROL'
  },
  {
    index:'04',word:'Evaluate',
    name:'Reliable AI engineering',
    description:'Building repeatable experiments to examine task performance, retrieval quality, robustness, latency and cost.',
    detail:'EVALUATION / ROBUSTNESS / COST'
  }
];

export function ResearchStudio(){
  const sectionRef=useRef<HTMLElement>(null);
  const [active,setActive]=useState(0);
  const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll({target:sectionRef,offset:['start end','end start']});
  const line=useSpring(scrollYProgress,{stiffness:90,damping:26});
  const turning=useTransform(scrollYProgress,[0,1],[-20,24]);
  return <section id="research" className="research-studio" ref={sectionRef}>
    <div className="shell">
      <SectionIntro chapter="03" eyebrow="RESEARCH PRACTICE" dark title="Curiosity, with a method."
        description="My research connects the behavior of intelligent agents with the engineering discipline needed to make them dependable."/>
      <div className="research-workbench">
        <div className="research-steps">
          <div className="research-track" aria-hidden="true"><motion.div className="research-track-fill" style={{scaleY:line}}/></div>
          {topics.map((topic,i)=><motion.button
            type="button" key={topic.index}
            className={'research-step '+(active===i?'is-current':'')}
            onClick={()=>setActive(i)}
            onFocus={()=>setActive(i)}
            onMouseEnter={()=>setActive(i)}
            onViewportEnter={()=>setActive(i)}
            viewport={{amount:.68}}
            initial={reduced?false:{opacity:.35,x:30}}
            whileInView={reduced?undefined:{opacity:1,x:0}}
            transition={{duration:.6,ease:[.22,1,.36,1]}}
          >
            <span className="research-step-number">{topic.index}</span>
            <span className="research-step-text"><strong>{topic.name}</strong><span>{topic.description}</span></span>
            <ArrowUpRight className="research-step-arrow" size={22} aria-hidden="true"/>
          </motion.button>)}
        </div>
        <div className="research-stage">
          <div className="research-stage-surface">
            <div className="research-stage-top"><span>APPLIED INTELLIGENCE</span><span>FIELD / {topics[active].index}</span></div>
            <div className="research-orbit" aria-hidden="true">
              <motion.svg viewBox="0 0 520 520" className="research-orbit-svg" style={reduced?undefined:{rotate:turning}}>
                <circle cx="260" cy="260" r="183" fill="none" stroke="#5f7794" strokeWidth="1" strokeDasharray="3 9"/>
                <circle cx="260" cy="260" r="123" fill="none" stroke="#7f94b0" strokeWidth="1" opacity=".65"/>
                <circle cx="260" cy="260" r="67" fill="none" stroke="#7c90a8" strokeWidth="1" strokeDasharray="6 11"/>
                <motion.path d="M82 260 H438 M260 82 V438 M130 130 L390 390 M390 130 L130 390"
                  fill="none" stroke="#6a82a3" strokeWidth="1" strokeOpacity=".55"
                  style={{pathLength:line}} />
                {[0,1,2,3].map(i=>{
                  const a=(i*90-45)*Math.PI/180;
                  return <circle key={i} cx={260+183*Math.cos(a)} cy={260+183*Math.sin(a)}
                    r={active===i?8:4} fill={active===i?'#ccddff':'#6781a6'}/>;
                })}
                <circle cx="260" cy="260" r="19" fill="#c1d5ff" opacity=".95"/>
                <circle cx="260" cy="260" r="38" fill="none" stroke="#9ab4e4" opacity=".5"/>
              </motion.svg>
            </div>
            <div className="research-stage-info">
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={reduced?false:{opacity:0,y:22,filter:'blur(8px)'}}
                  animate={{opacity:1,y:0,filter:'blur(0px)'}}
                  exit={reduced?undefined:{opacity:0,y:-16,filter:'blur(8px)'}}
                  transition={{duration:.35,ease:[.22,1,.36,1]}}>
                  <span>{topics[active].detail}</span>
                  <strong>{topics[active].word}<span className="period">.</span></strong>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="research-stage-bottom"><span>RESEARCH × ENGINEERING</span><span>0{active+1} / 04</span></div>
          </div>
        </div>
      </div>

      <div className="publication-area" id="publications">
        <div className="publication-intro"><Reveal><Kicker index="03.1">RESEARCH OUTPUTS</Kicker></Reveal>
          <WordReveal text="Writing & publications." className="publication-title"/>
          <Reveal><p>Papers, research reports and thesis work. Each listed link points to a publication record supplied through the CMS.</p></Reveal>
        </div>
        <div className="publication-list">
          {publications.length?publications.map((paper,index)=><Reveal key={paper.title} delay={Math.min(index,.04)*.06}>
            <a className="publication-entry" href={paper.url} target="_blank" rel="noopener noreferrer">
              <span className="pub-index">{String(index+1).padStart(2,'0')}</span>
              <span className="pub-primary"><strong>{paper.title}</strong><span>{paper.venue||'Research output'}</span></span>
              <span className="pub-year">{paper.year||'—'}</span>
              <span className="pub-arrow"><ExternalLink size={20} aria-hidden="true"/></span>
            </a>
          </Reveal>):<p className="no-publications">No linked research outputs are currently published in the CMS.</p>}
        </div>
      </div>
    </div>
  </section>;
}

export function CareerStory(){
  const ref=useRef<HTMLElement>(null);
  const reduced=useReducedMotion();
  const [expanded,setExpanded]=useState<number|null>(0);
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const fill=useSpring(scrollYProgress,{stiffness:95,damping:25});
  const ghostOpacity=useTransform(scrollYProgress,[0,.18,.8,1],[.28,1,1,.4]);
  return <section className="career-story shell" id="experience" ref={ref}>
    <SectionIntro chapter="04" eyebrow="EXPERIENCE" title="A career shaped by building."
      description="From shipping web applications to researching intelligent systems, the same principle follows me: make the thing work, then understand how to improve it."/>
    <div className="career-layout">
      <div className="career-sticky">
        <Reveal><span className="career-note">SOFTWARE ENGINEERING<br/>TO APPLIED AI RESEARCH</span></Reveal>
        <motion.div className="career-bigtype" style={reduced?undefined:{opacity:ghostOpacity}} aria-hidden="true">04<span>chapters</span></motion.div>
        <p>Experience across product engineering and research, in Bangladesh and Finland.</p>
      </div>
      <div className="career-timeline">
        <div className="career-rail" aria-hidden="true"><motion.div className="career-rail-fill" style={{scaleY:fill}}/></div>
        {experience.map((item,i)=><Reveal className="career-entry" key={item.role+item.organization} delay={.04*i}>
          <div className="career-dot" aria-hidden="true"/>
          <div className="career-meta"><span>{String(i+1).padStart(2,'0')} / {item.period}</span><span>{item.location}</span></div>
          <h3>{item.role}</h3>
          <strong className="career-org">{item.organization}</strong>
          <p>{item.summary}</p>
          <button type="button" className="career-expand"
            aria-expanded={expanded===i}
            onClick={()=>setExpanded(expanded===i?null:i)}>
            Focus areas <motion.span animate={{rotate:expanded===i?180:0}}><ChevronDown size={17}/></motion.span>
          </button>
          <AnimatePresence initial={false}>{expanded===i&&<motion.div
            className="career-technologies" key="technologies"
            initial={reduced?false:{height:0,opacity:0}} animate={{height:'auto',opacity:1}}
            exit={reduced?undefined:{height:0,opacity:0}} transition={{duration:.38}}>
            {item.technologies.map(tech=><span key={tech}>{tech}</span>)}
          </motion.div>}</AnimatePresence>
        </Reveal>)}
      </div>
    </div>
  </section>;
}

export function Credentials(){
  const reduced=useReducedMotion();
  return <section className="credentials-section" id="education"><div className="shell">
    <SectionIntro chapter="05" eyebrow="FOUNDATION" title="Still learning. Always applying."
      description="Formal education and continued training support the engineering and research work."/>
    <div className="education-layout">
      <div className="credential-label"><GraduationCap size={26} strokeWidth={1.4}/><span>EDUCATION / 02</span></div>
      <div className="degree-list">
        {education.map((item,i)=><Reveal className="degree-entry" key={item.institution}>
          <span className="degree-count">0{i+1}</span>
          <div><h3>{item.degree}</h3><p>{item.institution} <span>·</span> {item.place}</p><small>{item.detail}</small></div>
          <span className="degree-period">{item.period}</span>
        </Reveal>)}
      </div>
    </div>
    <div className="certificate-section">
      <Reveal><Kicker index="05.1">CERTIFICATIONS & TRAINING</Kicker></Reveal>
      <div className="certificate-grid">
        {certifications.map((title,i)=><motion.div className="certificate" key={title}
          initial={reduced?false:{opacity:0,y:35,rotate:-2}}
          whileInView={reduced?undefined:{opacity:1,y:0,rotate:0}}
          viewport={{once:true,amount:.15}}
          transition={{delay:.06*(i%3),duration:.68,ease:[.22,1,.36,1]}}
          whileHover={reduced?undefined:{y:-8,rotate:i%2?-1:1}}>
          <span className="cert-index">{String(i+1).padStart(2,'0')}</span>
          <strong>{title}</strong><span className="cert-symbol" aria-hidden="true">↗</span>
        </motion.div>)}
      </div>
    </div>
  </div></section>;
}
