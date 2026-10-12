import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir,rename,stat } from 'node:fs/promises';

const base='http://127.0.0.1:4173/portfolio/';
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'ignore'});
let browser;
let context;
const timeout=setTimeout(()=>{console.error('Story recording timed out');process.exit(2)},120000);

try{
 let ready=false;
 for(let i=0;i<100;i++){try{const r=await fetch(base);if(r.ok){ready=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,350));}
 if(!ready)throw Error('Preview server unavailable');
 await mkdir('preview',{recursive:true});
 browser=await chromium.launch({headless:true});
 context=await browser.newContext({
  viewport:{width:1280,height:800},
  deviceScaleFactor:1,
  reducedMotion:'no-preference',
  recordVideo:{dir:'preview',size:{width:1280,height:800}}
 });
 const page=await context.newPage();
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto(base+'?view=story',{waitUntil:'domcontentloaded',timeout:30000});
 await page.locator('.systems-webgl.webgl-ready canvas').waitFor({timeout:15000});
 // Each recorded frame is an actual browser render of scroll-linked Three.js.
 const distance=await page.locator('#approach').evaluate(el=>Math.max(0,el.offsetHeight-innerHeight));
 await page.waitForTimeout(550);
 // Five editorial beats have deliberately held reading intervals.
 const track=[
  [0,.07,1200],[.07,.36,2700],[.36,.50,2200],
  [.50,.67,2600],[.67,.89,2800],[.89,1,1400]
 ];
 for(const [from,to,duration] of track){
  const frames=Math.ceil(duration/50);
  for(let frame=0;frame<=frames;frame++){
   const linear=frame/frames;
   const smooth=linear*linear*(3-2*linear);
   const p=from+(to-from)*smooth;
   await page.evaluate(({distance,p})=>scrollTo({top:distance*p,behavior:'instant'}),{distance,p});
   await page.waitForTimeout(50);
  }
  await page.waitForTimeout(230);
 }
 if(errors.length)throw Error('Story JavaScript error: '+errors.join('; '));
 const source=await page.video()?.path();
 if(!source)throw Error('No video recorded');
 await context.close();context=undefined;
 await rename(source,'preview/cinematic-scroll-film.webm');
 const size=(await stat('preview/cinematic-scroll-film.webm')).size;
 if(size<20000)throw Error('Recorded video too small: '+size);
 console.log('Recorded live cinematic scroll film ('+size+' bytes).');
}finally{
 clearTimeout(timeout);
 await context?.close();
 await browser?.close();
 server.kill();
}
