# 搜尋入口修復動作紀錄 - 2026-06-07

本文記錄 `docs/search-console-entry-repair-readback-2026-06-07.md` 之後的第一輪修復動作。本文不是排名改善宣稱。

## 本輪處理範圍

- URL inspection：`https://www.observe888.com/services/tainan-tuina/`
- 公開頁微調：首頁、服務頁、sitemap
- 未處理：Google Business Profile、廣告、第三方名錄、其他文章頁

## Search Console URL inspection

2026-06-07 以 Chrome profile `見觀結構整復所` 進入 Search Console，檢查 `https://www.observe888.com/services/tainan-tuina/`。

讀回結果：

- 狀態：網址不在 Google 服務中
- 網頁索引狀態：網頁未編入索引：已檢索 - 目前尚未建立索引
- 發現方式：Sitemap `https://www.observe888.com/sitemap.xml`
- 參照網頁：`https://www.observe888.com/`
- 上次檢索時間：2026年5月22日 晚上8:30:24
- 檢索代理程式：Googlebot 智慧型手機
- 是否允許檢索：是
- 網頁擷取狀態：成功
- 是否允許編入索引：是
- 使用者宣告的標準網址：`https://www.observe888.com/services/tainan-tuina/`

已送出：

- Search Console `要求建立索引`
- GSC 回覆：已要求建立索引，已將網址加入優先檢索佇列

## 公開頁修復

本輪只做小幅、可回測的搜尋入口校準：

1. 服務頁 title / description 從單一 `台南整復推拿推薦`，擴到 GSC 高曝光低 CTR 的 `台南整復推薦`、`台南整骨推薦`。
2. 服務頁仍保留服務安全語言：`身體結構評估`、`身體結構觀察`、`傳統整復推拿`、`姿勢與承重線索整理`。
3. 服務頁新增「推薦型搜尋先看清楚度」，用服務邊界、店別、費用、預約方式、生活情境整理來承接推薦型搜尋，不寫保證式說法。
4. 首頁 hero CTA 內鏈文字改為 `台南整復、整骨推薦怎麼看`，讓首頁對服務頁的內鏈語意更清楚。
5. `sitemap.xml` 更新首頁與服務頁 `lastmod` 為 2026-06-07。

## 舊 URL 讀回

本輪用 `curl.exe -I` 讀回 GSC 高曝光舊 URL：

- `/paper/other_select_index.php?id=3718...`：301 到 `/north/pricing/`
- `/paper/other_page.php?id=11272`：301 到 `/about/`
- `/paper/other_page.php?id=11276`：301 到 `/visit/`
- `/products/car.php`：301 到 `/services/tainan-tuina/`
- `/album/index.php?title_id=11273`：301 到 `/notes/`
- `/album/info.php?id=6455...`：301 到 `/notes/`
- `/news/index.php?group_id=5518...`：301 到 `/notes/`
- `/paper/promotions_index.php?id=6453...`：301 到 `/visit/`

結論：這批舊 URL 目前不是 404，已由 live Cloudflare redirect 承接；本輪不再新增 redirect 規則。

## 回測口徑

下次 GSC 匯出後看：

1. `/services/tainan-tuina/` 是否進入 `網頁.csv`。
2. `台南整復推薦`、`台南整骨推薦`、`台南整復推拿推薦` 是否有 CTR 改善。
3. 舊 `.php` URL 曝光是否逐步下降。
4. 首頁是否仍過度吃掉服務型查詢。

