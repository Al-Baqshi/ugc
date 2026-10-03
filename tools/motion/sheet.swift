import AppKit
// usage: sheet out.png cols file1 file2 ...
let a = CommandLine.arguments; let out = a[1]; let cols = Int(a[2])!
let imgs = a[3...].compactMap { NSImage(contentsOfFile: $0) }
let w = imgs[0].size.width, h = imgs[0].size.height, gap: CGFloat = 8
let rows = (imgs.count + cols - 1) / cols
let W = CGFloat(cols) * (w + gap) + gap, H = CGFloat(rows) * (h + gap) + gap
let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(W), pixelsHigh: Int(H), bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState(); NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
NSColor(white: 0.5, alpha: 1).setFill(); NSRect(x: 0, y: 0, width: W, height: H).fill()
for (i, im) in imgs.enumerated() { let c = i % cols, r = i / cols
  im.draw(in: NSRect(x: gap + CGFloat(c) * (w + gap), y: H - CGFloat(r + 1) * (h + gap), width: w, height: h)) }
NSGraphicsContext.restoreGraphicsState()
try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: out))
print("ok", W, H)
