# Observe888 Visit Hub 交接

最後更新：2026-05-10

## 倉庫與部署

- Repository：`paul800901/observe888-visit-hub`
- Remote：`https://github.com/paul800901/observe888-visit-hub.git`
- 部署方式：GitHub Pages，`main` branch / root
- 對外網址：`https://paul800901.github.io/observe888-visit-hub/`

## 目前結構

- `index.html`：主入口頁，透過 `?store=north` 與 `?store=south` 切換北區版與南區版內容。
- `north/index.html`、`south/index.html`：轉址入口頁，會保留既有 query string，再導回主入口頁並補上對應 `store` 參數。
- `north/pricing/index.html`、`south/pricing/index.html`：各店價格頁。
- `about/index.html`、`observations/index.html`、`notes/index.html`：內容總覽頁。
- `notes/*/index.html`：文章內頁。
- `observe888-location-widget-snippet.html`：主入口頁載入的預約 / 門市資訊 widget。
- `observe888-tracking.js`：前端追蹤邏輯。
- `observe888-tracking-config.js`：追蹤設定，目前 GAS Web App endpoint 已填入。
- `robots.txt`、`sitemap.xml`：搜尋引擎相關檔案。

## 目前狀態

- 最近幾筆提交主要是補強與改寫身體觀察筆記頁內容。
- 重要專案脈絡請先讀 `PROJECT_CONTEXT.md`：此 repo 是手機格式微縮官網 / 到店導航站；新的 `ObserveGeoPages` 才是品牌官網與 GEO / SEO 公開文章庫。
- 目前工作分支是 `main`。
- 本次交接檔推上去之後，工作樹會維持乾淨，並與 `origin/main` 同步。

## 2026-05-10 這一輪做到哪裡

- 首頁 `index.html` 已改成更明確的雙站分工：右上角保留「品牌官網 / 身體觀察筆記」入口，底部重複的品牌連結群已移除。
- `notes/` 公開列表目前維持 8 篇已完成文章，標題與摘要都已調整到新版寫法。
- 第一批公開文章中，骨刺、手麻、腰椎退化、神經壓迫、久坐腰痠、走路一邊累、肩頸卡卡、腳底很累等頁面已換成新版內容。
- `tight-feet-observation` 已重新公開，並留在 `notes/index.html` 與 `sitemap.xml`。
- 第二批草稿目前放在 `drafts/second-batch/`，其中 `09` 到 `13` 已全部換成使用者最新版文案。
- 第二批草稿現況是 Markdown 草稿，不是公開頁；尚未進 `notes/index.html`，也尚未進 sitemap。
- 本輪整理完成後，整個 repo 檔案診斷為乾淨狀態，沒有編輯器層級錯誤。

## 這次推送的檔案範圍

- 這次 commit 會包含 19 個檔案：首頁、公開筆記頁、筆記索引、sitemap、專案脈絡檔、第二批 5 篇草稿，以及交接文件。
- 若之後要回看這次到底改了什麼，優先看：`index.html`、`notes/index.html`、`PROJECT_CONTEXT.md`、`drafts/second-batch/`。

## 追蹤與導流

- 主要導流 CTA 是 LINE 與電話。
- 主入口頁會透過 `window.Observe888Tracker` 綁定點擊與 page view 追蹤。
- 若追蹤端點要更換，先改 `observe888-tracking-config.js`。

## 接手注意事項

- 這個 repo 是純靜態站，沒有後端服務。
- 內容更新大多直接改對應 `.html` 檔即可。
- 若入口頁或導流異常，優先檢查：
  - `index.html`
  - `observe888-location-widget-snippet.html`
  - `observe888-tracking.js`
  - `observe888-tracking-config.js`
- GitHub Pages 推送後若未立刻更新，先看 GitHub Pages 部署狀態，再留一點時間讓快取刷新。

## 下一位接手者建議先確認

- 首頁、北區入口、南區入口是否都能正常開啟。
- LINE 與電話 CTA 是否仍指向正確目標。
- 若追蹤報表沒更新，先確認 `observe888-tracking-config.js` 內的 GAS endpoint 是否仍有效。

## 南區接手時先看什麼

- 先讀 `PROJECT_CONTEXT.md`，不要把這個 repo 誤當成最終品牌文章庫。
- 若只是延續站務或南區營運面，先檢查 `south/`、`south/pricing/`、首頁南區 CTA 是否正常。
- 若要繼續內容工作，請直接從 `drafts/second-batch/09-13` 接續，不要先把它們公開化。
- 如果要把第二批草稿轉成公開頁，必須先做最終潤色，再逐篇補 `notes/index.html` 與 `sitemap.xml`。
