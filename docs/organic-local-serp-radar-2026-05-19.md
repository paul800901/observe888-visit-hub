# 見觀在地 SERP 雷達 - 2026-05-19

## 用途

這份文件是見觀版的小型 Semrush。它不用全球估算流量當答案，而是用台南在地搜尋字、公開搜尋結果、競品頁面與見觀自己的 paid search terms 來決定下一步 SEO / GEO / AEO 任務。

## 資料來源

- 公開搜尋結果：2026-05-19 手動查詢台南整復推拿、北區整復推拿、南區整復推拿、台南運動按摩推薦等字。
- 見觀 paid search terms：`02_廣告_AdsControl/backend/data/adscontrol.db` 的 `search_terms`。
- 見觀 Search Console：2026-05-19 已登入瀏覽器匯出 `https://www.observe888.com/` 前 3 個月網路搜尋成效，整理於 `docs/search-console-performance-readback-2026-05-19.md`。
- 見觀官網現況：`sitemap.xml`、首頁、南北店頁、FAQ、`services/tainan-tuina/`。
- 不使用 Semrush 估算數字作為本文件依據；目前 Semrush MCP 不可用。

## 關鍵字群優先級

| 優先級 | 群組 | 本機付費搜尋訊號 | 搜尋意圖 | 見觀目前承接 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| P0 | `core_tainan_tuina` | 68 clicks / 612 impressions / NT$1,825.09 / 1 proxy conversion | 台南整復、台南整骨、台南推拿、台南整復推拿推薦 | 已新增 `/services/tainan-tuina/`，首頁、FAQ、南北頁也已補字 | 每週看 Search Console 是否開始出現曝光；必要時再加 FAQ 區塊與比較內容 |
| P1 | `sports_massage` | 48 clicks / 1,907 impressions / NT$1,347.51 / 0 conversion | 按摩、運動按摩、筋膜放鬆、肩頸按摩 | 目前只在服務頁做差異說明 | 先防雜訊，不急著做純按摩頁；可做「運動按摩和整復推拿差在哪」段落 |
| P1 | `district_north_south` | 11 clicks / 158 impressions / NT$279.12 / 0 conversion | 安平、安南、永康、東區等地區搜尋 | 北區、南區頁已補台南區域字 | 不做跨區假頁；只用通勤/鄰近說明自然承接 |
| P2 | `competitor_brand` | 9 clicks / 79 impressions / NT$283.46 / 0 conversion | 使用者搜尋其他店名或老師 | 不應直接買/寫競品攻擊內容 | 僅在 radar 追蹤，不做競品品牌頁 |
| P2 | `symptom_body` | 2 clicks / 56 impressions / NT$58.18 / 0 conversion | 富貴包、骨盆、肩膀、駝背、高低肩 | 已有 notes 文章群可承接 | 從既有筆記加內鏈到服務頁，不新增醫療承諾頁 |
| P3 | `recommendation` | 1 click / 44 impressions / NT$28.28 / 0 conversion | PTT、Dcard、推薦、費用、老師 | FAQ 已開始承接 | 等 Search Console 看到實際曝光後再做「怎麼選」擴充 |

## Search Console 讀回摘要

2026-05-19 已讀回 Google Search Console 前 3 個月資料：總點擊 469、總曝光 13,386、平均 CTR 3.5%、平均排名 7.5。

| 觀察 | 數據 | 判斷 |
| --- | ---: | --- |
| 服務核心查詢列 | 90 clicks / 4,389 impressions | 見觀不是沒有自然需求；問題是服務搜尋多落在首頁或舊 URL。 |
| 品牌查詢列 | 116 clicks / 436 impressions | 品牌詞穩定，代表使用者找得到見觀。 |
| 舊 `.php` URL | 183 clicks / 7,257 impressions | 仍是最大技術清理項；目前 live HTTP 多為 404 + JavaScript 導流，不是正式 301。 |
| 首頁 `/` | 319 clicks / 10,544 impressions | 首頁仍吃掉多數服務詞曝光；新服務頁需要等待重新索引。 |
| 行動裝置 | 333 clicks / 10,643 impressions | 搜尋與到店決策主要發生在手機，頁面文案與 CTA 要以手機掃讀為主。 |

## 公開 SERP 觀察

| 查詢方向 | 公開出現樣本 | 觀察 | 見觀對策 |
| --- | --- | --- | --- |
| 台南整復推拿推薦 | 懸壺技士、裕元健康調理中心、柏拉圖徒手保健、華德整復所、Gomaji 店家頁 | title 多數直接塞入台南、整復、推拿、按摩、推薦或具體體態字 | 見觀已補 `/services/tainan-tuina/`，避免只靠品牌頁與導航頁 |
| 台南北區整復推拿 | 柏拉圖徒手保健、華德整復所、各類按摩/推拿頁 | 北區字直接寫在 title 或服務描述，對地區搜尋有利 | 北區頁 title/H1 已補「台南北區整復推拿入口」；服務頁再回連北區 |
| 台南南區整復推拿 | 懸壺技士南區店、誠翊傳統整復推拿/Gomaji、一般按摩頁 | 南區結果較容易混到按摩、養生館、優惠頁 | 南區頁保留工作室預約制，避免與一般按摩店混淆 |
| 台南運動按摩推薦 | 茉式運動按摩、悠力運動按摩、參鐵運動按摩、七分之二推薦頁 | 運動按摩有獨立市場，第三方推薦頁吃很多推薦型流量 | 見觀先做差異說明，不直接改定位成運動按摩 |
| 台南物理治療 / 徒手治療 | 路加、日進悅步、生生優動、技群等 | 物理治療所靠專業身分、醫療類別、分院頁和問題字承接 | 見觀需明確說不是醫療院所，避免醫療宣稱 |

## 競品成功模式

1. title 直白，把台南、區域、服務類別放在最前面。
2. 服務矩陣清楚：整復、推拿、運動按摩、筋膜刀、體態、物理治療、費用、預約分開講。
3. 地區頁或分店頁完整：地址、電話、Google Maps、預約、價格、照片、評論入口都在同一條路徑。
4. 推薦型流量被第三方頁吃掉：七分之二、Gomaji、Wanderlog、Dcard/PTT 類頁面會出現在「推薦」搜尋。
5. 痛點字很容易被拿來做流量入口，但見觀不能跟著寫療效承諾。

## 見觀目前已完成

- 首頁 title / description / hero 已補 `台南傳統整復推拿`。
- 北區頁已補 `台南北區整復推拿入口`。
- 南區頁已補 `台南南區整復推拿工作室入口`。
- FAQ 已新增整復推拿、運動按摩、物理治療的差異說明。
- 已新增 `/services/tainan-tuina/` 作為服務意圖承接頁。
- `sitemap.xml`、`llms.txt` 已加入新服務頁。
- 已建立 `docs/search-console-performance-readback-2026-05-19.md`，把 Search Console 官方讀回轉成可執行清單。
- `notes/` 與 `notes/search-terms-overview/` 已加內鏈回 `/services/tainan-tuina/`，讓身體觀察內容能導回服務意圖頁。
- FAQ 已新增 `台南整復推拿推薦`、`台南整骨推薦` 的中立選擇標準，不做第一名或療效保證宣稱。
- 服務頁與 FAQ 已依 Search Console 實際曝光補入 `台南整骨費用`、`全身整復費用`、`台南喬骨`、`美式整復`、`整脊` 等安全說明。

## 下一批不需店主介入的任務

| 順序 | 任務 | 目的 | 實作範圍 |
| --- | --- | --- | --- |
| 1 | 清點外部名錄 | 找出可被搜尋到但需要人工申請/確認的平台 | 已建立機會清單；實際申請需要店主身份 |
| 2 | 追蹤 Search Console | 確認 `/services/tainan-tuina/` 是否開始出現 impressions | 已完成第一次讀回；下次等 1-2 週再看新頁配對 |

## 需要店主或後台介入才可做

- 主機或網域層級舊 `.php` URL 301：需要能設定 GitHub Pages 前方主機、DNS/CDN 或網路公司轉址規則。
- Google Business Profile 公開面板與服務項目調整：需要店主後台或明確授權。
- 第三方推薦頁、名錄、平台申請：可能需要店主身份、電話驗證、照片或營業資料。
- Semrush / Ahrefs / Similarweb：需要付費帳號或匯出檔。

## 每週判斷規則

1. 如果 Search Console 開始出現 `台南整復推拿` 但 CTR 低，先改 title / description，不急著新增頁。
2. 如果 `台南運動按摩` 曝光很多但沒有 LINE/電話 proxy，先加排除與差異說明，不把品牌定位改成按摩店。
3. 如果 `推薦` 類搜尋出現曝光，優先做 FAQ 與「怎麼選」中立內容，不做假排行。
4. 如果地區字出現但非北區/南區，先用交通說明承接，不做不存在的分店頁。
5. 如果競品品牌字花費增加，先在 Ads 端檢查是否要排除，不在官網寫競品品牌頁。

## 來源

- 懸壺技士：https://shjs.com.tw/
- 柏拉圖徒手保健：https://www.plato-therapy.com/
- 裕元健康調理中心：https://www.chwh0909.com/
- 華德整復所：https://www.huadetuina.com.tw/about.html
- 茉式運動按摩：https://mos2022.com/
- 悠力運動按摩：https://www.mmsprohealthy.com/
- 參鐵運動按摩：https://iron3studio.wixsite.com/sportsmassage
- 七分之二台南運動按摩推薦：https://www.twosevenths.com/therapy/massage-tainan-sports/
- 路加物理治療所：https://www.luketainan.com/
- 日進悅步物理治療所：https://sunnjoyphysio.com/
- 生生優動台南物理治療所：https://www.aicarept.com/location/location-tnn
- 技群物理治療所：https://www.painaway.tw/
