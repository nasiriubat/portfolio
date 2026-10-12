import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight, X, MoveUpRight } from 'lucide-react';
import { projects, type Project } from './content';
import { SectionIntro, Reveal } from './MotionLanguage';

type Group = 'All'|'AI & research'|'Products & platforms'|'Tools & experiments';
const groups:Group[]=['All','AI & research','Products & platforms','Tools & experiments'];

function kindOf(project:Project):Exclude<Group,'All'> {
  const text=(project.category+' '+project.slug).toLowerCase();
  if(/wcag|chrome|extension|stack|game|developer|accessibility|education|tool/.test(text))
    return 'Tools & experiments';
  if(/ai|agent|research|rag|thesis|memory|language|notebook|comscribe|coscribe|interview/.test(text))
    return 'AI & research';
  return 'Products & platforms';
}
const liveURL=(project:Project)=>{
  try { const u=new URL(project.url);return u.protocol==='https:'&&!u.hostname.endsWith('github.com')?u.href:null; }
  catch {return null;}
};
const getDetails=(p:Project)=>(p.features??[]).filter(Boolean);
const getStack=(p:Project)=>(p.stack??[]).filter(Boolean);
const getFlow=(p:Project)=>(p.workflow??[]).filter(Boolean);

function ProjectCard({project,index,open}:{project:Project;index:number;open:(p:Project)=>void}) {
  const reduced=useReducedMotion();
  const intro={opacity:0,y:50,scale:.965};
  return <motion.article
    layout={!reduced}
    layoutId={reduced?undefined:'system-'+project.slug}
    className="system-card"
    initial={reduced?false:intro}
    whileInView={reduced?undefined:{opacity:1,y:0,scale:1}}
    viewport={{once:true,amount:.1}}
    transition={{duration:.62,delay:Math.min(index%3,2)*.09,ease:[.2,.8,.2,1]}}
    onPointerMove={event=>{
      if(event.pointerType==='touch')return;
      const b=event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty('--px',((event.clientX-b.left)/b.width*100)+'%');
      event.currentTarget.style.setProperty('--py',((event.clientY-b.top)/b.height*100)+'%');
    }}
  >
    <button className="system-card-hit" type="button" onClick={()=>open(project)}
      aria-label={'Explore '+project.title}>
      <div className="system-topline"><span>{String(index+1).padStart(2,'0')} / {kindOf(project)}</span>
        <span className="system-card-corner"><ArrowUpRight size={18} aria-hidden="true"/></span>
      </div>
      <div className="system-card-center">
        <span className="system-watermark" aria-hidden="true">{project.title.trim().charAt(0)}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="system-bottomline">
        <span>{getStack(project).slice(0,2).join(' / ') || project.category}</span>
        <span>EXPLORE <ArrowRight size={15} aria-hidden="true"/></span>
      </div>
    </button>
  </motion.article>;
}

function DetailModal({project,close}:{project:Project;close:()=>void}) {
  const reduced=useReducedMotion();
  const titleId='selected-system-title';
  const panelRef=useRef<HTMLElement>(null);
  const features=getDetails(project);
  const stack=getStack(project);
  const workflow=getFlow(project);
  const website=liveURL(project);
  useEffect(()=>{
    const previous=document.activeElement as HTMLElement|null;
    const old=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const handle=(e:KeyboardEvent)=>{
      if(e.key==='Escape')close();
      if(e.key==='Tab'){
        const focusables=panelRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])');
        if(!focusables?.length)return;
        const first=focusables[0],last=focusables[focusables.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
      }
    };
    document.addEventListener('keydown',handle);
    const focus=window.setTimeout(()=>panelRef.current?.querySelector<HTMLElement>('.detail-close')?.focus(),80);
    return()=>{window.clearTimeout(focus);document.removeEventListener('keydown',handle);document.body.style.overflow=old;previous?.focus();};
  },[close]);
  return <motion.div className="detail-overlay" role="presentation"
    initial={reduced?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
    transition={{duration:.28}} onMouseDown={close}>
    <motion.section role="dialog" aria-modal="true" aria-labelledby={titleId}
      ref={panelRef} className="detail-panel"
      layoutId={reduced?undefined:'system-'+project.slug}
      onMouseDown={event=>event.stopPropagation()}>
      <div className="detail-header"><span>PROJECT / SELECTED WORK</span>
        <button className="detail-close" type="button" onClick={close} aria-label="Close project details"><X size={22}/></button>
      </div>
      <div className="detail-scroll">
        <div className="detail-category">{project.category}</div>
        <h2 id={titleId}>{project.title}</h2>
        <p className="detail-lead">{project.description}</p>
        {features.length>0&&<div className="detail-block"><h3>What the system does</h3>
          <ul className="detail-features">{features.map((item,i)=><li key={i}><span>{String(i+1).padStart(2,'0')}</span>{item}</li>)}</ul>
        </div>}
        {workflow.length>0&&<div className="detail-block"><h3>How it works</h3><ol className="detail-flow">
          {workflow.map((item,i)=><li key={i}><span>{String(i+1).padStart(2,'0')}</span>{item}</li>)}
        </ol></div>}
        {stack.length>0&&<div className="detail-block"><h3>Technology</h3><div className="detail-tech">
          {stack.map(item=><span key={item}>{item}</span>)}
        </div></div>}
        <div className="detail-actions">
          <a href={'/portfolio/projects/'+project.slug+'/'}>Full project page <ArrowUpRight size={18}/></a>
          {website&&<a href={website} target="_blank" rel="noopener noreferrer">Visit the product <MoveUpRight size={17}/></a>}
        </div>
      </div>
    </motion.section>
  </motion.div>;
}

export default function ProjectIndex(){
  const [category,setCategory]=useState<Group>('All');
  const [selected,setSelected]=useState<Project|null>(null);
  const reduced=useReducedMotion();
  const filtered=useMemo(()=>category==='All'?projects:projects.filter(p=>kindOf(p)===category),[category]);
  const close=()=>setSelected(null);
  return <section id="projects" className="index-section shell">
    <SectionIntro chapter="02" eyebrow="PROJECT INDEX" title="Proof of work, not just a list of tools."
      description="The work spans products, AI applications, research systems and developer utilities. Explore a project to see what it actually does."/>
    <Reveal><div className="index-controls">
      <div className="index-filters" role="group" aria-label="Filter projects by category">
        {groups.map(group=><button className={'index-filter '+(category===group?'is-active':'')}
          key={group} type="button" aria-pressed={category===group}
          onClick={()=>setCategory(group)}>
          {category===group&&!reduced&&<motion.span className="index-filter-bg" layoutId="active-filter" transition={{type:'spring',stiffness:360,damping:32}}/>}
          <span>{group}</span>
        </button>)}
      </div>
      <div className="index-counter">{String(filtered.length).padStart(2,'0')} SYSTEMS</div>
    </div></Reveal>
    <motion.div className="system-grid" layout={!reduced}>
      <AnimatePresence mode="popLayout" initial={false}>
        {filtered.map((project,index)=><ProjectCard key={project.slug} project={project} index={index} open={setSelected}/>)}
      </AnimatePresence>
    </motion.div>
    <AnimatePresence>{selected&&<DetailModal key={selected.slug} project={selected} close={close}/>}</AnimatePresence>
  </section>;
}
