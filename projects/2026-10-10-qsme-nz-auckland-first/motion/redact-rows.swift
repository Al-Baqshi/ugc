// Autocomplete privacy redaction data for af.js. For every keystroke frame: how many suggestion rows the live
// dropdown shows (0 = closed). Rows other than the council's own address are blurred in the edit (af.js kclip).
// Regenerate after any re-capture:  swiftc -O redact-rows.swift -o /tmp/redact-rows && for k in dun chc ham akl; do for m in d m; do /tmp/redact-rows clips/$k-${m}k $m; done; done
import AppKit
// usage: redact-rows <dir> <mode d|m>   -> prints per frame: index, rows (0..6), bg samples of row slots
let a = CommandLine.arguments; let dir = a[1]; let mode = a[2]
let dpr: Double = mode == "d" ? 2 : 4.155
// viewport CSS geometry of the autocomplete list (same hero layout before Enter)
let padX: Double = mode == "d" ? 421 : 20          // inside the list, left of the pin
let pinX0: Double = mode == "d" ? 430 : 31, pinX1: Double = mode == "d" ? 443 : 41
let row0: Double = mode == "d" ? 575 : 381.4          // top of row 1
let rh: Double = mode == "d" ? 48 : 47.9
let fm = FileManager.default
let files = try! fm.contentsOfDirectory(atPath: dir).filter { $0.hasSuffix(".jpg") }.sorted()
var out: [String] = []
for f in files {
  guard let img = NSImage(contentsOfFile: dir + "/" + f), let tiff = img.tiffRepresentation, let rep = NSBitmapImageRep(data: tiff) else { continue }
  func px(_ x: Double, _ y: Double) -> (Double, Double, Double) {
    let c = rep.colorAt(x: Int(x * dpr), y: Int(y * dpr))!.usingColorSpace(.deviceRGB)!
    return (Double(c.redComponent) * 255, Double(c.greenComponent) * 255, Double(c.blueComponent) * 255)
  }
  var n = 0; var info: [String] = []
  for k in 0..<6 {
    let yc = row0 + rh * Double(k) + rh / 2
    // navy test on a few padding samples
    var navy = 0
    for dy in [-14.0, -6.0, 0.0, 6.0, 14.0] { let (r, g, b) = px(padX, yc + dy); if b > r + 12 && b > g + 6 && b < 90 && r < 50 { navy += 1 } }
    // pin: bright pixel in the icon box (upper part of row)
    var maxL = 0.0
    var y = row0 + rh * Double(k) + 6
    while y < row0 + rh * Double(k) + 26 { var x = pinX0; while x < pinX1 { let (r, g, b) = px(x, y); maxL = max(maxL, 0.299 * r + 0.587 * g + 0.114 * b); x += 0.5 }; y += 0.5 }
    let ok = navy >= 4 && maxL > 90
    info.append("\(navy)/\(Int(maxL))")
    if ok && n == k { n += 1 }
  }
  out.append("\(f) rows=\(n)  " + info.joined(separator: " "))
}
print(out.joined(separator: "\n"))
