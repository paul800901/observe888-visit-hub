# ObserveGeoPages 交接

最後更新：2026-05-13

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
- `notes/index.html`：身體觀察筆記分類入口
- `notes/search-terms-overview/index.html`：檢查名詞與常見搜尋問法分類入口
- `notes/*/index.html`：公開文章頁
- `llms.txt`：AI/答案引擎用的站點導覽、官方店點資料與公開內容安全邊界
- `drafts/second-batch/`：第二批草稿
- `north/`、`south/`：北區店與南區工作室的可讀店點入口頁；`north/pricing/`、`south/pricing/`：服務與費用入口

## 2026-05-11 這輪已校正的事

- 文件已改回正確分工：`AdsControl` 那邊是到店導航官網，這邊是品牌與文章官網
- 根首頁已改成品牌與文章官網首頁
- 舊的 `?store=north` / `?store=south` 連結會導回 `visit/?store=north` 或 `visit/?store=south`
- `notes/` 當時已補到第二批，公開面曾是 19 篇文章與 4 個 overview 頁；2026-05-13 已改為 5 個分類入口
- 第二批 `09` 到 `13` 已建立公開頁，並補進 `notes/index.html` 與 `sitemap.xml`

## 2026-05-13 這輪已校正的事

- `notes/index.html` 已從文章清單頁改成 5 個分類入口
- 5 個入口為：頭頸與肩頸、脊椎/腰背/骨盆、手臂/手腕/手麻、髖/膝/腳與走路承重、檢查名詞與常見搜尋問法
- 新增 `notes/search-terms-overview/index.html`，承接骨刺、神經壓迫、坐骨神經痛、椎間盤突出、腰椎退化、腕隧道症候群等搜尋問法
- 原本 4 個 overview 頁已改成第二層分類入口語氣，不再稱為「主題總整理」
- 19 篇文章頁的回流段落已改成「所屬分類入口」
- `index.html` 與 `observations/index.html` 已同步改成先導向分類入口，不再把訪客直接導向完整文章清單
- 新增 `llms.txt`，作為 AI/答案引擎可讀的補充導覽，並列入官方店點資料；不代表保證被任何平台採用

## 目前內容狀態

- `notes/` 目前已公開 19 篇文章與 5 個分類入口
- `llms.txt` 已列出主入口、官方店點資料、5 個分類入口、19 篇文章與安全文案邊界
- `drafts/second-batch/` 仍保留第二批 Markdown 工作稿
- 品牌內容首頁、`about/`、`notes/` 是目前主工作面；`observations/` 只保留舊入口過渡用途

## 如果接下來要做什麼

### 要做品牌內容工作

- 直接在這個工作目錄內續做
- 優先改 `index.html`、`about/`、`notes/`；若碰到舊連結相容性再看 `observations/`
- `notes/` 第一層要維持分類入口，不要退回直接列出全部文章
- 後續新草稿公開前先做最終潤色與安全化

### 要做到店導航官網主流程

- 回 `D:\AdsControl`
- 尤其是 `frontend/observe888-visit-hub.html`

## 建議先驗證

- 首頁是否已呈現品牌內容庫定位
- `notes/` 5 個分類入口、19 篇文章與 `search-terms-overview/` 是否可正常開啟
- 北區 / 南區橋接入口是否仍可正常導流
- LINE / 電話 CTA 是否仍指向正確目標
