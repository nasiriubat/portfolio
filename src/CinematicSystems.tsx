import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowDownRight, Cpu, Layers3, Network, Boxes } from 'lucide-react';
import './cinematic.css';

type Chapter = { index:string; eyebrow:string; title:string; highlight:string; body:string; from:number; until:number };
const chapters:Chapter[] = [
  {index:'00',eyebrow:'SOFTWARE ENGINEER / AI RESEARCHER',title:'Nasir Uddin',highlight:'Shuvo.',
   body:'I build useful software and investigate the systems behind intelligent applications. Explore what happens beneath the interface.',
   from:0,until:.18},
  {index:'01',eyebrow:'THE STARTING POINT',title:'Every system begins',highlight:'with a question.',
   body:'Before the architecture comes a problem worth understanding. That is where the work starts.',
   from:.18,until:.34},
  {index:'02',eyebrow:'BENEATH THE INTERFACE',title:'Now take it apart.',highlight:'Every layer matters.',
   body:'A working product is more than its screen: architecture, data, decisions and the seams between them.',
   from:.34,until:.53},
  {index:'03',eyebrow:'INTELLIGENCE, ENGINEERED',title:'Memory. Retrieval.',highlight:'Reasoning. Evidence.',
   body:'I connect the layers of AI systems—and evaluate how reliably they work once the demo ends.',
   from:.53,until:.76},
  {index:'04',eyebrow:'IN THE REAL WORLD',title:'Then make it',highlight:'useful.',
   body:'Research discovery. Journey planning. Accessibility. Different problems, deliberately engineered.',
   from:.76,until:1}
];
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const ease=(v:number)=>{const x=clamp(v);return x*x*(3-2*x)};
const segment=(p:number,a:number,b:number)=>ease((p-a)/(b-a));
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;

function StoryBeat({data,progress,reduced}:{data:Chapter;progress:MotionValue<number>;reduced:boolean}) {
 const first=data.from===0;
 const TitleTag=first?'h1':'h2';
 const last=data.until===1;
 const opacity=useTransform(
   progress,
   [Math.max(0,data.from-.045),data.from+.035,data.until-.055,Math.min(1,data.until+.045)],
   [first?1:0,1,1,last?1:0]
 );
 const y=useTransform(progress,[Math.max(0,data.from-.07),data.until+.06],[26,-28]);
 return <motion.div className="systems-beat" style={reduced?{opacity:1,y:0}:{opacity,y}}
   aria-label={data.eyebrow+': '+data.title+' '+data.highlight}>
   <div className="systems-beat-meta"><span>{data.index}</span><i/>{data.eyebrow}</div>
   <TitleTag>{data.title}<br/><em>{data.highlight}</em></TitleTag>
   <p>{data.body}</p>
   {last&&<a href="#work" className="systems-next">Meet the projects <ArrowDownRight size={19}/></a>}
 </motion.div>;
}

function canvasTexture(title:string,subtitle:string,kind:'module'|'product'|'monitor',palette:{base:string;accent:string}):THREE.CanvasTexture{
 const c=document.createElement('canvas');
 const big=kind==='product'; c.width=big?512:640;c.height=big?690:kind==='monitor'?415:384;
 const ctx=c.getContext('2d')!;
 const w=c.width,h=c.height;
 ctx.fillStyle=palette.base;ctx.fillRect(0,0,w,h);
 ctx.fillStyle='rgba(255,255,255,.035)';
 for(let x=20;x<w;x+=31){for(let y=22;y<h;y+=31){ctx.fillRect(x,y,1.5,1.5)}}
 ctx.fillStyle=palette.accent;ctx.fillRect(28,27,47,4);
 ctx.font='600 20px Arial';ctx.fillStyle='#b6c4d7';ctx.fillText(kind==='monitor'?'BUILD / 01':kind==='module'?'SYSTEM / LAYER':'SELECTED / WORK',28,66);
 ctx.font=(big?'bold 43px':'bold 50px')+' Arial';ctx.fillStyle='#f1f3f7';
 if(big&&title.length>10){
   const parts=title==='NextEuroTrip'?['NextEuro','Trip']:title==='WCAG Checker'?['WCAG','Checker']:[title];
   parts.forEach((part,i)=>ctx.fillText(part,28,166+i*54,w-48));
 } else ctx.fillText(title,28,big?174:178,w-48);
 ctx.font='20px Arial';ctx.fillStyle='#93adc3';
 ctx.fillText(subtitle,28,big?270:222,w-40);
 ctx.strokeStyle=palette.accent;
 ctx.lineWidth=2;
 if(kind==='product'){
   if(title==='ScholarBro'){
     const pts=[[100,430],[220,350],[290,482],[388,382],[427,527],[166,552]];
     ctx.beginPath();pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y));ctx.stroke();
     pts.forEach(([x,y],i)=>{ctx.beginPath();ctx.arc(x,y,i===2?12:7,0,Math.PI*2);ctx.fillStyle=i===2?'#f0af87':palette.accent;ctx.fill()});
     ctx.fillStyle='#96afbd';ctx.font='16px Arial';ctx.fillText('PAPERS   →   TOPICS   →   DISCOVERY',30,h-38);
   }else if(title==='NextEuroTrip'){
     ctx.strokeStyle='#80ab99';ctx.lineWidth=7;ctx.setLineDash([8,14]);ctx.beginPath();ctx.moveTo(65,560);ctx.bezierCurveTo(115,370,210,580,287,413);ctx.bezierCurveTo(325,340,391,380,444,350);ctx.stroke();ctx.setLineDash([]);
     [[65,560],[287,413],[444,350]].forEach(([x,y],i)=>{ctx.beginPath();ctx.arc(x,y,12,0,Math.PI*2);ctx.fillStyle=i===1?'#dfa87d':'#e4f0db';ctx.fill()});
     ctx.fillStyle='#a7c4b7';ctx.font='16px Arial';ctx.fillText('PLACES   →   DAYS   →   ROUTES',30,h-38);
   }else{
     for(let i=0;i<5;i++){const y=338+i*52;ctx.fillStyle='#1e3344';ctx.fillRect(32,y,w-64,42);ctx.fillStyle=i%2===0?'#9fcaad':'#8aaccf';ctx.fillRect(45,y+15,16,12);
       ctx.fillStyle='#d0dae5';ctx.font='17px Arial';ctx.fillText(['SCAN','SEMANTICS','CONTRAST','KEYBOARD','REPORT'][i],75,y+27)}
     ctx.fillStyle='#9bb4c7';ctx.font='16px Arial';ctx.fillText('AUDIT   →   EXPLAIN   →   IMPROVE',30,h-38);
   }
 }else if(kind==='monitor'){
   ctx.font='18px monospace';
   const lines=[
     'const context = await retrieve(query);',
     'const memory  = await recall(context);',
     'const answer  = await reason(memory);',
     'return verify(answer, sources);'
   ];
   lines.forEach((line,i)=>{ctx.fillStyle=i===3?'#edb68e':'#9fbbc9';ctx.fillText('0'+(i+1)+'  '+line,30,290+i*27)});
 }else{
   ctx.fillStyle=palette.accent;ctx.fillRect(30,h-58,w-60,3);
   ctx.fillStyle='#70889c';ctx.font='17px Arial';ctx.fillText('INFORMATION → DECISIONS',30,h-25);
 }
 const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;
 texture.anisotropy=2;return texture;
}

function WebGLSystem({progress,reduced}:{progress:MotionValue<number>;reduced:boolean}) {
 const host=useRef<HTMLDivElement>(null);
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  const element=host.current;if(!element||reduced)return;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});}
  catch{return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.55;
  element.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(37,1,.1,100);
  camera.position.set(0,0,9.4);
  const rig=new THREE.Group();scene.add(rig);
  const geometries:THREE.BufferGeometry[]=[];
  const materials:THREE.Material[]=[];
  const textures:THREE.Texture[]=[];
  const geometry=(w:number,h:number,d:number)=>{const g=new THREE.BoxGeometry(w,h,d);geometries.push(g);return g};
  const mat=(color:number,metalness=.42,roughness=.38)=>{const m=new THREE.MeshStandardMaterial({color,metalness,roughness});materials.push(m);return m};
  const dark=mat(0x1a2b40,.63,.3),silver=mat(0x91a6b9,.69,.25),pale=mat(0xd0e0e8,.44,.27);
  const teal=mat(0x65bbb0,.38,.3),amber=mat(0xe7aa80,.38,.28);
  const mesh=(w:number,h:number,d:number,m:THREE.Material)=>{
   const o=new THREE.Mesh(geometry(w,h,d),m);return o;
  };
  const screen=new THREE.Group();rig.add(screen);
  const board=mesh(4.28,2.7,.18,dark);board.position.set(0,.4,-.38);screen.add(board);
  const screenGlass=mesh(3.93,2.39,.015,silver);screenGlass.position.set(0,.4,-.265);screen.add(screenGlass);
  const monitorTex=canvasTexture('AGENT LAB','RAG  /  MEMORY  /  EVALUATION','monitor',{base:'#101e32',accent:'#e8af8b'});textures.push(monitorTex);
  const faceMaterial=new THREE.MeshBasicMaterial({map:monitorTex,transparent:false});materials.push(faceMaterial);
  const monitorFace=new THREE.Mesh(new THREE.PlaneGeometry(3.88,2.34),faceMaterial);geometries.push(monitorFace.geometry);monitorFace.position.set(0,.4,-.247);screen.add(monitorFace);
  const base=new THREE.Group();base.position.set(0,-1.43,.72);base.rotation.x=-1.08;rig.add(base);
  const keyboard=mesh(4.3,2.35,.13,silver);base.add(keyboard);
  const deck=mesh(4.0,2.05,.03,dark);deck.position.z=.09;base.add(deck);
  const keys:THREE.Mesh[]=[];
  for(let y=0;y<4;y++){for(let x=0;x<8;x++){
    const key=mesh(.39,.27,.06,(x+y)%10===0?teal:mat(0x374f62,.35,.52));
    key.position.set((x-3.5)*.46,.69-y*.39,.15);base.add(key);keys.push(key);
  }}
  const touch=mesh(1.14,.43,.02,mat(0x7c8fa0,.28,.49));touch.position.set(0,-.77,.15);base.add(touch);
  const fragments:{object:THREE.Object3D;anchor:THREE.Vector3;offset:THREE.Vector3;spin:THREE.Vector3}[]=[];
  const pieces:[number,number,number,number,number,number,THREE.Material][]=[
   [-2.15,.4,-.22,.13,2.84,.22,silver],[2.15,.4,-.22,.13,2.84,.22,silver],
   [0,1.82,-.22,4.35,.13,.22,silver],[0,-.99,-.22,4.35,.14,.22,silver],
   [0,-1.34,.75,4.25,.13,.25,dark],
   [-1.4,-1.65,1.15,.48,.17,.28,pale],[1.4,-1.65,1.15,.48,.17,.28,pale]
  ];
  pieces.forEach(([x,y,z,w,h,d,m],i)=>{
   const obj=mesh(w,h,d,m);obj.position.set(x,y,z);rig.add(obj);
   fragments.push({object:obj,anchor:obj.position.clone(),
    offset:new THREE.Vector3((i%2===0?-1:1)*(1.1+(i%4)*.36),((i%3)-1)*1.3,1+(i%4)*.43),
    spin:new THREE.Vector3((i%3-1)*.24,(i%2?1:-1)*.3,(i%4-1.5)*.2)});
  });
  // Five functional agent modules, physically separated from the interface.
  const modules:THREE.Group[]=[];
  const moduleLabels:[string,string,string][]=[
    ['INPUT','Questions, files','#dbad8d'],
    ['RETRIEVAL','Find the evidence','#92b5db'],
    ['MEMORY','Retain decisions','#a7cbb9'],
    ['REASONING','Tools + planning','#a8b7e7'],
    ['OUTPUT','Grounded answers','#e5c18a']
  ];
  for(const [title,sub,accent] of moduleLabels){
   const group=new THREE.Group();rig.add(group);
   const plate=mesh(1.47,.93,.14,dark);group.add(plate);
   const border=mesh(1.5,.96,.035,silver);border.position.z=-.08;group.add(border);
   const tex=canvasTexture(title,sub,'module',{base:'#12273a',accent});textures.push(tex);
   const m=new THREE.MeshBasicMaterial({map:tex});materials.push(m);
   const front=new THREE.Mesh(new THREE.PlaneGeometry(1.4,.88),m);geometries.push(front.geometry);front.position.z=.078;group.add(front);
   modules.push(group);
  }
  const targets=[
   new THREE.Vector3(-2.62,.78,.3),new THREE.Vector3(-1.34,-.69,1),
   new THREE.Vector3(0,1.13,1.25),new THREE.Vector3(1.34,-.69,1),
   new THREE.Vector3(2.62,.78,.3)
  ];
  const connectorPositions=new Float32Array(4*6);
  const connectorGeom=new THREE.BufferGeometry();geometries.push(connectorGeom);
  connectorGeom.setAttribute('position',new THREE.BufferAttribute(connectorPositions,3));
  const connectorMat=new THREE.LineBasicMaterial({color:0x8db9c4,transparent:true,opacity:0});materials.push(connectorMat);
  const connectors=new THREE.LineSegments(connectorGeom,connectorMat);rig.add(connectors);
  // Screens here are an illustrative gallery, not fake live screenshots.
  const productSpecs:[string,string,string,string][]=[
   ['ScholarBro','Research discovery','#122640','#9cb5ea'],
   ['NextEuroTrip','Journey planning','#163f3b','#8fc4ae'],
   ['WCAG Checker','Accessibility audit','#292536','#e7b59a']
  ];
  const products:THREE.Group[]=[];
  for(const [title,subtitle,color,accent] of productSpecs){
    const group=new THREE.Group();rig.add(group);
    const shadow=mesh(1.89,2.45,.15,dark);group.add(shadow);
    const texture=canvasTexture(title,subtitle,'product',{base:color,accent});textures.push(texture);
    const mm=new THREE.MeshBasicMaterial({map:texture});materials.push(mm);
    const face=new THREE.Mesh(new THREE.PlaneGeometry(1.83,2.37),mm);geometries.push(face.geometry);face.position.z=.084;group.add(face);
    products.push(group);
  }
  // Deterministic constellation, with no frame-by-frame geometry allocation.
  const particleCount=105;const positions=new Float32Array(particleCount*3);
  for(let i=0;i<particleCount;i++){
   const phi=i*2.399963229728653;const radius=2.35+(i%17)*.17;
   positions[i*3]=Math.cos(phi)*radius;positions[i*3+1]=Math.sin(phi)*radius*.7;
   positions[i*3+2]=-1.2-(i%7)*.3;
  }
  const constellationGeometry=new THREE.BufferGeometry();geometries.push(constellationGeometry);
  constellationGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const starMat=new THREE.PointsMaterial({color:0x87aabe,size:.021,transparent:true,opacity:.5,sizeAttenuation:true});materials.push(starMat);
  const stars=new THREE.Points(constellationGeometry,starMat);scene.add(stars);
  scene.add(new THREE.AmbientLight(0xdceaf9,2.3));
  const key=new THREE.DirectionalLight(0xf5f2ef,4.7);key.position.set(-3,5,8);scene.add(key);
  const rim=new THREE.DirectionalLight(0x65adc9,2.8);rim.position.set(5,-2,4);scene.add(rim);
  const fill=new THREE.PointLight(0xe3a67d,31);fill.position.set(2.3,2.3,4);scene.add(fill);
  let disposed=false;
  let visible=false;
  let running=0;
  let desired=progress.get(),eased=progress.get();
  let pointerX=0,pointerY=0;
  let previous=0;

  const resize=()=>{
   if(disposed)return;
   const width=element.clientWidth,height=element.clientHeight;
   if(!width||!height)return;
   camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height,false);
   wake();
  };
  const onPointer=(event:PointerEvent)=>{
   if(event.pointerType==='touch')return;
   const b=element.getBoundingClientRect();
   pointerX=clamp((event.clientX-b.left)/b.width)*2-1;
   pointerY=clamp((event.clientY-b.top)/b.height)*2-1;
   wake();
  };
  const onPointerLeave=()=>{pointerX=0;pointerY=0;};
  function renderFrame(now:number){
   running=0;if(disposed||document.hidden||!visible)return;
   const dt=previous?Math.min(.055,(now-previous)/1000):.017;previous=now;
   eased+=((desired-eased)*Math.min(1,dt*8));
   const p=clamp(eased);
   const explode=segment(p,.27,.48);
   const laptopExit=segment(p,.46,.62);
   const pipelineIn=segment(p,.49,.67);
   const pipelineOut=segment(p,.73,.85);
   const productIn=segment(p,.79,.95);
   const architecture=pipelineIn*(1-pipelineOut);
   const moduleTargets=targets;
   for(const item of fragments){
    item.object.position.copy(item.anchor).addScaledVector(item.offset,explode);
    item.object.rotation.set(item.spin.x*explode,item.spin.y*explode,item.spin.z*explode);
    item.object.scale.setScalar(Math.max(.001,1-laptopExit*.999));
   }
   screen.position.set(-.08*explode,.18*explode,1.0*explode);
   screen.rotation.y=explodeRotation(explode);
   screen.scale.setScalar(Math.max(.001,1-laptopExit*.999));
   base.position.set(0,-1.43-.9*explode,.72+2.1*explode);
   base.rotation.x=-1.08+(explode*.43);base.scale.setScalar(Math.max(.001,1-laptopExit*.999));
   for(let i=0;i<modules.length;i++){
    const m=modules[i],target=moduleTargets[i];
    m.position.set(mix(0,target.x,pipelineIn),mix(0,target.y,pipelineIn),mix(-.4,target.z,pipelineIn));
    m.rotation.y= (i-2)*.09*architecture;
    m.rotation.z=(i%2===0?1:-1)*.05*architecture;
    m.scale.setScalar(Math.max(.001,architecture));
   }
   for(let i=0;i<4;i++){
    const a=moduleTargets[i],b=moduleTargets[i+1];
    connectorPositions[i*6]=a.x;connectorPositions[i*6+1]=a.y;connectorPositions[i*6+2]=a.z-.25;
    connectorPositions[i*6+3]=b.x;connectorPositions[i*6+4]=b.y;connectorPositions[i*6+5]=b.z-.25;
   }
   (connectorGeom.getAttribute('position') as THREE.BufferAttribute).needsUpdate=true;
   connectorMat.opacity=architecture*.76;
   for(let i=0;i<products.length;i++){
    const frame=products[i];
    frame.position.set(mix((i-1)*3.8,(i-1)*2.08,productIn),mix(i%2?.3:-.3,0,productIn),mix(-1.7,.25,productIn));
    frame.rotation.y=(i-1)*(1-productIn)*.43+(i-1)*.09;
    frame.rotation.x=-(1-productIn)*.32;
    frame.scale.setScalar(Math.max(.001,productIn));
   }
   rig.rotation.set(-.06+Math.sin(p*Math.PI)*.07-pointerY*.035,-.17+Math.sin(p*Math.PI*1.6)*.23+pointerX*.07,Math.sin(p*Math.PI*2)*.025);
   rig.scale.setScalar(element.clientWidth<600?.8:1);
   camera.position.z=9.45+Math.sin(p*Math.PI)*.58-productIn*.55;
   camera.position.y=mix(-.12,.1,p);
   camera.lookAt(0,0,0);
   stars.rotation.z=now*.000012;starMat.opacity=.25+architecture*.3;
   renderer.render(scene,camera);
   if(Math.abs(desired-eased)>.0003||Math.abs(pointerX)>.005||Math.abs(pointerY)>.005||visible){
     running=requestAnimationFrame(renderFrame);
   }
  }
  function explodeRotation(v:number){return v*.27;}
  function wake(){if(visible&&!running&&!disposed&&!document.hidden)running=requestAnimationFrame(renderFrame);}
  const observer=new IntersectionObserver(entries=>{
   visible=Boolean(entries[0]?.isIntersecting);
   if(!visible&&running){cancelAnimationFrame(running);running=0;}
   wake();
  },{rootMargin:'130px'});
  observer.observe(element);
  const sizer=new ResizeObserver(resize);sizer.observe(element);
  const unsubscribe=progress.on('change',v=>{desired=v;wake()});
  const visibility=()=>{previous=0;wake()};
  element.addEventListener('pointermove',onPointer,{passive:true});
  element.addEventListener('pointerleave',onPointerLeave);
  document.addEventListener('visibilitychange',visibility);
  setReady(true);resize();wake();
  return()=>{
   disposed=true;if(running)cancelAnimationFrame(running);
   observer.disconnect();sizer.disconnect();unsubscribe();
   element.removeEventListener('pointermove',onPointer);
   element.removeEventListener('pointerleave',onPointerLeave);
   document.removeEventListener('visibilitychange',visibility);
   geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());
   renderer.dispose();renderer.domElement.remove();
  };
 },[progress,reduced]);
 return <div className={'systems-webgl '+(ready?'webgl-ready':'')} ref={host} role="img"
   aria-label="A laptop-like software workspace explodes into hardware and interface layers, reorganizes into an agent architecture, and resolves into ScholarBro, NextEuroTrip and WCAG Checker">
    <div className="systems-render-fallback" aria-hidden="true">
      <span>INPUT</span><span>RETRIEVAL</span><span>MEMORY</span><span>REASONING</span><span>OUTPUT</span>
    </div>
 </div>;
}

export default function CinematicSystems(){
 const ref=useRef<HTMLElement>(null);
 const reduced=Boolean(useReducedMotion());
 const [compact,setCompact]=useState(false);
 useEffect(()=>{
  const query=window.matchMedia('(max-width: 760px)');
  const update=()=>setCompact(query.matches);
  update();query.addEventListener('change',update);
  return()=>query.removeEventListener('change',update);
 },[]);
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
 const phaseProgress=useTransform(scrollYProgress,[0,1],[0,1]);
 const lineScale=useTransform(scrollYProgress,[0,1],[0,1]);
 if(reduced||compact){
  return <section ref={ref} className="systems-static" id="approach" aria-label="Engineering and research approach"><span id="start" className="systems-start-anchor"/>
   <div className="systems-static-inner">
    <div className="systems-static-header"><span>01 / INSIDE THE WORK</span><h2>From a question<br/>to a working system.</h2>
     <p>I design the layers underneath an experience, evaluate how they behave, and turn them into software people can use.</p></div>
    <div className="systems-static-grid">
     {chapters.map((beat,i)=><article key={beat.index}>
      <span>0{i+1} / {beat.eyebrow}</span>
      <div className="static-chapter-icon">{[<Cpu size={27}/>,<Layers3 size={27}/>,<Network size={27}/>,<Boxes size={27}/>][i]}</div>
      <h3>{beat.title} <em>{beat.highlight}</em></h3><p>{beat.body}</p>
     </article>)}
    </div>
   </div>
  </section>;
 }
 return <section className="systems-cinema" id="approach" ref={ref} aria-label="Inside a system: cinematic engineering story"><span id="start" className="systems-start-anchor"/>
  <div className="systems-cinema-sticky">
   <div className="systems-noise" aria-hidden="true"/>
   <div className="systems-topline" aria-hidden="true"><span>AN ENGINEER’S STORY</span><span>BUILDING SOFTWARE / STUDYING INTELLIGENCE</span></div>
   <div className="systems-scene"><WebGLSystem progress={phaseProgress} reduced={reduced}/></div>
   <div className="systems-narrative">
    {chapters.map(beat=><StoryBeat key={beat.index} data={beat} progress={phaseProgress} reduced={reduced}/>)}
   </div>
   <div className="systems-bottomline" aria-hidden="true">
    <span>INTRODUCTION</span><span>QUESTION</span><span>ASSEMBLY</span><span>INTELLIGENCE</span><span>PRODUCTS</span>
   </div>
   <motion.div className="systems-timeline" style={{scaleX:lineScale}} aria-hidden="true"/>
  </div>
 </section>;
}
