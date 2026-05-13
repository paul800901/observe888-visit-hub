# ObserveGeoPages 專案脈絡

最後更新：2026-05-13

## 一句話定位

`C:\ObserveGeoPages\observe888-visit-hub` 是見觀結構正式官網、到店導航、品牌內容、身體觀察筆記、Google 商家資料一致性與 GEO / AEO 內容的主專案。

`C:\AdsControl` 是廣告與營運監測專案，不再是官網 source。它可以同步與分析官網事件，但不能作為正式官網頁面或 Google 商家資料的主控端。

## 這次主責轉移的背景

見觀結構已從網路公司取回網站處理權限，原本的微縮官網不再只是臨時導流頁，而要升級成正式官網。後續網站、Google 商家檔案、地圖資料、品牌說明、FAQ、GEO / AEO 與服務邊界都應集中在本專案維護。

舊文件曾寫成雙官網分工：AdsControl 是到店導航官網，ObserveGeoPages 是品牌與文章官網。這個分工現在作廢。新的 source of truth 是：

- 官網、到店導航、店點頁、服務頁、文章、Google 商家資料：本專案。
- 廣告、追蹤事件匯入、lead sync、報表、監測：AdsControl。

## 目前公開網站角色

- `index.html`：正式官網首頁，承接品牌理解、分類入口與到店入口。
- `visit/index.html`：到店導航入口，處理北區 / 南區選店、LINE、電話與 Google Maps。
- `north/index.html`：北區店官方店點頁。
- `south/index.html`：南區店官方店點頁。
- `north/pricing/index.html`：北區服務與費用。
- `south/pricing/index.html`：南區預約與費用。
- `about/index.html`：品牌介紹與服務方式。
- `notes/index.html`：身體觀察筆記分類入口。
- `notes/search-terms-overview/index.html`：檢查名詞與常見搜尋問法分類入口。
- `notes/*/index.html`：公開文章頁。
- `llms.txt`：AI / 答案引擎可讀導覽。
- `assets/gmb/`：Google 商家檔案與地圖曝光用圖片素材。

## 官方店點資料

這些資料應與官網頁面、JSON-LD、Google 商家檔案、地圖入口、FAQ 與 `llms.txt` 保持一致。

### 北區店

- 對外名稱：見觀結構調理整復所-北區店
- 短名稱：北區店
- 地址：704 台南市北區華德里北安路一段 211 號
- 電話：(06) 251-0677
- 電話連結：`tel:062510677`
- 網站頁：`https://www.observe888.com/north/`
- 導航頁：`https://www.observe888.com/visit/?store=north`
- 服務與費用：`https://www.observe888.com/north/pricing/`
- 營業 / 服務方式：週一公休，週二至週日 11:00-21:00

### 南區店

- 對外名稱：見觀結構調理整復所-南區店
- 短名稱：南區店
- 地址：702 台南市南區明興路 673 號
- 電話：0973-728-670
- 電話連結：`tel:0973728670`
- 網站頁：`https://www.observe888.com/south/`
- 導航頁：`https://www.observe888.com/visit/?store=south`
- 預約與費用：`https://www.observe888.com/south/pricing/`
- 營業 / 服務方式：建議先以 LINE 或電話確認可安排時段

## 內容安全邊界

可以使用醫療詞彙，但只能作為：

- 讀者常見問法
- 檢查名詞
- 搜尋入口
- 身體觀察起點

可公開使用的方向：

- 身體結構觀察
- 傳統整復推拿
- 姿勢與承重線索整理
- 張力與生活負荷觀察
- 整理身體線索
- 看懂身體狀態
- 可能、可先留意、暫時看起來、仍需觀察

不可寫成：

- 見觀結構治療骨刺
- 改善神經壓迫
- 解決手麻腳麻
- 根治腰椎退化
- 保證不再疼痛
- 成功案例或前後對比
- 醫生沒告訴你的真相
- 不用開刀就能治好

## 網站營運責任

本專案應維護下列事項：

- Google 商家檔案與官網 NAP 一致性。
- 北區 / 南區名稱、地址、電話、網站 URL、服務方式一致性。
- 商家分類、服務項目、照片、描述草案。
- 地圖與導航連結一致性。
- FAQ、品牌說明、服務邊界、到店資訊。
- `sitemap.xml`、`robots.txt`、`llms.txt` 與主要頁面 canonical。
- 文章分類入口與搜尋問法頁。

具體清單維護在 `docs/website-operations.md`。

## AdsControl 仍可做什麼

AdsControl 可以保留：

- Google Ads API 同步與監測。
- 公開站事件匯入。
- `observe888_public` LINE / 電話 / 地圖弱訊號分析。
- 廣告報表與營運告警。

AdsControl 不應再主控：

- 正式官網頁面。
- 到店導航頁 source。
- Google 商家檔案資料。
- `sitemap.xml`、`robots.txt`、`llms.txt`。
- GEO / AEO FAQ 與品牌內容。

## 接手時最重要的幾條

- 先讀 `README.md`、本文件、`docs/website-operations.md`。
- 改任何店點資料時，同步檢查 `index.html`、`visit/`、`north/`、`south/`、JSON-LD、`llms.txt`。
- `notes/` 第一層維持分類入口，不退回完整文章清單。
- 新文章公開前先做安全化與最終潤色，再補進分類入口與 sitemap。
- 不要把 AdsControl 舊 public bundle 覆蓋回本專案。
