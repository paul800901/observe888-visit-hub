# ObserveGeoPages 交接

最後更新：2026-05-13

## 先讀什麼

1. `PROJECT_CONTEXT.md`
2. `docs/website-operations.md`
3. `README.md`

## 現在這個工作目錄是什麼

這裡是見觀結構正式官網與網站營運資料主專案。網站、到店導航、北區 / 南區店點資料、Google 商家檔案一致性、地圖資料、FAQ、GEO / AEO 與公開內容安全邊界，都以這裡為主。

舊分工「AdsControl 是到店導航官網 source、ObserveGeoPages 是品牌與文章官網」已作廢。AdsControl 仍可做廣告、事件匯入、lead sync、監測與報表，但不再主控官網頁面。

## 目前結構

- `index.html`：正式官網首頁。
- `visit/index.html`：到店導航入口。
- `north/index.html`、`south/index.html`：店點頁。
- `north/pricing/index.html`、`south/pricing/index.html`：服務與費用 / 預約說明。
- `about/index.html`：品牌介紹。
- `notes/index.html`：身體觀察筆記分類入口。
- `notes/search-terms-overview/index.html`：檢查名詞與搜尋問法分類入口。
- `notes/*/index.html`：公開文章頁。
- `docs/website-operations.md`：Google 商家、地圖、FAQ、GEO / AEO 與驗證規格。
- `llms.txt`：AI / 答案引擎補充導覽。
- `assets/gmb/`：Google 商家可用圖片素材。

## 2026-05-13 已校正

- 專案定位改成正式官網總控，不再只是品牌與文章官網。
- 到店導航 `visit/`、北區 / 南區店點頁與服務頁改由本專案主控。
- Google 商家檔案、地圖一致性、FAQ、GEO / AEO 與服務邊界納入本專案責任。
- 新增 `docs/website-operations.md` 作為網站營運規格與檢查清單。
- AdsControl 舊 public bundle 產線改成 legacy 防呆，不再預設可產出官網 bundle。

## 後續工作方向

- 補 Google 商家檔案 live 回讀紀錄：名稱、分類、服務項目、描述、照片、網站 URL。
- 補北區與南區照片素材盤點。
- 補 FAQ 頁或 FAQ 區塊，優先回答第一次來、北區 / 南區怎麼選、費用、導航、服務邊界。
- 新增文章前，先做安全化與最終潤色，再補進分類入口、`sitemap.xml`、`llms.txt`。
- 若改店點資料，同步檢查 `index.html`、`visit/`、`north/`、`south/`、widget、JSON-LD、`llms.txt`。

## 不能做的事

- 不要把 AdsControl 的 `frontend/observe888-public` 或舊 build 輸出覆蓋回本專案。
- 不要把 `notes/` 退回完整文章清單；第一層維持分類入口。
- 不要把搜尋問法寫成治療承諾、醫療診斷或保證改善。
- 不要只改本地檔案就宣稱 Google 商家 live 已完成；商家後台資料必須回讀驗證。
