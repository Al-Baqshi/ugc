// UGC Studio, /videos: copy buttons, version switching, seek-to-line, and the
// line being spoken highlighted while a video plays. No inline handlers (CSP).
(function () {
  'use strict';
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var status = document.getElementById('copy-status');

  function play(v) {
    var p = v.play();
    if (p && typeof p.catch === 'function') p.catch(function () {});
  }

  // ----------------------------------------------------------------- copy
  // The old way, for http pages or when the Clipboard API says no.
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.className = 'vh';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function (e) {
        if (!legacyCopy(text)) throw e;
      });
    }
    return legacyCopy(text) ? Promise.resolve() : Promise.reject(new Error('copy failed'));
  }

  // Copy buttons are text-only, so the label can be swapped as plain text.
  function flash(btn, label, cls) {
    if (!btn.hasAttribute('data-label')) btn.setAttribute('data-label', btn.textContent);
    clearTimeout(btn._t);
    btn.textContent = label;
    btn.classList.add(cls);
    btn._t = setTimeout(function () {
      btn.textContent = btn.getAttribute('data-label');
      btn.classList.remove(cls);
    }, 1400);
  }

  // ---------------------------------------------------------------- clicks
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var c = t.closest('[data-copy]');
    if (c) {
      copyText(c.getAttribute('data-copy')).then(
        function () {
          flash(c, 'Copied', 'is-done');
          if (status) status.textContent = 'Copied to the clipboard.';
        },
        function () {
          flash(c, 'Copy failed', 'is-failed');
          if (status) status.textContent = 'Could not copy. Select the text and copy it by hand.';
        }
      );
      return;
    }

    // Share: the phone's share sheet (WhatsApp, Messages, LinkedIn…) where there is one,
    // else copy the link. /media links never expire: each visit signs a fresh one.
    var sh = t.closest('[data-share]');
    if (sh) {
      var url = new URL(sh.getAttribute('data-share'), location.href).href;
      var title = sh.getAttribute('data-share-title') || document.title;
      var label = sh.querySelector('span');
      var say = function (msg) {
        if (!label) return;
        if (!sh.hasAttribute('data-label')) sh.setAttribute('data-label', label.textContent);
        clearTimeout(sh._t);
        label.textContent = msg;
        sh._t = setTimeout(function () { label.textContent = sh.getAttribute('data-label'); }, 1600);
      };
      var copyLink = function () {
        copyText(url).then(
          function () { say('Link copied'); if (status) status.textContent = 'Link copied: ' + url; },
          function () { say('Copy failed'); if (status) status.textContent = 'Could not copy. The link is ' + url; }
        );
      };
      if (navigator.share) {
        navigator.share({ title: title, text: title, url: url }).catch(function (err) {
          if (!err || err.name !== 'AbortError') copyLink();
        });
      } else {
        copyLink();
      }
      return;
    }

    var s = t.closest('[data-seek]');
    if (s) {
      var v = document.getElementById(s.getAttribute('data-seek'));
      if (!v) return;
      var at = Number(s.getAttribute('data-start')) || 0;
      try { v.currentTime = at; } catch (err) {}
      // The player is sticky, but make sure the line plays where it can be seen.
      var r = v.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) {
        var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        v.scrollIntoView({ block: 'nearest', behavior: calm ? 'auto' : 'smooth' });
      }
      play(v);
      return;
    }

    var b = t.closest('[data-play]');
    if (b) {
      var video = document.getElementById(b.getAttribute('data-play'));
      if (!video) return;
      var src = b.getAttribute('data-src');
      if ((video.getAttribute('src') || '').split('#')[0] !== src) {
        video.setAttribute('src', src);
        var box = video.parentNode;
        if (box && box.classList) {
          box.className = box.className.replace(/\bar-\S+/g, '').trim() + ' ar-' + (b.getAttribute('data-aspect') || '9x16');
        }
      }
      var list = b.closest('.versions');
      if (list) {
        $$('.version', list).forEach(function (row) {
          var on = row.contains(b);
          row.classList.toggle('is-current', on);
          var btn = row.querySelector('[data-play]');
          if (btn) btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
      }
      play(video);
    }
  });

  // ------------------------------------------------------------ highlight
  var videos = $$('video');
  videos.forEach(function (v) {
    // One video at a time.
    v.addEventListener('play', function () {
      videos.forEach(function (o) { if (o !== v && !o.paused) o.pause(); });
    });
    var list = v.getAttribute('data-lines') && document.getElementById(v.getAttribute('data-lines'));
    if (!list) return;
    var lines = $$('.vline', list).map(function (li) {
      return { li: li, s: Number(li.getAttribute('data-start')) || 0, e: Number(li.getAttribute('data-end')) || 0 };
    });
    function tick() {
      var t = v.currentTime;
      lines.forEach(function (l) {
        var now = t >= l.s && t < l.e;
        if (now === l.li.classList.contains('is-now')) return;
        l.li.classList.toggle('is-now', now);
        if (now) l.li.setAttribute('aria-current', 'true');
        else l.li.removeAttribute('aria-current');
      });
    }
    v.addEventListener('timeupdate', tick);
    v.addEventListener('seeked', tick);
    v.addEventListener('emptied', tick);
  });
})();
