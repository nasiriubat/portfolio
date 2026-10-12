export type Project={title:string;category:string;status:string;url:string;description:string;featured:boolean;slug:string;image?:string;features?:string[];workflow?:string[];stack?:string[]};
export type Publication={title:string;venue:string;year:string;url:string};
const raw=import.meta.glob('../content/projects/*.json',{eager:true,import:'default'}) as Record<string,Omit<Project,'slug'>>;
const papers=import.meta.glob('../content/publications/*.json',{eager:true,import:'default'}) as Record<string,Publication>;
const aliases:Record<string,string>={leavehub:'leave-management','leave-management':'leave-management',nexteurotrip:'trip-planner','trip-planner':'trip-planner'};
const entries=Object.entries(raw).map(([file,p])=>({...p,slug:file.split('/').pop()!.replace('.json','')}));
const preferred=new Map<string,Project>();
for(const p of entries){const key=aliases[p.slug]||p.slug;const previous=preferred.get(key);if(!previous||p.description.length>previous.description.length)preferred.set(key,p)}
export const projects=[...preferred.values()].sort((a,b)=>Number(b.featured)-Number(a.featured)||a.title.localeCompare(b.title));
export const publications=Object.values(papers).filter(p=>p.title&&p.url);

export function publicLink(project:Project):string|null{
  try{
    const url=new URL(project.url);
    return url.protocol==='https:'&&!url.hostname.endsWith('github.com')?url.href:null;
  }catch{return null;}
}
