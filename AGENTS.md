# 官網 repo 工作路由

本 repo 是公開的，`main` 的每個檔案都會直接出現在 `www.observe888.com/<路徑>`。**不要在這裡新增任何內部文件、紀錄、交接、草稿或 `.md` 說明。**

- 官網規則（上線方式、店點資料、公開文案、Google 商家、搜尋、追蹤、修改流程）：讀 `..\docs\website\WEBSITE_RULES_CURRENT.md`。
- 官網的紀錄、參考、草稿與封存：放 `..\docs\website\` 底下的 `logs\`、`reference\`、`drafts\`、`archive\`。
- 本機檢查輸出與 GSC 匯出放 `_local\`（已 gitignore）。
- push 到 `main` 就等於上線，需要本任務範圍內的明確授權；push 後讀回正式網址。
- 對外文字交付前執行 `powershell -ExecutionPolicy Bypass -File ..\tools\check_tainan_place_whitelist.ps1 -Paths <檔案路徑>`。
