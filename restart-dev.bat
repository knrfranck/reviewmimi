@echo off
cd /d "%~dp0"
echo Clearing Next.js cache (required after route changes)...
if exist .next rmdir /s /q .next
echo.
echo Building...
call npm run build
if errorlevel 1 (
  echo Build failed. Fix errors above, then run this script again.
  pause
  exit /b 1
)
echo.
echo Starting dev server at http://localhost:3000
call npm run dev
