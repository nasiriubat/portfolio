import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';

const BASE='http://127.0.0.1:4173/portfolio/';
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const assert=(v,message)=>{if(!v)throw Error(message)};
const watchdog=setTimeout(()=>{console.error('Portfolio browser QA timed out');process.exit(3)},210000);
let browser;
async function place(page,selector,fraction=.5){
 await page.locator(selector).evaluate((el,f)=>{
   const top=scrollY+el.getBoundingClientRect().top;
   const distance=Math.max(0,el.getBoundingClientRect().height-innerHeight);
   scrollTo({top:top+distance*f,behavior:'instant'});
 },fraction);
 await page.waitForTimeout(350);
}
async function overflow(page,label){
 const dim=await page.evaluate(()=>({client:innerWidth,scroll:document.documentElement.scrollWidth,
   body:document.body.scrollWidth}));
 assert(dim.scroll<=dim.client+2&&dim.body<=dim.client+2,label+' horizontal overflow: '+JSON.stringify(dim));
}
async function screenshot(page,name){
 await page.screenshot({path:'preview/'+name+'.png',timeout:15000});
 console.log('Captured '+name);
}
try{
 let ready=false;
 for(let i=0;i<100;i++){try{const r=await fetch(BASE);if(r.ok){ready=true;break}}catch{}await sleep(300)}
 assert(ready,'Preview unavailable');
 await mkdir('preview',{recursive:true});
 browser=await chromium.launch({headless:true});
 for(const [label,width,height,reduced] of [
  ['desktop',1440,900,false],['laptop',1024,768,false],['mobile',390,844,false],['small-mobile',320,740,true]
 ]){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,
   reducedMotion:reduced?'reduce':'no-preference',permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage();page.setDefaultTimeout(11000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:25000});
  assert(response?.ok(),label+' HTTP response');
  await page.locator('.s-hero h1').waitFor({state:'visible',timeout:16000});
  const site=JSON.parse(await (await import('node:fs/promises')).readFile('content/site.json','utf8'));
  assert((await page.locator('.s-logo').innerText()).includes(site.name),label+' name missing from header');
  assert((await page.locator('.s-hero-vis img').count())===1,label+' hero portrait missing');
  assert((await page.locator('#work .frow').count())>=1,label+' spotlight projects missing');
  assert((await page.locator('.tl li').count())===site.experience.length,label+' career entries missing');
  assert((await page.locator('.s-edu article').count())===site.education.length,label+' education missing');
  assert((await page.locator('.s-certs article').count())===site.certifications.length,label+' certifications missing');
  assert((await page.locator('#research .pub').count())>=1,label+' publications missing');
  assert((await page.locator('a[href*="github.com/nasiriubat/"]').count())===0,label+' private source repo linked');
  await overflow(page,label+' initial');
  await screenshot(page,'story-'+label+'-hero');
  for(const id of ['work','experience','research','stack','contact']){
   await place(page,'#'+id,.15);await screenshot(page,'story-'+label+'-'+id);
  }
  // tools rows must be scrollable by the visitor
  const row=page.locator('.mrow-a');
  const before=await row.evaluate(el=>el.scrollLeft);
  await page.getByRole('button',{name:'Scroll tools right'}).click();
  await page.waitForTimeout(700);
  assert((await row.evaluate(el=>el.scrollLeft))>before,label+' tools arrows do not scroll');
  if(width<=860){
   const nav=page.getByRole('navigation',{name:'Section navigation'});
   assert(await nav.isVisible(),label+' bottom navigation hidden on phone');
   await nav.getByRole('link',{name:'Research'}).click();
   await page.waitForTimeout(900);
   assert((await nav.locator('a.on').innerText()).includes('Research'),label+' bottom navigation does not follow the section');
  }
  await overflow(page,label+' after sections');
  assert(errors.length===0,label+' JS errors: '+errors.join('; '));
  console.log('PASS ASSEMBLY',label);
  await context.close();
 }
 for(const [label,width,height] of [
  ['plain-desktop',1440,900],['plain-mobile',390,844],['plain-small-mobile',320,740]
 ]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const r=await page.goto(BASE+'?view=plain',{waitUntil:'domcontentloaded',timeout:22000});
  assert(r?.ok(),'Plain URL failed');
  await page.locator('.plain-project').first().waitFor({state:'visible'});
  const uncoveredHeader=await page.locator('.global-header').evaluate(el=>{
   const r=el.getBoundingClientRect();const x=r.left+r.width*.5,y=r.top+r.height*.5;
   const top=document.elementFromPoint(x,y);return top===el||Boolean(top&&el.contains(top));
  });
  assert(uncoveredHeader,label+' Plain navigation is covered by page content');
  assert((await page.locator('.plain-project').count())>=8,label+' missing Plain projects');
  assert((await page.locator('.plain-job').count())===4,label+' missing Plain career');
  assert((await page.locator('.plain-degree-grid article').count())===2,label+' missing Plain education');
  assert((await page.locator('.plain-cert-grid>a').count())>=5,label+' missing Plain certifications');
  assert((await page.getByRole('link',{name:'GitHub profile'}).count())===1,label+' Plain social links lost');
  const theme=await page.locator('.plain-portfolio').evaluate(el=>getComputedStyle(el).backgroundColor);
  assert(theme==='rgb(255, 255, 255)',label+' Plain remains beige: '+theme);
  await screenshot(page,'assembly-'+label+'-hero');
  await place(page,'#projects');await screenshot(page,'assembly-'+label+'-projects');
  if(label==='plain-desktop'){
   await page.getByRole('button',{name:'AI & research'}).click();
   assert((await page.locator('.plain-project').count())>=1,'Plain filter broken');
  }
  await overflow(page,label);
  assert(errors.length===0,label+' JS errors: '+errors.join('; '));
  await page.close();console.log('PASS',label);
 }
 for(const slug of ['scholarbro','trip-planner','wcag-checker','group-chat-assistant']){
  const page=await browser.newPage();
  const r=await page.goto(BASE+'projects/'+slug+'/',{waitUntil:'domcontentloaded',timeout:22000});
  assert(r?.ok(),'Case study route missing '+slug);
  assert(await page.locator('h1').count()>0,'Case study missing heading '+slug);
  assert((await page.locator('a[href*="github.com/nasiriubat/"]').count())===0,'Private source disclosed in '+slug);
  await page.close();
 }
 console.log('PASS links, content, scroll sequences, Plain and all case studies');
}finally{clearTimeout(watchdog);await browser?.close();server.kill()}
