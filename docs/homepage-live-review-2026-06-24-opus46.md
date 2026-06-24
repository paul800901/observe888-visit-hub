# 首頁最新版 Opus 4.6 live review 紀錄 - 2026-06-24

本文保存使用者貼入的 Opus 4.6 對最新版正式首頁 `https://www.observe888.com/` 的審查摘要。

本檔不是新的設計規格，也不是 Codex 本輪重新逐行讀回 live HTML 的驗證報告。它是把 Opus 4.6 已讀 `homepage-human-readability-audit-2026-06-24.md`、總控交接文件與線上首頁後得到的判斷，整理成後續官網接手可查的紀錄。

## 審查結論

Opus 4.6 判斷：最新版首頁已把 2026-06-24 多模型嚴格批評的核心問題大致處理完成，從原本偏 SEO / AEO / AI / 法務導向的頁面，收斂成「SEO 資料層保留、人類可見層可讀」的版本。

整體狀態可暫記為：

```text
SEO / AEO / GEO 資料層保持高完整度。
人類首頁可讀性已從失敗稿提升到可用水準。
下一步不應再大改資訊架構，應優先確認已補視覺證據不壓壞第一屏；追蹤 / CSP 風險已於 2026-06-24 補 Worker allowlist，部署與讀回見 `docs/cloudflare-redirect-migration-2026-05-19.md`。
東區工作室因住家兼工作室性質，不列為公開真實照片待辦。
```

## 已做到

Opus 4.6 認為最新版首頁已完成以下重點：

1. Hero 3 秒理解：H1 用白話痛點帶出「先整理身體狀態」的見觀差異，不再只是症狀清單。
2. 收費拆成五階：`NT$300`、`NT$400`、`NT$500`、`NT$800`、`NT$1000`，不再把 `NT$500-800` 當主要費用訊號。
3. 防衛式免責已清掉：首頁沒有把「不宣稱療效」「不保證改善」放回主文案。
4. 公開主詞維持「結構調理」：沒有把「結構治療」作為首頁主詞。
5. 機器資料已藏到適當位置：Wikidata / Wikipedia 進 footer details，JSON-LD 保留完整節點。
6. CTA 沒有明顯打架：Hero 與底部預約各自有不同功能，不再像重複按鈕清單。
7. 差異區維持「你可以這樣說 / 我們會這樣看」：沒有把粗體術語標籤、電玩用語或內部推理流程外顯。
8. 人類可見層八段結構完整：Hero、收費、店點、門口與空間、差異、身體筆記、FAQ、底部預約與 SEO footer。
9. 功能層仍保留：tracking、bottom-nav、`?store=` 邏輯與 Cloudflare beacon 仍在。

## 尚未完成

Opus 4.6 原先將剩餘缺口分成三項；2026-06-24 依使用者補充，東區照片項已改列為公開素材邊界，不是缺口：

| 狀態 | 項目 | 說明 |
| --- | --- | --- |
| 已校正 | 東區工作室照片 | 東區有住家兼工作室性質，不適合公開可辨識外觀、門口、室內或能推回私人空間的照片；後續不把東區實拍列為待辦。 |
| 已驗證 | 手機第一屏 | 2026-06-24 Codex 已用 Playwright 截圖確認手機 `390x844` 首屏可讀。 |
| 已完成 | Hero 右側缺圖 | 2026-06-24 Codex 已補南區門口真實照片，並已完成正式站桌機 / 手機截圖回讀。 |

## 後續處理方向

後續不要因為這份 review 又把首頁重做成新的 AI checklist。比較保守的下一步是：

1. 東區不補真實工作室照片；因其有住家兼工作室性質，不適合公開可辨識外觀、門口、室內或能推回私人空間的素材。
2. 若再新增素材，先做手機 / 桌機截圖，確認新增圖片沒有壓掉第一屏重點。
3. 維持第一屏：品牌、台南、做什麼、大概多少錢、LINE 預約要能在 5 秒內看懂。
4. 若再改 Hero 或短影音入口，只加真實素材或已公開縮圖，不加新的內部規格文案。
5. 保持 JSON-LD、metadata、tracking、bottom-nav、`?store=`、FAQ、文章入口與 SEO footer 不被刪除。

## 不要回退

這份 review 的結論不是「可以放鬆規則」。後續仍不可回到：

- 首頁第一屏放防衛式免責。
- 用「結構治療」當公開主詞。
- 把外部核對來源放回主流程。
- 把 `NT$500-800` 當唯一費用訊號。
- 把首頁改成純菜單頁、純 SEO 目錄或 AI 交卷式規格表。

## 驗證狀態

- Opus 4.6 表示已讀線上 `https://www.observe888.com/` 並逐段檢查。
- 2026-06-24 22:11 +08:00，Codex 已補做 live HTML / DOM 讀回、Playwright 截圖、手機第一屏、桌機第一屏、站內主要入口與資源狀態檢查。

## Codex live verification 補充

本輪使用正式站 `https://www.observe888.com/`，不改 live 後台、不送出任何表單、不修改 Google / Cloudflare / Ads 設定。

### 已驗證

| 項目 | 結果 |
| --- | --- |
| 首頁 HTTP | `200 OK` |
| Live HTML | 抓回 1238 行，約 42 KB |
| `<title>` | `見觀結構調理整復所｜肩頸腰背四肢卡住，先整理身體狀態` |
| 手機 viewport | Playwright `390x844` 截圖完成 |
| 桌機 viewport | Playwright `1366x768` 截圖完成 |
| `llms.txt` | `200 OK` |
| `sitemap.xml` | `200 OK` |
| 主要站內入口 | `/booking/?source=home_hero`、`/visit/`、`/visit/?store=south`、`/visit/?store=east`、`/faq/`、`/notes/`、`/shorts/` 皆 `200 OK` |
| 主要腳本 | `observe888-tracking-config.js`、`observe888-tracking.js`、`observe888-bottom-nav.js` 皆 `200 OK` |
| 首頁南區照片 | 南區門口與南區室內兩張圖片皆載入成功 |
| `?store=south` | JS redirect 到 `https://www.observe888.com/visit/?store=south` |
| `?store=east` | JS redirect 到 `https://www.observe888.com/visit/?store=east` |
| JSON-LD | 1 個 `application/ld+json` script 可解析，`@graph` 包含 `WebSite`、`Organization`、`WebPage`、`ItemList`、`LocalBusiness`、`CreativeWork`、`FAQPage` |
| Meta | canonical、3 個 hreflang、OG、Twitter、GEO meta、`llms.txt` link 皆讀到 |
| 禁用詞 | 在 live HTML / body text 中未讀到 `不宣稱療效`、`不保證改善`、`不涉及醫療診斷宣稱`、`結構治療`、`NT$500-800`、`TODO`、`這裡不是 SEO 目錄`、`公開資料與官方連結`、`透明收費`、`真實店點與到店辨識`、`開無雙`、`解鎖`、`高階技術`、`Premium Craftsman Vibe`、`結構源頭`、`找到源頭` |

### 手機第一屏判斷

手機 `390x844` 首屏可見：

- 店名 `見觀結構調理整復所`
- 地點摘要 `台南・南區門市與東區工作室`
- 導覽 `身體筆記`、`品牌`、`店點`、`FAQ`
- eyebrow `台南・結構調理・預約制`
- H1 `肩頸腰背四肢卡住，先把身體狀態整理清楚`
- 白話副標
- 主 CTA `LINE 預約`
- 次 CTA `看費用`
- 小連結 `到店導航`、`見觀差異`
- 南區 / 東區摘要與 `NT$500` 一般整理訊號

判斷：手機第一屏已能在 5 秒內讀到「這是哪家、在哪裡、做什麼、怎麼約、可先看費用」。底部固定 nav 在初始手機 viewport 會覆蓋到下一段 `先看大概費用` 的下緣附近，但沒有遮住 Hero H1、主副 CTA 或到店 / 差異小連結。

### 桌機第一屏判斷

桌機 `1366x768` 首屏可見：

- 店名與導覽
- Hero H1、白話副標
- `LINE 預約`、`看費用`
- 到店 / 差異小連結
- 右側南區 / 東區摘要與 `約 30 分鐘 NT$500`
- `先看大概費用` 起始與第一個 `NT$300`

判斷：桌機第一屏清楚，CTA 沒有打架，右側仍偏文字摘要，未形成更強的真實視覺信任感。

### 已確認仍成立

- 首頁維持八段人類可見結構：Hero、收費、店點、門口與空間、差異、身體筆記、FAQ、底部預約與 SEO footer。
- 五階價格 `NT$300 / NT$400 / NT$500 / NT$800 / NT$1000` 都存在。

### 2026-06-24 素材補強後狀態

- `index.html` 已改為 Hero 右側顯示南區明興路門口真實照片。
- `第一次來` 區塊已從 2 張南區照片擴成 4 張：門口、室內、現場動作觀察、現場說明。
- 已新增首頁短影音預覽區，使用兩張壓縮後公開縮圖：站久腳緊回測、手腕手指回測。
- 這輪未放東區工作室真實照片；依使用者 2026-06-24 補充，這是公開素材邊界，不是未完成。東區仍只用文字與 `/visit/?store=east` 導頁承接。
- 正式站已讀回新版 HTML：Hero 圖片、4 張到店 / 現場圖、2 張 v2 短影音縮圖都已進入 live HTML。
- 正式站圖片載入已檢查：首頁 7 張圖片皆 `complete=true`，沒有圖片 / CSS / JS 4xx。
- 正式站桌機 `1366x768` 與手機 `390x844` 截圖已確認第一屏沒有被新增圖片壓壞。

### 新發現的技術風險

正式站曾發現 Cloudflare Worker CSP 會擋住部分追蹤 / beacon 請求：

- `static.cloudflareinsights.com` beacon script 被 `script-src` 擋住。
- `googleads.g.doubleclick.net` 的 viewthrough script 被 `script-src` 擋住。
- `ad.doubleclick.net`、`www.google.com/rmkt/collect`、`www.google.com/ccm/collect` 等 Google Ads / remarketing collect 被 `connect-src` 擋住。

這不影響首頁可讀性或主要導覽，但會影響 Cloudflare beacon 與部分 Google Ads / remarketing 訊號。2026-06-24 已在 Worker 原始碼補 allowlist；部署與 live readback 以 `docs/cloudflare-redirect-migration-2026-05-19.md` 的最新紀錄為準。

### 仍未完成

1. 暫無首頁可讀性相關未完成項；追蹤 / CSP 另見 Cloudflare 部署紀錄。

## 2026-06-25 子頁一致性回查補充

使用者提供 8 頁 live review，指出首頁已補真實照片與短影音縮圖，但子頁仍有三個問題：`/contact/` 費用仍是舊 `NT$500-800`、`/about/` hero 仍放防衛式免責句、子頁視覺系統與首頁斷裂。

本輪處理：

- `/contact/` JSON-LD `priceRange` 改為 `NT$300-1000`，可見費用改成 `NT$300-400 / NT$500 / NT$800 / NT$1000`。
- `/about/` hero 移除「本站內容不作為診斷、治療或療效承諾。」；內容邊界仍保留在後段區塊。
- 新增 `observe888-page-theme.css`，讓 `/about/`、`/visit/`、`/booking/`、`/faq/`、`/notes/`、`/contact/`、`/services/tainan-tuina/` 使用首頁同一組深檀木色、低陰影、8px 卡片與 CTA 語氣。
- 回查時額外發現 `/south/`、`/east/` 仍殘留舊費用訊號，已同步成 `NT$300-1000` 分層；東區仍不新增工作室照片。
