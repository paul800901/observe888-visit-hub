# Search Console / GBP 後台讀回 - 2026-05-27

讀回時間：2026-05-27 20:20-20:35（Asia/Taipei）。

本文件記錄本輪針對 Search Console 索引狀態與 Google Business Profile 後台 / 管理者面板的只讀驗證。這不是無痕 Google 排名驗收；Search Console 與 GBP 後台必須使用已登入 Google 帳號讀回。

## 已讀依據

- `README.md`
- `docs/website-operations.md`
- `docs/search-console-performance-readback-2026-05-19.md`
- `docs/search-console-serp-followup-2026-05-20.md`
- `docs/google-business-readback-2026-05-19.md`
- `docs/gbp-keyword-coverage-draft-2026-05-19.md`
- `docs/google-business-photo-refresh-2026-05-20.md`
- Google Search Console live UI
- Google Business Profile manager / Google 搜尋管理者面板 live UI

## Search Console 總覽

資源：`https://www.observe888.com/`

帳號畫面：`見觀結構整復所 (observe88888@gmail.com)`。

概述頁讀回：

| 項目 | 讀回 |
| --- | ---: |
| 網頁搜尋總點擊次數 | 451 |
| 沒有編入索引的網頁 | 44 |
| 已編入索引的網頁 | 33 |
| Core Web Vitals 行動裝置良好 | 12 |
| HTTPS 有效 | 16 |
| 導覽標記有效 | 6 |

## URL 檢查結果

| URL | Google 索引狀態 | 即時測試 | 補充 |
| --- | --- | --- | --- |
| `https://www.observe888.com/services/tainan-tuina/` | 不在 Google 服務中；網頁未編入索引：已檢索 - 目前尚未建立索引 | Google 可為網址建立索引；網頁可編入索引 | 上次檢索：2026-05-22 20:30:24；Googlebot 智慧型手機；允許檢索：是；擷取：成功；允許編入索引：是；使用者宣告 canonical 為本 URL；即時測試偵測到 1 個有效 FAQ 項目 |
| `https://www.observe888.com/faq/` | 網址在 Google 服務中；網頁已編入索引 | 未另跑即時測試 | HTTPS 有效；偵測到 1 個有效 FAQ 項目 |
| `https://www.observe888.com/south/` | 網址在 Google 服務中；網頁已編入索引 | 未另跑即時測試 | HTTPS 有效 |

判斷：

- `/services/tainan-tuina/` 目前最大問題不是 robots、fetch、index allowed 或 canonical 擋住，而是 Google 尚未把已檢索頁收進正式索引。
- `/services/tainan-tuina/` 的即時測試可通過，代表目前 live URL 可被 Google 建立索引；但本輪沒有按 `要求建立索引`。
- `/faq/` 與 `/south/` 已在 Google 索引中。

## GBP 管理清單

入口：`https://business.google.com/locations`

讀回：

- 顯示 `2 個商家`。
- 顯示 `100% 已完成驗證`。
- `全部 (2)`、`已驗證 (2)`。
- 仍顯示 `Google 資訊更新 (2)`。
- 仍顯示 `缺少商家代碼 (1)`。

| 店別 | 讀回名稱 | 地址 | 狀態 |
| --- | --- | --- | --- |
| 北區 | 見觀結構調理整復所-北區店 | 704台南市北區華德里北安路一段 211 號 | 已驗證 |
| 南區 | 見觀結構調理整復所-南區店 | 702台南市南區明興路673號 | 已驗證 |

## GBP 管理者面板讀回

本段來源是登入狀態的 Google 搜尋商家管理者面板，會混合公開結果、管理者可見資訊與 Google Ads 摘要。不可視為無痕 Maps 排名驗收。

### 北區店

- 顯示 `你的商家在 Google 上的資訊`。
- 顯示 `1,086 次客戶互動`。
- 顯示 `2 則新評論`。
- 顯示每月 `935` 次觀看量相關建議。
- 商家面板：`見觀結構調理整復所-北區店`。
- 評分 / 評論：`4.9`，`127 則 Google 評論`。
- 類別：`位於臺南的整脊師`。
- 地址：`704臺南市北區華德里北安路一段211 號`。
- 電話：`06 251 0677`。
- 網站按鈕讀到連結：`https://www.observe888.com/visit/?store=north`。
- 產品和服務區讀到 `observe888.com`，連結含 `https://www.observe888.com/north/pricing/`。
- 面板文字顯示 `預約: observe888.com`。
- 產品可見：`單一部位評估調理`、`全身結構評估調理+客製化功能性訓練`、`貼紮服務`、`全身結構評估調理+姿態訓練`。
- 2026-05-19 服務頁導流貼文可見，摘要開頭為 `正在搜尋台南整復推拿或台南整骨推薦時...`。
- 商家描述可見，內容含 `傳統整復推拿`、`身體結構評估`、`結構調理`、`徒手調理`、`運動按摩`、`肌筋膜放鬆`、`筋膜刀`、`刮痧`、`拔罐`、`指壓`、`經絡調理`、`肩頸按摩`、`台南推拿`、`台南按摩`、`台南整復推拿`、`台南整骨`、`台南喬骨`、`台南筋膜放鬆`、`北區整復推拿`，並保留 `不提供醫療診斷或療效保證`。

### 南區店

- 顯示 `你的商家在 Google 上的資訊`。
- 顯示 `542 次客戶互動`。
- 顯示每月 `962` 次觀看量相關建議。
- 商家面板：`見觀結構調理整復所-南區店`。
- 評分 / 評論：`4.8`，`68 則 Google 評論`。
- 類別：`位於臺南的整脊師`。
- 地址：`702臺南市南區明興路673號`。
- 電話：`0973 728 670`。
- 網站按鈕讀到連結：`https://www.observe888.com/visit/?store=south`。
- 產品和服務區讀到 `observe888.com`，連結含 `https://www.observe888.com/south/pricing/`。
- 預約區讀到 `observe888.com`，連結含 `https://www.observe888.com/visit/?store=south`。
- 產品可見：`工作室預約`、`傳統整復`、`單次預約 30 至 40 分鐘`、`$500.00`。
- 2026-05-19 服務頁導流貼文可見，CTA `瞭解詳情` 讀到 `https://www.observe888.com/services/tainan-tuina/`。
- 商家描述完整可見，內容含 `傳統整復推拿`、`身體結構評估`、`結構調理`、`徒手調理`、`運動按摩`、`肌筋膜放鬆`、`筋膜刀`、`刮痧`、`拔罐`、`指壓`、`經絡調理`、`肩頸按摩`、`台南推拿`、`台南按摩`、`台南整復推拿`、`台南整骨`、`台南喬骨`、`台南筋膜放鬆`、`南區整復推拿`，並保留 `不提供醫療診斷或療效保證`。

## 未完成或限制

- 本輪沒有按 Search Console 的 `要求建立索引`。
- 本輪沒有接受或拒絕 GBP 的 `Google 資訊更新 (2)`。
- 本輪沒有修改 GBP 欄位、服務、產品、貼文、照片、地址、電話、網站、預約連結或營業時間。
- `編輯服務` 入口可見，但本輪嘗試進入服務編輯視窗後，Chrome 可讀文字仍停留在商家管理者面板，未能獨立讀回分分類服務清單；分分類服務項目仍以 `docs/google-business-readback-2026-05-19.md` 的成功讀回為基準，待下一次可成功開啟服務編輯器時再補驗。
- 這不是無痕 Google Search / Maps 排名讀回，不能用來宣稱 Maps 自然排名改善。

## 下一步

1. 可人工或授權後在 Search Console 對 `/services/tainan-tuina/` 按 `要求建立索引`；本輪未操作。
2. 之後再回查 `/services/tainan-tuina/` 是否從 `已檢索 - 目前尚未建立索引` 轉為 `網址在 Google 服務中`。
3. GBP 若要查分分類服務項目，下一輪需成功開啟 `編輯服務` 視窗並逐分類讀回；未讀回前不宣稱本輪已驗證分分類服務清單。
4. Maps 自然排名仍要用無痕或未登入公開面另行驗收，不能用本文件的後台讀回代替。
