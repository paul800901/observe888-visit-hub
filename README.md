# Observe888 GitHub Pages Bundle

這個資料夾是由 AdsControl 的原始頁面自動產生的公開版 bundle，適合直接放到 GitHub Pages 的公開 repo 根目錄。

## 建議公開 repo 結構

- index.html：主落地頁
- observe888-location-widget-snippet.html：雙店導航元件
- north/index.html：直接跳到北區版
- north/pricing/index.html：北區店服務與費用頁
- south/index.html：直接跳到南區版
- south/pricing/index.html：南區工作室預約說明頁
- .nojekyll：避免 GitHub Pages 套 Jekyll 處理

## 建議 repo 名稱

- observe888-visit-hub

## 發布步驟

1. 建立一個新的公開 GitHub repo。
2. 把這個資料夾內的所有檔案直接放到公開 repo 根目錄。
3. 到 GitHub repo 的 Settings > Pages，選擇從 main branch / root 發布。
4. 等 GitHub Pages 完成部署後，再把最終網址填回 Google 商家網站欄位。

## 建議網址格式

如果 GitHub Pages 網址為：

- https://<github-username>.github.io/observe888-visit-hub/

則建議這樣使用：

- 北區店：https://<github-username>.github.io/observe888-visit-hub/north/
- 北區費用：https://<github-username>.github.io/observe888-visit-hub/north/pricing/
- 南區工作室：https://<github-username>.github.io/observe888-visit-hub/south/
- 南區預約：https://<github-username>.github.io/observe888-visit-hub/south/pricing/
- 通用頁：https://<github-username>.github.io/observe888-visit-hub/

如果之後改成自訂網域，路徑維持相同：

- https://你的網域/north/
- https://你的網域/north/pricing/
- https://你的網域/south/
- https://你的網域/south/pricing/
- https://你的網域/

## 重新產生方式

請回原始 repo 執行下列指令重新產生：

npm run build:observe888-public

## 備註

- 這個公開 repo 只放公開落地頁，不要混入 AdsControl 後端、docs、reports、.env 或任何內部資料。
- north/ 和 south/ 是乾淨捷徑入口，實際上會導向同一份主頁並自動切到對應分店。
