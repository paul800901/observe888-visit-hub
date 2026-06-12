# Search Console 索引清理紀錄 - 2026-06-12

本文記錄 2026-06-12 Search Console 信件通知後的清理判斷與修正範圍。本文不是排名改善宣稱。

## 信件來源

- 來源：Google Search Console Team
- 收件帳號：`observe88888@gmail.com`
- 時間：2026-06-12
- 主旨：有新的原因導致「https://www.observe888.com/」網站上的網頁無法建立索引
- 信件原因：替代頁面（有適當的標準標記）

## 判斷

這封信不是整站無法索引，也不是 robots.txt 阻擋或正式頁 404。

目前最可能來源是北區退場與舊站 URL 清理後，部分舊入口仍先落到中繼頁，再靠 `noindex`、canonical 或 meta refresh 指向最終頁。這會讓 Search Console 把它們歸類成「替代頁面（有適當的標準標記）」。

## 修正原則

後續不要再把舊入口導到已退場頁或中繼頁。

新的最終目標：

| 舊入口 | 最終目標 |
| --- | --- |
| `/north/`、`/north/index.html` | `/visit/` |
| `/north/pricing/`、`/north/pricing/index.html` | `/south/pricing/` |
| `/paper/other_select_index.php?id=3718...` | `/south/pricing/` |
| `/products/car.php` | `/services/tainan-tuina/` |
| `/album/*` | `/notes/` |
| `/news/*` | `/notes/` |
| `/observations/*` | `/notes/` |
| `/paper/other_page.php?id=11272...` | `/about/` |
| `/paper/other_page.php` 其他 | `/visit/` |
| `/paper/promotions_index.php*` | `/visit/` |
| `/paper/*` 其他 | `/notes/` |
| 其他 `.php` | `/visit/` |

## 本輪修改

- 更新 `cloudflare/observe888-legacy-redirects.js`，把舊入口集中成完整 server-side `301` 對照表。
- 更新 `404.html` fallback，讓 GitHub Pages 漏接時的 JS 導流也指到相同最終頁。
- 更新 `tools/analyze_gsc_export.py`，不再把 `/north/`、`/north/pricing/` 當成目標承接頁；未來 GSC 匯出中若仍出現北區退場頁，應視為退場 URL 殘留。
- 更新 `docs/cloudflare-redirect-migration-2026-05-19.md`，標記 2026-05-19 的 `/north/pricing/` 目標已被 2026-06-12 規則取代。

## 驗收口徑

Live 驗收至少要確認：

```text
https://www.observe888.com/north/ -> 301 -> https://www.observe888.com/visit/
https://www.observe888.com/north/pricing/ -> 301 -> https://www.observe888.com/south/pricing/
https://www.observe888.com/paper/other_select_index.php?id=3718&title_id=11271&group_id=874 -> 301 -> https://www.observe888.com/south/pricing/
https://www.observe888.com/products/car.php -> 301 -> https://www.observe888.com/services/tainan-tuina/
https://www.observe888.com/album/index.php?title_id=11273 -> 301 -> https://www.observe888.com/notes/
https://www.observe888.com/news/index.php?group_id=5518&title_id=11274 -> 301 -> https://www.observe888.com/notes/
```

Search Console 後續驗收：

1. 先看「替代頁面（有適當的標準標記）」中的受影響 URL 是否主要是退場頁或舊 URL。
2. 修正 live 301 後，等待 Google 重新檢索；不期待通知立刻消失。
3. 下一次 GSC 匯出時，觀察 `/north/`、`/north/pricing/`、舊 `.php` URL 曝光是否下降。

## 限制

Search Console 的歷史通知無法一勞永逸消失。能做的是讓公開站從現在開始回乾淨的 server-side `301`，減少 Google 再看到中繼頁、替代 canonical 頁或 JS 導流頁。
