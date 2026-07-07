# ObserveGeoPages 工作規則

本 repo 是正式官網、公開店點頁、到店導航、FAQ、Google 商家一致性與公開內容的 source of truth。

## 先讀順序

1. `README.md`
2. `HANDOFF.md`
3. `..\docs\OPS_RULES_CURRENT.md`
4. 若任務涉及公開文案或首頁 / 店點頁語氣，再讀 `..\docs\CONTENT_VOICE_PRINCIPLE_2026-06-24.md`

## 硬規則

- 規則衝突時：live 公開面 / 後台讀回 > `..\docs\OPS_RULES_CURRENT.md` > 本 repo 文件。
- `SOUTH_HANDOFF.md`、`NORTH_HANDOFF.md` 是 2026-05-20 的歷史接手機器快照，不是現行規則入口；只有明確回查當時狀態才引用。
- 檔案裡出現的 `D:\見觀營運資料夾`、`C:\見觀營運資料夾` 是舊工作區語境，不是現在正式入口。
- 正式公開主詞用「結構調理」，不用「結構治療」；不要把公開頁面寫成防衛式免責聲明。
- 沒有新的公開面或後台讀回，不得宣稱排名、索引、Google 商家、預約流程或公開成效已改善。
- 對外地名只允許台南、台南南區、台南東區、灣裡、水交社、安平，以及官網公開店點 shorthand `南區` / `東區`；其中 bare `南區` / `東區` 只可指台南現有店點。
- 若本輪有改公開文案、標題、hashtag 或導流文字，交付前先跑：
  `powershell -ExecutionPolicy Bypass -File ..\tools\check_tainan_place_whitelist.ps1 -Paths <檔案路徑>`
- 只改本 repo 需要的檔案；若有 submodule commit，先在本 repo commit / push，再回頂層更新指標。
