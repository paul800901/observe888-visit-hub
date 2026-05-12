<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="https://www.observe888.com/visit/">
  <title>服務與費用已整理｜見觀結構</title>
</head>
<body>
  <main>
    <h1>服務與費用已整理到新版入口</h1>
    <p>舊站服務項目與服務價目頁已整理到新版到店導航入口，請改由北區店或南區工作室入口查看。</p>
    <p><a href="/visit/">到店導航</a>｜<a href="/north/pricing/">北區服務與費用</a>｜<a href="/south/pricing/">南區預約說明</a></p>
  </main>
  <script>
    (function () {
      const incoming = new URLSearchParams(window.location.search);
      const isPricing = incoming.get('id') === '3718';
      const target = new URL(isPricing ? '/north/pricing/' : '/visit/', window.location.origin);
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
