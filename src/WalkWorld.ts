import * as THREE from 'three';

/** A closed 3D road. Its eighth waypoint is the first one again. */
export const ROAD_STOPS = 7;
export type WalkProgress = { current: number; overview: boolean };
type Parent = THREE.Object3D;
const blue = '#2e5366';
const tones = ['#f6aa7d','#abcde3','#9cd5ba','#edb4a5','#c6b5e7','#e7ce8d','#b5d7d4'];
const mat = (color:string, metalness=0) => new THREE.MeshStandardMaterial({color,roughness:.83,metalness});
function mesh(parent:Parent,geo:THREE.BufferGeometry,color:string,x=0,y=0,z=0){
 const m=new THREE.Mesh(geo,mat(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;
}
function block(p:Parent,w:number,h:number,d:number,c:string,x=0,y=0,z=0){
 return mesh(p,new THREE.BoxGeometry(w,h,d),c,x,y,z);
}
function globe(p:Parent,r:number,c:string,x=0,y=0,z=0,sx=1,sy=1,sz=1){
 const o=mesh(p,new THREE.SphereGeometry(r,16,12),c,x,y,z);o.scale.set(sx,sy,sz);return o;
}
function cylinder(p:Parent,top:number,bottom:number,h:number,c:string,x=0,y=0,z=0,n=12){
 return mesh(p,new THREE.CylinderGeometry(top,bottom,h,n),c,x,y,z);
}
function roundBox(p:Parent,w:number,h:number,d:number,r:number,c:string,x=0,y=0,z=0){
 const shape=new THREE.Shape(),rad=Math.min(r,w/2,h/2);
 shape.moveTo(-w/2+rad,-h/2);shape.lineTo(w/2-rad,-h/2);
 shape.quadraticCurveTo(w/2,-h/2,w/2,-h/2+rad);shape.lineTo(w/2,h/2-rad);
 shape.quadraticCurveTo(w/2,h/2,w/2-rad,h/2);shape.lineTo(-w/2+rad,h/2);
 shape.quadraticCurveTo(-w/2,h/2,-w/2,h/2-rad);shape.lineTo(-w/2,-h/2+rad);
 shape.quadraticCurveTo(-w/2,-h/2,-w/2+rad,-h/2);
 const geo=new THREE.ExtrudeGeometry(shape,{depth:d,bevelEnabled:true,bevelSize:.08,bevelThickness:.06,bevelSegments:2,steps:1,curveSegments:3});
 return mesh(p,geo,c,x,y,z);
}
function label(p:Parent,text:string,x:number,y:number,z:number,s=3){
 const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');if(!ctx)return;
 ctx.clearRect(0,0,c.width,c.height);
 ctx.font='900 53px Arial, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
 ctx.fillStyle='#244c5f';ctx.fillText(text.toUpperCase(),256,70,486);
 const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;
 const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,depthWrite:false,transparent:true}));
 sprite.position.set(x,y,z);sprite.scale.set(s,s/4,1);p.add(sprite);
}
function pine(p:Parent,x:number,z:number,scale=1){
 cylinder(p,.11*scale,.19*scale,1.2*scale,'#9f7767',x,.57*scale,z);
 for(let i=0;i<3;i++) globe(p,(.65-i*.12)*scale,['#6ab7a1','#7ec7ad','#98d5ad'][i],x+(i%2?.12:0),(.96+i*.35)*scale,z,1,.73,1);
}
function blossom(p:Parent,x:number,z:number,size=1){
 cylinder(p,.1*size,.14*size,1.17*size,'#b38e7a',x,.5*size,z);
 globe(p,.7*size,'#f4b8b5',x,1.38*size,z,1,.9,1);
 for(let i=0;i<4;i++){const a=i*Math.PI/2;globe(p,.31*size,'#ffe0ce',x+Math.cos(a)*.45*size,1.45*size,z+Math.sin(a)*.4*size);}
}
function lamp(p:Parent,x:number,z:number){
 cylinder(p,.07,.09,1.48,'#476b7c',x,.74,z);
 globe(p,.22,'#fff0b3',x,1.6,z);
}
function makePath(){
 const points:Array<THREE.Vector3>=[];
 for(let i=0;i<ROAD_STOPS;i++){
  const a=Math.PI/2-i*2*Math.PI/ROAD_STOPS;
  points.push(new THREE.Vector3(Math.cos(a)*15.5,.15,Math.sin(a)*11.6));
 }
 return new THREE.CatmullRomCurve3(points,true,'centripetal',.5);
}
function buildRoad(world:Parent,path:THREE.CatmullRomCurve3){
 const n=280,vertices:number[]=[],normals:number[]=[],uv:number[]=[];
 const half=1.32;
 for(let i=0;i<n;i++){
  const a=path.getPointAt(i/n),b=path.getPointAt((i+1)/n);
  const t1=path.getTangentAt(i/n),t2=path.getTangentAt((i+1)/n);
  const p1=new THREE.Vector3(-t1.z,0,t1.x).normalize().multiplyScalar(half);
  const p2=new THREE.Vector3(-t2.z,0,t2.x).normalize().multiplyScalar(half);
  const pts=[a.clone().add(p1),a.clone().sub(p1),b.clone().add(p2),b.clone().sub(p2)];
  for(const id of [0,1,2,1,3,2]){const p=pts[id];vertices.push(p.x,.085,p.z);normals.push(0,1,0);uv.push(p.x/12,p.z/12)}
 }
 const geo=new THREE.BufferGeometry();
 geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
 geo.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));
 geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
 const road=mesh(world,geo,'#f6e5c7');road.castShadow=false;
 for(let i=0;i<84;i++){
  const t=(i+.35)/84,point=path.getPointAt(t),tan=path.getTangentAt(t);
  const mark=block(world,.10,.025,.44,'#d3b9a0',point.x,.13,point.z);
  mark.rotation.y=Math.atan2(tan.x,tan.z);
 }
}
function island(world:Parent){
 const water=cylinder(world,23,23,.10,'#cce9e3',0,-.59,0,64);
 water.scale.set(1.13,1,.85);water.castShadow=false;
 const ground=cylinder(world,21.2,21.5,.72,'#7fb7a1',0,-.34,0,64);
 ground.scale.set(1.1,1,.78);
 cylinder(world,20.9,20.9,.11,'#bce1b7',0,.07,0,64).scale.set(1.1,1,.78);
 // The center garden makes the road visibly circular during overview mode.
 cylinder(world,7.1,7.6,.17,'#d0e9bb',0,.18,0,48).scale.set(1.25,1,.9);
 cylinder(world,4.8,5.2,.23,'#edd4b0',0,.31,0,48).scale.set(1.14,1,.98);
 cylinder(world,2.5,2.8,.45,'#8ebec2',0,.5,0,32);
 cylinder(world,.23,.34,2.2,'#638d8c',0,1.86,0);
 globe(world,1.12,'#b5dcea',0,3.15,0);
 for(let i=0;i<6;i++){const a=i*Math.PI/3;globe(world,.29,'#fff6d2',Math.cos(a)*1.7,2.7,Math.sin(a)*1.7);}
 label(world,'THE LITTLE WORLD',0,4.9,0,5);
 for(let i=0;i<48;i++){
  const a=i*2.3995,r=7.6+(i%5)*.8,x=Math.cos(a)*r*1.15,z=Math.sin(a)*r*.85;
  if(i%7===0)blossom(world,x,z,.67);else pine(world,x,z,.44+(i%3)*.10);
 }
}
function station(p:Parent,i:number,path:THREE.CatmullRomCurve3){
 const point=path.getPointAt(i/ROAD_STOPS),radial=new THREE.Vector3(point.x,0,point.z).normalize();
 const place=new THREE.Group();p.add(place);place.position.copy(point).addScaledVector(radial,-3.8);place.position.y=.1;
 // Orient scenery toward the road for a legible miniature diorama.
 place.rotation.y=Math.atan2(-radial.x,-radial.z);
 const base=cylinder(place,3.45,3.65,.44,['#f2c7ad','#d3e0f5','#d0ebd6','#f7d7c5','#dcd2ef','#f0e5b3','#cee6de'][i],0,-.04,0,36);
 base.castShadow=false;
 cylinder(place,3.4,3.4,.10,'#f7f3de',0,.19,0,36);
 pine(place,-2.7,-.6,.65);blossom(place,2.7,-.7,.65);
 const sign=cylinder(place,.07,.09,1.26,'#647d88',2.5,.8,1.7);
 sign.castShadow=false;
 roundBox(place,1.2,.55,.12,.12,'#fff7e8',2.5,1.53,1.69);
 label(place,String(i+1).padStart(2,'0'),2.5,1.53,1.84,1.05);
 if(i===0){
  // Small engineering studio
  roundBox(place,4.1,2.55,2.1,.35,'#c3dbea',0,1.5,-.5);
  roundBox(place,4.45,.3,2.6,.12,'#476a7f',0,2.99,-.5);
  for(const x of [-1.37,0,1.37]){
   roundBox(place,1,.94,.11,.13,'#375970',x,1.81,.66);
   roundBox(place,.75,.55,.04,.08,['#9fdacb','#e8c0a9','#b3ceeb'][Math.round(x+1.37)],x,1.82,.78);
  }
  cylinder(place,.65,.69,.21,'#d3a88f',0,.43,1.5);
  roundBox(place,1.55,.2,.95,.1,'#a97864',0,.95,1.46);
  label(place,'HELLO',0,4.0,-.5,3);
 }else if(i===1){
  for(const x of [-1.35,1.35]){
   roundBox(place,2.2,2.35,1.65,.2,x<0?'#fff1d6':'#e4e2f0',x,1.45,-.55);
   roundBox(place,2.6,.23,2,.08,x<0?'#cf947d':'#87a8c2',x,2.75,-.55);
   for(let c=0;c<2;c++)roundBox(place,.51,.8,.09,.06,'#a4cdda',x+(-.5+c),1.75,.38);
  }
  cylinder(place,.1,.13,1.55,'#708993',0,.89,1.7);
  globe(place,.37,'#ffe19f',0,1.92,1.7);
  label(place,'CAMPUS',0,3.9,-.4,3.35);
 }else if(i===2){
  for(let c=0;c<4;c++){
   const x=-2.1+c*1.36,h=1.65+(c%3)*.6;
   roundBox(place,1.12,h,1.2,.12,['#accbd6','#edb9a7','#c4d6b4','#b4b8d8'][c],x,h/2+.26,-.5);
   for(let row=0;row<2;row++)roundBox(place,.36,.29,.06,.03,'#e9f3f4',x,.85+row*.61,.18);
  }
  label(place,'CAREER',0,4.1,0,3.3);
 }else if(i===3){
  // A little product expo with actual screens, not implied screenshots
  for(let c=0;c<3;c++){
   const x=-2.05+c*2.05;
   cylinder(place,.79,.85,.5,['#addbd1','#f3d4aa','#a9c6e5'][c],x,.48,-.25);
   roundBox(place,1.55,1.27,.18,.12,'#35536c',x,1.66,-.35);
   roundBox(place,1.29,.99,.06,.06,['#b1e2d4','#ffe4b2','#c6ddf5'][c],x,1.65,-.21);
   roundBox(place,1.4,.12,.75,.06,'#fff6e4',x,1.04,-.04);
  }
  label(place,'PROJECT EXPO',0,3.55,-.5,4.0);
 }else if(i===4){
  cylinder(place,1.9,2.1,.5,'#6f9ba9',0,.43,-.35);
  cylinder(place,.15,.19,2.05,'#456e84',0,1.71,-.35);
  globe(place,.79,'#c5eaf0',0,2.82,-.35);
  for(let c=0;c<4;c++){
   const a=c*Math.PI/2;
   const x=Math.cos(a)*1.55,z=Math.sin(a)*1.55-.4;
   cylinder(place,.46,.55,.66,['#ecc1af','#b8c3ec','#add9c9','#e7d8a7'][c],x,.62,z);
   globe(place,.26,'#fff7df',x,1.04,z);
  }
  label(place,'AI LAB',0,4.35,-.5,3.6);
 }else if(i===5){
  for(let c=0;c<5;c++){
   const a=c*2*Math.PI/5,x=Math.sin(a)*1.95,z=Math.cos(a)*1.3-.3;
   cylinder(place,.52,.65,.55,['#a8d5dc','#f4c6a7','#c4e2b8','#d0bee9','#eed99e'][c],x,.47,z);
   cylinder(place,.12,.14,1.08,'#5c7890',x,1.25,z);
   globe(place,.35,['#81bac6','#efad8a','#a9d3a3','#ad9cdd','#ddc078'][c],x,1.85,z);
  }
  label(place,'SKILL STUDIO',0,3.45,0,4.05);
 }else{
  roundBox(place,3.8,2.6,1.9,.3,'#f2d9cd',0,1.46,-.55);
  roundBox(place,4.12,.29,2.14,.16,'#6f97a5',0,2.86,-.55);
  roundBox(place,1.85,1.09,.13,.14,'#fff9df',0,1.72,.52);
  block(place,1.54,.09,.08,'#e4b2a3',0,1.65,.64);
  globe(place,.27,'#96cdb2',.91,1.14,.55);
  label(place,'CONTACT',0,3.92,-.5,3.25);
 }
 // Small landscaping never lies in the central path.
 pine(place,2.85,.7,.43);
}
function curvedSmile(p:Parent,y:number,z:number){
 const pts=[];for(let i=0;i<=10;i++){const x=(i/10-.5)*.48;pts.push(new THREE.Vector3(x,y-.12*(1-(x/.24)**2),z));}
 const curve=new THREE.CatmullRomCurve3(pts);
 const line=mesh(p,new THREE.TubeGeometry(curve,12,.023,5,false),'#9e585d');
 line.castShadow=false;
}
function traveler(){
 const avatar=new THREE.Group(),torso=new THREE.Group();avatar.add(torso);
 const hoodie=globe(torso,.7,'#e7976f',0,1.53,0,1,1.05,.71);
 globe(torso,.62,'#d77f64',0,1.72,-.27,1,.92,.62);
 roundBox(torso,.58,.25,.22,.1,'#f4d19c',0,2.15,.48);
 // A larger, expressive face and carefully layered hair silhouette
 const head=globe(torso,.75,'#e9b48b',0,2.64,.05,1,1.12,.95);
 globe(torso,.17,'#e9b48b',-.73,2.62,.03);globe(torso,.17,'#e9b48b',.73,2.62,.03);
 for(const x of [-.32,.32]){
  globe(torso,.145,'#fffdf2',x,2.72,.665,1,1.25,.36);
  globe(torso,.088,'#233d54',x+.018,2.7,.774,1,1.12,.48);
  globe(torso,.035,'#fffdf7',x-.007,2.75,.815);
  globe(torso,.16,'#e79c8b',x*1.58,2.49,.58,1,.6,.4);
 }
 globe(torso,.095,'#d18b74',0,2.51,.76,.82,.83,.62);
 curvedSmile(torso,2.36,.742);
 // Sculptural black hair curls rather than a simple hair dome.
 globe(torso,.74,'#253d51',0,3.09,-.11,1,.5,.94);
 for(let i=0;i<9;i++){
  const a=i*Math.PI/8;
  globe(torso,.22+(i%3)*.025,'#253d51',Math.cos(a)*.59,3.21+Math.sin(a)*.1,Math.sin(a)*.28);
 }
 for(let i=0;i<4;i++)globe(torso,.26,'#263a4f',-.4+i*.27,3.17,.38,1,.9,.85);
 // Hood drawstrings
 for(const x of [-.24,.24])cylinder(torso,.035,.035,.45,'#fff4d7',x,1.75,.64,7);
 const pack=roundBox(torso,.97,1.08,.36,.22,'#577e97',0,1.49,-.75);
 pack.rotation.x=-.12;
 roundBox(torso,.42,.17,.1,.06,'#f3cb92',0,1.55,-.99);
 const arms:THREE.Group[]=[],legs:THREE.Group[]=[];
 for(const dir of [-1,1]){
  const shoulder=new THREE.Group();shoulder.position.set(dir*.64,1.98,0);torso.add(shoulder);
  globe(shoulder,.27,'#e7976f',0,-.14,0);
  cylinder(shoulder,.16,.21,.76,'#e7976f',dir*.07,-.46,0);
  globe(shoulder,.18,'#e9b48b',dir*.08,-.86,.02);
  arms.push(shoulder);
  const hip=new THREE.Group();hip.position.set(dir*.31,1.0,0);torso.add(hip);
  cylinder(hip,.23,.2,.81,'#455d7e',0,-.41,0);
  roundBox(hip,.5,.25,.75,.11,'#fff3df',0,-.85,.15);
  roundBox(hip,.31,.065,.42,.03,'#deae83',0,-.98,.33);
  legs.push(hip);
 }
 return {avatar,torso,arms,legs,head,hoodie};
}
export function mountWorld(host:HTMLDivElement,progress:WalkProgress,onFailure:()=>void){
 let renderer:THREE.WebGLRenderer;
 try{renderer=new THREE.WebGLRenderer({alpha:false,antialias:true,powerPreference:'high-performance'});}
 catch{onFailure();return()=>{};}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.6));
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;
 renderer.domElement.className='walk-webgl';renderer.domElement.setAttribute('aria-hidden','true');
 host.appendChild(renderer.domElement);
 const scene=new THREE.Scene();
 scene.background=new THREE.Color('#eaf5f3');scene.fog=new THREE.Fog('#eaf5f3',40,105);
 scene.add(new THREE.HemisphereLight('#ffffff','#8ab7a9',2.4));
 const sun=new THREE.DirectionalLight('#fff2d9',3.2);
 sun.position.set(-16,29,19);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
 sun.shadow.camera.left=-43;sun.shadow.camera.right=43;sun.shadow.camera.top=43;sun.shadow.camera.bottom=-43;
 sun.shadow.camera.near=1;sun.shadow.camera.far=95;sun.shadow.bias=-.0003;scene.add(sun);
 const world=new THREE.Group();scene.add(world);
 const path=makePath();island(world);buildRoad(world,path);
 for(let i=0;i<ROAD_STOPS;i++)station(world,i,path);
 for(let i=0;i<30;i++){
  const a=i*2.399,r=25.6+(i%3)*1.9;
  if(i%4===0)blossom(world,Math.cos(a)*r,Math.sin(a)*r*.77,.9);
  else pine(world,Math.cos(a)*r,Math.sin(a)*r*.8,.75);
 }
 const actor=traveler();world.add(actor.avatar);
 const shadow=new THREE.Mesh(new THREE.CircleGeometry(.74,22),new THREE.MeshBasicMaterial({color:'#244b54',transparent:true,opacity:.13,depthWrite:false}));
 shadow.rotation.x=-Math.PI/2;shadow.position.y=.19;world.add(shadow);
 const camera=new THREE.PerspectiveCamera(45,1,.1,180);
 const clock=new THREE.Clock();let raf=0,disposed=false,actual=0,walk=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const resize=()=>{
  const w=Math.max(host.clientWidth,1),h=Math.max(host.clientHeight,1);
  renderer.setSize(w,h,false);camera.aspect=w/h;
  camera.fov=w<600?41:39;camera.updateProjectionMatrix();
 };
 const ro=new ResizeObserver(resize);ro.observe(host);resize();
 const start=path.getPointAt(0);
 camera.position.set(start.x+14,16,start.z+15);camera.lookAt(start.x,1.4,start.z);
 const render=()=>{
  if(disposed)return;
  raf=requestAnimationFrame(render);
  const dt=Math.min(.05,clock.getDelta());
  const destination=THREE.MathUtils.clamp(progress.current,0,1);
  const old=actual;
  actual=THREE.MathUtils.lerp(actual,destination,1-Math.exp(-dt*(reduced?18:4.5)));
  const distance=Math.abs(actual-old)*105;
  const movement=Math.min(1,distance/(dt*8+.001));
  walk+=dt*8*movement;
  const at=path.getPointAt(Math.min(.999999,actual)),tangent=path.getTangentAt(Math.min(.999999,actual));
  const radial=new THREE.Vector3(at.x,0,at.z).normalize();
  actor.avatar.position.copy(at);actor.avatar.position.y=.24;
  shadow.position.set(at.x,.20,at.z);
  const face=Math.atan2(tangent.x,tangent.z);
  actor.avatar.rotation.y=THREE.MathUtils.lerp(actor.avatar.rotation.y,face,1-Math.exp(-dt*5));
  actor.torso.position.y=reduced?0:Math.sin(walk*2)*.075*movement;
  actor.arms.forEach((a,i)=>{a.rotation.x=Math.sin(walk+i*Math.PI)*.54*movement});
  actor.legs.forEach((a,i)=>{a.rotation.x=-Math.sin(walk+i*Math.PI)*.52*movement});
  actor.head.rotation.z=reduced?0:Math.sin(clock.elapsedTime*1.1)*.025;
  const isMobile=host.clientWidth<720;
  const overview=progress.overview;
  const offset=overview?new THREE.Vector3(7,42,37):
    radial.clone().multiplyScalar(isMobile?12.5:11.8).addScaledVector(tangent,isMobile?-4.5:-5.8).add(new THREE.Vector3(0,isMobile?10.8:10.5));
  const destinationPosition=overview?offset:at.clone().add(offset);
  camera.position.lerp(destinationPosition,1-Math.exp(-dt*2.6));
  const center=overview?new THREE.Vector3(0,0,0):at.clone().addScaledVector(radial,isMobile?-1.4:-1.7).add(new THREE.Vector3(0,1.7,0));
  // Look target dampens independently to avoid sharp rotations at corners.
  look.lerp(center,1-Math.exp(-dt*3.2));
  camera.lookAt(look);
  renderer.render(scene,camera);
 };
 const look=new THREE.Vector3(start.x,1.4,start.z);
 render();
 return ()=>{
  disposed=true;cancelAnimationFrame(raf);ro.disconnect();
  scene.traverse(o=>{
   if(o instanceof THREE.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());}
   if(o instanceof THREE.Sprite){o.material.map?.dispose();o.material.dispose();}
  });
  renderer.dispose();renderer.domElement.remove();
 };
}
