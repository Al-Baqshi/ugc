# Local render of the Figma motion script (04-motion.figma.js) through a DOM shim of the Figma Plugin API.
# Builds two pages from the same code:
#   six-bids.kit.html  -> tools/motion/make.mjs (headless Chrome, safe-box QA, contact sheet, H.264)   <- use this
#   stage.html         -> render.swift (WebKit + AVFoundation; the older path, no QA)
#
#   python3 build_stage.py
#   node ../../../tools/motion/make.mjs six-bids.kit.html ../outputs/six-bids-linkedin-4x5.mp4 --safe 60,60,1020,1290
#
# The same 04-motion.figma.js runs unchanged in Figma via use_figma (page 2:5).

import json
shim = open('shim.js').read()
code = open('04-motion.figma.js').read()

FONTS = ['500 40px "Space Grotesk"', '700 40px "Space Grotesk"', '400 40px "Inter"', '500 40px "Inter"', '600 40px "Inter"', '700 40px "Inter"',
         '400 40px "JetBrains Mono"', '500 40px "JetBrains Mono"', '800 40px "Manrope"', '400 40px "Kalam"', '700 40px "Kalam"', '400 40px "Permanent Marker"']
HEAD = '''<!doctype html><html><head><meta charset="utf-8"><title>Six bids motion</title><link rel="stylesheet" href="fonts/fonts.css">
<style>html,body{margin:0;padding:0;background:#000;overflow:hidden;width:1080px;height:1350px;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}#stage,#root{position:absolute;left:0;top:0;width:1080px;height:1350px;overflow:hidden}</style></head>
<body>'''
BUILD = '''
const CODE=''' + json.dumps(code) + ''';
async function __build(){
  const F=''' + json.dumps(FONTS) + ''';
  await Promise.all(F.map(f=>document.fonts.load(f,'Ab1²–…“”’→‹✓')));await document.fonts.ready;
  window.__fontsOk=F.map(f=>f+':'+document.fonts.check(f));
  document.getElementById(window.__stageId).appendChild(window.__page.el);
  const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
  const res=await new AsyncFunction('figma',CODE)(window.figma);
  window.__res=res;
  const M=window.__page.children.find(n=>n.id===res.frameId);
  window.__page.el.style.left=(-M.x)+'px';window.__page.el.style.top=(-M.y)+'px';
  window.__n=window.__prepare();window.renderAt(0);
  return res;
}
'''

# 1) WebKit stage (render.swift)
stage = HEAD + '<div id="stage"></div>\n<script>' + shim + '</script>\n<script>window.__stageId="stage";' + BUILD + '''
(async()=>{try{await __build();window.__ready=true}catch(e){window.__err=String(e&&e.stack||e);window.__ready=true}})();
</script></body></html>'''
open('stage.html', 'w').write(stage)

# 2) motion-kit page (make.mjs): kit.js gives Kit.overflow (QA) + Kit.settle; render(t) drives the shim timeline
kit = HEAD + '<div id="root"></div>\n<script src="../../../tools/motion/kit.js"></script>\n<script>' + shim + '</script>\n<script>window.__stageId="root";' + BUILD + '''
Kit.each(t=>window.renderAt(t));
window.render=Kit.render;
window.__ready=(async()=>{const res=await __build();Kit.render(0);
  return {duration:window.__duration(),width:1080,height:1350,tracks:window.__n,scenes:(res.ids&&Object.keys(res.ids).length)||0}})();
const __m=location.hash.match(/t=([\\d.]+)/);if(__m)window.__ready.then(()=>Kit.render(parseFloat(__m[1])));
</script></body></html>'''
open('six-bids.kit.html', 'w').write(kit)
print('stage.html', len(stage), '| six-bids.kit.html', len(kit))
