#!/usr/bin/env python3
"""Level a voice take before muxing: speech to a set loudness, peaks held under a ceiling (no clipping).

usage: python3 tools/voicenorm.py <take.mp3|m4a> <out.m4a> [speech_rms_dbfs=-18] [ceiling_dbfs=-1.5]

Speech loudness is measured per channel over the voiced 50 ms windows only (pauses don't count), the take is
scaled to hit it, and anything above the ceiling goes through a soft knee so the few loudest syllables are
rounded off instead of clipped. Mux the result at gain 1.0. Prints before/after levels.
"""
import array, math, os, subprocess, sys, tempfile, wave

SR = 44100


def load(path):
    # AIFF, because afconvert writes m4a sources to WAVE_FORMAT_EXTENSIBLE, which the wave module can't read
    import aifc
    tmp = tempfile.mktemp(suffix=".aif")
    subprocess.run(["afconvert", "-f", "AIFF", "-d", f"BEI16@{SR}", "-c", "1", path, tmp], check=True)
    f = aifc.open(tmp); s = array.array("h", f.readframes(f.getnframes())); f.close(); os.remove(tmp)
    if sys.byteorder == "little":
        s.byteswap()
    return [x / 32768 for x in s]


def speech_rms(x):
    win = SR // 20
    rms = [math.sqrt(sum(v * v for v in x[i:i + win]) / win) for i in range(0, len(x) - win, win)]
    loud = [r for r in rms if r > 10 ** (-40 / 20)]
    return math.sqrt(sum(r * r for r in loud) / max(1, len(loud)))


def main(src, out, target=-18.0, ceiling=-1.5):
    target, ceiling = float(target), float(ceiling)
    x = load(src)
    r0, p0 = speech_rms(x), max(abs(v) for v in x)
    g = 10 ** (target / 20) / r0
    c = 10 ** (ceiling / 20)
    knee = c * 0.8
    y = []
    for v in x:
        a = abs(v * g)
        if a > knee:  # soft knee: approaches the ceiling, never passes it
            a = knee + (c - knee) * math.tanh((a - knee) / (c - knee))
        y.append(math.copysign(a, v))
    pk = max(abs(v) for v in y)
    tmp = tempfile.mktemp(suffix=".wav")
    w = wave.open(tmp, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(array.array("h", (int(v * 32767) for v in y)).tobytes()); w.close()
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", "192000", tmp, out], check=True)
    os.remove(tmp)
    print(f"{os.path.basename(src)}: speech {20 * math.log10(r0):.1f} → {target:.1f} dBFS (gain {20 * math.log10(g):+.1f} dB), "
          f"peak {20 * math.log10(p0):.1f} → {20 * math.log10(pk):.1f} dBFS")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    main(*sys.argv[1:5])
