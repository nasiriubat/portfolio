import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
const BASE='http://127.0.0.1:4173/portfolio/';
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'ignore'});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const assert=(condition,message)=>{if(!condition)throw Error(message)};
let browser;
const watchdog=setTimeout(()=>{console.error('Portfolio QA watchdog expired');process.exit(2)},205000);
try{
 let ready=false;for(let i=0;i<110;i++){try{if((await fetch(BASE)).ok){ready=true;break}}catch{}await sleep(250)}
 assert(ready,'Preview server unavailable');await mkdir('preview',{recursive:true});
 browser=await chromium.launch({headless:true});
 for(const [name,width,height] of [['desktop',1440,900],['laptop',1024,768],['mobile',390,844],['small-mobile',320,740]]){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce',deviceScaleFactor:1,permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage();page.setDefaultTimeout(10000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const resp=await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:25000});
  assert(resp?.ok(),name+' Story response invalid');
  await page.locator('.j-shell').waitFor({state:'visible'});
  await page.locator('#home h1').waitFor({state:'visible'});
  assert(await page.locator('.j-section').count()===8,name+' should have eight journey chapters');
  assert(await page.locator('.j-route-nav button').count()===8,name+' should have eight route stops');
  assert((await page.locator('.j-three canvas').count())===1||(await page.locator('.j-webgl-fallback').count())===1,name+' 3D scene or fallback missing');
  assert((await page.locator('#experience .j-job').count())===4,name+' all work entries not visible');
  assert((await page.locator('#education .j-degree').count())===2,name+' degrees missing');
  assert((await page.locator('#projects .j-project').count())===4,name+' featured products missing');
  assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=2,name+' document horizontal overflow');
  const dimensions=await page.evaluate(()=>{
   const panel=document.querySelector('.j-panel').getBoundingClientRect();
   const visual=document.querySelector('.j-world').getBoundingClientRect();
   return {panel:{x:panel.x,y:panel.y,right:panel.right,bottom:panel.bottom,width:panel.width,height:panel.height},
    visual:{x:visual.x,y:visual.y,right:visual.right,bottom:visual.bottom},scrolling:document.querySelector('.j-panel').scrollHeight>document.querySelector('.j-panel').clientHeight};
  });
  assert(dimensions.scrolling,name+' content viewport not scrollable');
  if(width>760)assert(dimensions.panel.right<=dimensions.visual.x+2,name+' world hides desktop reading panel');
  else assert(dimensions.visual.bottom<=dimensions.panel.y+2,name+' world hides mobile reading panel');
  await page.screenshot({path:'preview/loop-'+name+'-welcome.png'});
  await page.getByRole('button',{name:'Go to Projects'}).click();
  await page.waitForFunction(()=>Math.abs(document.querySelector('.j-panel').scrollTop-document.querySelector('#projects').offsetTop)<10);
  await page.locator('#projects h2').scrollIntoViewIfNeeded();
  const heading=await page.locator('#projects h2').boundingBox();
  assert(heading && heading.y >=dimensions.panel.y-2 && heading.y+heading.height<=dimensions.panel.bottom+2,name+' project heading clipped');
  await page.screenshot({path:'preview/loop-'+name+'-projects.png'});
  await page.locator('#projects .j-project').nth(1).locator('summary').click();
  assert(await page.locator('#projects .j-project').nth(1).locator('details').evaluate(d=>d.open),name+' expandable workflow not working');
  const projectBody=await page.locator('#projects .j-project').nth(1).locator('li').last();
  await projectBody.scrollIntoViewIfNeeded();
  const bodyBox=await projectBody.boundingBox();
  assert(bodyBox && bodyBox.y>=dimensions.panel.y-2 && bodyBox.y+bodyBox.height<=dimensions.panel.bottom+2,name+' project workflow hidden beneath another surface');
  await page.getByRole('button',{name:'Go to Research'}).click();
  await page.waitForFunction(()=>Math.abs(document.querySelector('.j-panel').scrollTop-document.querySelector('#research').offsetTop)<10);
  assert(await page.locator('#research .j-research-themes article').count()===3,name+' research themes missing');
  await page.getByRole('button',{name:'Go to Contact'}).click();
  await page.waitForFunction(()=>Math.abs(document.querySelector('.j-panel').scrollTop-document.querySelector('#contact').offsetTop)<10);
  assert(await page.getByRole('link',{name:/dev.nasirshuvo@gmail.com/}).count()>=1,name+' contact email missing');
  await page.getByRole('button',{name:'Go to Full circle'}).click();
  await page.waitForFunction(()=>Math.abs(document.querySelector('.j-panel').scrollTop-document.querySelector('#finish').offsetTop)<10);
  assert(await page.locator('#finish h2').isVisible(),name+' finish scene missing');
  await page.getByRole('button',{name:/Walk it again/}).click();
  await page.waitForFunction(()=>document.querySelector('.j-panel').scrollTop<5);
  assert(await page.locator('#home h1').isVisible(),name+' round trip did not return to the beginning');
  await page.getByRole('button',{name:/View entire loop/}).click();
  assert(await page.getByRole('button',{name:/Follow character/}).getAttribute('aria-pressed')==='true',name+' overview toggle failed');
  assert(errors.length===0,name+' browser errors: '+errors.join(';'));
  console.log('PASS LOOP',name,'chapter coverage, no scene/content overlap, projects, research, contact, return');
  await context.close();
 }
 for(const [name,width,height] of [['plain-desktop',1440,900],['plain-mobile',390,844],['plain-small',320,740]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  const response=await page.goto(BASE+'?view=plain',{waitUntil:'domcontentloaded',timeout:20000});
  assert(response?.ok(),name+' Plain response invalid');
  await page.locator('.plain-project').first().waitFor({state:'visible'});
  assert((await page.locator('.plain-project').count())>=8,name+' plain projects missing');
  assert(await page.locator('.plain-job').count()===4,name+' plain experience missing');
  assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=2,name+' Plain overflow');
  await page.screenshot({path:'preview/'+name+'-home.png'});
  if(width<=390){await page.getByRole('button',{name:'Open navigation'}).click();assert(await page.getByRole('navigation',{name:'Mobile sections'}).isVisible(),name+' mobile menu failed')}
  console.log('PASS',name);await page.close();
 }
 const direct=await browser.newPage();
 await direct.goto(BASE+'?view=story#research',{waitUntil:'domcontentloaded'});
 await direct.waitForFunction(()=>Math.abs(document.querySelector('.j-panel')?.scrollTop-document.querySelector('#research')?.offsetTop)<12);
 console.log('PASS direct Story hash and route');
 await direct.close();
 for(const slug of ['scholarbro','trip-planner','wcag-checker','group-chat-assistant']){
  const page=await browser.newPage();
  const response=await page.goto(BASE+'projects/'+slug+'/',{waitUntil:'domcontentloaded',timeout:20000});
  assert(response?.ok(),'Case study page missing '+slug);
  assert((await page.locator('a[href*="github.com/nasiriubat/"]').count())===0,'Private repository exposed '+slug);
  await page.close();
 }
 console.log('PASS case study routes and private-link protection');
}finally{clearTimeout(watchdog);await browser?.close();server.kill()}
