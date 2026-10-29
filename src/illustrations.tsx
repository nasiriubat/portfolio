// Illustrations for the Story view. Each project slug can have its own drawing;
// projects added later through the CMS fall back to a generic one.
import React from 'react';

export const spotlightArt: Record<string, () => JSX.Element> = {
  'group-chat-assistant': () => (
    <svg viewBox="0 0 560 400" style={{width:'100%',display:'block'}} role="img" aria-label="Messages from four chat platforms are indexed with hybrid search, then answered with cited sources">
    <g className="sp o7 r1">
    <rect x="24" y="70" width="120" height="40" rx="20" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect><text x="84" y="95" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="12" fill="#121826">WhatsApp</text>
    <rect x="24" y="130" width="120" height="40" rx="20" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect><text x="84" y="155" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="12" fill="#121826">Telegram</text>
    <rect x="24" y="190" width="120" height="40" rx="20" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect><text x="84" y="215" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="12" fill="#121826">Discord</text>
    <rect x="24" y="250" width="120" height="40" rx="20" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect><text x="84" y="275" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="12" fill="#121826">Slack</text>
    </g>
    <path className="flow" d="M146 90 C180 90 180 180 210 180 M146 150 C180 150 180 180 210 180 M146 210 C180 210 180 180 210 180 M146 270 C180 270 180 180 210 180" stroke="#3557e6" strokeWidth="1.6" fill="none"></path>
    <g className="sp o5 r2">
    <rect x="212" y="110" width="120" height="140" rx="14" fill="#fff" stroke="#3557e6" strokeWidth="1.5"></rect>
    <text x="272" y="138" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#2a47c4">hybrid index</text>
    <rect x="228" y="152" width="40" height="8" rx="4" fill="#3557e6"></rect><rect x="274" y="152" width="42" height="8" rx="4" fill="#c9d1f3"></rect>
    <rect x="228" y="168" width="60" height="8" rx="4" fill="#c9d1f3"></rect><rect x="294" y="168" width="22" height="8" rx="4" fill="#3557e6"></rect>
    <rect x="228" y="184" width="30" height="8" rx="4" fill="#3557e6"></rect><rect x="264" y="184" width="52" height="8" rx="4" fill="#c9d1f3"></rect>
    <text x="272" y="222" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#5a6273">vector + full-text</text>
    <text x="272" y="236" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#5a6273">→ rerank</text>
    </g>
    <path className="flow" d="M334 180 H372" stroke="#3557e6" strokeWidth="2" fill="none"></path>
    <g className="sp o8 r3">
    <rect x="376" y="100" width="164" height="110" rx="14" fill="#3557e6"></rect>
    <rect x="392" y="120" width="128" height="6" rx="3" fill="#fff" opacity=".9"></rect><rect x="392" y="134" width="112" height="6" rx="3" fill="#fff" opacity=".9"></rect><rect x="392" y="148" width="90" height="6" rx="3" fill="#fff" opacity=".9"></rect>
    <rect x="392" y="170" width="26" height="20" rx="6" fill="#fff"></rect><text x="405" y="184" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#2a47c4">[1]</text>
    <rect x="424" y="170" width="26" height="20" rx="6" fill="#fff"></rect><text x="437" y="184" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#2a47c4">[2]</text>
    </g>
    <g className="sp o4 r4">
    <rect x="376" y="228" width="164" height="62" rx="12" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <text x="392" y="252" fontFamily="Geist Mono, monospace" fontSize="10" fill="#5a6273">[1] message · Tue</text>
    <rect x="392" y="262" width="120" height="6" rx="3" fill="#c5cad5"></rect><rect x="392" y="274" width="80" height="6" rx="3" fill="#c5cad5"></rect>
    </g>
    </svg>
  ),
  'ai-ticket': () => (
    <svg viewBox="0 0 560 400" style={{width:'100%',display:'block'}} role="img" aria-label="A visitor asks through the chat widget, AI drafts an answer from the knowledge base, and unresolved requests become tickets for agents">
    <g className="sp o7 r1">
    <rect x="20" y="40" width="210" height="300" rx="14" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <path d="M20 72h210" stroke="#e6e8ec" strokeWidth="1.5"></path>
    <circle cx="38" cy="56" r="4" fill="#d9dce3"></circle><circle cx="52" cy="56" r="4" fill="#d9dce3"></circle>
    <rect x="38" y="92" width="120" height="10" rx="5" fill="#121826" opacity=".8"></rect>
    <rect x="38" y="112" width="160" height="6" rx="3" fill="#c5cad5"></rect><rect x="38" y="126" width="130" height="6" rx="3" fill="#c5cad5"></rect>
    <text x="38" y="330" fontFamily="Geist Mono, monospace" fontSize="10" fill="#5a6273">customer website</text>
    </g>
    <g className="sp o3 r2">
    <rect x="70" y="160" width="146" height="150" rx="14" fill="#fff" stroke="#3557e6" strokeWidth="1.5"></rect>
    <rect x="70" y="160" width="146" height="30" rx="14" fill="#3557e6"></rect><rect x="70" y="176" width="146" height="14" fill="#3557e6"></rect>
    <text x="86" y="180" fontFamily="Geist Mono, monospace" fontSize="10" fill="#fff">support</text>
    <rect x="84" y="202" width="96" height="24" rx="10" fill="#f3f4f6"></rect><rect x="94" y="211" width="70" height="6" rx="3" fill="#9aa6c6"></rect>
    <rect x="108" y="234" width="96" height="30" rx="10" fill="#eef1fd"></rect><rect x="118" y="243" width="70" height="5" rx="2.5" fill="#3557e6" opacity=".6"></rect><rect x="118" y="253" width="50" height="5" rx="2.5" fill="#3557e6" opacity=".6"></rect>
    <rect x="84" y="274" width="50" height="22" rx="10" fill="#f3f4f6"></rect>
    <circle className="tdot" cx="98" cy="285" r="2.6" fill="#5a6273"></circle><circle className="tdot t2" cx="108" cy="285" r="2.6" fill="#5a6273"></circle><circle className="tdot t3" cx="118" cy="285" r="2.6" fill="#5a6273"></circle>
    </g>
    <path className="flow" d="M218 230 C250 230 250 120 286 120" stroke="#3557e6" strokeWidth="1.6" fill="none"></path>
    <path className="flow" d="M218 250 C250 250 250 284 286 284" stroke="#9aa6c6" strokeWidth="1.6" fill="none"></path>
    <g className="sp o2 r2">
    <rect x="290" y="62" width="250" height="120" rx="14" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <text x="308" y="90" fontFamily="Space Grotesk, sans-serif" fontSize="14" fontWeight="600" fill="#121826">AI assist</text>
    <rect x="430" y="76" width="92" height="22" rx="11" fill="#eef1fd"></rect><text x="476" y="91" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#2a47c4">knowledge base</text>
    <rect x="308" y="110" width="200" height="6" rx="3" fill="#c5cad5"></rect><rect x="308" y="124" width="170" height="6" rx="3" fill="#c5cad5"></rect>
    <rect x="308" y="146" width="96" height="24" rx="8" fill="#3557e6"></rect><text x="356" y="162" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#fff">send reply</text>
    </g>
    <g className="sp o4 r3">
    <rect x="290" y="206" width="250" height="134" rx="14" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <text x="308" y="232" fontFamily="Space Grotesk, sans-serif" fontSize="14" fontWeight="600" fill="#121826">Tickets</text>
    <circle cx="314" cy="256" r="4" fill="#b45309"></circle><rect x="326" y="253" width="120" height="6" rx="3" fill="#9aa6c6"></rect><text x="522" y="259" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" fill="#b45309">open</text>
    <circle cx="314" cy="282" r="4" fill="#3557e6"></circle><rect x="326" y="279" width="100" height="6" rx="3" fill="#9aa6c6"></rect><text x="522" y="285" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" fill="#2a47c4">assigned</text>
    <circle cx="314" cy="308" r="4" fill="#15803d"></circle><rect x="326" y="305" width="110" height="6" rx="3" fill="#9aa6c6"></rect><text x="522" y="311" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" fill="#15803d">solved</text>
    </g>
    </svg>
  ),
  'ai-interview': () => (
    <svg viewBox="0 0 560 400" style={{width:'100%',display:'block'}} role="img" aria-label="Guided interview rounds feed a decision log, which produces a developer-ready specification">
    <g className="sp o1 r1">
    <rect x="20" y="40" width="200" height="320" rx="14" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <text x="38" y="68" fontFamily="Space Grotesk, sans-serif" fontSize="14" fontWeight="600" fill="#121826">Interview</text>
    <text x="186" y="68" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" fill="#5a6273">round 2</text>
    <rect x="36" y="84" width="150" height="40" rx="12" fill="#eef1fd"></rect><rect x="48" y="96" width="120" height="5" rx="2.5" fill="#3557e6" opacity=".6"></rect><rect x="48" y="107" width="80" height="5" rx="2.5" fill="#3557e6" opacity=".6"></rect>
    <rect x="70" y="134" width="134" height="40" rx="12" fill="#f3f4f6"></rect><rect x="82" y="146" width="104" height="5" rx="2.5" fill="#9aa6c6"></rect><rect x="82" y="157" width="70" height="5" rx="2.5" fill="#9aa6c6"></rect>
    <rect x="36" y="184" width="150" height="40" rx="12" fill="#eef1fd"></rect><rect x="48" y="196" width="110" height="5" rx="2.5" fill="#3557e6" opacity=".6"></rect><rect x="48" y="207" width="90" height="5" rx="2.5" fill="#3557e6" opacity=".6"></rect>
    <rect x="70" y="234" width="134" height="30" rx="12" fill="#f3f4f6"></rect>
    <circle className="tdot" cx="88" cy="249" r="2.6" fill="#5a6273"></circle><circle className="tdot t2" cx="98" cy="249" r="2.6" fill="#5a6273"></circle><circle className="tdot t3" cx="108" cy="249" r="2.6" fill="#5a6273"></circle>
    <rect x="36" y="310" width="168" height="32" rx="10" fill="#fff" stroke="#d9dce3"></rect><rect x="48" y="323" width="90" height="6" rx="3" fill="#d9dce3"></rect>
    </g>
    <path className="flow" d="M222 150 H256" stroke="#3557e6" strokeWidth="2" fill="none"></path>
    <g className="sp o5 r2">
    <rect x="260" y="70" width="130" height="200" rx="14" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <text x="276" y="96" fontFamily="Geist Mono, monospace" fontSize="10" fill="#5a6273">decision log</text>
    <circle cx="282" cy="120" r="5" fill="#3557e6"></circle><rect x="294" y="117" width="80" height="6" rx="3" fill="#c5cad5"></rect>
    <circle cx="282" cy="146" r="5" fill="#3557e6"></circle><rect x="294" y="143" width="66" height="6" rx="3" fill="#c5cad5"></rect>
    <circle cx="282" cy="172" r="5" fill="#fff" stroke="#3557e6" strokeWidth="1.5"></circle><rect x="294" y="169" width="74" height="6" rx="3" fill="#c5cad5"></rect>
    <circle cx="282" cy="198" r="5" fill="#3557e6"></circle><rect x="294" y="195" width="58" height="6" rx="3" fill="#c5cad5"></rect>
    <path d="M282 125 V193" stroke="#c9d1f3" strokeWidth="1.5"></path>
    <text x="276" y="250" fontFamily="Geist Mono, monospace" fontSize="9" fill="#5a6273">assumptions · 3</text>
    </g>
    <path className="flow" d="M392 170 H420" stroke="#3557e6" strokeWidth="2" fill="none"></path>
    <g className="sp o8 r3">
    <rect x="424" y="40" width="116" height="320" rx="14" fill="#fff" stroke="#3557e6" strokeWidth="1.5"></rect>
    <text x="440" y="68" fontFamily="Geist Mono, monospace" fontSize="11" fill="#121826">spec.md</text>
    <text x="440" y="98" fontFamily="Geist Mono, monospace" fontSize="9" fill="#3557e6">## Problem</text>
    <rect x="440" y="106" width="84" height="5" rx="2.5" fill="#c5cad5"></rect><rect x="440" y="116" width="66" height="5" rx="2.5" fill="#c5cad5"></rect>
    <text x="440" y="146" fontFamily="Geist Mono, monospace" fontSize="9" fill="#3557e6">## Requirements</text>
    <rect x="440" y="154" width="80" height="5" rx="2.5" fill="#c5cad5"></rect><rect x="440" y="164" width="84" height="5" rx="2.5" fill="#c5cad5"></rect><rect x="440" y="174" width="60" height="5" rx="2.5" fill="#c5cad5"></rect>
    <text x="440" y="204" fontFamily="Geist Mono, monospace" fontSize="9" fill="#3557e6">## Decisions</text>
    <rect x="440" y="212" width="78" height="5" rx="2.5" fill="#c5cad5"></rect><rect x="440" y="222" width="54" height="5" rx="2.5" fill="#c5cad5"></rect>
    </g>
    <g className="sp o4 r4">
    <circle cx="482" cy="306" r="22" fill="#15803d"></circle><path d="m472 306 7 7 13-14" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"></path>
    </g>
    </svg>
  ),
  'leave-management': () => (
    <svg viewBox="0 0 560 400" style={{width:'100%',display:'block'}} role="img" aria-label="A leave request moves through manager and HR approval while the team calendar and balance update">
    <g className="sp o1 r1">
    <rect x="24" y="40" width="260" height="250" rx="14" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <text x="42" y="70" fontFamily="Space Grotesk, sans-serif" fontSize="15" fontWeight="600" fill="#121826">Team calendar</text>
    <text x="48" y="98" fontFamily="Geist Mono, monospace" fontSize="10" fill="#5a6273">M      T      W      T      F      S      S</text>
    <rect x="42" y="110" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="76" y="110" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="110" y="110" width="24" height="24" rx="6" fill="#3557e6"></rect><rect x="144" y="110" width="24" height="24" rx="6" fill="#3557e6"></rect><rect x="178" y="110" width="24" height="24" rx="6" fill="#3557e6"></rect><rect x="212" y="110" width="24" height="24" rx="6" fill="#fafafa" stroke="#e6e8ec"></rect><rect x="246" y="110" width="24" height="24" rx="6" fill="#fafafa" stroke="#e6e8ec"></rect>
    <rect x="42" y="144" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="76" y="144" width="24" height="24" rx="6" fill="#c9d1f3"></rect><rect x="110" y="144" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="144" y="144" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="178" y="144" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="212" y="144" width="24" height="24" rx="6" fill="#fafafa" stroke="#e6e8ec"></rect><rect x="246" y="144" width="24" height="24" rx="6" fill="#fafafa" stroke="#e6e8ec"></rect>
    <rect x="42" y="178" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="76" y="178" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="110" y="178" width="24" height="24" rx="6" fill="#fef3c7"></rect><rect x="144" y="178" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="178" y="178" width="24" height="24" rx="6" fill="#c9d1f3"></rect><rect x="212" y="178" width="24" height="24" rx="6" fill="#fafafa" stroke="#e6e8ec"></rect><rect x="246" y="178" width="24" height="24" rx="6" fill="#fafafa" stroke="#e6e8ec"></rect>
    <rect x="42" y="212" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="76" y="212" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="110" y="212" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="144" y="212" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="178" y="212" width="24" height="24" rx="6" fill="#f3f4f6"></rect><rect x="212" y="212" width="24" height="24" rx="6" fill="#fafafa" stroke="#e6e8ec"></rect><rect x="246" y="212" width="24" height="24" rx="6" fill="#fafafa" stroke="#e6e8ec"></rect>
    <text x="42" y="268" fontFamily="Geist Mono, monospace" fontSize="10" fill="#5a6273">holiday · leave · pending</text>
    </g>
    <g className="sp o2 r2">
    <rect x="304" y="40" width="232" height="56" rx="12" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <text x="320" y="64" fontFamily="Geist Mono, monospace" fontSize="10" fill="#5a6273">request</text>
    <text x="320" y="82" fontFamily="Geist Mono, monospace" fontSize="12" fill="#121826">3 working days</text>
    </g>
    <path className="flow" d="M420 98 V118" stroke="#3557e6" strokeWidth="2" fill="none"></path>
    <g className="sp o8 r3">
    <rect x="304" y="120" width="232" height="48" rx="12" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <circle cx="328" cy="144" r="9" fill="#15803d"></circle><path d="m324 144 3 3 5-6" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round"></path>
    <text x="346" y="148" fontFamily="Geist Mono, monospace" fontSize="12" fill="#121826">Manager approved</text>
    </g>
    <path className="flow" d="M420 170 V190" stroke="#3557e6" strokeWidth="2" fill="none"></path>
    <g className="sp o4 r3">
    <rect x="304" y="192" width="232" height="48" rx="12" fill="#fff" stroke="#3557e6" strokeWidth="1.5"></rect>
    <circle cx="328" cy="216" r="9" fill="#eef1fd" stroke="#3557e6" strokeWidth="1.5"></circle>
    <circle className="tdot" cx="328" cy="216" r="3" fill="#3557e6"></circle>
    <text x="346" y="220" fontFamily="Geist Mono, monospace" fontSize="12" fill="#121826">HR review</text>
    </g>
    <g className="sp o6 r4">
    <rect x="24" y="310" width="512" height="56" rx="12" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <text x="42" y="343" fontFamily="Geist Mono, monospace" fontSize="11" fill="#5a6273">balance</text>
    <rect x="110" y="333" width="400" height="12" rx="6" fill="#eef1fd"></rect>
    <rect x="110" y="333" width="250" height="12" rx="6" fill="#3557e6"></rect>
    <rect x="360" y="333" width="40" height="12" fill="#c9d1f3"></rect>
    </g>
    </svg>
  ),
};

export const cardArt: Record<string, () => JSX.Element> = {
  'deadline-district': () => (
    <svg viewBox="0 0 360 200" style={{width:'100%',display:'block'}} aria-hidden="true">
    <rect x="20" y="96" width="44" height="104" fill="#d9dce3"></rect><rect x="70" y="70" width="36" height="130" fill="#c5cad5"></rect><rect x="112" y="110" width="50" height="90" fill="#d9dce3"></rect>
    <rect x="168" y="50" width="40" height="150" fill="#b9bfcc"></rect><rect x="214" y="90" width="54" height="110" fill="#d9dce3"></rect><rect x="274" y="64" width="40" height="136" fill="#c5cad5"></rect><rect x="320" y="104" width="40" height="96" fill="#d9dce3"></rect>
    <rect x="78" y="84" width="8" height="8" fill="#fff"></rect><rect x="92" y="104" width="8" height="8" fill="#fff"></rect><rect x="178" y="70" width="8" height="8" fill="#f2c27b"></rect><rect x="190" y="100" width="8" height="8" fill="#fff"></rect><rect x="284" y="84" width="8" height="8" fill="#fff"></rect>
    <g className="scope">
    <circle cx="160" cy="96" r="38" fill="rgba(238,241,253,.35)" stroke="#3557e6" strokeWidth="2"></circle>
    <path d="M160 52v24m0 40v24M116 96h24m40 0h24" stroke="#3557e6" strokeWidth="1.6"></path>
    <circle cx="160" cy="96" r="2.5" fill="#b91c1c"></circle>
    </g>
    </svg>
  ),
  'trip-planner': () => (
    <svg viewBox="0 0 360 200" style={{width:'100%',display:'block'}} aria-hidden="true">
    <path d="M40 160 C90 150 100 100 150 104 S210 60 250 66" stroke="#c9d1f3" strokeWidth="10" fill="none" strokeLinecap="round"></path>
    <path className="flow" d="M40 160 C90 150 100 100 150 104 S210 60 250 66" stroke="#3557e6" strokeWidth="2" fill="none"></path>
    <path className="flow" d="M250 66 L316 40 M250 66 L320 120" stroke="#9aa6c6" strokeWidth="2" fill="none"></path>
    <circle cx="40" cy="160" r="9" fill="#fff" stroke="#3557e6" strokeWidth="2"></circle><text x="30" y="186" fontFamily="Geist Mono, monospace" fontSize="10" fill="#121826">DAY 1</text>
    <circle cx="150" cy="104" r="7" fill="#eef1fd" stroke="#3557e6" strokeWidth="2"></circle><text x="138" y="130" fontFamily="Geist Mono, monospace" fontSize="10" fill="#121826">DAY 2</text>
    <circle cx="250" cy="66" r="7" fill="#eef1fd" stroke="#3557e6" strokeWidth="2"></circle>
    <circle cx="316" cy="40" r="6" fill="#fff" stroke="#9aa6c6" strokeWidth="2"></circle>
    <g className="flt f1"><path d="M320 92c-8 0-14 6-14 13 0 10 14 21 14 21s14-11 14-21c0-7-6-13-14-13z" fill="#3557e6"></path><circle cx="320" cy="105" r="5" fill="#fff"></circle></g>
    </svg>
  ),
  'blur-it': () => (
    <svg viewBox="0 0 360 200" style={{width:'100%',display:'block'}} aria-hidden="true">
    <defs><filter id="blur-it-filter" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="3.5"></feGaussianBlur></filter></defs>
    <rect x="40" y="24" width="280" height="152" rx="12" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <text x="60" y="58" fontFamily="Geist Mono, monospace" fontSize="12" fill="#5a6273">OPENAI_API_KEY=</text>
    <g className="blurred" filter="url(#blur-it-filter)"><text x="176" y="58" fontFamily="Geist Mono, monospace" fontSize="12" fill="#121826">sk-proj-7Hq2…xK9</text></g>
    <text x="60" y="90" fontFamily="Geist Mono, monospace" fontSize="12" fill="#5a6273">email:</text>
    <g className="blurred" filter="url(#blur-it-filter)"><text x="112" y="90" fontFamily="Geist Mono, monospace" fontSize="12" fill="#121826">someone@example.com</text></g>
    <text x="60" y="122" fontFamily="Geist Mono, monospace" fontSize="12" fill="#5a6273">password:</text>
    <g className="blurred" filter="url(#blur-it-filter)"><text x="136" y="122" fontFamily="Geist Mono, monospace" fontSize="12" fill="#121826">hunter2-correct</text></g>
    <g className="flt f3"><rect x="232" y="136" width="72" height="26" rx="13" fill="#3557e6"></rect><text x="268" y="153" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#fff">hover me</text></g>
    </svg>
  ),
  'scholarbro': () => (
    <svg viewBox="0 0 360 200" style={{width:'100%',display:'block'}} aria-hidden="true">
    <rect x="44" y="40" width="130" height="140" rx="10" fill="#fff" stroke="#d9dce3" strokeWidth="1.5" transform="rotate(-6 109 110)"></rect>
    <rect x="70" y="30" width="130" height="140" rx="10" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <rect x="86" y="50" width="90" height="8" rx="4" fill="#121826" opacity=".8"></rect>
    <rect x="86" y="68" width="100" height="5" rx="2.5" fill="#c5cad5"></rect><rect x="86" y="80" width="80" height="5" rx="2.5" fill="#c5cad5"></rect><rect x="86" y="92" width="96" height="5" rx="2.5" fill="#c5cad5"></rect>
    <rect x="86" y="140" width="64" height="20" rx="10" fill="#3557e6"></rect><text x="118" y="154" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#fff">follow</text>
    <path className="flow" d="M200 90 L250 60 M200 90 L262 112 M250 60 L300 84 M262 112 L300 84 M262 112 L296 156" stroke="#3557e6" strokeWidth="1.5" fill="none"></path>
    <circle cx="250" cy="60" r="9" fill="#eef1fd" stroke="#3557e6" strokeWidth="1.5"></circle><circle cx="262" cy="112" r="11" fill="#3557e6"></circle><circle cx="300" cy="84" r="7" fill="#fff" stroke="#9aa6c6" strokeWidth="1.5"></circle><circle cx="296" cy="156" r="7" fill="#fff" stroke="#9aa6c6" strokeWidth="1.5"></circle>
    </svg>
  ),
  'wcag-checker': () => (
    <svg viewBox="0 0 360 200" style={{width:'100%',display:'block'}} aria-hidden="true">
    <rect x="30" y="20" width="200" height="164" rx="10" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <rect x="44" y="36" width="110" height="10" rx="5" fill="#121826" opacity=".8"></rect>
    <rect x="44" y="56" width="168" height="6" rx="3" fill="#c5cad5"></rect><rect x="44" y="68" width="140" height="6" rx="3" fill="#c5cad5"></rect>
    <rect x="44" y="86" width="76" height="52" rx="6" fill="#eceef2"></rect><rect x="128" y="86" width="84" height="52" rx="6" fill="#eceef2"></rect>
    <rect x="44" y="150" width="64" height="22" rx="6" fill="#d6dae3"></rect>
    <rect className="scan" x="32" y="-10" width="196" height="3" fill="#3557e6" opacity=".8" style={{transformOrigin:'0 0'}}></rect>
    <rect className="pop" x="40" y="82" width="84" height="60" rx="8" fill="none" stroke="#b91c1c" strokeWidth="2" strokeDasharray="5 4"></rect>
    <rect className="pop pp2" x="40" y="146" width="72" height="30" rx="8" fill="none" stroke="#b45309" strokeWidth="2" strokeDasharray="5 4"></rect>
    <g className="flt f2"><rect x="246" y="40" width="96" height="30" rx="15" fill="#fef2f2" stroke="#fecaca"></rect><text x="294" y="59" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#b91c1c">critical</text></g>
    <g className="flt f4"><rect x="246" y="84" width="96" height="30" rx="15" fill="#fffbeb" stroke="#fde68a"></rect><text x="294" y="103" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#b45309">serious</text></g>
    <g className="flt f6"><rect x="246" y="128" width="96" height="30" rx="15" fill="#121826"></rect><text x="294" y="147" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#fff">PDF · CSV</text></g>
    </svg>
  ),
  'coscribe': () => (
    <svg viewBox="0 0 360 200" style={{width:'100%',display:'block'}} aria-hidden="true">
    <rect x="40" y="18" width="170" height="170" rx="10" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <text x="56" y="44" fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="600" fill="#121826">3 · Method</text>
    <rect x="56" y="58" width="134" height="6" rx="3" fill="#c5cad5"></rect><rect x="56" y="70" width="80" height="6" rx="3" fill="#c5cad5"></rect><rect x="140" y="67" width="22" height="12" rx="4" fill="#eef1fd"></rect><text x="151" y="76" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="#2a47c4">[3]</text>
    <rect x="56" y="88" width="130" height="6" rx="3" fill="#c5cad5"></rect><rect x="56" y="100" width="100" height="6" rx="3" fill="#c5cad5"></rect>
    <rect x="56" y="112" width="60" height="6" rx="3" fill="#c5cad5"></rect><rect x="120" y="109" width="22" height="12" rx="4" fill="#eef1fd"></rect><text x="131" y="118" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="#2a47c4">[7]</text>
    <rect x="56" y="140" width="138" height="32" rx="8" fill="#f0fdf4" stroke="#bbe5c8"></rect>
    <circle cx="72" cy="156" r="7" fill="#15803d"></circle><path d="m68.5 156 2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"></path>
    <text x="86" y="160" fontFamily="Geist Mono, monospace" fontSize="9" fill="#14532d">citations verified</text>
    <g className="flt f1"><rect x="236" y="40" width="88" height="32" rx="16" fill="#fff" stroke="#d9dce3"></rect><text x="280" y="60" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#121826">PDF</text></g>
    <g className="flt f3"><rect x="236" y="86" width="88" height="32" rx="16" fill="#fff" stroke="#d9dce3"></rect><text x="280" y="106" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#121826">DOCX</text></g>
    <g className="flt f5"><rect x="236" y="132" width="88" height="32" rx="16" fill="#121826"></rect><text x="280" y="152" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#fff">LaTeX</text></g>
    </svg>
  ),
};

export const SpotlightFallback = ({ title }: { title: string }) => (
  <svg viewBox="0 0 560 400" role="img" aria-label={title + ' illustration'}>
    <g className="sp o7 r1">
      <rect x="24" y="40" width="300" height="320" rx="14" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
      <path d="M24 74h300" stroke="#e6e8ec" strokeWidth="1.5"></path>
      <circle cx="44" cy="57" r="4" fill="#d9dce3"></circle><circle cx="58" cy="57" r="4" fill="#d9dce3"></circle>
      <rect x="44" y="96" width="150" height="12" rx="6" fill="#121826" opacity=".85"></rect>
      <rect x="44" y="122" width="250" height="7" rx="3.5" fill="#c5cad5"></rect><rect x="44" y="136" width="200" height="7" rx="3.5" fill="#c5cad5"></rect>
      <rect x="44" y="164" width="120" height="90" rx="10" fill="#eef1fd"></rect><rect x="176" y="164" width="120" height="90" rx="10" fill="#f3f4f6"></rect>
      <rect x="44" y="290" width="110" height="34" rx="8" fill="#3557e6"></rect>
    </g>
    <path className="flow" d="M326 200 H370" stroke="#3557e6" strokeWidth="2" fill="none"></path>
    <g className="sp o8 r2">
      <circle cx="430" cy="140" r="16" fill="#eef1fd" stroke="#3557e6" strokeWidth="2"></circle>
      <circle cx="470" cy="230" r="26" fill="#3557e6"></circle>
      <circle cx="400" cy="300" r="12" fill="#fff" stroke="#9aa6c6" strokeWidth="2"></circle>
      <path className="flow" d="M430 156 L466 206 M454 248 L410 290" stroke="#3557e6" strokeWidth="1.6" fill="none"></path>
    </g>
  </svg>
);

export const CardFallback = () => (
  <svg viewBox="0 0 360 200" aria-hidden="true">
    <rect x="40" y="24" width="200" height="152" rx="12" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
    <rect x="58" y="46" width="110" height="10" rx="5" fill="#121826" opacity=".8"></rect>
    <rect x="58" y="68" width="160" height="6" rx="3" fill="#c5cad5"></rect><rect x="58" y="80" width="120" height="6" rx="3" fill="#c5cad5"></rect>
    <rect x="58" y="104" width="70" height="52" rx="8" fill="#eef1fd"></rect><rect x="138" y="104" width="80" height="52" rx="8" fill="#f3f4f6"></rect>
    <g className="flt f2"><circle cx="292" cy="80" r="22" fill="#3557e6"></circle><path d="m282 80 7 7 13-14" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"></path></g>
    <g className="flt f4"><rect x="262" y="124" width="64" height="26" rx="13" fill="#fff" stroke="#d9dce3"></rect></g>
  </svg>
);

export const HeroArt = ({ photo, name }: { photo: string; name: string }) => (
  <div className="s-hero-vis" style={{position:'relative',width:'100%',maxWidth:'560px',aspectRatio:'56 / 48',margin:'0 auto'}}>
  <svg style={{position:'absolute',left:'4%',top:'0',width:'92%',height:'100%',overflow:'visible'}} viewBox="0 0 500 440"><ellipse className="flow" cx="250" cy="225" rx="232" ry="190" fill="none" stroke="#c9d1f3" strokeWidth="1.2"></ellipse></svg>


  <div className="hx o6" style={{position:'absolute',left:'17%',bottom:'0',width:'66%',height:'80%'}}>
  <div className="asm d1" style={{position:'absolute',inset:'0'}}>
  <div style={{position:'absolute',inset:'0',borderRadius:'999px 999px 0 0',background:'#eef1fd',border:'1.5px solid #c9d1f3',borderBottom:'0',overflow:'hidden'}}>
  <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{position:'absolute',inset:'0',width:'100%',height:'100%'}} aria-hidden="true"><path d="M0 70 Q25 60 50 68 T100 62" stroke="#c9d1f3" strokeWidth=".6" fill="none"></path><path d="M0 84 Q30 76 55 82 T100 78" stroke="#c9d1f3" strokeWidth=".6" fill="none"></path></svg>
  </div>
  </div>
  <div className="asm d3" style={{position:'absolute',left:'3%',right:'3%',bottom:'0',clipPath:'inset(-40% -20% 0 -20%)'}}>
  <img src={photo} alt={"Portrait of " + name} style={{display:'block',width:'100%',height:'auto',filter:'drop-shadow(0 18px 24px rgba(18,24,38,.18))'}}/>
  </div>
  <div style={{position:'absolute',left:'-6%',right:'-6%',bottom:'0',height:'1.5px',background:'#c9d1f3'}}></div>
  </div>


  <div className="hx o2" style={{position:'absolute',left:'66%',top:'2%',width:'36%',zIndex:'2'}}>
  <div className="asm d3"><div className="flt f1">
  <svg viewBox="0 0 200 120" style={{width:'100%',display:'block',filter:'drop-shadow(0 14px 24px rgba(18,24,38,.14))'}}>
  <rect width="200" height="120" rx="12" fill="#161b26"></rect>
  <text x="14" y="24" fontFamily="Geist Mono, monospace" fontSize="10" fill="#7d879c">retrieve.py</text>
  <rect x="14" y="38" width="38" height="6" rx="3" fill="#8ea2ff"></rect><rect x="58" y="38" width="70" height="6" rx="3" fill="#c9d1e3"></rect>
  <rect x="26" y="54" width="54" height="6" rx="3" fill="#7fd1b9"></rect><rect x="86" y="54" width="80" height="6" rx="3" fill="#c9d1e3"></rect>
  <rect x="26" y="70" width="90" height="6" rx="3" fill="#c9d1e3"></rect><rect x="122" y="70" width="40" height="6" rx="3" fill="#f2c27b"></rect>
  <rect x="14" y="86" width="60" height="6" rx="3" fill="#8ea2ff"></rect><rect x="80" y="86" width="50" height="6" rx="3" fill="#c9d1e3"></rect>
  <rect x="26" y="102" width="6" height="8" fill="#8ea2ff" className="tdot"></rect>
  </svg>
  </div></div>
  </div>


  <div className="hx o3" style={{position:'absolute',left:'-4%',top:'52%',width:'34%',zIndex:'2'}}>
  <div className="asm d4"><div className="flt f2">
  <svg viewBox="0 0 190 82" style={{width:'100%',display:'block',filter:'drop-shadow(0 12px 22px rgba(18,24,38,.08))'}}>
  <rect x="0.75" y="0.75" width="188.5" height="80.5" rx="14" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
  <circle cx="26" cy="41" r="13" fill="#eef1fd"></circle>
  <path d="M20 41a6 6 0 0 1 12 0m-9 6h6" stroke="#3557e6" strokeWidth="1.6" fill="none" strokeLinecap="round"></path>
  <rect x="50" y="26" width="110" height="7" rx="3.5" fill="#121826" opacity=".8"></rect>
  <rect x="50" y="42" width="124" height="6" rx="3" fill="#c5cad5"></rect><rect x="50" y="55" width="84" height="6" rx="3" fill="#c5cad5"></rect>
  </svg>
  </div></div>
  </div>


  <div className="hx o4" style={{position:'absolute',left:'70%',top:'62%',width:'33%',zIndex:'2'}}>
  <div className="asm d5"><div className="flt f3">
  <svg viewBox="0 0 190 120" style={{width:'100%',display:'block',filter:'drop-shadow(0 12px 22px rgba(18,24,38,.08))'}}>
  <rect x="0.75" y="0.75" width="188.5" height="118.5" rx="14" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
  <path className="flow" d="M40 40 L95 62 L150 38 M95 62 L70 96 M95 62 L132 94" stroke="#3557e6" strokeWidth="1.5" fill="none"></path>
  <circle cx="40" cy="40" r="9" fill="#eef1fd" stroke="#3557e6" strokeWidth="1.5"></circle>
  <circle cx="150" cy="38" r="9" fill="#eef1fd" stroke="#3557e6" strokeWidth="1.5"></circle>
  <circle cx="95" cy="62" r="13" fill="#3557e6"></circle>
  <circle cx="70" cy="96" r="7" fill="#fff" stroke="#9aa6c6" strokeWidth="1.5"></circle>
  <circle cx="132" cy="94" r="7" fill="#fff" stroke="#9aa6c6" strokeWidth="1.5"></circle>
  </svg>
  </div></div>
  </div>


  <div className="hx o1" style={{position:'absolute',left:'2%',top:'6%',width:'13%'}}>
  <div className="asm d2"><div className="flt f5">
  <svg viewBox="0 0 64 64" style={{width:'100%',display:'block',filter:'drop-shadow(0 10px 18px rgba(18,24,38,.08))'}}>
  <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="16" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
  <ellipse cx="32" cy="22" rx="12" ry="5" fill="none" stroke="#3557e6" strokeWidth="1.6"></ellipse>
  <path d="M20 22v20c0 2.8 5.4 5 12 5s12-2.2 12-5V22M20 32c0 2.8 5.4 5 12 5s12-2.2 12-5" fill="none" stroke="#3557e6" strokeWidth="1.6"></path>
  </svg>
  </div></div>
  </div>


  <div className="hx o3" style={{position:'absolute',left:'-2%',top:'84%',width:'30%',zIndex:'2'}}>
  <div className="asm d6"><div className="flt f6">
  <svg viewBox="0 0 160 50" style={{width:'100%',display:'block',filter:'drop-shadow(0 10px 18px rgba(18,24,38,.08))'}}>
  <rect x="0.75" y="0.75" width="158.5" height="48.5" rx="24" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect>
  <path d="M22 15h10l6 6v14H22z" fill="#eef1fd" stroke="#3557e6" strokeWidth="1.5" strokeLinejoin="round"></path>
  <text x="48" y="30" fontFamily="Geist Mono, monospace" fontSize="12" fill="#121826">ICSE 2026</text>
  <circle cx="134" cy="25" r="8" fill="#15803d"></circle>
  <path d="m130 25 3 3 5-6" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
  </div></div>
  </div>

  <div className="hx o8" style={{position:'absolute',left:'88%',top:'46%',width:'10%'}}>
  <div className="asm d7"><div className="flt f2">
  <svg viewBox="0 0 52 52" style={{width:'100%',display:'block'}}><rect x="0.75" y="0.75" width="50.5" height="50.5" rx="14" fill="#eef1fd" stroke="#c9d1f3" strokeWidth="1.5"></rect><path d="M26 14v6m0 12v6m-12-12h6m12 0h6m-14-6 2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="none" stroke="#3557e6" strokeWidth="1.5" strokeLinejoin="round"></path></svg>
  </div></div>
  </div>
  <div className="hx o7" style={{position:'absolute',left:'4%',top:'40%',width:'4%'}}><div className="asm d8"><div className="flt f3"><svg viewBox="0 0 20 20" style={{width:'100%',display:'block'}}><circle cx="10" cy="10" r="6" fill="#3557e6"></circle></svg></div></div></div>
  <div className="hx o2" style={{position:'absolute',left:'54%',top:'4%',width:'3%'}}><div className="asm d8"><div className="flt f5"><svg viewBox="0 0 20 20" style={{width:'100%',display:'block'}}><circle cx="10" cy="10" r="6" fill="#121826"></circle></svg></div></div></div>
  </div>
);

export const eduArt = [
  () => (
    <svg viewBox="0 0 520 170" style={{width:'100%',display:'block'}} aria-hidden="true">
    <path className="flow" d="M60 130 C140 130 160 70 240 70 S360 40 460 50" stroke="#9aa6c6" strokeWidth="1.6" fill="none"></path>
    <g className="flt f2"><path d="M260 44 l70 28-70 28-70-28z" fill="#121826"></path><path d="M220 86 v26 c0 10 80 10 80 0 v-26" fill="#2a3142"></path><path d="M318 76 v30" stroke="#3557e6" strokeWidth="3" strokeLinecap="round"></path><circle cx="318" cy="110" r="5" fill="#3557e6"></circle></g>
    <g className="flt f5"><rect x="60" y="40" width="90" height="56" rx="10" fill="#fff" stroke="#c9d1f3" strokeWidth="1.5"></rect><path d="M76 82 l14-14 12 8 18-20" stroke="#3557e6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"></path></g>
    <g className="flt f3"><rect x="380" y="96" width="90" height="48" rx="10" fill="#fff" stroke="#c9d1f3" strokeWidth="1.5"></rect><path d="M400 128 a12 12 0 0 1 4-23 a16 16 0 0 1 30 4 a10 10 0 0 1 2 19z" fill="#eef1fd" stroke="#3557e6" strokeWidth="1.5"></path></g>
    </svg>
  ),
  () => (
    <svg viewBox="0 0 520 170" style={{width:'100%',display:'block'}} aria-hidden="true">
    <g className="flt f4">
    <path d="M180 64 L260 30 L340 64 Z" fill="#121826"></path>
    <rect x="186" y="64" width="148" height="10" fill="#2a3142"></rect>
    <rect x="198" y="78" width="12" height="60" rx="2" fill="#fff" stroke="#9aa6c6" strokeWidth="1.5"></rect><rect x="230" y="78" width="12" height="60" rx="2" fill="#fff" stroke="#9aa6c6" strokeWidth="1.5"></rect><rect x="278" y="78" width="12" height="60" rx="2" fill="#fff" stroke="#9aa6c6" strokeWidth="1.5"></rect><rect x="310" y="78" width="12" height="60" rx="2" fill="#fff" stroke="#9aa6c6" strokeWidth="1.5"></rect>
    <rect x="176" y="138" width="168" height="10" rx="2" fill="#2a3142"></rect>
    <rect x="252" y="96" width="16" height="42" rx="8" fill="#3557e6"></rect>
    </g>
    <g className="flt f1"><rect x="56" y="54" width="92" height="56" rx="10" fill="#fff" stroke="#c9d1f3" strokeWidth="1.5"></rect><text x="102" y="80" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#5a6273">CGPA</text><text x="102" y="98" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="16" fontWeight="600" fill="#3557e6">3.94</text></g>
    <g className="flt f6"><rect x="376" y="70" width="84" height="40" rx="20" fill="#fff" stroke="#c9d1f3" strokeWidth="1.5"></rect><text x="418" y="95" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="12" fill="#121826">&lt;/CSE&gt;</text></g>
    </svg>
  ),
];

export const CertArt = ({ n, float }: { n: string; float: number }) => (
  <svg viewBox="0 0 320 170" style={{width:'100%',display:'block'}} aria-hidden="true">
  <rect x="0.75" y="0.75" width="318.5" height="180" rx="10" fill="#fff" stroke="#c9d1f3" strokeWidth="1.5"></rect>
  <rect x="12" y="12" width="296" height="170" rx="6" fill="none" stroke="#3557e6" strokeWidth="1" strokeDasharray="3 4" opacity=".5"></rect>
  <text x="160" y="42" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" letterSpacing="3" fill="#3557e6">{'CERTIFICATE · ' + n}</text>
  <rect x="80" y="60" width="160" height="9" rx="4.5" fill="#121826" opacity=".8"></rect>
  <rect x="100" y="80" width="120" height="6" rx="3" fill="#c5cad5"></rect>
  <rect x="60" y="126" width="80" height="2" fill="#c5cad5"></rect>
  <g className={'flt f' + float}><path d="M244 150 l-8 22 12-6 6 10 4-22z M268 150 l8 22-12-6-6 10-4-22z" fill="#2442c4"></path><circle cx="256" cy="134" r="22" fill="#3557e6"></circle><circle cx="256" cy="134" r="15" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="2 3"></circle><path d="m249 134 5 5 9-10" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"></path></g>
  </svg>
);

export const ResearchArt = () => (
  <svg viewBox="0 0 520 150" style={{width:'100%',display:'block'}} role="img" aria-label="Research pipeline: sources, retrieval, memory, reasoning, evaluation">
  <path className="flow" d="M44 60 H476" stroke="#3557e6" strokeWidth="1.6" fill="none"></path>
  <g className="sp o1 r1"><circle cx="44" cy="60" r="22" fill="#fff" stroke="#3557e6" strokeWidth="1.5"></circle><text x="44" y="110" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#121826">sources</text></g>
  <g className="sp o6 r2"><circle cx="152" cy="60" r="22" fill="#fff" stroke="#3557e6" strokeWidth="1.5"></circle><text x="152" y="110" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#121826">retrieval</text></g>
  <g className="sp o5 r2"><circle cx="260" cy="60" r="26" fill="#3557e6"></circle><text x="260" y="110" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#121826">memory</text></g>
  <g className="sp o6 r3"><circle cx="368" cy="60" r="22" fill="#fff" stroke="#3557e6" strokeWidth="1.5"></circle><text x="368" y="110" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#121826">reasoning</text></g>
  <g className="sp o2 r4"><circle cx="476" cy="60" r="22" fill="#121826"></circle><path d="m467 60 6 6 11-12" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"></path><text x="476" y="110" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#121826">evaluation</text></g>
  </svg>
);

export const ContactArt = () => (
  <svg viewBox="0 0 440 300" style={{width:'100%',height:'100%',display:'block'}}>
  <g className="sp o1 r1"><rect x="60" y="40" width="150" height="100" rx="14" fill="#fff" stroke="#d9dce3" strokeWidth="1.5"></rect><rect x="78" y="62" width="90" height="7" rx="3.5" fill="#121826" opacity=".8"></rect><rect x="78" y="80" width="110" height="6" rx="3" fill="#c5cad5"></rect><rect x="78" y="94" width="70" height="6" rx="3" fill="#c5cad5"></rect></g>
  <g className="sp o2 r2"><rect x="230" y="40" width="150" height="100" rx="14" fill="#eef1fd" stroke="#c9d1f3" strokeWidth="1.5"></rect><circle cx="305" cy="90" r="22" fill="#3557e6"></circle><path d="m296 90 6 6 12-13" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"></path></g>
  <g className="sp o6 r3"><rect x="60" y="160" width="320" height="100" rx="14" fill="#fff" stroke="#3557e6" strokeWidth="1.5"></rect><path d="M84 190 l26 20 26-20" stroke="#3557e6" strokeWidth="1.8" fill="none" strokeLinejoin="round"></path><rect x="84" y="186" width="52" height="40" rx="6" fill="none" stroke="#3557e6" strokeWidth="1.8"></rect><rect x="156" y="192" width="180" height="7" rx="3.5" fill="#121826" opacity=".8"></rect><rect x="156" y="210" width="130" height="6" rx="3" fill="#c5cad5"></rect></g>
  </svg>
);

export const ResearchRings = () => (
  <svg viewBox="0 0 600 600" style={{width:'100%',height:'100%',display:'block'}}><g className="spin"><circle cx="300" cy="300" r="110" fill="none" stroke="#e1e5ef" strokeWidth="1.2" strokeDasharray="2 8"></circle><circle cx="300" cy="300" r="170" fill="none" stroke="#e1e5ef" strokeWidth="1.2" strokeDasharray="none"></circle><circle cx="300" cy="300" r="230" fill="none" stroke="#e1e5ef" strokeWidth="1.2" strokeDasharray="6 10"></circle><circle cx="300" cy="300" r="290" fill="none" stroke="#e1e5ef" strokeWidth="1.2" strokeDasharray="none"></circle><circle cx="410" cy="300" r="5" fill="#c9d1f3"></circle><circle cx="300" cy="10" r="4" fill="#c9d1f3"></circle></g></svg>
);

export const ContactRings = () => (
  <svg viewBox="0 0 600 600" style={{width:'100%',height:'100%',display:'block'}}><g className="spin spin-r"><circle cx="300" cy="300" r="250" fill="none" stroke="#dfe3ee" strokeWidth="1.2" strokeDasharray="4 10"></circle><circle cx="300" cy="300" r="190" fill="none" stroke="#e3e6ee" strokeWidth="1.2"></circle><circle cx="300" cy="50" r="5" fill="#c9d1f3"></circle></g></svg>
);

/** Hand-drawn-looking contour rings used as faint section backgrounds. */
export function Topo({ seed, rings = 9, size = 620 }: { seed: number; rings?: number; size?: number }) {
  const c = size / 2;
  const paths = Array.from({ length: rings }, (_, k) => {
    const r = 34 + k * 31;
    const pts: string[] = [];
    for (let i = 0; i <= 72; i++) {
      const t = (i / 72) * Math.PI * 2;
      const rr = r * (1 + 0.13 * Math.sin(3 * t + seed + k * 0.35) + 0.07 * Math.sin(5 * t - seed * 1.7 + k * 0.2));
      pts.push((c + rr * Math.cos(t)).toFixed(1) + ' ' + (c + rr * 0.86 * Math.sin(t)).toFixed(1));
    }
    return 'M' + pts.join(' L') + 'Z';
  });
  return (
    <svg viewBox={'0 0 ' + size + ' ' + size} style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} fill="none" stroke="#dfe3ee" strokeWidth="1.2"></path>)}
    </svg>
  );
}
