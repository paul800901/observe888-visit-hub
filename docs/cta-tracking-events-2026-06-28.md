# 官網 CTA 事件追蹤補齊紀錄（2026-06-28）

目的：讓官網 LINE、電話、Google Maps、預約入口、Google Calendar 預約頁、到店導航入口點擊，至少能進入既有 `observe888_public` 事件管線，再由 AdsControl 同步成可判讀的弱訊號。

## 追蹤入口

- 前端設定：`observe888-tracking-config.js`
- 前端追蹤器：`observe888-tracking.js`
- GAS endpoint：`OBSERVE888_TRACKING_CONFIG.endpoint`
- AdsControl 同步：`02_廣告_AdsControl/tools/sync-observe888-public-leads.js`
- AdsControl 匯入 API：`POST /api/lead-events/import/observe888-public`

## 自動追蹤範圍

`observe888-tracking.js` 現在會在頁面載入後自動綁定尚未手動綁定的 `<a href>` CTA。

| CTA | 判斷條件 | event name 前綴 | cta_type | contact_channel |
| --- | --- | --- | --- | --- |
| LINE | `line.me`、`liff.line.me`、`lin.ee` | `click_line_*` | `line` | `LINE` |
| 電話 | `tel:` | `click_call_*` | `call` | `PHONE` |
| Google Maps | `google.com/maps`、`maps.google.*`、`maps.app.goo.gl` | `click_map_*` | `map` / `directions` | `MAP` |
| 預約入口 | URL path 含 `/booking/` | `click_booking_*` | `booking` | `BOOKING` |
| Google Calendar 預約頁 | `calendar.app.google`、`calendar.google.com/calendar/.../appointments/schedules/` | `click_booking_calendar` | `calendar_booking` | `BOOKING` |
| 到店導航入口 | URL path 含 `/visit/` | `click_visit_*` | `visit` | `VISIT` |

若頁面已用 `Observe888Tracker.bindTrackClick()` 手動綁定，追蹤器會保留原本事件，不重複綁定。若單一連結要排除自動追蹤，可加 `data-observe-auto-track="0"`。

## GA4 現況

`observe888-tracking-config.js` 已保留：

```js
googleAnalytics: {
  measurementId: 'G-VJ5LJNMW6Q'
}
```

AdsControl 透過 Google Ops API 已在 GA4 property `482789617` 建立 Web data stream：

- data stream：`properties/482789617/dataStreams/15163650392`
- display name：`Observe888 official website`
- default URI：`https://www.observe888.com`
- measurement ID：`G-VJ5LJNMW6Q`

官網事件現在會同時送到既有 GAS / AdsControl 管線與 GA4。GA4 是否開始出現 rows，需等公開站部署後有真實 page view / CTA event 再讀回確認。

## AdsControl 判讀

AdsControl 仍維持相容：公開站匯入後 `event_type` 主要為：

- `page_view`
- `line_click`
- `click`

細分類不要看 `event_type`，要看 `cta_type` / `contact_channel`：

- `line` / `LINE`
- `call` / `PHONE`
- `map`、`map_external`、`directions` / `MAP`
- `booking` / `BOOKING`
- `form` / `FORM`
- `visit` / `VISIT`

這些只代表公開站 CTA 弱訊號，不等於正式預約、到店或 Google Ads conversion。

## Meta Pixel 對應

- LINE CTA 的第一方／GA 事件仍維持 `click_line_*` 與 `line_click`，但 Meta Pixel 改送標準事件 `Lead`。
- 電話 CTA 仍送 Meta 標準事件 `Contact`，因此 Meta 的 LINE 最佳化不必混用電話事件。
- 不再送自訂 `LineClick`；Meta Pixel 會抑制未驗證的自訂事件，不能拿它作為廣告組合的最佳化訊號。
- LINE-only 落地頁改用 LINE 官方 `oaMessage` 深連結，直接開啟官方帳號對話並預填詢問時段文字，減少先加好友再自行輸入的摩擦。
