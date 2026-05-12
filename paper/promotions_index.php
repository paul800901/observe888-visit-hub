<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="https://www.observe888.com/visit/">
  <title>活動頁已整理｜見觀結構</title>
</head>
<body>
  <main>
    <h1>活動與預約資訊已整理到新版入口</h1>
    <p>舊活動頁已整理，實際預約、LINE、電話與到店資訊請以前往新版導航入口為準。</p>
    <p><a href="/visit/">到店導航</a>｜<a href="/">新版首頁</a></p>
  </main>
  <script>
    (function () {
      const target = new URL('/visit/', window.location.origin);
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
