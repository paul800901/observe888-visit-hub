param(
    [ValidateSet("Weekly", "Repair", "Monthly")]
    [string]$Mode = "Weekly",

    [switch]$NoOpen
)

$ErrorActionPreference = "Stop"
$OutputEncoding = New-Object System.Text.UTF8Encoding $false
[Console]::OutputEncoding = $OutputEncoding

function New-TextFromCodePoints {
    param([int[]]$CodePoints)
    $Chars = foreach ($CodePoint in $CodePoints) {
        [char]$CodePoint
    }
    return -join $Chars
}

$BrandName = New-TextFromCodePoints @(0x898B, 0x89C0)
$TaskTitleWeekly = $BrandName + " SEO " + (New-TextFromCodePoints @(0x9031, 0x6AA2))
$TaskTitleRepair = $BrandName + " SEO " + (New-TextFromCodePoints @(0x96D9, 0x9031, 0x4FEE, 0x5FA9, 0x7A97, 0x53E3))
$TaskTitleMonthly = $BrandName + (New-TextFromCodePoints @(0x641C, 0x5C0B, 0x5165, 0x53E3, 0x6708, 0x76E4, 0x9EDE))
$HintQueryZh = New-TextFromCodePoints @(0x67E5, 0x8A62)
$HintPageZh = New-TextFromCodePoints @(0x7DB2, 0x9801)
$HintChartZh = New-TextFromCodePoints @(0x5716, 0x8868)

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $RepoRoot

$Now = Get-Date
$DateLabel = $Now.ToString("yyyy-MM-dd")
$RepairStartDate = [datetime]"2026-06-27T00:00:00"
$GscUrl = "https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fwww.observe888.com%2F"

$ExportDir = Join-Path $RepoRoot ("_local\gsc_exports\{0}" -f $DateLabel)
$AnalysisDir = Join-Path $RepoRoot "_local\gsc_analysis"
$LogDir = Join-Path $RepoRoot "_local\seo_task_logs"
$Analyzer = Join-Path $RepoRoot "tools\analyze_gsc_export.py"
$AnalysisPath = Join-Path $AnalysisDir ("gsc-entry-repair-{0}.md" -f $DateLabel)

$script:Log = New-Object System.Collections.Generic.List[string]

function Add-Log {
    param([string]$Text)
    $script:Log.Add($Text) | Out-Null
}

function Ensure-Directory {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path | Out-Null
    }
}

function Test-FirstSaturday {
    param([datetime]$Date)
    return ($Date.DayOfWeek -eq [System.DayOfWeek]::Saturday -and $Date.Day -le 7)
}

function Test-RepairWindow {
    param([datetime]$Date)
    if ($Date.Date -lt $RepairStartDate.Date) {
        return $false
    }
    if ($Date.DayOfWeek -ne [System.DayOfWeek]::Saturday) {
        return $false
    }
    $DaysFromStart = ($Date.Date - $RepairStartDate.Date).Days
    return (($DaysFromStart % 14) -eq 0)
}

function Find-CsvByHint {
    param(
        [string]$Directory,
        [string[]]$Hints
    )

    if (-not (Test-Path -LiteralPath $Directory)) {
        return $null
    }

    $Files = Get-ChildItem -LiteralPath $Directory -File -Filter "*.csv" -ErrorAction SilentlyContinue
    foreach ($Hint in $Hints) {
        foreach ($File in $Files) {
            if ($File.Name.ToLowerInvariant().Contains($Hint.ToLowerInvariant())) {
                return $File.FullName
            }
        }
    }
    return $null
}

function Get-ChromePath {
    $Roots = @($env:ProgramFiles, ${env:ProgramFiles(x86)}, $env:LOCALAPPDATA)
    foreach ($Root in $Roots) {
        if (-not $Root) {
            continue
        }
        $Candidate = Join-Path $Root "Google\Chrome\Application\chrome.exe"
        if (Test-Path -LiteralPath $Candidate) {
            return $Candidate
        }
    }
    return $null
}

function Get-PythonPath {
    foreach ($Name in @("python", "py")) {
        $Command = Get-Command $Name -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($Command) {
            if ($Command.Path) {
                return $Command.Path
            }
            return $Command.Source
        }
    }
    return $null
}

function Write-ExportInstructions {
    param([string]$Path)

    $ReadmePath = Join-Path $Path "README_NEXT_EXPORT.md"
    $Lines = @(
        "# GSC export needed - $DateLabel",
        "",
        "Export CSV files from Google Search Console for https://www.observe888.com/.",
        "",
        "Required:",
        "",
        "- $HintQueryZh.csv",
        "- $HintPageZh.csv",
        "",
        "Recommended:",
        "",
        "- $HintChartZh.csv",
        "",
        "Run again after placing the files:",
        "",
        "Command:",
        "powershell -NoProfile -ExecutionPolicy Bypass -File tools\run_seo_recurring_check.ps1 -Mode Weekly",
        "",
        "This task reads and analyzes local exports only. It does not edit public pages."
    )
    Set-Content -LiteralPath $ReadmePath -Value $Lines -Encoding UTF8
    return $ReadmePath
}

function Open-ReminderTargets {
    if ($NoOpen) {
        Add-Log "- NoOpen: skipped opening GSC and export folder."
        return
    }

    try {
        $ChromePath = Get-ChromePath
        if ($ChromePath) {
            Start-Process -FilePath $ChromePath -ArgumentList @("--profile-directory=Profile 1", $GscUrl)
            Add-Log "- Opened GSC with Chrome profile directory Profile 1."
        }
        else {
            Start-Process $GscUrl
            Add-Log "- Chrome not found; opened GSC URL with default browser."
        }
    }
    catch {
        Add-Log ("- Could not open GSC: {0}" -f $_.Exception.Message)
    }

    try {
        Start-Process -FilePath "explorer.exe" -ArgumentList @($ExportDir)
        Add-Log "- Opened export folder."
    }
    catch {
        Add-Log ("- Could not open export folder: {0}" -f $_.Exception.Message)
    }
}

function Show-Popup {
    param(
        [string]$Title,
        [string[]]$Lines
    )

    if ($NoOpen) {
        return
    }

    try {
        $Shell = New-Object -ComObject WScript.Shell
        $Shell.Popup(($Lines -join "`n"), 45, $Title, 64) | Out-Null
    }
    catch {
        Add-Log ("- Could not show popup: {0}" -f $_.Exception.Message)
    }
}

function Write-LocalLog {
    param([string]$Status)

    $Stamp = (Get-Date).ToString("yyyy-MM-dd-HHmmss")
    $LogPath = Join-Path $LogDir ("{0}-{1}.md" -f $Stamp, $Mode.ToLowerInvariant())
    $Lines = @(
        "# SEO recurring task - $Stamp",
        "",
        "- Mode: $Mode",
        "- Status: $Status",
        "- Date label: $DateLabel",
        "- Export dir: $ExportDir",
        "- Analysis path: $AnalysisPath",
        "- Repair window today: $(Test-RepairWindow $Now)",
        "- Monthly window today: $(Test-FirstSaturday $Now)",
        "",
        "## Log"
    )
    $Lines += $script:Log
    Set-Content -LiteralPath $LogPath -Value $Lines -Encoding UTF8
    return $LogPath
}

Ensure-Directory $ExportDir
Ensure-Directory $AnalysisDir
Ensure-Directory $LogDir

Add-Log ("- Started at {0}." -f $Now.ToString("yyyy-MM-dd HH:mm:ss"))
Add-Log ("- Repo root: {0}." -f $RepoRoot)
Add-Log ("- Mode: {0}." -f $Mode)

$IsRepairWindow = Test-RepairWindow $Now
$IsMonthlyWindow = Test-FirstSaturday $Now

if ($Mode -eq "Repair" -and -not $IsRepairWindow) {
    Add-Log "- Quiet skip: today is not the biweekly public-page repair window."
    $LogPath = Write-LocalLog "skipped"
    Write-Host "Skipped repair reminder. Log: $LogPath"
    return
}

if ($Mode -eq "Monthly" -and -not $IsMonthlyWindow) {
    Add-Log "- Quiet skip: today is not the first Saturday of the month."
    $LogPath = Write-LocalLog "skipped"
    Write-Host "Skipped monthly reminder. Log: $LogPath"
    return
}

Open-ReminderTargets

$QueryCsv = Find-CsvByHint $ExportDir @($HintQueryZh, "query", "queries")
$PageCsv = Find-CsvByHint $ExportDir @($HintPageZh, "page", "pages")
$ChartCsv = Find-CsvByHint $ExportDir @($HintChartZh, "chart", "dates")
$HasRequiredCsv = ($null -ne $QueryCsv -and $null -ne $PageCsv)
$AnalysisStatus = "not-run"

if ($HasRequiredCsv) {
    Add-Log ("- Query CSV: {0}." -f $QueryCsv)
    Add-Log ("- Page CSV: {0}." -f $PageCsv)
    if ($ChartCsv) {
        Add-Log ("- Chart CSV: {0}." -f $ChartCsv)
    }
    else {
        Add-Log "- Chart CSV not found; analyzer will use query row sum for total."
    }

    $PythonPath = Get-PythonPath
    if (-not $PythonPath) {
        $AnalysisStatus = "python-missing"
        Add-Log "- Python was not found; analyzer did not run."
    }
    elseif (-not (Test-Path -LiteralPath $Analyzer)) {
        $AnalysisStatus = "analyzer-missing"
        Add-Log ("- Analyzer not found: {0}." -f $Analyzer)
    }
    else {
        Add-Log ("- Running analyzer with {0}." -f $PythonPath)
        & $PythonPath $Analyzer --export-dir $ExportDir --output $AnalysisPath --date-label $DateLabel
        if ($LASTEXITCODE -eq 0) {
            $AnalysisStatus = "ok"
            Add-Log ("- Analysis written: {0}." -f $AnalysisPath)
        }
        else {
            $AnalysisStatus = "failed"
            Add-Log ("- Analyzer failed with exit code {0}." -f $LASTEXITCODE)
        }
    }
}
else {
    $ReadmePath = Write-ExportInstructions $ExportDir
    Add-Log "- Required CSV files not found."
    Add-Log ("- Wrote export instructions: {0}." -f $ReadmePath)
}

$Title = switch ($Mode) {
    "Weekly" { $TaskTitleWeekly }
    "Repair" { $TaskTitleRepair }
    "Monthly" { $TaskTitleMonthly }
}

$PopupLines = New-Object System.Collections.Generic.List[string]
$PopupLines.Add($Title) | Out-Null
$PopupLines.Add(("Date: {0}" -f $DateLabel)) | Out-Null
$PopupLines.Add(("Export folder: {0}" -f $ExportDir)) | Out-Null

if ($HasRequiredCsv -and $AnalysisStatus -eq "ok") {
    $PopupLines.Add(("GSC analysis updated: {0}" -f $AnalysisPath)) | Out-Null
}
elseif ($HasRequiredCsv) {
    $PopupLines.Add(("CSV files found, analysis status: {0}" -f $AnalysisStatus)) | Out-Null
}
else {
    $PopupLines.Add(("Please export {0}.csv / {1}.csv from Search Console." -f $HintQueryZh, $HintPageZh)) | Out-Null
}

if ($Mode -eq "Repair") {
    $PopupLines.Add("Repair window: pick only 1-3 public-page edits from GSC evidence.") | Out-Null
}
elseif ($Mode -eq "Monthly") {
    $PopupLines.Add("Monthly review: old URLs, service pages, FAQ, GBP, Maps, Ads search terms.") | Out-Null
}
else {
    if ($IsRepairWindow) {
        $PopupLines.Add("Today is also a biweekly repair window.") | Out-Null
    }
    if ($IsMonthlyWindow) {
        $PopupLines.Add("Today is also a monthly review day.") | Out-Null
    }
}

Show-Popup $Title $PopupLines.ToArray()

$LogPath = Write-LocalLog $AnalysisStatus
Write-Host "SEO recurring task finished. Mode: $Mode. Status: $AnalysisStatus. Log: $LogPath"
