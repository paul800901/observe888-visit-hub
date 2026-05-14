# ObserveGeoPages 交接

最後更新：2026-05-14

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

## 2026-05-14 已補

- 建立 `docs/google-business-backend-readback-2026-05-14.md`，作為 Google 商家後台編輯畫面逐欄讀回表。
- 建立 `docs/google-public-surface-readback-2026-05-14.md`，作為 Google 搜尋公開面、正式官網與舊 Boostime 站的公開讀回表。
- `docs/website-operations.md` 已校正南區目前正式入口：`D:\見觀營運資料夾\01_官網_ObserveGeoPages` 與 `D:\見觀營運資料夾\02_廣告_AdsControl`。
- 用登入狀態讀回 Google Business Profile 管理清單、商家面板、產品區、網站按鈕、`商家資訊` 詳細面板、相片工具、服務、產品與預訂對話框；未送出任何後台修改。
- 南北區 `1 筆 Google 資訊更新` 點開後只進入 `商家資訊` 詳細面板，沒有看到 `接受`、`拒絕` 或 `套用` 按鈕；目前仍視為未解決。
- 補 Google 商家後台可見盤點：北區相片工具可見封面、標誌、31 張相片與 1 支影片；南區可見封面、標誌、27 張相片；兩店服務對話框皆讀到 `結構評估`、`動作與姿勢觀察`、`徒手調理`。
- 補預訂欄位初始差異：北區原本自訂預訂網址是 LINE `https://line.me/ti/p/~@483yvmiw`；南區原本未讀到自訂連結。
- 店主已確認北區地址以新版行政區 `華德里` 為準，不回退 `成德里`。
- 預訂策略已校正並回讀正式網址：LINE 是共同聯絡端點，但 Google 商家 `預訂` 連結若要處理，應優先導到官方南北區分流頁 `https://www.observe888.com/visit/?store=north` / `https://www.observe888.com/visit/?store=south`，再由頁面承接 LINE、電話與地圖。
- 已回讀 Google Business 管理清單：北區地址顯示 `704台南市北區華德里北安路一段 211 號`。
- 已更新並回讀 Google 商家 `預訂` 連結：北區 `https://www.observe888.com/visit/?store=north`，南區 `https://www.observe888.com/visit/?store=south`。
- 已重查 Google 搜尋公開/管理混合面板：北區地址公開欄位已顯示 `華德里`，南北區 `網站` 按鈕已分別顯示 `https://www.observe888.com/visit/?store=north` / `https://www.observe888.com/visit/?store=south`；但北區公開面板的 `預約` 區塊仍可見舊 LINE `https://line.me/ti/p/~@483yvmiw`，且自然搜尋仍可見舊 Boostime 結果，不能宣稱公開面完全更新。
- 已做 2026-05-14 公開 HTTP 讀回：`https://www.observe888.com/`、`robots.txt`、`sitemap.xml`、Search Console 驗證檔與南北分流頁皆為 `200 OK`；正式官網 canonical 與頁面內容未讀到 Boostime 舊路徑。
- 舊站 `https://observe.boostime.me/` 仍回應 `200 OK`，title 仍是 `見觀結構整復所`，canonical 仍指向 `https://observe.boostime.me/`，且未讀到 `noindex`；這是公開搜尋仍不乾淨的主要外部阻塞點。
- 2026-05-14 晚間已完成 Google Business Profile 短漫貼文上架紀錄，詳見 `docs/google-business-short-comics-post-pack-2026-05-14.md`：北區、南區各 1 則第 1 集腳底篇貼文已上架，CTA 為「瞭解詳情」，連到 `https://www.observe888.com/comics/`。使用者已在外部 Chrome 手動補上封面圖 `0.png`；Codex 工具端未能獨立讀回縮圖 DOM，所以圖片狀態以使用者操作回報為準。不要重發貼文、不要再複製貼文到另一店。

## 2026-05-15 北區電腦接手提醒

- 明天換北區電腦處理時，先在 `D:\見觀營運資料夾\01_官網_ObserveGeoPages` 或該機實際 clone 路徑執行同步，以 `origin/main` 最新狀態為準。
- 先讀本檔、`PROJECT_CONTEXT.md`、`docs/website-operations.md`、`docs/google-business-short-comics-post-pack-2026-05-14.md`，再動手。
- GMB 短漫貼文今天已完成，不要重發、不刪除、不複製。若要查，只做後台或公開面讀回。
- Google 搜尋 / Maps 公開面可能因審核與快取延遲尚未顯示新貼文；沒有讀回前不要宣稱公開面已更新，也不要把延遲誤判成貼文未上架。
- Google Business Profile API scope 仍未修復；今天是靠已登入瀏覽器後台完成，不代表 `business.manage` API 或 connector 已可用。

## 後續工作方向

- 依 `docs/google-business-backend-readback-2026-05-14.md` 處理兩店各 `1 筆 Google 資訊更新`；點開仍只進 `商家資訊`，未看到 accept/reject UI。
- 依 `docs/google-business-backend-readback-2026-05-14.md` 補欄位編輯器層級的完整營業時間、屬性與服務範圍；主副分類、服務、產品、預訂欄位與照片盤點已先讀回。
- Google 公開搜尋結果與商家公開面仍未完全乾淨；下一輪先推動 Boostime / 網路公司把 `https://observe.boostime.me/` 做 301 redirect 或 `noindex, follow`，再重查北區公開 `預約` 是否已從 LINE 更新為官方分流頁、舊 Boostime 自然結果是否退場，以及 Search Console 索引狀態。
- 維護 `faq/index.html`，目前已回答第一次來、北區 / 南區怎麼選、費用、導航、服務邊界；後續若 Google 商家後台欄位變更，要同步更新 FAQ。
- 新增文章前，先做安全化與最終潤色，再補進分類入口、`sitemap.xml`、`llms.txt`。
- 若改店點資料，同步檢查 `index.html`、`visit/`、`north/`、`south/`、widget、JSON-LD、`llms.txt`。

## 不能做的事

- 不要把 AdsControl 的 `frontend/observe888-public` 或舊 build 輸出覆蓋回本專案。
- 不要把 `notes/` 退回完整文章清單；第一層維持分類入口。
- 不要把搜尋問法寫成治療承諾、醫療診斷或保證改善。
- 不要只改本地檔案就宣稱 Google 商家 live 已完成；商家後台資料必須回讀驗證。
