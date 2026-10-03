import AVFoundation
import AppKit
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

// usage: frames <video.mp4> <outdir> <maxWidth> t1 t2 t3 ...
let args = CommandLine.arguments
guard args.count >= 5 else { print("usage: frames video outdir maxWidth t1 t2 ..."); exit(1) }
let url = URL(fileURLWithPath: args[1])
let outDir = args[2]
let maxW = Double(args[3]) ?? 540
let times = args[4...].compactMap { Double($0) }
let asset = AVURLAsset(url: url)
let dur = CMTimeGetSeconds(asset.duration)
print("duration", dur)
if let track = asset.tracks(withMediaType: .video).first {
  print("size", track.naturalSize, "fps", track.nominalFrameRate)
}
let gen = AVAssetImageGenerator(asset: asset)
gen.appliesPreferredTrackTransform = true
gen.requestedTimeToleranceBefore = .zero
gen.requestedTimeToleranceAfter = .zero
gen.maximumSize = CGSize(width: maxW, height: maxW * 4)
try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)
for t in times {
  let ct = CMTime(seconds: t, preferredTimescale: 600)
  do {
    let img = try gen.copyCGImage(at: ct, actualTime: nil)
    let name = String(format: "%@/f_%06.2f.png", outDir, t)
    let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: name) as CFURL, UTType.png.identifier as CFString, 1, nil)!
    CGImageDestinationAddImage(dest, img, nil)
    CGImageDestinationFinalize(dest)
    print("wrote", name, img.width, img.height)
  } catch {
    print("fail", t, error)
  }
}
