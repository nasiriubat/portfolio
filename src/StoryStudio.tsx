import React, {useRef} from 'react';
import {motion,useMotionValue,useReducedMotion,useScroll,useSpring,useTransform} from 'motion/react';
import {ArrowUpRight,Check,FileText,MapPin,ShieldCheck} from 'lucide-react';

export default function StoryStudio(){
 const ref=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 const pointerX=useMotionValue(0),pointerY=useMotionValue(0);
 const smoothX=useSpring(pointerX,{stiffness:110,damping:24});
 const smoothY=useSpring(pointerY,{stiffness:110,damping:24});
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const leftX=useTransform(scrollYProgress,[0,.4,.82,1],[-28,0,0,-60]);
 const rightX=useTransform(scrollYProgress,[0,.4,.82,1],[35,0,0,60]);
 const floatY=useTransform(scrollYProgress,[0,.35,.8,1],[33,0,0,-65]);
 const fade=useTransform(scrollYProgress,[0,.2,.82,1],[.15,1,1,.45]);
 const rotateX=useTransform(smoothY,[-1,1],[4,-4]);
 const rotateY=useTransform(smoothX,[-1,1],[-6,6]);
 const onPointer=(e:React.PointerEvent<HTMLDivElement>)=>{
  if(reduced||e.pointerType==='touch')return;
  const b=e.currentTarget.getBoundingClientRect();
  pointerX.set(Math.max(-1,Math.min(1,((e.clientX-b.left)/b.width-.5)*2)));
  pointerY.set(Math.max(-1,Math.min(1,((e.clientY-b.top)/b.height-.5)*2)));
 };
 return <div className="studio-wrap" ref={ref} aria-label="Interactive illustration of Nasir's development workspace" onPointerMove={onPointer} onPointerLeave={()=>{pointerX.set(0);pointerY.set(0)}}>
  <div className="studio-orbit studio-orbit-a" aria-hidden="true"/><div className="studio-orbit studio-orbit-b" aria-hidden="true"/>
  <div className="studio-surface" aria-hidden="true"/>
  <motion.div className="studio-scene" style={reduced?undefined:{rotateX,rotateY,opacity:fade}}>

   <motion.div className="studio-monitor" style={reduced?undefined:{y:floatY}}>
    <div className="studio-monitor-top"><span className="studio-monitor-dots"><i/><i/><i/></span><span>workspace / agent-lab</span><span>↗</span></div>
    <div className="studio-code">
      <div className="studio-filetitle"><span className="code-language">TS</span> workflow.ts <span className="studio-file-tag">prototype</span></div>
      <div className="studio-line"><small>01</small><code><b>async</b> function <span className="code-orange">answer</span>(question) {'{'}</code></div>
      <div className="studio-line"><small>02</small><code>&nbsp; <span className="code-muted">const</span> context = await <span className="code-blue">retrieve</span>(question);</code></div>
      <div className="studio-line"><small>03</small><code>&nbsp; <span className="code-muted">const</span> draft = await <span className="code-blue">generate</span>(question, context);</code></div>
      <div className="studio-line"><small>04</small><code>&nbsp; <b>return</b> <span className="code-blue">citeSources</span>(draft, context);</code></div>
      <div className="studio-line"><small>05</small><code>{'}'}</code></div>
    </div>
    <div className="studio-monitor-bottom"><span><i/> Retrieval · context · citations</span><span>CODE · RESEARCH · PRODUCTS</span></div>
    <div className="studio-monitor-stand" aria-hidden="true"/>
   </motion.div>

   <motion.a className="studio-floating studio-research" href="#work" style={reduced?undefined:{x:leftX,y:floatY}}
     aria-label="Explore ScholarBro research product">
     <div className="floating-head"><span className="floating-icon"><FileText size={18}/></span><ArrowUpRight size={16}/></div>
     <span className="floating-title">ScholarBro</span>
     <small>Research discovery</small>
     <svg viewBox="0 0 180 68" aria-hidden="true" className="network-drawing">
       <path d="M19 36 C55 6 86 14 106 34 S149 54 166 18 M19 36 C63 71 90 61 106 34" fill="none" stroke="#95afd2" strokeWidth="1.5" strokeDasharray="4 5"/>
       {[[19,36],[70,15],[106,34],[166,18],[71,58]].map(([x,y],i)=><circle cx={x} cy={y} r={i===2?6:4} key={i} fill={i===2?'#d66746':'#496b99'}/>)}
     </svg>
   </motion.a>

   <motion.a className="studio-floating studio-map" href="#work" style={reduced?undefined:{x:rightX,y:floatY}} aria-label="Explore NextEuroTrip">
     <div className="floating-head"><span className="floating-icon map-icon"><MapPin size={18}/></span><ArrowUpRight size={16}/></div>
     <span className="floating-title">NextEuroTrip</span><small>Journey planning</small>
     <div className="studio-route"><div className="route-nodes"><span/><i/><span/></div><span>Start</span><span>Places</span><span>Discover</span></div>
   </motion.a>

   <motion.a className="studio-floating studio-audit" href="#work" style={reduced?undefined:{x:leftX,y:floatY}} aria-label="Explore WCAG accessibility checker">
    <div className="floating-head"><span className="floating-icon shield-icon"><ShieldCheck size={18}/></span><ArrowUpRight size={16}/></div>
    <span className="floating-title">WCAG Checker</span><small>Accessibility engineering</small>
    <div className="studio-audit-list"><span><Check size={11}/> Scan</span><span><Check size={11}/> Inspect</span><span><Check size={11}/> Improve</span></div>
   </motion.a>
  </motion.div>
  <div className="studio-bottom-note"><span className="studio-note-mark" aria-hidden="true">✳</span> <span>Different ideas. One way of working: make the complex useful.</span></div>
 </div>;
}
