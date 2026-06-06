from __future__ import annotations

import argparse
import csv
import datetime as dt
import math
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


QUERY_FILE_HINTS = ("查詢", "query", "queries")
PAGE_FILE_HINTS = ("網頁", "page", "pages")
CHART_FILE_HINTS = ("圖表", "chart", "dates")

QUERY_HEADERS = ("熱門查詢", "查詢", "query", "queries", "top queries")
PAGE_HEADERS = ("熱門網頁", "網頁", "page", "pages", "top pages")
DATE_HEADERS = ("日期", "date", "day")
CLICK_HEADERS = ("點擊", "點擊次數", "clicks")
IMPRESSION_HEADERS = ("曝光", "曝光次數", "impressions")
CTR_HEADERS = ("ctr", "點閱率")
POSITION_HEADERS = ("排名", "平均排名", "position", "average position")

SERVICE_KEYWORDS = (
    "台南整復",
    "整復推拿",
    "台南整骨",
    "整骨推薦",
    "台南推拿",
    "身體結構",
    "結構評估",
    "結構調理",
)

PRIORITY_PAGES = (
    "https://www.observe888.com/services/tainan-tuina/",
    "https://www.observe888.com/",
    "https://www.observe888.com/faq/",
    "https://www.observe888.com/north/",
    "https://www.observe888.com/south/",
    "https://www.observe888.com/north/pricing/",
    "https://www.observe888.com/south/pricing/",
)


@dataclass(frozen=True)
class GscRow:
    key: str
    clicks: float
    impressions: float
    ctr: float
    position: float

    @property
    def ctr_percent(self) -> float:
        return self.ctr * 100


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Analyze Google Search Console CSV exports for Observe888 search-entry repair."
    )
    parser.add_argument(
        "--export-dir",
        required=True,
        type=Path,
        help="Directory containing GSC CSV exports such as 查詢.csv and 網頁.csv.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Optional markdown output path. Defaults to stdout.",
    )
    parser.add_argument(
        "--min-impressions",
        type=float,
        default=30,
        help="Minimum impressions for opportunity rows.",
    )
    parser.add_argument(
        "--low-ctr",
        type=float,
        default=0.02,
        help="Low CTR threshold as decimal, e.g. 0.02 = 2%%.",
    )
    parser.add_argument(
        "--date-label",
        default=dt.datetime.now().strftime("%Y-%m-%d"),
        help="Label printed in the report header.",
    )
    return parser.parse_args()


def normalize_header(value: str) -> str:
    return re.sub(r"\s+", " ", value.strip().lower().replace("\ufeff", ""))


def normalize_key(value: str) -> str:
    return re.sub(r"\s+", " ", value.strip())


def find_csv(export_dir: Path, hints: Iterable[str]) -> Path | None:
    files = [p for p in export_dir.iterdir() if p.is_file() and p.suffix.lower() == ".csv"]
    lowered = [(p, p.name.lower()) for p in files]
    for hint in hints:
        hint_l = hint.lower()
        for path, name_l in lowered:
            if hint_l in name_l:
                return path
    return None


def parse_number(value: str) -> float:
    text = str(value or "").strip().replace(",", "").replace("，", "")
    text = text.replace("%", "")
    if not text or text in {"-", "--"}:
        return 0.0
    try:
        return float(text)
    except ValueError:
        return 0.0


def parse_ctr(value: str) -> float:
    text = str(value or "").strip()
    numeric = parse_number(text)
    if "%" in text:
        return numeric / 100
    if numeric > 1:
        return numeric / 100
    return numeric


def pick_column(headers: list[str], candidates: Iterable[str]) -> str | None:
    normalized = {normalize_header(header): header for header in headers}
    for candidate in candidates:
        candidate_l = normalize_header(candidate)
        if candidate_l in normalized:
            return normalized[candidate_l]
    for candidate in candidates:
        candidate_l = normalize_header(candidate)
        for normalized_header, original in normalized.items():
            if candidate_l in normalized_header:
                return original
    return None


def read_gsc_csv(path: Path, key_headers: Iterable[str]) -> list[GscRow]:
    for encoding in ("utf-8-sig", "utf-16", "cp950"):
        try:
            text = path.read_text(encoding=encoding)
            break
        except UnicodeError:
            continue
    else:
        text = path.read_text(encoding="utf-8", errors="replace")

    sample = text[:4096]
    try:
        dialect = csv.Sniffer().sniff(sample, delimiters=",\t;")
    except csv.Error:
        dialect = csv.excel

    reader = csv.DictReader(text.splitlines(), dialect=dialect)
    if not reader.fieldnames:
        return []

    key_col = pick_column(reader.fieldnames, key_headers)
    click_col = pick_column(reader.fieldnames, CLICK_HEADERS)
    impression_col = pick_column(reader.fieldnames, IMPRESSION_HEADERS)
    ctr_col = pick_column(reader.fieldnames, CTR_HEADERS)
    position_col = pick_column(reader.fieldnames, POSITION_HEADERS)
    missing = [
        label
        for label, col in (
            ("key", key_col),
            ("clicks", click_col),
            ("impressions", impression_col),
            ("ctr", ctr_col),
            ("position", position_col),
        )
        if col is None
    ]
    if missing:
        raise ValueError(f"{path} missing columns: {', '.join(missing)}; headers={reader.fieldnames}")

    rows: list[GscRow] = []
    for raw in reader:
        key = normalize_key(raw.get(key_col, ""))
        if not key:
            continue
        rows.append(
            GscRow(
                key=key,
                clicks=parse_number(raw.get(click_col, "")),
                impressions=parse_number(raw.get(impression_col, "")),
                ctr=parse_ctr(raw.get(ctr_col, "")),
                position=parse_number(raw.get(position_col, "")),
            )
        )
    return rows


def weighted_position(rows: Iterable[GscRow]) -> float:
    rows = list(rows)
    denom = sum(row.impressions for row in rows)
    if denom <= 0:
        return 0.0
    return sum(row.position * row.impressions for row in rows) / denom


def summarize_rows(rows: list[GscRow]) -> tuple[float, float, float, float]:
    clicks = sum(row.clicks for row in rows)
    impressions = sum(row.impressions for row in rows)
    ctr = clicks / impressions if impressions else 0
    return clicks, impressions, ctr, weighted_position(rows)


def format_num(value: float) -> str:
    if math.isclose(value, round(value)):
        return str(int(round(value)))
    return f"{value:.2f}".rstrip("0").rstrip(".")


def table(headers: list[str], rows: list[list[str]]) -> str:
    if not rows:
        return "_沒有符合條件的列。_\n"
    lines = [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join("---" for _ in headers) + " |",
    ]
    lines.extend("| " + " | ".join(row) + " |" for row in rows)
    return "\n".join(lines) + "\n"


def row_to_table(row: GscRow, key_label: str = "項目") -> list[str]:
    return [
        f"`{row.key}`",
        format_num(row.clicks),
        format_num(row.impressions),
        f"{row.ctr_percent:.2f}%",
        f"{row.position:.2f}",
    ]


def contains_any(text: str, needles: Iterable[str]) -> bool:
    return any(needle.lower() in text.lower() for needle in needles)


def summary_row(label: str, rows: list[GscRow]) -> list[str]:
    clicks, impressions, ctr, position = summarize_rows(rows)
    return [label, format_num(clicks), format_num(impressions), f"{ctr * 100:.2f}%", f"{position:.2f}"]


def build_report(
    query_rows: list[GscRow],
    page_rows: list[GscRow],
    chart_rows: list[GscRow],
    args: argparse.Namespace,
) -> str:

    query_low_ctr = sorted(
        [
            row
            for row in query_rows
            if row.impressions >= args.min_impressions and row.ctr <= args.low_ctr
        ],
        key=lambda row: (-row.impressions, row.clicks, row.position),
    )[:20]

    query_rank_8_20 = sorted(
        [
            row
            for row in query_rows
            if row.impressions >= args.min_impressions and 8 <= row.position <= 20
        ],
        key=lambda row: (-row.impressions, row.position),
    )[:20]

    service_queries = sorted(
        [row for row in query_rows if contains_any(row.key, SERVICE_KEYWORDS)],
        key=lambda row: (-row.impressions, row.position),
    )[:30]

    page_low_ctr = sorted(
        [
            row
            for row in page_rows
            if row.impressions >= args.min_impressions and row.ctr <= args.low_ctr
        ],
        key=lambda row: (-row.impressions, row.clicks, row.position),
    )[:20]

    legacy_pages = sorted(
        [
            row
            for row in page_rows
            if any(marker in row.key for marker in ("/paper/", "/album/", "/news/", "/products/", ".php"))
        ],
        key=lambda row: (-row.impressions, row.clicks),
    )[:30]

    priority_page_rows = [
        row
        for page in PRIORITY_PAGES
        for row in page_rows
        if row.key.rstrip("/") == page.rstrip("/")
    ]

    report = [
        f"# GSC 搜尋入口修復分析 - {args.date_label}",
        "",
        "## 來源",
        "",
        f"- Export dir: `{args.export_dir}`",
        f"- Query rows: `{len(query_rows)}`",
        f"- Page rows: `{len(page_rows)}`",
        f"- Chart rows: `{len(chart_rows)}`",
        "",
        "## 總覽",
        "",
        table(
            ["來源", "點擊", "曝光", "CTR", "加權平均排名"],
            [
                summary_row("GSC 總量（圖表.csv）", chart_rows) if chart_rows else summary_row("查詢列加總", query_rows),
                summary_row("查詢列加總", query_rows),
                summary_row("網頁列加總", page_rows),
            ],
        ),
        "註：Search Console 的查詢維度可能因隱私與匿名查詢限制，列加總不一定等於 GSC 總量；判讀總量以 `圖表.csv` 為準。",
        "",
        "## 高曝光低 CTR 查詢",
        "",
        table(["查詢", "點擊", "曝光", "CTR", "平均排名"], [row_to_table(row) for row in query_low_ctr]),
        "## 排名 8-20 可推進查詢",
        "",
        table(["查詢", "點擊", "曝光", "CTR", "平均排名"], [row_to_table(row) for row in query_rank_8_20]),
        "## 服務核心 / 身體結構查詢",
        "",
        table(["查詢", "點擊", "曝光", "CTR", "平均排名"], [row_to_table(row) for row in service_queries]),
        "## 高曝光低 CTR 網頁",
        "",
        table(["網頁", "點擊", "曝光", "CTR", "平均排名"], [row_to_table(row) for row in page_low_ctr]),
        "## 舊 URL 殘留",
        "",
        table(["網頁", "點擊", "曝光", "CTR", "平均排名"], [row_to_table(row) for row in legacy_pages]),
        "## 目標頁是否進表",
        "",
        table(["網頁", "點擊", "曝光", "CTR", "平均排名"], [row_to_table(row) for row in priority_page_rows]),
        "## 下一步判讀規則",
        "",
        "- `高曝光低 CTR` 且平均排名不差：先修 title / meta description / SERP 摘要對齊，不先新增薄頁。",
        "- `排名 8-20`：優先補內鏈、FAQ、頁面段落深度與搜尋意圖對齊。",
        "- 舊 URL 仍高曝光：優先查 301 / Cloudflare / Search Console 索引轉移，不用內容改寫硬補。",
        "- `/services/tainan-tuina/` 沒進表：先查索引狀態與內鏈，不把服務頁方向直接判死。",
        "- `身體結構評估` 類查詢若有曝光：可把服務頁與分店頁 title/meta 逐步往此口徑靠，但仍保留整復推拿入口詞。",
        "",
    ]
    return "\n".join(report)


def main() -> None:
    args = parse_args()
    if not args.export_dir.exists():
        raise SystemExit(f"Export dir does not exist: {args.export_dir}")

    query_file = find_csv(args.export_dir, QUERY_FILE_HINTS)
    page_file = find_csv(args.export_dir, PAGE_FILE_HINTS)
    if query_file is None:
        raise SystemExit(f"Cannot find query CSV in {args.export_dir}")
    if page_file is None:
        raise SystemExit(f"Cannot find page CSV in {args.export_dir}")
    chart_file = find_csv(args.export_dir, CHART_FILE_HINTS)

    query_rows = read_gsc_csv(query_file, QUERY_HEADERS)
    page_rows = read_gsc_csv(page_file, PAGE_HEADERS)
    chart_rows = read_gsc_csv(chart_file, DATE_HEADERS) if chart_file else []
    report = build_report(query_rows, page_rows, chart_rows, args)

    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(report, encoding="utf-8")
    else:
        print(report)


if __name__ == "__main__":
    main()
