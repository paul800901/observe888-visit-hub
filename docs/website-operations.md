# 見觀結構網站營運規格

最後更新：2026-05-13

## 目的

這份文件是正式官網、Google 商家檔案、地圖資料一致性、GEO / AEO 內容與公開安全邊界的工作清單。它不是已完成清單；每次修改後都要用現有官網檔案與外部平台回讀結果驗證。

## Source of truth

- 正式官網主專案：`C:\ObserveGeoPages\observe888-visit-hub`
- 正式網域：`https://www.observe888.com/`
- 到店導航：`https://www.observe888.com/visit/`
- Google / AI 可讀輔助：`sitemap.xml`、`robots.txt`、`llms.txt`
- 廣告與事件監測：`C:\AdsControl`

`AdsControl` 可以同步官網事件與做廣告監測，但不得覆蓋本專案的官網頁面與 Google 商家資料。

## 官方 NAP 與店點資料

### 北區店

| 欄位 | 正式值 |
| --- | --- |
| 對外名稱 | 見觀結構調理整復所-北區店 |
| 短名稱 | 北區店 |
| 地址 | 704 台南市北區北安路一段 211 號 |
| 電話 | (06) 251-0677 |
| 電話連結 | `tel:062510677` |
| 官網店點頁 | `https://www.observe888.com/north/` |
| 導航助手 | `https://www.observe888.com/visit/?store=north` |
| 服務與費用 | `https://www.observe888.com/north/pricing/` |
| 服務方式 | 週一公休，週二至週日 11:00-21:00 |

### 南區工作室

| 欄位 | 正式值 |
| --- | --- |
| 對外名稱 | 見觀結構調理整復所-南區工作室 |
| 短名稱 | 南區工作室 |
| 地址 | 702 台南市南區明興路 673 號 |
| 電話 | 0973-728-670 |
| 電話連結 | `tel:0973728670` |
| 官網店點頁 | `https://www.observe888.com/south/` |
| 導航助手 | `https://www.observe888.com/visit/?store=south` |
| 預約與費用 | `https://www.observe888.com/south/pricing/` |
| 服務方式 | 建議先以 LINE 或電話確認可安排時段 |

## 官網一致性檢查點

修改店點資料時，至少檢查下列檔案：

- `index.html`
- `visit/index.html`
- `north/index.html`
- `south/index.html`
- `north/pricing/index.html`
- `south/pricing/index.html`
- `observe888-location-widget-snippet.html`
- `llms.txt`
- `sitemap.xml`

需要一致的欄位：

- 店名
- 地址
- 電話與 `tel:` 連結
- Google Maps 搜尋 / 導航 URL
- 店點頁 URL
- 服務與費用頁 URL
- JSON-LD `LocalBusiness` 資料
- 頁面 meta description 與可見文案

## Google 商家檔案工作面

本專案應保存或維護下列草案與檢查依據：

- 商家名稱：依官方店點資料，不自行縮寫或混用。
- 主要類別與次要類別：待由實際 Google 商家後台回讀確認後記錄。
- 服務項目：使用「身體結構觀察」、「傳統整復推拿」、「姿勢與承重線索整理」這類安全表述；避免醫療療效承諾。
- 商家描述：以品牌定位、到店方式、服務邊界與預約方式為主。
- 照片素材：優先使用真實門口、路口、室內、招牌、動線、服務空間；避免過度修飾或醫療療效暗示。
- 網站 URL：北區與南區應連到各自官方店點頁或導航入口，不再連到 AdsControl 舊 public bundle。

目前已在 repo 內的 Google 商家素材：

- `assets/gmb/south-single-30-40-card-s0.png`
- `assets/gmb/south-single-30-40-card-148x100.png`
- `assets/gmb/south-workstudio-card-s0.png`
- `assets/gmb/south-workstudio-card-148x100.png`

尚未驗證或尚未完整建立：

- Google 商家後台目前名稱、分類、服務項目、描述、照片、網站 URL 的 live 回讀。
- 北區 Google 商家照片素材清單。
- 南區 Google 商家完整照片素材清單。
- 商家分類與服務項目的最終後台值。

## GEO / AEO 內容方向

GEO / AEO 內容應回答真實搜尋與到店問題，不寫保證排名或保證被 AI 採用。

優先補強的內容類型：

- FAQ：第一次來要看哪一頁、北區和南區怎麼選、是否需要先預約、如何看地圖、服務方式與費用在哪裡。
- 品牌說明：見觀結構如何看待身體感受、姿勢、承重、左右差、張力與生活負荷。
- 服務邊界：不是診斷、治療、保證改善；急性或惡化症狀應先就醫。
- 店點資訊：北區店、南區工作室的名稱、地址、電話、網站、導航入口。
- 搜尋問法：骨刺、手麻、腰椎退化、神經壓迫、坐骨神經痛等只能作為問法與觀察入口。

## 禁止文案

不要在官網、FAQ、Google 商家描述或照片說明中使用：

- 治療骨刺
- 改善神經壓迫
- 解決手麻腳麻
- 根治腰椎退化
- 保證不再疼痛
- 成功案例或前後對比
- 醫生沒告訴你的真相
- 不用開刀就能治好

## 建議 FAQ 主題池

- 見觀結構北區店和南區工作室差在哪裡？
- 第一次來要先看哪一頁？
- 北區店可以直接到現場嗎？
- 南區工作室為什麼建議先 LINE 確認？
- 費用在哪裡看？
- Google Maps 導航要點哪裡？
- 如果我只是看到骨刺、神經壓迫或腰椎退化報告，可以怎麼問？
- 見觀結構是不是醫療院所？
- 什麼情況應該先就醫？
- 身體觀察筆記和到店服務有什麼關係？

## 修改驗證流程

每次改官網資料後，至少做：

1. 讀回被改檔案，確認文案與資料一致。
2. 檢查 `sitemap.xml` 是否包含新增或調整的公開 URL。
3. 檢查 `llms.txt` 是否需要同步更新。
4. 檢查 JSON-LD 是否仍是有效 JSON。
5. 若有改到地圖、電話、LINE、追蹤，啟動本機靜態伺服器或用瀏覽器確認按鈕與頁面載入。
6. 若有改到 Google 商家欄位，必須用後台或外部頁面回讀，不可只憑本地檔案宣稱 live 已完成。
