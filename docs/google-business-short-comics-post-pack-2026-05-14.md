# Google Business Profile 短漫貼文發布包

建立日期：2026-05-14

用途：把「身體觀察短劇」整理成 Google 商家檔案可用的短貼文，並保存本次外部平台上架紀錄。

## 使用原則

- Google 商家檔案貼文不適合一次密集洗版，建議每 2 至 3 週於北區、南區各同步更新一篇。
- 本輪外部上架採保守節奏：先上架第 1 集作為短漫入口測試，其他集數列為後續排程。
- 連結優先使用正式官網短漫頁：`https://www.observe888.com/comics/`。
- 文案只寫身體觀察、承重線索與服務前理解，不寫治療、診斷、療效保證或根因確診。

## 本輪上架內容

### 第 1 集：腳底篇

建議用途：北區、南區 Google 商家檔案各 1 則最新動態。

貼文內文：

```text
有很多問題，其實是從「腳底失去支撐」開始的。當腳底不穩，骨盆和腰背就必須緊急代償，原本該放鬆的肌肉只好出來硬撐。我們不會只推拿痠痛的地方，而是陪你一起看懂承重卡關的線索。
```

CTA：瞭解詳情

連結：`https://www.observe888.com/comics/`

建議圖片：

- `D:\見觀營運資料夾\03_社群_ObserveSocialAutopilot\data\AI短漫劇 第一部\第01集 腳底篇\0.png`
- `D:\見觀營運資料夾\03_社群_ObserveSocialAutopilot\data\AI短漫劇 第一部\第01集 腳底篇\2.png`

## 後續排程素材

### 第 3 集：為什麼總是某一側的鞋底先磨平？

貼文內文：

```text
鞋底總是同一邊先磨平，真的只是鞋子的問題嗎？這往往代表走路時的「承重」發生了偏移，讓特定部位提早累積負擔。找回身體均衡的重力分配，是整理緊繃反覆發生線索的關鍵。
```

CTA：立即預約

連結：`https://www.observe888.com/comics/`

建議圖片：EP03_P1、EP03_P2

### 第 5 集：明明只是走路，骨盆怎麼也這麼忙？

貼文內文：

```text
走路不是只有「腳」在動，骨盆、腰背都在暗中分工與承重。如果骨盆卡住了，你可能會發現走路走久後，某一塊腰部肌肉特別容易痠。見觀結構會協助你整理這些代償路線。
```

CTA：瞭解詳情

連結：`https://www.observe888.com/comics/`

建議圖片：EP05_P1、EP05_P4

### 第 8 集：檢查，不是只看不舒服的地方

貼文內文：

```text
來到見觀結構，我們不會一開始就只急著看痛點。痛點往往是被過度使用的結果。我們會請你站起來、感受走路的轉移，從承重路線裡整理真正卡住的線索。
```

CTA：瞭解詳情

連結：`https://www.observe888.com/comics/`

建議圖片：EP08_P1、EP08_P2

### 第 10 集：是哪個動作，把卡感帶回來的？

貼文內文：

```text
調理後回到生活，如果卡感又出現，不一定代表「無效」。請先注意是哪個動作把卡感帶出來，例如從椅子起身。這些生活線索，常常是下一次判斷承重異常的重要資料。
```

CTA：立即預約

連結：`https://www.observe888.com/comics/`

建議圖片：EP10_P1、EP10_P3

## 外部上架紀錄

| 日期 | 平台 | 店點 | 內容 | 狀態 | 讀回 / 證據 |
| --- | --- | --- | --- | --- | --- |
| 2026-05-14 | Google Business Profile | 北區店 | 第 1 集腳底篇貼文 | 已上架：文字與連結 | 23:24 Asia/Taipei 使用已登入 `observe88888@gmail.com` 的 Google Business Profile 瀏覽器後台建立；貼文列表讀回新文案，發布時間顯示「25 秒前」；CTA 設定為「瞭解詳情」，連結 `https://www.observe888.com/comics/`；圖片未上傳，因 Codex in-app browser 回報不支援檔案上傳 |
| 2026-05-14 | Google Business Profile | 南區店 | 第 1 集腳底篇貼文 | 已上架：文字與連結 | 23:24 Asia/Taipei 使用已登入 `observe88888@gmail.com` 的 Google Business Profile 瀏覽器後台建立；貼文列表讀回新文案，發布時間顯示「25 秒前」；CTA 設定為「瞭解詳情」，連結 `https://www.observe888.com/comics/`；Google 顯示「複製貼文」到北區時已選「略過」，避免重複發布；圖片未上傳，因 Codex in-app browser 回報不支援檔案上傳 |

2026-05-14 23:44 Asia/Taipei 補充：使用者在外部 Chrome 手動進入南北區貼文編輯頁，為本輪貼文補上封面圖 `D:\見觀營運資料夾\03_社群_ObserveSocialAutopilot\data\AI短漫劇 第一部\第01集 腳底篇\0.png`。Codex 工具端當下只能在南區 Google Business Profile 貼文列表讀回文字貼文，未能獨立讀回縮圖 DOM，因此圖片狀態以使用者操作回報為準；不要因此重發貼文或重複複製到另一店。

## 權限檢查紀錄

2026-05-14 22:31 Asia/Taipei 已檢查：

- 本 repo 沒有 `.env`。
- AdsControl `.env` 只有 Google Ads API 相關 OAuth 欄位，沒有 Google Business Profile / GMB / My Business API 欄位。
- 使用 AdsControl OAuth refresh token 換取 access token 後，`tokeninfo` 回讀 scope 只有 `https://www.googleapis.com/auth/adwords`。
- 使用該 token 呼叫 Google Business Profile Account Management API：`403 ACCESS_TOKEN_SCOPE_INSUFFICIENT`。

結論：目前這台工作區可以實際寫 Google Ads，但不能透過現有 OAuth/API token 寫 Google Business Profile。GMB API 上架需要其中一種條件：

- 可操作的已登入 Google Business Profile 後台瀏覽器控制權；或
- 具備 `https://www.googleapis.com/auth/business.manage` scope 的 OAuth token / API flow；或
- 已安裝並授權的 Google Business Profile connector。

2026-05-14 23:24 Asia/Taipei 後續已使用第一種條件完成本輪南北區貼文上架：可操作的已登入 Google Business Profile 後台瀏覽器控制權。這不代表 API scope 已修復；後續若要自動化仍需 `business.manage` scope 或專用 connector。

## 注意事項

- Google 商家後台儲存成功不等於公開搜尋或地圖面板立即顯示，公開面可能有審核與快取延遲。
- 若貼文需要圖片但後台上傳受阻，可先上架文字與連結，並記錄圖片未上傳原因。
- 若後台要求重新登入或權限不足，停止於送出前並回報，不猜測已完成。
