import React, { Suspense, lazy, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './experience.css';

const StoryPortfolio=lazy(()=>import('./MotionPortfolio'));
const PlainPortfolio=lazy(()=>import('./PlainPortfolio'));
const base=import.meta.env.BASE_URL;
const params=new URLSearchParams(window.location.search);
const mode=params.get('view')==='plain'?'plain':'story';
const link=(view:'plain'|'story',hash='')=>base+'?view='+view+hash;

function Navigation(){
  const [menu,setMenu]=useState(false);
  const plain=mode==='plain';
  const sections=plain?[
    {label:'Projects',id:'projects'},{label:'Research',id:'research'},{label:'Experience',id:'experience'},{label:'Contact',id:'contact'}
  ]:[
    {label:'Home',id:'home'},{label:'Education',id:'education'},{label:'Career',id:'experience'},{label:'Work',id:'projects'},{label:'Research',id:'research'},{label:'Services',id:'services'},{label:'Contact',id:'contact'}
  ];
  return <>
    <a className="skip-link" href="#projects">Skip to projects</a>
    <header className="global-header">
      <a href={link(mode)} className="identity-mark" aria-label="Nasir Uddin Shuvo — homepage">
        <span className="mark-letter">n<span>.</span></span>
        <span className="mark-full">NASIR SHUVO</span>
      </a>
      <nav className="global-links" aria-label="Main sections">
        {sections.map(s=><a key={s.id} href={'#'+s.id}>{s.label}</a>)}
      </nav>
      <div className="global-controls">
        <div className="experience-switch" role="group" aria-label="Portfolio presentation">
          <a href={link('story')} className={plain?'':'selected'} aria-current={plain?undefined:'page'}>Story</a>
          <a href={link('plain')} className={plain?'selected':''} aria-current={plain?'page':undefined}>Plain</a>
        </div>
        <a className="header-email" href="mailto:dev.nasirshuvo@gmail.com" aria-label="Email Nasir"><ArrowUpRight size={19}/></a>
        <button type="button" className="mobile-nav-trigger" aria-label={menu?'Close navigation':'Open navigation'}
          aria-expanded={menu} aria-controls="mobile-navigation" onClick={()=>setMenu(v=>!v)}>{menu?<X size={23}/>:<Menu size={23}/>}</button>
      </div>
    </header>
    {menu&&<nav id="mobile-navigation" className="mobile-links" aria-label="Mobile sections">
      {sections.map(s=><a key={s.id} href={'#'+s.id} onClick={()=>setMenu(false)}>{s.label}<ArrowUpRight size={16}/></a>)}
      <div className="mobile-mode-note">Viewing: {plain?'Plain portfolio':'Interactive story'}</div>
    </nav>}
  </>;
}
function App(){
 return <div className={mode==='plain'?'experience-root plain-root':'experience-root story-root'}>
   <Navigation/>
   <Suspense fallback={<main className="experience-loading" role="status">Loading portfolio…</main>}>
     {mode==='plain'?<PlainPortfolio/>:<StoryPortfolio/>}
   </Suspense>
 </div>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
