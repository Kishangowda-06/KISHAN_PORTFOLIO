@echo off
title Deploy Kishan P S Portfolio to GitHub Pages
color 0b
echo ===================================================================
echo     KISHAN P S - PORTFOLIO GITHUB PAGES 1-CLICK DEPLOYER
echo ===================================================================
echo.

:: Check Git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in PATH.
    pause
    exit /b
)

:: Ensure on main branch
git branch -M main

:: Configure remote origin
git remote remove origin >nul 2>&1
git remote add origin https://github.com/Kishangowda-06/portfolio.git
echo [OK] Remote set to: https://github.com/Kishangowda-06/portfolio.git
echo.

echo Step 1: Pushing code to GitHub...
echo (If prompted, log in with your GitHub credentials or Personal Access Token)
echo.

git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ===================================================================
    echo [NOTE] If GitHub said "repository not found", please:
    echo 1. Open: https://github.com/new
    echo 2. Repository name: portfolio
    echo 3. Keep it Public, leave "Add README" UNCHECKED
    echo 4. Click "Create repository"
    echo 5. Run this deploy-to-github.bat script again!
    echo ===================================================================
    echo.
) else (
    echo.
    echo ===================================================================
    echo [SUCCESS] Code successfully pushed to GitHub!
    echo.
    echo Your automated GitHub Actions workflow will deploy your site.
    echo Live URL will be active at:
    echo https://kishangowda-06.github.io/portfolio/
    echo ===================================================================
    echo.
)

pause
