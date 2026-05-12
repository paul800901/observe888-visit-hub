<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, follow">
  <title>舊頁面已整理｜見觀結構</title>
</head>
<body>
  <main>
    <h1>這個舊頁面已整理到新版網站</h1>
    <p>團隊介紹、品牌介紹與聯絡入口已整理到新版品牌頁與到店導航入口。</p>
    <p><a href="/about/">品牌介紹</a>｜<a href="/visit/">到店導航</a>｜<a href="/">新版首頁</a></p>
  </main>
  <script>
    (function () {
      const incoming = new URLSearchParams(window.location.search);
      const pageId = incoming.get('id');
      const targetPath = pageId === '11272' ? '/about/' : '/visit/';
      const target = new URL(targetPath, window.location.origin);
      const passthroughKeys = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'];

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
