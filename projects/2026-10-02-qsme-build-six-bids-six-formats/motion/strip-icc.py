# usage: python3 projects/2026-10-02-qsme-build-six-bids-six-formats/motion/strip-icc.py projects/2026-10-02-qsme-build-six-bids-six-formats/motion/clips/master
# Losslessly drop ICC_PROFILE (APP2) segments from JPEGs so browsers read the pixel values as sRGB (as the master was drawn).
import sys, os, glob
def strip(data):
    assert data[:2] == b'\xff\xd8'
    out = bytearray(data[:2]); i = 2; dropped = 0
    while i < len(data):
        if data[i] != 0xFF: raise ValueError('bad marker at %d' % i)
        m = data[i+1]
        if m == 0xDA:  # start of scan: copy the rest
            out += data[i:]; break
        ln = int.from_bytes(data[i+2:i+4], 'big')
        seg = data[i:i+2+ln]
        if m == 0xE2 and seg[4:16] == b'ICC_PROFILE\x00':
            dropped += 1
        else:
            out += seg
        i += 2 + ln
    return bytes(out), dropped
n = d = 0
for f in sorted(glob.glob(os.path.join(sys.argv[1], 'f_*.jpg'))):
    data = open(f, 'rb').read()
    new, k = strip(data)
    if k: open(f, 'wb').write(new); d += 1
    n += 1
print('files', n, 'stripped', d)
