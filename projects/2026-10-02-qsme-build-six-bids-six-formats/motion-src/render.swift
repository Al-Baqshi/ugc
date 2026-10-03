import AppKit
import WebKit
import AVFoundation
import CoreVideo

@MainActor final class R: NSObject, WKNavigationDelegate {
  var web: WKWebView!; var win: NSWindow!; var loaded: CheckedContinuation<Void,Never>?
  let W = 1080, H = 1350
  func setup() {
    web = WKWebView(frame: NSRect(x:0,y:0,width:W,height:H), configuration: WKWebViewConfiguration())
    web.navigationDelegate = self
    win = NSWindow(contentRect: NSRect(x:0,y:0,width:W,height:H), styleMask:[.borderless], backing:.buffered, defer:false)
    win.contentView = web; win.setFrameOrigin(NSPoint(x:-6000,y:-6000)); win.orderFrontRegardless()
  }
  nonisolated func webView(_ w: WKWebView, didFinish n: WKNavigation!) { Task { @MainActor in self.loaded?.resume(); self.loaded = nil } }
  func js(_ s: String) async -> Any? { return try? await web.evaluateJavaScript(s) }
  func snap(outW: Int, outH: Int) async -> CGImage {
    let cfg = WKSnapshotConfiguration(); cfg.snapshotWidth = NSNumber(value: W)
    let img = try! await web.takeSnapshot(configuration: cfg)
    let src = img.cgImage(forProposedRect: nil, context: nil, hints: nil)!
    let ctx = CGContext(data: nil, width: outW, height: outH, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)!
    ctx.interpolationQuality = .high
    ctx.draw(src, in: CGRect(x: 0, y: 0, width: outW, height: outH))
    return ctx.makeImage()!
  }
  func run() async {
    let a = CommandLine.arguments
    let html = URL(fileURLWithPath: a[1]); let mode = a[2]; let out = a[3]
    setup()
    await withCheckedContinuation { c in loaded = c; web.loadFileURL(html, allowingReadAccessTo: html.deletingLastPathComponent()) }
    var tries = 0
    while (await js("window.__ready===true") as? Bool) != true { try? await Task.sleep(nanoseconds: 100_000_000); tries += 1; if tries > 300 { print("timeout waiting for __ready"); exit(2) } }
    if let err = await js("window.__err||''") as? String, !err.isEmpty { print("PAGE ERROR: \(err)"); exit(3) }
    if let r = await js("JSON.stringify({res:window.__res,n:window.__n,fonts:window.__fontsOk})") as? String { print(r.prefix(3000)) }
    let dur = (await js("window.__duration()") as? Double) ?? 0
    print("duration", dur)
    if mode == "png" {
      let outW = Int(a[4])!; let outH = outW * H / W
      for ts in a[5...] {
        let t = Double(ts)!
        _ = await js("renderAt(\(t))")
        let cg = await snap(outW: outW, outH: outH)
        let rep = NSBitmapImageRep(cgImage: cg)
        let p = "\(out)/f_\(String(format: "%05.2f", t)).png"
        try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: p))
      }
      print("wrote \(a.count-5) pngs")
    } else {
      let fps = Int(a[4])!; let outW = Int(a[5]) ?? W; let outH = outW * H / W
      let br = Int(a.count > 6 ? a[6] : "12000000")!
      let url = URL(fileURLWithPath: out); try? FileManager.default.removeItem(at: url)
      let wr = try! AVAssetWriter(outputURL: url, fileType: .mp4)
      let settings: [String: Any] = [AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: outW, AVVideoHeightKey: outH,
        AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: br, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel, AVVideoMaxKeyFrameIntervalKey: fps * 2, AVVideoExpectedSourceFrameRateKey: fps],
        AVVideoColorPropertiesKey: [AVVideoColorPrimariesKey: AVVideoColorPrimaries_ITU_R_709_2, AVVideoTransferFunctionKey: AVVideoTransferFunction_ITU_R_709_2, AVVideoYCbCrMatrixKey: AVVideoYCbCrMatrix_ITU_R_709_2]]
      let inp = AVAssetWriterInput(mediaType: .video, outputSettings: settings); inp.expectsMediaDataInRealTime = false
      let ad = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: inp, sourcePixelBufferAttributes: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA, kCVPixelBufferWidthKey as String: outW, kCVPixelBufferHeightKey as String: outH])
      wr.add(inp); wr.startWriting(); wr.startSession(atSourceTime: .zero)
      let n = Int((dur * Double(fps)).rounded())
      for i in 0..<n {
        let t = Double(i) / Double(fps)
        _ = await js("renderAt(\(t))")
        let cg = await snap(outW: outW, outH: outH)
        while !inp.isReadyForMoreMediaData { try? await Task.sleep(nanoseconds: 2_000_000) }
        var pb: CVPixelBuffer?; CVPixelBufferPoolCreatePixelBuffer(nil, ad.pixelBufferPool!, &pb)
        let buf = pb!; CVPixelBufferLockBaseAddress(buf, [])
        let ctx = CGContext(data: CVPixelBufferGetBaseAddress(buf), width: outW, height: outH, bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(buf), space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)!
        ctx.draw(cg, in: CGRect(x: 0, y: 0, width: outW, height: outH))
        CVPixelBufferUnlockBaseAddress(buf, [])
        ad.append(buf, withPresentationTime: CMTime(value: CMTimeValue(i), timescale: CMTimeScale(fps)))
        if i % 150 == 0 { print("frame \(i)/\(n)") }
      }
      inp.markAsFinished()
      await wr.finishWriting()
      print("mp4 status", wr.status.rawValue, wr.error?.localizedDescription ?? "ok", "frames", n)
    }
  }
}
let app = NSApplication.shared
app.setActivationPolicy(.prohibited)
Task { @MainActor in let r = R(); await r.run(); exit(0) }
app.run()
