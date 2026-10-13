import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
const base='http://127.0.0.1:4173/portfolio/';
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'ignore'});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const assert=(ok,why)=>{if(!ok)throw Error(why)};
let browser;
const watchdog=setTimeout(()=>{console.error('Root routing QA timed out');process.exit(2)},125000);
try{
 let ready=false;for(let i=0;i<90;i++){try{if((await fetch(base)).ok){ready=true;break}}catch{}await sleep(250)}
 assert(ready,'Vite preview unavailable');await mkdir('preview',{recursive:true});
 browser=await chromium.launch({headless:true});
 for(const [width,height,label] of [[1440,900,'desktop'],[390,844,'mobile'],[320,740,'small-mobile']]){
   const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto(base+'?view=plain',{waitUntil:'domcontentloaded',timeout:19000});
   assert(response?.ok(),'Plain HTTP failure');
   await page.locator('.plain-project').first().waitFor({state:'visible',timeout:18000});
   assert((await page.locator('.plain-project').count())>=8,'Plain CMS project list incomplete');
   assert((await page.locator('.plain-job').count())>=3,'Plain work experience missing');
   assert((await page.locator('.plain-degree-grid article').count())===2,'Plain education missing');
   for(const name of ['GitHub profile','LinkedIn profile','Send email','ScholarBro research platform']){
    assert(await page.getByRole('link',{name}).count()===1,'Plain hero link missing: '+name);
   }
   assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=2,'Plain overflow '+width);
   await page.screenshot({path:'preview/plain-'+label+'-hero.png'});
   if(label==='desktop'){
    await page.getByRole('button',{name:'AI & research'}).click();
    assert((await page.locator('.plain-project').count())>0,'Plain filter broken');
    await page.locator('#projects').evaluate(el=>scrollTo({top:scrollY+el.getBoundingClientRect().top-90,behavior:'instant'}));
    await page.screenshot({path:'preview/plain-'+label+'-projects.png'});
   }
   if(width<=390){
    await page.getByRole('button',{name:'Open navigation'}).click();
    assert(await page.getByRole('navigation',{name:'Mobile sections'}).isVisible(),'Plain mobile navigation missing');
    await page.getByRole('navigation',{name:'Mobile sections'}).getByRole('link',{name:'Research'}).click();
    assert(!await page.getByRole('navigation',{name:'Mobile sections'}).isVisible(),'Plain nav did not close');
   }
   assert(errors.length===0,'Plain JavaScript error '+errors.join(';'));console.log('PASS Plain '+label);await page.close();
 }
 for(const suffix of ['','?view=story']){
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+suffix,{waitUntil:'domcontentloaded',timeout:25000});
  await page.locator('.walk-card h1').waitFor({state:'visible',timeout:18000});
  assert(await page.locator('.walk-rail button').count()===7,'Seven journey stops missing');
  assert(await page.locator('.walk-canvas canvas').count()===1||await page.locator('.walk-fallback').count()===1,'Missing walkthrough scene or fallback');
  await page.screenshot({path:'preview/walkthrough-'+(suffix?'story':'homepage')+'.png'});
  await page.getByRole('button',{name:'Next chapter'}).click();
  await page.waitForTimeout(700);
  assert((await page.locator('.walk-card h1').innerText()).includes('Where it began'),'Next chapter did not navigate');
  assert(errors.length===0,'3D scene JavaScript errors: '+errors.join(';'));
  console.log('PASS 3D Story',suffix);await page.close();
 }
 for(const [label,width,height] of [['tablet',1024,768],['mobile',390,844],['small-mobile',320,740]]){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'domcontentloaded',timeout:25000});
  await page.locator('.walk-card h1').waitFor({state:'visible'});
  assert(await page.locator('.walk-rail button').count()===7,label+' story chapter navigation missing');
  assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=2,label+' 3D hero horizontal overflow');
  await page.screenshot({path:'preview/walkthrough-'+label+'-hero.png'});
  await page.locator('.walk-rail button').nth(3).click();
  await page.waitForTimeout(450);
  assert((await page.locator('.walk-card h1').innerText()).includes('Things I have built'),label+' projects chapter failed');
  await page.screenshot({path:'preview/walkthrough-'+label+'-projects.png'});
  const item=page.locator('.walk-projects button').first();
  await item.click();
  assert(await page.getByRole('dialog').isVisible(),label+' project detail failed');
  await page.getByRole('button',{name:'Close project'}).click();
  assert(!await page.getByRole('dialog').isVisible(),label+' project dialog failed to close');
  assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=2,label+' projects horizontal overflow');
  await page.getByRole('link',{name:/Plain view/}).click();
  await page.locator('.plain-portfolio').waitFor({state:'visible',timeout:19000});
  assert(errors.length===0,label+' JavaScript errors '+errors.join(';'));
  console.log('PASS responsive 3D walkthrough '+label);await page.close();
 }
 const page=await browser.newPage({viewport:{width:1200,height:800}});
 await page.goto(base+'?view=plain',{waitUntil:'domcontentloaded'});
 await page.locator('.plain-portfolio').waitFor({state:'visible'});
 await page.locator('.experience-switch a').filter({hasText:'Story'}).click();
 await page.locator('.walk-card h1').waitFor({state:'visible',timeout:19000});
 console.log('PASS Plain -> Story switch');await page.close();
 for(const slug of ['scholarbro','trip-planner','wcag-checker','group-chat-assistant']){
  const p=await browser.newPage();const response=await p.goto(base+'projects/'+slug+'/',{waitUntil:'domcontentloaded',timeout:19000});
  assert(response?.ok(),'Case study missing '+slug);
  await p.locator('h1').waitFor();
  assert((await p.locator('a[href*="github.com/nasiriubat/"]').count())===0,'Private code disclosed '+slug);
  await p.close();
 }
 console.log('PASS homepage routing, existing Plain, CMS, project pages and privacy');
}finally{clearTimeout(watchdog);await browser?.close();server.kill()}
