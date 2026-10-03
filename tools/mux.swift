// Lay VO (and optional music/SFX) clips onto a silent MP4 at given start times.
// build: swiftc -O tools/mux.swift -o tools/mux
// usage: tools/mux <video.mp4> <out.mp4> <clip.mp3>@<start_s>[@<gain>] ...
// Each clip gets its own audio track at its start time; gain 0–1 (default 1).
import AVFoundation

let a = CommandLine.arguments
guard a.count >= 4 else { print("usage: mux video.mp4 out.mp4 clip.mp3@start[@gain] ..."); exit(1) }
let video = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let outURL = URL(fileURLWithPath: a[2])
try? FileManager.default.removeItem(at: outURL)

let comp = AVMutableComposition()
let dur = video.duration
guard let vSrc = video.tracks(withMediaType: .video).first,
      let vDst = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid) else { print("no video track"); exit(1) }
try! vDst.insertTimeRange(CMTimeRange(start: .zero, duration: dur), of: vSrc, at: .zero)
vDst.preferredTransform = vSrc.preferredTransform

var params: [AVMutableAudioMixInputParameters] = []
for spec in a[3...] {
  let p = spec.split(separator: "@").map(String.init)
  guard p.count >= 2, let start = Double(p[1]) else { print("bad clip spec", spec); exit(1) }
  let gain = p.count > 2 ? Float(p[2]) ?? 1 : 1
  let clip = AVURLAsset(url: URL(fileURLWithPath: p[0]))
  guard let aSrc = clip.tracks(withMediaType: .audio).first,
        let aDst = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) else { print("no audio in", p[0]); exit(1) }
  let at = CMTime(seconds: start, preferredTimescale: 600)
  var len = clip.duration
  if CMTimeAdd(at, len) > dur { len = CMTimeSubtract(dur, at) }   // trim to video end
  if CMTimeCompare(len, .zero) <= 0 { print("clip starts after video end:", spec); continue }
  try! aDst.insertTimeRange(CMTimeRange(start: .zero, duration: len), of: aSrc, at: at)
  let ip = AVMutableAudioMixInputParameters(track: aDst); ip.setVolume(gain, at: .zero); params.append(ip)
  print(String(format: "  %@ at %.2fs (%.2fs, gain %.2f)", (p[0] as NSString).lastPathComponent, start, CMTimeGetSeconds(len), gain))
}
let mix = AVMutableAudioMix(); mix.inputParameters = params

guard let ex = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetHighestQuality) else { print("no export session"); exit(1) }
ex.outputURL = outURL; ex.outputFileType = .mp4; ex.audioMix = mix
let sem = DispatchSemaphore(value: 0)
ex.exportAsynchronously { sem.signal() }
sem.wait()
if ex.status == .completed {
  let size = (try? FileManager.default.attributesOfItem(atPath: outURL.path)[.size] as? Int) ?? 0
  print("wrote", outURL.path, size, "bytes")
} else { print("export failed:", ex.error?.localizedDescription ?? "unknown"); exit(1) }
