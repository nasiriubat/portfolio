import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
const base='http://127.0.0.1:4173/portfolio/';
const watchdog=setTimeout(()=>{console.error('QA exceeded 160s');process.exit(2)},160000);
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'ignore'});
let browser;
const title=(mode)=>mode==='plain'?'Plain portfolio':'Interactive story';
async function open(mode,width,height,reduced=true){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:reduced?'reduce':'no-preference'});
 page.setDefaultTimeout(9000);
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(base+'?view='+mode,{waitUntil:'domcontentloaded',timeout:25000});
 if(!response?.ok())throw Error(mode+' HTTP '+response?.status());
 await page.locator('h1').first().waitFor({state:'visible',timeout:20000});
 await page.locator(mode==='plain'?'.plain-project':'.story-feature').first().waitFor({state:'attached',timeout:15000});
 await page.waitForTimeout(330);
 const overflow=await page.evaluate(()=>({width:innerWidth,actual:document.documentElement.scrollWidth}));
 if(overflow.actual>overflow.width+2)throw Error(mode+' '+width+' horizontal overflow: '+JSON.stringify(overflow));
 if(errors.length)throw Error(mode+' '+width+' JS errors: '+errors.join('; '));
 const selected=await page.locator('.experience-switch a.selected').innerText();
 if(selected.toLowerCase()!==mode)throw Error('Mode switch mislabeled: '+selected);
 return{page,errors};
}
async function jump(page,id){
 await page.locator(id).evaluate(el=>scrollTo({top:scrollY+el.getBoundingClientRect().top-110,behavior:'instant'}));
 await page.waitForTimeout(200);
}
async function screenshot(page,name){
 await page.screenshot({path:'preview/'+name+'.png',timeout:18000});
 console.log('Captured '+name);
}
try{
 let ready=false;
 for(let i=0;i<85;i++){try{const r=await fetch(base);if(r.ok){ready=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,350));}
 if(!ready)throw Error('Preview server unavailable');
 browser=await chromium.launch({headless:true});
 await mkdir('preview',{recursive:true});
 for(const [mode,width,height,label] of [
  ['story',1440,900,'story-desktop'],['story',390,844,'story-mobile'],
  ['story',320,740,'story-small-mobile'],['plain',1440,900,'plain-desktop'],
  ['plain',390,844,'plain-mobile'],['plain',320,740,'plain-small-mobile']]){
  console.log('Testing '+title(mode)+' at '+width+'px');
  const{page,errors}=await open(mode,width,height);
  if(label==='story-desktop'||label==='story-mobile'||label==='plain-desktop'||label==='plain-mobile')
   await screenshot(page,label+'-hero');
  if(mode==='story'){
   for(const selector of ['#approach','#work','#projects','#research','#about','#contact']){
     if(await page.locator(selector).count()!==1)throw Error('Story chapter missing '+selector);
   }
   if(label==='story-desktop'){
    await jump(page,'#work');await screenshot(page,'story-featured-work');
    await jump(page,'#research');await screenshot(page,'story-research');
    await jump(page,'#about');await screenshot(page,'story-career');
    await page.getByRole('button',{name:/Show all .* projects/}).evaluate(el=>el.click());
    const count=await page.locator('.additional-project-link').count();
    if(count<7)throw Error('Show all projects failed: '+count);
    const plain=page.locator('.experience-switch a').filter({hasText:'Plain'});
    if(!((await plain.getAttribute('href'))||'').includes('view=plain'))throw Error('Plain mode switch has no URL');
   }
  }else{
   if(await page.locator('.plain-project').count()<8)throw Error('Plain mode lost projects');
   if(await page.locator('.plain-job').count()!==4)throw Error('Plain mode missing career entries');
   if(await page.locator('.plain-degree-grid article').count()!==2)throw Error('Plain mode missing education');
   if(await page.locator('.plain-cert-grid>div').count()<6)throw Error('Plain mode missing certifications');
   if(label==='plain-desktop'){
    await jump(page,'#projects');await screenshot(page,'plain-projects');
    await page.getByRole('button',{name:'AI & research'}).click();
    if(!await page.locator('.plain-project').count())throw Error('Plain mode filter failed');
   }
  }
  if(width<=390){
   await page.getByRole('button',{name:'Open navigation'}).click();
   await page.getByRole('navigation',{name:'Mobile sections'}).waitFor({state:'visible'});
   const nav=page.getByRole('navigation',{name:'Mobile sections'});
   await nav.getByRole('link',{name:mode==='plain'?'Research':'Research'}).click();
   await nav.waitFor({state:'hidden',timeout:6000});
   const o=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   if(o>2)throw Error(label+' overflow after nav');
  }
  if(errors.length)throw Error(label+' runtime error: '+errors.join('; '));
  console.log('PASS '+label);
  await page.close();
 }
 // Confirm the real animated scene responds to scrolling.
 {
  const{page,errors}=await open('story',1440,900,false);
  const items=await page.locator('.studio-floating').count();
  if(items!==3)throw Error('Story studio has missing project artefacts');
  const process=page.locator('#approach');
  const b=await process.evaluate(el=>({top:scrollY+el.getBoundingClientRect().top,height:el.offsetHeight}));
  await page.evaluate(y=>scrollTo({top:y+20,behavior:'instant'}),b.top);
  await page.waitForTimeout(220);
  const s1=await page.locator('.process-story h3').textContent();
  await page.evaluate(({top,height})=>scrollTo({top:top+height*.78,behavior:'instant'}),b);
  await page.waitForTimeout(550);
  const s2=await page.locator('.process-story h3').textContent();
  if(s1===s2)throw Error('Story process does not respond to scroll');
  await screenshot(page,'story-mid-chapter');
  if(errors.length)throw Error('Story animated runtime errors: '+errors.join('; '));
  await page.close();
 }
 // Verify live generated case studies and source link privacy.
 for(const slug of ['scholarbro','trip-planner','wcag-checker','group-chat-assistant']){
  const page=await browser.newPage({viewport:{width:1100,height:760}});
  const r=await page.goto(base+'projects/'+slug+'/',{waitUntil:'domcontentloaded',timeout:18000});
  if(!r?.ok())throw Error('Missing project case study '+slug);
  await page.locator('h1').waitFor();
  if(await page.locator('a[href*="github.com/nasiriubat/"]').count())throw Error('Private GitHub link disclosed: '+slug);
  await page.close();
 }
 console.log('PASS: both routes, responsive mode switch, full CV, CMS data, scroll story, mobile navigation and private links.');
}finally{
 clearTimeout(watchdog);
 await browser?.close();
 server.kill();
}
