@echo off
echo Navigating to Quizventure Backend...
echo.

cd /d "C:\laragon\www\quizventure\backend"

if exist package.json (
    echo ✓ Found backend files!
    echo Current location: %cd%
    echo.
    echo To install dependencies, type: npm install
    echo To start server, type: node server.js
) else (
    echo ✗ Backend folder not found or package.json missing
    echo.
    echo Please check:
    echo 1. C:\laragon\www\quizventure\backend\ exists
    echo 2. package.json exists in that folder
)

echo.
pause