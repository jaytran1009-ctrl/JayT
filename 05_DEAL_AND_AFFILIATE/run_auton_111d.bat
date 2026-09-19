@echo off
chcp 65001 >nul
cd /d "%~dp0\.."
node 05_DEAL_AND_AFFILIATE/autonomous_orchestrator_111d.js
exit /b %ERRORLEVEL%