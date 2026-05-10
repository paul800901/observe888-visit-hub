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
- 目前工作分支是 `main`。
- 本次交接檔推上去之後，工作樹會維持乾淨，並與 `origin/main` 同步。

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
