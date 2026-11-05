@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if not errorlevel 1 (
  node scripts\serve.mjs
  exit /b
)

rem Pouzit Node dodavany s aplikaci Codex, pokud neni v PATH.
set "GAME_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if exist "%GAME_NODE%" (
  "%GAME_NODE%" scripts\serve.mjs
  exit /b
)

echo Node.js nebyl nalezen. Hru lze take spustit na GitHub Pages podle README.md.
pause
exit /b 1
