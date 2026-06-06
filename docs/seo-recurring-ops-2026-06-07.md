# 見觀 SEO 週期任務 - 2026-06-07

本文記錄「見觀搜尋入口修復工程」的固定週期任務。這是提醒與半自動資料處理流程，不是自動改公開頁流程。

## 任務名稱與節奏

| 任務 | 排程 | 腳本模式 | 目的 |
| --- | --- | --- | --- |
| 見觀 SEO 週檢 | 每週六 11:00 | `Weekly` | 取得最新 GSC 匯出、重跑搜尋入口分析 |
| 見觀 SEO 雙週修復窗口 | 每兩週六 11:05，第一個窗口為 2026-06-27 | `Repair` | 只在有足夠 GSC 證據時，挑 1-3 個公開頁小修 |
| 見觀搜尋入口月盤點 | 每月第一個週六 11:10 | `Monthly` | 舊 URL、服務頁、FAQ、GBP、Maps、Ads 搜尋字交叉看 |

說明：

- 因 2026-06-07 已做第一輪公開頁微調，雙週修復窗口第一個安全週六設為 2026-06-27。
- 本機 PowerShell 工作排程沒有直接使用「每月第一個週六」trigger；實作上註冊為每週六 11:10 觸發，腳本只在每月第一個週六提醒，其餘週六安靜略過。

## 已新增工具

- `tools/run_seo_recurring_check.ps1`
- `tools/register_seo_recurring_tasks.ps1`

週檢腳本會：

1. 建立當天資料夾 `_local/gsc_exports/YYYY-MM-DD/`。
2. 開啟 Google Search Console 成效頁。
3. 開啟當天本機匯出資料夾。
4. 若找到 `查詢.csv` 與 `網頁.csv`，執行 `tools/analyze_gsc_export.py`。
5. 將分析輸出到 `_local/gsc_analysis/gsc-entry-repair-YYYY-MM-DD.md`。
6. 將本次執行紀錄寫到 `_local/seo_task_logs/`。

`_local/` 不進 Git；GSC 匯出 CSV、分析暫存與排程 log 都留在本機。

## 手動註冊或重註冊排程

在官網 repo 根目錄執行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\register_seo_recurring_tasks.ps1
```

檢查排程：

```powershell
Get-ScheduledTask -TaskPath "\見觀營運\" |
  Where-Object TaskName -like "見觀*" |
  Select-Object TaskName, State
```

## 手動跑週檢

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\run_seo_recurring_check.ps1 -Mode Weekly
```

不開瀏覽器與資料夾，只測腳本：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\run_seo_recurring_check.ps1 -Mode Weekly -NoOpen
```

## 每週要做什麼

1. 週六 11:00 排程跳出時，到 Search Console `https://www.observe888.com/` property。
2. 篩選 `搜尋類型：網路`、時間預設用最近 3 個月。
3. 匯出 CSV，至少把 `查詢.csv`、`網頁.csv` 放到當天 `_local/gsc_exports/YYYY-MM-DD/`。
4. 若有 `圖表.csv` 一起放入，分析總量會以 `圖表.csv` 為準。
5. 重跑週檢腳本或等腳本偵測後產出 `_local/gsc_analysis/gsc-entry-repair-YYYY-MM-DD.md`。

## 每兩週修復窗口要做什麼

修公開頁前先確認：

- 是否有最新 `查詢.csv` / `網頁.csv`。
- 是否有 2 週以上的觀察間隔。
- 是否能明確說出要修哪個入口，不是憑感覺改全站。

允許：

- title / meta description 小幅改寫。
- FAQ 補 1-3 題。
- 內鏈文字調整。
- 舊 URL 轉址或索引狀態紀錄。

不允許：

- 大量 AI 發文。
- 單週波動就重寫整頁。
- 自稱排名改善。
- 寫治療、根治、保證改善、醫療診斷。

## 每月大盤點要看什麼

每月第一個週六，把以下來源交叉看：

- GSC：高曝光低 CTR 查詢 / 網頁、排名 8-20、舊 URL 殘留。
- 官網：服務頁、分店頁、費用頁、FAQ、內鏈、sitemap。
- GBP：商家描述、服務項目、貼文、照片、評論語言；沒有後台或公開面讀回前不宣稱已改善。
- Maps：固定條件讀回自然排名，廣告出現不算自然排名。
- Ads：搜尋字與線索品質，只拿來校準自然搜尋入口，不把便宜客流量當成高品質證據。

月盤點輸出應另建正式讀回文件，不只留 `_local` 分析檔。
