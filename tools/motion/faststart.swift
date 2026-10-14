// Re-mux an MP4 with its index (moov) before the media data, without re-encoding, so browsers and
// link-preview players can start playback before the whole file has downloaded.
// build: swiftc -O tools/motion/faststart.swift -o tools/motion/faststart
// usage: tools/motion/faststart <in.mp4> <out.mp4>
import AVFoundation
let a = CommandLine.arguments
guard a.count == 3 else { print("usage: faststart in.mp4 out.mp4"); exit(1) }
let out = URL(fileURLWithPath: a[2]); try? FileManager.default.removeItem(at: out)
guard let ex = AVAssetExportSession(asset: AVURLAsset(url: URL(fileURLWithPath: a[1])), presetName: AVAssetExportPresetPassthrough) else { print("no export session"); exit(1) }
ex.outputURL = out; ex.outputFileType = .mp4; ex.shouldOptimizeForNetworkUse = true
let sem = DispatchSemaphore(value: 0); ex.exportAsynchronously { sem.signal() }; sem.wait()
if ex.status == .completed { print("wrote", a[2]) } else { print("failed:", ex.error?.localizedDescription ?? "unknown"); exit(1) }
