// Speed up (or slow down) a voice take without changing its pitch, for when a language reads much longer than the
// picture allows. Keep it gentle (≤ 1.12): above that, TTS speech starts to sound processed.
// build: swiftc -O tools/tempo.swift -o tools/tempo
// usage: tools/tempo <in.mp3|m4a> <out.m4a> <rate>      e.g. 1.10 = 10% faster (duration / 1.10)
// Word timings scale by 1/rate: python3 tools/cue_take.py times works on words.json, so rescale that first
// (tools/cue_take.py scale <dir> <rate> does it).
import AVFoundation

let a = CommandLine.arguments
guard a.count == 4, let rate = Double(a[3]), rate > 0.5, rate < 2 else { print("usage: tempo in out.m4a rate"); exit(1) }
let src = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let outURL = URL(fileURLWithPath: a[2])
try? FileManager.default.removeItem(at: outURL)
let comp = AVMutableComposition()
guard let s = src.tracks(withMediaType: .audio).first,
      let t = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) else { print("no audio"); exit(1) }
let dur = src.duration
try! t.insertTimeRange(CMTimeRange(start: .zero, duration: dur), of: s, at: .zero)
let newDur = CMTime(seconds: dur.seconds / rate, preferredTimescale: 44100)
t.scaleTimeRange(CMTimeRange(start: .zero, duration: dur), toDuration: newDur)
guard let ex = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetAppleM4A) else { print("no export"); exit(1) }
ex.outputURL = outURL
ex.outputFileType = .m4a
ex.audioTimePitchAlgorithm = .spectral
let sem = DispatchSemaphore(value: 0)
ex.exportAsynchronously { sem.signal() }
sem.wait()
if ex.status != .completed { print("export failed:", ex.error?.localizedDescription ?? "?"); exit(1) }
print(String(format: "%.2fs → %.2fs (×%.3f)", dur.seconds, newDur.seconds, rate))
