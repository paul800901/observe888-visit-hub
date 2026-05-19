# Google Business 真實門店底圖包 - 2026-05-20

## 目的

- 提供網頁版 GPT 產製 Google Business 圖卡時使用的真實門店底圖。
- 圖卡可以加下方資訊卡，但不要重畫店面、招牌、門口、路邊車輛或建築。
- 本包只收真實照片，不放 AI 產圖。

## 位置

- 底圖資料夾：`assets/gmb/storefront-source-photos-2026-05-20/`
- 檢查圖：`assets/gmb/storefront-source-photos-2026-05-20/storefront-source-contact-sheet.jpg`
- 索引：`assets/gmb/storefront-source-photos-2026-05-20/manifest.csv`

## 建議用法

| 檔案 | 建議用途 |
| --- | --- |
| `north/01-north-storefront-night-real.jpg` | 北區入口圖卡首選底圖 |
| `north/02-north-storefront-front-real.jpg` | 北區路線 / 到店提醒備用底圖 |
| `north/03-north-waiting-area-real.jpg` | 北區第一次來 / 預約流程底圖 |
| `north/04-north-opening-hours-real.jpg` | 北區營業時間 / 到店提醒備用底圖 |
| `south/01-south-storefront-building-real.jpg` | 南區入口圖卡首選底圖 |
| `south/02-south-storefront-front-real.jpg` | 南區路線 / 到店提醒備用底圖 |
| `south/03-south-interior-entry-real.jpg` | 南區第一次來 / 預約流程底圖 |
| `south/04-south-event-booth-real.jpg` | 共用聯絡 / 外部活動備用底圖 |

## 給網頁版 GPT 的通用指令

```text
請使用我上傳的真實門店照片作為背景，不要重畫店面、不要改招牌、不要改門口、不要改路邊車輛與建築，只在下方加一塊乾淨資訊卡。輸出 1080x1350、4:5、JPG。

風格：乾淨、可信、Google 商家可用，深綠＋米白＋木質色。不要使用 Google logo、LINE logo，不要仿 Google Maps 介面。不要出現：治療、療效、復健、物理治療、矯正、保證改善。
```

## 北區入口文字

```text
北區店入口
704 台南市北區華德里北安路一段 211 號
先看門口與招牌，再直接導航
```

## 北區到店提醒文字

```text
北區到店提醒
先確認門口與路邊狀況
提早幾分鐘到，現場比較從容
```

## 南區入口文字

```text
南區店入口
702 台南市南區明興路 673 號
預約制工作室，先確認時段再出發
```

## 南區到店提醒文字

```text
南區到店提醒
先確認時段與門牌
路邊停靠依現場狀況為準
```

## 注意事項

- Google Business `相片` 區仍以真實照片為主，資訊圖卡只少量測試。
- Google Business `貼文` 與社群圖文較適合使用這類資訊圖卡。
- 圖卡完成後先做文字、地址、尺寸與醫療詞檢查，再上傳。
