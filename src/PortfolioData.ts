export type CareerEntry = {
  role: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  technologies: string[];
};
export const experience: CareerEntry[] = [
  {
    role: 'Project Researcher',
    organization: 'GPT Lab · Tampere University',
    location: 'Tampere, Finland',
    period: 'Jan 2026 — Present',
    summary: 'I research agentic workflows and long-term memory for AI systems. My work combines prototype development with reproducible evaluation of retrieval, learning and system reliability.',
    technologies: ['AI agents', 'Long-term memory', 'RAG', 'Evaluation']
  },
  {
    role: 'Research Assistant',
    organization: 'GPT Lab · Tampere University',
    location: 'Tampere, Finland',
    period: 'Oct 2024 — Dec 2025',
    summary: 'Built LLM-based tools and retrieval-augmented applications. Experimented with retrieval strategies, model orchestration and domain-specific research prototypes.',
    technologies: ['Python', 'LangChain', 'React', 'LLMs']
  },
  {
    role: 'Software Developer',
    organization: 'AutonomyBD Ltd.',
    location: 'Dhaka, Bangladesh',
    period: 'Oct 2022 — Jun 2023',
    summary: 'Developed and extended business applications, built REST APIs, delivered new functionality and collaborated closely with front-end engineers.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Node.js']
  },
  {
    role: 'Software Developer',
    organization: 'Inilabs Network',
    location: 'Dhaka, Bangladesh',
    period: 'Feb 2021 — Sep 2022',
    summary: 'Implemented customer-requested features, improved existing software, built APIs and provided ongoing application support and debugging.',
    technologies: ['PHP', 'CodeIgniter', 'REST APIs', 'JavaScript']
  }
];
export const education = [
  {
    degree: "Master's in Computing Sciences",
    institution: 'Tampere University',
    place: 'Tampere, Finland',
    period: '2023 — 2025',
    detail: 'Software, Web and Cloud'
  },
  {
    degree: 'BSc in Computer Science & Engineering',
    institution: 'IUBAT',
    place: 'Dhaka, Bangladesh',
    period: '2017 — 2021',
    detail: 'CGPA 3.94 / 4.00'
  }
];
export const certifications = [
  'Full Stack (MERN) Bootcamp',
  'Model Context Protocol: Advanced Topics',
  'Introduction to Model Context Protocol',
  'Claude Code 101',
  'GenAI in Software Engineering · GPT Lab',
  'SQL Intermediate · Sololearn'
];
export const capabilities = [
  { number:'01',title:'Software products',details:'React, Laravel, Python and end-to-end applications',label:'Designing for real use' },
  { number:'02',title:'Agentic systems',details:'Tools, retrieval, memory and multi-step reasoning',label:'Turning models into systems' },
  { number:'03',title:'Applied research',details:'Evaluation, reliability and reproducible experiments',label:'Measuring what matters' }
];
