import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
const base='http://127.0.0.1:4174/portfolio/',site=base+'world-builder/';
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port','4174','--strictPort'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const assert=(v,m)=>{if(!v)throw Error(m)};
const watchdog=setTimeout(()=>{console.error('World Builder QA timed out');process.exit(2)},195000);
let browser;
try{
 let ready=false;for(let i=0;i<100;i++){try{if((await fetch(site)).ok){ready=true;break}}catch{}await sleep(300)}
 assert(ready,'Preview server unavailable');
 browser=await chromium.launch({headless:true});await mkdir('preview/world-builder',{recursive:true});
 for(const [name,width,height,reduced] of [['desktop',1440,900,false],['laptop',1024,768,false],['mobile',390,844,false],['small-mobile',320,740,true]]){
  const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,reducedMotion:reduced?'reduce':'no-preference',permissions:['clipboard-read','clipboard-write']});
  const page=await ctx.newPage();page.setDefaultTimeout(10000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(site,{waitUntil:'domcontentloaded',timeout:20000});
  assert(response?.ok(),name+' HTTP '+response?.status());
  await page.locator('#project-grid .project-item').first().waitFor({state:'attached'});
  await page.locator('.hero-avatar').waitFor();await page.waitForTimeout(350);
  assert(await page.locator('#story-portfolio .chapter').count()===7,name+' should have seven chapters');
  assert(await page.locator('.hero-avatar').evaluate(i=>i.complete&&i.naturalWidth>50),name+' character image missing');
  assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=2,name+' horizontal overflow');
  await page.screenshot({path:'preview/world-builder/'+name+'-intro.png',timeout:15000});
  if(name==='desktop'||name==='mobile'){
   for(const id of ['education','experience','projects','research','services','contact']){
    await page.locator('section#'+id).evaluate(el=>scrollTo({top:scrollY+el.getBoundingClientRect().top-104,behavior:'instant'}));
    await page.waitForTimeout(390);
    await page.screenshot({path:'preview/world-builder/'+name+'-'+id+'.png',timeout:15000});
    assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=2,name+' '+id+' overflow');
   }
  }
  if(name==='desktop'){
   const before=await page.locator('#project-showcase h3').innerText();
   await page.locator('#next-project').click();
   assert((await page.locator('#project-showcase h3').innerText())!==before,'Next project failed');
   await page.locator('#prev-project').click();
   assert((await page.locator('#project-showcase h3').innerText())===before,'Previous project failed');
   await page.locator('#project-showcase [data-open-project]').click();
   assert(await page.locator('#project-dialog').evaluate(el=>el.open),'Case-study dialog failed');
   await page.locator('#dialog-close').click();
   assert(!await page.locator('#project-dialog').evaluate(el=>el.open),'Case-study dialog did not close');
   await page.locator('[data-research="memory"]').click();
   assert((await page.locator('#research-description').innerText()).includes('remember'),'Research tab failed');
   await page.locator('[data-filter="ai"]').click();
   assert((await page.locator('#project-grid .project-item').count())>0,'Project filter failed');
   await page.locator('#copy-email').click();
   assert((await page.locator('#toast').innerText()).length>2,'Copy email control failed');
  }
  if(width<=390){
   await page.locator('#menu-toggle').click();
   assert(await page.locator('#mobile-menu').isVisible(),'Mobile menu failed');
   await page.locator('#mobile-menu a[href="#research"]').click();
   assert(!await page.locator('#mobile-menu').isVisible(),'Mobile menu failed to close');
  }
  assert(errors.length===0,name+' page errors '+errors.join(';'));
  await ctx.close();console.log('PASS World Builder',name);
 }
 const p=await browser.newPage();const response=await p.goto(site+'assets/content-data.json');
 assert(response?.ok(),'CMS data unavailable');const cms=JSON.parse(await p.locator('body').innerText());
 assert(cms.projects.length>=8,'CMS projects missing');assert(cms.publications.length>=1,'CMS publications missing');
 await p.goto(base+'?view=plain',{waitUntil:'domcontentloaded'});
 await p.locator('.plain-portfolio').first().waitFor({state:'visible',timeout:15000});
 assert(await p.getByRole('link',{name:'GitHub profile'}).count()===1,'Original Plain lost social hero');
 console.log('PASS: CMS bridge and existing Plain portfolio',cms.projects.length,cms.publications.length);
 await p.close();
}finally{clearTimeout(watchdog);await browser?.close();server.kill()}
