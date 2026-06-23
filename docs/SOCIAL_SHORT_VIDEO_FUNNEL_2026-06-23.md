# 見觀短影音與官網回流規則

日期：2026-06-23

## 目的

FB、IG、YouTube Shorts 與短篇文章是曝光入口，不是最終承接點。任何短影音或文章如果沒有把人帶回官網，就容易只得到觀看，沒有形成預約、費用確認、導航或服務理解。

本專案將 `/shorts/` 定義為短影音通用回流入口；若短影音主題已經很明確，也可以直接導向更精準的官網頁面。

## 主要入口

- 通用短影音回流：`https://www.observe888.com/shorts/`
- 已經想預約：`https://www.observe888.com/booking/`
- 想先確認費用：`https://www.observe888.com/south/pricing/`
- 要出發到店：`https://www.observe888.com/visit/`
- 想比較服務方式：`https://www.observe888.com/services/tainan-tuina/`
- 想看身體觀察內容：`https://www.observe888.com/notes/`

## 發文導流原則

1. 每一支短影音、每一篇短文或文章，都要有一個官網下一步。
2. 不確定要導去哪裡時，先導 `/shorts/`，讓使用者再選預約、費用、導航或服務說明。
3. 內容主題明確時，直接導精準頁：
   - 預約型內容：導 `/booking/`
   - 費用型內容：導 `/south/pricing/`
   - 店點、交通、南區 / 東區內容：導 `/visit/`
   - 台南整復推拿、服務比較、見觀做法、結構調理內容：導 `/services/tainan-tuina/`
   - 身體觀察、搜尋問法、文章型內容：導相關 `notes/` 分類或文章
4. 社群貼文文案可以用接地氣的常見說法，例如肩頸腰背四肢卡緊、閃腰、落枕、運動拉傷、跌打扭傷、骨刺酸痛、久坐卡卡。這些是使用者描述入口，不寫成見觀保證處理、治療或診斷。
5. 急性外傷、明顯無力、大小便異常、發燒感染、快速惡化或嚴重不尋常症狀，社群與官網都應提醒先尋求醫療評估。

## 短影音平台端放置位置

- 頻道 / 個人檔案 / 粉專簡介：放固定官網回流入口 `https://www.observe888.com/shorts/`。
- YouTube Shorts 說明欄：放本支影片對應的官網下一步；主題不明確時放 `/shorts/`。
- IG Reels 文字說明或個人檔案連結：放 `/shorts/` 或該支主題對應頁，避免只寫「私訊」。
- Facebook Reels / 貼文文字：放 `/shorts/` 或該支主題對應頁；若平台限制連結顯示，仍要在文案中寫清楚「官網可看預約、費用與導航」。
- 影片畫面結尾可以加一句短 CTA，例如「預約、費用、導航看官網 observe888.com/shorts」，不要把整支片變成廣告口吻。
- 置頂留言或第一則留言可再放一次官網下一步，特別是 YouTube Shorts 與 Facebook Reels。

## 來源標記建議

可在官網連結後加 `source` 或 UTM，方便之後判斷短影音是否真的有導回官網。

- Instagram Reels 通用：`https://www.observe888.com/shorts/?source=ig_reel`
- Facebook Reels 通用：`https://www.observe888.com/shorts/?source=fb_reel`
- YouTube Shorts 通用：`https://www.observe888.com/shorts/?source=youtube_short`
- 主題型預約：`https://www.observe888.com/booking/?source=ig_reel_shoulder_neck`
- 主題型費用：`https://www.observe888.com/south/pricing/?source=fb_reel_fee`
- 主題型導航：`https://www.observe888.com/visit/?source=youtube_short_visit`

若使用完整 UTM，也可以採：

`?utm_source=instagram&utm_medium=short_video&utm_campaign=shoulder_neck`

## 官方社群連結

- 官網 repo 目前已有 Instagram、Facebook、Threads 官方連結。
- Instagram：`https://www.instagram.com/observe.tw/`
- Facebook：`https://www.facebook.com/profile.php?id=61589375001647`
- Threads：`https://www.threads.net/@sl800901`
- YouTube 頻道：`https://www.youtube.com/@observe88888`
- YouTube Shorts：`https://www.youtube.com/@observe88888/shorts`

## 驗收方式

- 新短影音發布前，先確認文案或簡介有官網下一步。
- 若短影音主題不明確，至少導 `/shorts/`。
- 若短影音主題明確，導到對應的預約、費用、導航、服務或文章頁。
- 定期從網站事件或流量來源檢查 `source=ig_reel`、`source=fb_reel`、`source=youtube_short` 是否有實際回流。
