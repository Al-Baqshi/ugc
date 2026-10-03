// 04 Motion — Six bids (LinkedIn 4:5). Page 2:5 only. skillNames: resource:figma-use,resource:figma-use-motion
// 2026-10-02 fact-check: product beat rebuilt to what is live (identical scope lines with blank rates → bid TOTALS table excl./incl. tax with 'Lowest' → Award bid → contract with milestones + retention, agreement/e-sign as the next step). No per-line matrix across bidders (branch-only). Text inside the 4:5 safe box 60,60,1020,1290; no blank frame at the whiteboard cut.
// 2026-10-03 review: Global cut shows bid totals EXCL. tax only (no Compare-on toggle, no incl. column, no 'calc.': the live Global screen still says GST and grosses up at 15%);
// corner label is 'Illustrative · demo data' (was an editor's note); no 'agreement → e-sign' line (6.2 held back for Global); product beat sits in one column x 100..980 so the 9:16 can punch in;
// captions match the VO word for word ('Sideways.', 'Most complete one.', 'here's what I sent.'); E's tag reads 'cheapest' until the flick and sits above the flying pages; sticky says 'ceilings IN ✓'.
// 2026-10-04 owner CTA rule (2026-10-03): the end card reads exactly 'Book a 30-minute demo at qsme.build' (logo, then the sentence as a two-line lockup, URL in green with an underline that draws in);
// the end card is held 0.5s longer (DUR 29.8 → 30.3, nothing before 27.17 moves) so the longer CTA VO ('Book a 30-minute demo at Q-S-me dot build.', ~2.7s) fits on both the 4:5 and the 9:16.
// 2026-10-04 review 2: tab 'Bidder B' highlights its own letter (hlLast; hl() matched the B of 'Bidder'); bid E holds 0.5s longer (+0.5s from the whiteboard cut, W adds 1.0 from 12.3);
// the product promise gets 1.0s more (sheets held, lock line 22.1 → 24.29, everything from the totals table on +1.0); hook banners from 0.3s, one every 0.12s (chip 0.55);
// phone screen off-white with a scroll bar and a larger 'Sent from my phone'; the cursor enters from the right of the table, clear of the lower third; headline pops grow from the left edge. DUR 30.3 → 31.8.
const P=await figma.getNodeByIdAsync('2:5');await figma.setCurrentPageAsync(P);
const NAME='Motion — Six bids (LinkedIn 4:5)';const DUR=31.8;const W=t=>t+(t>=16.7?1.3:t>=12.3?1.0:t>=10.0?0.3:0);
const removed=[];for(const n of P.children.filter(n=>n.name===NAME)){removed.push(n.id);n.remove();}
const hex=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');return{r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255}};
const S=(h,o)=>[o===undefined?{type:'SOLID',color:hex(h)}:{type:'SOLID',color:hex(h),opacity:o}];
const G='#0C1310',RA='#14211A',BO='#213128',INK='#EEF4EF',MU='#A9B8AE',SU='#86958B',BR='#3DC023',AC='#4BCD32',SO='#10240F',OA='#06130A';
const avail=await figma.listAvailableFontsAsync();const AV=new Set(avail.map(f=>f.fontName.family+'|'+f.fontName.style));
const fb=[];const FM={};
const FN=(f,s)=>{const k=f+'|'+s;if(FM[k])return FM[k];let r;if(AV.has(k))r={family:f,style:s};else{r=AV.has(f+'|Regular')?{family:f,style:'Regular'}:{family:'Inter',style:'Regular'};fb.push(k+'->'+r.family+' '+r.style)}FM[k]=r;return r};
const WANT=[['Space Grotesk','Bold'],['Space Grotesk','Medium'],['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['Inter','Bold'],['JetBrains Mono','Regular'],['JetBrains Mono','Medium'],['Manrope','ExtraBold'],['Permanent Marker','Regular'],['Kalam','Regular'],['Kalam','Bold']];
const LD={};WANT.forEach(([f,s])=>{const r=FN(f,s);LD[r.family+'|'+r.style]=r});
await Promise.all(Object.values(LD).map(f=>figma.loadFontAsync(f)));
const isAL=p=>p&&('layoutMode' in p)&&p.layoutMode!=='NONE';
function T(p,str,o={}){const t=figma.createText();t.fontName=FN(o.f||'Inter',o.s||'Regular');t.fontSize=o.size||32;if(o.lh)t.lineHeight={unit:'PIXELS',value:o.lh};if(o.ls!==undefined)t.letterSpacing={unit:'PERCENT',value:o.ls};t.fills=S(o.c||INK,o.op);t.characters=str;if(o.align)t.textAlignHorizontal=o.align;t.name=o.name||str.slice(0,48);p.appendChild(t);
  if(o.fill){t.textAutoResize='HEIGHT';t.layoutSizingHorizontal='FILL'}else if(o.w){t.textAutoResize='HEIGHT';t.resize(o.w,Math.max(t.height,1))}
  if(o.x!==undefined)t.x=o.x;if(o.y!==undefined)t.y=o.y;return t}
const hl=(t,sub,c)=>{const i=t.characters.indexOf(sub);if(i>=0)t.setRangeFills(i,i+sub.length,S(c||AC));return t};
const hlLast=(t,sub,c)=>{const i=t.characters.lastIndexOf(sub);if(i>=0)t.setRangeFills(i,i+sub.length,S(c||AC));return t};   // tab labels: 'Bidder B' must light the trailing B, not the B of 'Bidder'
function geo(n,p,o){n.fills=o.fill?S(o.fill,o.op):[];if(o.r!==undefined)n.cornerRadius=o.r;if(o.stroke){n.strokes=S(o.stroke,o.sop);n.strokeWeight=o.sw||1;n.strokeAlign=o.sa||'INSIDE';if(o.dash)n.dashPattern=o.dash}if(o.name)n.name=o.name;if(o.fx)n.effects=o.fx;if(o.opacity!==undefined)n.opacity=o.opacity;if(p)p.appendChild(n);if(o.x!==undefined)n.x=o.x;if(o.y!==undefined)n.y=o.y;if(o.rot)n.rotation=o.rot;return n}
const R=(p,w,h,o={})=>{const n=figma.createRectangle();n.resize(w,h);return geo(n,p,o)};
const El=(p,w,h,o={})=>{const n=figma.createEllipse();n.resize(w,h);return geo(n,p,o)};
const F=(p,w,h,o={})=>{const n=figma.createFrame();n.resize(w,h);n.clipsContent=o.clip!==false;return geo(n,p,o)};
const SV=(p,svg,o={})=>{const n=figma.createNodeFromSvg(svg);n.fills=[];if(o.name)n.name=o.name;p.appendChild(n);if(o.x!==undefined)n.x=o.x;if(o.y!==undefined)n.y=o.y;return n};
function AL(p,dir,o={}){const n=figma.createAutoLayout(dir);n.fills=o.fill?S(o.fill,o.op):[];if(o.name)n.name=o.name;if(o.pad){n.paddingTop=o.pad[0];n.paddingRight=o.pad[1];n.paddingBottom=o.pad[2];n.paddingLeft=o.pad[3]}if(o.gap!==undefined)n.itemSpacing=o.gap;if(o.r!==undefined)n.cornerRadius=o.r;if(o.stroke){n.strokes=S(o.stroke);n.strokeWeight=o.sw||1;n.strokeAlign='INSIDE';if(o.dash)n.dashPattern=o.dash}n.counterAxisAlignItems=o.align||'CENTER';if(o.main)n.primaryAxisAlignItems=o.main;if(o.fx)n.effects=o.fx;if(p)p.appendChild(n);
  if(o.w){n.resize(o.w,o.h||Math.max(n.height,10));n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical=o.h?'FIXED':'HUG'}
  if(o.x!==undefined)n.x=o.x;if(o.y!==undefined)n.y=o.y;return n}
function pill(p,str,o={}){const n=AL(p,'HORIZONTAL',{fill:o.fill||AC,stroke:o.stroke,sw:o.sw,dash:o.dash,r:o.r!==undefined?o.r:999,pad:[o.py||10,o.px||20,o.py||10,o.px||20],name:o.name||('Pill — '+str),x:o.x,y:o.y,fx:o.fx,gap:12});if(o.dot)El(n,14,14,{fill:o.dot,name:'dot'});T(n,str,{f:o.f||'Inter',s:o.s||'Semi Bold',size:o.size||32,c:o.c||OA,name:(o.name||'Pill')+' text'});return n}
const sh=(y,b,a,sp=0,c)=>({type:'DROP_SHADOW',color:c?{...hex(c),a}:{r:0,g:0,b:0,a},offset:{x:0,y},radius:b,spread:sp,visible:true,blendMode:'NORMAL'});
const blur=r=>({type:'LAYER_BLUR',radius:r,visible:true});
const dots=(p,x,y)=>[0,1,2].forEach(i=>El(p,16,16,{fill:'#C3C9C5',x:x+i*26,y,name:'window dot'}));
const ids={};const keep=(k,n)=>{ids[k]=n.id;return n};

// ── placement: x>=4000, y=0, clear of anything already on the page
let X=4000;const clash=P.children.filter(n=>n.y<1350&&n.y+n.height>0&&n.x+n.width>X);if(clash.length)X=Math.max(...clash.map(n=>n.x+n.width))+200;
const M=figma.createFrame();M.resize(1080,1350);M.fills=S(G);M.clipsContent=true;M.name=NAME;M.x=X;M.y=0;
const scenes=[];const scene=n=>{const s=F(M,1080,1350,{name:n,clip:false,x:0,y:0});scenes.push(s);return keep(n,s)};
const tag=(p,str)=>pill(p,str,{fill:RA,stroke:BO,c:INK,f:'JetBrains Mono',s:'Medium',x:60,y:72,name:'Tag — '+str});
const CY=1078;
const cap=(p,str,h,y)=>{const t=T(p,str,{f:'Space Grotesk',s:'Bold',size:58,lh:66,ls:-1.5,c:INK,w:960,x:60,y:y||CY,align:'CENTER',name:'Caption — '+str});if(h)hl(t,h);return t};
const cap2=(p,a,b,ha,hb)=>{const t1=cap(p,a,ha);const t2=cap(p,b,hb,CY+t1.height);return[t1,t2]};
const comp=await figma.getNodeByIdAsync('2:27');
function logo(p,w,x,y,name){const s=w/1285;const c=F(p,1285*s,416*s,{x,y,name:name||'QSME logo'});const i=comp.createInstance();c.appendChild(i);i.rescale(s);i.x=-192*s;i.y=-133*s;return c}
const cursorSvg='<svg width="46" height="60" viewBox="0 0 46 60" xmlns="http://www.w3.org/2000/svg"><path d="M3 3 L3 47 L14 37 L22 56 L31 52 L23 34 L39 34 Z" fill="#FFFFFF" stroke="#0B0F0D" stroke-width="3" stroke-linejoin="round"/></svg>';

// ═════ SCENE 0 — HOOK
const s0=scene('Scene 0 — Hook');
const kick=T(s0,'Plasterboard & ceilings package',{s:'Medium',c:MU,x:60,y:64,name:'Kicker'});
const h1=T(s0,'6 bids.',{f:'Space Grotesk',s:'Bold',size:150,lh:150,ls:-4,x:60,y:140,name:'Headline — 6 bids.'});
const h2=T(s0,'6 formats.',{f:'Space Grotesk',s:'Bold',size:150,lh:150,ls:-4,x:60,y:292,name:'Headline — 6 formats.'});
const chip=pill(s0,'Tender closed 5:00pm',{fill:SO,stroke:BR,sw:2,c:AC,size:34,dot:AC,x:60,y:486,name:'Chip — Tender closed 5:00pm'});
const AVC=['#2F7D5B','#5B56B8','#B7791F','#2B6CB0','#A63D74','#3DC023'];const banners=[];
'ABCDEF'.split('').forEach((L,i)=>{const b=AL(s0,'HORIZONTAL',{fill:RA,stroke:BO,r:22,pad:[14,26,14,16],gap:20,w:960,x:60,y:600+i*102,name:'Banner — New message '+L});
  const av=AL(b,'HORIZONTAL',{fill:AVC[i],r:999,w:60,h:60,main:'CENTER',name:'Avatar '+L});T(av,L,{s:'Bold',c:'#FFFFFF',name:'Initial '+L});
  T(b,'New message — Bidder '+L,{s:'Semi Bold',fill:true,name:'Banner text '+L});T(b,'4:59 pm',{f:'JetBrains Mono',c:MU,name:'Banner time'});banners.push(b)});

// ═════ SCENE A — sideways PDF
const sA=scene('Scene A — sideways PDF');const tA=tag(sA,'A · sideways PDF');
const aw=keep('A wrapper',F(sA,905,640,{x:88,y:250,clip:false,name:'A wrapper'}));
const pa=F(aw,640,905,{fill:'#F3F2EC',fx:[sh(14,34,0.5)],name:'A page — printout scanned sideways'});
R(pa,20,905,{fill:'#8E8E88',op:0.38,name:'scanner edge'});R(pa,12,905,{x:20,fill:'#8E8E88',op:0.16,name:'scanner edge soft'});R(pa,640,14,{fill:'#8E8E88',op:0.22,name:'scanner edge top'});
const scan=F(pa,600,860,{x:26,y:22,clip:false,name:'scan content (crooked)'});
T(scan,'Quote_FINAL_v3_revised(2).pdf',{f:'JetBrains Mono',c:'#3A3A36',x:6,y:4,name:'Printed header — filename'});
R(scan,588,2,{y:54,fill:'#9C9C96'});T(scan,'Bidder A',{f:'Manrope',s:'ExtraBold',size:46,c:'#22221F',x:6,y:84});
[[150,260],[176,200]].forEach(([y,w])=>R(scan,w,12,{x:6,y,fill:'#C9C9C2',r:3}));
R(scan,588,36,{x:6,y:236,fill:'#DADAD3'});for(let i=0;i<8;i++){R(scan,300-(i%3)*40,12,{x:14,y:292+i*44,fill:'#CFCFC8',r:3});R(scan,110,12,{x:470,y:292+i*44,fill:'#CFCFC8',r:3})}
R(scan,150,18,{x:14,y:672,fill:'#8C8C86',r:3});R(scan,140,18,{x:440,y:672,fill:'#8C8C86',r:3});R(scan,200,12,{x:14,y:760,fill:'#CFCFC8',r:3});
scan.rotation=-1.2;
pa.rotation=90;{const bb=pa.absoluteBoundingBox,wb=aw.absoluteBoundingBox;pa.x+=wb.x-bb.x;pa.y+=wb.y-bb.y}
const [cA1,cA2]=cap2(sA,"One's a PDF.",'Sideways.',null,'Sideways.');

// ═════ SCENE B — merged cells
const sB=scene('Scene B — merged cells');const tB=tag(sB,'B · merged cells');
const win=keep('B window',F(sB,960,700,{x:60,y:200,fill:'#FFFFFF',r:16,stroke:'#C9CFCB',fx:[sh(16,40,0.5)],name:'B — generic spreadsheet window (no app branding)'}));
R(win,960,56,{fill:'#EEF1EF'});dots(win,24,20);T(win,'Bid B — pricing',{s:'Medium',c:'#4A4F4C',x:112,y:8});
R(win,960,52,{y:56,fill:'#FFFFFF',stroke:'#E1E5E2'});T(win,'fx',{f:'JetBrains Mono',c:'#8A908C',x:22,y:62});R(win,420,12,{x:90,y:76,fill:'#D5D9D6',r:6});
const GX=80,CW=176;R(win,960,48,{y:108,fill:'#F3F5F4',stroke:'#DADFDB'});
const pressC=R(win,CW,48,{x:GX+2*CW,y:108,fill:'#D3DCD6',name:'Header C pressed'});
'ABCDE'.split('').forEach((c,i)=>T(win,c,{s:'Medium',c:'#5C625E',w:CW,x:GX+i*CW,y:112,align:'CENTER'}));
R(win,GX,544,{y:156,fill:'#F3F5F4',stroke:'#DADFDB'});
[['10',156],['11',204],['12',252],['40',540],['41',588],['42',636]].forEach(([n,y])=>T(win,n,{c:'#6B716D',w:GX,x:0,y:y+4,align:'CENTER',name:'Row '+n}));
[156,204,588,636].forEach(y=>{R(win,880,1,{x:GX,y:y+47,fill:'#E1E5E2'});for(let i=1;i<5;i++)R(win,1,48,{x:GX+i*CW,y,fill:'#E1E5E2'});R(win,120-(y%3)*10,12,{x:GX+18,y:y+18,fill:'#CDD2CE',r:3});R(win,80,12,{x:GX+3*CW+40,y:y+18,fill:'#CDD2CE',r:3})});
[0,1,2].forEach(i=>El(win,8,8,{x:36,y:396+i*16,fill:'#6B716D',name:'row dots'}));R(win,880,336,{x:GX,y:252,fill:'#E3EEFF',stroke:'#2F6FDE',sw:3,name:'Merged block rows 12–40'});
T(win,'PLASTERBOARD & CEILINGS',{s:'Bold',size:36,c:'#2B2F2D',w:880,x:GX,y:398,align:'CENTER'});R(win,12,12,{x:GX+874,y:582,fill:'#2F6FDE'});
const curB=keep('B cursor',SV(sB,cursorSvg,{name:'Cursor B',x:GX+2*CW+60+60-2,y:200+120}));
const alert=AL(sB,'VERTICAL',{fill:'#FFFFFF',r:20,stroke:'#D5D9D6',pad:[34,40,30,40],gap:26,fx:[sh(24,60,0.55)],name:'Alert — Can\'t sort merged cells. (generic)'});
const arow=AL(alert,'HORIZONTAL',{gap:18,name:'Alert row'});const ic=AL(arow,'HORIZONTAL',{fill:'#E9A23B',r:999,w:52,h:52,main:'CENTER',name:'Alert icon'});T(ic,'!',{s:'Bold',size:34,c:'#FFFFFF'});
T(arow,"Can't sort merged cells.",{s:'Semi Bold',size:36,c:'#1E2320'});pill(alert,'OK',{fill:'#E8ECE9',c:'#1E2320',px:44,name:'Alert OK'});
alert.x=540-alert.width/2;alert.y=470;
const [cB1,cB2]=cap2(sB,"One's a spreadsheet.",'All merged.',null,'All merged.');

// ═════ SCENE C — as discussed
const sC=scene('Scene C — as discussed');const tC=tag(sC,'C · “as discussed”');
const pc=keep('C page',F(sC,580,820,{x:250,y:180,fill:'#FAFAF7',fx:[sh(12,34,0.45)],name:'C — Bidder C letterhead'}));
T(pc,'BIDDER C',{f:'Manrope',s:'ExtraBold',size:48,c:'#1B2733',x:48,y:46});[[56,150],[78,110]].forEach(([y,w])=>R(pc,w,10,{x:532-w,y,fill:'#C8CCC9',r:3}));
R(pc,484,4,{x:48,y:122,fill:'#1B2733'});R(pc,160,10,{x:48,y:150,fill:'#C8CCC9',r:3});
T(pc,'Re: Plasterboard & ceilings',{s:'Semi Bold',c:'#2A2F2C',x:48,y:186});
T(pc,'Total: 72,000 + tax',{s:'Bold',size:44,c:'#111111',x:48,y:270,name:'C total (skit prop)'});
const asd=T(pc,'As discussed.',{s:'Semi Bold',size:56,c:'#111111',x:48,y:388});
T(pc,'Regards,',{c:'#444444',x:48,y:600});R(pc,180,3,{x:48,y:700,fill:'#9AA09C'});
const circ=El(pc,asd.width+70,asd.height+40,{stroke:'#D7263D',sw:5,x:48-35,y:388-20,name:'Red pen circle'});
const qm=T(pc,'?',{f:'Permanent Marker',size:96,c:'#D7263D',x:asd.x+asd.width+44,y:340,name:'Red pen ?'});
const [cC1]=[cap(sC,'One says “as discussed”.','“as discussed”.')];

// ═════ SCENE D — price below
const sD=scene('Scene D — price below');const tD=tag(sD,'D · “price below”');
const ph=keep('D phone',F(sD,440,900,{x:320,y:150,fill:'#070B09',r:64,stroke:'#2A3A30',sw:2,fx:[sh(18,50,0.55)],name:'D — phone, generic mail app'}));
const scr=F(ph,412,872,{x:14,y:14,fill:'#EDEDE8',r:50,name:'Screen'});   // off-white (was #FFFFFF, the brightest thing in the video while scrolled)
const SFP=36;
const ct=keep('D content',F(scr,412,2520,{x:0,y:0,clip:false,name:'Mail content (scrolls)'}));
T(ct,'4:59',{s:'Semi Bold',c:'#111111',x:40,y:20});T(ct,'‹ Inbox',{s:'Medium',size:34,c:'#3B403D',x:24,y:84});
const avD=AL(ct,'HORIZONTAL',{fill:'#2B6CB0',r:999,w:72,h:72,main:'CENTER',x:24,y:150,name:'Avatar D'});T(avD,'D',{s:'Bold',size:36,c:'#FFFFFF'});
T(ct,'Bidder D',{s:'Bold',size:36,c:'#111111',x:112,y:148});T(ct,'4:59 pm',{c:'#80868B',x:112,y:192});
T(ct,'Re: Tender',{s:'Bold',size:40,c:'#111111',x:24,y:270});
T(ct,'Price below. Cheers.',{size:44,lh:58,c:'#111111',w:364,x:24,y:344,name:'Body — Price below. Cheers.'});
T(ct,'Sent from my phone',{size:SFP,c:'#7C8287',w:384,x:14,y:2440,align:'CENTER',name:'Sent from my phone'});   // 36px, one line across the screen (was 32px, left); the 9:16 also pushes in on it, so the empty email reads from the picture
const sbar=R(scr,7,120,{x:400,y:40,fill:'#A3A8A4',r:4,opacity:0,name:'Scroll bar'});   // shows how far down the empty scroll goes
const [cD1,cD2]=cap2(sD,'One says “price below”…','…there’s nothing below.',null,'nothing below.');

// ═════ SCENE E — page 9
const sE=scene('Scene E — page 9');const tE=tag(sE,'E · cheapest');const tE9=tag(sE,'E · page 9');   // 'cheapest' until the flick, then 'page 9' (no early reveal)
const ew=keep('E stack',F(sE,620,860,{x:230,y:170,clip:false,name:'E stack (stapled quote)'}));
const page=(n,dx)=>F(ew,580,820,{x:20+dx,y:20+dx,fill:'#FBFBF8',stroke:'#D9DBD6',fx:[sh(6,18,0.35)],name:n});
const footer=(p,s)=>T(p,s,{f:'JetBrains Mono',c:'#7A7F7B',w:580,x:0,y:756,align:'CENTER',name:'Footer '+s});
const bars=(p,y0,n)=>{for(let i=0;i<n;i++)R(p,[440,380,460,300,420][i%5],12,{x:48,y:y0+i*38,fill:'#D2D5D0',r:3})};
const p9=page('Page 9 of 9',8);T(p9,'Notes & exclusions',{s:'Bold',size:40,c:'#1D1D1B',x:48,y:56});
T(p9,'Note 12:',{s:'Semi Bold',c:'#333333',x:40,y:150});R(p9,250,12,{x:200,y:166,fill:'#D2D5D0',r:3});
T(p9,'Note 13:',{s:'Semi Bold',c:'#333333',x:40,y:216});R(p9,210,12,{x:200,y:232,fill:'#D2D5D0',r:3});
const hiE=R(p9,500,52,{x:32,y:280,fill:'#FFE45C',op:0.9,r:4,name:'Highlighter — note 14'});
const n14=T(p9,'Note 14: Excludes ceilings.',{s:'Semi Bold',c:'#111111',x:40,y:286,name:'Note 14: Excludes ceilings.'});
bars(p9,380,9);footer(p9,'9 of 9');
const p7=page('Page 7 of 9',4);bars(p7,70,16);footer(p7,'7 of 9');
const p4=page('Page 4 of 9',0);bars(p4,70,16);footer(p4,'4 of 9');
const cov=page('Cover — Bidder E quotation',-4);
T(cov,'QUOTATION',{f:'Manrope',s:'ExtraBold',size:54,c:'#1D1D1B',x:48,y:64});T(cov,'Bidder E',{s:'Semi Bold',size:40,c:'#333333',x:48,y:146});
T(cov,'Plasterboard & ceilings package',{c:'#555555',w:484,x:48,y:206});
R(cov,484,140,{x:48,y:420,fill:'#F0F0EB',r:8});T(cov,'Total',{c:'#666666',x:72,y:438});T(cov,'47,900 + tax',{s:'Bold',size:54,c:'#111111',x:72,y:480,name:'E total (skit prop)'});
footer(cov,'1 of 9');R(cov,46,8,{x:16,y:40,fill:'#8F938F',r:2,rot:45,name:'Staple'});
sE.appendChild(tE);sE.appendChild(tE9);   // tags above the stack: the flicked pages pass behind the chip instead of cutting it in half
const [cE1,cE2]=cap2(sE,"One's the cheapest…",'till page nine.',null,'page nine.');

// ═════ SCENE F (+ twist) — whiteboard
const sF=scene('Scene F — whiteboard + twist');const tF=tag(sF,'F · whiteboard');
const bd=keep('F board',F(sF,1000,640,{x:40,y:190,fill:'#F4F5F1',r:12,stroke:'#A7ADA8',sw:14,fx:[sh(16,44,0.5)],name:'F — whiteboard (designed)'}));
R(bd,1000,20,{y:620,fill:'#8C928D',name:'Marker tray'});
const sk=F(bd,250,190,{x:712,y:330,clip:false,opacity:0.22,name:'Half-erased site sketch'});R(sk,240,150,{stroke:'#4A5A7A',sw:3});R(sk,3,150,{x:120,fill:'#4A5A7A'});R(sk,240,3,{y:75,fill:'#4A5A7A'});R(sk,140,3,{x:60,y:20,fill:'#4A5A7A',rot:-28});
R(bd,180,120,{x:780,y:360,fill:'#F4F5F1',op:0.85,fx:[blur(24)],name:'Eraser smudge'});
El(bd,300,170,{x:700,y:380,fill:'#FFFFFF',op:0.6,fx:[blur(48)],name:'Glare'});
const WL=['Boards supply & fix – 1,240 m² @ 38.50','Ceilings – 380 m² @ 62.00 – INCL','Jointing & finishing – incl','Access – incl','Validity 30 days'];
const wl=WL.map((s,i)=>T(bd,s,{f:'Kalam',s:'Regular',size:42,c:'#1E3A8A',x:56,y:44+i*76,name:'WB — '+s}));
const tot=T(bd,'TOTAL 71,300 + tax',{f:'Permanent Marker',size:50,c:'#161616',x:56,y:430,name:'WB — TOTAL 71,300 + tax'});
const cl=wl[1];const ulw=cl.width+16;
const ul1=R(bd,ulw,6,{x:50,y:cl.y+cl.height-8,fill:'#D32F2F',r:3,rot:-0.4,name:'Underline 1'});
const ul2=R(bd,ulw-30,6,{x:58,y:cl.y+cl.height+6,fill:'#D32F2F',r:3,rot:-0.6,name:'Underline 2'});
const stk=keep('F sticky',F(sF,300,300,{x:700,y:610,fill:'#FFE66D',fx:[sh(10,24,0.45)],name:'Sticky note — ceilings IN ✓'}));
// the sticky does a different job from the caption: it calls back bid E ('Excludes ceilings.') instead of repeating 'most complete'
T(stk,'ceilings',{f:'Kalam',s:'Bold',size:50,lh:60,c:'#2B2B2B',x:30,y:34,name:'Sticky — ceilings'});
T(stk,'IN',{f:'Kalam',s:'Bold',size:96,lh:104,c:'#2B2B2B',x:30,y:100,name:'Sticky — IN'});
SV(stk,'<svg width="118" height="100" viewBox="0 0 118 100" xmlns="http://www.w3.org/2000/svg"><path d="M10 56 C20 64 30 76 40 88 C58 58 82 30 108 10" fill="none" stroke="#1F7A2E" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>',{name:'Sticky — tick',x:150,y:120});
stk.rotation=4;
const [cF1,cF2]=cap2(sF,'And one…','is a photo of a whiteboard.',null,'whiteboard.');
const [cT1,cT2]=cap2(sF,'Honestly?','Most complete one.',null,'Most complete');

// ═════ SCENE G — self-own
const sG=scene('Scene G — self-own');
const mw=keep('G mail',F(sG,960,620,{x:60,y:200,fill:'#FFFFFF',r:16,stroke:'#CDD3CF',fx:[sh(16,44,0.5)],name:'G — generic mail window (QS’s own sent email)'}));
R(mw,960,60,{fill:'#ECEFEC'});dots(mw,24,22);T(mw,'Sent',{s:'Medium',c:'#555555',x:112,y:10});
T(mw,'To:',{c:'#8A908C',x:28,y:74});T(mw,'Bidders A–F',{c:'#222222',x:96,y:74});R(mw,960,1,{y:126,fill:'#E3E6E3'});
T(mw,'Subject:',{c:'#8A908C',x:28,y:140});T(mw,'Tender: Plasterboard & ceilings package',{s:'Semi Bold',c:'#111111',x:160,y:140});R(mw,960,1,{y:192,fill:'#E3E6E3'});
// the email carries the punchline (body set large enough to read), so the caption stays short: 'In fairness… here's what I sent.'
const body=T(mw,'Drawings attached. Please price.',{size:52,c:'#111111',x:28,y:228,name:'Body — Drawings attached. Please price.'});
const [cG1,cG2]=cap2(sG,'In fairness…','here’s what I sent.',null,'what I sent.');

// ═════ SCENE H — product (illustrative stand-in, demo data). Only what is live:
// (a) the tender's scope lines, identical for every bidder, rate column blank (bidders never see your rates or budget)
// (b) 'Compare bids': one row per bidder, bid TOTALS excl. tax, 'Lowest' tag (no per-line matrix across bidders — branch-only;
//     no incl. column / 'calc.' / Compare-on toggle on Global: the live Global screen still says GST and works it out at 15%)
// (c) open Bidder F → 'Award bid' → payment contract with milestones + retention (the agreement / e-sign step is not shown on Global: NZ-law templates)
// Everything in this scene sits in one column, x 100..980, so the 9:16 cut can punch in on it and keep text inside x 150..930.
const RT=t=>+(t-1.3).toFixed(3);   // H and Z keyframes are written in real video seconds of the 31.8s cut (W() adds 1.3 from 16.7)
const sH=scene('Scene H — QSME same lines, compare totals, award');
const lgS=logo(sH,230,60,64,'QSME logo (small)');
const ill=pill(sH,'Illustrative · demo data',{fill:G,stroke:SU,sw:2,dash:[8,6],c:MU,s:'Medium',r:10,py:10,px:18,name:'Illustrative · demo data'});
ill.x=1020-ill.width;ill.y=64+(lgS.height-ill.height)/2;
// (a) six tabbed bidder sheets, stacked: the tab changes, the lines never do
const LINES=[['Boards supply & fix','1,240 m²'],['Ceilings','380 m²'],['Jointing & finishing','1,240 m²'],['Access','1 item']];
const SW=880,SBH=500,TABH=52,TABW=128,TABG=140;
const stack=keep('H stack',F(sH,SW,TABH+SBH,{x:100,y:262,clip:false,name:'Same lines — six bidder sheets (illustrative)'}));
const sheets='ABCDEF'.split('').map((L,i)=>{
  const sht=F(stack,SW,TABH+SBH,{clip:false,name:'Sheet — Bidder '+L});
  const body=F(sht,SW,SBH,{y:TABH-6,fill:RA,r:20,stroke:BO,sw:2,fx:[sh(14,40,0.45)],clip:false,name:'Sheet body '+L});
  const tab=F(sht,TABW,TABH,{x:18+i*TABG,y:0,fill:RA,r:12,stroke:BO,sw:2,name:'Tab '+L});
  R(sht,TABW-4,14,{x:20+i*TABG,y:TABH-10,fill:RA,name:'Tab join '+L});
  hlLast(T(tab,'Bidder '+L,{s:'Semi Bold',size:24,c:MU,w:TABW,x:0,y:10,align:'CENTER',name:'Tab text '+L}),L);
  T(body,'Plasterboard & ceilings',{s:'Semi Bold',size:32,c:INK,x:32,y:26});
  T(body,'Cut from your estimate',{size:24,c:MU,w:360,x:SW-32-360,y:32,align:'RIGHT'});
  T(body,'LINE',{f:'JetBrains Mono',s:'Medium',size:22,c:SU,x:32,y:98});T(body,'QTY',{f:'JetBrains Mono',s:'Medium',size:22,c:SU,w:190,x:430,y:98,align:'RIGHT'});T(body,'RATE',{f:'JetBrains Mono',s:'Medium',size:22,c:SU,x:660,y:98});
  R(body,SW-64,2,{x:32,y:138,fill:BO});
  LINES.forEach(([n,q],j)=>{const y=160+j*80;T(body,n,{s:'Medium',size:32,c:INK,x:32,y:y+8,name:'Line '+n});T(body,q,{f:'JetBrains Mono',size:30,c:MU,w:190,x:430,y:y+10,align:'RIGHT'});
    R(body,188,56,{x:660,y,fill:G,r:10,stroke:SU,sw:2,dash:[6,6],name:'Rate — blank for bidders'})});
  return sht});
const hid=AL(sH,'HORIZONTAL',{gap:14,x:100,y:840,name:'Callout — rates hidden'});
SV(hid,'<svg width="26" height="32" viewBox="0 0 26 32" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="13" width="22" height="17" rx="4" fill="#A9B8AE"/><path d="M7 13 V9 a6 6 0 0 1 12 0 V13" fill="none" stroke="#A9B8AE" stroke-width="3.2"/></svg>',{name:'Lock'});
T(hid,'Bidders never see your rates or budget.',{s:'Medium',size:34,c:MU});
// (b) Compare bids — bid totals excl. tax only (illustrative demo figures), 'Lowest' on F
const TW=880,RW=TW-48;
const tbl=keep('H table',F(sH,TW,612,{x:100,y:262,fill:RA,r:24,stroke:BO,sw:2,fx:[sh(20,60,0.5)],clip:false,name:'Compare bids — totals table (illustrative stand-in)'}));
T(tbl,'Compare bids',{s:'Semi Bold',size:38,c:INK,x:32,y:28});
T(tbl,'BIDDER',{f:'JetBrains Mono',s:'Medium',size:24,c:SU,x:40,y:108});
T(tbl,'TOTAL (EXCL. TAX)',{f:'JetBrains Mono',s:'Medium',size:24,c:SU,w:320,x:24+280,y:108,align:'RIGHT'});   // right edge = the totals' right edge (row x 600)
const BIDS=[['A','74,850'],['B','76,200'],['C','72,000'],['D','73,480'],['E','71,940'],['F','71,300']];
const RB=['#14211A','#182A1F'];
const trows=BIDS.map(([L,ex],i)=>{const r=F(tbl,RW,66,{x:24,y:150+i*74,fill:RB[i%2],r:10,clip:false,name:'Row — Bidder '+L});
  T(r,'Bidder '+L,{s:'Medium',size:34,c:INK,x:16,y:12});
  T(r,ex,{f:'JetBrains Mono',s:'Medium',size:36,c:INK,w:260,x:340,y:11,align:'RIGHT',name:'Total excl. tax '+L});   // clear of the 'Lowest' pill even at its 1.5x pop
  return r});
const low=pill(trows[5],'Lowest',{fill:SO,stroke:AC,sw:2,c:AC,s:'Semi Bold',size:28,py:6,px:18,dot:AC,name:'Tag — Lowest'});low.x=RW-16-low.width;low.y=(66-low.height)/2;
const lt=AL(sH,'HORIZONTAL',{gap:16,x:100,y:904,name:'Lower-third'});R(lt,8,44,{fill:AC,r:4});T(lt,'QSME · tendering & estimating software',{s:'Medium',c:MU});
// (c) open Bidder F → Award bid → contract
const scrim=R(sH,TW,612,{x:100,y:262,fill:'#000000',op:0.85,r:24,name:'Scrim over table'});   // table at ~15% behind the bid and the contract, so no row labels peek out
const bp=keep('H bid panel',F(sH,840,286,{x:120,y:518,fill:RA,r:24,stroke:BO,sw:2,fx:[sh(24,60,0.6)],clip:false,name:'Bid — Bidder F (illustrative)'}));
T(bp,'Bidder F',{f:'Space Grotesk',s:'Bold',size:44,c:INK,x:36,y:26});
T(bp,'71,300 excl. tax',{s:'Medium',size:32,c:MU,x:36,y:90});
T(bp,'Detailed price breakdown ›',{size:26,c:SU,x:36,y:140});
const awb=pill(bp,'Award bid',{fill:AC,c:OA,f:'Space Grotesk',s:'Bold',size:34,py:12,px:30,name:'Button — Award bid'});awb.x=36;awb.y=192;
const cc=keep('H contract',F(sH,TW,250,{x:100,y:500,fill:RA,r:24,stroke:AC,sw:2,fx:[sh(24,60,0.6),sh(0,40,0.25,0,AC)],name:'Contract created (illustrative)'}));
SV(cc,'<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="32" fill="#4BCD32"/><path d="M18 33 L28 43 L47 22" fill="none" stroke="#06130A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',{name:'Check',x:32,y:34});
T(cc,'Contract created',{f:'Space Grotesk',s:'Bold',size:48,c:INK,x:116,y:26});T(cc,'Bidder F · 71,300 + tax',{size:32,c:MU,x:116,y:88});
const chipsRow=AL(cc,'HORIZONTAL',{gap:16,x:32,y:156,name:'Contract chips'});
const chips=['Milestones','Retention 5%'].map(s=>pill(chipsRow,s,{fill:SO,stroke:AC,sw:2,c:AC,s:'Medium',name:'Chip — '+s}));
const curH=keep('H cursor',SV(sH,cursorSvg,{name:'Cursor H'}));
const [cH1,cH2]=cap2(sH,'So we built QSME.','Same lines for every bidder.',null,'Same lines');
const cTb=cap(sH,'Six bids. One table.','One table.');
const cAw=cap(sH,'Award → contract created','contract created');

// ═════ SCENE Z — end card
const sZ=scene('Scene Z — End card');
// Owner CTA rule (2026-10-03): the card reads exactly 'Book a 30-minute demo at qsme.build'. No pricing line of any kind.
const ZY=392,Z_AT_DY=10;   // logo top; the block (logo → underline) is centred on y ~630, the point the 9:16 cut scales the end card about
const lgZ=logo(sZ,620,255,ZY,'QSME logo (end card)');   // x 255 (was 230): the Global wordmark has no ®, so its frame is shifted 25px to keep the letters centred on x 540
const cta1=T(sZ,'Book a 30-minute demo',{f:'Space Grotesk',s:'Bold',size:76,lh:84,ls:-2,c:INK,w:960,x:60,y:ZY+270,align:'CENTER',name:'CTA line 1 — Book a 30-minute demo'});
const ctaRow=F(sZ,960,140,{x:60,y:ZY+356,clip:false,name:'CTA line 2 — at qsme.build'});
const atT=T(ctaRow,'at',{f:'Space Grotesk',s:'Medium',size:76,lh:110,ls:-2,c:MU,name:'at'});
const url=T(ctaRow,'qsme.build',{f:'Space Grotesk',s:'Bold',size:108,lh:110,ls:-3,c:AC,name:'qsme.build'});
{const gap=24,tw=atT.width+gap+url.width;atT.x=Math.round(480-tw/2);url.x=Math.round(atT.x+atT.width+gap);url.y=0;atT.y=Z_AT_DY;}
const uline=R(ctaRow,Math.round(url.width-6),7,{fill:AC,r:4,x:url.x+3,y:128,name:'URL underline'});
const btn=ctaRow;   // (kept for the return value: btnW = the CTA row width)

// ═════ COUNTER (global, on top)
const ctr=F(M,260,90,{x:766,y:64,clip:false,name:'Counter'});
const cts=[0,1,2,3,4,5,6].map(i=>{const t=T(ctr,i+'/6',{f:'JetBrains Mono',s:'Medium',size:60,c:INK,w:240,x:10,y:0,align:'RIGHT',name:'Counter '+i+'/6'});hl(t,String(i));return t});

// cursor H: rests on 'Award bid' (its base position); keyframes move it there from row F
const mB=M.absoluteBoundingBox;
const ctrOf=n=>{const b=n.absoluteBoundingBox;return{x:b.x+b.width/2-mB.x,y:b.y+b.height/2-mB.y}};
const pAw=ctrOf(awb);const pRow=(()=>{const b=trows[5].absoluteBoundingBox;return{x:b.x+170-mB.x,y:b.y+b.height/2-mB.y}})();
curH.x=pAw.x-6;curH.y=pAw.y-4;const dRow={x:pRow.x-pAw.x,y:pRow.y-pAw.y};

// whiteboard punch-in: sized so every board line stays inside the 4:5 safe box (60..1020), centred on 'Ceilings … INCL'
const wbB=[...wl,tot].map(n=>n.absoluteBoundingBox);
const bx0=Math.min(...wbB.map(b=>b.x))-mB.x,bx1=Math.max(...wbB.map(b=>b.x+b.width))-mB.x,by0=Math.min(...wbB.map(b=>b.y))-mB.y,by1=Math.max(...wbB.map(b=>b.y+b.height))-mB.y;
const bdB=bd.absoluteBoundingBox,BCx=bdB.x+bdB.width/2-mB.x,BCy=bdB.y+bdB.height/2-mB.y;const lcy=ctrOf(cl).y;
const Z=+Math.min(1.5,920/(bx1-bx0),1180/(by1-by0)).toFixed(3);
let zx=540-(BCx+Z*((bx0+bx1)/2-BCx)),zy=520-(BCy+Z*(lcy-BCy));
{const top=BCy+Z*(by0-BCy)+zy,bot=BCy+Z*(by1-BCy)+zy;if(top<80)zy+=80-top;if(bot>1270)zy-=bot-1270}
zx=Math.round(zx);zy=Math.round(zy);

// ── screenshots of each scene before hiding (diagnostic, may be unsupported)
const shots=[];for(const s of scenes){try{await s.screenshot({scale:0.3});shots.push(s.name)}catch(e){shots.push('fail '+e.message);break}}

// ═════ MOTION
const EZ={o:{type:'EASE_OUT'},i:{type:'EASE_IN'},io:{type:'EASE_IN_AND_OUT'},l:{type:'LINEAR'},h:{type:'HOLD'},s:{type:'CUSTOM_CUBIC_BEZIER',easingFunctionCubicBezier:{x1:0.16,y1:1,x2:0.3,y2:1}}};
const Q=[];const K=(n,f,k)=>Q.push([n,f,k]);
const vis=(n,a,b)=>K(n,'OPACITY',[...(a<=0?[[0,1]]:[[0,0],[a,1,'h']]),...(b<DUR?[[b,0,'h']]:[])]);
const fin=(n,a,d,b)=>K(n,'OPACITY',[[a,0],[a+d,1,'o'],...(b&&b<DUR?[[b,0,'h']]:[])]);
const mv=(n,a,d,dx,dy,e)=>{if(dx)K(n,'TRANSLATION_X',[[a,dx],[a+d,0,e||'o']]);if(dy)K(n,'TRANSLATION_Y',[[a,dy],[a+d,0,e||'o']])};
const sc=(n,k)=>{K(n,'SCALE_X',k);K(n,'SCALE_Y',k)};
const SC=[[s0,0,2.4],[sA,2.4,4.2],[sB,4.2,6.1],[sC,6.1,7.6],[sD,7.6,10.0],[sE,10.0,12.3],[sF,12.3,16.7],[sG,16.7,19.4],[sH,19.4,RT(28.7)],[sZ,RT(28.7),99]];
SC.forEach(([s,a,b])=>vis(s,a,b));
// counter steps
const CT=[0,2.4,4.2,6.1,7.6,10.0,12.3,16.7];cts.forEach((t,i)=>{vis(t,CT[i],CT[i+1]);if(i)sc(t,[[CT[i],1.35],[CT[i]+0.18,1,'o']])});
// hook
sc(h1,[[0,1.06],[0.2,1,'o']]);K(h1,'TRANSLATION_X',[[0,0.03*h1.width],[0.2,0,'o']]);vis(h2,0.4,99);sc(h2,[[0.4,1.32],[0.52,1,'i']]);K(h2,'TRANSLATION_X',[[0.4,0.16*h2.width],[0.52,0,'i']]);   // pops anchored on the left edge (x 60): '6 formats.' no longer clips at the frame edge
fin(chip,0.55,0.2);mv(chip,0.55,0.25,0,16);
banners.forEach((b,i)=>{const t=0.3+i*0.12;fin(b,t,0.16);mv(b,t,0.2,0,-26)});   // motion inside the first second: everyone at 4:59
// A
vis(cA1,2.5,99);vis(cA2,3.05,99);
fin(aw,2.4,0.24);mv(aw,2.4,0.32,240,0);K(aw,'ROTATION',[[2.4,10],[2.72,0,'o'],[3.25,0,'l'],[3.65,-6,'io']]);
// B
sc(win,[[4.2,0.97],[4.4,1,'o']]);vis(cB1,4.3,99);vis(cB2,5.0,99);
mv(curB,4.25,0.45,200,300,'io');vis(pressC,4.75,99);
vis(alert,4.8,5.7);sc(alert,[[4.8,0.94],[4.92,1,'o']]);
// C
fin(pc,6.1,0.22);mv(pc,6.1,0.26,0,60);vis(cC1,6.2,99);
vis(circ,6.75,99);sc(circ,[[6.75,1.15],[6.9,1,'o']]);vis(qm,6.95,99);
// D
fin(ph,7.6,0.25);mv(ph,7.6,0.3,0,120);vis(cD1,7.7,99);
K(ct,'TRANSLATION_Y',[[8.35,0],[9.25,-1700,'io']]);vis(cD2,9.4,99);
K(sbar,'OPACITY',[[8.35,0],[8.5,1,'o']]);K(sbar,'TRANSLATION_Y',[[8.35,0],[9.25,640,'io']]);
// E
fin(ew,10.0,0.22);mv(ew,10.0,0.25,0,60);vis(cE1,10.1,99);
vis(tE,0,11.35);vis(tE9,11.35,99);   // tag flips to 'page 9' at 11.65 (real), on the last flick, just before 'till page nine.'
[[cov,10.8],[p4,11.0],[p7,11.18]].forEach(([p,t])=>{K(p,'TRANSLATION_Y',[[t,0],[t+0.17,-1250,'i']]);K(p,'ROTATION',[[t,0],[t+0.17,7,'i']])});
K(hiE,'WIDTH',[[11.5,1],[11.9,500,'io']]);vis(cE2,11.4,99);
// F — the board is on screen from the first frame of the cut (the old 0→1 fade left a dark/dim frame at 12.8s)
K(bd,'SCALE_X',[[12.3,1.06],[12.55,1,'o'],[14.45,1,'l'],[14.6,Z,'s'],[15.1,Z,'l'],[15.25,1,'o']]);K(bd,'SCALE_Y',[[12.3,1.06],[12.55,1,'o'],[14.45,1,'l'],[14.6,Z,'s'],[15.1,Z,'l'],[15.25,1,'o']]);
K(bd,'TRANSLATION_X',[[14.45,0],[14.6,zx,'s'],[15.1,zx,'l'],[15.25,0,'o']]);K(bd,'TRANSLATION_Y',[[14.45,0],[14.6,zy,'s'],[15.1,zy,'l'],[15.25,0,'o']]);
[wl[0],wl[2],wl[3],wl[4],tot].forEach(n=>K(n,'OPACITY',[[14.45,1],[14.6,0.4,'o'],[15.1,0.4,'l'],[15.25,1,'o']]));
vis(tF,12.3,14.45);
K(ul1,'WIDTH',[[13.75,1],[13.95,ulw,'o']]);K(ul2,'WIDTH',[[14.0,1],[14.18,ulw-30,'o']]);vis(ul1,13.75,99);vis(ul2,14.0,99);
vis(cF1,12.3,14.45);vis(cF2,13.1,14.45);
vis(stk,15.3,99);sc(stk,[[15.3,1.6],[15.42,1,'i']]);K(stk,'ROTATION',[[15.3,12],[15.42,0,'i']]);
vis(cT1,15.45,99);vis(cT2,15.85,99);
// G
fin(mw,16.7,0.25);mv(mw,16.7,0.3,0,50);vis(cG1,16.85,99);vis(cG2,17.6,99);
K(mw,'TRANSLATION_X',[[18.3,0],[18.36,-10,'o'],[18.43,8,'io'],[18.5,0,'o']]);
// H (times in real video seconds through RT)
vis(lgS,RT(20.7),99);vis(ill,RT(20.7),99);
// (a) six sheets land one on top of the other, 0.12s apart: tab changes, lines don't
sheets.forEach((s,i)=>{const t=RT(20.67+i*0.13);K(s,'OPACITY',[[t,0],[t+0.05,1,'o']]);K(s,'TRANSLATION_Y',[[t,-34],[t+0.16,0,'o']]);sc(s,[[t,1.04],[t+0.16,1,'o']])});
K(stack,'OPACITY',[[RT(24.16),1],[RT(24.29),0,'i']]);K(stack,'TRANSLATION_Y',[[RT(24.16),0],[RT(24.29),-30,'i']]);
K(hid,'OPACITY',[[RT(22.1),0],[RT(22.3),1,'o'],[RT(24.16),1,'l'],[RT(24.29),0,'i']]);K(hid,'TRANSLATION_Y',[[RT(22.1),16],[RT(22.35),0,'o']]);   // lock line up ~2.1s (was 1.3s)
vis(cH1,RT(20.7),RT(24.3));vis(cH2,RT(21.5),RT(24.3));
// (b) totals table, rows in, 'Lowest' on F
K(tbl,'OPACITY',[[RT(24.27),0],[RT(24.42),1,'o']]);mv(tbl,RT(24.27),0.24,0,50);
trows.forEach((r,i)=>{const t=RT(24.45+i*0.08);K(r,'OPACITY',[[t,0],[t+0.1,1,'o']]);K(r,'TRANSLATION_X',[[t,70],[t+0.2,0,'s']])});
vis(low,RT(25.25),99);sc(low,[[RT(25.25),1.5],[RT(25.37),1,'i']]);
fin(lt,RT(24.5),0.25);vis(cTb,RT(24.35),RT(26.95));
// (c) click Bidder F → bid opens → Award bid → contract created
const cIn={x:dRow.x+(1000-pRow.x),y:dRow.y-100};   // start: master x 1000 (right of the table), 100px above row F's centre, so it passes over row E and clears the 'Lowest' tag
K(curH,'OPACITY',[[0,0],[RT(25.75),0,'h'],[RT(25.85),1,'o'],[RT(27.1),1,'l'],[RT(27.25),0,'o']]);
K(curH,'TRANSLATION_X',[[RT(25.75),cIn.x],[RT(26.2),dRow.x,'io'],[RT(26.45),dRow.x,'l'],[RT(26.8),0,'io']]);
K(curH,'TRANSLATION_Y',[[RT(25.75),cIn.y],[RT(26.2),dRow.y,'io'],[RT(26.45),dRow.y,'l'],[RT(26.8),0,'io']]);
fin(scrim,RT(26.3),0.15);
K(bp,'OPACITY',[[RT(26.3),0],[RT(26.45),1,'o'],[RT(26.95),1,'l'],[RT(27.05),0,'o']]);mv(bp,RT(26.3),0.2,0,60);
sc(awb,[[RT(26.83),1],[RT(26.88),0.9,'o'],[RT(26.98),1,'o']]);
fin(cc,RT(26.95),0.2);mv(cc,RT(26.95),0.28,0,70);chips.forEach((c,i)=>vis(c,RT(27.15+i*0.1),99));
vis(cAw,RT(26.95),99);
// Z
fin(lgZ,RT(28.67),0.15);sc(lgZ,[[RT(28.67),0.94],[RT(29.1),1,'o']]);fin(cta1,RT(28.82),0.18);mv(cta1,RT(28.82),0.28,0,24);fin(ctaRow,RT(28.98),0.22);mv(ctaRow,RT(28.98),0.3,0,30);
const uW=uline.width;vis(uline,RT(29.28),99);K(uline,'WIDTH',[[RT(29.28),1],[RT(29.62),uW,'o']]);

// resting state on canvas = end card
scenes.forEach(s=>{if(s!==sZ)s.opacity=0});cts.forEach(t=>t.opacity=0);
const errs=[];let nT=0,tl=null;
const kf=k=>k.map(([t,v,e])=>{const o={timelinePosition:Math.round(W(t)*1000)/1000,value:{type:'FLOAT',value:v}};if(e)o.easing=EZ[e];return o});
for(const [n,f,k] of Q){try{n.applyManualKeyframeTrack({type:'PROPERTY',name:f},{keyframes:kf(k)});nT++}catch(e){try{n.manualKeyframeTracks={...(n.manualKeyframeTracks||{}),[f]:{keyframes:kf(k)}};nT++;errs.push('fallback ok '+n.name+' '+f+': '+e.message)}catch(e2){errs.push(n.name+' '+f+': '+e.message+' | '+e2.message)}}
  if(!tl&&nT){try{const t=n.timelines;if(t&&t[0]){tl=t[0];n.setTimelineDuration(t[0].id,DUR)}}catch(e){errs.push('timeline: '+e.message)}}}
// fill tracks (colour): row F turns green when it is tagged 'Lowest', flashes on the click
const C=(h)=>({type:'COLOR',value:{...hex(h),a:1}});
const FTk=(n,keys)=>{try{n.manualKeyframeTracks={...(n.manualKeyframeTracks||{}),fills:{0:{keyframes:keys.map(([t,h,e])=>({timelinePosition:Math.round(W(t)*1000)/1000,value:C(h),...(e?{easing:EZ[e]}:{})}))}}};nT++}catch(e){errs.push('fill '+n.name+': '+e.message)}};
FTk(trows[5],[[RT(25.24),RB[1]],[RT(25.25),'#1F4019','h'],[RT(26.24),'#1F4019','l'],[RT(26.25),'#2E6526','h'],[RT(26.45),'#1F4019','o']]);
let tls=null;try{tls=sZ.timelines;if(tls&&tls[0]&&tls[0].duration<DUR)sZ.setTimelineDuration(tls[0].id,DUR);tls=sZ.timelines}catch(e){errs.push('final timeline: '+e.message)}
return{frameId:M.id,x:M.x,y:M.y,removed,tracks:nT,queued:Q.length,errs:errs.slice(0,25),errCount:errs.length,timelines:tls,fontFallbacks:fb,shots,ids,
  aBox:pa.absoluteBoundingBox&&{x:Math.round(pa.absoluteBoundingBox.x-M.x),y:Math.round(pa.absoluteBoundingBox.y-M.y),w:Math.round(pa.absoluteBoundingBox.width),h:Math.round(pa.absoluteBoundingBox.height)},
  zoom:{Z,zx,zy},cursorH:[Math.round(curH.x),Math.round(curH.y)],dRow:[Math.round(dRow.x),Math.round(dRow.y)],illW:Math.round(ill.width),btnW:Math.round(btn.width),cap2H:Math.round(cG2.height),lowX:Math.round(low.x)};
