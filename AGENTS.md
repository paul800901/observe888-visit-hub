# ObserveGeoPages 現行工作路由

本 repo 是正式官網、公開店點頁、到店導航、FAQ、Google 商家一致性與公開內容的 source of truth。

## 按任務讀取

- 程式／頁面修改：先讀目標檔與相關測試；需要架構定位時才讀 `README.md` 的相符段落。
- 公開文案、首頁／店點頁語氣、GEO／AEO：讀 `..\docs\CONTENT_VOICE_PRINCIPLE_2026-06-24.md`，再讀實際要改的頁面。
- 部署、環境接手或既有流程故障：只讀 `HANDOFF.md` 的相符段落；它不是每次任務的必讀全文。
- 跨官網／廣告／社群規則衝突：讀 `..\docs\OPS_RULES_CURRENT.md`。一般頁面修改不必預先載入頂層完整規則。

## 公開面硬規則

- 優先序：live 公開面／後台讀回 > `..\docs\OPS_RULES_CURRENT.md` > 本 repo 現行檔案 > 歷史 handoff。
- `SOUTH_HANDOFF.md`、`NORTH_HANDOFF.md` 與舊 C／D 路徑只供歷史追溯，不是現行入口。
- 公開主詞用「結構調理」，不用「結構治療」；不寫診斷口吻、療效保證或防衛式免責堆疊。
- 對外地名只允許台南、台南南區、台南東區、灣裡、水交社、安平，以及官網既有店點 shorthand `南區`／`東區`；bare shorthand 只能指台南現有店點。
- 本輪改公開文案、標題、hashtag 或導流文字時，交付前執行：

  ```powershell
  powershell -ExecutionPolicy Bypass -File ..\tools\check_tainan_place_whitelist.ps1 -Paths <檔案路徑>
  ```

- 沒有新的公開面或後台讀回，不得宣稱排名、索引、Google 商家、預約流程、部署或公開成效已改善。

## 外部動作

- repo 內授權範圍的最小修改與本機測試可直接做；部署、Google 商家異動、公開發布、權限、Git push 或跨 repo／帳號操作需要同輪精確目標授權。
- 可用本機既有憑證完成已授權工作，但不得輸出、提交或轉送完整值。
- 外部動作後讀回實際 public URL／後台／deployment／remote；只有本機結果時回報 partial。
