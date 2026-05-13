# Live verification 2026-05-13

## Deployment

- Repository: `paul800901/observe888-visit-hub`
- Branch: `main`
- Deployed commit: `1dd2c5ff56072cc288c33d038751b420e531bbe5`
- Public domain: `https://www.observe888.com/`
- DNS readback: `www.observe888.com` is a CNAME to `paul800901.github.io`.

## Live website readback

Verified by direct HTTP readback after push:

- `https://www.observe888.com/`
  - HTTP status: 200
  - Server: GitHub.com
  - Title readback: `見觀結構｜身體觀察筆記、品牌介紹與到店導航`
  - New wording present: `進到到店導航入口`
- `https://www.observe888.com/llms.txt`
  - HTTP status: 200
  - New wording present: `見觀結構正式官網`
- `https://www.observe888.com/robots.txt`
  - HTTP status: 200
  - Sitemap points to `https://www.observe888.com/sitemap.xml`
- `https://www.observe888.com/sitemap.xml`
  - HTTP status: 200
  - Includes `https://www.observe888.com/visit/`

## Public Google Maps smoke check

Public Google Maps search URLs responded with HTTP 200 and returned content containing `見觀` for both queries:

- `見觀結構調理整復所-北區店`
- `見觀結構調理整復所-南區工作室`

This is only a public smoke check. It is not a Google Business Profile backend readback.

## Google Business Profile backend status

Backend readback was not completed in this environment.

Observed blockers:

- No Google Business Profile / Google My Business connector is available in the current Codex tool list.
- No local environment variables for GBP / GMB / Places / Maps API credentials were present.
- AdsControl `.env` contains Google Ads API credentials, but not Google Business Profile API credentials.
- `gh` CLI is not installed, so GitHub Pages state was checked through git, direct HTTP, DNS, and public GitHub API endpoints instead.

Historical local evidence from AdsControl says `observe88888@gmail.com` had two verified Google Business Profile locations on 2026-04-28, but that is not current live backend proof.

## Remaining live checks

- Log into Google Business Profile backend and record current name, category, services, description, photos, website URL, hours, attributes, service areas, and product cards for both locations.
- Confirm whether current GBP website fields should stay LINE-first or switch to the official store pages / visit pages.
- Update `docs/website-operations.md` after backend readback.
