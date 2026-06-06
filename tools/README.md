# Website Tools

## `analyze_gsc_export.py`

Analyze Google Search Console CSV exports for the search-entry repair workflow.

Expected local input, kept out of git:

```text
_local/gsc_exports/YYYY-MM-DD/
  查詢.csv
  網頁.csv
```

Run:

```powershell
python tools/analyze_gsc_export.py `
  --export-dir _local/gsc_exports/2026-06-07 `
  --output _local/gsc_analysis/gsc-entry-repair-2026-06-07.md `
  --date-label 2026-06-07
```

The script reports high-impression low-CTR queries/pages, rank 8-20 opportunities, service/body-structure queries, old URL residue, and whether priority pages have entered the GSC page table.

When `圖表.csv` is present, the report uses it as the GSC aggregate total. `查詢.csv` and `網頁.csv` row sums are kept as dimension-level row sums because Search Console query/page dimensions can differ from the chart total.

## `run_seo_recurring_check.ps1`

Run the recurring SEO reminder/check workflow.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\run_seo_recurring_check.ps1 -Mode Weekly
```

Modes:

- `Weekly`: weekly GSC export reminder and analyzer runner.
- `Repair`: biweekly public-page repair window reminder; does not edit pages automatically.
- `Monthly`: monthly cross-source search-entry review reminder; quietly skips unless it is the first Saturday of the month.

Use `-NoOpen` for script tests without opening Chrome, Explorer, or popup windows.

## `register_seo_recurring_tasks.ps1`

Register the local Windows Scheduled Tasks:

- `見觀 SEO 週檢`
- `見觀 SEO 雙週修復窗口`
- `見觀搜尋入口月盤點`

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\register_seo_recurring_tasks.ps1
```

Operational details are documented in `docs/seo-recurring-ops-2026-06-07.md`.
