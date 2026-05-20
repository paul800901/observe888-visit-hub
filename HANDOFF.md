# ObserveGeoPages 交接

最後更新：2026-05-20

## 先讀什麼

1. `PROJECT_CONTEXT.md`
2. `docs/website-operations.md`
3. `README.md`
4. `NORTH_HANDOFF.md`（北區電腦接手快照；若準備換到北區繼續，先看這份）
5. `docs/organic-local-serp-radar-2026-05-19.md`（自然搜尋 / 競品 / 關鍵字工作）
6. `docs/organic-search-growth-goal-map-2026-05-19.md`（自然搜尋成長目標地圖 / 合夥人溝通版）

## 現在這個工作目錄是什麼

這裡是見觀結構正式官網與網站營運資料主專案。網站、到店導航、北區 / 南區店點資料、Google 商家檔案一致性、地圖資料、FAQ、GEO / AEO 與公開內容安全邊界，都以這裡為主。

舊分工「AdsControl 是到店導航官網 source、ObserveGeoPages 是品牌與文章官網」已作廢。AdsControl 仍可做廣告、事件匯入、lead sync、監測與報表，但不再主控官網頁面。

## 目前結構

- `index.html`：正式官網首頁。
- `visit/index.html`：到店導航入口。
- `north/index.html`、`south/index.html`：店點頁。
- `north/pricing/index.html`、`south/pricing/index.html`：服務與費用 / 預約說明。
- `about/index.html`：品牌介紹。
- `notes/index.html`：身體觀察筆記分類入口。
- `notes/search-terms-overview/index.html`：檢查名詞與搜尋問法分類入口。
- `notes/*/index.html`：公開文章頁。
- `services/tainan-tuina/index.html`：台南整復推拿、北區 / 南區整復推拿與服務邊界的主要服務意圖承接頁。
- `docs/website-operations.md`：Google 商家、地圖、FAQ、GEO / AEO 與驗證規格。
- `docs/organic-local-serp-radar-2026-05-19.md`：台南在地 SERP 雷達與競品觀察。
- `docs/organic-search-growth-goal-map-2026-05-19.md`：自然搜尋成長目標地圖，整理競品流量差距、官網、Google 商家、外部曝光、內容群、驗收節奏與合夥人溝通版。
- `docs/maps-tainan-tuina-readback-2026-05-19.md`：`台南推拿` / `台南整復推拿` Google Maps 讀回與 GBP 缺口分析。
- `docs/google-business-photo-refresh-2026-05-20.md`：Google Business Profile 南北店相片補充紀錄與素材包位置。
- `docs/google-business-storefront-source-photos-2026-05-20.md`：給網頁版 GPT 做圖卡時使用的真實門店底圖包與使用說明。
- `docs/google-business-route-parking-booking-prompts-2026-05-20.md`：下一批 Google Business 到店路線、停車提醒、費用 / 預約流程圖卡提示詞。
- `docs/search-console-performance-readback-2026-05-19.md`：Search Console 前 3 個月官方讀回與自然搜尋行動清單。
- `docs/search-console-full-range-readback-2026-05-19.md`：Search Console 2025-01-18 至 2026-05-16 全期間讀回。
- `docs/organic-keyword-pool-2026-05-19.csv`：自然搜尋關鍵字池與優先級。
- `docs/organic-weekly-checklist.md`：每週自然搜尋檢查流程。
- `docs/organic-external-listing-opportunities-2026-05-19.md`：第三方名錄與外部曝光機會清單。
- `llms.txt`：AI / 答案引擎補充導覽。
- `assets/gmb/`：Google 商家可用圖片素材。
- `NORTH_HANDOFF.md`：北區電腦接手快照，記錄目前已完成、待審核、下一步與不要做的事項。

## 2026-05-13 已校正

- 專案定位改成正式官網總控，不再只是品牌與文章官網。
- 到店導航 `visit/`、北區 / 南區店點頁與服務頁改由本專案主控。
- Google 商家檔案、地圖一致性、FAQ、GEO / AEO 與服務邊界納入本專案責任。
- 新增 `docs/website-operations.md` 作為網站營運規格與檢查清單。
- AdsControl 舊 public bundle 產線改成 legacy 防呆，不再預設可產出官網 bundle。

## 2026-05-14 已補

- 建立 `docs/google-business-backend-readback-2026-05-14.md`，作為 Google 商家後台編輯畫面逐欄讀回表。
- 建立 `docs/google-public-surface-readback-2026-05-14.md`，作為 Google 搜尋公開面、正式官網與舊 Boostime 站的公開讀回表。
- `docs/website-operations.md` 已校正南區目前正式入口：`D:\見觀營運資料夾\01_官網_ObserveGeoPages` 與 `D:\見觀營運資料夾\02_廣告_AdsControl`。
- 用登入狀態讀回 Google Business Profile 管理清單、商家面板、產品區、網站按鈕、`商家資訊` 詳細面板、相片工具、服務、產品與預訂對話框；未送出任何後台修改。
- 南北區 `1 筆 Google 資訊更新` 點開後只進入 `商家資訊` 詳細面板，沒有看到 `接受`、`拒絕` 或 `套用` 按鈕；目前仍視為未解決。
- 補 Google 商家後台可見盤點：北區相片工具可見封面、標誌、31 張相片與 1 支影片；南區可見封面、標誌、27 張相片；兩店服務對話框皆讀到 `結構評估`、`動作與姿勢觀察`、`徒手調理`。
- 補預訂欄位初始差異：北區原本自訂預訂網址是 LINE `https://line.me/ti/p/~@483yvmiw`；南區原本未讀到自訂連結。
- 店主已確認北區地址以新版行政區 `華德里` 為準，不回退 `成德里`。
- 預訂策略已校正並回讀正式網址：LINE 是共同聯絡端點，但 Google 商家 `預訂` 連結若要處理，應優先導到官方南北區分流頁 `https://www.observe888.com/visit/?store=north` / `https://www.observe888.com/visit/?store=south`，再由頁面承接 LINE、電話與地圖。
- 已回讀 Google Business 管理清單：北區地址顯示 `704台南市北區華德里北安路一段 211 號`。
- 已更新並回讀 Google 商家 `預訂` 連結：北區 `https://www.observe888.com/visit/?store=north`，南區 `https://www.observe888.com/visit/?store=south`。
- 已重查 Google 搜尋公開/管理混合面板：北區地址公開欄位已顯示 `華德里`，南北區 `網站` 按鈕已分別顯示 `https://www.observe888.com/visit/?store=north` / `https://www.observe888.com/visit/?store=south`；但北區公開面板的 `預約` 區塊仍可見舊 LINE `https://line.me/ti/p/~@483yvmiw`，且自然搜尋仍可見舊 Boostime 結果，不能宣稱公開面完全更新。
- 已做 2026-05-14 公開 HTTP 讀回：`https://www.observe888.com/`、`robots.txt`、`sitemap.xml`、Search Console 驗證檔與南北分流頁皆為 `200 OK`；正式官網 canonical 與頁面內容未讀到 Boostime 舊路徑。
- 舊站 `https://observe.boostime.me/` 仍回應 `200 OK`，title 仍是 `見觀結構整復所`，canonical 仍指向 `https://observe.boostime.me/`，且未讀到 `noindex`；這是公開搜尋仍不乾淨的主要外部阻塞點。
- 2026-05-14 晚間已完成 Google Business Profile 短漫貼文上架紀錄，詳見 `docs/google-business-short-comics-post-pack-2026-05-14.md`：北區、南區各 1 則第 1 集腳底篇貼文已上架，CTA 為「瞭解詳情」，連到 `https://www.observe888.com/comics/`。使用者已在外部 Chrome 手動補上封面圖 `0.png`；Codex 工具端未能獨立讀回縮圖 DOM，所以圖片狀態以使用者操作回報為準。不要重發貼文、不要再複製貼文到另一店。

## 2026-05-15 北區電腦接手提醒

- 北區電腦正式入口是 `C:\見觀營運資料夾\01_官網_ObserveGeoPages`；南區維持 `D:\見觀營運資料夾\01_官網_ObserveGeoPages`。
- 換機器處理時，先在該機正式入口執行同步，以 `origin/main` 最新狀態為準。
- 先讀本檔、`PROJECT_CONTEXT.md`、`docs/website-operations.md`、`docs/google-business-short-comics-post-pack-2026-05-14.md`，再動手。
- GMB 短漫貼文今天已完成，不要重發、不刪除、不複製。若要查，只做後台或公開面讀回。
- Google 搜尋 / Maps 公開面可能因審核與快取延遲尚未顯示新貼文；沒有讀回前不要宣稱公開面已更新，也不要把延遲誤判成貼文未上架。
- Google Business Profile API scope 仍未修復；今天是靠已登入瀏覽器後台完成，不代表 `business.manage` API 或 connector 已可用。

## 2026-05-15 Google Ads 代理轉換追蹤

- 已在本 repo 的正式官網追蹤碼加入 Google Ads conversion tag，commit `f6de3fe`。
- 修改檔案：`observe888-tracking-config.js`、`observe888-tracking.js`。
- LINE click 送 `AW-17875250530/QwVXCKOYxIccEOLaystC`。
- 電話 click 送 `AW-17875250530/G5IPCJXLu4ccEOLaystC`。
- 正式站已回讀到 conversion labels 與 `gtag('event', 'conversion')`；這是代理學習訊號，不是 booked / visited。
- Google Ads 帳戶端 live 變更與讀回紀錄保存在 AdsControl：`D:\見觀營運資料夾\02_廣告_AdsControl\docs\ads-operation-log-2026-05-15.md`。

## 2026-05-18 南區機器 UTF-8 / PowerShell 修正

- 南區電腦原本是 Windows PowerShell 5.1，系統 ANSI / OEM code page 皆為 `950`，且沒有 PowerShell profile；讀 UTF-8 無 BOM 的繁體中文 Markdown 時會亂碼。
- 已在南區電腦建立 `C:\Users\Paulus\Documents\WindowsPowerShell\profile.ps1`，啟動時切到 UTF-8，並設定 Git 全域中文/UTF-8 顯示。
- 詳細診斷、profile 內容、Git 設定、驗證命令與北區待查事項，見 `docs/south-machine-encoding-handoff-2026-05-18.md`。
- 北區目前沒有同等級的 PowerShell / code page / profile 診斷紀錄；北區若也遇到亂碼，先依該文件的北區診斷命令讀回，不要直接假設與南區相同。

## 2026-05-19 台南自然搜尋 / 競品雷達

- 已建立 `docs/organic-competitor-research-2026-05-19.md`，整理台南整復推拿、工作室、物理治療所、運動按摩與第三方推薦頁的公開成功模式。
- 已新增 `services/tainan-tuina/index.html`，作為 `台南整復推拿`、`台南整復推拿推薦`、`北區整復推拿`、`南區整復推拿` 等服務意圖的主要承接頁。
- 已更新首頁、北區頁、南區頁與 FAQ 的 title / meta / hero / FAQ schema，加入安全的 `台南 + 傳統整復推拿` 語意。
- 已建立 `docs/organic-local-serp-radar-2026-05-19.md`、`docs/organic-keyword-pool-2026-05-19.csv`、`docs/organic-weekly-checklist.md`、`docs/organic-external-listing-opportunities-2026-05-19.md`。
- 已建立 `docs/organic-search-growth-goal-map-2026-05-19.md`，把競品流量優勢、官網承接、Google 商家、第三方入口、信任素材、內容群與每週驗收整理成必要工作圖，並補合夥人溝通版。
- 已建立 `docs/maps-tainan-tuina-readback-2026-05-19.md`，確認 `台南推拿` 是 Maps / Google Business 缺口：使用者無痕比對顯示官網在 `台南推拿`、`台南整復`、`台南整復推拿` 約第 1 頁第 3 位，`台南整復推拿推薦`、`台南整骨` 約第 1 頁第 5 位，`台南整骨推薦` 約第 2 頁第 2 位；但 Maps / 地點明顯落後，例如 `台南推拿` 北區約第 3 頁第 2 個、南區約第 4 頁最後，`台南整復推拿` 也未進第一頁。下一步需做 GBP 後台只讀比對，不建議立刻亂改主類別或店名。
- 已建立 `docs/organic-gbp-external-alignment-pack-2026-05-19.md`，整理 Google 商家貼文、第三方名錄與外部平台可用的官方 URL、店點資料、安全介紹文案與欄位建議。
- 已用登入狀態匯出 Search Console 前 3 個月成效，建立 `docs/search-console-performance-readback-2026-05-19.md`：總點擊 469、總曝光 13,386、平均 CTR 3.5%、平均排名 7.5。
- 已再匯出 Search Console 全期間成效，建立 `docs/search-console-full-range-readback-2026-05-19.md`：2025-01-18 至 2026-05-16，總點擊 2,235、總曝光 67,599、CTR 3.31%、加權平均排名 9.22。
- Search Console 顯示服務核心查詢已有 90 clicks / 4,389 impressions，舊 `.php` URL 仍有 183 clicks / 7,257 impressions；這代表下一步不是只寫更多內容，也要處理舊網址轉址或索引清理。
- 全期間資料確認舊 `.php` URL 不是短期殘留：頁面維度中舊 `.php` URL 有 34 rows、1,045 clicks row sum、125,473 impressions row sum；這個頁面維度 row sum 不能直接等同網站總量，但足以確認舊頁清理是優先任務。
- 已依 Search Console 實際曝光補強 `/services/tainan-tuina/` 與 `/faq/`，加入台南整骨費用、全身整復費用、台南喬骨、美式整復、整脊等搜尋語言的安全說明。
- `/services/tainan-tuina/` 已再把 title、description、H1 往 `台南整復推拿推薦怎麼看` 調整，用中立選擇標準承接推薦型查詢，不自稱第一、不做競品比較。
- `notes/` 與 `notes/search-terms-overview/` 已加內鏈回 `services/tainan-tuina/`，讓身體觀察內容能導回服務意圖頁。
- Semrush MCP 目前不可用；本輪使用公開搜尋結果、競品官網、第三方推薦頁與 AdsControl paid search terms 交叉判斷，不宣稱競品精準流量。
- Google Business Profile 編輯、第三方名錄申請與 Semrush / Ahrefs 匯出都需要店主登入、授權或付費帳號，尚未執行；Search Console 第一次讀回已完成。

## 2026-05-19 舊 PHP URL 301 方向

- 已登入 HiNet `domain.hinet.net` 讀回轉址服務後台，未送出任何設定、未改 DNS；HiNet 轉址只支援 `http://[子網域].observe888.com` 轉到目的 URL，沒有 path/query/301 規則欄位，且需把來源 A record 指到 `202.39.161.109`，不適合處理舊 `.php` URL。
- 已決定採 Cloudflare Free：保留 HiNet registrar，不轉移網域；Cloudflare 只負責 DNS proxy 與 Redirect Rules。
- Cloudflare 導入、公開 DNS 備份、Redirect Rules 草案與驗收清單已整理到 `docs/cloudflare-redirect-migration-2026-05-19.md`。
- Cloudflare zone 已建立並讀回：Free plan、DNS 5 筆全部 Proxied、SSL/TLS `Full (strict)`、8 條優先 Redirect Rules Active；指派 nameserver 為 `nico.ns.cloudflare.com` / `rosa.ns.cloudflare.com`。
- HiNet nameserver 已改成 `nico.ns.cloudflare.com` / `rosa.ns.cloudflare.com` 並在 HiNet 後台讀回；`1.1.1.1` 與 `8.8.8.8` 查 NS 與 `www` A 已回 Cloudflare。Cloudflare HTTPS 邊緣已可回 `200`，8 條優先舊 URL 已用 Cloudflare proxy IP 驗證為 `301` 且目的地正確。本機 / ISP DNS cache 可能短暫仍看到 GitHub Pages 舊紀錄，等快取自然退即可。
- 2026-05-19 19:10 已用正式網址、不指定 IP 重測：首頁、`robots.txt`、`sitemap.xml` 回 `200`，apex `https://observe888.com/` 回 `301` 到 `https://www.observe888.com/`，8 條舊 URL 全部回 Cloudflare `301` 且目的地正確。本機一度仍連到 GitHub Pages / Fastly 舊 IP；清 DNS cache 後驗收通過。

## 2026-05-19 Google Business 讀回與貼文判斷

- 已建立 `docs/google-business-readback-2026-05-19.md`，記錄登入狀態下的 Google Business 管理清單與公開 / 管理混合面板讀回。
- 管理清單顯示南北店皆已驗證，地址仍與官網方向一致；兩店仍各有 `1 筆 Google 資訊更新`，點開後沒有看到接受、拒絕、套用、確認或儲存控制，暫不處理。
- 南北店 Google Business 主面板的 `網站` 與 `預約` 都已指向 `https://www.observe888.com/visit/?store=north` / `https://www.observe888.com/visit/?store=south`，產品和服務分別指向各自 pricing 頁；未在主面板讀到 raw LINE 預約網址。
- 使用者已於外部 Chrome 手動完成服務頁導流貼文發布流程：先建立貼文，再用 `複製貼文` 勾選 `全選` 複製到另一店；後台 `所有貼文` 清單截圖顯示最新貼文 `發布日期：1 分鐘前`，縮圖、摘要與 `瞭解詳情` CTA 可見。
- 該貼文 CTA 為 `瞭解詳情`，連到 `https://www.observe888.com/services/tainan-tuina/`；使用的是不分南北店的服務頁導流圖與安全文案。
- 不要重發同一則服務頁導流貼文。Google 搜尋 / Maps 公開前台尚未匿名讀回，可能因審核或快取延遲；沒有讀回前不要宣稱公開面已更新。
- 2026-05-19 21:18 已為 Maps 缺口補做 GBP 後台只讀比對，更新 `docs/google-business-readback-2026-05-19.md` 與 `docs/maps-tainan-tuina-readback-2026-05-19.md`：兩店主類別仍是 `整脊師`，副類別已有 `按摩師` / `運動按摩師`，但這些副類別底下沒有服務項目；描述也沒有直接出現 `推拿` / `整復推拿`。下一步若要修正，優先擬 `服務項目` 與 `商家描述`，送出 Google 前先讓店主確認；不要先改店名或直接換主類別。
- 已建立 `docs/gbp-keyword-coverage-draft-2026-05-19.md`，把 `台南推拿`、`台南整復`、`台南整復推拿`、`台南整骨`、`台南喬骨`、南北區整復推拿、費用與運動按摩等主流詞分配到 GBP 服務項目、商家描述與後續貼文輪播。這是送出前草案；尚未修改 Google Business Profile。
- 已補 `結構治療` 相關詞組進 `docs/organic-keyword-pool-2026-05-19.csv` 與 GBP 草案，但只作為內部追蹤 / 使用者搜尋語；公開 GBP 欄位應改寫為 `身體結構觀察`、`身體結構評估`、`結構調理`、`徒手調理`，不要把 `結構治療` 當服務項目送出。
- 已建立 `docs/taiwan-industry-keyword-universe-2026-05-19.md`，整理台灣使用者會搜尋的整復、推拿、整骨、喬骨、結構調理、結構治療、物理治療、徒手治療、復健、運動按摩、筋膜放鬆、症狀與推薦型詞庫；文件已分成 P0 主攻、P1 可承接、P2 比較承接、P3 只追蹤，後續官網 / FAQ / GBP 不要混用。
- 已補「搜尋意圖承接規則」：所有相關詞都可納入追蹤與內容規劃，目標是讓使用者搜尋時 Google Search / Maps 能理解見觀相關；但公開欄位仍需區分安全服務詞、比較型問法與高風險醫療詞。`筋膜放鬆` / `肌筋膜放鬆` 已列為 GBP 草案可承接詞，但送出前需確認現場服務確實包含。
- 已在 `faq/index.html` 新增「搜尋詞彙說明」區塊與 FAQPage schema，承接 `物理治療`、`徒手治療`、`復健`、`結構治療`、`筋膜放鬆`、`體態矯正`、`骨盆矯正`、手麻與坐骨神經痛等搜尋問法；公開說法維持服務邊界，不宣稱醫療診斷、治療或療效。
- 已補服務頁與搜尋問法頁內鏈：`services/tainan-tuina/index.html` 現在把 `筋膜放鬆`、`結構治療`、物理治療差異導到 `faq/#search-terms`；`notes/search-terms-overview/index.html` 也新增物理治療、結構治療與筋膜放鬆的分流說明。
- 已把詞庫明確分成兩類：第一類可公開宣稱的服務 / 定位詞，例如 `傳統整復推拿`、`身體結構觀察`、`結構調理`、`徒手調理`、`運動按摩`、`肌筋膜放鬆`、`筋膜放鬆調理`；第二類不可宣稱為見觀服務，只能用「使用者搜尋詞 / 問法 / 比較說明」承接，例如 `物理治療`、`徒手治療`、`復健`、`結構治療`、`矯正`、症狀與疾病詞。
- 2026-05-19 店主確認：除治療 / 復健 / 矯正 / 疾病承諾詞外，實際有做的 `台南按摩`、`肩頸按摩`、`民俗調理`、`傳統整復推拿業`、`筋膜刀`、`刮痧`、`拔罐`、`指壓`、`經絡調理`、`經絡按摩` 可列為可公開宣稱或可作服務描述；仍不寫療效、不寫醫療診斷。
- 2026-05-19 23:42 已依店主授權完成南北店 Google Business Profile 第一輪 Maps 相關性修正：補 `整脊師`、`按摩師`、`運動按摩師`、`健康中心` 服務項目，更新兩店商家描述；未改店名、主類別、地址、電話、網站、預約連結、營業時間、產品或照片。北區一度誤加到 `復健中心` 的 4 個服務項目已刪除並讀回為空。Google 後台顯示修改尚待審核，公開 Maps 排名尚未驗收。
- 2026-05-20 已完成 Google Business Profile 南北店相片補充：從 AdsControl 既有素材整理出 `assets/gmb/photo-refresh-2026-05-19/`，北區 12 張、南區 12 張，規格為 1080x1080 JPG；後台相片管理區已讀回新圖。南區 `01-south-storefront-building.jpg` 曾因來源 EXIF 方向未套用而橫倒，已重新產出正向版本；店主已刪除錯版並補傳修正版，後台顯示正在等待審查。未改封面照、標誌、店名、類別、地址、電話、網站、預約連結或營業時間。公開 Google 搜尋 / Maps 相片排序可能延遲，尚未宣稱公開面已更新。

## 後續工作方向

- 可現在做：把「到店路線」、「停車提示」、「費用 / 預約流程」整理成下一批 Google Business 相片 / 貼文素材；這類不用等 Maps 排名更新。
- 2026-05-20 已建立 `assets/gmb/storefront-source-photos-2026-05-20/` 與 `docs/google-business-storefront-source-photos-2026-05-20.md`，整理南北店真實門面 / 室內底圖 8 張給網頁版 GPT 使用；底圖包不包含 AI 產圖。
- 2026-05-20 已建立 `docs/google-business-route-parking-booking-prompts-2026-05-20.md`，整理 8 張可交給網頁版 GPT 產圖的 GBP 素材提示詞：北區到店、北區停車、北區費用預約、南區到店、南區停車、南區費用預約、第一次來流程、聯絡與導航方式。尚未產圖、尚未上傳 Google Business Profile。
- 可現在做：補強第三方名錄與外部曝光資料一致性，依 `docs/organic-external-listing-opportunities-2026-05-19.md` 逐項處理。
- 可現在做：依 Search Console 與 `docs/organic-keyword-pool-2026-05-19.csv` 補下一批安全搜尋問法內容；不可把物理治療、復健、治療、矯正寫成見觀服務。
- 暫時等待：Google Business Profile 服務項目、商家描述與南區修正版相片審核；審核通過前不能宣稱 Maps 排名已改善。
- 暫時等待：Cloudflare 301 已驗收，後續看 Search Console 舊 `.php` URL 轉移，不需再改 DNS 或 HiNet。
- 依 `docs/google-business-backend-readback-2026-05-14.md` 處理兩店各 `1 筆 Google 資訊更新`；點開仍只進 `商家資訊`，未看到 accept/reject UI。
- 依 `docs/google-business-backend-readback-2026-05-14.md` 補欄位編輯器層級的完整營業時間、屬性與服務範圍；主副分類、服務、產品、預訂欄位與照片盤點已先讀回。
- Google 公開搜尋結果與商家公開面仍未完全乾淨；下一輪先推動 Boostime / 網路公司把 `https://observe.boostime.me/` 做 301 redirect 或 `noindex, follow`，再重查北區公開 `預約` 是否已從 LINE 更新為官方分流頁、舊 Boostime 自然結果是否退場，以及 Search Console 索引狀態。
- 維護 `faq/index.html`，目前已回答第一次來、北區 / 南區怎麼選、費用、導航、服務邊界；後續若 Google 商家後台欄位變更，要同步更新 FAQ。
- 新增文章前，先做安全化與最終潤色，再補進分類入口、`sitemap.xml`、`llms.txt`。
- 若改店點資料，同步檢查 `index.html`、`visit/`、`north/`、`south/`、widget、JSON-LD、`llms.txt`。

## 不能做的事

- 不要把 AdsControl 的 `frontend/observe888-public` 或舊 build 輸出覆蓋回本專案。
- 不要把 `notes/` 退回完整文章清單；第一層維持分類入口。
- 不要把搜尋問法寫成治療承諾、醫療診斷或保證改善。
- 不要只改本地檔案就宣稱 Google 商家 live 已完成；商家後台資料必須回讀驗證。
