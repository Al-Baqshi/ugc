// Cut a video into a sequential JPEG frame folder for Kit.clip().
// build: swiftc -O tools/motion/extract.swift -o tools/motion/extract
// usage: tools/motion/extract <video.mp4> <outDir> [fps=30] [start=0] [end=duration] [maxWidth=1080]
// writes outDir/f_00000.jpg … and outDir/frames.json { fps, start, end, count, width, height }
import AVFoundation
import AppKit
let a = CommandLine.arguments
guard a.count >= 3 else { print("usage: extract video outDir [fps] [start] [end] [maxWidth]"); exit(1) }
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let out = a[2]
let fps = a.count > 3 ? Double(a[3])! : 30
let dur = CMTimeGetSeconds(asset.duration)
let start = a.count > 4 ? Double(a[4])! : 0
let end = min(dur, a.count > 5 ? Double(a[5])! : dur)
let maxW = a.count > 6 ? Double(a[6])! : 1080
try? FileManager.default.removeItem(atPath: out)
try! FileManager.default.createDirectory(atPath: out, withIntermediateDirectories: true)
let gen = AVAssetImageGenerator(asset: asset)
gen.appliesPreferredTrackTransform = true
gen.requestedTimeToleranceBefore = CMTime(value: 1, timescale: 600)
gen.requestedTimeToleranceAfter = CMTime(value: 1, timescale: 600)
gen.maximumSize = CGSize(width: maxW, height: maxW * 4)
let n = Int(((end - start) * fps).rounded(.down))
var w = 0, h = 0
for i in 0..<n {
  autoreleasepool {
    let t = CMTime(seconds: start + Double(i) / fps, preferredTimescale: 600)
    guard let img = try? gen.copyCGImage(at: t, actualTime: nil) else { return }
    w = img.width; h = img.height
    let rep = NSBitmapImageRep(cgImage: img)
    let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.9])!
    try! data.write(to: URL(fileURLWithPath: String(format: "%@/f_%05d.jpg", out, i)))
  }
}
let meta = "{\"fps\":\(fps),\"start\":\(start),\"end\":\(end),\"count\":\(n),\"width\":\(w),\"height\":\(h)}"
try! meta.write(toFile: out + "/frames.json", atomically: true, encoding: .utf8)
print("extracted \(n) frames \(w)x\(h) from \(String(format: "%.2f", start))s to \(String(format: "%.2f", end))s → \(out)")
