/* THE WORLD BUILDER — shared verified portfolio content + real interactions.
   No outside runtime dependencies; scroll choreography respects reduced motion.
   Source dates/roles/education reconstructed from the prior portfolio build. */
(() => {
 'use strict';
 const EMAIL = 'dev.nasirshuvo@gmail.com';
 const Github = 'https://github.com/nasiriubat';
 const Linkedin = 'https://www.linkedin.com/in/nasir-shuvo';
 const base = location.pathname.replace(/[^/]*$/, '');
 const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const $ = selector => document.querySelector(selector);
 const $$ = selector => Array.from(document.querySelectorAll(selector));
 const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const html = value => esc(value).replaceAll('\n','<br>');
 const clamp = (n,min=0,max=1) => Math.max(min,Math.min(max,n));

 const education = [
  {degree:"Master's in Computing Sciences", school:'Tampere University', place:'Tampere, Finland', period:'2023 — 2025', detail:'Software, Web and Cloud'},
  {degree:'BSc in Computer Science & Engineering', school:'IUBAT', place:'Dhaka, Bangladesh', period:'2017 — 2021',detail:'CGPA 3.94 / 4.00'}
 ];
 const experience = [
  {role:'Project Researcher',company:'GPT Lab · Tampere University',period:'Jan 2026 — Present',location:'Tampere, Finland',summary:'Researching agentic workflows, memory and long-term reliability of AI systems through prototype development and reproducible evaluation.',tags:['AI agents','Memory systems','RAG','Evaluation']},
  {role:'Research Assistant',company:'GPT Lab · Tampere University',period:'Oct 2024 — Dec 2025',location:'Tampere, Finland',summary:'Built LLM-based tools and retrieval-augmented applications and experimented with retrieval strategies, model orchestration and research prototypes.',tags:['Python','React','LLMs','Retrieval']},
  {role:'Software Developer',company:'AutonomyBD Ltd.',period:'Oct 2022 — Jun 2023',location:'Dhaka, Bangladesh',summary:'Built REST APIs, extended business applications, delivered new functionality and collaborated with front-end engineers.',tags:['Laravel','PHP','MySQL','Node.js']},
  {role:'Software Developer',company:'Inilabs Network',period:'Feb 2021 — Sep 2022',location:'Dhaka, Bangladesh',summary:'Developed customer-requested features, APIs, application improvements and support for production software.',tags:['PHP','CodeIgniter','REST APIs','JavaScript']}
 ];
 const researchAreas = {
  retrieval:{title:'Answers grounded in evidence',body:'Designing retrieval-augmented applications that connect source documents, ranking, and traceable citations instead of relying on model confidence.'},
  memory:{title:'What should an agent remember?',body:'Studying longitudinal agent memory, changes to prior decisions, procedural knowledge and the governance needed to keep learning trustworthy.'},
  agents:{title:'From prompts to working systems',body:'Connecting models with tools, planning, retrieval, feedback and controlled execution in real applications—not just isolated demos.'},
  evaluation:{title:'Measure the behavior, not the hype',body:'Building reproducible experiments that examine task success, retrieval quality, robustness, latency, failure modes and cost.'}
 };
 const publications = [
  {title:'Context Before Code: An Experience Report on Vibe Coding in Practice',venue:'ICSE',year:'2026',url:'https://www.researchgate.net/publication/401912655_Context_Before_Code_An_Experience_Report_on_Vibe_Coding_in_Practice'},
  {title:'Engineering a Governance-Aware AI Sandbox: Design, Implementation, and Lessons Learned',venue:'ICSE',year:'2026',url:'https://www.researchgate.net/publication/401563934_Engineering_a_Governance-Aware_AI_Sandbox_Design_Implementation_and_Lessons_Learned'},
  {title:'RAG IN PRACTICE: Multi-domain Applications for Academic and Municipal Services',venue:"Master's thesis · Tampere University",year:'2025',url:'https://www.researchgate.net/publication/403119428_RAG_IN_PRACTICE_Multi_domain_applications_for_academic_and_municipal_services'}
 ];
 const featured = [
  {slug:'scholarbro',name:'ScholarBro',type:'RESEARCH DISCOVERY',headline:'Follow ideas, not just papers.',description:'A platform for discovering research and following the academic interests that matter to you.',long:'ScholarBro helps researchers and curious readers discover scholarly work and follow their areas of interest. The product turns fragmented research exploration into a more connected experience.',tags:['Research platform','Discovery','Full-stack'],live:'https://scholarbro.com',features:['Research and topic discovery','Follow research interests','An accessible interface for academic exploration'],workflow:['Explore a topic or research area','Discover related academic work','Follow interests and continue exploring'],symbol:'◈',visual:'network',filter:'products'},
  {slug:'trip-planner',name:'NextEuroTrip',type:'TRAVEL TECHNOLOGY',headline:'Turn places into a journey.',description:'Plan European journeys with practical routes, day-by-day itineraries and the freedom to explore.',long:'A Europe-focused itinerary planner that supports different travel shapes and curated destinations, from individual day trips to full journeys. The system favors usable routes over vague generated travel lists.',tags:['Laravel','Vue 3','Maps'],live:'https://nexteurotrip.com',features:['Round trips, one-way journeys and day-trip discovery','Deterministic day-by-day route planning','Interactive maps and shareable visited maps'],workflow:['Choose an origin and trip format','Explore destinations and assemble stops','Arrange a practical itinerary and share the journey'],symbol:'↗',visual:'travel',filter:'products'},
  {slug:'wcag-checker',name:'WCAG Checker',type:'ACCESSIBILITY ENGINEERING',headline:'See the issues others miss.',description:'An accessibility auditing system that reveals real problems and actionable ways to improve.',long:'A browser-driven WCAG accessibility checker that discovers site pages, renders them in Chromium, runs axe-core, and provides findings that can guide meaningful remediation.',tags:['Python','Playwright','axe-core'],live:'',features:['Single-page and sitemap/domain crawling','WCAG 2.1 A/AA checks and affected DOM selectors','Risk-scored results and PDF/CSV reports'],workflow:['Discover relevant website pages','Render pages and run accessibility checks','Inspect findings and plan repairs'],symbol:'◎',visual:'wcag',filter:'tools'}
 ];
 const otherProjects = [
  {slug:'leave-management',name:'LeaveHub',type:'BUSINESS SOFTWARE',headline:'Leave management, thoughtfully built.',description:'A role-aware leave management platform covering approvals, balances, holidays, team calendars, reports and audit trails.',long:'LeaveHub is a business application for managing leave policies and approvals, including multi-step workflows, accrual, carry-over, country holidays and responsible employee data handling.',tags:['Laravel','React','TypeScript','MySQL'],features:['Multi-level leave approval flows','Balance, accrual and carry-forward calculation','Country holiday calendars and reports','Role permissions and audit trail'],symbol:'▦',filter:'products'},
  {slug:'thesis-rag',name:'Thesis RAG',type:'RESEARCH APPLICATION',headline:'Answers connected to their sources.',description:'A document-grounded research assistant with multi-source ingestion, question answering, citations and administrator review.',long:'Thesis RAG uses retrieval-augmented generation to support academic document exploration and question answering. It combines ingestion and grounded responses with review tools for unresolved questions.',tags:['Python','Flask','RAG'],features:['PDF, document, web and video-source ingestion','Cited document-grounded Q&A','FAQ management and unanswered question review'],symbol:'▤',filter:'ai'},
  {slug:'stack-learner',name:'StackLab',type:'DEVELOPER EDUCATION',headline:'Learn by doing.',description:'A full-stack and AI learning platform with structured lessons, browser-run examples and guided API missions.',long:'StackLab brings together courses, runnable code examples, interview preparation and guided application labs in a dedicated learning experience.',tags:['Next.js','TypeScript','PostgreSQL'],features:['Structured lessons with code examples','Interview preparation and practice','Guided API labs and capstone work'],symbol:'⌘',filter:'tools'},
  {slug:'knowlet',name:'Knowlet',type:'AI APPLICATION',headline:'Turn sources into understanding.',description:'A notebook-based research companion for documents and multi-speaker audio summaries.',long:'Knowlet explores notebook-style knowledge work with source ingestion, question answering and multi-speaker podcast-like summaries.',tags:['Flask','React','FAISS'],features:['Document-centered notebooks','Grounded research Q&A','Multi-speaker audio summaries'],symbol:'✳',filter:'ai'},
  {slug:'blur-it',name:'Blur-It',type:'BROWSER EXTENSION',headline:'Privacy for what you share.',description:'A published Chrome extension for blurring sensitive information on web pages.',long:'Blur-It is a browser extension designed to hide sensitive or distracting content before sharing a screen or capturing a web page.',tags:['Chrome extension','JavaScript','Privacy'],features:['Blur selected sensitive content','Work directly in webpages','Practical privacy-focused user workflow'],symbol:'◉',filter:'tools'},
  {slug:'group-chat-assistant',name:'Group Chat Assistant',type:'AI AGENTS & MEMORY',headline:'Remember conversations that matter.',description:'A privacy-aware assistant concept that can retrieve past group decisions with permissions and grounded context.',long:'A group assistant research prototype with hybrid retrieval, decision tracking, group permissions and configurable AI providers.',tags:['PostgreSQL','Docker','Hybrid retrieval'],features:['Retrieve permitted group conversation history','Track updated or superseded decisions','Respect privacy, retention and audit controls'],symbol:'⬡',filter:'ai'},
  {slug:'coscribe',name:'CoScribe',type:'RESEARCH SOFTWARE',headline:'Research writing with structure.',description:'An AI-assisted research writing workspace for outlining projects and working from verified sources.',long:'CoScribe is a research writing workspace that helps authors structure research plans and explore drafts grounded in source information.',tags:['AI writing','Research','Software'],features:['Research planning and outlining','Source-grounded drafting workflows','Structured author assistance'],symbol:'✎',filter:'ai'}
 ];
 const services = [
  {name:'Full-stack development',symbol:'{ }',description:'Web applications and business systems, from interface to API and deployment.',subject:'Full-stack application'},
  {name:'AI apps & agents',symbol:'✳',description:'Tools, workflows and intelligent applications with thoughtful orchestration.',subject:'AI application or agent'},
  {name:'RAG & knowledge systems',symbol:'⛁',description:'Source-grounded search, document Q&A, citations and retrieval workflows.',subject:'RAG solution'},
  {name:'Research engineering',symbol:'◎',description:'Experiment harnesses, evaluation, benchmarking and reproducible prototypes.',subject:'Research engineering'},
  {name:'Product prototyping',symbol:'↗',description:'Turn early concepts into functional, testable products quickly.',subject:'Product prototype'},
  {name:'Custom solutions',symbol:'⚙',description:'Integrations, automation, extensions and tailored business software.',subject:'Custom software project'}
 ];
 const skills = [
  {name:'Front-end',items:['React','Next.js','TypeScript','Vue']},
  {name:'Back-end',items:['Python','Flask','FastAPI','Laravel','Node.js']},
  {name:'Data & systems',items:['PostgreSQL','MySQL','SQLite','Docker']},
  {name:'Intelligent apps',items:['AI agents','RAG','FAISS','LLMs','Agent memory']}
 ];
 const credentials = ['Full Stack (MERN) Bootcamp','Model Context Protocol: Advanced Topics','Introduction to Model Context Protocol','Claude Code 101','GenAI in Software Engineering · GPT Lab','SQL Intermediate · Sololearn'];
 const everyProject = [...featured,...otherProjects];

 function tags(items){return items.map(tag=>`<span>${esc(tag)}</span>`).join('');}
 function externalButton(url,label='Visit live product'){
  if(!url || !/^https:\/\//.test(url))return '';
  return `<a class="btn btn-soft" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
 }
 function projectItem(p){return `<article class="project-item" data-project="${esc(p.slug)}"><div class="project-item-top"><span>${esc(p.type)}</span><span>↗</span></div><div class="project-item-icon" aria-hidden="true">${esc(p.symbol)}</div><h4>${esc(p.name)}</h4><p>${esc(p.description)}</p><button type="button" data-open-project="${esc(p.slug)}" aria-label="Read more about ${esc(p.name)}">Explore project ↗</button></article>`;}

 function featuredArt(p){const shell=`<div class="art-window"><div class="art-toolbar"><i></i><i></i><i></i><span>${esc(p.name)} / project preview</span></div><div class="art-body"><div class="art-name">${esc(p.name)}</div><div class="art-sub">${esc(p.type.toLowerCase())}</div>`;
  let visual='';
  if(p.visual==='network')visual=`<div class="art-network"><svg viewBox="0 0 500 250" aria-hidden="true"><path d="M55 140 Q150 28 250 126 T438 73 M55 140 Q151 243 250 126 T448 213 M150 46 Q218 65 250 126"/><circle cx="55" cy="140" r="11"/><circle cx="150" cy="46" r="9"/><circle cx="250" cy="126" r="18"/><circle cx="438" cy="73" r="11"/><circle cx="448" cy="213" r="9"/></svg></div>`;
  else if(p.visual==='travel')visual=`<div class="art-travel-map"><div class="art-map-path"><svg viewBox="0 0 520 220" aria-hidden="true"><path d="M44 159 C140 180 123 33 227 100 S363 155 467 54"/><circle cx="44" cy="159" r="11"/><circle cx="227" cy="100" r="11"/><circle cx="467" cy="54" r="11"/></svg></div><div class="art-map-labels"><span>START</span><span>EXPLORE</span><span>ARRIVE</span></div></div>`;
  else visual=`<div class="art-wcag-columns"><div class="art-wcag-preview" style="position:relative"><div class="wcag-line"></div><div class="wcag-line"></div><div class="wcag-line"></div><div class="wcag-line"></div><div class="wcag-highlight"></div></div><div class="art-wcag-findings"><b>ACCESSIBILITY REVIEW</b><span><i></i>Contrast</span><span><i></i>Focus order</span><span><i></i>Labels</span></div></div>`;
  return `<div class="showcase-art" aria-label="Conceptual illustration of ${esc(p.name)}"><div class="art-float-badge">${esc(p.type)}</div>${shell}${visual}</div></div><div class="art-float-small">✳ &nbsp; designed to solve real problems</div></div>`;
 }
 let featuredIndex=0;
 function renderFeatured(index){featuredIndex=(index+featured.length)%featured.length;const p=featured[featuredIndex];$('.project-theater').dataset.project=p.visual;$('#project-showcase').innerHTML=`<div class="showcase-copy"><div class="showcase-kicker"><span>PROJECT 0${featuredIndex+1}</span><i></i>${esc(p.type)}</div><h3>${esc(p.name)}</h3><strong class="showcase-tagline">${esc(p.headline)}</strong><p>${esc(p.description)}</p><div class="showcase-tech">${tags(p.tags)}</div><div class="showcase-actions"><button class="btn btn-primary" type="button" data-open-project="${esc(p.slug)}">Explore case study ↗</button>${externalButton(p.live,'Visit product')}</div></div>${featuredArt(p)}`;
  $('#project-count').textContent=`0${featuredIndex+1} / 0${featured.length}`;
 }
 function renderOtherProjects(filter='all'){const show=everyProject.filter(p=>!featured.includes(p)).filter(p=>filter==='all'||p.filter===filter);$('#project-grid').innerHTML=show.map(projectItem).join('')||'<p>No projects in this category yet.</p>';}
 function renderExperience(){const chronological=[...experience].reverse();$('#career-stations').innerHTML=chronological.map((e,i)=>`<article class="career-station station-${i+1}"><span class="career-station-number">0${i+1}</span><time>${esc(e.period)}</time><h3>${esc(e.role)}</h3><p>${esc(e.company)}</p></article>`).join('');}
 function renderResearch(key='retrieval'){const area=researchAreas[key]||researchAreas.retrieval;$('#research-description').setAttribute('aria-labelledby','research-tab-'+key);$('#research-description').innerHTML=`<strong>${esc(area.title)}</strong><p>${esc(area.body)}</p>`;$$('[data-research]').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.research===key));b.setAttribute('tabindex',b.dataset.research===key?'0':'-1')});}
 function renderPublications(){const container=$('#publication-list');container.innerHTML=publications.map((p,i)=>`<a class="publication" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer"><span>0${i+1}</span><div><strong>${esc(p.title)}</strong><small>${esc(p.venue)} · ${esc(p.year)}</small></div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M8 6h10v10"/></svg></a>`).join('');}
 function renderSkillsAndCredentials(){
  $('#education-credentials-list').innerHTML=credentials.map((c,i)=>`<span><i>0${i+1}</i>${esc(c)}</span>`).join('');
  $('#skill-groups').innerHTML=skills.map(s=>`<article class="skill-group"><h4>${esc(s.name)}</h4><div>${s.items.map(item=>`<span>${esc(item)}</span>`).join('')}</div></article>`).join('');
 }
 function renderServices(){const target=$('#service-grid');target.innerHTML=services.map(s=>`<a class="service-card" href="mailto:${EMAIL}?subject=${encodeURIComponent('Project inquiry: '+s.subject)}"><span class="service-symbol">${esc(s.symbol)}</span><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p><span>Let's discuss ↗</span></a>`).join('');}

 // Project dialog keeps the current story context instead of navigating away.
 let previousFocus=null;
 function openProject(slug){const p=everyProject.find(item=>item.slug===slug);if(!p)return;const dialog=$('#project-dialog');previousFocus=document.activeElement;
  $('#dialog-kind').textContent=p.type+' / CASE STUDY';
  $('#dialog-content').innerHTML=`<h2 class="dialog-project-title" id="dialog-title">${esc(p.name)}</h2><p class="dialog-lead">${esc(p.long||p.description)}</p><div class="dialog-tags">${tags(p.tags||[])}</div><div class="dialog-sections"><section><h4>What it offers</h4><ul>${(p.features||[]).map(v=>`<li>${esc(v)}</li>`).join('')}</ul></section><section><h4>How it works</h4><ul>${(p.workflow||['Explore the core user experience','Understand the product design and engineering decisions','Learn from the implementation']).map(v=>`<li>${esc(v)}</li>`).join('')}</ul></section></div><div class="dialog-footer">${externalButton(p.live)}<a class="btn btn-primary" href="mailto:${EMAIL}?subject=${encodeURIComponent('Question about '+p.name)}">Discuss this project ↗</a></div>`;
  dialog.showModal();document.body.classList.add('modal-open');$('#dialog-close').focus();
 }
 function closeProject(){const d=$('#project-dialog');if(d.open)d.close();document.body.classList.remove('modal-open');previousFocus?.focus?.();}

 // Optional Pages CMS bridge: generated at build time from the original content/*.json files.
 // Creative motion/copy stays art-directed; project details, URLs, stack and publications stay current.
 async function hydrateCMS(){
  try{
   const response=await fetch('./assets/content-data.json',{cache:'no-cache'});
   if(!response.ok)return;
   const source=await response.json();
   if(!source||!Array.isArray(source.projects))return;
   const seen=new Set(everyProject.map(p=>p.slug));
   for(const item of source.projects){
    if(!item||!item.slug||!item.title)continue;
    const slug=String(item.slug);
    const project=everyProject.find(p=>p.slug===slug);
    const safeLink=typeof item.url==='string'&&/^https:\/\//.test(item.url)&&
      !/^https:\/\/(?:www\.)?github\.com\//.test(item.url)?item.url:'';
    if(project){
     if(typeof item.description==='string'&&item.description.trim())project.long=item.description;
     if(Array.isArray(item.stack)&&item.stack.length)project.tags=item.stack.filter(t=>typeof t==='string');
     if(Array.isArray(item.features)&&item.features.length)project.features=item.features.filter(t=>typeof t==='string');
     if(Array.isArray(item.workflow)&&item.workflow.length)project.workflow=item.workflow.filter(t=>typeof t==='string');
     if(safeLink)project.live=safeLink;
    } else if(!seen.has(slug)){
     const category=String(item.category||'Project');
     const text=String(item.description||'A software project.');
     const filter=/ai|agent|rag|research|memory|llm/i.test(category+' '+slug)?'ai':
      /tool|extension|developer|accessibility|education/i.test(category+' '+slug)?'tools':'products';
     everyProject.push({slug,name:String(item.title),type:category.toUpperCase(),
      headline:'Explore the project.',description:text.slice(0,220),long:text,tags:Array.isArray(item.stack)?item.stack:[],
      features:Array.isArray(item.features)?item.features:[],workflow:Array.isArray(item.workflow)?item.workflow:[],
      symbol:'✳',live:safeLink,filter});seen.add(slug);
    }
   }
   if(Array.isArray(source.publications)&&source.publications.length){
    const outputs=source.publications.filter(p=>p&&p.title&&/^https:\/\//.test(p.url||''));
    if(outputs.length)publications.splice(0,publications.length,...outputs.map(p=>({title:p.title,venue:p.venue||'Research output',year:p.year||'',url:p.url})));
   }
   renderFeatured(featuredIndex);renderOtherProjects();renderPublications();renderPlain();
  }catch(error){console.debug('Using the embedded portfolio snapshot; CMS bridge not available.',error?.message||'')}
 }

 function renderPlain(){const listExperience=experience.map(e=>`<article><span>${esc(e.period)}</span><div><h3>${esc(e.role)}</h3><strong>${esc(e.company)} · ${esc(e.location)}</strong><p>${esc(e.summary)}</p><div class="plain-badges">${tags(e.tags)}</div></div></article>`).join('');
  const degrees=education.map(e=>`<article><span>${esc(e.period)}</span><div><h3>${esc(e.degree)}</h3><strong>${esc(e.school)} · ${esc(e.place)}</strong><p>${esc(e.detail)}</p></div></article>`).join('');
  const pubList=publications.map((p,i)=>`<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer"><span>0${i+1}</span><div><strong>${esc(p.title)}</strong><small>${esc(p.venue)} · ${esc(p.year)}</small></div><span>↗</span></a>`).join('');
  const credentialsList=credentials.map(c=>`<span>${esc(c)}</span>`).join('');
  const areas=Object.values(researchAreas).map(a=>`<article><span>RESEARCH</span><div><h3>${esc(a.title)}</h3><p>${esc(a.body)}</p></div></article>`).join('');
  const content=`<section id="plain-projects" class="plain-section"><div class="content-width"><p class="plain-eyebrow">01 / WORK</p><h2>Projects & products.</h2><p class="plain-section-lead">Full-stack products, research assistants, agents, developer tools and extensions. Open any project to see what it does.</p><div class="plain-grid">${everyProject.map(projectItem).join('')}</div></div></section>
  <section id="plain-research" class="plain-section"><div class="content-width"><p class="plain-eyebrow">02 / RESEARCH</p><h2>Research & publications.</h2><p class="plain-section-lead">Retrieval, agent memory, evaluation and the engineering discipline behind dependable AI systems.</p><div class="plain-list">${areas}</div><h3 style="margin:55px 0 18px;font-size:24px">Published & linked work</h3><div class="plain-pubs">${pubList}</div></div></section>
  <section id="plain-experience" class="plain-section"><div class="content-width"><p class="plain-eyebrow">03 / PROFESSIONAL EXPERIENCE</p><h2>The road so far.</h2><div class="plain-list">${listExperience}</div></div></section>
  <section id="plain-education" class="plain-section"><div class="content-width"><p class="plain-eyebrow">04 / EDUCATION</p><h2>The foundations.</h2><div class="plain-list">${degrees}</div><h3 style="margin:55px 0 22px;font-size:23px">Certifications & training</h3><div class="plain-badges">${credentialsList}</div></div></section>
  <section id="plain-services" class="plain-section"><div class="content-width"><p class="plain-eyebrow">05 / HOW I CAN HELP</p><h2>Let's build together.</h2><div class="plain-grid">${services.map(s=>`<a class="service-card" href="mailto:${EMAIL}?subject=${encodeURIComponent('Project inquiry: '+s.subject)}"><span class="service-symbol">${esc(s.symbol)}</span><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p><span>Start a conversation ↗</span></a>`).join('')}</div></div></section>
  <section id="plain-contact" class="plain-contacts"><div class="content-width"><p class="plain-eyebrow">06 / CONTACT</p><h2 style="font-size:clamp(50px,7vw,92px)">Have something in mind?</h2><p class="plain-section-lead">For product ideas, engineering collaborations, or research conversations, I'd be happy to hear from you.</p><div class="hero-cta"><button type="button" class="btn btn-primary" id="plain-copy-email">Copy email ↗</button><a class="btn btn-soft" href="mailto:${EMAIL}">Send email ↗</a><a class="btn btn-soft" href="?view=story">Explore the story ↗</a></div><p style="margin-top:25px;font-size:12px">${EMAIL}</p></div></section>`;
  $('#plain-sections').innerHTML=content;
 }

 // Everything here is an actual button or link, not a decorative fake control.
 function showToast(message){const t=$('#toast');t.textContent=message;t.classList.add('visible');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove('visible'),2600)}
 async function copyEmail(){try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(EMAIL)}else{
    const el=document.createElement('textarea');el.value=EMAIL;el.style.position='fixed';el.style.opacity='0';document.body.appendChild(el);el.select();if(!document.execCommand('copy'))throw new Error('Clipboard unavailable');el.remove();
   }showToast('Email copied to clipboard');$('#copy-feedback').textContent='Copied! You can paste the email into your mail app.';const label=$('#copy-email span');if(label){label.textContent='Copied ✓';setTimeout(()=>label.textContent='Copy email',2300)}
  }catch{showToast('Use the email shown on the page');$('#copy-feedback').textContent='Clipboard permission was unavailable. You can select the email address below.'}}
 function updateMode(){const plain=new URLSearchParams(location.search).get('view')==='plain';document.body.classList.toggle('plain-mode',plain);$('#story-portfolio').hidden=plain;$('#plain-portfolio').hidden=!plain;$$('[data-view]').forEach(a=>{const active=a.dataset.view===(plain?'plain':'story');a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  $$('.primary-nav a,.mobile-menu a').forEach(a=>{const hash=a.getAttribute('href').split('#').pop().replace(/^plain-/,'');if(plain)a.setAttribute('href','#plain-'+hash);else a.setAttribute('href','#'+hash)});
  const skip=$('.skip-link');if(skip)skip.setAttribute('href',plain?'#plain-projects':'#projects');
  if(!plain)$$('.chapter').forEach(ch=>ch.classList.add('is-in'));
 }
 function activateScroll(){if(new URLSearchParams(location.search).get('view')==='plain')return;
  const chapters=$$('.chapter');let scheduled=false;
  const frame=()=>{scheduled=false;const h=window.innerHeight;let best='home',bestScore=-1;
   for(const chapter of chapters){const r=chapter.getBoundingClientRect();const center=r.top+r.height*.45;const p=clamp((h*.8-r.top)/(r.height+h*.05));const visible=r.bottom>h*.11&&r.top<h*.82;chapter.style.setProperty('--p',reduceMotion?1:p.toFixed(4));chapter.style.setProperty('--enter',visible?1:0);chapter.classList.toggle('is-in',visible);
    if(visible){const score=1-Math.min(1,Math.abs(center-h*.47)/(h*.95));if(score>bestScore){bestScore=score;best=chapter.id}}
   }
   $$('.primary-nav [data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===best));
   const docHeight=Math.max(1,document.documentElement.scrollHeight-h);$('#page-progress').style.width=((scrollY/docHeight)*100).toFixed(2)+'%';$('#site-header').classList.toggle('scrolled',scrollY>30);
  };
  const onScroll=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(frame)}};
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});requestAnimationFrame(frame);
 }

 function init(){renderFeatured(0);renderOtherProjects();renderExperience();renderResearch();renderPublications();renderServices();renderSkillsAndCredentials();renderPlain();updateMode();activateScroll();$('#year').textContent=new Date().getFullYear();
  document.addEventListener('keydown',e=>{if(e.target?.matches?.('[data-research]')&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const tabs=$$('[data-research]');const idx=tabs.indexOf(e.target);const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(idx+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();renderResearch(tabs[next].dataset.research)}});
  document.addEventListener('click',event=>{const open=event.target.closest('[data-open-project]');if(open){event.preventDefault();openProject(open.dataset.openProject)}const research=event.target.closest('[data-research]');if(research){renderResearch(research.dataset.research)}const filter=event.target.closest('[data-filter]');if(filter){$$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===filter)));renderOtherProjects(filter.dataset.filter)}const nav=event.target.closest('#mobile-menu a');if(nav){$('#mobile-menu').hidden=true;$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','Open navigation')}});
  $('#prev-project').addEventListener('click',()=>renderFeatured(featuredIndex-1));$('#next-project').addEventListener('click',()=>renderFeatured(featuredIndex+1));$('#dialog-close').addEventListener('click',closeProject);$('#project-dialog').addEventListener('close',()=>document.body.classList.remove('modal-open'));$('#project-dialog').addEventListener('click',e=>{if(e.target===$('#project-dialog'))closeProject()});$('#copy-email').addEventListener('click',copyEmail);$('#plain-copy-email').addEventListener('click',copyEmail);
  if(!reduceMotion){const stage=$('.hero-art');stage?.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const box=stage.getBoundingClientRect();const x=(event.clientX-box.left)/box.width-.5;const y=(event.clientY-box.top)/box.height-.5;stage.style.setProperty('--parallax-x',(-x*14).toFixed(1)+'px');stage.style.setProperty('--parallax-y',(-y*9).toFixed(1)+'px');stage.style.setProperty('--parallax-fx',(x*25).toFixed(1)+'px');stage.style.setProperty('--parallax-fy',(y*16).toFixed(1)+'px')});stage?.addEventListener('pointerleave',()=>{for(const property of ['--parallax-x','--parallax-y','--parallax-fx','--parallax-fy'])stage.style.setProperty(property,'0px')})}
  $('#menu-toggle').addEventListener('click',()=>{const menu=$('#mobile-menu');menu.hidden=!menu.hidden;$('#menu-toggle').setAttribute('aria-expanded',String(!menu.hidden));$('#menu-toggle').setAttribute('aria-label',menu.hidden?'Open navigation':'Close navigation')});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if($('#project-dialog').open)closeProject();if(!$('#mobile-menu').hidden){$('#mobile-menu').hidden=true;$('#menu-toggle').setAttribute('aria-expanded','false')}}});
  hydrateCMS();
  // Page hashes on direct entry are honored once dynamic content has mounted.
  if(location.hash){const id=decodeURIComponent(location.hash.slice(1));requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:'instant',block:'start'}))}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
