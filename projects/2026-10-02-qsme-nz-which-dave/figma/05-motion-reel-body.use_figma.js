// use_figma script — file f8xxaFvwdi6ijGxYj9WEWP, page 2:4. skillNames: resource:figma-use,resource:figma-use-motion. Builds the 1080x1920 motion frame 'Motion — Which Dave (reel body, 9:16)' at x>=4000, y=0 with every keyframe track and a 27.5s timeline, then returns IDs + a resting-state screenshot. Pass the file contents as the code, skipping this first comment line. Then export_video(nodeId = returned topId, quality high, fps 30). Same design/timeline as motion/reel-body.html + motion/timeline.js.
// Copy corrected 2026-10-02 (fact-check): no 'licence-verified' / verification indicator, no 'line by line'. Not yet run in Figma.
function makeTimeline(M) {
  var E = {
    L: { type: 'LINEAR' }, I: { type: 'EASE_IN' }, O: { type: 'EASE_OUT' }, IO: { type: 'EASE_IN_AND_OUT' },
    H: { type: 'HOLD' }, OB: { type: 'EASE_OUT_BACK' },
    SCROLL: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.2, y1: 0.7, x2: 0.3, y2: 1 } },
    SLAM: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.5, y1: 0, x2: 0.9, y2: 0.55 } },
    SWIPE: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.7, y1: 0, x2: 0.25, y2: 1 } }
  };
  var T = [];
  function add(id, f, k) { T.push({ id: id, f: f, k: k.map(function (a) { return { t: a[0], v: a[1], e: a[2] || E.L }; }) }); }
  function pop(id, t) { add(id, 'OPACITY', [[t, 0], [t + 0.16, 1, E.O]]); add(id, 'TRANSLATION_Y', [[t, 36], [t + 0.24, 0, E.O]]); }
  function showAt(id, t) { add(id, 'OPACITY', [[0, 0], [t, 1, E.H]]); }
  var top = M.itemTop;
  // scroll offsets: list TRANSLATION_Y so a given item top lands at a screen y (list top at rest = M.listY0)
  var S = function (i, screenY) { return Math.round(screenY - M.listY0 - top[i]); };
  var S1 = S(2, 840), S2 = S(3, 820), S3 = S(12, 640), S4 = S(17, 640);

  // ---- 0.00–1.05  Mel's post card fills the screen, underline draws, card collapses into the pinned strip
  add('u1', 'OPACITY', [[0.14, 0], [0.15, 1, E.H]]);
  add('u1', 'TRIM', [[0.15, 0], [0.5, 1, E.O]]);
  // the card content shrinks toward the strip's centre (y 350) while fading; its background morphs into the strip
  add('card', 'OPACITY', [[0.82, 1], [0.94, 0]]);
  add('card', 'TRANSLATION_Y', [[0.8, 0], [1.02, Math.round(350 - (M.cardTop + M.cardH / 2)), E.IO]]);
  add('card', 'SCALE_XY', [[0.8, 1], [1.02, 0.55, E.IO]]);
  add('morph', 'TRANSLATION_Y', [[0.8, 0], [1.02, 300 - M.cardTop, E.IO]]);
  add('morph', 'HEIGHT', [[0.8, M.cardH], [1.02, 100, E.IO]]);
  add('morph', 'CORNER_RADIUS', [[0.8, 20], [1.02, 12, E.IO]]);
  add('morph', 'FILL', [[0.8, '#FFFFFF'], [1.02, '#F1F0EC', E.IO]]);
  add('pinned', 'OPACITY', [[0.96, 0], [1.08, 1, E.O]]);
  add('pinned', 'TRANSLATION_Y', [[0.96, 12], [1.08, 0, E.O]]);

  // ---- comments pop in (thread text 50px)
  pop('c0', 1.0);    // Kerry P. — holds 0.9s
  pop('c1', 1.9);    // Sam T. — holds 1.1s
  pop('c2', 3.05);   // Aroha W. — stop 1.2s
  pop('c3', 4.4);    // Jase M. — stop 1.4s
  for (var i = 4; i <= 12; i++) showAt('c' + i, 5.9);   // Following x3, filler comments, Dave K. (enter from below during the fling)
  for (var j = 13; j <= 16; j++) showAt('c' + j, 8.5);  // filler comments 142–210
  pop('c17', 8.8);   // Mel R. ...is anyone here licensed?
  pop('c18', 9.4);   // Kerry P. Dave is.  (0.6s later)

  // ---- thread scroll: scroll, stop, scroll, fling + SLAM on Dave, then scroll to the last two comments
  add('list', 'TRANSLATION_Y', [
    [3.0, 0], [3.15, S1, E.SCROLL], [4.35, S1], [4.5, S2, E.SCROLL],
    [5.9, S2], [6.5, S3 - 18, E.SLAM], [6.62, S3, E.O],
    [8.5, S3], [8.8, S4, E.IO]
  ]);
  add('list', 'BLUR', [[5.9, 0], [6.1, 7, E.I], [6.42, 7], [6.5, 0], [8.5, 0], [8.6, 4, E.I], [8.72, 4], [8.8, 0]]);
  add('circle', 'OPACITY', [[6.64, 0], [6.65, 1, E.H]]);
  add('circle', 'TRIM', [[6.65, 0], [7.0, 1, E.O]]);

  // ---- red-marker tally: 1 -> 3 -> 6 (ish) -> ?   (separate text nodes, cross-faded)
  add('tlabel', 'OPACITY', [[1.15, 0], [1.25, 1, E.O]]);
  add('tlabel', 'SCALE_XY', [[1.15, 1.18], [1.35, 1, E.O]]);
  add('tv1', 'OPACITY', [[1.15, 0], [1.25, 1, E.O], [2.17, 1], [2.25, 0]]);
  add('tv1', 'SCALE_XY', [[1.15, 1.4], [1.35, 1, E.O]]);
  add('x1', 'OPACITY', [[2.04, 0], [2.05, 1, E.H], [2.17, 1], [2.25, 0]]);
  add('x1', 'TRIM', [[2.05, 0], [2.17, 1, E.O]]);
  add('tv3', 'OPACITY', [[2.2, 0], [2.28, 1, E.O], [6.17, 1], [6.25, 0]]);
  add('tv3', 'SCALE_XY', [[2.2, 1.4], [2.4, 1, E.O]]);
  add('x3', 'OPACITY', [[6.0, 0], [6.01, 1, E.H], [6.17, 1], [6.25, 0]]);
  add('x3', 'TRIM', [[6.01, 0], [6.13, 1, E.O]]);
  add('tv6', 'OPACITY', [[6.2, 0], [6.28, 1, E.O], [7.07, 1], [7.15, 0]]);
  add('tv6', 'SCALE_XY', [[6.2, 1.4], [6.4, 1, E.O]]);
  add('x6', 'OPACITY', [[6.94, 0], [6.95, 1, E.H], [7.07, 1], [7.15, 0]]);
  add('x6', 'TRIM', [[6.95, 0], [7.07, 1, E.O]]);
  add('tvq', 'OPACITY', [[7.1, 0], [7.18, 1, E.O]]);
  add('tvq', 'SCALE_XY', [[7.1, 1.5], [7.32, 1, E.O]]);
  add('tinner', 'ROTATION', [[5.95, 0], [6.02, 5], [6.09, -4], [6.16, 4], [6.23, -3], [6.3, 0, E.O]]);
  add('tinner', 'TRANSLATION_X', [[5.95, 0], [6.02, -6], [6.09, 6], [6.16, -5], [6.23, 4], [6.3, 0, E.O]]);

  // ---- 10.6–11.0 the app swipes away to the QSME screen
  add('app', 'TRANSLATION_X', [[10.6, 0], [11.0, -1080, E.SWIPE]]);
  add('qsme', 'TRANSLATION_X', [[10.6, 0], [11.0, -1080, E.SWIPE]]);

  // ---- placeholder "moment" chips (editor cues for which real recording goes where)
  add('m1', 'OPACITY', [[12.95, 1], [13.05, 0]]);
  add('m2', 'OPACITY', [[12.95, 0], [13.05, 1], [15.45, 1], [15.55, 0]]);
  add('m3', 'OPACITY', [[15.45, 0], [15.55, 1], [18.45, 1], [18.55, 0]]);
  add('m4', 'OPACITY', [[18.45, 0], [18.55, 1]]);

  // ---- on-screen text (captions over the QSME recording)
  add('cap1', 'OPACITY', [[11.05, 0], [11.25, 1, E.O], [12.85, 1], [13.0, 0]]);
  add('cap1', 'TRANSLATION_Y', [[11.05, 30], [11.3, 0, E.O], [12.85, 0], [13.0, -24, E.I]]);
  add('cap2', 'OPACITY', [[13.05, 0], [13.25, 1, E.O], [18.3, 1], [18.45, 0]]);
  add('cap2', 'TRANSLATION_Y', [[13.05, 30], [13.3, 0, E.O], [18.3, 0], [18.45, -24, E.I]]);
  add('cap3', 'OPACITY', [[15.5, 0], [15.7, 1, E.O], [18.3, 1], [18.45, 0]]);
  add('cap3', 'TRANSLATION_Y', [[15.5, 30], [15.75, 0, E.O], [18.3, 0], [18.45, -24, E.I]]);

  // ---- 18.5 payoff: tally redrawn "Dave count: 1" + tick (the ding), "Know which Dave."
  add('t2label', 'OPACITY', [[18.55, 0], [18.65, 1, E.O]]);
  add('t2label', 'SCALE_XY', [[18.55, 1.18], [18.75, 1, E.O]]);
  add('t2v', 'OPACITY', [[18.55, 0], [18.65, 1, E.O]]);
  add('t2v', 'SCALE_XY', [[18.55, 1.4], [18.75, 1, E.O]]);
  add('tick', 'OPACITY', [[18.79, 0], [18.8, 1, E.H]]);
  add('tick', 'TRIM', [[18.8, 0], [19.0, 1, E.O]]);
  add('cap4', 'OPACITY', [[18.65, 0], [18.85, 1, E.O], [22.8, 1], [22.95, 0]]);
  add('cap4', 'SCALE_XY', [[18.65, 0.9], [18.95, 1, E.OB]]);

  // ---- 23.0 end card
  add('end', 'OPACITY', [[22.95, 0], [23.25, 1, E.O]]);
  add('logo', 'OPACITY', [[23.1, 0], [23.4, 1, E.O]]);
  add('logo', 'SCALE_XY', [[23.1, 0.94], [23.5, 1, E.O]]);
  add('ctaA', 'OPACITY', [[23.35, 0], [23.55, 1, E.O]]);
  add('ctaA', 'TRANSLATION_Y', [[23.35, 28], [23.6, 0, E.O]]);
  add('ctaB', 'OPACITY', [[23.5, 0], [23.7, 1, E.O]]);
  add('ctaB', 'TRANSLATION_Y', [[23.5, 28], [23.75, 0, E.O]]);
  add('ctaC', 'OPACITY', [[23.65, 0], [23.85, 1, E.O]]);
  add('ctaC', 'TRANSLATION_Y', [[23.65, 28], [23.9, 0, E.O]]);
  // tally tick carries over small in the upper-left corner (x 80, y 330)
  var k = 0.6, dx = Math.round(-(1 - k) / 2 * M.t2W), dy = Math.round(330 - 420 - (1 - k) / 2 * M.t2H);
  add('tally2', 'SCALE_XY', [[23.0, 1], [23.4, k, E.IO]]);
  add('tally2', 'TRANSLATION_X', [[23.0, 0], [23.4, dx, E.IO]]);
  add('tally2', 'TRANSLATION_Y', [[23.0, 0], [23.4, dy, E.IO]]);

  return { duration: 27.5, tracks: T, scroll: { S1: S1, S2: S2, S3: S3, S4: S4 } };
}
const PG=await figma.getNodeByIdAsync('2:4');await figma.setCurrentPageAsync(PG);
if(!figma.motion||typeof figma.motion.figmaAnimationStyles!=='function')throw new Error('Motion API not available on this account');
const NAME='Motion — Which Dave (reel body, 9:16)';
const H=h=>{h=h.replace('#','');return{r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255}};
const S=(h,o=1)=>[{type:'SOLID',color:H(h),opacity:o}];
const F={ir:{family:'Inter',style:'Regular'},im:{family:'Inter',style:'Medium'},isb:{family:'Inter',style:'Semi Bold'},mxb:{family:'Manrope',style:'ExtraBold'},pm:{family:'Permanent Marker',style:'Regular'}};
await Promise.all(Object.values(F).map(f=>figma.loadFontAsync(f)));
const NAVY='#020617',INK='#F8FAFC',BTN='#16A34A',LGC='#3DC023',RED='#E0302A';
function T(str,o={}){const t=figma.createText();t.fontName=o.font||F.ir;t.fontSize=o.size||24;if(o.lh)t.lineHeight={unit:'PIXELS',value:o.lh};if(o.ls!=null)t.letterSpacing={unit:'PERCENT',value:o.ls};t.characters=str;t.fills=S(o.color||'#111111',o.op??1);if(o.align)t.textAlignHorizontal=o.align;if(o.name)t.name=o.name;if(o.parent)o.parent.appendChild(t);if(o.w){t.textAutoResize='HEIGHT';t.resize(o.w,Math.max(t.height,1));}return t;}
function AL(dir,o={}){const f=figma.createAutoLayout(dir);f.fills=o.bg?S(o.bg,o.bgOp??1):[];if(o.gap!=null)f.itemSpacing=o.gap;if(o.p!=null){const p=Array.isArray(o.p)?o.p:[o.p,o.p,o.p,o.p];f.paddingTop=p[0];f.paddingRight=p[1];f.paddingBottom=p[2];f.paddingLeft=p[3];}if(o.r)f.cornerRadius=o.r;if(o.name)f.name=o.name;if(o.align)f.counterAxisAlignItems=o.align;if(o.stroke){f.strokes=S(o.stroke,o.strokeOp??1);f.strokeWeight=o.sw||1;f.strokeAlign='INSIDE';}if(o.parent)o.parent.appendChild(f);if(o.w){f.resize(o.w,Math.max(f.height,10));if(dir==='VERTICAL'){f.counterAxisSizingMode='FIXED';f.primaryAxisSizingMode='AUTO';}else{f.primaryAxisSizingMode='FIXED';f.counterAxisSizingMode='AUTO';}}return f;}
function AV(init,col,size,rad){const f=figma.createAutoLayout('HORIZONTAL');f.resize(size,size);f.primaryAxisSizingMode='FIXED';f.counterAxisSizingMode='FIXED';f.primaryAxisAlignItems='CENTER';f.counterAxisAlignItems='CENTER';f.cornerRadius=rad??size/2;f.fills=S(col);f.name='Avatar '+init;T(init,{font:F.isb,size:Math.round(size*0.36),color:'#FFFFFF',parent:f,ls:1});return f;}
function SVG(s,name,parent,x,y){const n=figma.createNodeFromSvg(s);n.name=name;n.fills=[];parent.appendChild(n);n.x=x;n.y=y;return n;}
function R(parent,name,x,y,w,h,fill,o={}){const r=figma.createRectangle();r.name=name;r.resize(w,h);r.fills=fill?S(fill,o.op??1):[];if(o.r)r.cornerRadius=o.r;parent.appendChild(r);r.x=x;r.y=y;return r;}
function MW(str,font,size,bold){const t=figma.createText();t.fontName=font;t.fontSize=size;t.characters=str;if(bold)t.setRangeFontName(0,Math.min(bold,str.length),F.isb);const w=t.width;t.remove();return w;}
function subRect(str,sub,font,size,W,lh,bold){const words=str.split(' ');const lines=[];let line='';const m=(s,f)=>MW(s,font,size,f?bold:0);for(const w of words){const test=line?line+' '+w:w;if(line&&m(test,lines.length===0)>W){lines.push(line);line=w;}else line=test;}lines.push(line);for(let i=0;i<lines.length;i++){const idx=lines[i].indexOf(sub);if(idx>=0){const b=i===0?bold:0;return{x:MW(lines[i].slice(0,idx+sub.length),font,size,b)-MW(sub,font,size),y:i*lh,w:MW(sub,font,size)};}}return{x:0,y:0,w:0};}
let SEED=53;const rnd=()=>{SEED=(SEED*16807)%2147483647;return (SEED-1)/2147483646;};
function cr(pts){let d=`M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;d+=` C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;}return d;}
function underlinePts(w){const n=7,pts=[];for(let i=0;i<=n;i++)pts.push([w*i/n+(i>0&&i<n?(rnd()-0.5)*2:0),Math.sin(i*1.1)*1.2-(i/n)*3]);return pts;}
function ellipsePts(cx,cy,rx,ry,st=-0.45){const N=36,en=st+Math.PI*2+0.55,pts=[];for(let i=0;i<=N;i++){const a=st+(en-st)*i/N,k=1+0.05*(i/N)+(rnd()-0.5)*0.02;pts.push([cx+rx*k*Math.cos(a),cy+ry*k*Math.sin(a)-(i/N)*3]);}return pts;}
function strikePts(w,h){return [[-6,h*0.62],[w*0.5,h*0.44],[w+6,h*0.36],[w*0.55,h*0.58],[-2,h*0.5]];}
// one continuous stroke per marker so PATH_TRIM_END can draw it on
function MK(pts,parent,sw,col,name){let a=1e9,b=1e9,c=-1e9,d=-1e9;pts.forEach(([x,y])=>{a=Math.min(a,x);b=Math.min(b,y);c=Math.max(c,x);d=Math.max(d,y);});const ox=a-sw,oy=b-sw,w=Math.ceil(c-a+sw*2),h=Math.ceil(d-b+sw*2);const n=figma.createNodeFromSvg(`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${cr(pts.map(([x,y])=>[x-ox,y-oy]))}" stroke="${col}" stroke-opacity="0.93" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`);n.name=name;n.fills=[];n.clipsContent=false;parent.appendChild(n);if(parent.layoutMode&&parent.layoutMode!=='NONE')n.layoutPositioning='ABSOLUTE';n.x=ox;n.y=oy;return n;}
const rel=(n,anc)=>{const p=n.absoluteTransform,q=anc.absoluteTransform;return{x:p[0][2]-q[0][2],y:p[1][2]-q[1][2]};};
const LOGO=await figma.getNodeByIdAsync('2:27');
function LOGOF(wv){const s=wv/1278;const f=figma.createFrame();f.name='QSME logo (component 2:27)';f.fills=[];f.clipsContent=true;f.resize(Math.round(wv),Math.round(386*s));const i=LOGO.createInstance();f.appendChild(i);i.rescale(s);i.x=-192*s;i.y=-164*s;return f;}
const C={MR:'#C4613A',KP:'#C9962B',ST:'#2E8B7E',AW:'#8B4F86',LH:'#6E8F57',DK:'#4F6475',JM:'#7C6A4A',PG:'#5E7D8C',TB:'#A35D78'};
const POST='Anyone recommend a builder? Bathroom + small deck in Hillcrest. Must be licensed. Ta!';
// ---------- placement (x >= 4000, y = 0, clear of everything else); replaces an earlier copy of this same frame
const old=PG.children.filter(n=>n.name===NAME);const removed=old.map(n=>n.id);old.forEach(n=>n.remove());
let X=4000;const over=()=>PG.children.filter(n=>n.x<X+1080&&n.x+n.width>X&&n.y<1920&&n.y+n.height>0);for(let g=0;g<20&&over().length;g++)X=Math.ceil(Math.max(...over().map(n=>n.x+n.width))+200);
const TOP=figma.createFrame();TOP.name=NAME;TOP.resize(1080,1920);TOP.x=X;TOP.y=0;TOP.fills=S('#FFFFFF');TOP.clipsContent=true;
const N={};
// ---------- APP (generic community-group app, full-frame screen recording look)
const APP=figma.createFrame();APP.name='App — generic community group (screen recording)';APP.resize(1080,1920);APP.fills=S('#FFFFFF');APP.clipsContent=false;TOP.appendChild(APP);APP.x=0;APP.y=0;N.app=APP;
const VP=figma.createFrame();VP.name='Thread viewport (clips y 510–1250)';VP.resize(1080,740);VP.fills=[];VP.clipsContent=true;APP.appendChild(VP);VP.x=0;VP.y=510;
const LIST=figma.createFrame();LIST.name='Thread list (scrolls)';LIST.fills=[];LIST.clipsContent=false;VP.appendChild(LIST);LIST.x=65;LIST.y=50;N.list=LIST;
let blurOk=true;try{LIST.effects=[{type:'LAYER_BLUR',radius:0,visible:true}];}catch(e){blurOk=false;}
const ITEMS=[['KP','Kerry P.','My cousin Dave. Top bloke.'],['ST','Sam T.','Hillcrest Dave or the other Hillcrest Dave?'],['AW','Aroha W.','Deck Dave or Roof Dave?'],['JM','Jase M.','Big Dave did ours.\nNot Little Dave.'],['LH','Lynn H.','Following'],['PG','Pete G.','Following'],['TB','Tash B.','Following'],['F',[260,640]],['F',[200,520,380]],['F',[300,700]],['F',[180,460]],['F',[240,600,300]],['DK','Dave K.','Dave here.\nWhich Dave do you mean?'],['F',[220,560]],['F',[280,680,420]],['F',[190,500]],['F',[250,620]],['MR','Mel R.','...is anyone here licensed?','Author'],['KP','Kerry P.','Dave is.']];
const FILLCOL=['#B9B3A6','#A9B4AE','#B7A9B3','#AEB0BA','#BBB09C','#A7B3A0','#B4A8A0','#A9AEB8','#B8AFA2'];
function comment(init,name,text,tag){const row=AL('HORIZONTAL',{gap:20,align:'MIN',name:'Comment — '+name+' '+text.replace('\n',' ')});row.appendChild(AV(init,C[init],84));const b=AL('VERTICAL',{bg:'#EFEFEA',r:32,p:[18,30,22,30],gap:2,name:'Bubble',parent:row});const nr=AL('HORIZONTAL',{gap:14,align:'CENTER',parent:b,name:'Name'});T(name,{font:F.isb,size:34,lh:41,color:'#1C1C1E',parent:nr});if(tag){const tg=AL('HORIZONTAL',{bg:'#E0E0DA',r:8,p:[7,12,7,12],parent:nr,name:'Tag'});T(tag,{font:F.im,size:24,color:'#55555A',parent:tg});}const t=T(text,{size:50,lh:61,color:'#1A1A1A',parent:b,name:'Comment text (50px)'});if(t.width>786){t.textAutoResize='HEIGHT';t.resize(786,t.height);}return row;}
let fi=0;function filler(bars){const row=AL('HORIZONTAL',{gap:20,align:'MIN',name:'Filler comment (unreadable, no text)'});const a=figma.createEllipse();a.resize(84,84);a.fills=S(FILLCOL[fi++%FILLCOL.length]);a.name='Avatar (blank)';row.appendChild(a);const b=AL('VERTICAL',{bg:'#F1F1EC',r:32,p:[24,30,24,30],gap:16,parent:row,name:'Bubble'});bars.forEach((w,k)=>{const r=figma.createRectangle();r.resize(w,k===0?22:28);r.cornerRadius=k===0?11:14;r.fills=S(k===0?'#D3D2CA':'#DDDCD5');b.appendChild(r);});return row;}
let yy=0;const itemTop=[],rows=[];
ITEMS.forEach((it,i)=>{const r=it[0]==='F'?filler(it[1]):comment(it[0],it[1],it[2],it[3]);LIST.appendChild(r);r.x=0;r.y=yy;itemTop.push(yy);rows.push(r);N['c'+i]=r;yy+=Math.round(r.height)+26;});
LIST.resize(950,Math.max(yy,10));
const dB=rows[12].children[1];const bw=dB.width,bh=dB.height;
N.circle=MK(ellipsePts(104+bw/2,itemTop[12]+bh/2,bw/2+34,bh/2+30),LIST,8,RED,'Red marker — circle around Dave K.');
const fadeSvg=(h,rev)=>`<svg width="1080" height="${h}" viewBox="0 0 1080 ${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="${rev?0:0.15}" stop-color="#FFFFFF" stop-opacity="${rev?0:1}"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="${rev?1:0}"/></linearGradient></defs><rect width="1080" height="${h}" fill="url(#g)"/></svg>`;
SVG(fadeSvg(84,false),'Scroll fade — top',APP,0,510);SVG(fadeSvg(56,true),'Scroll fade — bottom',APP,0,1194);
// chrome: status bar + nav, icons only (no text outside the safe zone)
R(APP,'App chrome',0,0,1080,240,'#F6F5F2');R(APP,'Divider',0,240,1080,2,'#E3E2DD');
SVG('<svg width="180" height="32" viewBox="0 0 180 32" xmlns="http://www.w3.org/2000/svg"><g fill="#1C1C1E"><rect x="0" y="20" width="7" height="10" rx="2"/><rect x="11" y="15" width="7" height="15" rx="2"/><rect x="22" y="9" width="7" height="21" rx="2"/><rect x="33" y="3" width="7" height="27" rx="2"/></g><g fill="none" stroke="#1C1C1E" stroke-width="3.4" stroke-linecap="round"><path d="M58 13a20 20 0 0 1 28 0"/><path d="M63 19a12 12 0 0 1 18 0"/></g><circle cx="72" cy="25" r="3.2" fill="#1C1C1E"/><rect x="104" y="4" width="54" height="25" rx="7" fill="none" stroke="#1C1C1E" stroke-opacity=".45" stroke-width="2.4"/><rect x="108" y="8" width="40" height="17" rx="4" fill="#1C1C1E"/><rect x="161" y="12" width="4" height="9" rx="2" fill="#1C1C1E" fill-opacity=".45"/></svg>','Status bar icons',APP,858,34);
SVG('<svg width="56" height="56" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 5l-7 7 7 7" fill="none" stroke="#1C1C1E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>','Back',APP,34,142);
R(APP,'Group icon',106,138,64,64,'#8A8A80',{r:14});
SVG('<svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" fill="#FFFFFF"/></svg>','House glyph',APP,120,152);
SVG('<svg width="52" height="52" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="#1C1C1E" stroke-width="2.2"/><path d="M15.5 15.5L21 21" stroke="#1C1C1E" stroke-width="2.4" stroke-linecap="round"/></svg>','Search',APP,888,144);
SVG('<svg width="52" height="52" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="#1C1C1E"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></g></svg>','More',APP,966,144);
R(APP,'Composer divider',0,1748,1080,2,'#E3E2DD');const me=figma.createEllipse();me.name='Composer avatar (blank)';me.resize(76,76);me.fills=S(C.MR);APP.appendChild(me);me.x=40;me.y=1774;R(APP,'Composer field (no placeholder text)',136,1774,904,76,'#EFEFEA',{r:38});R(APP,'Home indicator',390,1886,300,10,'#1C1C1E',{r:5,op:0.85});
// Mel's post card (content) + morphing background
const MORPH=figma.createRectangle();MORPH.name='Card background → pinned strip (morph)';APP.appendChild(MORPH);
const CARD=AL('VERTICAL',{name:'Mel’s post card — content',parent:APP,w:950});
const gr=AL('HORIZONTAL',{gap:20,align:'CENTER',p:[26,34,26,34],parent:CARD,name:'Group row'});gr.layoutSizingHorizontal='FILL';gr.appendChild(AV('HL','#8A8A80',72,16));T('Hillcrest Locals (Unofficial)',{font:F.isb,size:40,lh:48,color:'#1C1C1E',parent:gr});
const dv=figma.createRectangle();dv.name='Divider';dv.resize(950,2);dv.fills=S('#E8E8E3');CARD.appendChild(dv);dv.layoutSizingHorizontal='FILL';
const pb=AL('VERTICAL',{p:[36,48,38,48],gap:28,parent:CARD,name:'Post body'});pb.layoutSizingHorizontal='FILL';
const ar=AL('HORIZONTAL',{gap:20,align:'CENTER',parent:pb,name:'Author'});ar.appendChild(AV('MR',C.MR,96));const ac=AL('VERTICAL',{gap:0,parent:ar});T('Mel R.',{font:F.isb,size:44,lh:51,color:'#1C1C1E',parent:ac});T('2h',{size:30,lh:36,color:'#6B6B70',parent:ac});
const ptx=T(POST,{size:62,lh:80,color:'#1A1A1A',parent:pb,w:854,name:'Post text'});T('212 comments',{font:F.im,size:38,lh:46,color:'#6B6B70',parent:pb});
const cardH=Math.round(CARD.height),cardTop=Math.round(300+(950-cardH)/2);CARD.x=65;CARD.y=cardTop;N.card=CARD;
MORPH.resize(950,cardH);MORPH.x=65;MORPH.y=cardTop;MORPH.cornerRadius=20;MORPH.fills=S('#FFFFFF');MORPH.strokes=S('#D6D5CF');MORPH.strokeWeight=2;MORPH.strokeAlign='INSIDE';MORPH.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.1},offset:{x:0,y:8},radius:28,spread:0,visible:true,blendMode:'NORMAL'}];N.morph=MORPH;
const rp=rel(ptx,CARD);const s1=subRect(POST,'Must be licensed',F.ir,62,854,80);
N.u1=MK(underlinePts(s1.w+8).map(([x,y])=>[x+rp.x+s1.x-4,y+rp.y+s1.y+72]),CARD,7,RED,'Red marker — underline "Must be licensed"');
// pinned strip (y 300–400)
const PIN=AL('HORIZONTAL',{p:[8,24,8,24],align:'CENTER',name:'Pinned post header (y 300–400)',parent:APP});PIN.resize(950,100);PIN.primaryAxisSizingMode='FIXED';PIN.counterAxisSizingMode='FIXED';PIN.x=65;PIN.y=300;N.pinned=PIN;
const PS='Mel R. '+POST;let pfs=34,plh=42;const pt=T(PS,{size:pfs,lh:plh,color:'#2A2A2C',parent:PIN,w:902,name:'Pinned text'});pt.setRangeFontName(0,6,F.isb);pt.setRangeFills(0,6,S('#1C1C1E'));
while(pt.height>84&&pfs>28){pfs--;plh=Math.round(pfs*1.235);pt.fontSize=pfs;pt.lineHeight={unit:'PIXELS',value:plh};}
const rq=rel(pt,PIN);const s2=subRect(PS,'Must be licensed',F.ir,pfs,902,plh,6);
MK(underlinePts(s2.w+6).map(([x,y])=>[x+rq.x+s2.x-3,y+rq.y+s2.y+plh-4]),PIN,4.5,RED,'Red marker — underline (carried over)');
// red-marker tally (separate text node per value; they cross-fade)
function tallyF(parent,name,col,vals){const w=figma.createFrame();w.name=name;w.fills=[];w.clipsContent=false;parent.appendChild(w);const inner=figma.createFrame();inner.name='Tally (shake)';inner.fills=[];inner.clipsContent=false;w.appendChild(inner);inner.x=0;inner.y=0;const lab=T('Dave count:',{font:F.pm,size:66,lh:80,color:col,parent:inner,name:'Dave count:'});lab.x=0;lab.y=0;const vx=Math.round(lab.width+20);const v={};let mw=0;vals.forEach(s=>{const t=T(s,{font:F.pm,size:66,lh:80,color:col,parent:inner,name:'Value — '+s});t.x=vx;t.y=0;v[s]=t;mw=Math.max(mw,t.width);});return{w,inner,lab,vx,v,mw};}
const TA=tallyF(APP,'Red marker — Dave count tally (1 → 3 → 6 (ish) → ?)',RED,['1','3','6 (ish)','?']);
N.tinner=TA.inner;N.tlabel=TA.lab;N.tv1=TA.v['1'];N.tv3=TA.v['3'];N.tv6=TA.v['6 (ish)'];N.tvq=TA.v['?'];
[['x1','1'],['x3','3'],['x6','6 (ish)']].forEach(([id,s])=>{N[id]=MK(strikePts(TA.v[s].width,80).map(([a,b])=>[a+TA.vx,b]),TA.inner,6,RED,'Strike-out — '+s);});
TA.inner.resize(Math.ceil(TA.vx+TA.mw),80);TA.w.resize(Math.ceil(TA.vx+TA.mw),80);TA.w.x=80;TA.w.y=420;TA.w.rotation=-3;
// ---------- QSME screen (REPLACE placeholder + captions + end card)
const Q=figma.createFrame();Q.name='QSME screen — REPLACE placeholder, captions, end card';Q.resize(1080,1920);Q.fills=S(NAVY);Q.clipsContent=true;TOP.appendChild(Q);Q.x=1080;Q.y=0;N.qsme=Q;
const ph=R(Q,'REPLACE: real QSME screen recording — Create a project → tender goes out → Compare bids (totals excl. / incl. GST) → Dave K.’s bid',32,120,1016,1680,'#0B1324',{r:28});ph.strokes=S(LGC,0.75);ph.strokeWeight=2;ph.strokeAlign='INSIDE';ph.dashPattern=[14,10];
const PHL=AL('VERTICAL',{gap:18,align:'CENTER',name:'Placeholder label',parent:Q,w:860});PHL.x=110;PHL.y=780;
const play=figma.createNodeFromSvg('<svg width="96" height="96" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="21" fill="none" stroke="#3DC023" stroke-width="2.5"/><path d="M20 15.5v17l13-8.5z" fill="#3DC023"/></svg>');play.name='Video icon';play.fills=[];PHL.appendChild(play);
T('REPLACE WITH REAL QSME SCREEN RECORDING:',{font:F.isb,size:30,lh:39,ls:4,color:LGC,parent:PHL,align:'CENTER',w:860});
T('Create a project → tender goes out → Compare bids (totals excl. / incl. GST) → Dave K.’s bid',{size:32,lh:43,color:INK,op:0.78,parent:PHL,align:'CENTER',w:860});
T('Owner records it signed in: hidden demo org, demo data, QSME wordmark in the header',{size:26,lh:35,color:INK,op:0.5,parent:PHL,align:'CENTER',w:860});
const chips=figma.createFrame();chips.name='Moment cues (which recording goes where)';chips.fills=[];chips.clipsContent=false;chips.resize(860,60);PHL.appendChild(chips);
['Now: 1 · “Create a project”','Now: 2 · “Bathroom + deck, Hillcrest” tender goes out','Now: 3 · Compare bids, flip Excl. / Incl. GST','Now: 4 · tap Dave K.’s row, his bid’s own lines'].forEach((s,i)=>{const c=AL('HORIZONTAL',{r:30,p:[15,26,15,26],stroke:LGC,strokeOp:0.55,sw:2,name:'Cue '+(i+1),parent:chips});T(s,{font:F.im,size:26,color:INK,op:0.85,parent:c});c.x=Math.round((860-c.width)/2);c.y=0;N['m'+(i+1)]=c;});
function cap(str,size,y,name,p){const b=AL('VERTICAL',{bg:INK,r:10,p:p||[22,36,26,36],name:'On-screen — '+name,parent:Q});T(str,{font:F.mxb,size,lh:Math.round(size*1.08),ls:-2.5,color:NAVY,parent:b,align:'CENTER'});b.x=Math.round((1080-b.width)/2);b.y=y;return b;}
N.cap1=cap('Or. Post the actual\njob on QSME.',64,330,'Or. Post the actual job on QSME.');
N.cap2=cap('Tradies quote on\nthe same job',60,330,'Tradies quote on the same job');
N.cap3=cap('Every quote in one table,\nGST shown both ways',60,330+Math.round(N.cap2.height)+16,'Every quote in one table, GST shown both ways');
N.cap4=cap('Know which Dave.',96,540,'Know which Dave.',[22,40,28,40]);
const END=figma.createFrame();END.name='End card (QSME brand)';END.resize(1080,1920);END.fills=S(NAVY);END.clipsContent=false;Q.appendChild(END);END.x=0;END.y=0;N.end=END;
const lg=LOGOF(600);END.appendChild(lg);lg.x=240;lg.y=740;N.logo=lg;
const ca=T('Create a project.',{font:F.mxb,size:88,lh:92,ls:-2.5,color:INK,parent:END,name:'CTA — Create a project.'});ca.x=Math.round((1080-ca.width)/2);ca.y=975;N.ctaA=ca;
const cb=T('Free to join. No listing fee.',{size:44,lh:55,color:INK,op:0.7,parent:END,name:'CTA — Free to join. No listing fee.'});cb.x=Math.round((1080-cb.width)/2);cb.y=Math.round(ca.y+ca.height+18);N.ctaB=cb;
const cc=AL('HORIZONTAL',{bg:BTN,r:10,p:[14,40,14,40],name:'CTA — qsme.co.nz',parent:END});T('qsme.co.nz',{font:F.isb,size:40,lh:48,color:'#FFFFFF',parent:cc});cc.x=Math.round((1080-cc.width)/2);cc.y=Math.round(cb.y+cb.height+22);N.ctaC=cc;
const TB=tallyF(Q,'Red marker — Dave count: 1 + tick (redrawn)','#F0473C',['1']);N.tally2=TB.inner;N.t2label=TB.lab;N.t2v=TB.v['1'];
const tx0=TB.vx+TB.mw+22,sz=62;N.tick=MK([[tx0,26+sz*0.5],[tx0+sz*0.38,26+sz*0.9],[tx0+sz*1.05,22]],TB.inner,8,LGC,'Tick');
const t2W=Math.ceil(tx0+sz*1.1);TB.inner.resize(t2W,80);TB.w.resize(t2W,80);TB.w.x=80;TB.w.y=420;TB.w.rotation=-3;
// ---------- motion
const M={cardTop,cardH,itemTop,listY0:560,t2W,t2H:80};
const TL=makeTimeline(M);
const conv=(f,v)=>{if(f==='SCALE_XY')return{type:'VECTOR',value:{x:v,y:v}};if(f==='FILL'){const c=H(v);return{type:'COLOR',value:{r:c.r,g:c.g,b:c.b,a:1}};}return{type:'FLOAT',value:v};};
const KF=tr=>tr.k.map(k=>({timelinePosition:k.t,value:conv(tr.f,k.v),easing:k.e}));
const PROP=name=>({type:'PROPERTY',name});
const errs=[],applied=[],fallbacks=[];
// static values = the t=0 state, so the canvas and the first exported frame agree
for(const tr of TL.tracks){if(tr.f==='OPACITY'&&N[tr.id])N[tr.id].opacity=tr.k[0].v;}
for(const tr of TL.tracks){const n=N[tr.id];if(!n){errs.push('missing node '+tr.id);continue;}
 try{
  if(tr.f==='TRIM'){const v=n.findOne(c=>c.type==='VECTOR');if(!v)throw new Error('no vector');v.applyManualKeyframeTrack(PROP('PATH_TRIM_END'),{keyframes:KF(tr)});}
  else if(tr.f==='BLUR'){if(!blurOk)throw new Error('no blur effect');n.applyManualKeyframeTrack({type:'INDEXED_ITEM',collection:'effects',index:0,field:'RADIUS'},{keyframes:KF(tr)});}
  else if(tr.f==='FILL'){const ex=n.manualKeyframeTracks||{};n.manualKeyframeTracks=Object.assign({},ex,{fills:Object.assign({},ex.fills||{},{0:{keyframes:KF(tr)}})});}
  else n.applyManualKeyframeTrack(PROP(tr.f),{keyframes:KF(tr)});
  applied.push(tr.id+'.'+tr.f);
 }catch(e){const msg=String(e&&e.message||e);if(/not a supported API/.test(msg))throw new Error('Motion API not enabled: '+msg);errs.push(tr.id+'.'+tr.f+': '+msg.slice(0,140));
  if(tr.f==='TRIM'){// fallback: fade the marker in over the draw-on window instead
   const op=TL.tracks.find(o=>o.id===tr.id&&o.f==='OPACITY');const t0=tr.k[0].t,t1=tr.k[tr.k.length-1].t;const ks=[[t0,0,{type:'LINEAR'}],[t1,1,{type:'EASE_OUT'}]].concat(op?op.k.filter(k=>k.t>t1).map(k=>[k.t,k.v,k.e]):[]);
   try{n.applyManualKeyframeTrack(PROP('OPACITY'),{keyframes:ks.map(a=>({timelinePosition:a[0],value:{type:'FLOAT',value:a[1]},easing:a[2]}))});n.opacity=0;fallbacks.push(tr.id+': trim → fade');}catch(e2){errs.push(tr.id+' fallback: '+String(e2).slice(0,100));}}}
}
let timelines=null;try{const [tl]=APP.timelines;if(tl&&tl.duration!==TL.duration)APP.setTimelineDuration(tl.id,TL.duration);timelines=APP.timelines;}catch(e){errs.push('timeline: '+String(e).slice(0,140));}
const ids={};for(const k in N)ids[k]=N[k].id;
await TOP.screenshot({scale:0.5});
return {topId:TOP.id,x:X,y:0,removedOld:removed,timelines,tracksApplied:applied.length,tracksTotal:TL.tracks.length,errs,fallbacks,scroll:TL.scroll,M:{cardTop,cardH,t2W,pinnedFont:pfs,listH:yy,dave:{bw,bh}},ids};
