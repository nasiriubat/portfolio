import { useEffect, useRef } from 'react';
import * as THREE from 'three';
/** A scroll-scrubbed assembly of an abstract software engine.
 * GPU work is paused off-screen, on hidden tabs and for reduced-motion users. */
export default function CinematicAssembly(){
 const host=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const element=host.current;if(!element)return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(36,1,.1,100);camera.position.set(0,0,13);
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  element.appendChild(renderer.domElement);
  const world=new THREE.Group();scene.add(world);
  const steel=new THREE.MeshStandardMaterial({color:0x163e7b,metalness:.65,roughness:.27});
  const blue=new THREE.MeshStandardMaterial({color:0x4c83f3,metalness:.5,roughness:.22});
  const glass=new THREE.MeshPhysicalMaterial({color:0xb4d8ff,metalness:.1,roughness:.08,transparent:true,opacity:.57,transmission:.23});
  const cyan=new THREE.MeshStandardMaterial({color:0x58d4f5,emissive:0x13779c,emissiveIntensity:.45,metalness:.3,roughness:.3});
  const parts: {mesh:THREE.Object3D;origin:THREE.Vector3;offset:THREE.Vector3;spin:THREE.Vector3}[]=[];
  function add(mesh:THREE.Object3D,x:number,y:number,z:number,ox:number,oy:number,oz:number,rx:number,ry:number,rz:number){
   world.add(mesh);parts.push({mesh,origin:new THREE.Vector3(x,y,z),offset:new THREE.Vector3(ox,oy,oz),spin:new THREE.Vector3(rx,ry,rz)});
  }
  const frame=new THREE.Mesh(new THREE.BoxGeometry(4.5,2.95,.19),steel);add(frame,0,0,-.3,-2.2,1.7,-1.7,.35,-.7,.1);
  const inner=new THREE.Mesh(new THREE.BoxGeometry(4.14,2.57,.08),glass);add(inner,0,0,-.16,2.2,-1.5,1.1,-.25,.7,-.2);
  for(let i=0;i<7;i++){
   const h=.21+(i%3)*.18;const w=.32+(i%4)*.23;
   const box=new THREE.Mesh(new THREE.BoxGeometry(w,h,.16),i%3===0?cyan:i%2?glass:blue);
   const x=-1.55+(i%4)*.96,y=.75-Math.floor(i/4)*1.15;
   add(box,x,y,.13,(i%2?1:-1)*(1.5+i*.19),(i%3-1)*2.2,1+i*.2,(i%2?1:-1)*.6,(i%3-1)*1.1,.35);
  }
  for(let i=0;i<22;i++){
   const angle=i*Math.PI*2/22;
   const pin=new THREE.Mesh(new THREE.BoxGeometry(.11,.19,.14),i%4===0?cyan:steel);
   add(pin,Math.cos(angle)*2.35,Math.sin(angle)*1.65,0,Math.cos(angle)*2.5,Math.sin(angle)*2.4,1.3,.4,.8,.3);
  }
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.76,.055,8,64),cyan);
  add(ring,.8,-.22,.38,0,-2.4,2,1.1,.7,.3);
  const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.45,1),blue);
  add(core,.8,-.22,.45,1.2,2.6,2,-.8,.9,.5);
  const grid=new THREE.GridHelper(13,26,0xa2c4f7,0xd7e6fc);grid.rotation.x=Math.PI/2;grid.position.z=-2.5;scene.add(grid);
  scene.add(new THREE.AmbientLight(0xffffff,2.2));
  const key=new THREE.DirectionalLight(0xe3f4ff,3.8);key.position.set(-3,5,8);scene.add(key);
  const fill=new THREE.PointLight(0x528df8,65);fill.position.set(4,-2,5);scene.add(fill);
  let visible=true,disposed=false,frameId=0,scroll=0,smoothed=0;
  const resize=()=>{const w=element.clientWidth,h=element.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)};
  const onScroll=()=>{const r=element.getBoundingClientRect();const span=window.innerHeight+r.height;scroll=Math.max(0,Math.min(1,(window.innerHeight-r.top)/span))};
  const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false},{rootMargin:'100px'});
  observer.observe(element);const resizer=new ResizeObserver(resize);resizer.observe(element);
  const clock=new THREE.Clock();
  function draw(){if(disposed)return;frameId=requestAnimationFrame(draw);if(!visible||document.hidden)return;
   const dt=Math.min(clock.getDelta(),.05);smoothed+=(scroll-smoothed)*Math.min(1,dt*3.7);
   const phase=reduce?1:smoothed;const explosion=reduce?0:Math.max(0,1-Math.min(1,Math.max(0,(phase-.12)/.65)));
   for(const p of parts){p.mesh.position.copy(p.origin).addScaledVector(p.offset,explosion);p.mesh.rotation.set(p.spin.x*explosion,p.spin.y*explosion,p.spin.z*explosion)}
   world.rotation.y=(reduce?-.18:(phase-.5)*.5);world.rotation.x=(reduce?-.12:(.5-phase)*.18);
   world.scale.setScalar(host.current?.clientWidth && host.current.clientWidth<500?.7:.94);
   grid.material instanceof THREE.Material&&(grid.material.opacity=.17);
   renderer.render(scene,camera);
  }
  resize();onScroll();window.addEventListener('scroll',onScroll,{passive:true});draw();
  return()=>{disposed=true;cancelAnimationFrame(frameId);window.removeEventListener('scroll',onScroll);observer.disconnect();resizer.disconnect();for(const p of parts){const mesh=p.mesh as THREE.Mesh;mesh.geometry?.dispose()}grid.geometry.dispose();for(const mat of [steel,blue,glass,cyan])mat.dispose();renderer.dispose();renderer.domElement.remove()};
 },[]);
 return <div className="cinematic-assembly" ref={host} role="img" aria-label="Interactive three-dimensional software engine assembling from separate components as you scroll"><div className="cinematic-caption"><span>SCROLL TO ASSEMBLE</span><span>ENGINEERED IN 3D / THREE.JS</span></div></div>;
}
