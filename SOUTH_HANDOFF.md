# 南區接手交接

最後更新：2026-05-13

## 先講最重要的

這個工作目錄現在是正式官網總控，也包含南區店的官方店點頁、到店導航、預約與費用頁、Google 商家資料一致性與照片素材盤點。

舊規則「南區到店導航官網 source 在 AdsControl」已作廢。AdsControl 只保留廣告、事件匯入、lead sync、監測與報表。

## 2026-05-13 跨專案大改結論

這次同時整理了兩個專案，但責任邊界已經切清楚：

- 官網、到店導航、北區 / 南區店點頁、Google 商家資料一致性、FAQ、GEO / AEO、`llms.txt`：全部回到 `C:\ObserveGeoPages\observe888-visit-hub`。
- AdsControl：只保留 Google Ads、追蹤事件匯入、lead sync、監測、報表與廣告素材流程。
- 不要再從 AdsControl 產出或覆蓋正式官網頁面。

已推上 GitHub：

- ObserveGeoPages 最新提交：`0107e27 Align website location data with Google Business readback`
- AdsControl 最新提交：`c64e114 Deprecate legacy Observe888 website bundle build`

已線上回讀確認：

- `https://www.observe888.com/south/`
- `https://www.observe888.com/visit/`
- `https://www.observe888.com/north/`
- `https://www.observe888.com/llms.txt`
- `https://www.observe888.com/docs/google-business-visible-readback-2026-05-13.md`

Google 商家目前只完成「外部 Chrome 截圖可見欄位」回讀，不是完整後台欄位驗證。紀錄在：

- `docs/google-business-visible-readback-2026-05-13.md`

## 南區相關主檔

- `south/index.html`：南區店官方店點頁。
- `south/pricing/index.html`：南區預約與費用說明。
- `visit/index.html`：到店導航入口，`?store=south` 會切到南區。
- `observe888-location-widget-snippet.html`：雙店導航元件，含南區地址、電話、地圖與路線資料。
- `assets/gmb/`：目前已放入部分南區 Google 商家圖片素材。
- `docs/website-operations.md`：南區資料一致性與 Google 商家工作清單。

## 南區正式資料

- 對外名稱：見觀結構調理整復所-南區店
- 地址：702 台南市南區明興路 673 號
- 電話：0973-728-670
- 電話連結：`tel:0973728670`
- 店點頁：`https://www.observe888.com/south/`
- 導航助手：`https://www.observe888.com/visit/?store=south`
- 預約與費用：`https://www.observe888.com/south/pricing/`
- 服務方式：建議先以 LINE 或電話確認可安排時段

## 南區下一步

- 回讀 Google 商家後台，確認南區名稱、分類、服務項目、描述、照片、網站 URL 是否與官網一致。
- 回南區店後，先開 Google 搜尋的南區商家管理面板，依序點 `編輯檔案`、`編輯服務`、`相片`、`設定檔`，每頁截圖後再比對。
- Google 商家可見面板已確認南區公開名稱是 `見觀結構調理整復所-南區店`，所以官網已從「南區工作室」改為「南區店」；「工作室形式」只保留作為服務方式描述。
- 補足南區實景照片素材盤點：路口、門牌、入口、室內、動線、可辨識但不誇張修飾的照片。
- 若改地址、電話、地圖或預約文案，必須同步檢查 `south/`、`south/pricing/`、`visit/`、widget、`llms.txt`。
- FAQ 若提到南區，應以「預約制工作室、先 LINE 或電話確認時段」為核心，不寫成固定排班。

## AdsControl 接手注意

AdsControl 這次只做邊界收斂，不再負責正式官網：

- `README.md` 已補上 Observe888 官網邊界。
- `tools/build-observe888-public.js` 已加防呆，預設執行會失敗，避免舊 bundle 蓋回官網。
- 只有明確要檢查舊資料時，才可設定 `ADSCONTROL_ALLOW_LEGACY_OBSERVE888_BUILD=1`。
- 南區店開發機若使用舊路徑，依 AdsControl README 仍是 `D:\AdsControl`；本次北區這台實際操作路徑是 `C:\AdsControl`。

## 不能做的事

- 不要用 AdsControl 舊 bundle 覆蓋南區頁面。
- 不要只改南區頁，卻忘記同步 widget、`llms.txt` 或 JSON-LD。
- 不要在南區文案中使用治療、根治、保證改善、成功案例前後對比。
- 不要在未回讀 Google 商家後台前宣稱商家檔案已完成。
- 不要把外部 Chrome 截圖回讀說成完整 Google 商家後台驗證。
