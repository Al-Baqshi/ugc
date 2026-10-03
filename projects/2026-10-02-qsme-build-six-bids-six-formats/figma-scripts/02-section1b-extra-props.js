// use_figma script 02 (new, from the creative-director review of 2026-10-02)
// File f8xxaFvwdi6ijGxYj9WEWP, page 2:5. skillNames: resource:figma-use. Run AFTER script 01.
// Builds Section 1b "Props for carousel and reel": Bid E cover + filler pages 2–8, the generic "Can't sort merged cells." alert
// (+ a preview over Prop B), the QS's own sent-email screen (1440×900), six generic 4:59 pm banners, the sticky note "F",
// the Hook 2 binder sleeve label, the lower-third and the end cards (9:16 and 4:5). Exact strings from post.json.
// No OS/app branding anywhere: no app icons, no system blue, no traffic lights.
const P=await figma.getNodeByIdAsync('2:5');await figma.setCurrentPageAsync(P);
const SEC_NAME='Props for carousel and reel — Section 1b';
const dupe=P.children.find(n=>n.name===SEC_NAME);
if(dupe)return{error:'Section 1b already exists; not rebuilt.',sectionId:dupe.id};
const hex=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');return{r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255}};
const S=(h,o)=>[o===undefined?{type:'SOLID',color:hex(h)}:{type:'SOLID',color:hex(h),opacity:o}];
const avail=await figma.listAvailableFontsAsync();
const AV=new Set(avail.map(f=>f.fontName.family+'|'+f.fontName.style));
const fontFallbacks=[];const FM={};
const FN=(f,s)=>{const k=f+'|'+s;if(FM[k])return FM[k];let r;if(AV.has(k))r={family:f,style:s};else{r=AV.has(f+'|Regular')?{family:f,style:'Regular'}:{family:'Inter',style:'Regular'};fontFallbacks.push(k+' -> '+r.family+' '+r.style);}FM[k]=r;return r};
const WANT=[['Space Grotesk','Bold'],['Space Grotesk','Medium'],['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['Inter','Bold'],['JetBrains Mono','Medium'],['Manrope','ExtraBold'],['Permanent Marker','Regular']];
const LOADED={};WANT.forEach(([f,s])=>{const r=FN(f,s);LOADED[r.family+'|'+r.style]=r;});
await Promise.all(Object.values(LOADED).map(fn=>figma.loadFontAsync(fn)));
// Prop B is cloned for the alert preview: load whatever fonts it really uses.
const sec1=P.children.find(n=>n.name==='Static post — 1080×1350');
const propB=sec1?sec1.findChild(n=>n.name.startsWith('Prop B')):null;
if(propB){const fs={};for(const tn of propB.findAllWithCriteria({types:['TEXT']})){for(const sg of tn.getStyledTextSegments(['fontName']))fs[sg.fontName.family+'|'+sg.fontName.style]=sg.fontName;}await Promise.all(Object.values(fs).map(f=>figma.loadFontAsync(f)));}
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
function SV(p,str,o={}){const n=track(figma.createNodeFromSvg(str));n.fills=[];if(o.name)n.name=o.name;p.appendChild(n);if(o.x!==undefined)n.x=o.x;if(o.y!==undefined)n.y=o.y;return n}
function AL(p,dir,o={}){const n=track(figma.createAutoLayout(dir));n.fills=o.fill?S(o.fill,o.op):[];if(o.name)n.name=o.name;if(o.pad){n.paddingTop=o.pad[0];n.paddingRight=o.pad[1];n.paddingBottom=o.pad[2];n.paddingLeft=o.pad[3];}if(o.gap!==undefined)n.itemSpacing=o.gap;if(o.r!==undefined)n.cornerRadius=o.r;if(o.stroke){n.strokes=S(o.stroke);n.strokeWeight=o.sw||1;n.strokeAlign='INSIDE';}if(o.align)n.counterAxisAlignItems=o.align;if(o.main)n.primaryAxisAlignItems=o.main;if(o.fx)n.effects=o.fx;if(p)p.appendChild(n);
  if(o.w){n.resize(o.w,o.h||Math.max(n.height,10));n.layoutSizingHorizontal='FIXED';n.layoutSizingVertical=o.h?'FIXED':'HUG';}
  if(o.x!==undefined)n.x=o.x;if(o.y!==undefined)n.y=o.y;return n}
const sh=(y,b,a,sp=0)=>({type:'DROP_SHADOW',color:{r:0,g:0,b:0,a},offset:{x:0,y},radius:b,spread:sp,visible:true,blendMode:'NORMAL'});
const ICON=(path,c,sw)=>'<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g stroke="'+c+'" stroke-width="'+(sw||1.8)+'" fill="none" stroke-linecap="round" stroke-linejoin="round">'+path+'</g></svg>';
const named={};
const comp=await figma.getNodeByIdAsync('2:27');let logoInfo=comp&&comp.type==='COMPONENT'?'ok':'2:27 not found; text fallback used';
if(comp&&comp.type==='COMPONENT'){try{for(const tn of comp.findAllWithCriteria({types:['TEXT']})){for(const sg of tn.getStyledTextSegments(['fontName']))await figma.loadFontAsync(sg.fontName);}}catch(e){logoInfo='font preload skipped: '+e.message;}}
// Logo cropped to the visible wordmark (x 192–1477, y 133–549 of the 1509×688 component).
function logo(p,w,name){const s=w/1285;const fr=F(p,w,416*s,{name:name||'QSME logo (instance of 2:27)'});if(comp&&comp.type==='COMPONENT'){const i=track(comp.createInstance());fr.appendChild(i);i.rescale(s);i.x=-192*s;i.y=-133*s;}else{T(fr,'QSME',{f:'Space Grotesk',s:'Bold',size:Math.round(w/4.5),c:'#3DC023',x:0,y:0});}return fr}

// Place below everything already on the page (x stays 0, so x>=4000,y=0 remains free).
const bottom=P.children.reduce((m,n)=>Math.max(m,n.y+n.height),0);
const sec=figma.createSection();track(sec);sec.name=SEC_NAME;sec.x=0;sec.y=Math.ceil(bottom+200);sec.resizeWithoutConstraints(3991,4000);sec.fills=S('#E7EBE7');
const H=(str,y)=>T(sec,str,{f:'JetBrains Mono',s:'Medium',size:22,c:'#5B6B60',ls:6,x:120,y});
const cap=(n,h,b)=>{T(sec,h,{f:'Space Grotesk',s:'Bold',size:22,c:'#0C1310',x:n.x,y:n.y+n.height+20});return T(sec,b,{size:16,lh:23,c:'#4A5A50',w:Math.max(n.width,300),x:n.x,y:n.y+n.height+52});};
let maxBottom=0;const upd=t=>{maxBottom=Math.max(maxBottom,t.y+t.height);};

// ── Row 1: Bid E cover + filler pages 2–8 (print · A4) ──
H('BID E · COVER + FILLER PAGES 2–8 (PRINT · A4, STAPLE IN FRONT OF PAGE 9)',100);
const Y1=150;
const cover=F(sec,424,600,{fill:'#FFFFFF',name:'Prop E — cover, page 1 of 9 (print · A4)',x:120,y:Y1});
R(cover,24,3.5,{fill:'#9AA0A6',r:1,x:12,y:22,rot:40,name:'Staple'});
T(cover,'Bidder E',{f:'Manrope',s:'ExtraBold',size:34,c:'#1B1F24',x:34,y:70});
T(cover,'QUOTATION',{s:'Bold',size:13,ls:14,c:'#6B7078',x:34,y:122});
T(cover,'Tender – Plasterboard & ceilings package',{s:'Medium',size:15,c:'#2A2F36',x:34,y:150});
R(cover,356,1,{fill:'#D9DCE0',x:34,y:186});
R(cover,356,56,{fill:'#F4F6F8',stroke:'#1B1F24',sw:1.5,x:34,y:212,name:'Total box (cover)'});
T(cover,'TOTAL (excl. tax)',{s:'Bold',size:13,c:'#1B1F24',x:48,y:231});const ct=T(cover,'47,900',{f:'JetBrains Mono',s:'Medium',size:22,c:'#1B1F24',y:226,name:'Total E (cover)'});ct.x=376-ct.width;named.coverTotal=ct.id;
R(cover,356,1,{fill:'#D9DCE0',x:34,y:556});const cp1=T(cover,'1 of 9',{s:'Medium',size:10,c:'#4A5058',y:566});cp1.x=390-cp1.width;T(cover,'Bidder E · Quotation',{size:9,c:'#8A9099',x:34,y:567});
named.cover=cover.id;named.filler=[];
for(let pgn=2;pgn<=8;pgn++){
  const f=F(sec,424,600,{fill:'#FFFFFF',name:'Prop E — filler page '+pgn+' of 9 (print · A4)',x:120+(pgn-1)*(424+24),y:Y1});
  T(f,'Bidder E  ·  Quotation  ·  Plasterboard & ceilings package',{size:9,c:'#6B7078',x:34,y:30});R(f,356,1,{fill:'#D9DCE0',x:34,y:48});
  // Unreadable grey text-line blocks: filler only, no invented content.
  let y=70;for(let b=0;b<5;b++){R(f,120+((pgn*37+b*53)%90),9,{fill:'#C9CDD2',r:2,x:34,y});y+=22;const lines=5+((pgn+b)%4);for(let l=0;l<lines;l++){R(f,l===lines-1?150+((pgn*13+l*29)%120):356,6,{fill:'#E1E4E8',r:2,x:34,y});y+=14;}y+=18;if(y>520)break;}
  R(f,356,1,{fill:'#D9DCE0',x:34,y:556});const pn=T(f,pgn+' of 9',{s:'Medium',size:10,c:'#4A5058',y:566});pn.x=390-pn.width;T(f,'Bidder E · Quotation',{size:9,c:'#8A9099',x:34,y:567});
  named.filler.push(f.id);
}
upd(cap(cover,'E · cover + filler','Print with page 9 and staple. Pages 2–8 are deliberately unreadable filler so only page 9, note 14 can be read.'));

// ── Row 2: alert, alert-over-B preview, banners, sticky note F ──
const Y2=Math.ceil(maxBottom+140);
H('REEL + HOOK PROPS · GENERIC UI, NO OS OR APP BRANDING',Y2-50);
const alert=AL(sec,'VERTICAL',{name:"Alert — Can't sort merged cells. (360×150)",fill:'#FFFFFF',r:10,pad:[30,20,20,20],gap:22,align:'CENTER',w:360,h:150,fx:[sh(10,30,0.22)],x:120,y:Y2,stroke:'#D0D5DB'});
alert.primaryAxisAlignItems='SPACE_BETWEEN';
named.alertText=T(alert,"Can't sort merged cells.",{s:'Semi Bold',size:15,c:'#1F2328',align:'CENTER',name:'Alert text'}).id;
const ok=AL(alert,'HORIZONTAL',{name:'OK button',fill:'#F1F3F5',r:8,align:'CENTER',main:'CENTER',stroke:'#D0D5DB'});ok.resize(320,36);ok.layoutSizingHorizontal='FIXED';ok.layoutSizingVertical='FIXED';
T(ok,'OK',{s:'Semi Bold',size:14,c:'#1F2328',name:'OK'});
named.alert=alert.id;upd(cap(alert,'Alert','Reel 4.5–6.5: appears on the sort click, then closed. Export 3× on transparent.'));
let ax=120+360+80;
if(propB){const pv=F(sec,960,600,{fill:'#FFFFFF',name:'Preview — Prop B with the alert (reel 4.5–6.5)',x:ax,y:Y2});const bc=track(propB.clone());pv.appendChild(bc);bc.x=0;bc.y=0;R(pv,960,600,{fill:'#000000',op:0.18,name:'Modal dim'});const ac=track(alert.clone());pv.appendChild(ac);ac.x=(960-360)/2;ac.y=(600-150)/2;named.alertPreview=pv.id;upd(cap(pv,'Preview · B + alert','Layout guide for the screen capture. Capture the real click on the generic sheet.'));ax+=960+80;}
const stack=AL(sec,'VERTICAL',{name:'Banner stack — preview backdrop only (export each banner on transparent)',fill:'#2B2F33',r:24,pad:[16,16,16,16],gap:8,x:ax,y:Y2});
named.banners=[];
for(let i=0;i<6;i++){const b=AL(stack,'VERTICAL',{name:'Banner '+(i+1)+' — 4:59 pm (358×72)',fill:'#FFFFFF',op:0.92,r:16,pad:[12,16,12,16],gap:4,w:358,h:72});
  const top=AL(b,'HORIZONTAL',{name:'Banner row',main:'SPACE_BETWEEN',align:'CENTER'});top.layoutSizingHorizontal='FILL';
  T(top,'New message',{s:'Semi Bold',size:15,c:'#111111'});T(top,'4:59 pm',{size:13,c:'#6B7078'});
  T(b,'Tender – Plasterboard & ceilings',{size:15,c:'#2A2F36',name:'Banner subject'});named.banners.push(b.id);}
upd(cap(stack,'Banners × 6','Hook 1: stack down the foreground phone 0.15s apart. No app icon, no OS chrome. The dark backdrop is for preview only.'));
ax+=stack.width+80;
const stF=F(sec,300,300,{fill:'#FFE14D',name:'Sticky note "F" (carousel slide 1, on the back of the face-down phone)',x:ax,y:Y2,fx:[sh(3,6,0.25)]});
const fl=T(stF,'F',{f:'Permanent Marker',size:180,c:'#1F2D4A'});fl.x=(300-fl.width)/2;fl.y=(300-fl.height)/2;named.stickyF=stF.id;
upd(cap(stF,'Sticky note "F"','Handwrite it on a real note for the shoot; this is the size and weight guide.'));

// ── Row 3: QS's own sent email (laptop screen 1440×900), neutral generic mail UI ──
const Y3=Math.ceil(maxBottom+140);
H("SLIDE 7 · THE QS'S OWN SENT EMAIL (LAPTOP SCREEN 1440×900 · EXPORT 2×)",Y3-50);
const em=F(sec,1440,900,{fill:'#FFFFFF',name:'Prop — sent email (laptop screen 1440×900)',x:120,y:Y3});
R(em,240,900,{fill:'#F5F6F7',name:'Sidebar'});R(em,1,900,{fill:'#E3E5E8',x:240});
const comp2=AL(em,'HORIZONTAL',{name:'New button',fill:'#FFFFFF',r:10,pad:[10,16,10,16],gap:8,align:'CENTER',stroke:'#D0D5DB',x:20,y:24});
SV(comp2,ICON('<path d="M12 5v14M5 12h14"/>','#3A3F45'),{name:'Plus'});T(comp2,'New',{s:'Semi Bold',size:15,c:'#1F2328'});
['Inbox','Sent','Drafts','Archive'].forEach((f,i)=>{const y=96+i*44;if(f==='Sent')R(em,224,36,{fill:'#E6E8EB',r:8,x:8,y:y-8,name:'Selected folder'});T(em,f,{s:f==='Sent'?'Semi Bold':'Regular',size:15,c:'#2A2F36',x:28,y});});
R(em,1199,56,{fill:'#FFFFFF',x:241,y:0});R(em,1199,1,{fill:'#E3E5E8',x:241,y:56});
[['Reply','<path d="M10 6L4 12l6 6M4 12h10a6 6 0 0 1 6 6v1"/>'],['Forward','<path d="M14 6l6 6-6 6M20 12H10a6 6 0 0 0-6 6v1"/>'],['Archive','<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10h14V9M10 13h4"/>']].forEach(([nm,pth],i)=>SV(em,ICON(pth,'#5F6670'),{x:272+i*48,y:16,name:nm+' (neutral outline)'}));
named.emailSubject=T(em,'Tender: Plasterboard & ceilings package',{s:'Semi Bold',size:30,c:'#111111',x:272,y:92,name:'Subject'}).id;
El(em,44,44,{fill:'#2F7D6D',x:272,y:156,name:'Avatar (initials)'});const qi=T(em,'QS',{s:'Semi Bold',size:16,c:'#FFFFFF',y:168});qi.x=294-qi.width/2;
T(em,'Me',{s:'Semi Bold',size:16,c:'#111111',x:330,y:156});T(em,'to Bidder A, Bidder B, Bidder C, Bidder D, Bidder E, Bidder F',{size:14,c:'#6B7078',x:330,y:180});
R(em,1136,1,{fill:'#E6E7EA',x:272,y:222});
named.emailBody=T(em,'Drawings attached. Please price.',{size:20,c:'#111111',x:272,y:250,name:'Body — Drawings attached. Please price.'}).id;
const att=AL(em,'HORIZONTAL',{name:'Attachment chip (generic file, no app icon)',fill:'#F5F6F7',r:10,pad:[10,14,10,12],gap:10,align:'CENTER',stroke:'#E3E5E8',x:272,y:310});
SV(att,ICON('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/>','#5F6670'),{name:'File'});T(att,'Drawings.pdf',{s:'Medium',size:14,c:'#2A2F36'});
named.sentEmail=em.id;
upd(cap(em,'Sent email · slide 7','Open full-screen on the laptop for the slide 7 photo. Body is the two sentences and nothing else.'));

// ── Row 4: binder sleeve label, lower-third, end cards ──
const Y4=Math.ceil(maxBottom+140);
H('HOOK 2 SLEEVE LABEL · LOWER-THIRD · END CARDS',Y4-50);
const lab=AL(sec,'HORIZONTAL',{name:'Binder sleeve label — Hook 2 (print)',fill:'#FFFFFF',pad:[26,40,26,40],align:'CENTER',stroke:'#1B1F24',sw:2,x:120,y:Y4});
named.sleeveLabel=T(lab,'TENDER – PLASTERBOARD & CEILINGS – BIDDER F',{s:'Bold',size:30,ls:4,c:'#1B1F24',name:'Sleeve label text'}).id;
upd(cap(lab,'Sleeve label','Print, trim and slide into the clear sleeve for the week-4 binder static (binder.jpg is a REPLACE photo).'));
const lt=F(sec,1080,220,{name:'Lower-third — 1080 wide, transparent (9:16: place near y 1250; 4:5: near y 1000)',x:120,y:Y4+180});
R(sec,1080,220,{stroke:'#86958B',sw:1,dash:[6,6],x:120,y:Y4+180,name:'Lower-third bounds guide (outside the frame, not exported)'});
const plate=AL(lt,'HORIZONTAL',{name:'Lower-third plate',fill:'#0C1310',op:0.9,r:16,pad:[22,28,22,24],gap:18,align:'CENTER',x:64,y:60});
R(plate,6,44,{fill:'#3DC023',r:3,name:'Accent bar'});
const ltt=T(plate,'QSME · tendering & estimating software',{f:'Space Grotesk',s:'Medium',size:36,ls:-1,c:'#EEF4EF',name:'Lower-third text'});ltt.setRangeFontName(0,4,FN('Space Grotesk','Bold'));ltt.setRangeFills(0,4,S('#4BCD32'));
named.lowerThird=lt.id;named.lowerThirdRightClearance=Math.round(1080-(plate.x+plate.width));
upd(cap(lt,'Lower-third','Reel 21.5–25.0 / paid 18.5–21.5. Plate stays more than 150px clear of the right edge.'));
function endCard(w,h,name,cy){const f=F(sec,w,h,{fill:'#0C1310',name});const col=AL(f,'VERTICAL',{name:'End card content',gap:44,align:'CENTER'});logo(col,640,'QSME logo (instance of 2:27)');T(col,'qsme.build',{f:'Space Grotesk',s:'Bold',size:96,ls:-2,c:'#EEF4EF',name:'URL'});
  const btn=AL(col,'HORIZONTAL',{name:'CTA pill',fill:'#3DC023',r:999,pad:[24,48,24,48],align:'CENTER'});T(btn,'Book a 30-minute demo',{s:'Semi Bold',size:44,c:'#06130A',name:'CTA'});
  col.x=Math.round((w-col.width)/2);col.y=Math.round(cy-col.height/2);return {f,col};}
const e916=endCard(1080,1920,'End card — 9:16 (1080×1920, hold ≥2.5s)',850);e916.f.x=1340;e916.f.y=Y4;
const e45=endCard(1080,1350,'End card — 4:5 (1080×1350, hold ≥2.5s)',675);e45.f.x=1340+1080+80;e45.f.y=Y4;
named.endCard916=e916.f.id;named.endCard45=e45.f.id;
named.endCard916Safe={top:e916.col.y,bottom:e916.col.y+e916.col.height,left:e916.col.x,right:1080-(e916.col.x+e916.col.width)};
upd(cap(e916.f,'End card 9:16','Content sits between y 300 and 1400 and more than 150px from the right edge.'));upd(cap(e45.f,'End card 4:5','Same content for the LinkedIn 4:5 cut.'));

sec.resizeWithoutConstraints(3991,Math.ceil(maxBottom+120)); // children x/y are relative to the section
// Section is bounded by the widest row; widen if anything sticks out.
const right=sec.children.reduce((m,n)=>Math.max(m,n.x+n.width),0);if(right+120>sec.width)sec.resizeWithoutConstraints(Math.ceil(right+120),sec.height);
return {sectionId:sec.id,sectionBounds:[sec.x,sec.y,sec.width,sec.height],logo:logoInfo,propBFound:!!propB,named,fontFallbacks,createdCount:created.length,createdIds:created};
