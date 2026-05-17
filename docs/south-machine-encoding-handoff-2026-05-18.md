# 南區機器 PowerShell / UTF-8 交接

最後更新：2026-05-18

## 為什麼放在官網專案

這份文件不是官網功能規格，但南北區目前靠同一個 GitHub repo 交接工作狀態。若只留在南區本機或 Codex 記憶，北區電腦拉不到；因此暫時放在本 repo 的 `docs/`，作為跨機器環境交接。

## 適用範圍

- 南區電腦：`D:\見觀營運資料夾`
- 南區官網 repo：`D:\見觀營運資料夾\01_官網_ObserveGeoPages`
- Shell：Windows PowerShell 5.1 Desktop
- 目的：讓 Codex / PowerShell 讀取繁體中文 Markdown、git 輸出與管線輸出時，不需要每次手動繞路加 UTF-8 設定。

## 修正前診斷

2026-05-18 在南區電腦讀回：

- `PSVersion`：`5.1.26100.8457`
- `PSEdition`：`Desktop`
- `Culture`：`zh-TW`
- `UICulture`：`en-US`
- Windows 系統 ANSI code page：`950`
- Windows 系統 OEM code page：`950`
- 初始 `chcp`：`950`
- 初始 `[Console]::InputEncoding.CodePage`：`950`
- 初始 `$OutputEncoding.CodePage`：`20127`，也就是 ASCII
- `LANG`、`LC_ALL`、`PYTHONUTF8`、`PYTHONIOENCODING` 原本皆未設定
- `C:\Users\Paulus\Documents\WindowsPowerShell\profile.ps1` 原本不存在
- Git 原本沒有下列全域設定：
  - `core.quotepath`
  - `i18n.logOutputEncoding`
  - `i18n.commitEncoding`
  - `gui.encoding`
- 工作區 Markdown 多為 UTF-8 無 BOM。Windows PowerShell 5.1 在這台機器上若未指定 encoding，會用 ANSI / Big5 讀取無 BOM 文字。

直接證據：

```powershell
Get-Content -Encoding utf8 HANDOFF.md -TotalCount 3
```

可正常顯示：

```text
# ObserveGeoPages 交接

最後更新：2026-05-14
```

但不指定 encoding 時：

```powershell
Get-Content HANDOFF.md -TotalCount 3
```

會出現類似：

```text
# ObserveGeoPages 鈭斗

?敺?堆?2026-05-14
```

## 已套用修正

### 1. Windows PowerShell profile

已建立：

```text
C:\Users\Paulus\Documents\WindowsPowerShell\profile.ps1
```

內容：

```powershell
# Keep Chinese workspace output stable in Windows PowerShell 5.1.
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)

try {
    chcp 65001 > $null
} catch {
}

[Console]::InputEncoding = $utf8NoBom
[Console]::OutputEncoding = $utf8NoBom
$OutputEncoding = $utf8NoBom

$PSDefaultParameterValues['Get-Content:Encoding'] = 'UTF8'
$PSDefaultParameterValues['Select-String:Encoding'] = 'UTF8'
$PSDefaultParameterValues['Import-Csv:Encoding'] = 'UTF8'
$PSDefaultParameterValues['Export-Csv:Encoding'] = 'UTF8'
$PSDefaultParameterValues['Out-File:Encoding'] = 'UTF8'
$PSDefaultParameterValues['Set-Content:Encoding'] = 'UTF8'
$PSDefaultParameterValues['Add-Content:Encoding'] = 'UTF8'

$env:LANG = 'zh_TW.UTF-8'
$env:LC_ALL = 'zh_TW.UTF-8'
$env:PYTHONUTF8 = '1'
$env:PYTHONIOENCODING = 'utf-8'
```

### 2. Git 全域設定

已套用：

```powershell
git config --global core.quotepath false
git config --global i18n.logOutputEncoding utf-8
git config --global i18n.commitEncoding utf-8
git config --global gui.encoding utf-8
```

讀回結果：

```text
file:C:/Users/Paulus/.gitconfig  core.quotepath=false
file:C:/Users/Paulus/.gitconfig  i18n.logoutputencoding=utf-8
file:C:/Users/Paulus/.gitconfig  i18n.commitencoding=utf-8
file:C:/Users/Paulus/.gitconfig  gui.encoding=utf-8
```

## 驗證結果

新開一般 PowerShell，讓 profile 載入：

```powershell
powershell.exe -NoLogo -Command '@{ ConsoleInputCodePage=[Console]::InputEncoding.CodePage; ConsoleOutputCodePage=[Console]::OutputEncoding.CodePage; OutputEncodingCodePage=$OutputEncoding.CodePage; LANG=$env:LANG; LC_ALL=$env:LC_ALL; PYTHONUTF8=$env:PYTHONUTF8; PYTHONIOENCODING=$env:PYTHONIOENCODING } | ConvertTo-Json -Compress; chcp; Get-Content -TotalCount 3 "D:\見觀營運資料夾\01_官網_ObserveGeoPages\HANDOFF.md"'
```

結果：

```text
{"LANG":"zh_TW.UTF-8","LC_ALL":"zh_TW.UTF-8","ConsoleInputCodePage":65001,"OutputEncodingCodePage":65001,"PYTHONUTF8":"1","ConsoleOutputCodePage":65001,"PYTHONIOENCODING":"utf-8"}
Active code page: 65001
# ObserveGeoPages 交接

最後更新：2026-05-14
```

刻意用 `-NoProfile`：

```powershell
powershell.exe -NoLogo -NoProfile -Command '@{ ConsoleInputCodePage=[Console]::InputEncoding.CodePage; ConsoleOutputCodePage=[Console]::OutputEncoding.CodePage; OutputEncodingCodePage=$OutputEncoding.CodePage } | ConvertTo-Json -Compress; chcp; Get-Content -TotalCount 3 "D:\見觀營運資料夾\01_官網_ObserveGeoPages\HANDOFF.md"'
```

仍會亂碼。這代表修正點確實是 profile 是否載入；若 Codex、IDE 或其他工具用 `-NoProfile` 啟動 PowerShell，仍可能重現問題。

## 後續工作原則

- 在南區電腦的一般 Windows PowerShell 工作階段，不需要再每次手動加 `[Console]::OutputEncoding` 或 `Get-Content -Encoding utf8`。
- 如果又看到中文亂碼，先查工具是否用 `-NoProfile` 啟動。
- 如果改用 PowerShell 7，需要另外檢查或建立：

```text
C:\Users\Paulus\Documents\PowerShell\profile.ps1
```

- 如果問題發生在 `cmd.exe`、Git Bash、VS Code terminal、Windows Terminal profile、Python 子行程或其他 shell，需各自檢查啟動方式與 locale；本次修正主要覆蓋 Windows PowerShell 5.1。

## 北區狀態

目前 repo 內已有北區工作路徑與 Google Business / Google 公開面讀回紀錄：

- `HANDOFF.md`
- `PROJECT_CONTEXT.md`
- `docs/website-operations.md`
- `docs/google-business-backend-readback-2026-05-14.md`
- `docs/google-public-surface-readback-2026-05-14.md`

但目前沒有同等級的北區電腦 PowerShell / code page / profile 診斷紀錄。北區若也遇到亂碼，應在北區電腦上重新跑同類診斷，不要直接假設北區與南區設定相同。

## 北區可用的診斷命令

到北區電腦後，先在該機正式入口執行：

```powershell
@{
  PSVersion = $PSVersionTable.PSVersion.ToString()
  PSEdition = $PSVersionTable.PSEdition
  ConsoleInputEncoding = [Console]::InputEncoding.EncodingName
  ConsoleInputCodePage = [Console]::InputEncoding.CodePage
  ConsoleOutputEncoding = [Console]::OutputEncoding.EncodingName
  ConsoleOutputCodePage = [Console]::OutputEncoding.CodePage
  OutputEncoding = $OutputEncoding.EncodingName
  OutputEncodingCodePage = $OutputEncoding.CodePage
  Culture = (Get-Culture).Name
  UICulture = (Get-UICulture).Name
  SystemLocale = (Get-WinSystemLocale).Name
} | ConvertTo-Json -Depth 3
chcp
```

再檢查 profile：

```powershell
$paths=@(
  $PROFILE.AllUsersAllHosts,
  $PROFILE.AllUsersCurrentHost,
  $PROFILE.CurrentUserAllHosts,
  $PROFILE.CurrentUserCurrentHost
) | Select-Object -Unique

foreach($p in $paths){
  if(Test-Path -LiteralPath $p){
    "EXISTS`t$p"
    Select-String -LiteralPath $p -Pattern 'Encoding|OutputEncoding|InputEncoding|chcp|65001|950|utf8|utf-8|Console|LANG|LC_ALL|PYTHONUTF8|PYTHONIOENCODING' -CaseSensitive:$false
  } else {
    "MISSING`t$p"
  }
}
```

再檢查 Git：

```powershell
git config --global --list --show-origin | Select-String -Pattern 'core\.quotepath|i18n\.|gui\.encoding|encoding' -CaseSensitive:$false
```

若北區修正後，也應把北區診斷與修正結果補回本 repo，避免南北區之後再次各查一次。
