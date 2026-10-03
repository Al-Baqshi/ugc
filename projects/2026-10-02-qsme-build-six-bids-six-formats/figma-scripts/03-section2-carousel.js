// use_figma script 03 (new, from the creative-director review of 2026-10-02)
// File f8xxaFvwdi6ijGxYj9WEWP, page 2:5. skillNames: resource:figma-use. Run AFTER scripts 01 and 02.
// Builds Section 2 "Carousel — 8 × 1080×1350". Copy is verbatim from post.json (only line breaks chosen).
// Real photos/recordings are dashed REPLACE frames; designed stand-ins carry an "Illustrative — swap for real…" tag.
// Slide 4 has the REQUIRED hand-photo placeholder; slide 8 follows the review's layout spec.
const P=await figma.getNodeByIdAsync('2:5');await figma.setCurrentPageAsync(P);
const SEC_NAME='Carousel — 8 × 1080×1350';
const dupe=P.children.find(n=>n.name===SEC_NAME);
if(dupe)return{error:'Carousel section already exists; not rebuilt.',sectionId:dupe.id};
const hex=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');return{r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255}};
const S=(h,o)=>[o===undefined?{type:'SOLID',color:hex(h)}:{type:'SOLID',color:hex(h),opacity:o}];
const avail=await figma.listAvailableFontsAsync();
const AV=new Set(avail.map(f=>f.fontName.family+'|'+f.fontName.style));
const fontFallbacks=[];const FM={};
const FN=(f,s)=>{const k=f+'|'+s;if(FM[k])return FM[k];let r;if(AV.has(k))r={family:f,style:s};else{r=AV.has(f+'|Regular')?{family:f,style:'Regular'}:{family:'Inter',style:'Regular'};fontFallbacks.push(k+' -> '+r.family+' '+r.style);}FM[k]=r;return r};
const WANT=[['Space Grotesk','Bold'],['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['JetBrains Mono','Medium'],['Caveat','Bold']];
const LOADED={};WANT.forEach(([f,s])=>{const r=FN(f,s);LOADED[r.family+'|'+r.style]=r;});
await Promise.all(Object.values(LOADED).map(fn=>figma.loadFontAsync(fn)));
// Source props from Sections 1 and 1b (looked up by name). Load the fonts they really use before cloning/rescaling.
const sec1=P.children.find(n=>n.name==='Static post — 1080×1350');
const sec1b=P.children.find(n=>n.name==='Props for carousel and reel — Section 1b');
const pick=(s,prefix)=>s?s.findChild(n=>n.name.startsWith(prefix)):null;
const SRC={A:pick(sec1,'Prop A'),B:pick(sec1,'Prop B'),C:pick(sec1,'Prop C'),D:pick(sec1,'Prop D'),E:pick(sec1,'Prop E'),F:pick(sec1,'Prop F'),mail:pick(sec1b,'Prop — sent email')};
const missing=Object.entries(SRC).filter(([k,v])=>!v).map(([k])=>k);
{const fs={};for(const n of Object.values(SRC)){if(!n)continue;for(const tn of n.findAllWithCriteria({types:['TEXT']})){for(const sg of tn.getStyledTextSegments(['fontName']))fs[sg.fontName.family+'|'+sg.fontName.style]=sg.fontName;}}await Promise.all(Object.values(fs).map(f=>figma.loadFontAsync(f)));}
const created=[];const track=n=>{created.push(n.id);return n};
const isAL=p=>p&&p.type!=='SECTION'&&p.type!=='PAGE'&&('layoutMode' in p)&&p.layoutMode!=='NONE';
function T(p,str,o={}){const fn=FN(o.f||'Inter',o.s||'Regular');if(!LOADED[fn.family+'|'+fn.style])throw new Error('Font not preloaded: '+fn.family+' '+fn.style);const t=track(figma.createText());t.fontName=fn;t.fontSize=o.size||16;if(o.lh)t.lineHeight={unit:'PIXELS',value:o.lh};if(o.ls!==undefined)t.letterSpacing={unit:'PERCENT',value:o.ls};t.fills=S(o.c||'#111111',o.op);t.characters=str;if(o.align)t.textAlignHorizontal=o.align;if(o.name)t.name=o.name;if(p)p.appendChild(t);
  if(o.fill){t.textAutoResize='HEIGHT';t.layoutSizingHorizontal='FILL';if(t.width<2){t.layoutSizingHorizontal='FIXED';t.resize(p.width-p.paddingLeft-p.paddingRight,Math.max(t.height,1));}}
  else if(o.w){t.textAutoResize='HEIGHT';if(isAL(p))t.layoutSizingHorizontal='FIXED';t.resize(o.w,Math.max(t.height,1));}
  if(o.x!==undefined)t.x=o.x;if(o.y!==undefined)t.y=o.y;if(o.rot)t.rotation=o.rot;return t}
function geo(n,p,o){track(n);n.fills=o.fill?S(o.fill,o.op):[];if(o.r!==undefined)n.cornerRadius=o.r;if(o.stroke){n.strokes=S(o.stroke,o.sop);n.strokeWeight=o.sw||1;n.strokeAlign=o.sa||'INSIDE';if(o.dash)n.dashPattern=o.dash;}if(o.name)n.name=o.name;if(o.fx)n.effects=o.fx;if(o.opacity!==undefined)n.opacity=o.opacity;if(p)p.appendChild(n);if(o.x!==undefined)n.x=o.x;if(o.y!==undefined)n.y=o.y;if(o.rot)n.rotation=o.rot;return n}
function R(p,w,h,o={}){const n=figma.createRectangle();n.resize(w,h);return geo(n,p,o)}
function F(p,w,h,o={}){const n=figma.createFrame();n.resize(w,h);n.clipsContent=o.clip!==false;return geo(n,p,o)}
function SV(p,str,o={}){const n=track(figma.createNodeFromSvg(str));n.fills=[];if(o.name)n.name=o.name;p.appendChild(n);if(o.x!==undefined)n.x=o.x;if(o.y!==undefined)n.y=o.y;return n}
function AL(p,dir,o={}){const n=track(figma.createAutoLayout(dir));n.fills=o.fill?S(o.fill,o.op):[];if(o.name)n.name=o.name;if(o.pad){n.paddingTop=o.pad[0];n.paddingRight=o.pad[1];n.paddingBottom=o.pad[2];n.paddingLeft=o.pad[3];}if(o.gap!==undefined)n.itemSpacing=o.gap;if(o.r!==undefined)n.cornerRadius=o.r;if(o.stroke){n.strokes=S(o.stroke);n.strokeWeight=o.sw||1;n.strokeAlign='INSIDE';}if(o.align)n.counterAxisAlignItems=o.align;if(o.main)n.primaryAxisAlignItems=o.main;if(p)p.appendChild(n);
  if(o.w){n.resize(o.w,o.h||Math.max(n.height,10));n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical=o.h?'FIXED':'HUG';}
  if(o.x!==undefined)n.x=o.x;if(o.y!==undefined)n.y=o.y;return n}
function pill(p,str,o={}){const n=AL(p,'HORIZONTAL',{fill:o.fill||'#4BCD32',op:o.op,r:o.r!==undefined?o.r:999,pad:[o.py||8,o.px||14,o.py||8,o.px||14],align:'CENTER',stroke:o.stroke,name:o.name||('Tag — '+str),x:o.x,y:o.y});T(n,str,{f:o.f,s:o.s||'Semi Bold',size:o.size||16,c:o.c||'#06130A',name:(o.name||'Tag')+' text'});return n}
// Wrapped label box (for REPLACE labels): fixed width, wraps.
function labelBox(p,str,o={}){const n=AL(p,'VERTICAL',{fill:'#0C1310',op:0.92,r:10,pad:[10,14,10,14],w:o.w||640,name:'Label — '+str.slice(0,40)});T(n,str,{s:'Semi Bold',size:o.size||24,lh:Math.round((o.size||24)*1.3),c:'#EEF4EF',fill:true,name:'Label text'});n.x=o.x!==undefined?o.x:16;n.y=o.y!==undefined?o.y:16;return n}
// Dashed REPLACE placeholder. Call done() after adding any guide content so border + label sit on top.
function REPL(p,w,h,label,o={}){const fr=F(p,w,h,{fill:o.fill||'#14211A',r:o.r!==undefined?o.r:16,name:label,x:o.x,y:o.y});
  return {fr,done:()=>{R(fr,w,h,{stroke:'#86958B',sw:2,dash:[12,8],r:o.r!==undefined?o.r:16,name:'Dashed border (placeholder)'});labelBox(fr,label,{w:Math.min(w-32,o.lw||720),size:o.size||24});}};}
function cloneInto(p,src,s,x,y,o={}){if(!src)return null;const c=track(src.clone());p.appendChild(c);c.rescale(s);c.x=x;c.y=y;if(o.opacity!==undefined)c.opacity=o.opacity;c.name=(o.name||'Stand-in')+' — '+src.name;return c}
const comp=await figma.getNodeByIdAsync('2:27');let logoInfo=comp&&comp.type==='COMPONENT'?'ok':'2:27 not found; text fallback used';
if(comp&&comp.type==='COMPONENT'){try{for(const tn of comp.findAllWithCriteria({types:['TEXT']})){for(const sg of tn.getStyledTextSegments(['fontName']))await figma.loadFontAsync(sg.fontName);}}catch(e){logoInfo='font preload skipped: '+e.message;}}
function logo(p,w,x,y){const s=w/1285;const fr=F(p,w,416*s,{name:'QSME mark (instance of 2:27)',x,y});if(comp&&comp.type==='COMPONENT'){const i=track(comp.createInstance());fr.appendChild(i);i.rescale(s);i.x=-192*s;i.y=-133*s;}else{T(fr,'QSME',{f:'Space Grotesk',s:'Bold',size:Math.round(w/4.5),c:'#3DC023',x:0,y:0});}return fr}

const bottom=P.children.reduce((m,n)=>Math.max(m,n.y+n.height),0);
const GAP=80,M=72,W=1080,H=1350;
const sec=figma.createSection();track(sec);sec.name=SEC_NAME;sec.x=0;sec.y=Math.ceil(bottom+200);sec.resizeWithoutConstraints(120*2+8*W+7*GAP,H+320);sec.fills=S('#E7EBE7');
T(sec,'CAROUSEL · 8 × 1080×1350 · EXPORT PDF "Six bids. Six formats." + 8 PNGs',{f:'JetBrains Mono',s:'Medium',size:22,c:'#5B6B60',ls:6,x:120,y:60});
const slides={};const out={};
function slide(i,headline,body,o={}){
  const f=F(sec,W,H,{fill:'#0C1310',name:'Carousel '+i+'/8',x:120+(i-1)*(W+GAP),y:140});
  const hw=o.headW||(o.counter?W-2*M-120:W-2*M);
  const hdr=AL(f,'VERTICAL',{name:'Header',gap:16,w:hw,x:M,y:M});
  const h=T(hdr,headline,{f:'Space Grotesk',s:'Bold',size:64,lh:70,ls:-2,c:'#EEF4EF',fill:true,name:'Headline'});
  let b=null;if(body)b=T(hdr,body,{s:'Medium',size:34,lh:44,c:'#EEF4EF',fill:true,name:'Body'});
  let ctr=null;if(o.counter){ctr=pill(f,o.counter,{fill:'#14211A',stroke:'#213128',f:'JetBrains Mono',s:'Medium',size:28,c:'#A9B8AE',py:8,px:16,name:'Counter '+o.counter});ctr.x=W-M-ctr.width;ctr.y=M;}
  const mediaY=Math.round(M+hdr.height+36);
  slides[i]=f;out[i]={frame:f.id,headline:h.id,body:b?b.id:null,counter:ctr?ctr.id:null,headerBottom:M+hdr.height};
  return {f,mediaY,mediaH:H-M-mediaY};
}

// 1 — flat-lay with F hidden (REPLACE photo) + small QSME mark bottom-right.
{const s=slide(1,'Unpopular opinion: the best bid here is Bid F.','Six bids. Six formats. Let\'s open them. →',{counter:'0/6'});
 const mh=s.mediaH-76;const r=REPL(s.f,W-2*M,mh,'REPLACE: real overhead flat-lay, Bid F face-down with a yellow sticky note "F" (flatlay-f-hidden.jpg)',{x:M,y:s.mediaY});r.done();
 out[1].media=r.fr.id;out[1].mark=logo(s.f,160,W-M-160,H-M-Math.round(416*160/1285)).id;}

// 2 — split: A (designed print prop) | B (designed screen prop).
{const s=slide(2,'Bid A. Bid B.','A: a PDF. Scanned. Sideways.\nB: a spreadsheet where rows 12 to 40 are one merged cell.',{counter:'2/6'});
 const pw=(W-2*M-24)/2;
 const L=F(s.f,pw,s.mediaH,{fill:'#14211A',r:16,name:'Split left — Bid A',x:M,y:s.mediaY});
 const R2=F(s.f,pw,s.mediaH,{fill:'#14211A',r:16,name:'Split right — Bid B',x:M+pw+24,y:s.mediaY});
 if(SRC.A){const sa=Math.min((pw-32)/SRC.A.width,(s.mediaH-32)/SRC.A.height);const c=cloneInto(L,SRC.A,sa,0,0,{name:'Prop'});c.x=(pw-c.width)/2;c.y=(s.mediaH-c.height)/2;out[2].aScale=sa;}
 if(SRC.B){const sb=(pw-32)/SRC.B.width;const c=cloneInto(R2,SRC.B,sb,0,0,{name:'Prop'});c.x=16;c.y=(s.mediaH-c.height)/2;out[2].bScale=sb;}
 out[2].left=L.id;out[2].right=R2.id;}

// 3 — C crop with red-pen circle and "?" in the margin.
{const s=slide(3,'Bid C.','One number. Two words: \'As discussed.\'',{counter:'3/6'});
 const box=F(s.f,W-2*M,s.mediaH,{fill:'#FFFFFF',r:16,name:'Bid C — letterhead crop',x:M,y:s.mediaY});
 const sc=(W-2*M)/424;
 if(SRC.C){cloneInto(box,SRC.C,sc,0,0,{name:'Prop'});
   const ad=SRC.C.findOne(n=>n.name==='As discussed text');
   if(ad){const cx=ad.x*sc,cy=ad.y*sc,cw=ad.width*sc,ch=ad.height*sc;const ew=Math.round(cw+70),eh=Math.round(ch+50);
     out[3].redCircle=SV(box,'<svg width="'+ew+'" height="'+eh+'" viewBox="0 0 '+ew+' '+eh+'" xmlns="http://www.w3.org/2000/svg"><path d="M'+(ew*0.55)+' 5 C '+(ew*0.95)+' 2, '+(ew-3)+' '+(eh*0.55)+', '+(ew*0.7)+' '+(eh-6)+' C '+(ew*0.4)+' '+(eh+2)+', 4 '+(eh*0.8)+', 6 '+(eh*0.45)+' C 8 '+(eh*0.12)+', '+(ew*0.35)+' 3, '+(ew*0.62)+' 9" stroke="#C3343B" stroke-width="5" fill="none" stroke-linecap="round"/></svg>',{x:cx-35,y:cy-25,name:'Red pen circle — As discussed.'}).id;
     out[3].question=T(box,'?',{f:'Caveat',s:'Bold',size:110,c:'#C3343B',x:W-2*M-150,y:cy-50,rot:-8,name:'Red pen ? (margin)'}).id;}
 }
 out[3].scale=sc;out[3].media=box.id;}

// 4 — REQUIRED hand photo (REPLACE) with Prop D as a faint composition guide.
{const s=slide(4,'Bid D.','"Price below. Cheers."',{counter:'4/6'});
 const r=REPL(s.f,W-2*M,s.mediaH,'REPLACE: real photo of a hand holding the phone showing Prop D (no face in frame)',{x:M,y:s.mediaY});
 if(SRC.D){const sd=(s.mediaH*0.86)/SRC.D.height;cloneInto(r.fr,SRC.D,sd,(W-2*M-SRC.D.width*sd)/2,(s.mediaH-SRC.D.height*sd)/2+20,{opacity:0.35,name:'Composition guide'});}
 r.done();out[4].media=r.fr.id;}

// 5 — close crop of page 9 (illustrative stand-in for the real close photo).
{const s=slide(5,'Bid E. The cheapest. By a mile.','Then page 9, note 14: \'Excludes ceilings.\'',{counter:'5/6'});
 const box=F(s.f,W-2*M,s.mediaH,{fill:'#FFFFFF',r:16,name:'REPLACE: real close photo of printed page 9 (note 14 highlighted, footer 9 of 9)',x:M,y:s.mediaY});
 const se=(W-2*M)/424;const visible=(600-230)*se;
 if(SRC.E){cloneInto(box,SRC.E,se,0,-230*se+Math.max(0,(s.mediaH-visible)/2),{name:'Illustrative crop'});}
 R(box,W-2*M,s.mediaH,{stroke:'#86958B',sw:2,dash:[12,8],r:16,name:'Dashed border (placeholder)'});
 const tg=pill(box,'Illustrative — swap for real close photo of page 9',{name:'Illustrative tag — slide 5'});tg.x=W-2*M-tg.width-16;tg.y=16;
 out[5].media=box.id;out[5].scale=se;}

// 6 — full-bleed whiteboard (REPLACE) + inset crop on "Ceilings … INCL" (REPLACE).
{const s=slide(6,'Bid F. A photo of a whiteboard.','Honestly? The most complete bid of the lot.',{counter:'6/6'});
 const fh=H-s.mediaY;const r=REPL(s.f,W,fh,'REPLACE: real phone photo of the real whiteboard, full-bleed (whiteboard.jpg)',{x:0,y:s.mediaY,r:0});
 if(SRC.F){const sf=W/SRC.F.width;cloneInto(r.fr,SRC.F,sf,0,Math.round((fh-SRC.F.height*sf)/2),{name:'Illustrative'});}
 r.done();
 const iw=560,ih=240;const ins=REPL(s.f,iw,ih,'REPLACE: inset crop of whiteboard.jpg on "Ceilings … INCL"',{x:W-40-iw,y:H-40-ih,r:16,size:18,lw:420});
 if(SRC.F){const ln=SRC.F.findOne(n=>n.name==='Marker line 2');if(ln){const si=1.1;const bdx=12,bdy=12;cloneInto(ins.fr,SRC.F,si,-(bdx+ln.x)*si+24,-(bdy+ln.y)*si+ih/2-ln.height*si/2+20,{name:'Illustrative zoom'});}}
 ins.done();ins.fr.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.35},offset:{x:0,y:10},radius:30,spread:0,visible:true,blendMode:'NORMAL'}];
 out[6].media=r.fr.id;out[6].inset=ins.fr.id;}

// 7 — laptop photo of the QS's own sent email (REPLACE), with the Section 1b screen as a guide.
{const s=slide(7,'In fairness, here\'s what I sent them.','Nobody got the same list.\nWith QSME: price the estimate once. Cut the tender from it. Every bidder gets the same lines.');
 const r=REPL(s.f,W-2*M,s.mediaH,'REPLACE: real photo of the laptop on the same desk showing the QS\'s own sent email (screen = Section 1b "Prop — sent email")',{x:M,y:s.mediaY});
 if(SRC.mail){const sm=(W-2*M-80)/SRC.mail.width;cloneInto(r.fr,SRC.mail,sm,40,Math.max(150,(s.mediaH-SRC.mail.height*sm)/2+40),{name:'Screen guide'});}
 r.done();out[7].media=r.fr.id;}

// 8 — review spec: headline 64px at y72, whiteboard callback 220×150 top-right, 'Compare bids' crop 936×600, body 34/44, CTA pill.
// Fact-check 2026-10-02: the live comparison is a table of bid TOTALS (excl./incl. tax, 'Lowest'); a line × bidder grid is branch-only, so slide 8 never shows or says one.
// 2026-10-03 review (Global): totals excl. tax only (the Global screen still says GST / 15%), and no agreement / e-sign line (NZ-law templates; truth sheet open question 4).
{const s=slide(8,'Same lines.\nOne table.\nAward.',null,{headW:W-2*M-220-24});
 const cb=REPL(s.f,220,150,'REPLACE: whiteboard reading "6 bids. 1 schedule."',{x:W-M-220,y:M,r:10,size:16,lw:196});cb.done();
 const gy=s.mediaY;const g=REPL(s.f,936,600,'REPLACE: real QSME \'Compare bids\' screen (owner screen-recording), demo project with fictional data: one row per bidder (Bidder A–F), totals excl. tax only, \'Lowest\' tag. Totals only, not a per-line grid. Global: no incl. column or calc. figures (the live Global screen still says GST and works them out at 15%).',{x:(W-936)/2,y:gy});g.done();
 const col=AL(s.f,'VERTICAL',{name:'Body + CTA',gap:32,w:936,x:M,y:gy+600+32});
 const b=T(col,'Bidders never see your rates or budget.\nAward creates the contract, with milestones and retention.',{s:'Medium',size:34,lh:44,c:'#EEF4EF',fill:true,name:'Body'});
 const cta=pill(col,'Book a 30-minute demo: qsme.build',{fill:'#3DC023',size:34,c:'#06130A',py:20,px:40,name:'CTA pill'});
 out[8].body=b.id;out[8].cta=cta.id;out[8].callback=cb.fr.id;out[8].compareBids=g.fr.id;out[8].contentBottom=col.y+col.height;}

const checks=Object.entries(out).map(([i,o])=>({slide:+i,headerBottom:Math.round(o.headerBottom),contentBottom:o.contentBottom?Math.round(o.contentBottom):undefined}));
return {sectionId:sec.id,sectionBounds:[sec.x,sec.y,sec.width,sec.height],missingSources:missing,logo:logoInfo,slides:out,checks,fontFallbacks,createdCount:created.length,createdIds:created};
