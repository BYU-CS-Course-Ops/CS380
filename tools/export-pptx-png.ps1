<#
  export-pptx-png.ps1 - export a .pptx to one PNG per slide using the installed
  Windows PowerPoint (COM automation). Called by render-deck.sh from WSL.

  Guard: if PowerPoint is genuinely open (a visible window), this refuses so it
  won't disturb an interactive review session. But a *headless* leftover
  instance from an earlier COM run (a process with no window) is cleared
  automatically, so a stale process never blocks a render.

  Params take WINDOWS paths (render-deck.sh translates them with wslpath -w).

  NOTE: keep this file pure ASCII with CRLF endings. Windows PowerShell 5.1
  reads a BOM-less script as the ANSI code page, so a stray non-ASCII char
  (e.g. an em-dash) can decode into a smart-quote and break parsing.
#>
param(
  [Parameter(Mandatory = $true)][string]$InPath,
  [Parameter(Mandatory = $true)][string]$OutDir,
  [int]$Width = 1920,
  [int]$Height = 1080
)
$ErrorActionPreference = "Stop"
$msoFalse = 0
$msoTrue  = -1

$ppts = Get-Process -Name POWERPNT -ErrorAction SilentlyContinue
if ($ppts) {
  # A process with a non-empty main-window title is a real, interactive session.
  $interactive = @($ppts | Where-Object { $_.MainWindowTitle -ne "" })
  if ($interactive.Count -gt 0) {
    Write-Error "PowerPoint is open (a window is showing). Close it first; automation would disrupt your session."
    exit 3
  }
  # Otherwise these are headless leftovers from an earlier run - clear them.
  Write-Output ("Clearing {0} stale headless PowerPoint process(es)..." -f $ppts.Count)
  $ppts | Stop-Process -Force -ErrorAction SilentlyContinue
  Start-Sleep -Milliseconds 800
}

if (-not (Test-Path -LiteralPath $InPath)) { Write-Error "Input not found: $InPath"; exit 2 }
if (-not (Test-Path -LiteralPath $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }
Get-ChildItem -LiteralPath $OutDir -Filter *.PNG -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue

$ppt  = New-Object -ComObject PowerPoint.Application
$pres = $null
try {
  # Open(FileName, ReadOnly, Untitled, WithWindow). Try windowless; some builds
  # refuse that for export, so fall back to opening with a window.
  try   { $pres = $ppt.Presentations.Open($InPath, $msoTrue, $msoFalse, $msoFalse) }
  catch { $pres = $ppt.Presentations.Open($InPath, $msoTrue, $msoFalse, $msoTrue) }

  $pres.Export($OutDir, "PNG", $Width, $Height)
  Write-Output ("EXPORTED {0} slides to {1}" -f $pres.Slides.Count, $OutDir)
}
finally {
  if ($pres) { try { $pres.Close() } catch {} }
  try { $ppt.Quit() } catch {}
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null
  [GC]::Collect(); [GC]::WaitForPendingFinalizers()
}
