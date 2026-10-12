import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const source = 'content/projects';
const destination = 'public/projects';
const origin = 'https://nasiriubat.github.io/portfolio';
const escapeHtml = value => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const stylesheet = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
:root{font-family:'DM Sans',sans-serif;color:#1b2634;background:#fcfcfc;font-synthesis:none}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0}a{color:inherit}
.shell{width:min(1060px,calc(100% - 44px));margin:auto}
.masthead{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:34px 0;border-bottom:1px solid #e3e8ee}
.brand{font:800 22px Manrope,sans-serif;letter-spacing:-.055em;text-decoration:none}
.brand span{color:#486bb5}.return{font-size:13px;text-decoration:none;color:#59697e}
.hero{padding:108px 0 102px;border-bottom:1px solid #e3e8ee}
.kicker{font-size:11px;letter-spacing:.17em;text-transform:uppercase;font-weight:700;color:#59718b}
h1{font:800 clamp(49px,8.4vw,104px)/1.05 Manrope,sans-serif;letter-spacing:-.072em;margin:28px 0;max-width:1000px;overflow-wrap:break-word}
.dek{color:#5a6b7d;max-width:800px;font-size:clamp(17px,2vw,21px);line-height:1.8;margin:0}
.launch{display:inline-flex;gap:10px;align-items:center;margin-top:34px;padding:14px 22px;border-radius:9px;background:#1c2b42;color:#fff;text-decoration:none;font-size:14px;font-weight:700}
.details{padding:84px 0}.section{display:grid;grid-template-columns:220px minmax(0,1fr);gap:48px;padding-bottom:70px;margin-bottom:70px;border-bottom:1px solid #e3e8ee}
.section:last-child{border:0;margin:0;padding:0}
.section-label{font-size:12px;font-weight:700;color:#58708c;letter-spacing:.09em}
.section h2{font:800 clamp(26px,3vw,37px)/1.25 Manrope,sans-serif;letter-spacing:-.05em;margin:0 0 30px}
.list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;padding:0;list-style:none;margin:0}
.list li{min-height:125px;padding:22px 23px;background:#f3f5f8;border-radius:12px;line-height:1.65;color:#3e5268;font-size:15px}
.list li:before{content:'↗';display:block;color:#4c6db4;font-weight:700;margin-bottom:13px}
.flow{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:13px;counter-reset:stage}
.flow li{padding:22px 17px;border-top:2px solid #7792c3;background:#f5f7fa;color:#263c56;font-weight:700;font-size:13px;line-height:1.5;counter-increment:stage}
.flow li:before{content:'0' counter(stage);display:block;color:#8a9bb0;font-size:12px;margin-bottom:15px}
.stack{display:flex;flex-wrap:wrap;gap:10px;padding:0;list-style:none;margin:0}
.stack li{border:1px solid #dce4ed;border-radius:7px;padding:11px 14px;color:#4d6077;font-size:13px}
.finish{border-top:1px solid #e3e8ee;padding:45px 0 65px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;color:#7a8794;font-size:13px}
.finish a{text-decoration:none;color:#31528d}
@media(max-width:720px){.masthead{padding:23px 0}.hero{padding:70px 0}.details{padding:50px 0}.section{grid-template-columns:1fr;gap:20px;padding-bottom:45px;margin-bottom:45px}.list{grid-template-columns:1fr}.list li{min-height:auto}h1{font-size:clamp(43px,11vw,70px)}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
`;

const arrayOfStrings = value => Array.isArray(value)
  ? value.filter(item => typeof item === 'string' && item.trim()).map(escapeHtml)
  : [];
const renderList = (items, className) =>
  '<ul class="' + className + '">' + items.map(item => '<li>' + item + '</li>').join('') + '</ul>';
const section = (number, label, heading, inner) => `
<section class="section" aria-label="${escapeHtml(heading)}">
  <div class="section-label">${number} / ${escapeHtml(label)}</div>
  <div><h2>${escapeHtml(heading)}</h2>${inner}</div>
</section>`;

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
const urls = [origin + '/'];

for (const file of (await readdir(source)).filter(name => name.endsWith('.json')).sort()) {
  const project = JSON.parse(await readFile(join(source, file), 'utf8'));
  const slug = file.slice(0, -5);
  if (!/^[a-z0-9-]+$/.test(slug)) throw Error('Invalid project slug: ' + slug);
  const location = origin + '/projects/' + slug + '/';
  urls.push(location);

  const features = arrayOfStrings(project.features);
  const workflow = arrayOfStrings(project.workflow);
  const technology = arrayOfStrings(project.stack);
  const link = (() => {
    try {
      const value = new URL(project.url);
      return value.protocol === 'https:' && !value.hostname.endsWith('github.com') ? value.href : null;
    } catch {
      return null;
    }
  })();

  const sections = [];
  if (features.length) sections.push(section('01', 'CAPABILITIES', 'What I built', renderList(features, 'list')));
  if (workflow.length) sections.push(section('02', 'ARCHITECTURE', 'How the system works', renderList(workflow, 'flow')));
  if (technology.length) sections.push(section('03', 'TECHNOLOGIES', 'Core technology', renderList(technology, 'stack')));

  const html = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${escapeHtml(project.title)} — Nasir Uddin Shuvo</title>
<meta name="description" content="${escapeHtml(project.description)}"/>
<meta property="og:title" content="${escapeHtml(project.title)} | Nasir Uddin Shuvo"/>
<meta property="og:description" content="${escapeHtml(project.description)}"/>
<meta property="og:type" content="article"/>
<link rel="canonical" href="${location}"/>
<style>${stylesheet}</style></head><body>
<header class="masthead shell"><a class="brand" href="/portfolio/">nasir<span>.</span></a><a class="return" href="/portfolio/#projects">← All projects</a></header>
<main class="shell"><div class="hero"><div class="kicker">${escapeHtml(project.category || 'Selected work')}</div>
<h1>${escapeHtml(project.title)}</h1><p class="dek">${escapeHtml(project.description)}</p>
${link ? `<a class="launch" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">Visit live product ↗</a>` : ''}
</div><div class="details">${sections.join('')}</div></main>
<footer class="finish shell"><span>© ${new Date().getFullYear()} Nasir Uddin Shuvo</span><a href="/portfolio/">Back to portfolio ↗</a></footer>
</body></html>`;

  const directory = join(destination, slug);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), html);
}

await writeFile('public/sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
  urls.map(url => '<url><loc>' + url + '</loc></url>').join('') + '</urlset>');
