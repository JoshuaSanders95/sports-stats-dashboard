@echo off
echo ========================================
echo   Sports Stats Dashboard - Local Server
echo ========================================
echo.
echo Starting local server on http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

REM Try Node.js http-server first
where node >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo Using Node.js http-server...
    npx -y http-server -p 8000 -o
    goto :end
)

REM Try Python if Node.js not available
where python >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo Using Python http.server...
    python -m http.server 8000
    goto :end
)

REM If neither available
echo ERROR: Neither Node.js nor Python found!
echo.
echo Please install one of the following:
echo   - Node.js: https://nodejs.org/
echo   - Python: https://www.python.org/
echo.
pause

:end
