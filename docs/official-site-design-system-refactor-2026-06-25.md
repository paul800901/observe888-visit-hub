# 官網子頁設計系統重構紀錄 - 2026-06-25

本文記錄本輪針對正式官網子頁的設計系統重構與 `/visit/` head metadata 修正。

## 本輪處理

- 新增 `observe888-design-system.css`，把首頁定稿後的深檀木、奶霜底、低陰影、8px 卡片、CTA 與手機斷行規則整理成共用設計系統。
- `observe888-page-theme.css` 改成相容轉接檔，只 `@import` 新設計系統，避免舊頁或快取引用直接失效。
- 主要公開子頁、店點頁、服務頁、FAQ、短影音入口、隱私 / 資料頁、筆記分類與筆記文章頁改載 `observe888-design-system.css`。
- 子頁最外層容器補 `site-shell`，CTA 元素補 `cta` class；原本的 `shell`、`hub-shell`、`button` class 保留作相容層。
- 子頁 inline `:root` 不再定義舊色票 `#3f2e22` / `#2e5e4b` 或舊陰影，改接共用 token alias。
- 子頁舊漸層背景改為共用紙色底，避免首頁與子頁視覺斷裂。
- `/visit/` 補專用 title、description、OG、Twitter 與 canonical，且 head 前段即可讀到。

## 邊界

- 首頁 `index.html` 保留原本已定稿的可見層，不另外載入設計系統，以免覆蓋首頁既有 layout。
- 東區工作室仍依既有公開邊界處理：不要求公開門口、室內或可回推私人空間的實拍。
- 本輪未改 Google Business Profile、Search Console、Cloudflare 後台或任何廣告後台。

## 驗證

- 本機靜態讀回 42 個改到的 HTML：設計系統 CSS 相對路徑皆存在。
- 全部改到頁面的 JSON-LD 以 `ConvertFrom-Json` 解析通過。
- `/visit/` canonical count = 1，`og:url` count = 1。
- 本機 HTTP 讀回代表頁 `/about/`、`/visit/`、`/booking/`、`/faq/`、`/notes/`、`/contact/`、`/services/tainan-tuina/`、`/south/`、`/south/pricing/`、`/east/` 皆為 200。
- CDP mobile emulation 390px 讀回 `/visit/` 與代表文章頁，`scrollWidth` 等於 `clientWidth`，未見水平溢出元素。
- 已用 headless Chrome / CDP 輸出本機截圖到 `_local/visual-check-2026-06-25/`；該資料夾不進 Git。
