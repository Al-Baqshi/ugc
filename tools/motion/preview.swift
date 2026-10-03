// Make a small web preview of a video (half size, ~2.5 Mbps H.264, AAC audio kept) for the Studio.
// build: swiftc -O tools/motion/preview.swift -o tools/motion/preview
// usage: tools/motion/preview <in.mp4> <out.preview.mp4> [scale=0.5] [mbps=2.5]
import AVFoundation

let a = CommandLine.arguments
guard a.count >= 3 else { print("usage: preview in.mp4 out.mp4 [scale] [mbps]"); exit(1) }
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let outURL = URL(fileURLWithPath: a[2])
let scale = a.count > 3 ? Double(a[3])! : 0.5
let mbps = a.count > 4 ? Double(a[4])! : 2.5
try? FileManager.default.removeItem(at: outURL)
guard let vTrack = asset.tracks(withMediaType: .video).first else { print("no video"); exit(1) }
let nat = vTrack.naturalSize.applying(vTrack.preferredTransform)
let W = Int((abs(nat.width) * scale / 2).rounded()) * 2, H = Int((abs(nat.height) * scale / 2).rounded()) * 2

let comp = AVMutableVideoComposition()
comp.renderSize = CGSize(width: W, height: H)
comp.frameDuration = vTrack.minFrameDuration.isValid && vTrack.minFrameDuration.seconds > 0 ? vTrack.minFrameDuration : CMTime(value: 1, timescale: 30)
let ins = AVMutableVideoCompositionInstruction()
ins.timeRange = CMTimeRange(start: .zero, duration: asset.duration)
let li = AVMutableVideoCompositionLayerInstruction(assetTrack: vTrack)
li.setTransform(vTrack.preferredTransform.concatenating(CGAffineTransform(scaleX: scale, y: scale)), at: .zero)
ins.layerInstructions = [li]
comp.instructions = [ins]

let reader = try! AVAssetReader(asset: asset)
let vOut = AVAssetReaderVideoCompositionOutput(videoTracks: [vTrack], videoSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
vOut.videoComposition = comp
reader.add(vOut)
var aOut: AVAssetReaderTrackOutput? = nil
if let aTrack = asset.tracks(withMediaType: .audio).first {
  let o = AVAssetReaderTrackOutput(track: aTrack, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM])
  reader.add(o); aOut = o
}
let writer = try! AVAssetWriter(outputURL: outURL, fileType: .mp4)
let vIn = AVAssetWriterInput(mediaType: .video, outputSettings: [
  AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: W, AVVideoHeightKey: H,
  AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: Int(mbps * 1_000_000), AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel]])
vIn.expectsMediaDataInRealTime = false
writer.add(vIn)
var aIn: AVAssetWriterInput? = nil
if aOut != nil {
  let i = AVAssetWriterInput(mediaType: .audio, outputSettings: [AVFormatIDKey: kAudioFormatMPEG4AAC, AVNumberOfChannelsKey: 2, AVSampleRateKey: 44100, AVEncoderBitRateKey: 128000])
  i.expectsMediaDataInRealTime = false
  writer.add(i); aIn = i
}
reader.startReading(); writer.startWriting(); writer.startSession(atSourceTime: .zero)
let group = DispatchGroup()
func pump(_ input: AVAssetWriterInput, _ output: AVAssetReaderOutput, _ q: String) {
  group.enter()
  input.requestMediaDataWhenReady(on: DispatchQueue(label: q)) {
    while input.isReadyForMoreMediaData {
      if let sb = output.copyNextSampleBuffer() { input.append(sb) } else { input.markAsFinished(); group.leave(); return }
    }
  }
}
pump(vIn, vOut, "v")
if let i = aIn, let o = aOut { pump(i, o, "a") }
group.wait()
let sem = DispatchSemaphore(value: 0)
writer.finishWriting { sem.signal() }
sem.wait()
if writer.status == .completed {
  let size = (try? FileManager.default.attributesOfItem(atPath: outURL.path)[.size] as? Int) ?? 0
  print("preview \(W)x\(H) \(size / 1024) KB -> \(outURL.path)")
} else { print("failed:", writer.error as Any); exit(1) }
