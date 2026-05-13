# ObserveGeoPages 正式官網總控

這個專案是見觀結構正式官網與網站營運資料的 source of truth。

`AdsControl` 現在只保留廣告、追蹤事件匯入、lead sync、報表與監測警示；不得再作為官網頁面、Google 商家檔案、地圖資料或 GEO / AEO 內容的主 source。

## 專案主責

- 正式官網頁面與公開內容：首頁、品牌頁、到店導航、北區 / 南區店點頁、服務與費用、身體觀察筆記。
- Google 商家檔案資料一致性：店名、地址、電話、網站 URL、服務項目、商家描述、照片素材與地圖入口。
- 搜尋與答案引擎可讀內容：`sitemap.xml`、`robots.txt`、`llms.txt`、FAQ、品牌說明、服務邊界、到店資訊。
- 公開內容安全邊界：可以整理身體觀察線索與搜尋問法，不寫醫療保證、治療承諾或根因確診。

## 目前結構

- `index.html`：正式官網首頁。
- `visit/index.html`：到店導航入口，承接北區 / 南區選店、LINE、電話、地圖。
- `north/index.html`、`south/index.html`：北區店與南區工作室店點資料頁。
- `north/pricing/index.html`、`south/pricing/index.html`：服務與費用 / 預約說明。
- `about/index.html`：品牌與服務方式說明。
- `notes/index.html`：身體觀察筆記分類入口。
- `notes/*/index.html`：公開文章與分類頁。
- `assets/gmb/`：Google 商家檔案與地圖曝光可用的公開圖片素材。
- `docs/website-operations.md`：網站營運、Google 商家一致性、GEO / AEO 與驗證清單。
- `llms.txt`：AI / 答案引擎補充導覽。
- `sitemap.xml`、`robots.txt`：搜尋引擎索引設定。

## 與 AdsControl 的邊界

`AdsControl` 可以繼續讀取官網事件並同步 `observe888_public` 的 LINE / 電話 / 地圖弱訊號，但不主控官網內容。

下列工作應在本專案處理：

- 修改正式官網頁面、文案、結構化資料、站內導覽。
- 調整 `visit/`、北區 / 南區店點頁、費用頁、Google Maps 入口。
- 維護 Google 商家檔案資料與官網一致性。
- 新增或修改 FAQ、品牌說明、GEO / AEO 內容。
- 更新 `sitemap.xml`、`robots.txt`、`llms.txt`。

下列工作留在 `AdsControl`：

- Google Ads API 同步、廣告提案、投放監測。
- 公開站事件匯入與 lead sync。
- 報表、告警、LINE / 電話 / 地圖弱訊號分析。

## 先讀

1. `PROJECT_CONTEXT.md`
2. `docs/website-operations.md`
3. `HANDOFF.md`

## 目前狀態

- `www.observe888.com` 已由本專案承接正式官網內容。
- `visit/`、`north/`、`south/` 已是正式官網內的到店與店點入口。
- `notes/` 維持分類優先，不退回完整文章清單。
- AdsControl 舊的公開 bundle 產線已視為 legacy，只能在明確需要比對舊資料時使用。
