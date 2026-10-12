import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';

const base = 'http://127.0.0.1:4173/portfolio/';
const server = spawn('npm', ['run','preview','--','--host','127.0.0.1','--port','4173','--strictPort'], {stdio:['ignore','pipe','pipe']});
let serverLog='';
server.stdout.on('data',chunk=>{serverLog+=chunk.toString()});
server.stderr.on('data',chunk=>{serverLog+=chunk.toString()});
let browser;

async function open(page){
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(base,{waitUntil:'networkidle',timeout:40000});
  if(!response?.ok())throw Error('Homepage returned HTTP '+response?.status());
  await page.locator('h1').waitFor({timeout:15000});
  await page.locator('.system-card').first().waitFor({timeout:15000});
  const overflow=await page.evaluate(()=>({
    scroll:document.documentElement.scrollWidth,
    viewport:window.innerWidth,
    body:document.body.scrollWidth
  }));
  if(overflow.scroll>overflow.viewport+2)
    throw Error('Horizontal overflow: '+JSON.stringify(overflow));
  if(errors.length)throw Error('Page errors: '+errors.join('; '));
  const forbidden=await page.getByText(/SCROLL TO ASSEMBLE|ENGINEERED IN 3D|CASE STUDY COMING SOON/i).count();
  if(forbidden)throw Error('Placeholder or gimmick copy visible');
  if(await page.locator('#work').count()!==1||
     await page.locator('#research').count()!==1||
     await page.locator('#experience').count()!==1||
     await page.locator('#education').count()!==1)
    throw Error('Required portfolio chapters are missing');
  return errors;
}

async function scrollTo(page,selector,offset=0){
  await page.locator(selector).evaluate((el,amount)=>{
    window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top+amount,behavior:'instant'});
  },offset);
  await page.waitForTimeout(520);
}

try{
  let ready=false;
  for(let i=0;i<100;i++){
    try{const r=await fetch(base);if(r.ok){ready=true;break;}}catch{}
    await new Promise(resolve=>setTimeout(resolve,400));
  }
  if(!ready)throw Error('Preview server failed to start: '+serverLog.slice(-800));
  browser=await chromium.launch({headless:true});
  await mkdir('preview',{recursive:true});

  // Fidelity, responsive layout, and production runtime.
  for(const [name,width,height] of [
    ['desktop',1440,900],['laptop',1100,760],['tablet',768,1024],
    ['mobile',390,844],['small-mobile',320,740]
  ]){
    const page=await browser.newPage({
      viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'
    });
    const errors=await open(page);
    await page.screenshot({path:'preview/'+name+'-hero.png',animations:'disabled'});
    await scrollTo(page,'.index-section');
    await page.screenshot({path:'preview/'+name+'-projects.png',animations:'disabled'});
    if(name==='desktop'){
      await scrollTo(page,'.research-studio');
      await page.screenshot({path:'preview/desktop-research.png',animations:'disabled'});
      await scrollTo(page,'.career-story');
      await page.screenshot({path:'preview/desktop-experience.png',animations:'disabled'});
      await scrollTo(page,'.contact-stage');
      await page.screenshot({path:'preview/desktop-contact.png',animations:'disabled'});
      // Filter, shared-element project details, keyboard escape.
      await scrollTo(page,'.index-section');
      await page.getByRole('button',{name:'AI & research'}).click();
      const filtered=await page.locator('.system-card-hit').count();
      if(!filtered)throw Error('Project filter removed every item');
      await page.locator('.system-card-hit').first().click();
      await page.getByRole('dialog',{name:/./}).waitFor();
      if(await page.locator('.detail-panel').count()!==1)throw Error('Project detail failed to open');
      if(await page.locator('.detail-panel a[href*="github.com/nasiriubat/"]').count())
        throw Error('Private source link exposed in project detail');
      await page.keyboard.press('Escape');
      if(await page.locator('.detail-panel').count()!==0)throw Error('Escape did not dismiss the project detail');
      await page.getByRole('button',{name:'Open quick search'}).click();
      await page.getByRole('textbox',{name:'Search portfolio'}).fill('ScholarBro');
      if(await page.locator('.search-results a').count()===0)throw Error('Command search returned nothing');
      await page.keyboard.press('Escape');
    }
    if(name==='mobile'||name==='small-mobile'){
      await page.getByRole('button',{name:'Open menu'}).click();
      await page.getByRole('navigation',{name:'Mobile navigation'}).waitFor();
      await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:/Research/}).click();
      if(await page.getByRole('navigation',{name:'Mobile navigation'}).count())throw Error('Mobile navigation did not close');
      const layout=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
      if(layout>2)throw Error('Mobile width overflow after navigation: '+layout);
    }
    if(errors.length)throw Error(name+' runtime errors: '+errors.join('; '));
    await page.close();
  }

  // Verify scroll LINKED motion with real animations, not only static reduced-motion screenshots.
  {
    const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
    const errors=await open(page);
    await scrollTo(page,'.approach-section',200);
    await page.screenshot({path:'preview/motion-approach.png',animations:'disabled'});
    const geometry=await page.locator('.showcase-scroller').evaluate(el=>{
      const top=el.getBoundingClientRect().top+window.scrollY;
      return {top,height:el.offsetHeight};
    });
    await page.evaluate(top=>window.scrollTo({top,behavior:'instant'}),geometry.top);
    await page.waitForTimeout(500);
    const start=await page.locator('.showcase-track').evaluate(el=>getComputedStyle(el).transform);
    await page.evaluate(({top,height})=>window.scrollTo({top:top+(height-innerHeight)*.53,behavior:'instant'}),geometry);
    await page.waitForTimeout(750);
    const halfway=await page.locator('.showcase-track').evaluate(el=>getComputedStyle(el).transform);
    if(start===halfway)throw Error('Featured gallery is not responding to scroll');
    await page.screenshot({path:'preview/motion-work-gallery.png',animations:'disabled'});
    await scrollTo(page,'.research-studio',440);
    await page.screenshot({path:'preview/motion-research.png',animations:'disabled'});
    if(errors.length)throw Error('Animation runtime errors: '+errors.join('; '));
    await page.close();
  }

  // Distinct, CMS-generated pages should exist without private GitHub URLs.
  for(const slug of ['scholarbro','trip-planner','wcag-checker','group-chat-assistant']){
    const page=await browser.newPage({viewport:{width:1100,height:760}});
    const response=await page.goto(base+'projects/'+slug+'/',{waitUntil:'domcontentloaded'});
    if(!response?.ok())throw Error('Project page missing: '+slug);
    await page.locator('h1').waitFor();
    const privateAnchors=await page.locator('a[href*="github.com/nasiriubat/"]').count();
    if(privateAnchors)throw Error('Private repository URL leaked on '+slug);
    if(slug==='wcag-checker'&&await page.getByText('How the system works').count()===0)
      throw Error('Technical case study is missing documented architecture');
    await page.close();
  }

  console.log('PASS: 5 responsive viewports, navigation, filters, project details, source privacy, search, 3D motion, research, generated case studies');
}finally{
  await browser?.close();
  server.kill();
}
