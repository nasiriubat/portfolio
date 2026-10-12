export type Project={title:string;category:string;status:string;url:string;description:string;featured:boolean};
export type Publication={title:string;venue:string;year:string;url:string};
const p=import.meta.glob('../content/projects/*.json',{eager:true,import:'default'}) as Record<string,Project>;
const papers=import.meta.glob('../content/publications/*.json',{eager:true,import:'default'}) as Record<string,Publication>;
export const projects=Object.values(p);
export const publications=Object.values(papers).filter(p=>p.title&&p.url);
