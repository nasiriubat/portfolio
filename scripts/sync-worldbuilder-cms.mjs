// Synchronize the two portfolio modes with the same Pages CMS data at build time.
import {readFile,readdir,mkdir,writeFile} from 'node:fs/promises';
import {join,dirname} from 'node:path';
async function readJson(directory) {
  const names=(await readdir(directory)).filter(x=>x.endsWith('.json')).sort();
  return Promise.all(names.map(async filename=>({...JSON.parse(await readFile(join(directory,filename),'utf8')),slug:filename.slice(0,-5)})));
}
const aliases={'nexteurotrip':'trip-planner','leavehub':'leave-management'};
const input=await readJson('content/projects'),publications=await readJson('content/publications');
const bySlug=new Map();
for(const p of input){
  const slug=aliases[p.slug]||p.slug;const item={...p,slug};
  const old=bySlug.get(slug);
  if(!old||(p.description||'').length>(old.description||'').length)bySlug.set(slug,item);
}
const output='public/world-builder/assets/content-data.json';
await mkdir(dirname(output),{recursive:true});
await writeFile(output,JSON.stringify({projects:[...bySlug.values()],publications:publications.filter(x=>x.title&&x.url).map(({slug,...p})=>p)},null,2)+'\n');
console.log('World Builder CMS:',bySlug.size,'projects,',publications.length,'publication files');
