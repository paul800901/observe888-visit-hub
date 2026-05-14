# Google Business backend readback 2026-05-14

## Scope

- Source: authenticated Google Business Profile manager in the Codex in-app browser.
- Account shown: `observe88888@gmail.com`.
- Surfaces read: `business.google.com/locations`, managed Google Search business panel, managed profile product section, Google Business `商家資訊` detail panel, `相片和影片` media tool, `服務` dialog, `產品` dialog, and `預訂` dialog.
- Initial readback was read-only. Later owner-confirmed changes are recorded in `Post-change update`.
- Status: authenticated readback completed for visible manager/detail-panel fields, the specific dialogs named above, and post-change booking-link dialogs.

## Manager overview

- Google Business Profile manager shows `2` businesses.
- Verification summary shows `100% 已完成驗證`.
- Both North and South rows show `已驗證`.
- Both North and South rows show `1 筆 Google 資訊更新`.
- Clicking each store's `1 筆 Google 資訊更新` opened the `商家資訊` detail panel. No `接受`, `拒絕`, or `套用` control was visible during readback, and the `確認` button was not clicked.

## Post-change update

- North address: owner confirmed `華德里` as the current subdivision. The Google Business manager list was later read back as `704台南市北區華德里北安路一段 211 號`.
- North booking link: changed from raw LINE `https://line.me/ti/p/~@483yvmiw` to `https://www.observe888.com/visit/?store=north`; saved and read back from the `預訂` dialog.
- South booking link: added `https://www.observe888.com/visit/?store=south`; saved and read back from the `預訂` dialog.
- No product, service, photo, category, attribute, service-area, hours, or Google Ads setting was changed during this post-change pass.
- Google public surfaces can lag behind backend changes; treat the post-change state above as authenticated backend readback, not as proof that every public Google surface has refreshed.

Important discrepancy:

- North location list row showed `704台南市北區成德里北安路一段211號`.
- North managed profile panel showed `704臺南市北區華德里北安路一段211號`.
- North `商家資訊` detail panel also showed `704台南市北區成德里北安路一段211號`.
- Official website source currently uses `704 台南市北區華德里北安路一段 211 號`.
- Web check: current external evidence supports `華德里` as the current village name for `北安路一段211號`; treat `成德里` as older / stale subdivision wording unless newer municipal proof says otherwise.
- Owner direction on 2026-05-14: use `華德里`. If correcting the Business Profile, align the authenticated backend address to `704 台南市北區華德里北安路一段 211 號`; do not revert official-site wording to `成德里`.

Web evidence checked:

- Tainan North District Office says `華德里由原成德里（部分）範圍整編而成`, and its boundary uses `北安路一段` as the east boundary.
- `twzipcode.com` lists `台南市北區華德里北安路一段211號`, village `華德里`, neighborhood `2鄰`, postal code `704027`.
- Older business-registration mirrors still show nearby North An Road addresses as `成德里`, while newer tax/address mirrors can show `華德里`. This is consistent with subdivision migration lag.

## North location backend readback

Official website source:

- Name: `見觀結構調理整復所-北區店`
- Address: `704 台南市北區華德里北安路一段 211 號`
- Phone: `(06) 251-0677`
- Store page: `https://www.observe888.com/north/`
- Visit assistant: `https://www.observe888.com/visit/?store=north`
- Pricing page: `https://www.observe888.com/north/pricing/`

| Field | Readback value | Source | Action |
| --- | --- | --- | --- |
| Business code | `07009373627673971071` | GBP manager location list | Record only |
| Business name | `見觀結構調理整復所-北區店` | GBP manager + managed profile panel | Matches official source |
| Verification status | `已驗證` | GBP manager location list | No action |
| Google info update | `1 筆 Google 資訊更新`; click-through opened `商家資訊`, not an accept/reject dialog | GBP manager location list + click-through readback | Still unresolved; no update was accepted or rejected |
| Primary category | `整脊師` (`主要類別`); public visible text: `位於臺南的整脊師` | `商家資訊` detail panel + managed profile panel | Read only |
| Secondary categories | `健康中心`; `運動治療師`; `按摩師`; `復健中心`; `運動按摩師` | `商家資訊` detail panel | Read only |
| Address | Initial location list/detail panel: `704台南市北區成德里北安路一段211號`; later manager list readback: `704台南市北區華德里北安路一段 211 號`; public managed profile panel: `704臺南市北區華德里北安路一段211號`; official site and owner direction use `華德里` | GBP manager + detail panel + managed profile panel + web check + owner direction | Backend manager list now aligns to `華德里`; `商家資訊` detail panel should be rechecked later if the `1 筆 Google 資訊更新` item remains |
| Phone | `06 251 0677` | Managed profile panel | Matches official phone, formatting differs |
| Website URL | `https://www.observe888.com/visit/?store=north` | Managed profile panel website button | Current live GBP website button is visit assistant |
| Product/service URL | `https://www.observe888.com/north/pricing/` | Managed profile panel `產品和服務` link | Matches official pricing page |
| Appointment URL | Initial: `https://line.me/ti/p/~@483yvmiw`; post-change readback: `https://www.observe888.com/visit/?store=north` | `預訂` dialog | Changed to official north split page so branch context remains before LINE/phone/maps handoff |
| Opening date | `2025年2月20日` | `商家資訊` detail panel | Read only |
| Hours | Public panel: `已打烊 · 開始營業時間：11:00`; detail panel: Sunday `11:00-21:00`, Monday closed, Tuesday-Saturday `11:00-21:00`; special hours: 2026-05-01 `11:00-21:00`; public panel also showed `這個商家在 2 週前更新過` | Managed profile panel + `商家資訊` detail panel | Read only; field-level hours editor not opened |
| Rating / reviews | `4.9`, `126 則 Google 評論` | Managed profile panel | Record only |
| Services | Under primary category `整脊師`: `結構評估`; `動作與姿勢觀察`; `徒手調理`. Secondary categories were present but showed no extra service item in this dialog. | `服務` dialog | Read only; no service was added, deleted, or edited |
| Products | `貼紮服務` `$150.00`; `全身結構評估調理+客製化功能性訓練` `$1,999.00`; `全身結構評估調理+姿態訓練` `$1,499.00`; `單一部位評估調理` `$600.00` | `產品` dialog | Check wording against safety rules before future edits |
| Product categories | `貼紮服務`; `結構調理`; `傳統整復` | `產品` dialog | Check wording before future edits |
| Business description | `見觀結構調理整復所-北區店位於台南市北區北安路一段211號，採一對一預約為主，也可視現場狀況接待未預約來店。服務以身體結構評估、動作與姿勢觀察、徒手調理與日常使用建議為核心，協助顧客更清楚了解自己的身體使用狀態。附近有停車空間與停車資訊可參考，店內環境整潔，有單間洗手間與可遮蔽的私人空間。建議先加入LINE說明需求，方便安排適合時段。` | Managed profile panel `由...提供` section | Safe enough; omitting village name avoids stale subdivision wording |
| Profile links | Detail panel: Instagram, Facebook; public/managed profile area also showed `https://observe.boostime.me/` | Managed/public profile area + `商家資訊` detail panel | Review whether old Boostime link should remain |
| Photos | `相片和影片` dialog showed `封面`, `標誌`, `相片 1`-`相片 21`, `影片 22`, and `相片 23`-`相片 32` | `相片和影片` dialog | Visible inventory equals 31 numbered photo items, 1 numbered video item, plus cover/logo slots; not deduplicated by underlying file |
| Attributes | Business-provided: `業主不是女性的商家`; payment: no checks, cash only, accepts debit cards, no credit cards; parking: no paid street lot, no paid lot, free street parking, no paid indoor lot, free parking; children: nursing/pumping room; audience: LGBTQ+ friendly, transgender-friendly; service option: in-store service | `商家資訊` detail panel | Read only; field-level attribute editor not opened |
| Service areas | `台灣臺南市中西區`; `台灣臺南市安平區`; `704台灣臺南市北區`; `台灣臺南市東區臺南`; `709台灣臺南市安南區`; `710台灣臺南市永康區` | `商家資訊` detail panel | Read only |

## South location backend readback

Official website source:

- Name: `見觀結構調理整復所-南區店`
- Address: `702 台南市南區明興路 673 號`
- Phone: `0973-728-670`
- Store page: `https://www.observe888.com/south/`
- Visit assistant: `https://www.observe888.com/visit/?store=south`
- Pricing page: `https://www.observe888.com/south/pricing/`

| Field | Readback value | Source | Action |
| --- | --- | --- | --- |
| Business code | Blank in location list row | GBP manager location list | Consider adding code if needed for internal tracking |
| Business name | `見觀結構調理整復所-南區店` | GBP manager + managed profile panel | Matches official source |
| Verification status | `已驗證` | GBP manager location list | No action |
| Google info update | `1 筆 Google 資訊更新`; click-through opened `商家資訊`, not an accept/reject dialog | GBP manager location list + click-through readback | Still unresolved; no update was accepted or rejected |
| Primary category | `整脊師` (`主要類別`); public visible text: `位於臺南的整脊師` | `商家資訊` detail panel + managed profile panel | Read only |
| Secondary categories | `健康中心`; `運動治療師`; `按摩師`; `復健中心`; `運動按摩師` | `商家資訊` detail panel | Read only |
| Address | `702臺南市南區明興路673號` | GBP manager + managed profile panel | Matches official source, formatting differs |
| Phone | `0973 728 670` | Managed profile panel | Matches official phone, formatting differs |
| Website URL | `https://www.observe888.com/visit/?store=south` | Managed profile panel website button | Current live GBP website button is visit assistant |
| Product/service URL | `https://www.observe888.com/south/pricing/` | Managed profile panel `產品和服務` link | Matches official pricing page |
| Appointment URL | Initial: no existing custom booking URL; post-change readback: `https://www.observe888.com/visit/?store=south` | `預訂` dialog | Added official south split page so branch context remains before LINE/phone/maps handoff |
| Opening date | `2022年10月10日` | `商家資訊` detail panel | Read only |
| Hours | Public panel: `已打烊 · 開始營業時間：11:00`; detail panel exposed Sunday `21:30-23:30`, Monday `11:00-23:30`, Tuesday `11:00-23:30`, Wednesday `21:30-23:30`, Thursday `11:00-23:30`, plus one additional visible `21:30-23:30` row where the day label was not captured; special hours: 2026-05-01 `11:00-23:30` | Managed profile panel + `商家資訊` detail panel | Re-open field-level hours editor before acting on hours |
| Rating / reviews | `4.8`, `68 則 Google 評論` | Managed profile panel | Record only |
| Services | Under primary category `整脊師`: `結構評估`; `動作與姿勢觀察`; `徒手調理`. Secondary categories were present but showed no extra service item in this dialog. | `服務` dialog | Read only; no service was added, deleted, or edited |
| Products | `單次預約 30 至 40 分鐘` `$500.00`; `工作室預約` | `產品` dialog | Check wording against safety rules before future edits |
| Product categories | `傳統整復` | `產品` dialog | Check wording before future edits |
| Business description | `見觀結構調理整復所-南區店位於台南市南區明興路673號，採工作室預約制，適合想用較單純時段安排一對一服務的人。服務以結構評估、動作與姿勢觀察、徒手調理與日常保養建議為主，依當次狀況安排內容與時間。南區單次預約約30至40分鐘，價格區間500至800，實際時段與內容請先以LINE確認。工作室門口可停車，斜對面另有免費停車場，店內有單間洗手間及可遮蔽的私人空間。` | Managed profile panel `由...提供` section | Safe enough; aligns with current website direction |
| Profile links | Detail panel: Instagram, Facebook; public/managed profile area also showed Threads | Managed/public profile area + `商家資訊` detail panel | No immediate website source conflict |
| Photos | `相片和影片` dialog showed `封面`, `標誌`, and `相片 1`-`相片 27`; no numbered video item was visible | `相片和影片` dialog | Visible inventory equals 27 numbered photo items plus cover/logo slots; not deduplicated by underlying file |
| Attributes | Business-provided: `業主不是女性的商家`; payment: no checks, cash only, accepts debit cards, no credit cards; parking: free street parking, free parking lot; children: nursing/pumping room; audience: LGBTQ+ friendly, transgender-friendly; service option: in-store service | `商家資訊` detail panel | Read only; field-level attribute editor not opened |
| Service areas | `台灣臺南市南區`; `台灣臺南市中西區`; `台灣臺南市安平區`; `台灣高雄市茄萣區`; `701台灣臺南市東區`; `717台灣臺南市仁德區`; `829台灣高雄市湖內區` | `商家資訊` detail panel | Read only |

## Website URL decision

Observed current Google Business Profile website buttons:

- North: `https://www.observe888.com/visit/?store=north`
- South: `https://www.observe888.com/visit/?store=south`

This is conversion-oriented because it sends users directly to LINE, phone, and maps. If NAP / store-page purity becomes the priority, change website buttons to the store pages:

- North: `https://www.observe888.com/north/`
- South: `https://www.observe888.com/south/`

No Google Business Profile URL change was made during this readback.

Observed current Google Business Profile booking links and target policy:

- Initial North: custom booking link existed and pointed to `https://line.me/ti/p/~@483yvmiw`.
- Initial South: no custom booking link was visible; the booking dialog showed `新增連結`.
- The official website already handles branch routing before LINE handoff through `https://www.observe888.com/visit/?store=north` and `https://www.observe888.com/visit/?store=south`.
- Live render check on 2026-05-14 confirmed `?store=north` renders the North entry title and `?store=south` renders the South entry title; both pages include LINE CTA.
- Post-change backend readback: North now uses `https://www.observe888.com/visit/?store=north`; South now uses `https://www.observe888.com/visit/?store=south`.
- Use the official split pages above, not the raw shared LINE URL, so branch context, phone options, maps, and tracking remain separated.

## Remaining checks

- Resolve the `1 筆 Google 資訊更新` item for each location. Current click-through opened `商家資訊` with no accept/reject UI, so the actual Google-proposed update still needs a safer review path.
- Recheck the North `商家資訊` detail panel later if Google still reports `1 筆 Google 資訊更新`; manager list and public managed profile now use `華德里`.
- Re-open field-level edit dialogs before acting on categories, hours, attributes, service areas, products, services, or photos.
- Recheck public Google Search, public business panels, and Search Console later. This is intentionally deferred because backend booking/address changes may have review/cache lag; next pass should read back North address, North/South booking links, and indexing state before calling the public side complete.
