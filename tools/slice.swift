// Cut [t0,t1] seconds out of an audio file → .m4a (AAC). build: swiftc -O tools/slice.swift -o tools/slice
// usage: tools/slice <in.mp3> <out.m4a> <t0> <t1>
import AVFoundation
let a = CommandLine.arguments
guard a.count >= 5, let t0 = Double(a[3]), let t1 = Double(a[4]) else { print("usage: slice in out t0 t1"); exit(1) }
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let out = URL(fileURLWithPath: a[2]); try? FileManager.default.removeItem(at: out)
guard let ex = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetAppleM4A) else { print("no export"); exit(1) }
ex.outputURL = out; ex.outputFileType = .m4a
ex.timeRange = CMTimeRange(start: CMTime(seconds: t0, preferredTimescale: 44100), end: CMTime(seconds: t1, preferredTimescale: 44100))
let s = DispatchSemaphore(value: 0); ex.exportAsynchronously { s.signal() }; s.wait()
if ex.status != .completed { print("failed", ex.error?.localizedDescription ?? ""); exit(1) }
