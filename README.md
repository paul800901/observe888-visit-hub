# ObserveGeoPages 品牌與文章官網

這個專案目前承接 `ObserveGeoPages` 的品牌與文章官網；另一邊的微縮官網 / 到店導航官網則維持在 `AdsControl` 產線。

## 雙官網分工

- 到店導航官網：原本的微縮官網，維持在 `D:\AdsControl\frontend\observe888-visit-hub.html`
- 品牌與文章官網：這個專案 `D:\ObserveGeoPages\observe888-visit-hub`
- 兩邊都是官網，只是功能不同，而且會互相連結

## 為什麼資料夾名字還像舊專案

- 這份工作樹是從舊的 `observe888-visit-hub` 歷史快照拉下來的
- 目前 `origin` 仍是 `paul800901/observe888-visit-hub`
- 不要只看 repo 名稱判斷專案角色；以目前文件與首頁定位為準

## 目前這個官網放什麼

- `index.html`：品牌內容庫首頁
- `visit/index.html`：到店導航官網入口
- `about/index.html`：品牌理解入口
- `observations/index.html`：舊入口過渡頁，會導向 `notes/`
- `notes/index.html`：身體觀察筆記列表
- `notes/<article>/index.html`：公開文章頁
- `drafts/second-batch/`：第二批 Markdown 工作稿來源，`09` 到 `13` 已轉成公開頁

## 保留的互連入口

- `north/`、`south/`、`north/pricing/`、`south/pricing/`
- `visit/`
- `observe888-location-widget-snippet.html`
- `observe888-tracking-config.js`
- `observe888-tracking.js`

這些檔案目前保留作為雙官網互連與既有路徑相容用途。到店導航官網主 source 仍在 `AdsControl`。

## 內容工作原則

- 文章以品牌理解、身體觀察線索、搜尋入口內容為主
- 不把單一病名直接寫成確定結論或療效承諾
- 後續草稿先在 `drafts/second-batch/` 潤色，再決定是否逐篇公開
- 若要改到店導航官網互動、導航、追蹤主流程，請回 `AdsControl`

## 目前狀態

- 首頁已校正為品牌與文章官網首頁
- `notes/` 已公開第二批後共 19 篇文章與 4 頁主題總整理
- 第二批 `09` 到 `13` 已補進公開列表與 sitemap

## 接手時先讀

1. `PROJECT_CONTEXT.md`
2. `HANDOFF.md`
3. `SOUTH_HANDOFF.md`
