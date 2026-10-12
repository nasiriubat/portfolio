import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'ignore'});
let browser;
try {
  for(let i=0;i<60;i++){
    try{const r=await fetch('http://127.0.0.1:4173/portfolio/');if(r.ok)break;}catch{}
    if(i===59)throw new Error('Preview server failed to start');
    await new Promise(r=>setTimeout(r,500));
  }
  browser=await chromium.launch({headless:true});
  await mkdir('preview',{recursive:true});
  for(const [name,width,height] of [['desktop',1440,900],['mobile',375,812],['small-mobile',320,740]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:4173/portfolio/',{waitUntil:'networkidle'});
    await page.locator('h1').waitFor();
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    if(overflow)throw new Error(name+': horizontal overflow');
    if(errors.length)throw new Error(name+': '+errors.join('; '));
    await page.screenshot({path:'preview/'+name+'.png',fullPage:true,animations:'disabled'});
    if(name==='desktop'){
      await page.getByRole('button',{name:'Open command search'}).click();
      await page.getByPlaceholder('Search projects or sections…').fill('ScholarBro');
      if(await page.getByRole('dialog').getByText('ScholarBro').count()===0)throw new Error('Command search failed');
    }
    await page.close();
  }
  // Check the moving artwork separately from the reduced-motion snapshots.
  {
    const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto('http://127.0.0.1:4173/portfolio/',{waitUntil:'networkidle'});
    const hero=page.locator('.cinematic-assembly');
    await hero.waitFor();
    const captions=await page.getByText(/SCROLL TO ASSEMBLE|ENGINEERED IN 3D/i).count();
    if(captions)throw new Error('Unprofessional technology captions remain in the hero');
    await page.waitForTimeout(1700); // Capture the settled sculpture, not its entrance sequence.
    await page.screenshot({path:'preview/hero-assembled.png',animations:'disabled'});
    await page.evaluate(()=>scrollTo(0,Math.round(window.innerHeight*.30)));
    await page.waitForTimeout(1100);
    const hasJS=errors.length>0;
    if(hasJS)throw new Error('Kinetic hero runtime error: '+errors.join('; '));
    await page.screenshot({path:'preview/hero-motion.png',animations:'disabled'});
    await page.close();
  }
  for(const slug of ['scholarbro','nexteurotrip']){
    const page=await browser.newPage();
    const r=await page.goto('http://127.0.0.1:4173/portfolio/projects/'+slug+'/');
    if(!r?.ok())throw new Error('Case study failed: '+slug);
    await page.locator('h1').waitFor();
    await page.close();
  }
  console.log('Visual review and smoke checks passed');
} finally {await browser?.close();server.kill();}
