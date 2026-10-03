import AVFoundation
import AppKit
let a = CommandLine.arguments; let url = URL(fileURLWithPath: a[1]); let outDir = a[2]
let asset = AVURLAsset(url: url)
let sem = DispatchSemaphore(value: 0)
Task {
  let dur = try! await asset.load(.duration)
  let tr = try! await asset.loadTracks(withMediaType: .video).first!
  let size = try! await tr.load(.naturalSize); let fps = try! await tr.load(.nominalFrameRate); let br = try! await tr.load(.estimatedDataRate)
  print("duration", CMTimeGetSeconds(dur), "size", size, "fps", fps, "bitrate", Int(br))
  let g = AVAssetImageGenerator(asset: asset); g.requestedTimeToleranceBefore = .zero; g.requestedTimeToleranceAfter = .zero; g.maximumSize = CGSize(width: 540, height: 675)
  for ts in a[3...] {
    let t = Double(ts)!
    let (cg, _) = try! await g.image(at: CMTime(seconds: t, preferredTimescale: 600))
    let rep = NSBitmapImageRep(cgImage: cg)
    try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "\(outDir)/m_\(String(format: "%05.2f", t)).png"))
  }
  sem.signal()
}
sem.wait()
