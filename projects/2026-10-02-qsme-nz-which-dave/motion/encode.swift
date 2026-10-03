// Encodes a PNG sequence (f_00000.png ...) into an H.264 MP4 with AVFoundation (no ffmpeg needed).
// build: swiftc -O encode.swift -o encode      usage: ./encode <framesDir> <out.mp4> [fps=30] [bitrateMbps=14]
import AVFoundation
import CoreGraphics
import CoreVideo
import ImageIO

let a = CommandLine.arguments
let dir = a[1], out = a[2]
let fps = Int32(a.count > 3 ? a[3] : "30")!
let mbps = Double(a.count > 4 ? a[4] : "14")!
let files = try FileManager.default.contentsOfDirectory(atPath: dir).filter { $0.hasPrefix("f_") && $0.hasSuffix(".png") }.sorted()
guard !files.isEmpty else { print("no frames"); exit(1) }
func load(_ f: String) -> CGImage {
  let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: dir + "/" + f) as CFURL, nil)!
  return CGImageSourceCreateImageAtIndex(src, 0, nil)!
}
let first = load(files[0])
let W = first.width, H = first.height
try? FileManager.default.removeItem(atPath: out)
let writer = try AVAssetWriter(outputURL: URL(fileURLWithPath: out), fileType: .mp4)
let settings: [String: Any] = [
  AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: W, AVVideoHeightKey: H,
  AVVideoColorPropertiesKey: [AVVideoColorPrimariesKey: AVVideoColorPrimaries_ITU_R_709_2,
                              AVVideoTransferFunctionKey: AVVideoTransferFunction_ITU_R_709_2,
                              AVVideoYCbCrMatrixKey: AVVideoYCbCrMatrix_ITU_R_709_2],
  AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: Int(mbps * 1_000_000),
                                    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
                                    AVVideoMaxKeyFrameIntervalKey: Int(fps),
                                    AVVideoExpectedSourceFrameRateKey: Int(fps)]
]
let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
  kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB, kCVPixelBufferWidthKey as String: W, kCVPixelBufferHeightKey as String: H])
writer.add(input)
writer.startWriting()
writer.startSession(atSourceTime: .zero)
let cs = CGColorSpace(name: CGColorSpace.sRGB)!
for (i, f) in files.enumerated() {
  autoreleasepool {
    let img = i == 0 ? first : load(f)
    while !input.isReadyForMoreMediaData { usleep(2000) }
    var pb: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &pb)
    let buf = pb!
    CVPixelBufferLockBaseAddress(buf, [])
    let ctx = CGContext(data: CVPixelBufferGetBaseAddress(buf), width: W, height: H, bitsPerComponent: 8,
                        bytesPerRow: CVPixelBufferGetBytesPerRow(buf), space: cs, bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)!
    ctx.draw(img, in: CGRect(x: 0, y: 0, width: W, height: H))
    CVPixelBufferUnlockBaseAddress(buf, [])
    if !adaptor.append(buf, withPresentationTime: CMTime(value: Int64(i), timescale: fps)) { print("append failed", i, writer.error as Any); exit(1) }
  }
}
input.markAsFinished()
let sem = DispatchSemaphore(value: 0)
writer.finishWriting { sem.signal() }
sem.wait()
print("status", writer.status.rawValue, writer.error as Any, "frames", files.count, "size", W, "x", H)
