<#
  export-pptx-png.ps1 - export a .pptx to one PNG per slide using the installed
  Windows PowerPoint (COM automation). Called by render-deck.sh from WSL.

  Refuses to run if PowerPoint is already open, because COM would attach to and
  then quit that instance, closing the deck you're reviewing.

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

if (Get-Process -Name POWERPNT -ErrorAction SilentlyContinue) {
  Write-Error "PowerPoint is already running. Close it first; automation would disrupt your open session."
  exit 3
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
