# 見觀搜尋入口修復工程 - 2026-06-07

本文建立「見觀搜尋入口修復工程」的執行口徑。這不是短期救命藥，也不是大量 AI 發文，而是用 Search Console、Ads search terms、公開 SERP 與官網頁面結構持續校準搜尋入口。

## 工程定義

目標：

- 找出 Google 已經給見觀曝光、但沒有有效接住點擊或聯絡意圖的入口。
- 把高意圖搜尋導回正確頁面：服務頁、分店頁、費用頁、FAQ、到店頁。
- 逐步降低舊 PHP / 舊架構 URL 對搜尋入口的佔用。
- 讓 `身體結構評估`、`傳統整復推拿`、`台南整復`、`台南整骨`、`台南推拿` 這些入口詞各自有安全、清楚、可驗收的承接位置。

不做：

- 不做不存在的分店頁。
- 不做假推薦、假排行、競品攻擊頁。
- 不寫治療、根治、保證改善、醫療診斷。
- 不因單週波動大量改 title / meta。
- 不把舊資料講成最新 GSC 讀回。

## 2026-06-07 讀回狀態

2026-06-07 已用 Chrome profile `見觀結構整復所` 進入 Google Search Console，並從 `https://www.observe888.com/` property 匯出近 3 個月搜尋結果成效。

本輪已取得：

- `_local/gsc_exports/2026-06-07/查詢.csv`
- `_local/gsc_exports/2026-06-07/網頁.csv`
- `_local/gsc_exports/2026-06-07/圖表.csv`
- `_local/gsc_analysis/gsc-entry-repair-2026-06-07.md`

正式讀回紀錄見：

- `docs/search-console-entry-repair-readback-2026-06-07.md`

本次 GSC 可匯出的圖表日期範圍為 2026-03-03 至 2026-06-02；Search Console 畫面顯示上次更新時間為 `6 小時前`。因此這是 2026-06-07 當下 GSC 最新可匯出資料，不是到 2026-06-06 的完整資料。

## 已知基準

已驗證舊資料：

- 2026-05-20 GSC 顯示核心服務詞有實際曝光，問題不是完全沒搜尋需求，而是承接頁分散。
- 當時首頁仍吃最大量；`/services/tainan-tuina/` 尚未進入 GSC 頁面表。
- 舊 PHP / 舊架構 URL 仍有大量頁面維度曝光。
- 2026-05-27 Search Console URL 檢查顯示 `/services/tainan-tuina/` 已檢索但尚未建立索引；同日後續已手動要求建立索引。
- 2026-06-06 Ads 需求曝光池仍出現 `台南 整骨`、`台南 整復 推薦`、`整骨`、`台南 整骨 推薦`、`台南 整復`、`台南 運動 按摩` 等搜尋字。
- 2026-06-06 Ads 文案已改為 `身體結構評估`，南北被動 Search 合計日預算已壓到 100。

## 本輪新增工程工具

新增：

- `tools/analyze_gsc_export.py`
- `tools/README.md`

匯出放置位置：

```text
_local/gsc_exports/YYYY-MM-DD/
  查詢.csv
  網頁.csv
```

執行：

```powershell
python tools/analyze_gsc_export.py `
  --export-dir _local/gsc_exports/2026-06-07 `
  --output _local/gsc_analysis/gsc-entry-repair-2026-06-07.md `
  --date-label 2026-06-07
```

輸出會列出：

- 高曝光低 CTR 查詢。
- 排名 8-20 可推進查詢。
- 服務核心 / 身體結構查詢。
- 高曝光低 CTR 網頁。
- 舊 URL 殘留。
- 目標頁是否進表。

## 下次取得 GSC 匯出後的判讀順序

1. 先看 `/services/tainan-tuina/` 是否進入頁面表。
2. 看 `台南整復`、`台南整復推拿`、`台南整骨`、`台南推拿` 是否開始配到服務頁，而不是首頁或舊 URL。
3. 看 `身體結構評估`、`身體結構觀察`、`結構調理` 是否有新增曝光。
4. 看 `/paper/`、`/album/`、`/news/`、`.php` 舊 URL 曝光是否下降。
5. 抓高曝光低 CTR 且平均排名 3-12 的 query，優先修 title / meta description。
6. 抓排名 8-20 的 query，優先補內鏈與 FAQ，不先大量新增頁。

## 第一批修復候選

需等最新 GSC 匯出確認後再動公開頁；目前先列候選，不直接改：

| 優先 | 入口 | 可能承接頁 | 條件 | 動作 |
| --- | --- | --- | --- | --- |
| P0 | `/services/tainan-tuina/` 未進表 | 服務頁 | 最新 GSC 仍沒有頁面列 | 查 URL 檢查、sitemap、內鏈；不先重寫全文 |
| P0 | 舊 `.php` URL 仍高曝光 | Cloudflare / redirect | 最新 GSC 舊 URL 曝光仍高 | 補第二批 redirect 規則或索引清理紀錄 |
| P0 | `台南整骨推薦` / `台南整復推薦` CTR 低 | 服務頁 / FAQ | 排名不差但 CTR 低 | 微調 title/meta，維持中立選擇標準 |
| P1 | `整復所是什麼` 有曝光 | FAQ | 曝光上升但點擊低 | 補 FAQ，不做醫療院所混淆 |
| P1 | `身體結構評估` 有曝光 | 服務頁 / about / 分店頁 | GSC 開始出現 | 將 title/meta 與 H1 附近語意微調，不移除整復推拿入口 |
| P1 | `台南推拿` / `台南按摩` 流量品質差 | 服務頁 / FAQ | 點擊有、LINE 意圖弱 | 強化「不是純放鬆按摩店」的服務邊界 |
| P2 | notes 有曝光無點擊 | 對應 notes | 高曝光 note 進表 | 補第一段、內鏈到服務頁、FAQ 或分店頁 |

## 本輪不改公開頁的原因

目前缺的是最新 GSC query/page 配對。如果直接改 title / meta，等於憑 5 月資料與 Ads 字詞推測，容易把首頁、服務頁、分店頁改成互搶同一組詞。

本輪正確動作是：

- 建立可重跑分析器。
- 明確記錄 live 讀回卡住原因。
- 定義匯出資料落點與下次判讀順序。
- 等最新 GSC 匯出後，只挑 1-3 個最高價值入口動公開頁。

## 下一步

1. 用正確 Chrome profile 手動或半自動登入 GSC。
2. 匯出近 3 個月 `查詢.csv` 與 `網頁.csv` 到 `_local/gsc_exports/2026-06-07/` 或當日資料夾。
3. 執行 `tools/analyze_gsc_export.py`。
4. 將 `_local/gsc_analysis/` 的結果整理成 `docs/search-console-entry-repair-readback-YYYY-MM-DD.md`。
5. 只選 1-3 個公開頁修改，修改後讀回 live 頁與 JSON-LD。
