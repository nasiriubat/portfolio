import React, { useEffect, useRef, useState } from 'react';
import {
  motion, useMotionValue, useReducedMotion, useScroll,
  useSpring, useTransform
} from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

type RevealProps = { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties };
export function Reveal({children,className='',delay=0,style}: RevealProps) {
  const reduced=useReducedMotion();
  return <motion.div
    className={className}
    style={style}
    initial={reduced?false:{opacity:0,y:52,filter:'blur(8px)'}}
    whileInView={reduced?undefined:{opacity:1,y:0,filter:'blur(0px)'}}
    viewport={{once:true,amount:0.14,margin:'0px 0px -4% 0px'}}
    transition={{duration:0.86,delay,ease:[0.22,1,0.36,1]}}
  >{children}</motion.div>;
}

export function WordReveal({text,className='',tag='h2'}:{text:string;className?:string;tag?:'h1'|'h2'|'h3'}) {
  const reduced=useReducedMotion();
  const Tag=tag==='h1'?motion.h1:tag==='h3'?motion.h3:motion.h2;
  if(reduced)return <Tag className={className}>{text}</Tag>;
  return <Tag
    className={'word-reveal '+className}
    aria-label={text}
    initial="concealed"
    whileInView="revealed"
    viewport={{once:true,amount:0.22}}
    transition={{staggerChildren:0.055,delayChildren:0.04}}
  >
    {text.split(/\s+/).filter(Boolean).map((word,index)=>
      <span key={index} className="word-window" aria-hidden="true">
        <motion.span className="word-inner" variants={{
          concealed:{y:'110%',rotate:4,opacity:0},
          revealed:{y:'0%',rotate:0,opacity:1,transition:{duration:.75,ease:[.22,1,.36,1]}}
        }}>{word}</motion.span>
      </span>
    )}
  </Tag>;
}

export function Kicker({index,children}:{index:string;children:React.ReactNode}) {
  return <span className="chapter-kicker"><span className="kicker-index">{index}</span><span className="kicker-rule"/>{children}</span>;
}

export function MagneticAnchor({href,children,className='',external=false}:{
  href:string;children:React.ReactNode;className?:string;external?:boolean
}) {
  const ref=useRef<HTMLAnchorElement>(null);
  const reduced=useReducedMotion();
  const mvx=useMotionValue(0),mvy=useMotionValue(0);
  const x=useSpring(mvx,{stiffness:200,damping:18});
  const y=useSpring(mvy,{stiffness:200,damping:18});
  const onMove=(e:React.MouseEvent<HTMLAnchorElement>)=>{
    if(reduced||!window.matchMedia('(pointer:fine)').matches)return;
    const b=ref.current?.getBoundingClientRect();
    if(!b)return;
    mvx.set((e.clientX-b.left-b.width/2)*.13);
    mvy.set((e.clientY-b.top-b.height/2)*.13);
  };
  return <motion.a ref={ref} href={href} className={'magnetic-link '+className} style={reduced?undefined:{x,y}}
    onMouseMove={onMove} onMouseLeave={()=>{mvx.set(0);mvy.set(0)}}
    target={external?'_blank':undefined} rel={external?'noopener noreferrer':undefined}>
    <span>{children}</span><ArrowUpRight size={19} aria-hidden="true"/>
  </motion.a>;
}

export function SectionIntro({chapter,eyebrow,title,description,dark=false}:{
  chapter:string;eyebrow:string;title:string;description?:string;dark?:boolean
}) {
  return <div className={'section-intro '+(dark?'section-intro-dark':'')}>
    <Reveal><Kicker index={chapter}>{eyebrow}</Kicker></Reveal>
    <WordReveal text={title} className="display-heading"/>
    {description&&<Reveal delay={.1}><p className="intro-description">{description}</p></Reveal>}
  </div>;
}

export function ScrollTypeBand() {
  const ref=useRef<HTMLDivElement>(null);
  const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const x=useTransform(scrollYProgress,[0,1],['-6%','-28%']);
  return <div className="type-band" ref={ref} aria-hidden="true">
    <motion.div className="type-band-inner" style={reduced?undefined:{x}}>
      {Array.from({length:3},(_,i)=><span key={i}>ENGINEERING <em>×</em> INTELLIGENCE <em>×</em> RESEARCH <em>×</em> </span>)}
    </motion.div>
  </div>;
}

export function useCompact(breakpoint=800) {
  const [compact,setCompact]=useState(()=>typeof window==='undefined'?false:window.innerWidth<=breakpoint);
  useEffect(()=>{
    const media=window.matchMedia('(max-width: '+breakpoint+'px)');
    const check=()=>setCompact(media.matches);
    check();
    media.addEventListener('change',check);
    return()=>media.removeEventListener('change',check);
  },[breakpoint]);
  return compact;
}

export function useSectionObserver(ids:string[]){
  const [current,setCurrent]=useState(ids[0]??'home');
  useEffect(()=>{
    const observers:IntersectionObserver[]=[];
    const hit=new Map<string,number>();
    const watch=new IntersectionObserver(entries=>{
      for(const item of entries){
        if(item.isIntersecting)hit.set(item.target.id,item.boundingClientRect.top);
        else hit.delete(item.target.id);
      }
      const order=Array.from(hit.entries()).sort((a,b)=>Math.abs(a[1])-Math.abs(b[1]));
      if(order[0])setCurrent(order[0][0]);
    },{rootMargin:'-15% 0px -55% 0px',threshold:[0,.1,.5]});
    ids.forEach(id=>{const item=document.getElementById(id);if(item)watch.observe(item)});
    observers.push(watch);
    return()=>observers.forEach(o=>o.disconnect());
  },[ids.join('|')]);
  return current;
}
