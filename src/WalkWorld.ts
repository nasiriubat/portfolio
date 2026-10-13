import * as THREE from 'three';

const STEP = 15;
const COUNT = 7;
const ink = '#17334b';
const cream = '#fff6dc';
const palette = ['#ffc58f','#9bcaf8','#addec7','#ffb2a7','#c4b5fa','#f7d98b','#a8e0dc'];

type MutableProgress = { current: number };
type MeshParent = THREE.Object3D;

function box(parent:MeshParent,w:number,h:number,d:number,color:string,x=0,y=0,z=0,rotationY=0){
  const object = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color,roughness:.82,metalness:0}));
  object.position.set(x,y,z);object.rotation.y=rotationY;object.castShadow=true;object.receiveShadow=true;parent.add(object);return object;
}
function ball(parent:MeshParent,r:number,color:string,x=0,y=0,z=0,sx=1,sy=1,sz=1){
  const object=new THREE.Mesh(new THREE.SphereGeometry(r,18,12),new THREE.MeshStandardMaterial({color,roughness:.77}));
  object.position.set(x,y,z);object.scale.set(sx,sy,sz);object.castShadow=true;parent.add(object);return object;
}
function tube(parent:MeshParent,rTop:number,rBottom:number,h:number,color:string,x=0,y=0,z=0,segments=12){
  const object=new THREE.Mesh(new THREE.CylinderGeometry(rTop,rBottom,h,segments),new THREE.MeshStandardMaterial({color,roughness:.82}));
  object.position.set(x,y,z);object.castShadow=true;object.receiveShadow=true;parent.add(object);return object;
}
function textSprite(parent:MeshParent,label:string,x:number,y:number,z:number,color=ink,scale=2.7){
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;
  const ctx=canvas.getContext('2d');if(!ctx)return;
  ctx.fillStyle='rgba(0,0,0,0)';ctx.clearRect(0,0,512,128);
  ctx.fillStyle=color;ctx.font='900 57px Arial, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label.toUpperCase(),256,64,490);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  const material=new THREE.SpriteMaterial({map:texture,transparent:true,depthWrite:false});
  const sprite=new THREE.Sprite(material);sprite.position.set(x,y,z);sprite.scale.set(scale,scale/4,1);parent.add(sprite);
}
function tree(parent:MeshParent,x:number,z:number,s=1){
  tube(parent,.12*s,.18*s,1.3*s,'#9d6b54',x,.65*s,z);
  ball(parent,.79*s,'#5aa98d',x,1.63*s,z,1,1.05,1);
  ball(parent,.51*s,'#83c5a0',x-.35*s,1.86*s,z+.12*s);
}
function island(parent:MeshParent,z:number,i:number){
  const grass=tube(parent,5.7,5.9,.65,'#8abfa7',0,-.45,z,32);
  grass.castShadow=false;
  tube(parent,5.61,5.61,.13,'#c9e9ca',0,-.08,z,32);
  for(let k=0;k<7;k++){
    const a=k*2.399+i*.4;
    ball(parent,.17,k%2?'#f8f4a7':'#fff5e8',Math.cos(a)*4.8,.12,z+Math.sin(a)*4.8,1,.46,1);
  }
  tree(parent,-4.45,z-1.25,.63);tree(parent,4.45,z+1.7,.58);
}
function detailScene(group:THREE.Group,i:number){
  const z=-i*STEP;const right=3;
  const build=new THREE.Group();group.add(build);build.position.set(-2.1,0,z);
  // A purpose-built miniature diorama at each stop. All geometry is real 3D.
  if(i===0){
    box(build,3.4,.19,1.7,'#c59171',0,1.32,-.5);
    for(const x of [-1.3,1.3])box(build,.15,1.2,.15,'#76594b',x,.63,-.5);
    box(build,1.75,1.13,.11,ink,-.2,2,-.95,-.13);
    box(build,1.45,.86,.025,'#a5e0e9',-.2,2,-.882,-.13);
    box(build,1.7,.08,.95,'#324a57',-.22,1.44,-.5);
    ball(build,.28,'#ffcf90',1.07,1.69,-.7);
    textSprite(build,'HELLO WORLD',0,3.55,0,ink,3.4);
  } else if(i===1){
    box(build,3.8,2.05,2.2,'#fae8cc',0,1.14,0);
    box(build,4.3,.23,2.57,'#f1a87f',0,2.3,0);
    for(const x of [-1.35,-.45,.45,1.35]){
      box(build,.3,1.45,.25,'#f7cda4',x,1.01,1.21);
      box(build,.16,.8,.08,'#78aab8',x,1.3,1.385);
    }
    box(build,.8,1.2,.15,'#567c91',0,.75,1.34);
    tube(build,0,2.4,1.05,'#b77b67',0,2.92,0,4).rotation.y=Math.PI/4;
    textSprite(build,'EDUCATION',0,4.25,.5);
    for(let n=0;n<3;n++)box(build,.7,.21,.9,palette[n],2.8,.23+n*.23,1);
  } else if(i===2){
    for(let n=0;n<3;n++){
      const x=-1.4+n*1.3;const h=2.1+n*.63;
      box(build,1.05,h,1.25,['#a4c7dd','#f1bda5','#b3dfc7'][n],x,h/2,.2);
      for(let row=0;row<3;row++)box(build,.18,.23,.05,'#f8f6e9',x-.19,.6+row*.52,.86);
    }
    box(build,1.55,.21,2.15,'#506987',.4,.15,1.4);
    ball(build,.33,'#ffe9aa',.4,2.72,1.32);
    textSprite(build,'CAREER',0,4.65,.3);
  } else if(i===3){
    for(let n=0;n<3;n++){
      const x=-1.75+n*1.7;const y=1.4+(n===1?.45:0);
      tube(build,.82,.91,.7,['#ffbdac','#9bd6c5','#a8c7f8'][n],x,.37,.1,8);
      box(build,1.04,.78,.17,'#304867',x,y,0,-.15);
      box(build,.84,.55,.02,['#efb1a7','#e5ca82','#bad8f4'][n],x,y,.099,-.15);
      box(build,1.03,.06,.58,'#e6e1d2',x,y-.43,.33);
    }
    textSprite(build,'PRODUCTS',0,3.45,.3);
  } else if(i===4){
    tube(build,1.58,1.8,.42,'#89b3c8',0,.2,0,12);
    tube(build,.17,.25,2.35,'#4b738c',0,1.53,0);
    ball(build,.73,'#b9def2',0,2.64,0);
    for(let n=0;n<3;n++){
      const a=n*Math.PI*2/3;const x=Math.cos(a)*1.7,zLocal=Math.sin(a)*1.7;
      tube(build,.55,.66,.8,['#eaa7a1','#bca8e4','#e4ca83'][n],x,.43,zLocal,8);
      ball(build,.25,'#ffffff',x,.92,zLocal);
    }
    for(let n=0;n<6;n++){
      const a=n*Math.PI/3;ball(build,.11,'#f7faf6',Math.cos(a)*1.05,2.64+Math.sin(a)*.72,Math.sin(a)*1.05);
    }
    textSprite(build,'RESEARCH',0,4.35,0);
  } else if(i===5){
    box(build,3.8,.3,1.7,'#c4a6cb',0,.35,.2);
    for(let n=0;n<4;n++){
      const x=-1.4+n*.95;
      tube(build,.42,.42,.16,['#91bfe1','#ffbf92','#b8d9a3','#c8b3ea'][n],x,1,.1,12);
      box(build,.14,1.2,.14,'#52637a',x,.96,.1);
      ball(build,.31,['#a4dce5','#f7d59f','#b8e2bc','#dfc9ff'][n],x,1.77,.1);
    }
    textSprite(build,'TOOLKIT',0,3.45,0);
  } else {
    box(build,3.4,2.65,1.85,'#f4d8ca',0,1.37,0);
    box(build,3.7,.32,2.15,'#6f91b1',0,2.83,0);
    box(build,1.3,.97,.1,'#fffcf0',0,1.62,1.01);
    const flap=new THREE.Mesh(new THREE.ConeGeometry(.65,.7,3),new THREE.MeshStandardMaterial({color:'#f2b190'}));
    flap.rotation.z=Math.PI/2;flap.rotation.y=Math.PI/2;flap.position.set(0,1.83,1.13);build.add(flap);
    box(build,1.16,.16,.85,'#7794a8',0,.23,1.35);
    ball(build,.22,'#8bd2ac',.72,1.23,1.1);
    textSprite(build,'SAY HELLO',0,4.0,0);
  }
  // Small signposts orient the walkthrough, even before text panels load.
  tube(group,.07,.09,1.35,'#698995',right,.7,z-1.7);
  box(group,1.45,.57,.12,cream,right,1.5,z-1.7);
  textSprite(group,String(i+1).padStart(2,'0'),right,1.52,z-1.58,ink,1.16);
}

function createCharacter(){
  const avatar=new THREE.Group();
  const body=new THREE.Group();avatar.add(body);
  // Toy-like stylized character, never a photorealistic human.
  tube(body,.62,.72,1.12,'#e89a69',0,1.5,0);
  ball(body,.68,'#ffd4a8',0,2.55,0,1,1.1,.91);
  ball(body,.71,'#263957',0,2.93,-.13,1,.42,.95);
  for(const x of [-.23,.23]){
    ball(body,.065,'#203853',x,2.58,.612);
    box(body,.27,.08,.065,'#263957',x,2.6,.66);
  }
  ball(body,.1,'#ef997c',0,2.31,.66,1,.52,.3);
  const backpack=box(body,.64,.9,.33,'#447d9f',0,1.47,-.63);
  backpack.rotation.x=-.07;
  const arms:THREE.Group[]=[];const legs:THREE.Group[]=[];
  for(const direction of [-1,1]){
    const arm=new THREE.Group();arm.position.set(direction*.67,1.96,0);body.add(arm);
    tube(arm,.17,.2,.82,'#e89a69',direction*.09,-.35,0);
    ball(arm,.19,'#ffd4a8',direction*.08,-.79,.02);arms.push(arm);
    const leg=new THREE.Group();leg.position.set(direction*.32,1.08,0);body.add(leg);
    tube(leg,.22,.19,.83,'#425c85',0,-.39,0);
    box(leg,.45,.22,.67,'#fff3dd',0,-.82,.18);
    legs.push(leg);
  }
  return {avatar,body,arms,legs};
}

export function mountWorld(host:HTMLDivElement,progress:MutableProgress,onFailure:()=>void){
  let renderer:THREE.WebGLRenderer;
  try {
    renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
  } catch {
    onFailure();return ()=>{};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.35;
  renderer.domElement.setAttribute('aria-hidden','true');
  renderer.domElement.className='walk-webgl';
  host.appendChild(renderer.domElement);

  const scene=new THREE.Scene();
  const sky=new THREE.Color('#e7f3f1');scene.background=sky;
  scene.fog=new THREE.Fog(sky,28,75);
  const camera=new THREE.PerspectiveCamera(38,1,.1,160);
  scene.add(new THREE.HemisphereLight('#ffffff','#7c9aa2',2.2));
  const light=new THREE.DirectionalLight('#fff1dd',3.1);light.position.set(-4,16,10);
  light.castShadow=true;light.shadow.mapSize.set(1024,1024);
  light.shadow.camera.left=-16;light.shadow.camera.right=16;
  light.shadow.camera.top=18;light.shadow.camera.bottom=-18;
  light.shadow.camera.near=1;light.shadow.camera.far=60;
  light.shadow.bias=-.0003;scene.add(light);
  const world=new THREE.Group();scene.add(world);

  // Continuous path: the camera and character follow the same world coordinates.
  box(world,2.5,.2,COUNT*STEP+6,'#f4e9d4',.9,-.105,-(COUNT-1)*STEP/2);
  for(let i=0;i<COUNT;i++){
    const z=-i*STEP;
    island(world,z,i);detailScene(world,i);
    for(let j=0;j<7;j++){
      const zz=z+5.5-j*1.7;
      if(zz>3||zz<-(COUNT-1)*STEP-5)continue;
      box(world,.18,.023,.41,'#dfccb3',.9,.015,zz);
    }
  }
  for(let i=0;i<COUNT-1;i++){
    const mid=-(i+.5)*STEP;
    for(const sign of [-1,1]){
      const x=sign*3.7;
      ball(world,.6,'#f5f1c8',x,-.12,mid,1,.4,1.2);
      tree(world,x,mid-1,.67);
    }
  }
  const person=createCharacter();person.avatar.position.set(.9,.1,0);world.add(person.avatar);
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(.62,24),new THREE.MeshBasicMaterial({color:'#234b53',transparent:true,opacity:.2,depthWrite:false}));
  shadow.rotation.x=-Math.PI/2;shadow.position.set(.9,.07,0);world.add(shadow);

  let raf=0,disposed=false,previous=0,actualZ=0,walkCycle=0,pointerX=0;
  const clock=new THREE.Clock();
  const resize=()=>{
    const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);
    renderer.setSize(w,h,false);camera.aspect=w/h;
    camera.fov=w<560?48:w<980?44:38;camera.updateProjectionMatrix();
  };
  const observer=new ResizeObserver(resize);observer.observe(host);resize();
  const onPointer=(event:PointerEvent)=>{pointerX=(event.clientX/window.innerWidth-.5)*2};
  window.addEventListener('pointermove',onPointer,{passive:true});
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate=()=>{
    if(disposed)return;
    raf=requestAnimationFrame(animate);
    const dt=Math.min(.05,clock.getDelta());
    const targetZ=-THREE.MathUtils.clamp(progress.current,0,1)*(COUNT-1)*STEP;
    const speed=1-Math.exp(-dt*(reduced?22:5.3));
    const oldZ=actualZ;actualZ=THREE.MathUtils.lerp(actualZ,targetZ,speed);
    const motion=Math.min(1,Math.abs(actualZ-oldZ)/(dt*4+.0001));
    walkCycle+=dt*6.8*motion;
    person.avatar.position.z=actualZ;shadow.position.z=actualZ;
    person.body.position.y=reduced?0:Math.sin(walkCycle*2)*.06*motion;
    person.legs.forEach((leg,i)=>{leg.rotation.x=Math.sin(walkCycle+i*Math.PI)*.48*motion});
    person.arms.forEach((arm,i)=>{arm.rotation.x=-Math.sin(walkCycle+i*Math.PI)*.36*motion});
    const mobile=host.clientWidth<560;
    const wanted=new THREE.Vector3(mobile?9.7:11.4,mobile?9.8:8.8,actualZ+(mobile?17.2:17));
    const blend=1-Math.exp(-dt*3.7);
    camera.position.lerp(wanted,blend);
    const lookAt=new THREE.Vector3(mobile?-.35:-.45,1.25,actualZ-(mobile?2.8:1.8));
    const direction=lookAt.clone().sub(camera.position).normalize();
    const currentDirection=new THREE.Vector3();camera.getWorldDirection(currentDirection);
    const nextDirection=currentDirection.lerp(direction,blend).normalize();
    camera.lookAt(camera.position.clone().add(nextDirection));
    camera.position.x+=reduced?0:pointerX*.003;
    renderer.render(scene,camera);
    previous=actualZ;
  };
  camera.position.set(11.4,8.8,17);camera.lookAt(0,1.3,-2);animate();
  return ()=>{
    disposed=true;cancelAnimationFrame(raf);observer.disconnect();
    window.removeEventListener('pointermove',onPointer);
    scene.traverse(object=>{
      if(object instanceof THREE.Mesh){
        object.geometry.dispose();
        const materials=Array.isArray(object.material)?object.material:[object.material];
        materials.forEach(material=>material.dispose());
      }
      if(object instanceof THREE.Sprite){
        object.material.map?.dispose();object.material.dispose();
      }
    });
    renderer.dispose();renderer.domElement.remove();
  };
}
