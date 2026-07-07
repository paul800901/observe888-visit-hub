> status: current
> decided: 2026-07-07
> superseded_by: none
> note: Current repo entry for ObserveGeoPages website scope, boundaries, and primary file routing.

# ObserveGeoPages 正式官網總控

這個專案是見觀結構正式官網與網站營運資料的 source of truth。

`AdsControl` 現在只保留廣告、追蹤事件匯入、lead sync、報表與監測警示；不得再作為官網頁面、Google 商家檔案、地圖資料或 GEO / AEO 內容的主 source。

## 專案主責

- 正式官網頁面與公開內容：首頁、品牌頁、到店導航、南區店、東區工作室、服務與費用、身體觀察筆記、短影音回流入口。
- Google 商家檔案資料一致性：店名、地址、電話、網站 URL、服務項目、商家描述、照片素材與地圖入口。
- 搜尋與答案引擎可讀內容：`sitemap.xml`、`robots.txt`、`llms.txt`、FAQ、品牌說明、服務邊界、到店資訊。
- 公開內容安全邊界：品牌主張不寫醫療保證、治療承諾或根因確診；若為匿名患者或故事角色的主觀感受，可保留前後感受差異或個人回饋，但不可寫成見觀官方保證、普遍結果或可識別個案。

## 目前結構

- `index.html`：正式官網首頁。
- `booking/index.html`：預約入口，主入口先導到官方 LINE；使用者進入 LINE 後再按「我要預約」開啟 LIFF 預約表單。電話保留為快速確認，Google Calendar 預約頁作為 LINE 無法開啟時的備用入口。
- `visit/index.html`：到店導航入口，承接南區 / 東區選店、LINE、電話、地圖。
- `south/index.html`、`east/index.html`：南區店與東區工作室店點資料頁。
- `south/pricing/index.html`：南區服務與費用 / 預約說明。
- `north/index.html`、`north/pricing/index.html`：北區退場後保留的舊入口 fallback；正式對外應由 Cloudflare 301 直接導到 `/visit/` 與 `/south/pricing/`。
- `about/index.html`：品牌與服務方式說明。
- `shorts/index.html`：FB、IG、YouTube Shorts 短影音回到官網的預約、費用、導航與服務分流入口。
- `notes/index.html`：身體觀察筆記分類入口。
- `notes/*/index.html`：公開文章與分類頁。
- `docs/SOCIAL_SHORT_VIDEO_FUNNEL_2026-06-23.md`：短影音與文章發布時的官網回流規則。
- `docs/cta-tracking-events-2026-06-28.md`：官網 LINE / 電話 / 地圖 / 預約 / 表單 / 導航 CTA 事件追蹤與 AdsControl 匯入規則。
- `assets/gmb/`：Google 商家檔案與地圖曝光可用的公開圖片素材。
- `docs/website-operations.md`：網站營運、Google 商家一致性、GEO / AEO 與驗證清單。
- `llms.txt`：AI / 答案引擎補充導覽。
- `sitemap.xml`、`robots.txt`：搜尋引擎索引設定。

## 與 AdsControl 的邊界

`AdsControl` 可以繼續讀取官網事件並同步 `observe888_public` 的 LINE / 電話 / 地圖 / 預約 / 表單 / 導航弱訊號，但不主控官網內容。

下列工作應在本專案處理：

- 修改正式官網頁面、文案、結構化資料、站內導覽。
- 調整 `visit/`、南區 / 東區店點頁、費用頁、Google Maps 入口。
- 維護 Google 商家檔案資料與官網一致性。
- 新增或修改 FAQ、品牌說明、GEO / AEO 內容。
- 更新 `sitemap.xml`、`robots.txt`、`llms.txt`。

下列工作留在 `AdsControl`：

- Google Ads API 同步、廣告提案、投放監測。
- 公開站事件匯入與 lead sync。
- 報表、告警、LINE / 電話 / 地圖 / 預約 / 表單 / 導航弱訊號分析。

## 先讀

1. `PROJECT_CONTEXT.md`
2. `docs/website-operations.md`
3. `HANDOFF.md`

## 目前狀態

- `www.observe888.com` 已由本專案承接正式官網內容。
- `visit/`、`south/`、`east/` 是目前正式官網內的到店與店點入口；`north/` 與 `north/pricing/` 只作為退場舊入口，不再當成正式目標頁。
- `notes/` 維持分類優先，不退回完整文章清單。
- AdsControl 舊的公開 bundle 產線已視為 legacy，只能在明確需要比對舊資料時使用。
