# ObserveGeoPages 交接

最後更新：2026-05-12

## 先讀什麼

1. `PROJECT_CONTEXT.md`
2. `README.md`
3. `SOUTH_HANDOFF.md`

## 這個工作目錄現在是什麼

- 這裡現在是 `ObserveGeoPages` 的品牌與文章官網
- 另一邊的到店導航官網 source 保持在 `D:\AdsControl\frontend\observe888-visit-hub.html`
- 兩邊是雙官網，不是同一個頁面硬切兩種用途

## 為什麼容易看錯

- 目前資料夾與 remote 仍沿用 `observe888-visit-hub`
- 這是歷史名稱，不是現在的專案定位
- 若只看 repo 名稱，很容易把角色判反

## 目前結構

- `index.html`：品牌與文章官網首頁
- `visit/index.html`：到店導航官網入口
- `about/index.html`：品牌介紹入口
- `observations/index.html`：舊入口過渡頁，會導向 `notes/`
- `notes/index.html`：公開文章列表
- `notes/*/index.html`：公開文章頁
- `drafts/second-batch/`：第二批草稿
- `north/`、`south/`、`north/pricing/`、`south/pricing/`：保留中的雙官網互連入口

## 2026-05-11 這輪已校正的事

- 文件已改回正確分工：`AdsControl` 那邊是到店導航官網，這邊是品牌與文章官網
- 根首頁已改成品牌與文章官網首頁
- 舊的 `?store=north` / `?store=south` 連結會導回 `visit/?store=north` 或 `visit/?store=south`
- `notes/` 已補到第二批，公開列表現為 19 篇文章與 4 頁主題總整理
- 第二批 `09` 到 `13` 已建立公開頁，並補進 `notes/index.html` 與 `sitemap.xml`

## 目前內容狀態

- `notes/` 目前已公開 19 篇文章與 4 頁主題總整理
- `drafts/second-batch/` 仍保留第二批 Markdown 工作稿
- 品牌內容首頁、`about/`、`notes/` 是目前主工作面；`observations/` 只保留舊入口過渡用途

## 如果接下來要做什麼

### 要做品牌內容工作

- 直接在這個工作目錄內續做
- 優先改 `index.html`、`about/`、`notes/`；若碰到舊連結相容性再看 `observations/`
- 後續新草稿公開前先做最終潤色與安全化

### 要做到店導航官網主流程

- 回 `D:\AdsControl`
- 尤其是 `frontend/observe888-visit-hub.html`

## 建議先驗證

- 首頁是否已呈現品牌內容庫定位
- `notes/` 列表、19 篇文章與 4 頁主題總整理是否可正常開啟
- 北區 / 南區橋接入口是否仍可正常導流
- LINE / 電話 CTA 是否仍指向正確目標
