# Google Business / Maps 南區接手交接 - 2026-05-21

## 目的

2026-05-21 在南區機器接手時，先回查北區 Google Business Profile 照片審查狀態；若照片已通過或大多不再顯示 `正在等候審查`，再發第一則北區 Google 商家貼文。

這份交接只處理 Google Business / Maps 照片與貼文，不處理官網改版、Cloudflare、Search Console 或 Google Ads。

## 先讀

1. `SOUTH_HANDOFF.md`
2. `docs/google-business-readback-2026-05-19.md`
3. `docs/google-business-photo-refresh-2026-05-20.md`
4. 本檔

## 工作入口

- 南區機器先使用目前正式 ObserveGeoPages 工作目錄；舊交接記錄曾寫 `D:\見觀營運資料夾\01_官網_ObserveGeoPages`，本次北區操作所在目錄是 `C:\見觀營運資料夾\01_官網_ObserveGeoPages`。接手時先確認實際存在的正式 checkout，再同步到最新狀態。
- Google 帳號：使用可管理見觀兩店的 `observe88888@gmail.com`。
- 北區商家：`見觀結構調理整復所-北區店`。

## 已完成狀態

- 2026-05-20 已整理北區店內照片素材。
- `01_maps_upload_priority` 12 張已人工上傳到北區 Google 商家相片。
- `02_maps_upload_secondary` 13 張已人工上傳到北區 Google 商家相片。
- 合計 25 張已上傳。
- Google 相片上傳 UI 實測限制：單批最多 3 張；一次 4 張會失敗，但可以連續分批上傳。
- 使用者截圖顯示部分照片仍為 `正在等候審查`。
- 尚未驗證公開 Google Maps / 無痕照片牆，因此不能宣稱 25 張已公開顯示，也不能宣稱 Maps 排名已改善。

## 素材位置

優先使用 Google Drive：

```text
G:\我的雲端硬碟\Observe888_GBP_PhotoAssets\2026-05-20-north-store
```

本機整理副本：

```text
C:\見觀營運資料夾\01_官網_ObserveGeoPages\_local\gbp-photo-assets\2026-05-20-north-store
```

分類：

- `01_maps_upload_priority`：已上傳，不要重傳。
- `02_maps_upload_secondary`：已上傳，不要重傳。
- `03_post_candidates`：保留給 Google 商家貼文。
- `04_hold_internal`：先不要上傳，也不要當貼文素材。

## 2026-05-21 最小工作

1. 開 Google 搜尋或 Google 商家管理面板，進入 `見觀結構調理整復所-北區店`。
2. 進入 `相片和影片` 或相片管理工具。
3. 回查 2026-05-20 新上傳的照片是否仍顯示 `正在等候審查`。
4. 若多數照片仍在審查，只記錄狀態，不發貼文。
5. 若照片已通過或大多不再顯示審查狀態，發第一則北區 Google 商家貼文。

## 第一則貼文設定

- 商家：只發北區店，不要複製到南區。
- 類型：`更新`。
- 圖片：只選 `03_post_candidates` 裡 1 張，優先使用 `north-previsit-questions-window-01.jpg`。
- CTA：`瞭解詳情`。
- 連結：`https://www.observe888.com/visit/?store=north`。

建議文案：

```text
第一次到北區店前，可以先確認服務方式、費用、預約與到店動線。見觀結構北區店以身體結構觀察、徒手調理、傳統整復推拿與日常保養建議為主，預約前可先看北區到店資訊，判斷時間與交通是否方便。
```

## 發完後要記錄

更新 `docs/google-business-readback-2026-05-19.md` 或新增當日讀回紀錄，至少寫清楚：

- 讀回時間。
- 是否仍有照片顯示 `正在等候審查`。
- 是否發出北區貼文。
- 使用哪一張圖片。
- CTA 與連結。
- 是否有在 Google 搜尋 / Maps 公開面讀到；沒有讀到就寫未驗證。

## 不能做

- 不要重傳 `01_maps_upload_priority` 或 `02_maps_upload_secondary`。
- 不要上傳 `04_hold_internal`。
- 不要一次把 `03_post_candidates` 5 張全部用完。
- 不要在照片仍大量審查時急著發貼文。
- 不要把後台已上傳說成公開 Maps 已顯示。
- 不要宣稱照片或貼文已改善 Google Maps 排名，除非有新的公開面排名讀回。
