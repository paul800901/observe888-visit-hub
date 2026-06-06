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
