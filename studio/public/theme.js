// Applies a saved light/dark choice before first paint. Default follows the system.
(function () {
  try {
    var t = localStorage.getItem('studio-theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
      // The browser bar follows the forced theme too (the meta tags are above this script).
      var metas = document.querySelectorAll('meta[name="theme-color"]');
      for (var i = 0; i < metas.length; i++) metas[i].setAttribute('content', t === 'dark' ? '#14120f' : '#f4f0e6');
    }
  } catch (e) {}
})();
