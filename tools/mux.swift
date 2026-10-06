// Lay VO (and optional music/SFX) clips onto a silent MP4 at given start times.
// build: swiftc -O tools/mux.swift -o tools/mux
// usage: tools/mux <video.mp4> <out.mp4> <clip.mp3>@<start_s>[@<gain>] ... [--bed <music.mp3>@<gain>[@<duckTo>]]
// Each clip gets its own audio track at its start time; gain 0–1 (default 1).
// --bed: a music bed from 0s, looped/trimmed to the video, at <gain> (e.g. 0.22) and automatically ducked to
//        <duckTo> (default gain*0.35) while any VO clip plays, with 0.25 s ramps; fades out over the last 1.5 s.
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
var bedSpec: String? = nil
var clipArgs: [String] = []
var i = 3
while i < a.count { if a[i] == "--bed", i + 1 < a.count { bedSpec = a[i + 1]; i += 2 } else { clipArgs.append(a[i]); i += 1 } }
var voRanges: [(Double, Double)] = []
for spec in clipArgs {
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
  voRanges.append((start, start + CMTimeGetSeconds(len)))
  print(String(format: "  %@ at %.2fs (%.2fs, gain %.2f)", (p[0] as NSString).lastPathComponent, start, CMTimeGetSeconds(len), gain))
}
if let spec = bedSpec {
  let p = spec.split(separator: "@").map(String.init)
  let gain = p.count > 1 ? Float(p[1]) ?? 0.22 : 0.22
  let duckTo = p.count > 2 ? Float(p[2]) ?? gain * 0.35 : gain * 0.35
  let bed = AVURLAsset(url: URL(fileURLWithPath: p[0]))
  guard let bSrc = bed.tracks(withMediaType: .audio).first,
        let bDst = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) else { print("no audio in bed", p[0]); exit(1) }
  // loop the bed until it covers the video
  var cursor = CMTime.zero
  while CMTimeCompare(cursor, dur) < 0 {
    let remaining = CMTimeSubtract(dur, cursor)
    let piece = CMTimeCompare(bed.duration, remaining) < 0 ? bed.duration : remaining
    try! bDst.insertTimeRange(CMTimeRange(start: .zero, duration: piece), of: bSrc, at: cursor)
    cursor = CMTimeAdd(cursor, piece)
    if CMTimeGetSeconds(bed.duration) < 0.5 { break }
  }
  let ip = AVMutableAudioMixInputParameters(track: bDst)
  let total = CMTimeGetSeconds(dur), ramp = 0.25, fade = 1.5
  // merge VO spans that are closer than two ramps, so ramps never overlap
  let merged = voRanges.sorted { $0.0 < $1.0 }.reduce(into: [(Double, Double)]()) { acc, r in
    if let last = acc.last, r.0 <= last.1 + 2 * ramp { acc[acc.count - 1].1 = max(last.1, r.1) } else { acc.append(r) }
  }
  // volume breakpoints (time, level), strictly increasing in time
  var pts: [(Double, Float)] = [(0, gain)]
  for (s0, s1) in merged {
    let dIn = max(0, s0 - ramp), dOut = min(total, s1 + ramp)
    pts.append((dIn, gain)); pts.append((min(dIn + ramp, dOut), duckTo)); pts.append((max(dOut - ramp, dIn + ramp), duckTo)); pts.append((dOut, gain))
  }
  let fadeStart = max(pts.last!.0, total - fade)
  if fadeStart < total { pts.append((fadeStart, pts.last!.1)); pts.append((total, 0)) }
  var cleaned: [(Double, Float)] = []
  for p in pts { if let l = cleaned.last, p.0 <= l.0 + 0.001 { cleaned[cleaned.count - 1] = (l.0, p.1) } else { cleaned.append(p) } }
  ip.setVolume(cleaned[0].1, at: .zero)
  for k in 1..<cleaned.count {
    let (t0, v0) = cleaned[k - 1], (t1, v1) = cleaned[k]
    if v0 == v1 { continue }
    ip.setVolumeRamp(fromStartVolume: v0, toEndVolume: v1, timeRange: CMTimeRange(start: CMTime(seconds: t0, preferredTimescale: 600), duration: CMTime(seconds: t1 - t0, preferredTimescale: 600)))
  }
  params.append(ip)
  print(String(format: "  bed %@ gain %.2f, ducked to %.2f during %d VO span(s), fade %.1fs", (p[0] as NSString).lastPathComponent, gain, duckTo, merged.count, fade))
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
