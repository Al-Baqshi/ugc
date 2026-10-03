// use_figma script 01 (v2, applies the creative-director review of 2026-10-02)
// File f8xxaFvwdi6ijGxYj9WEWP, page 2:5 "02 · qsme.build — Six quotes, six formats". skillNames: resource:figma-use
// Builds Section 1 "Static post — 1080×1350": the 1080×1350 static (band, illustrative flat-lay slot, label tabs,
// sticky note, footer with the QSME logo instance of 2:27), shoot notes, and the six print/screen props A–F.
// Section stays inside x 0..3991 so x>=4000, y=0 is free for the motion frame.
// STATUS: NOT YET RUN (Figma Starter-plan MCP limit). Dry-run against a Plugin-API mock passes.
const P=await figma.getNodeByIdAsync('2:5');await figma.setCurrentPageAsync(P);
const SEC_NAME='Static post — 1080×1350';
const dupe=P.children.find(n=>n.name===SEC_NAME);
if(dupe)return{error:'Section 1 already exists; not rebuilt (use targeted edits).',sectionId:dupe.id};
const hex=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');return{r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255}};
const S=(h,o)=>[o===undefined?{type:'SOLID',color:hex(h)}:{type:'SOLID',color:hex(h),opacity:o}];
// Fonts: check every style against what is installed and fall back to Regular instead of throwing.
const avail=await figma.listAvailableFontsAsync();
const AV=new Set(avail.map(f=>f.fontName.family+'|'+f.fontName.style));
const fontFallbacks=[];const FM={};
const FN=(f,s)=>{const k=f+'|'+s;if(FM[k])return FM[k];let r;if(AV.has(k))r={family:f,style:s};else{r=AV.has(f+'|Regular')?{family:f,style:'Regular'}:{family:'Inter',style:'Regular'};fontFallbacks.push(k+' -> '+r.family+' '+r.style);}FM[k]=r;return r};
const WANT=[['Space Grotesk','Bold'],['Space Grotesk','Medium'],['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['Inter','Bold'],['JetBrains Mono','Regular'],['JetBrains Mono','Medium'],['IBM Plex Mono','Regular'],['IBM Plex Mono','Medium'],['Manrope','ExtraBold'],['Permanent Marker','Regular'],['Caveat','Bold']];
const LOADED={};WANT.forEach(([f,s])=>{const r=FN(f,s);LOADED[r.family+'|'+r.style]=r;});
await Promise.all(Object.values(LOADED).map(fn=>figma.loadFontAsync(fn)));
const created=[];const track=n=>{created.push(n.id);return n};
const isAL=p=>p&&p.type!=='SECTION'&&p.type!=='PAGE'&&('layoutMode' in p)&&p.layoutMode!=='NONE';
function T(p,str,o={}){const fn=FN(o.f||'Inter',o.s||'Regular');if(!LOADED[fn.family+'|'+fn.style])throw new Error('Font not preloaded: '+fn.family+' '+fn.style);const t=track(figma.createText());t.fontName=fn;t.fontSize=o.size||16;if(o.lh)t.lineHeight={unit:'PIXELS',value:o.lh};if(o.ls!==undefined)t.letterSpacing={unit:'PERCENT',value:o.ls};t.fills=S(o.c||'#111111',o.op);t.characters=str;if(o.align)t.textAlignHorizontal=o.align;if(o.name)t.name=o.name;if(p)p.appendChild(t);
  if(o.fill){t.textAutoResize='HEIGHT';t.layoutSizingHorizontal='FILL';if(t.width<2){t.layoutSizingHorizontal='FIXED';t.resize(p.width-p.paddingLeft-p.paddingRight,Math.max(t.height,1));}}
  else if(o.w){t.textAutoResize='HEIGHT';if(isAL(p))t.layoutSizingHorizontal='FIXED';t.resize(o.w,Math.max(t.height,1));}
  if(o.x!==undefined)t.x=o.x;if(o.y!==undefined)t.y=o.y;if(o.rot)t.rotation=o.rot;return t}
function geo(n,p,o){track(n);n.fills=o.fill?S(o.fill,o.op):[];if(o.r!==undefined)n.cornerRadius=o.r;if(o.stroke){n.strokes=S(o.stroke,o.sop);n.strokeWeight=o.sw||1;n.strokeAlign=o.sa||'INSIDE';if(o.dash)n.dashPattern=o.dash;}if(o.name)n.name=o.name;if(o.fx)n.effects=o.fx;if(o.opacity!==undefined)n.opacity=o.opacity;if(p)p.appendChild(n);if(o.x!==undefined)n.x=o.x;if(o.y!==undefined)n.y=o.y;if(o.rot)n.rotation=o.rot;return n}
function R(p,w,h,o={}){const n=figma.createRectangle();n.resize(w,h);return geo(n,p,o)}
function El(p,w,h,o={}){const n=figma.createEllipse();n.resize(w,h);return geo(n,p,o)}
function F(p,w,h,o={}){const n=figma.createFrame();n.resize(w,h);n.clipsContent=o.clip!==false;return geo(n,p,o)}
function SV(p,str,o={}){const n=track(figma.createNodeFromSvg(str));n.fills=[];if(o.name)n.name=o.name;p.appendChild(n);if(o.x!==undefined)n.x=o.x;if(o.y!==undefined)n.y=o.y;if(o.opacity!==undefined)n.opacity=o.opacity;return n}
// Auto-layout container. createAutoLayout() frames get a WHITE fill by default, so fills are always set explicitly.
function AL(p,dir,o={}){const n=track(figma.createAutoLayout(dir));n.fills=o.fill?S(o.fill,o.op):[];if(o.name)n.name=o.name;if(o.pad){n.paddingTop=o.pad[0];n.paddingRight=o.pad[1];n.paddingBottom=o.pad[2];n.paddingLeft=o.pad[3];}if(o.gap!==undefined)n.itemSpacing=o.gap;if(o.r!==undefined)n.cornerRadius=o.r;if(o.stroke){n.strokes=S(o.stroke);n.strokeWeight=o.sw||1;n.strokeAlign='INSIDE';}if(o.align)n.counterAxisAlignItems=o.align;if(o.main)n.primaryAxisAlignItems=o.main;if(o.fx)n.effects=o.fx;if(p)p.appendChild(n);
  if(o.w){n.resize(o.w,o.h||Math.max(n.height,10));n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical=o.h?'FIXED':'HUG';}
  if(o.x!==undefined)n.x=o.x;if(o.y!==undefined)n.y=o.y;if(o.rot)n.rotation=o.rot;return n}
function pill(p,str,o={}){const n=AL(p,'HORIZONTAL',{fill:o.fill||'#4BCD32',op:o.op,r:o.r!==undefined?o.r:999,pad:[o.py||8,o.px||14,o.py||8,o.px||14],align:'CENTER',name:o.name||('Tag — '+str),x:o.x,y:o.y,rot:o.rot});T(n,str,{f:o.f,s:o.s||'Semi Bold',size:o.size||16,c:o.c||'#06130A',name:(o.name||'Tag')+' text'});return n}
const sh=(y,b,a,sp=0)=>({type:'DROP_SHADOW',color:{r:0,g:0,b:0,a},offset:{x:0,y},radius:b,spread:sp,visible:true,blendMode:'NORMAL'});
const blur=r=>({type:'LAYER_BLUR',radius:r,visible:true});
const named={};

const sec=figma.createSection();track(sec);sec.name=SEC_NAME;sec.x=0;sec.y=0;sec.resizeWithoutConstraints(3991,3000);sec.fills=S('#E7EBE7');

// ───────── PROPS A–F (built first so the static can use scaled copies as an illustrative stand-in) ─────────
const PH=1590;const PY=1760;let px=120;
T(sec,'PRINT-READY PROPS · A–F',{f:'JetBrains Mono',s:'Medium',size:22,c:'#5B6B60',ls:6,x:120,y:PH});
T(sec,'The six bids, designed to be printed or put on screen for the flat-lay shoot',{f:'Space Grotesk',s:'Bold',size:44,c:'#0C1310',ls:-2,x:120,y:PH+36});
named.totalsNote=T(sec,'Skit props, not data. Totals A 74,850 · B 69,980 · C 72,000 · E 47,900 need sign-off (A 49,600+24,320+930 · B 1,850+640+67,490 · E 40,300+5,200+2,400 = F minus the ceilings line). F 71,300 is from post.json. No currency symbols until markets are confirmed.',{s:'Medium',size:18,lh:26,c:'#8A4B00',w:2400,x:120,y:PH+100,name:'Sign-off note — prop totals'}).id;

// PROP A — sideways PDF (print · A4)
const A=F(sec,424,600,{fill:'#FFFFFF',name:'Prop A — sideways PDF (print · A4)',x:px,y:PY});
named.printedHeader=T(A,'Quote_FINAL_v3_revised(2).pdf',{f:'IBM Plex Mono',s:'Medium',size:18,c:'#222222',x:22,y:13,name:'Printed header'}).id;
T(A,'1/1',{f:'IBM Plex Mono',size:11,c:'#666666',x:370,y:19,name:'Page 1/1'});
const scan=F(A,384,532,{fill:'#D3D3CF',x:20,y:44,name:'Scan area (grey scanner edges)'});
const pg=F(scan,340,480,{fill:'#F6F5F0',name:'Scanned quote (rotated 90°)'});
T(pg,'BIDDER A',{f:'Manrope',s:'ExtraBold',size:22,c:'#1E2A44',x:26,y:24});
R(pg,288,1.5,{fill:'#1E2A44',x:26,y:58});
T(pg,'QUOTATION',{s:'Bold',size:12,c:'#222222',ls:12,x:26,y:72});
T(pg,'Re: Tender – Plasterboard & ceilings package',{size:9.5,c:'#333333',x:26,y:94});
const rowsA=[['Item','Description','Amount'],['1','Boards supply & fix','49,600'],['2','Ceilings','24,320'],['3','Preliminaries','930']];
rowsA.forEach((r,i)=>{const y=124+i*22;const st=i===0?'Medium':'Regular';T(pg,r[0],{f:'IBM Plex Mono',s:st,size:9,c:'#333333',x:26,y});T(pg,r[1],{f:'IBM Plex Mono',s:st,size:9,c:'#333333',x:60,y});const a=T(pg,r[2],{f:'IBM Plex Mono',s:st,size:9,c:'#333333',y});a.x=314-a.width;R(pg,288,0.75,{fill:'#999999',x:26,y:y+16});});
T(pg,'TOTAL',{f:'IBM Plex Mono',s:'Medium',size:11,c:'#111111',x:26,y:222});const ta=T(pg,'74,850 + tax',{f:'IBM Plex Mono',s:'Medium',size:11,c:'#111111',y:222,name:'Total A'});ta.x=314-ta.width;
T(pg,'Validity 30 days.',{f:'IBM Plex Mono',size:9,c:'#444444',x:26,y:262});
T(pg,'Signed',{f:'IBM Plex Mono',size:9,c:'#444444',x:26,y:410});T(pg,'A. Bidder',{f:'Caveat',s:'Bold',size:22,c:'#2A3A6A',x:80,y:398});
pg.rotation=-90.8;pg.rescale(0.76);
{const bb=pg.absoluteBoundingBox,sx=scan.absoluteTransform[0][2],sy=scan.absoluteTransform[1][2];pg.x+=(384-bb.width)/2-(bb.x-sx);pg.y+=(532-bb.height)/2-(bb.y-sy);}
pg.effects=[sh(1,3,0.18)];
R(scan,384,22,{fill:'#4A4B48',op:0.55,fx:[blur(8)],x:0,y:-8});
R(scan,18,532,{fill:'#4A4B48',op:0.5,fx:[blur(7)],x:-8,y:0});
R(scan,384,16,{fill:'#4A4B48',op:0.35,fx:[blur(7)],x:0,y:524});
px+=424+56;

// PROP B — merged cells (laptop screen · 16:10). Neutral tabs, no product look-alike.
const B=F(sec,960,600,{fill:'#FFFFFF',name:'Prop B — merged cells (laptop screen · 16:10 · export 2×)',x:px,y:PY});
R(B,960,30,{fill:'#EEF0F2'});const bt=T(B,'Bidder B – Plasterboard & ceilings pricing',{s:'Medium',size:12,c:'#3A3F45',y:8});bt.x=(960-bt.width)/2;
R(B,960,40,{fill:'#F7F8F9',y:30});R(B,960,1,{fill:'#DADDE1',y:69});
SV(B,'<svg width="300" height="20" viewBox="0 0 300 20" xmlns="http://www.w3.org/2000/svg"><g stroke="#5F6670" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h9a4 4 0 0 1 0 8H8M4 9l4-4M4 9l4 4"/><path d="M44 9h-9a4 4 0 0 0 0 8h5M44 9l-4-4M44 9l4 4"/><path d="M72 4v12M72 4h5a3 3 0 0 1 0 6h-5h6a3 3 0 0 1 0 6h-6"/><path d="M104 4h7M100 16h7M108 4l-4 12"/><path d="M132 5v11M132 16h9"/><rect x="160" y="3" width="22" height="14" rx="1.5"/><path d="M164 10h14M167 7l-3 3 3 3M175 7l3 3-3 3"/><rect x="204" y="3" width="14" height="14" rx="1.5"/><path d="M204 10h14M211 3v14"/><path d="M244 5h12M244 10h8M244 15h12"/><path d="M276 15l5-10 5 10M278 12h6"/></g></svg>',{x:16,y:40,name:'Generic toolbar icons'});
R(B,960,28,{fill:'#FFFFFF',y:70});R(B,960,1,{fill:'#DADDE1',y:97});
R(B,64,20,{fill:'#FFFFFF',stroke:'#C9CDD2',r:3,x:8,y:74});T(B,'B12',{f:'JetBrains Mono',size:11,c:'#222222',x:16,y:77});
T(B,'fx',{f:'IBM Plex Mono',s:'Medium',size:11,c:'#8A9099',x:84,y:77});R(B,1,20,{fill:'#DADDE1',x:104,y:74});
T(B,'Supply & fix plasterboard walls and ceilings, all levels, per drawings. Framing, boards, fixings, jointing…',{size:11,c:'#222222',x:114,y:77});
const cols=[0,36,76,436,506,556,636,736,816,896,960];const letters=['','A','B','C','D','E','F','G','H','I'];
const rowTop=118,rh=13,firstRow=8,nRows=35;
R(B,960,20,{fill:'#F3F4F6',y:98});
R(B,660,20,{fill:'#E2E6EC',x:76,y:98,name:'Header highlight (neutral)'});
for(let i=1;i<letters.length;i++){const c=T(B,letters[i],{s:'Medium',size:10,c:'#4A5058',y:102});c.x=(cols[i]+cols[i+1])/2-c.width/2;}
R(B,36,nRows*rh,{fill:'#F3F4F6',y:rowTop});
R(B,36,29*rh,{fill:'#E2E6EC',y:rowTop+(12-firstRow)*rh,name:'Row header highlight (neutral)'});
for(let r=0;r<=nRows;r++){R(B,960,1,{fill:'#E3E5E8',y:rowTop+r*rh});}
for(let i=1;i<cols.length-1;i++){R(B,1,nRows*rh+20,{fill:'#E3E5E8',x:cols[i],y:98});}
for(let r=0;r<nRows;r++){const n=firstRow+r;const t=T(B,String(n),{size:8.5,c:'#5F6670',y:rowTop+r*rh+1.5});t.x=18-t.width/2;}
const cell=(row,col,str,o={})=>{const y=rowTop+(row-firstRow)*rh+1.5;const t=T(B,str,{size:9,c:'#1F2328',s:o.b?'Semi Bold':'Regular',y});if(o.right)t.x=cols[col+1]-4-t.width;else t.x=cols[col]+4;return t;};
['Item','Description','Qty','Unit','Rate','Amount'].forEach((s,i)=>cell(8,i+1,s,{b:true,right:i>=2}));
cell(9,1,'1');cell(9,2,'Preliminaries & general');cell(9,3,'1',{right:true});cell(9,4,'item');cell(9,6,'1,850',{right:true});
cell(10,1,'2');cell(10,2,'Site establishment');cell(10,3,'1',{right:true});cell(10,4,'item');cell(10,6,'640',{right:true});
cell(11,1,'3');cell(11,2,'Plasterboard & ceilings – see below');
const my=rowTop+(12-firstRow)*rh;const mh=29*rh;
R(B,660,mh,{fill:'#FFFFFF',x:76,y:my,name:'Merged cell B12:F40'});
T(B,'Supply & fix plasterboard walls and ceilings, all levels, per drawings. Framing, boards, fixings, jointing & finishing, cornice, access, protection, clean-up and waste included unless noted.   67,490',{size:10,c:'#1F2328',w:520,x:84,y:my+6,lh:15});
named.selection=R(B,660,mh,{fill:'#2F6FED',op:0.08,stroke:'#2F6FED',sw:2,sa:'CENTER',x:76,y:my,name:'Selection rows 12–40'}).id;
R(B,7,7,{fill:'#2F6FED',stroke:'#FFFFFF',sw:1,x:733,y:my+mh-4});
cell(41,2,'TOTAL',{b:true});named.totalB=cell(41,6,'69,980',{b:true,right:true}).id;cell(42,2,'Excl. tax');
R(B,960,27,{fill:'#F3F4F6',y:573});R(B,960,1,{fill:'#DADDE1',y:573});
R(B,72,27,{fill:'#FFFFFF',x:40,y:573});T(B,'Pricing',{s:'Semi Bold',size:10.5,c:'#1F2328',x:56,y:580,name:'Tab — Pricing (active, neutral)'});R(B,72,2,{fill:'#5F6670',x:40,y:598,name:'Active tab underline (neutral)'});T(B,'Rates',{size:10.5,c:'#5F6670',x:130,y:580,name:'Tab — Rates'});
px+=960+56;

// PROP C — "as discussed": one number + two words in the body; Re: line moved into the letterhead.
const Cp=F(sec,424,600,{fill:'#FFFFFF',name:'Prop C — "as discussed" letterhead (print · A4)',x:px,y:PY});
R(Cp,424,8,{fill:'#7A2E2E'});
R(Cp,30,30,{fill:'#7A2E2E',r:4,x:36,y:40});R(Cp,14,14,{fill:'#FFFFFF',r:2,x:44,y:48});
T(Cp,'Bidder C',{f:'Manrope',s:'ExtraBold',size:26,c:'#2A1F1F',x:76,y:36});
T(Cp,'Re: Tender – Plasterboard & ceilings package',{size:8.5,c:'#999999',x:76,y:74,name:'Re line (letterhead)'});
R(Cp,352,1,{fill:'#DDDDDD',x:36,y:100});
named.totalC=T(Cp,'72,000 + tax',{s:'Semi Bold',size:22,c:'#1D1D1D',x:36,y:130,name:'Total C'}).id;
named.asDiscussed=T(Cp,'As discussed.',{size:18,c:'#1D1D1D',x:36,y:172,name:'As discussed text'}).id;
T(Cp,'C.',{f:'Caveat',s:'Bold',size:30,c:'#23305E',x:36,y:222,name:'Signature C.'});
R(Cp,352,1,{fill:'#EEEEEE',x:36,y:560});T(Cp,'Bidder C',{s:'Medium',size:8.5,c:'#999999',x:36,y:568});
px+=424+56;

// PROP D — "price below" (phone screen). Native 390×844, no rescale; neutral generic mail UI, no OS look-alike chrome.
const D=F(sec,390,844,{fill:'#FFFFFF',name:'Prop D — "price below" (phone screen · 390×844 · export 3× = 1170×2532)',x:px,y:PY});
T(D,'4:59',{s:'Semi Bold',size:16,c:'#111111',x:36,y:17,name:'Status time'});
R(D,24,11,{fill:'#111111',op:0.7,r:3.5,x:336,y:21,name:'Battery (plain bar)'});
SV(D,'<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><path d="M19 11H4M10 5l-6 6 6 6" stroke="#5F6670" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',{x:16,y:59,name:'Back arrow (neutral, no label)'});
T(D,'Re: Tender – Plasterboard & ceilings',{s:'Bold',size:22,c:'#111111',w:350,lh:28,x:20,y:104,name:'Subject'});
El(D,40,40,{fill:'#7C5CBF',x:20,y:176,name:'Avatar BD'});const ini=T(D,'BD',{s:'Semi Bold',size:15,c:'#FFFFFF',y:186,name:'Avatar initials'});ini.x=40-ini.width/2;
T(D,'Bidder D',{s:'Semi Bold',size:16,c:'#111111',x:72,y:176});T(D,'to me · 4:59 pm',{size:14,c:'#8A8F98',x:72,y:197});
R(D,350,1,{fill:'#E6E7EA',x:20,y:234});
named.bodyD=T(D,'Price below. Cheers.',{size:17,c:'#111111',x:20,y:252,name:'Body — Price below. Cheers.'}).id;
R(D,3,64,{fill:'#000000',op:0.28,r:2,x:383,y:262,name:'Scroll indicator'});
named.sentFromPhone=T(D,'Sent from my phone',{size:12,c:'#A0A4AA',x:20,y:722,name:'Sent from my phone'}).id;
R(D,390,1,{fill:'#E6E7EA',y:762});
const icoD=[['Reply','<path d="M10 6L4 12l6 6M4 12h10a6 6 0 0 1 6 6v1"/>'],['Forward','<path d="M14 6l6 6-6 6M20 12H10a6 6 0 0 0-6 6v1"/>'],['Archive','<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10h14V9M10 13h4"/>']];
icoD.forEach(([nm,path],i)=>SV(D,'<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g stroke="#5F6670" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">'+path+'</g></svg>',{x:Math.round(390*(i+1)/4-12),y:782,name:nm+' (neutral outline)'}));
px+=390+56;

// PROP E — page 9 of 9. Larger notes; note 14 carries the joke even in a wide shot.
const Ep=F(sec,424,600,{fill:'#FFFFFF',name:'Prop E — page 9 of 9 (print · A4)',x:px,y:PY});
T(Ep,'Bidder E  ·  Quotation  ·  Plasterboard & ceilings package',{size:9,c:'#6B7078',x:34,y:30});
R(Ep,356,1,{fill:'#D9DCE0',x:34,y:48});
T(Ep,'Summary',{s:'Bold',size:18,c:'#1B1F24',x:34,y:62});
const er=[['Boards supply & fix','1,240 m² @ 32.50','40,300'],['Jointing & finishing','','5,200'],['Access','','2,400']];
er.forEach((r,i)=>{const y=100+i*24;T(Ep,r[0],{size:10.5,c:'#2A2F36',x:34,y});T(Ep,r[1],{size:10.5,c:'#6B7078',x:190,y});const a=T(Ep,r[2],{f:'JetBrains Mono',size:10.5,c:'#2A2F36',y});a.x=390-a.width;R(Ep,356,1,{fill:'#EEF0F2',x:34,y:y+19});});
R(Ep,356,40,{fill:'#F4F6F8',stroke:'#1B1F24',sw:1.5,x:34,y:180,name:'Total box E'});
T(Ep,'TOTAL (excl. tax)',{s:'Bold',size:12,c:'#1B1F24',x:46,y:192});const et=T(Ep,'47,900',{f:'JetBrains Mono',s:'Medium',size:16,c:'#1B1F24',y:189,name:'Total E'});et.x=378-et.width;named.totalE=et.id;
T(Ep,'Notes & exclusions',{s:'Bold',size:12,c:'#1B1F24',x:34,y:240});
const notes=['Price based on tender drawings issued.','Rates fixed for 30 days.','Normal working hours, Monday to Friday.','Clear, dry, level work areas by others.','Power and lighting by others.','Scaffold over 3 m by others.','Waste to skip provided by others.','One mobilisation per level.','Fire-rated systems by others.','Insulation by others.','Painting by others.','Variations at day rates.','Excludes tax.','Excludes ceilings.'];
notes.forEach((n,i)=>{const y=266+i*20;const last=i===13;if(last){named.highlighter=R(Ep,190,22,{fill:'#FFE14D',op:0.9,r:3,x:30,y:y-3,rot:0.6,name:'Highlighter — note 14'}).id;}T(Ep,(i+1)+'.',{s:last?'Semi Bold':'Regular',size:last?14:12,lh:last?undefined:20,c:'#2A2F36',x:34,y:last?y-1:y});const t=T(Ep,n,{s:last?'Semi Bold':'Regular',size:last?14:12,lh:last?undefined:20,c:last?'#111111':'#2A2F36',x:58,y:last?y-1:y,name:last?'Note 14 — Excludes ceilings.':'Note '+(i+1)});if(last)named.note14=t.id;});
R(Ep,356,1,{fill:'#D9DCE0',x:34,y:556});const pn=T(Ep,'9 of 9',{s:'Medium',size:10,c:'#4A5058',y:566,name:'Footer — 9 of 9'});pn.x=390-pn.width;named.footer9of9=pn.id;T(Ep,'Bidder E · Quotation',{size:9,c:'#8A9099',x:34,y:567});
R(Ep,24,3.5,{fill:'#9AA0A6',r:1,x:12,y:22,rot:40,name:'Staple'});
px+=424+56;

// PROP F — whiteboard writing guide, with a VISIBLE "Illustrative — swap for real…" tag.
const Fw=F(sec,849,600,{fill:'#B7BCC0',r:10,name:'Prop F — whiteboard writing guide (Illustrative — swap for real whiteboard photo)',x:px,y:PY});
const bd=F(Fw,825,556,{fill:'#E9ECEB',r:4,x:12,y:12,name:'Board surface'});
El(bd,300,90,{fill:'#9AA3A6',op:0.10,fx:[blur(30)],x:40,y:430});El(bd,200,70,{fill:'#9AA3A6',op:0.12,fx:[blur(24)],x:380,y:30});
const sk=F(bd,250,170,{name:'Half-erased site sketch',x:540,y:350,opacity:0.32,clip:false});
R(sk,200,120,{stroke:'#3B4650',sw:3,x:10,y:20});R(sk,3,70,{fill:'#3B4650',x:110,y:20});R(sk,90,3,{fill:'#3B4650',x:113,y:80});
SV(sk,'<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M2 38A36 36 0 0 1 38 2" stroke="#3B4650" stroke-width="3" fill="none"/></svg>',{x:150,y:100});
T(sk,'LVL 2',{f:'Permanent Marker',size:18,c:'#3B4650',x:30,y:40});
R(bd,170,60,{fill:'#E9ECEB',op:0.85,fx:[blur(12)],x:600,y:380,rot:-8,name:'Erase smear'});
const ml=[['Boards supply & fix – 1,240 m² @ 38.50',28],['Ceilings – 380 m² @ 62.00 – INCL',28],['Jointing & finishing – incl',28],['Access – incl',28],['Validity 30 days',28],['TOTAL 71,300 + tax',34]];
let wy=84;const mk={};named.markerLines=[];
ml.forEach(([s,z],i)=>{const t=T(bd,s,{f:'Permanent Marker',size:z,c:'#1F2D4A',x:44,y:wy,name:'Marker line '+(i+1)});named.markerLines.push(t.id);if(i===1)mk.ceil=t;wy+=(i===4?82:70);});
const cw=mk.ceil.width;
named.doubleUnderline=SV(bd,`<svg width="${Math.round(cw+16)}" height="22" viewBox="0 0 ${Math.round(cw+16)} 22" xmlns="http://www.w3.org/2000/svg"><path d="M2 5 C ${cw*0.3} 1, ${cw*0.6} 8, ${cw+12} 4" stroke="#C3343B" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M6 16 C ${cw*0.35} 12, ${cw*0.7} 19, ${cw+8} 14" stroke="#C3343B" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>`,{x:38,y:mk.ceil.y+mk.ceil.height-2,name:'Double underline — Ceilings … INCL'}).id;
El(bd,340,220,{fill:'#FFFFFF',op:0.95,fx:[blur(48)],x:560,y:360,name:'Glare'});El(bd,120,70,{fill:'#FFFFFF',fx:[blur(16)],x:680,y:430,name:'Glare core'});
R(Fw,120,10,{fill:'#20242A',r:5,x:660,y:579,name:'Marker'});R(Fw,26,10,{fill:'#C3343B',r:3,x:760,y:579});
named.fTag=pill(Fw,'Illustrative — swap for real whiteboard photo (whiteboard.jpg)',{x:24,y:24,name:'Illustrative tag — F'}).id;

const props={A,B,C:Cp,D,E:Ep,F:Fw};
const maxPH=Math.max(...Object.values(props).map(n=>n.height));const capY=PY+maxPH+28;
const caps=[[A,'A · sideways PDF','Print on A4. The scanner edges and sideways page are part of the artwork. No real scan needed.'],[B,'B · merged cells','Laptop screen prop. Export at 2× (1920×1200) and open full-screen on the laptop. Generic sheet with no app branding.'],[Cp,'C · "as discussed"','Print on A4. The emptiness is the joke: the body is one number and "As discussed." Leave it as it is.'],[D,'D · "price below"','Phone screen prop at native 390×844. Export at 3× (1170×2532) and open full-screen. Generic mail UI: no OS or app logos, no system blue.'],[Ep,'E · page 9','Print page 9 on A4. Staple it behind the cover and filler pages 2–8 (Section 1b). At the shoot, put E nearest the lens with the yellow stripe facing the camera.'],[Fw,'F · whiteboard','Illustrative — swap for real whiteboard photo. Writing guide for the real board; keep the glare and sketch clear of the lines.']];
let capBottom=capY;
caps.forEach(([n,h,b])=>{T(sec,h,{f:'Space Grotesk',s:'Bold',size:22,c:'#0C1310',x:n.x,y:capY});const bt2=T(sec,b,{size:16,c:'#4A5A50',lh:23,w:Math.max(n.width,300),x:n.x,y:capY+34});capBottom=Math.max(capBottom,bt2.y+bt2.height);});

// ───────── STATIC POST 1080×1350 ─────────
const st=F(sec,1080,1350,{fill:'#0C1310',name:'Static post — 1080×1350 (4:5)',x:120,y:120});
// Top band: auto-layout, HUG height, explicit dark fill.
const band=AL(st,'VERTICAL',{name:'Top band',fill:'#0C1310',pad:[48,56,44,56],gap:12,w:1080,x:0,y:0});
named.kicker=T(band,'Plasterboard & ceilings package · Tender closed 5:00pm',{s:'Medium',size:28,lh:34,c:'#A9B8AE',fill:true,name:'Kicker'}).id;
named.headline=T(band,'Six bids. Six formats.',{f:'Space Grotesk',s:'Bold',size:80,lh:88,ls:-2,c:'#EEF4EF',fill:true,name:'Headline'}).id;
named.subline=T(band,'Next tender: one schedule.\nEvery bidder gets the same lines.',{s:'Medium',size:34,lh:42,c:'#3DC023',fill:true,name:'Subline (2 deliberate lines)'}).id;
const bandH=Math.round(band.height);
// Footer strip with its own background so the green-on-transparent logo keeps contrast.
const FOOT_H=112;const footY=1350-FOOT_H;
const foot=AL(st,'HORIZONTAL',{name:'Footer',fill:'#0C1310',pad:[0,56,0,56],gap:28,align:'CENTER',w:1080,h:FOOT_H,x:0,y:footY});
const logoW=200,ls_=logoW/1285;
const lf=F(foot,logoW,416*ls_,{name:'QSME logo (instance of 2:27, cropped to wordmark)'});
let logoInfo='ok';
const comp=await figma.getNodeByIdAsync('2:27');
if(comp&&comp.type==='COMPONENT'){
  try{for(const tn of comp.findAllWithCriteria({types:['TEXT']})){for(const sg of tn.getStyledTextSegments(['fontName']))await figma.loadFontAsync(sg.fontName);}}catch(e){logoInfo='font preload skipped: '+e.message;}
  const inst=track(comp.createInstance());lf.appendChild(inst);inst.rescale(ls_);inst.x=-192*ls_;inst.y=-133*ls_;named.logoInstance=inst.id;
}else{logoInfo='2:27 not found; text fallback used';T(lf,'QSME',{f:'Space Grotesk',s:'Bold',size:44,c:'#3DC023',x:0,y:4});}
const ft=T(foot,'qsme.build · Book a 30-minute demo',{s:'Medium',size:30,c:'#EEF4EF',name:'Footer CTA'});
ft.setRangeFontName(0,10,FN('Inter','Semi Bold'));ft.setRangeFills(0,10,S('#4BCD32'));named.footerCta=ft.id;
// Photo slot between band and footer: illustrative flat-lay stand-in with a visible tag (real photo = flatlay-all.jpg).
const slotY=bandH,slotH=footY-bandH;
const slot=F(st,1080,slotH,{fill:'#CDBFA8',name:'REPLACE: real overhead flat-lay photo, all six bids face-up (flatlay-all.jpg)',x:0,y:slotY});
function standIn(prop,kind,maxW,maxH){const bez=kind==='paper'?0:(kind==='laptop'?10:8);const s=Math.min((maxW-2*bez)/prop.width,(maxH-2*bez)/prop.height);const c=track(prop.clone());c.rescale(s);c.name='Stand-in — '+prop.name;
  if(kind==='paper'){slot.appendChild(c);c.effects=[sh(6,14,0.22)];return c;}
  const h=F(slot,c.width+2*bez,c.height+2*bez,{fill:'#1C1F22',r:kind==='laptop'?14:22,name:'Stand-in device — '+prop.name,fx:[sh(8,18,0.28)]});h.appendChild(c);c.x=bez;c.y=bez;return h;}
const TOP=64,BOT=20,GAP=16,TAB_H=55,TAB_GAP=10;const rowH=Math.floor((slotH-TOP-BOT-GAP)/2);const boxH=rowH-TAB_H-TAB_GAP;
const rows=[{top:TOP,cells:[[28,333,A,'paper','A · sideways PDF',-2.5],[373,333,B,'laptop','B · merged cells',1.5],[718,334,Cp,'paper','C · "as discussed"',3]]},
            {top:TOP+rowH+GAP,cells:[[28,280,D,'phone','D · "price below"',-3],[320,260,Ep,'paper','E · page 9',-1.5],[592,460,Fw,'phoneL','F · whiteboard',2]]}];
const tabs=[];let fHolder=null,fRowTop=0;
// Keep each row's tabs inside the slot and apart (>= 8px), even if a tab is wider than its cell.
function resolveRow(tb){tb.sort((a,b)=>a.x-b.x);for(let i=0;i<tb.length;i++){const mn=i?tb[i-1].x+tb[i-1].width+8:28;if(tb[i].x<mn)tb[i].x=Math.round(mn);}for(let i=tb.length-1;i>=0;i--){const mx=i<tb.length-1?tb[i+1].x-8-tb[i].width:1052-tb[i].width;if(tb[i].x>mx)tb[i].x=Math.round(mx);}}
for(const row of rows){const rowTabs=[];for(const [cx,cwid,prop,kind,label,rot] of row.cells){
  const maxW=kind==='phoneL'?260:cwid-20;const h=standIn(prop,kind,maxW,boxH);
  h.x=kind==='phoneL'?cx:Math.round(cx+(cwid-h.width)/2);h.y=Math.round(row.top+boxH-h.height);h.rotation=rot;
  if(kind==='phoneL'){fHolder=h;fRowTop=row.top;}
  const tb=pill(slot,label,{fill:'#0C1310',op:0.85,r:10,py:8,px:16,size:32,c:'#EEF4EF',name:'Label tab — '+label});
  const center=h.x+h.width/2;tb.x=Math.round(Math.min(Math.max(center-tb.width/2,cx),cx+cwid-tb.width));tb.y=row.top+boxH+TAB_GAP;tabs.push(tb.id);rowTabs.push(tb);
}resolveRow(rowTabs);}
// Sticky note: handwriting at 44px, over F's right edge, above the tab row.
const note=AL(slot,'VERTICAL',{name:'Sticky note — most complete one, honestly',fill:'#FFE14D',pad:[16,14,16,14],w:200,fx:[sh(3,6,0.25)]});
T(note,'most complete one, honestly',{f:'Caveat',s:'Bold',size:44,lh:44,c:'#1F2D4A',fill:true,name:'Sticky note text'});
note.x=Math.round(fHolder.x+fHolder.width-16);note.y=Math.round(fRowTop+Math.max(0,boxH-note.height-24));note.rotation=4;named.stickyNote=note.id;
const slotTag=pill(slot,'Illustrative — swap for real flat-lay photo (flatlay-all.jpg)',{x:14,y:14,name:'Illustrative tag — flat-lay'});named.slotTag=slotTag.id;
R(slot,1080,slotH,{stroke:'#86958B',sw:2,dash:[12,8],name:'Dashed border (placeholder)'});
R(st,1080,1,{fill:'#213128',x:0,y:footY,name:'Footer top border'});

// Shoot notes beside the static.
const notesBox=AL(sec,'VERTICAL',{name:'Static — shoot notes',fill:'#F4F6F4',r:16,pad:[32,32,32,32],gap:14,w:640,x:1320,y:120,stroke:'#C9D2CB'});
T(notesBox,'Static — notes for the shoot',{f:'Space Grotesk',s:'Bold',size:30,c:'#0C1310',fill:true});
['Photo: REPLACE the slot with the real overhead flat-lay (flatlay-all.jpg). The props in the slot are an illustrative layout guide only.',
 'Sticky note: use a 100×100 mm or larger note, or crop tighter around F, so the handwriting reads at 34px or more on a phone.',
 'Bid E: put it nearest the lens with the yellow highlighter stripe facing the camera, so note 14 reads as a highlighted exclusion even when the words are too small.',
 'Labels: Inter Semi Bold 32px, #EEF4EF on #0C1310 at 85%, radius 10. Band height: '+bandH+'px.',
 'Open copy question: the kicker says "5:00pm", while the banners and Prop D say "4:59 pm". Ask the copy owner before changing either.'].forEach((s,i)=>T(notesBox,s,{size:20,lh:30,c:'#33413A',fill:true,name:'Shoot note '+(i+1)}));

sec.resizeWithoutConstraints(Fw.x+Fw.width+120,Math.ceil(capBottom+120));
return {sectionId:sec.id,sectionSize:[sec.width,sec.height],staticId:st.id,bandId:band.id,bandHeight:bandH,slotId:slot.id,footerId:foot.id,logo:logoInfo,
  props:Object.fromEntries(Object.entries(props).map(([k,n])=>[k,{id:n.id,x:n.x,y:n.y,w:n.width,h:n.height}])),
  named,labelTabs:tabs,notesBoxId:notesBox.id,fontFallbacks,createdCount:created.length,createdIds:created};
