<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="https://www.observe888.com/">
  <title>新版首頁｜見觀結構</title>
</head>
<body>
  <main>
    <h1>見觀結構新版首頁</h1>
    <p>舊首頁已整理到新版網站，請前往見觀結構新版首頁、身體觀察筆記或到店導航入口。</p>
    <p><a href="/">新版首頁</a>｜<a href="/notes/">身體觀察筆記</a>｜<a href="/visit/">到店導航</a></p>
  </main>
  <script>
    (function () {
      const target = new URL('/', window.location.origin);
      const passthroughKeys = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'];
      const incoming = new URLSearchParams(window.location.search);

      incoming.forEach(function (value, key) {
        const lowerKey = key.toLowerCase();
        if (lowerKey.indexOf('utm_') === 0 || passthroughKeys.indexOf(lowerKey) !== -1) {
          target.searchParams.append(key, value);
        }
      });

      window.location.replace(target.toString());
    }());
  </script>
</body>
</html>
