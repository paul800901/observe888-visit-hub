# Cloudflare 舊 PHP URL 301 導入與驗收紀錄

最後更新：2026-06-24 23:29 +08:00

## 2026-06-24 CSP 追蹤 allowlist 修正

2026-06-24 首頁 live verification 發現正式站安全標頭的 CSP 會擋住部分追蹤與 beacon 請求。這不影響首頁顯示、LINE、電話、導航或主要站內入口，但會影響 Cloudflare Web Analytics 與 Google Ads / remarketing 的部分訊號。

Worker 原始碼已更新：

- `cloudflare/observe888-legacy-redirects.js`

本輪只補白名單，不取消 CSP：

- `script-src` 新增 `https://static.cloudflareinsights.com`、`https://www.googleadservices.com`、`https://googleads.g.doubleclick.net`。
- `connect-src` 新增 `https://ad.doubleclick.net`、`https://www.google.com`、`https://static.cloudflareinsights.com`、`https://cloudflareinsights.com`。

保留原有安全邊界：

- `default-src 'self'`
- `object-src 'none'`
- `frame-ancestors 'none'`
- `frame-src` 仍只允許 Google / Maps iframe。

本輪部署：

- Wrangler：`4.104.0`
- Worker：`observe888-legacy-redirects`
- route：`www.observe888.com/*`
- 版本 ID：`e666c808-bb52-43af-9fd9-737d534ef95f`
- deployment message：`Allow analytics and ads CSP endpoints 2026-06-24`

Live readback：

| 項目 | 讀回 |
| --- | --- |
| `https://www.observe888.com/` | `200`，CSP 已含 `static.cloudflareinsights.com`、`www.googleadservices.com`、`googleads.g.doubleclick.net`、`ad.doubleclick.net`、`www.google.com`、`cloudflareinsights.com` |
| `https://www.observe888.com/visit/` | `200`，CSP 存在 |
| `https://www.observe888.com/index.php` | `301 -> https://www.observe888.com/`，CSP 存在 |
| `https://www.observe888.com/north/` | `301 -> https://www.observe888.com/visit/`，CSP 存在 |
| `https://static.cloudflareinsights.com/beacon.min.js` | `200` |
| `https://googleads.g.doubleclick.net/pagead/viewthroughconversion/17875250530/` | `200` |

Headless Edge 讀回首頁 DOM 已看到 Cloudflare beacon script 與 Google Ads viewthrough script 載入。這表示原本被 `script-src` 擋住的兩類 script 已不再被 CSP 擋下。

## 2026-06-22 Cloudflare Worker 安全標頭更新

2026-06-22 AEO / SEO 健康檢查指出正式首頁缺少安全標頭。本輪不改 GitHub Pages 靜態檔，也不改 DNS；沿用既有 Cloudflare Worker `observe888-legacy-redirects`，把安全標頭加在 Worker 回出的所有正常頁面與 Worker 轉址回應上。

Worker 原始碼已更新：

- `cloudflare/observe888-legacy-redirects.js`

本輪部署：

- Wrangler OAuth 帳戶：`observe88888@gmail.com`
- Cloudflare account：`Observe88888@gmail.com's Account`
- Worker：`observe888-legacy-redirects`
- route：`www.observe888.com/*`
- 版本 ID：`dffd3350-1c77-4471-ad87-2e22d86fc4f5`
- deployment message：`Add security headers 2026-06-22`

套用的安全標頭：

- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`

CSP 先採保守不破壞版本：保留 Google Ads tag、Google Maps iframe、OpenStreetMap 地址建議、Google Apps Script 事件回傳與同源 geolocation 功能；未做過度收緊，避免把到店導航助手與追蹤事件打壞。

Live readback：

| URL | 讀回 |
| --- | --- |
| `https://www.observe888.com/` | `200`，六個安全標頭皆存在；title 為新版首頁 title |
| `https://www.observe888.com/visit/` | `200`，六個安全標頭皆存在 |
| `https://www.observe888.com/south/` | `200`，六個安全標頭皆存在 |
| `https://www.observe888.com/sitemap.xml` | `200`，六個安全標頭皆存在 |
| `https://www.observe888.com/robots.txt` | `200`，六個安全標頭皆存在 |
| `https://www.observe888.com/north/` | `301` -> `https://www.observe888.com/visit/`，六個安全標頭皆存在 |
| `https://www.observe888.com/north/pricing/` | `301` -> `https://www.observe888.com/south/pricing/`，六個安全標頭皆存在 |
| `https://www.observe888.com/index.php` | `301` -> `https://www.observe888.com/`，六個安全標頭皆存在 |

AEO Pro re-scan：

- 掃描時間：2026-06-22 15:59:13 +08:00
- Total：`73 / 100`，Grade `B`
- SEO：`92`
- AEO：`63`
- GEO：`63`
- 通過項目：`38 / 53`
- 未通過警告：`3`
- `安全瀏覽防護` 已不再出現在警告 / 未通過清單；剩餘前三項為外連品質、Chunk 語意區塊就緒度、BLUF 密度。

仍需注意：

- `https://www.observe888.com/paper/other_select_index.php?id=3718&title_id=11271&group_id=874` 與 `https://www.observe888.com/products/car.php` 仍先命中 Cloudflare Single Redirect，轉址目標正確，但該 301 回應本身不帶 Worker 新增的安全標頭。
- 若未來要讓這兩條舊 URL 的 301 回應也帶安全標頭，需要到 Cloudflare 規則層處理 Single Redirect / Response Header Transform，或移除對應 Single Redirect 讓 Worker 接手；這不是 repo 內 Worker 程式可單獨覆蓋的順序。

## 2026-06-12 北區退場後的索引清理更新

2026-06-12 收到 Search Console 通知「替代頁面（有適當的標準標記）」後，重新定義最終轉址目標：不要再把任何舊 URL 導到已退場的北區頁，避免 Google 先看到中繼頁，再由 canonical 判成替代頁。

新的規則原則：

- `/north/`、`/north/index.html` 直接 `301` 到 `/visit/`。
- `/north/pricing/`、`/north/pricing/index.html` 直接 `301` 到 `/south/pricing/`。
- `/paper/other_select_index.php?id=3718...` 直接 `301` 到 `/south/pricing/`，不再到 `/north/pricing/`。
- `/products/car.php` 直接 `301` 到 `/services/tainan-tuina/`。
- `/album/*`、`/news/*`、`/observations/*` 直接 `301` 到 `/notes/`。
- `/paper/other_page.php?id=11272...` 直接 `301` 到 `/about/`。
- 其他 `/paper/*` 舊入口直接 `301` 到 `/notes/` 或 `/visit/`，不再靠 GitHub Pages 404 / meta refresh / canonical 收尾。
- 只保留 `utm_*`、`gclid`、`gbraid`、`wbraid`、`fbclid`、`msclkid` 這類行銷追蹤參數；丟掉舊站 `id`、`title_id`、`group_id` 等參數。

Worker 原始碼已更新：

- `cloudflare/observe888-legacy-redirects.js`

注意：2026-05-19 的 `/north/pricing/` 目標屬於歷史紀錄；2026-06-12 之後以本節的新最終目標為準。

### 2026-06-12 18:30 Live 套用

Cloudflare 正確帳戶為 `Observe88888@gmail.com's Account`，帳戶 ID `72a69452f6f476c5efb54a1a5cab2ac4`。`sl800901@gmail.com` 帳戶底下沒有 `observe888.com` zone，不用於本官網。

本輪已完成：

- Wrangler OAuth 登入 `observe88888@gmail.com`。
- Worker `observe888-legacy-redirects` 部署新版，版本 ID `cac2f9ae-1b2c-4a6a-9ff7-0e14493f2965`。
- Worker routes 已套用：
  - `www.observe888.com/index.php*`
  - `www.observe888.com/north*`
  - `www.observe888.com/products/car.php*`
  - `www.observe888.com/album*`
  - `www.observe888.com/news*`
  - `www.observe888.com/observations*`
  - `www.observe888.com/paper*`
- Single Redirect `legacy-other-select-3718` 已由 `https://www.observe888.com/north/pricing/` 改為 `https://www.observe888.com/south/pricing/`。原因：Cloudflare Single Redirect 會先於 Worker 命中；若不改此條，`id=3718` 仍會先被導到北區退場頁。

Live readback：

| URL | 讀回 |
| --- | --- |
| `https://www.observe888.com/north/` | `301` -> `https://www.observe888.com/visit/` |
| `https://www.observe888.com/north/pricing/` | `301` -> `https://www.observe888.com/south/pricing/` |
| `https://www.observe888.com/paper/other_select_index.php?id=3718&title_id=11271&group_id=874` | `301` -> `https://www.observe888.com/south/pricing/` |
| `https://www.observe888.com/products/car.php` | `301` -> `https://www.observe888.com/services/tainan-tuina/` |

## 決策

舊 `.php` URL 的 server-side 301 改走 Cloudflare Free：

- 不使用 HiNet 轉址服務。HiNet 後台只支援 `http://[子網域].observe888.com` 這類主機名轉址，沒有 path、query、301/302 規則欄位，且要求 DNS A 指向 HiNet 轉址主機 `202.39.161.109`。
- 不使用 Railway 處理這件事。Railway 仍需改 DNS，且若當 proxy 會讓整站多一層應用服務依賴；Railway 保留給未來真正需要後端或動態服務的工作。
- 這次需求使用 Cloudflare Free 的 DNS proxy + Redirect Rules 即可。網域註冊商仍留在 HiNet，不轉移網域註冊。

## 切換前公開 DNS 讀回

這是公開 DNS readback，不等於 HiNet 後台完整匯出。切 nameserver 前仍需在 HiNet 後台再看一次是否有未公開、遺漏或新加的 MX / TXT / 驗證紀錄。

| 名稱 | 類型 | 值 | TTL |
| --- | --- | --- | --- |
| `observe888.com` | NS | `admns1.hinet.net` | 3600 |
| `observe888.com` | NS | `admns2.hinet.net` | 3600 |
| `observe888.com` | A | `185.199.108.153` | 86400 |
| `observe888.com` | A | `185.199.109.153` | 86400 |
| `observe888.com` | A | `185.199.110.153` | 86400 |
| `observe888.com` | A | `185.199.111.153` | 86400 |
| `www.observe888.com` | CNAME | `paul800901.github.io` | 86400 |

公開讀回未看到：

- apex `MX`
- apex `TXT`
- apex `AAAA`
- `_github-pages-challenge-paul800901.observe888.com` TXT
- `google3b9430423206dc2c.observe888.com` TXT
- `DS` / DNSSEC delegation

## Cloudflare Free 建置步驟

1. Cloudflare 新增網站 `observe888.com`，方案選 Free。
2. 不轉移 registrar；HiNet 只負責最後把 nameserver 改成 Cloudflare 給的兩組 nameserver。
3. Cloudflare DNS 先建立或確認下列紀錄：

| 名稱 | 類型 | 內容 | Proxy |
| --- | --- | --- | --- |
| `@` | A | `185.199.108.153` | Proxied |
| `@` | A | `185.199.109.153` | Proxied |
| `@` | A | `185.199.110.153` | Proxied |
| `@` | A | `185.199.111.153` | Proxied |
| `www` | CNAME | `paul800901.github.io` | Proxied |

4. 如果 HiNet 後台有 MX / TXT / SPF / DKIM / DMARC / Google 驗證紀錄，必須一併搬到 Cloudflare。
5. Cloudflare SSL/TLS 建議先用 `Full (strict)`；不要用 `Flexible`，避免 HTTPS redirect loop。
6. 建好 DNS 與 Redirect Rules 後，切 nameserver 前停下確認。

## 2026-05-19 Cloudflare 已完成項目

- Cloudflare zone 已建立，方案為 Free。
- Cloudflare 指派 nameserver：
  - `nico.ns.cloudflare.com`
  - `rosa.ns.cloudflare.com`
- DNS 自動匯入並讀回 5 筆，全部為 Proxied：
  - `@` A `185.199.108.153`
  - `@` A `185.199.109.153`
  - `@` A `185.199.110.153`
  - `@` A `185.199.111.153`
  - `www` CNAME `paul800901.github.io`
- AI crawler 設定：`Do not block (allow crawlers)`；`Instruct AI bot traffic with robots.txt` 已關閉，避免覆蓋官網既有 SEO / GEO / AEO 設計。
- SSL/TLS encryption mode 已從 `Full` 改成 `Full (strict)`。
- HiNet nameserver 已改成 Cloudflare：
  - `nico.ns.cloudflare.com`
  - `rosa.ns.cloudflare.com`
- Cloudflare 總覽目前仍顯示 `Waiting for your registrar to propagate your new nameservers`；已按過 `Check nameservers now`。

## 2026-05-19 18:45 切換後讀回

- HiNet 後台 DNS 名稱伺服器欄位已讀回：
  - `nico.ns.cloudflare.com`
  - `rosa.ns.cloudflare.com`
- 公開 NS：
  - `1.1.1.1` 已回 `nico.ns.cloudflare.com` / `rosa.ns.cloudflare.com`
  - `8.8.8.8` 已回 `nico.ns.cloudflare.com` / `rosa.ns.cloudflare.com`
- `1.1.1.1` 與 `8.8.8.8` 查 `www.observe888.com` / `observe888.com` 已回 Cloudflare proxy IP。
- 本機預設 DNS / ISP cache 仍可能短暫回 GitHub Pages 舊紀錄；這是傳播快取，不是設定未儲存。
- Cloudflare HTTPS 邊緣已可回應 `https://www.observe888.com/` `200 OK`，server 為 `cloudflare`。
- 以下 8 條舊 URL 已用 Cloudflare proxy IP 驗證為 `301` 且 `Location` 正確：
  - `/products/car.php` -> `/services/tainan-tuina/`
  - `/paper/other_page.php?id=11272` -> `/about/`
  - `/paper/other_page.php?id=11276` -> `/visit/`
  - `/paper/other_select_index.php?id=3718&title_id=11271&group_id=874` -> `/north/pricing/`
  - `/paper/other_select_index.php?title_id=11271&group_id=874` -> `/visit/`
  - `/album/index.php?title_id=11273` -> `/notes/`
  - `/news/index.php` -> `/notes/`
  - `/paper/promotions_index.php` -> `/visit/`
- 2026-05-19 19:10 已用正式網址、不指定 IP 重測上述 8 條，全部由 Cloudflare 回 `301` 且 `Location` 正確；首頁、`robots.txt`、`sitemap.xml` 皆回 `200`，apex `https://observe888.com/` 回 `301` 到 `https://www.observe888.com/`。
- 本機一度仍以快取連到 GitHub Pages / Fastly 舊 IP；清除本機 DNS cache 後，正式網址已回 Cloudflare。若其他工作站短暫讀到 404，先確認 DNS cache 是否仍在舊 GitHub Pages IP。

## Redirect Rules 已部署

使用 Cloudflare Rules > Redirect Rules > Single Redirects。Free 方案顯示 10 條 Single Redirects 額度，本輪已部署 8 條。`/paper/*` broad fallback 暫不部署，避免與精準規則發生覆蓋；若切換後仍有大量其他 `/paper/` 舊 URL 曝光，再另外補一條不重疊的規則或改用 Worker。

Query string 目前不保留，避免新版頁面出現舊的 `id` / `title_id` / `group_id` 參數。若未來需要保留 `gclid` / `utm_*` 但丟掉舊 PHP 參數，需改用更進階的 Worker 或等效 proxy 邏輯。

| Rule name | Wildcard pattern | Target | Status | Preserve query |
| --- | --- | --- | --- | --- |
| `legacy-products-car` | `https://www.observe888.com/products/car.php*` | `https://www.observe888.com/services/tainan-tuina/` | 301 | Off |
| `legacy-album-to-notes` | `https://www.observe888.com/album*` | `https://www.observe888.com/notes/` | 301 | Off |
| `legacy-news-to-notes` | `https://www.observe888.com/news*` | `https://www.observe888.com/notes/` | 301 | Off |
| `legacy-promotions-to-visit` | `https://www.observe888.com/paper/promotions_index.php*` | `https://www.observe888.com/visit/` | 301 | Off |
| `legacy-other-page-11272` | `https://www.observe888.com/paper/other_page.php?id=11272*` | `https://www.observe888.com/about/` | 301 | Off |
| `legacy-other-page-11276` | `https://www.observe888.com/paper/other_page.php?id=11276*` | `https://www.observe888.com/visit/` | 301 | Off |
| `legacy-other-select-3718` | `https://www.observe888.com/paper/other_select_index.php?id=3718*` | `https://www.observe888.com/south/pricing/` | 301 | Off |
| `legacy-other-select-title` | `https://www.observe888.com/paper/other_select_index.php?title_id=11271*` | `https://www.observe888.com/visit/` | 301 | Off |

## 2026-05-21 Search Console 404 通知讀回

2026-05-21 收到 Search Console `找不到網頁 (404)` 新原因通知後，重新讀回正式站：

- `sitemap.xml` 內 35 個正式 URL 全部回 `200`。
- 首頁、`robots.txt`、`sitemap.xml` 皆由 Cloudflare 回 `200`。
- Google 公開搜尋仍可見舊 PHP 結果；多數已被既有 Cloudflare 規則轉成 `301`。
- 兩個可對上公開搜尋舊結果的漏網 URL 仍回 `404`：
  - `https://www.observe888.com/index.php`
  - `https://www.observe888.com/paper/other_select_index.php?group_id=874&title_id=11271`
- `.env.redirect.local` 只保留 Cloudflare 欄位，沒有可用 API token；本輪未直接修改 Cloudflare 規則。
- 不用 repo 端補 `.php` 靜態 fallback；GitHub Pages 不支援 PHP 或 server-side redirect，舊 `.php` URL 應在 Cloudflare 做 `301`。

Wrangler OAuth 預設授權沒有 Rulesets 寫入權限，但有 Workers 與 route 寫入權限；因此已部署最小 Worker `observe888-legacy-redirects`，只掛兩條 route：

| Route pattern | Worker | 行為 |
| --- | --- | --- |
| `www.observe888.com/index.php*` | `observe888-legacy-redirects` | `301` 到 `https://www.observe888.com/` |
| `www.observe888.com/paper/other_select_index.php*` | `observe888-legacy-redirects` | `id=3718` 時 `301` 到 `/south/pricing/`，其他 query `301` 到 `/visit/` |

Worker 原始碼保存在 `cloudflare/observe888-legacy-redirects.js`。2026-05-21 live readback：

| Readback item | URL | Target | Status | Preserve query |
| --- | --- | --- | --- | --- |
| `legacy-root-index` | `https://www.observe888.com/index.php*` | `https://www.observe888.com/` | 301 | Off |
| `legacy-other-select-group-title` | `https://www.observe888.com/paper/other_select_index.php?group_id=874&title_id=11271*` | `https://www.observe888.com/visit/` | 301 | Off |
| `legacy-other-select-3718` | `https://www.observe888.com/paper/other_select_index.php?id=3718&title_id=11271&group_id=874` | `https://www.observe888.com/south/pricing/` | 301 | Off |

## 切換驗收

nameserver 切到 Cloudflare 後，至少驗證：

| URL | 預期 |
| --- | --- |
| `https://www.observe888.com/` | 200 |
| `https://observe888.com/` | 正常進站或轉到 `https://www.observe888.com/` |
| `https://www.observe888.com/robots.txt` | 200 |
| `https://www.observe888.com/sitemap.xml` | 200 |
| `https://www.observe888.com/paper/other_page.php?id=11272` | 301 -> `/about/` |
| `https://www.observe888.com/paper/other_select_index.php?id=3718&title_id=11271&group_id=874` | 301 -> `/south/pricing/` |
| `https://www.observe888.com/paper/other_select_index.php?title_id=11271&group_id=874` | 301 -> `/visit/` |
| `https://www.observe888.com/products/car.php` | 301 -> `/services/tainan-tuina/` |
| `https://www.observe888.com/album/index.php?title_id=11273` | 301 -> `/notes/` |
| `https://www.observe888.com/news/index.php` | 301 -> `/notes/` |
| `https://www.observe888.com/paper/promotions_index.php` | 301 -> `/visit/` |

## Rollback

如果切換後官網或 HTTPS 異常，先不要改網站檔案。回 HiNet 把 nameserver 改回：

- `admns1.hinet.net`
- `admns2.hinet.net`

回復後重新讀回首頁、`robots.txt`、`sitemap.xml` 與舊 URL 狀態。
