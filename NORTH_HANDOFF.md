> status: snapshot
> decided: 2026-07-07
> superseded_by: README.md, HANDOFF.md, ..\docs\OPS_RULES_CURRENT.md
> note: 2026-05-20 North-side handoff snapshot kept for historical context only.

# 北區接手快照

> 歷史快照（2026-07-07）：本檔是 2026-05-20 的北區接手快照，保留當時操作脈絡與讀回結果，不得作為現行規則入口。現行入口先讀 `README.md`、`HANDOFF.md`、頂層 `..\docs\OPS_RULES_CURRENT.md`；檔內舊工作區路徑只代表當時語境，不是現在正式入口。

最後更新：2026-05-20

## 北區接手第一步

北區電腦正式路徑：

```text
C:\見觀營運資料夾\01_官網_ObserveGeoPages
```

到北區後先做：

```powershell
cd C:\見觀營運資料夾\01_官網_ObserveGeoPages
git pull --ff-only origin main
git status --short
```

然後先讀：

1. `NORTH_HANDOFF.md`
2. `HANDOFF.md`
3. `docs/google-business-storefront-source-photos-2026-05-20.md`
4. `docs/google-business-route-parking-booking-prompts-2026-05-20.md`

## 目前狀態

- 南區電腦已把目前工作推到 `origin/main`。
- Cloudflare 301 已驗收通過；現在不要再改 DNS、HiNet 或 Cloudflare 規則，後續只看 Search Console 舊 `.php` URL 轉移。
- Google Business Profile 第一輪 Maps 相關性修正已送出：南北店服務項目與商家描述已補，正在等 Google 審核，不可宣稱 Maps 排名已改善。
- Google Business Profile 南北店相片已補一輪：北區 12 張、南區 12 張。南區曾有一張門面照方向錯誤，已重產、刪錯圖、補正圖，目前等 Google 審核。
- 已建立真實門店底圖包：`assets/gmb/storefront-source-photos-2026-05-20/`，北區 4 張、南區 4 張，不含 AI 產圖。
- 已建立圖卡提示詞：`docs/google-business-route-parking-booking-prompts-2026-05-20.md`，共 8 張方向：北區到店、北區停車、北區費用預約、南區到店、南區停車、南區費用預約、第一次來流程、聯絡與導航方式。

## 目前正在做的主線

主線是補 Google Business / Maps 的資訊品質，不是改網站架構。

下一步應該先做圖卡審核與整理：

1. 使用 `assets/gmb/storefront-source-photos-2026-05-20/` 的真實照片當底圖。
2. 讓網頁版 GPT 只加下方資訊卡，不要重畫店面、招牌、門口、路邊車輛與建築。
3. 圖卡文字要先檢查地址、錯字、醫療詞。
4. `GBP 相片` 區不要一次大量上傳圖卡；真實照片仍是主體，圖卡最多先少量測試。
5. `GBP 貼文` 與社群圖文比較適合用這類資訊圖卡。

## 已確認的圖卡判斷

- 北區入口圖卡方向可用，但文字必須用 `台南市`，不要用 `臺南市`。
- 不要使用「加入聊天」這種 CTA；不自然，也不適合 GBP 相片。
- 北區入口建議文字：

```text
北區店入口
704 台南市北區華德里北安路一段 211 號
先看門口與招牌，再直接導航
```

- 北區到店提醒建議文字：

```text
北區到店提醒
先確認門口與路邊狀況
提早幾分鐘到，現場比較從容
```

- 南區入口建議文字：

```text
南區店入口
702 台南市南區明興路 673 號
預約制工作室，先確認時段再出發
```

## 仍在等待

- 等 Google 審核 GBP 服務項目、商家描述、南區修正版相片。
- 等公開 Google Search / Maps 顯示新資料後再驗收排名與相片排序。
- 等 Search Console 反映舊 `.php` URL 301 轉移。

## 不要做

- 不要改 DNS、HiNet、Cloudflare 規則。
- 不要重發已發布的服務頁導流 GBP 貼文。
- 不要把 AI 重畫背景的圖卡大量上到 GBP 相片。
- 不要把 `物理治療`、`復健`、`治療`、`矯正` 寫成見觀提供的服務。
- 不要把 `.env.redirect.local` 或任何帳密印出來。
