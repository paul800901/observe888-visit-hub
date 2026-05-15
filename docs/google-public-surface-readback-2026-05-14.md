# Google public surface readback 2026-05-14

## Scope

- Time: 2026-05-14 19:46 Taipei time / 11:46 UTC.
- Scope: public HTTP readback for the official website and the old Boostime public site, plus public search spot checks for remaining old-site exposure.
- This pass did not change Google Business Profile, Search Console, DNS, Boostime, or website source files.
- This pass did not use an authenticated Google Business Profile or Search Console browser session; backend-only fields still require a separate owner/account readback.

## Official website readback

Official domain:

- `https://www.observe888.com/`: `200 OK`, served by GitHub Pages.
- `https://www.observe888.com/robots.txt`: `200 OK`, includes sitemap reference.
- `https://www.observe888.com/sitemap.xml`: `200 OK`.
- `https://www.observe888.com/google3b9430423206dc2c.html`: `200 OK`.
- `https://www.observe888.com/visit/?store=north`: `200 OK`.
- `https://www.observe888.com/visit/?store=south`: `200 OK`.

Observed page signals:

- Homepage title is `見觀結構｜身體觀察筆記、品牌介紹與到店導航`.
- Homepage canonical points to `https://www.observe888.com/`.
- Official pages contain the current North address wording with `華德里`.
- Official pages did not expose `boostime` in the checked homepage/visit HTML.
- Visit pages still include LINE CTA, but through the official branch-split page rather than raw Google Business booking URL context.

Result:

- The official website side is clean enough for the current handoff scope.
- No source change is needed in this repository for the official domain based on this pass.

## Old Boostime site readback

Old public site:

- `https://observe.boostime.me/`: `200 OK`, served by Boostime/nginx.
- `https://observe.boostime.me/robots.txt`: `404`.
- `https://observe.boostime.me/sitemap.xml`: `404`.

Observed page signals:

- Title: `見觀結構整復所`.
- Canonical: `https://observe.boostime.me/`.
- No `noindex` robots meta was visible in the fetched homepage HTML.
- Structured data still identifies `https://observe.boostime.me` as a website.
- The page still contains old placeholder-style Boostime content, activity URLs, Boostime footer branding, and North-store contact/address material.

Result:

- This is still a live indexable public site.
- Because it self-canonicalizes and does not declare `noindex`, Google has a reasonable reason to keep showing it until the external platform is redirected, deindexed, or recrawled after cleanup.
- This cannot be fully fixed from the official website repository alone.

## Public search spot checks

Spot checks still showed old Boostime exposure for brand/North-related searches. Treat this as not complete until a later clean readback shows:

- `observe.boostime.me` no longer appears for brand/store-name queries, or the result redirects to `https://www.observe888.com/`.
- North public booking/profile links no longer expose the raw LINE URL where the official branch-split booking page should appear.
- Search Console indexing/removal state has been read back from the owner account.

## 2026-05-15 north-machine update

Source:

- Authenticated Codex in-app browser using `observe88888@gmail.com`.
- Public HTTP readback from the North computer at `C:\見觀營運資料夾`.
- This pass was read-only. No Google Business Profile, Search Console, Google Ads, DNS, Boostime, or website source change was submitted.

Official website:

- `https://www.observe888.com/`, `/visit/`, `/north/`, `/south/`, `/faq/`, `/sitemap.xml`, `/robots.txt`, and `/llms.txt` all returned `200`.
- Homepage, visit page, North page, and South page canonicals all point to `https://www.observe888.com/...`.
- Checked official pages did not contain `boostime`.

Old Boostime site:

- `https://observe.boostime.me/` now returns `410 Gone`.
- The returned HTML title is `此商店已停止營運`.
- The page includes robots meta `noindex, nofollow`.
- This supersedes the 2026-05-14 blocker that the old Boostime site was still `200 OK` and indexable. Google search results can still lag until recrawl, so do not claim old Boostime search exposure is gone without a fresh search-result readback.

Google Maps public panels:

- North exact place panel readback showed `見觀結構調理整復所-北區店`, address `704臺南市北區華德里北安路一段211 號`, website `https://www.observe888.com/visit/?store=north`, booking link `https://www.observe888.com/visit/?store=north`, service link `https://www.observe888.com/north/pricing/`, and phone `06 251 0677`.
- North Maps panel did not show `成德里`, raw LINE booking URL, or `observe.boostime.me` in the captured panel text.
- South exact place panel readback showed `見觀結構調理整復所-南區店`, address `702臺南市南區明興路673號`, website `https://www.observe888.com/visit/?store=south`, booking link `https://www.observe888.com/visit/?store=south`, service link `https://www.observe888.com/south/pricing/`, and phone `0973 728 670`.
- South Maps panel did not show raw LINE booking URL or `observe.boostime.me` in the captured panel text.

## Required external action

Send this to Boostime / the network company:

```text
目前見觀結構正式官網已改為 https://www.observe888.com/ ，舊站 https://observe.boostime.me/ 仍然公開回應 200，且頁面 canonical 仍指向 https://observe.boostime.me/ 本身，沒有 noindex。這會讓 Google 繼續收錄或顯示舊站結果。

請協助處理以下其中一種方案，優先順序如下：

1. 最佳方案：把 https://observe.boostime.me/ 全站做 301 redirect 到正式官網。
   - https://observe.boostime.me/ -> https://www.observe888.com/
   - 舊北區/預約/活動相關頁 -> https://www.observe888.com/visit/?store=north 或 https://www.observe888.com/north/
   - 若有南區舊頁 -> https://www.observe888.com/visit/?store=south 或 https://www.observe888.com/south/
   - 其他無法對應頁 -> https://www.observe888.com/

2. 如果短期不能 301 redirect，請至少在 observe.boostime.me 所有可公開頁面加上：
   - robots meta: noindex, follow
   - canonical: https://www.observe888.com/
   - 移除或停用會讓 Google 繼續索引舊站的公開 sitemap 或站內連結

3. 請確認舊站不再從 Google Business Profile、社群個人檔案、公開頁尾或任何對外入口被連回。

處理完成後請回覆實際採用的方式與完成時間，方便我們在 Search Console 重新提交 sitemap、做移除/重新索引與公開搜尋讀回。
```

## Remaining owner-side checks

- Google Business Profile: re-open the two `1 筆 Google 資訊更新` items and confirm whether Google still proposes stale address/link changes.
- Google Business Profile: recheck North public `預約` link after cache/review delay; backend booking link was previously read back as `https://www.observe888.com/visit/?store=north`, but public Google surfaces had not fully refreshed.
- Google Business Profile: recheck profile links and remove old `https://observe.boostime.me/` wherever it is still visible/editable.
- Search Console: submit or re-submit `https://www.observe888.com/sitemap.xml`; inspect indexed pages for `observe.boostime.me`; use removal tools only after the external redirect/noindex path is clear.

## Status

- Official website: clean for this pass.
- Google public/search surface: not fully clean.
- Primary blocker: external old Boostime site is still live and indexable.
- Secondary blockers: Google Business/Profile cache or review lag, and Search Console owner-side readback not completed in this pass.
