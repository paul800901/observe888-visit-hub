# Search Console / GBP 後台讀回 - 2026-06-25

讀回時間：2026-06-25 01:10-01:16（Asia/Taipei）。

本文件記錄 2026-06-24 首頁與子頁調整後，Search Console 與 Google Business Profile 後台的只讀驗證。本輪沒有修改 Google Business Profile 欄位、沒有按 Search Console `要求建立索引`、沒有做無痕 Google Search / Maps 排名驗收。

## 已讀依據

- `README.md`
- `docs/website-operations.md`
- `docs/search-console-gbp-readback-2026-05-27.md`
- `docs/search-entry-repair-action-2026-06-07.md`
- Google Search Console live UI
- Google Business Profile manager / Google 搜尋管理者面板 live UI

Chrome profile：`見觀結構整復所`。

Search Console 帳號畫面：`見觀結構整復所 (observe88888@gmail.com)`。

## Search Console 概覽

資源：`https://www.observe888.com/`

| 項目 | 讀回 |
| --- | ---: |
| 網頁搜尋總點擊次數 | 451 |
| 沒有編入索引的網頁 | 57 |
| 已編入索引的網頁 | 23 |
| Core Web Vitals 行動裝置良好 | 16 |
| HTTPS 有效 | 15 |
| 導覽標記有效 | 6 |

Search Console 建議區顯示：

- `https://www.observe888.com/south/pricing/`
- 最近曝光次數比平常多，顯示 `+1,103%`。

## URL 檢查結果

| URL | Google 索引狀態 | 即時測試 | 補充 |
| --- | --- | --- | --- |
| `https://www.observe888.com/about/` | 網址在 Google 服務中；網頁已編入索引 | 未另跑即時測試 | HTTPS 有效 |
| `https://www.observe888.com/contact/` | 網址在 Google 服務中；網頁已編入索引 | 未另跑即時測試 | HTTPS 有效 |
| `https://www.observe888.com/south/` | 網址在 Google 服務中；網頁已編入索引 | 未另跑即時測試 | HTTPS 有效 |
| `https://www.observe888.com/east/` | 網址不在 Google 服務中；網頁未編入索引：已找到 - 目前尚未建立索引 | Google 可為網址建立索引；網頁可編入索引 | 發現方式：Sitemap `https://www.observe888.com/sitemap.xml`；參照網頁：`https://www.observe888.com/`；即時測試時間：2026-06-25 01:15 |
| `https://www.observe888.com/services/tainan-tuina/` | 網址不在 Google 服務中；網頁未編入索引：已檢索 - 目前尚未建立索引 | Google 可為網址建立索引；網頁可編入索引 | 發現方式：Sitemap；參照網頁：`https://www.observe888.com/`；上次檢索：2026-05-22 20:30:24；檢索代理程式：Googlebot 智慧型手機；允許檢索：是；擷取：成功；允許編入索引：是；使用者宣告 canonical 為本 URL；Google 所選 canonical 為受檢測網址；即時測試時間：2026-06-25 01:14 |

判斷：

- `/about/`、`/contact/`、`/south/` 已在 Google 索引中。
- `/east/` 與 `/services/tainan-tuina/` 目前不是技術阻擋；即時測試都顯示 Google 可建立索引、網頁可編入索引。
- `/east/` 是 `已找到 - 目前尚未建立索引`，表示 Google 尚未檢索或正式處理。
- `/services/tainan-tuina/` 仍是 `已檢索 - 目前尚未建立索引`，延續 2026-05-27 / 2026-06-07 的問題：可抓、可索引，但尚未被 Google 收入正式索引。

本輪未按 `要求建立索引`。若要送出索引要求，需要另行授權，避免把只讀驗證混成 live action。

## GBP 管理清單

入口：`https://business.google.com/locations`

讀回：

- 顯示 `2 個商家`。
- 顯示 `100% 已完成驗證`。
- `全部 (2)`、`已驗證 (2)`。
- 仍顯示 `Google 資訊更新 (2)`。
- 仍顯示 `缺少商家代碼 (1)`。

| 店別 | 讀回名稱 | 地址 | 狀態 | 商家代碼 |
| --- | --- | --- | --- | --- |
| 北區 | 見觀結構調理整復所-北區店 | 704台南市北區華德里北安路一段 211 號 | 已驗證 | `07009373627673971071` |
| 南區 | 見觀結構調理整復所-南區店 | 702台南市南區明興路673號 | 已驗證 | 空白 |

## GBP 管理者面板讀回

本段來源是登入狀態的 Google 搜尋商家管理者面板，會混合公開結果、管理者可見資訊與 Google Ads 摘要。不可視為無痕 Maps 排名驗收。

### 南區店

- 顯示 `529 次客戶互動`。
- 顯示 `2 則新評論`。
- 顯示 `974 位使用者上個月在搜尋結果中查看了你的商家檔案`。
- 商家面板：`見觀結構調理整復所-南區店`。
- 評分 / 評論：`4.8`，`70 則 Google 評論`。
- 類別：`位於臺南的整脊師`。
- 地址：`702臺南市南區明興路673號`。
- 電話：`0973 728 670`。
- 網站按鈕實際連結：`https://www.observe888.com/visit/?store=south`。
- 產品和服務實際連結：`https://www.observe888.com/south/pricing/`。
- 預約區實際連結：`https://www.observe888.com/visit/?store=south`。
- 2026-05-19 貼文 CTA `瞭解詳情` 實際連結：`https://www.observe888.com/services/tainan-tuina/`。
- 產品可見：`工作室預約`、`傳統整復`、`單次預約 30 至 40 分鐘`、`$500.00`。
- 商家描述仍可見 `本站不提供醫療診斷或療效保證`。本輪只讀，未修改 GBP 描述。

### 北區店

- 顯示 `1,011 次客戶互動`。
- 顯示 `1 顆星評論` 提醒。
- 顯示 `1507 次` 上月商家檔案觀看相關建議。
- 商家面板：`見觀結構調理整復所-北區店`。
- 評分 / 評論：`4.9`，`126 則 Google 評論`。
- 類別：`位於臺南的整脊師`。
- 地址：`704臺南市北區華德里北安路一段211 號`。
- 電話：`06 251 0677`。
- 網站按鈕實際連結：`https://www.observe888.com/visit/?store=north`。
- 產品和服務實際連結：`https://www.observe888.com/north/pricing/`。
- 預約區實際連結：`https://www.observe888.com/visit/?store=north`。
- 2026-05-19 貼文 CTA `瞭解詳情` 實際連結：`https://www.observe888.com/services/tainan-tuina/`。
- 產品可見：`單一部位評估調理`、`全身結構評估調理+客製化功能性訓練`、`貼紮服務`、`全身結構評估調理+姿態訓練`。
- 商家描述仍可見 `本站不提供醫療診斷或療效...`。本輪只讀，未修改 GBP 描述。

## 未完成或限制

- 沒有按 Search Console `要求建立索引`。
- 沒有接受、拒絕或確認 GBP 的 `Google 資訊更新 (2)`。
- 沒有修改 GBP 欄位、服務、產品、貼文、照片、地址、電話、網站、預約連結、營業時間或商家代碼。
- 沒有做無痕 Google Search / Maps 排名讀回，不能用本文件宣稱 Maps 自然排名改善。
- Google 搜尋結果區仍可見舊第三方與舊 URL 片段，例如 Workband 與部分舊 `news/index.php` 結果；這是公開搜尋結果與第三方/舊 URL 清理問題，不等同 GBP 後台欄位錯誤。

## 下一步

1. 若要推動 `/east/` 與 `/services/tainan-tuina/` 收錄，可在使用者明確授權後，分別按 `要求建立索引`。
2. 若要讓 GBP 描述也符合 2026-06-24 內容語氣規則，需要另開一輪 GBP 文案修改；本輪只讀，沒有改後台。
3. `Google 資訊更新 (2)` 與南區 `缺少商家代碼 (1)` 仍未處理；若要處理，需先決定是否接受 Google 建議、是否填南區商家代碼，以及代碼命名規則。
