# 外部資料一致性清單（SEO / GEO / AI 可搜尋）

日期：2026-06-25

## 目的

讓 Google、Bing、Search Console、AI 搜尋與第三方名錄看到一致的見觀資料，同時不把正式官網改成機器文。

本清單只處理公開資料一致性，不把 AEO 掃描分數當唯一判準。正式官網仍以人類可讀、現場可理解為第一優先；機器可讀資料放在 `metadata`、`JSON-LD`、`FAQ schema`、`sitemap.xml`、`llms.txt` 與低干擾 footer。

## 目前官網主來源

| 資料 | 正式來源 |
| --- | --- |
| 首頁 | `https://www.observe888.com/` |
| 聯絡 / NAP | `https://www.observe888.com/contact/` |
| 到店導航 | `https://www.observe888.com/visit/` |
| 預約 | `https://www.observe888.com/booking/` |
| 服務意圖 | `https://www.observe888.com/services/tainan-tuina/` |
| 費用 | `https://www.observe888.com/south/pricing/` |
| AI / LLM 摘要來源 | `https://www.observe888.com/llms.txt` |
| Sitemap | `https://www.observe888.com/sitemap.xml` |

## P0：正式網域舊 URL 與搜尋索引

| 項目 | 現況 | 處理方式 | 驗收 |
| --- | --- | --- | --- |
| `www.observe888.com/news/*` | Google 搜尋結果仍可能顯示舊 `news/index.php` 片段；repo 內 Cloudflare Worker 與 404 fallback 已設定轉到 `/notes/`。 | 部署後逐條讀回 301；在 Search Console 對殘留舊 URL 做 URL 檢查並要求重新檢索。 | `news/index.php?...` 回 301 到 `/notes/`；GSC 後續不再把它當主要曝光 URL。 |
| `www.observe888.com/products/car.php` | 舊整復服務 URL，已設定轉到 `/services/tainan-tuina/`。 | 部署後讀回 301；Search Console 重新檢索。 | 搜尋結果逐步改指服務頁，不再顯示舊 PHP title/snippet。 |
| `www.observe888.com/paper/*` | 舊品牌、導覽、費用入口。 | 保持既有 Worker 對照表；Search Console 只送最終頁與仍曝光的舊 URL。 | 舊入口都直接到 `/about/`、`/visit/`、`/south/pricing/` 或 `/notes/`。 |

## P0：第三方名錄與舊平台

| 平台 | 風險 | 建議處理 | 驗收 |
| --- | --- | --- | --- |
| Workband | Google 搜尋結果仍可看到 Workband 舊頁，可能混入舊文案、舊分店結構或過度承諾式語氣。 | 登入後改成南區店現況，網站一律指 `https://www.observe888.com/contact/` 或直接關閉 / noindex / 301。 | Google 搜尋結果不再顯示舊 Workband 片段，或片段已改成南區現況。 |
| doing-housework / 小工匠類頁面 | 可能還有舊服務敘述、舊北區地址、舊電話或舊站結構。 | 登入或請平台下架；若不能下架，至少改為南區現況、官方網址、電話與預約方式。 | 搜尋 `見觀結構 doing-housework` 不再顯示舊電話 / 舊北區 / 過度承諾式文案。 |
| Boostime | 先前已讀到舊站回 `410 Gone`，但搜尋結果可能仍延遲。 | 週回讀 `observe.boostime.me/`、`/me/info`、`/activities/*`；若又變成 200，要求外部公司改 301 或 noindex。 | 舊 Boostime 不再出現在品牌詞前段，或所有公開 URL 都 301 / 410 / noindex。 |

## P1：Google / 社群公開資料

| 平台 | 現況 | 建議處理 | 驗收 |
| --- | --- | --- | --- |
| Google Business Profile | `docs/search-console-gbp-readback-2026-06-25.md` 已記錄後台描述修正，舊防衛句改成正常服務描述。 | 等 Google 審核 / 公開快取更新後，以公開搜尋與 Maps 面板回讀。 | 南區與北區公開面板不再優先顯示 `不提供醫療診斷或療效保證`。 |
| Google Search Console | 本輪官網改 metadata / JSON-LD / sitemap / llms；部署後才可送檢。 | 送首頁、about、booking、contact、faq、services/tainan-tuina、visit 重新檢索。 | URL 檢查讀到新 title、canonical、JSON-LD；索引狀態等待 Google 更新。 |
| Facebook | 可能仍有舊地址、舊電話、舊北區貼文或舊站連結。 | 先改粉專 About / website / phone / address；歷史貼文不用全刪，必要時補固定貼文導到新官網。 | 搜尋與粉專首頁顯示南區現況與 `observe888.com`。 |
| Instagram / Threads | 可能有舊電話、舊網址、舊簡介或北區語境。 | 更新 bio、link in bio、電話與預約入口；不要把東區住宅工作室照片化。 | 搜尋片段與 profile 首屏不再顯示舊電話或北區主場敘述。 |
| YouTube | Shorts / channel 需承接到 `/shorts/` 或 `/booking/`。 | 頻道簡介、影片描述固定導向 `https://www.observe888.com/shorts/` 或 `https://www.observe888.com/booking/`。 | YouTube 搜尋片段能回到正式官網而不是舊平台。 |

## P1：Bing / IndexNow

| 項目 | 處理方式 | 驗收 |
| --- | --- | --- |
| IndexNow key | 根目錄新增 key file：`30dbda0e11b340b682dae8d64950a94e.txt`。 | 部署後 `https://www.observe888.com/30dbda0e11b340b682dae8d64950a94e.txt` 回 200，內容等於 key。 |
| IndexNow submit | key file live 後，送 changed URL list 到 IndexNow endpoint。 | HTTP `200` 表示收到通知；不代表 Bing 立即收錄。 |
| Bing Webmaster | 若可登入，送 sitemap 並看是否有 crawl/index 錯誤。 | Bing 可讀 `sitemap.xml` 與核心頁。 |

## 不做的事

- 不為了掃描分數在首頁硬加可見的機器短答案區。
- 不把東區住家兼工作室做成公開照片主素材。
- 不用 `結構治療` 當公開服務主詞。
- 不用防衛式句子放在第一屏或搜尋最容易摘到的位置。
- 不宣稱 Google / Bing / AI 已收錄或排名改善，除非有後台或公開讀回證據。

## 一週後回讀

建議回讀日期：2026-07-02。

回讀順序：

1. Google 搜尋：品牌詞、南區店名、`見觀結構調理整復所-南區店`、`見觀結構南區店`、`台南南區整復推拿`。
2. Google Maps：南區店公開面板、GBP 描述與網站 / 預約連結。
3. Search Console：核心頁 URL 檢查、舊 PHP URL 轉址後狀態、sitemap 讀取。
4. Bing：sitemap / IndexNow 提交後是否能查到正式頁。
5. 第三方：Workband、doing-housework、Boostime、Facebook、Instagram、Threads、YouTube 搜尋片段。
