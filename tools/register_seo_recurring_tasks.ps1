param(
    [switch]$WhatIfOnly
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
$TaskFolderName = $BrandName + (New-TextFromCodePoints @(0x71DF, 0x904B))
$TaskPath = "\" + $TaskFolderName + "\"
$TaskNameWeekly = $BrandName + " SEO " + (New-TextFromCodePoints @(0x9031, 0x6AA2))
$TaskNameRepair = $BrandName + " SEO " + (New-TextFromCodePoints @(0x96D9, 0x9031, 0x4FEE, 0x5FA9, 0x7A97, 0x53E3))
$TaskNameMonthly = $BrandName + (New-TextFromCodePoints @(0x641C, 0x5C0B, 0x5165, 0x53E3, 0x6708, 0x76E4, 0x9EDE))

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$Runner = Join-Path $PSScriptRoot "run_seo_recurring_check.ps1"

if (-not (Test-Path -LiteralPath $Runner)) {
    throw "Runner script not found: $Runner"
}

function Ensure-TaskFolder {
    param([string]$Path)

    $Service = New-Object -ComObject Schedule.Service
    $Service.Connect()
    $Current = $Service.GetFolder("\")
    $Parts = $Path.Trim("\").Split("\")

    foreach ($Part in $Parts) {
        if (-not $Part) {
            continue
        }

        try {
            $Current = $Current.GetFolder($Part)
        }
        catch {
            $Current = $Current.CreateFolder($Part)
        }
    }
}

function New-SeoTaskAction {
    param([string]$Mode)

    $Arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$Runner`" -Mode $Mode"
    return New-ScheduledTaskAction -Execute "powershell.exe" -Argument $Arguments
}

function Set-StartBoundary {
    param(
        [Microsoft.Management.Infrastructure.CimInstance]$Trigger,
        [string]$StartBoundary
    )

    if ($Trigger.PSObject.Properties.Name -contains "StartBoundary") {
        $Trigger.StartBoundary = $StartBoundary
    }
    return $Trigger
}

$WeeklyTrigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Saturday -At ([datetime]"2026-06-13T11:00:00")
$WeeklyTrigger = Set-StartBoundary $WeeklyTrigger "2026-06-13T11:00:00"

$RepairTrigger = New-ScheduledTaskTrigger -Weekly -WeeksInterval 2 -DaysOfWeek Saturday -At ([datetime]"2026-06-27T11:05:00")
$RepairTrigger = Set-StartBoundary $RepairTrigger "2026-06-27T11:05:00"

$MonthlyTrigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Saturday -At ([datetime]"2026-06-13T11:10:00")
$MonthlyTrigger = Set-StartBoundary $MonthlyTrigger "2026-06-13T11:10:00"

$UserId = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
$Principal = New-ScheduledTaskPrincipal -UserId $UserId -LogonType Interactive -RunLevel Limited
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -StartWhenAvailable -MultipleInstances IgnoreNew

$Tasks = @(
    @{
        Name = $TaskNameWeekly
        Mode = "Weekly"
        Trigger = $WeeklyTrigger
        Description = "Weekly Saturday 11:00 GSC export reminder and analyzer runner."
    },
    @{
        Name = $TaskNameRepair
        Mode = "Repair"
        Trigger = $RepairTrigger
        Description = "Biweekly Saturday 11:05 public-page repair reminder. First window 2026-06-27."
    },
    @{
        Name = $TaskNameMonthly
        Mode = "Monthly"
        Trigger = $MonthlyTrigger
        Description = "Weekly trigger that only reminds on the first Saturday of each month."
    }
)

if (-not $WhatIfOnly) {
    Ensure-TaskFolder $TaskPath
}

foreach ($Task in $Tasks) {
    $Action = New-SeoTaskAction $Task.Mode
    if ($WhatIfOnly) {
        Write-Host ("WHATIF register task: {0} ({1})" -f $Task.Name, $Task.Mode)
        continue
    }

    Register-ScheduledTask `
        -TaskName $Task.Name `
        -TaskPath $TaskPath `
        -Action $Action `
        -Trigger $Task.Trigger `
        -Principal $Principal `
        -Settings $Settings `
        -Description $Task.Description `
        -Force | Out-Null

    Write-Host ("Registered task: {0}{1}" -f $TaskPath, $Task.Name)
}

if (-not $WhatIfOnly) {
    foreach ($Task in $Tasks) {
        $Info = Get-ScheduledTaskInfo -TaskPath $TaskPath -TaskName $Task.Name
        Write-Host ("{0} next run: {1}; last result: {2}" -f $Task.Name, $Info.NextRunTime, $Info.LastTaskResult)
    }
}
