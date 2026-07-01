# CTA 收斂與南區新客進線改版交接 - 2026-07-01

本文件給北區接手用。它只記錄官網 CTA 與預約文案這一輪的修改、驗證與未完成項目，不代表新客進線已恢復，也不取代 StoreOps、LINE、電話與實際來診真值。

## 這輪裁決

多模型與使用者最後收斂後，不把問題解讀成「網站 CTA 不夠多」。

正確判讀是：

- 官網已有 CTA，但 CTA 的任務、文案、優先級與頁面角色沒有完全統一。
- 南區高意圖頁應優先讓使用者完成「電話 / LINE 詢問時段」，不要太早把人送去 Google Maps。
- LINE 是主要紀錄入口，但南區短期缺新客時，電話必須是明顯入口，不可藏在頁尾或次要段落。
- 不能假設偏遠區域或第一次來的人懂身體名詞、會描述症狀，或願意照格式打一大段文字。
- 預約文案要允許「不知道怎麼說，也可以先問時間」。

## 已修改

### 第一段 CTA 結構收斂

官網 commit：`bba6c26 site: align CTA paths for south leads`

頂層 submodule commit：`8076407 chore: update website CTA submodule`

主要修改：

- 統一主要 CTA 文案為 `LINE 留預約需求`。
- 南區高意圖頁提高電話可見度，電話文案改為 `撥打 0973-728-670 確認時段`。
- `/visit/?store=south` 改成：未約先電話 / LINE，已確認再看 Google Maps。
- `/booking/` 從「看近期時段」改成「留下預約需求 / 等確認」語意，避免誤導成即時空位系統。
- `/faq/`、`/about/` 補直接 LINE CTA。
- 19 篇深度文章頁尾補預約行動模組，讓讀完文章的人不用再多跳一頁。
- `/shorts/`、`/comics/` 改成先回官網預約 / 費用 / 導航路徑，不只把人送去外部社群。
- `observe888-location-widget-snippet.html` 同步調整：已確認時段後再看 Maps。
- 全站電話連結統一為 `tel:0973728670`。

### 第二段 降低 LINE 打字門檻

官網 commit：`95f576c site: lower booking copy friction`

頂層 submodule commit：`8580675 chore: update website booking copy submodule`

使用者修正：很多第一次來的人不知道自己是什麼狀況，也不想照格式打一大段文字，不能把他們當懂行的人。

主要修改：

- `/booking/` 主標改成 `不知道怎麼說也可以，先用 LINE 問時間`。
- `/booking/` 補簡短範例，例如 `腰不舒服，想問南區今天有沒有時間`、`肩頸很緊，想約看看`。
- `/booking/` 說明改成：最短只要一句；真的不知道怎麼講，也可以直接傳 `我不太會說，想先問時間`。
- `/visit/` 南區說明改成：還沒約好先打電話或 LINE 問南區時段；不知道怎麼描述也沒關係。
- `/faq/` hero 改成：不需要先知道自己是哪一種狀況，也可以直接 LINE 問時間。
- `/services/tainan-tuina/` CTA 改成 `不知道怎麼說，也可以先問時間`。
- 19 篇文章底部 CTA 改成：
  - 標題：`覺得有點像自己，也可以先問時間`
  - 內文：`不用知道自己是什麼狀況，也不用照格式打字。可以只傳「我看到這篇有點像，想問南區時間」或「腰／肩頸不舒服，想約看看」。`

## 已驗證

- JSON-LD 檢查通過：
  - 第一段結構收斂後檢查 30 個 HTML 檔。
  - 第二段文案修正後檢查 23 個 HTML 檔。
- 本機 HTTP 抽查通過：第一段後抽查 13 個頁面。
- 19 篇文章頁尾 CTA 數量檢查通過。
- 舊高摩擦文案掃描已清除，包含：
  - `可以照這 4 句寫`
  - `把這篇文章轉成你的狀況描述`
  - `我現在最卡的位置是`
  - `做＿＿動作`
  - `可配合＿＿時段`
  - `先講你卡在哪`
  - `先丟一句 LINE`
  - `身體狀況與可配合時段`
- 第一段後已確認首頁 `#difference` 錨點存在，不需因 GPT5.5 Pro 的不確定點再改。
- 公開站 cache-bust 讀回通過：
  - `https://www.observe888.com/booking/?v=95f576c`
  - `https://www.observe888.com/notes/shoulder-neck-stuck-observation/?v=95f576c`
  - `https://www.observe888.com/visit/?store=south&v=95f576c`

## 還沒有驗證

- 手機實機視覺 QA 尚未做：尤其是 `/visit/?store=south`、`/booking/`、`/faq/`、文章頁、`/south/`、`/south/pricing/`。
- Playwright 截圖驗證尚未完成：本機 bundled runtime 缺 `playwright-core`，本輪沒有可用的瀏覽器自動截圖工具。
- LINE LIFF / LINE App 內實際表單流程尚未驗證；若 LIFF 內還要求過多欄位，會和低摩擦文案打架。
- `tel:` 在手機上是否能順利撥號尚未實機測。
- Google Maps CTA 在手機上的點擊路徑尚未實機測。
- GA4 / AdsControl / observe888_public 是否收到新 CTA event rows，尚未等真實點擊後讀回。
- StoreOps 真值尚未驗證：本輪只改網站，不代表 LINE / 電話進線、預約確認、實際來診或收入已改善。
- Search Console 舊 `.php` 搜尋摘要重新索引尚未送出。
- 不帶 cache-bust 的公開 URL 可能有短時間快取延遲；cache-bust 已讀到新文案，但一般訪客看到完全更新仍需再抽查。

## 尚未修改

- 沒有修改 LINE LIFF 表單欄位。
- 沒有修改 GA4 / AdsControl 事件追蹤程式。
- 沒有修改 StoreOps schema、業績表、預約表或病例資料。
- 沒有修改 Google Business Profile、Maps、Search Console 或 Cloudflare。
- 沒有做整站視覺重設計。
- 沒有碰社群 submodule 既有 `published_log` 未提交變動。
- 沒有處理 `ops_review/20_active/` 既有未追蹤盲點討論資料夾。

## 北區接手順序

1. 先同步頂層 repo 與官網 submodule，確認官網 HEAD 至少在 `95f576c` 之後，頂層 HEAD 至少在 `8580675` 之後。
2. 用手機實機打開：
   - `https://www.observe888.com/visit/?store=south`
   - `https://www.observe888.com/booking/`
   - `https://www.observe888.com/faq/`
   - `https://www.observe888.com/south/`
   - `https://www.observe888.com/south/pricing/`
   - 任一文章頁，例如 `/notes/shoulder-neck-stuck-observation/`
3. 實測三種行動，不要只看畫面：
   - LINE 是否好開、是否真的不需要懂術語才敢傳。
   - 電話按鈕是否能撥出。
   - Maps 是否只在已確認到店後使用，不會搶走預約行動。
4. 若 LINE LIFF 內還是要求太多欄位，下一步優先改 LIFF / 表單，而不是再改官網按鈕數量。
5. 等實際點擊與進線後，再到 AdsControl / GA4 / StoreOps 讀回，不要只用頁面完成度判斷成效。
6. Search Console 舊 `.php` 摘要重新索引另開一輪處理，不要混進 CTA 文案修正。

## 判讀邊界

這輪已完成的是「網站行動路徑與低摩擦預約文案修正」。

尚未完成的是「證明新客進線恢復」。那需要 LINE、電話、GA4 / AdsControl、StoreOps 與實際來診資料一起讀回。
