import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';

const base='http://127.0.0.1:4173/portfolio/';
const watchdog=setTimeout(()=>{console.error('Visual QA exceeded 145s');process.exit(2)},145000);
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'ignore'});
let browser;

async function view(page,name){
  console.log('Opening '+name);
  page.setDefaultTimeout(9000);
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(base,{waitUntil:'domcontentloaded',timeout:18000});
  if(!response?.ok())throw Error(name+': HTTP '+response?.status());
  await page.locator('h1').waitFor({timeout:10000});
  await page.locator('.system-grid .system-card').first().waitFor({timeout:10000});
  const width=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
  if(width>2)throw Error(name+': horizontal overflow '+width+'px');
  if(errors.length)throw Error(name+': '+errors.join('; '));
  console.log('Loaded '+name+' without runtime errors or overflow');
  return errors;
}

async function scroll(page,selector,offset=0){
  await page.locator(selector).evaluate((el,amount)=>{
    window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top+amount,behavior:'instant'});
  },offset);
  await page.waitForTimeout(250);
}

async function capture(page,name){
  console.log('Screenshot '+name);
  await page.screenshot({path:'preview/'+name+'.png',timeout:18000});
}

try{
  let ready=false;
  for(let i=0;i<75;i++){
    try{const response=await fetch(base);if(response.ok){ready=true;break;}}catch{}
    await new Promise(ok=>setTimeout(ok,400));
  }
  if(!ready)throw Error('Preview server did not start');
  browser=await chromium.launch({headless:true});
  await mkdir('preview',{recursive:true});

  for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844],['small-mobile',320,740]]){
    const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce',deviceScaleFactor:1});
    const errors=await view(page,name);
    if(name!=='small-mobile')await capture(page,name+'-hero');
    await scroll(page,'#projects');
    if(name!=='small-mobile')await capture(page,name+'-projects');

    if(name==='desktop'){
      console.log('Checking project filtering / modal / search');
      await page.getByRole('button',{name:'AI & research'}).evaluate(el=>el.click());
      if(await page.locator('.system-card-hit').count()===0)throw Error('Project filter returned no projects');
      await page.locator('.system-card-hit').first().evaluate(el=>el.click());
      await page.locator('.detail-panel').waitFor({state:'visible',timeout:6000});
      if(await page.locator('.detail-panel a[href*="github.com/nasiriubat/"]').count())
        throw Error('Private source link surfaced in project details');
      await page.keyboard.press('Escape');
      await page.locator('.detail-panel').waitFor({state:'hidden',timeout:6000});
      await page.getByRole('button',{name:'Open quick search'}).evaluate(el=>el.click());
      await page.getByRole('textbox',{name:'Search portfolio'}).fill('ScholarBro');
      if(!await page.locator('.search-results a').count())throw Error('Search has no results');
      await page.keyboard.press('Escape');
      await scroll(page,'#research',160);await capture(page,'desktop-research');
      await scroll(page,'#experience',120);await capture(page,'desktop-career');
      await scroll(page,'#contact',80);await capture(page,'desktop-contact');
    } else {
      await page.getByRole('button',{name:'Open menu'}).evaluate(el=>el.click());
      await page.getByRole('navigation',{name:'Mobile navigation'}).waitFor({state:'visible',timeout:5000});
      await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Research'}).evaluate(el=>el.click());
      await page.getByRole('navigation',{name:'Mobile navigation'}).waitFor({state:'hidden',timeout:5000});
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
      if(overflow>2)throw Error(name+': horizontal overflow after navigation');
    }
    if(errors.length)throw Error('Runtime errors in '+name+': '+errors.join('; '));
    console.log('Passed '+name);
    await page.close();
  }

  console.log('Checking desktop scroll-linked motion');
  {
    const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
    const errors=await view(page,'motion');
    const bounds=await page.locator('.showcase-scroller').evaluate(el=>({
      top:window.scrollY+el.getBoundingClientRect().top,height:el.offsetHeight
    }));
    await page.evaluate(top=>scrollTo({top,behavior:'instant'}),bounds.top);
    await page.waitForTimeout(450);
    const start=await page.locator('.showcase-track').evaluate(el=>getComputedStyle(el).transform);
    await page.evaluate(({top,height})=>scrollTo({top:top+(height-innerHeight)*.52,behavior:'instant'}),bounds);
    await page.waitForTimeout(650);
    const halfway=await page.locator('.showcase-track').evaluate(el=>getComputedStyle(el).transform);
    if(start===halfway)throw Error('Horizontal showcase did not respond to scroll');
    await capture(page,'motion-gallery');
    if(errors.length)throw Error('Motion runtime errors: '+errors.join('; '));
    await page.close();
  }

  console.log('Checking generated case studies');
  for(const slug of ['scholarbro','trip-planner','wcag-checker','group-chat-assistant']){
    const page=await browser.newPage({viewport:{width:1100,height:760}});
    const response=await page.goto(base+'projects/'+slug+'/',{waitUntil:'domcontentloaded',timeout:15000});
    if(!response?.ok())throw Error('Missing case study: '+slug);
    await page.locator('h1').waitFor();
    if(await page.locator('a[href*="github.com/nasiriubat/"]').count())
      throw Error('Private source URL on case study: '+slug);
    if(slug==='wcag-checker'&&!await page.getByText('How the system works').count())
      throw Error('Missing case study architecture');
    await page.close();
  }
  console.log('PASS: production pages, motion, 3 viewports, project interactions, mobile navigation, case studies');
}finally{
  clearTimeout(watchdog);
  await browser?.close();
  server.kill();
}
