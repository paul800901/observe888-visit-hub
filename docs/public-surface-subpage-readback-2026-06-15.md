# 官網分頁與外部公開面回讀 - 2026-06-15

本紀錄整理 2026-06-15 針對見觀官網分頁配置與外部公開面的回讀結果。本文是操作紀錄，不是 Search Console、Google 商家後台或 Maps 排名完成證明。

## 本次已修正

- `south/index.html`：南區店第一屏補上費用參考 `NT$500–800`，並把 meta description / OG / Twitter 描述補上單次預約費用範圍。
- `south/index.html`：南區店 LocalBusiness JSON-LD 補 `priceRange: NT$500-800`。
- `south/pricing/index.html`：服務與費用頁第一屏補上 `LINE 留預約需求` 與 `南區到店導航` 按鈕，讓價格頁不只顯示價格，也能直接進下一步。

## 分頁第一屏回讀

本機預覽以桌機 `1280x720` 與手機 `390x844` 檢查。

| 頁面 | 第一屏結果 |
| --- | --- |
| `/south/` | 已看到南區店、價格 `NT$500–800`、Google Maps、預約需求與電話。 |
| `/east/` | 已看到東區工作室、新樓街65號、純預約、LINE、Google Maps 與價格 `NT$500–800`。 |
| `/visit/` | 已看到南區店入口、東區工作室入口、LINE、電話與導航用途；此頁定位是選店與導航，不強制放價格。 |
| `/south/pricing/` | 已看到價格 `NT$500–800`、LINE 留預約需求與南區到店導航。 |

## 外部公開面回讀

### Workband 舊頁

公開搜尋仍可找到 Workband 舊「服務價目」頁：

```text
https://www.workband.com.tw/store/other_select_page.php?id=20&useno=observe888
```

該頁仍顯示舊式價目表邏輯，例如養身推拿、結構調理、健身教練課與舊價格。這不是目前官網定位，會干擾「服務與費用」的新口徑。

### Boostime 舊站

公開搜尋仍可找到 Boostime 舊站內容，例如：

```text
https://observe.boostime.me/me/info
https://observe.boostime.me/activities/ebttjhqf
```

搜尋摘要仍帶舊北區地址、舊電話或舊平台資訊。這不是本 repo 可直接修正的正式官網內容，仍需後續由外部平台或 Search Console / 移除流程處理。

### Google Maps 公開搜尋

以 Google Maps 搜尋 `見觀結構 台南`，公開結果仍顯示：

- 見觀結構調理整復所-北區店
- 見觀結構調理整復所-南區店

本次未看到東區工作室，也未看到新價格資訊。不能宣稱 Google Maps、Google 商家公開面或搜尋摘要已完成同步。

## 判斷

官網內部配置已比外部公開面更乾淨：

- 官網首頁、南區頁、東區頁、服務與費用頁都已清楚顯示目前價格與預約方式。
- 外部 Workband、Boostime、Google Maps 仍保留舊資訊或舊店點結構，是接下來的公開面清理項目。

後續不能只看正式官網健康就宣稱整個公開面已更新；仍需分別回讀 Workband / Boostime / Search Console / Google 商家與 Maps 公開面。
