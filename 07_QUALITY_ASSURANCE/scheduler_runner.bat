@echo off
REM JayT Authorized Cadence Sweep Runner (056)
REM Directive: JAYT-AUTHORIZED-CADENCE-SCAN-056

cd /d "%~dp0.."
node "%~dp0cadence_sweep_runner_056.js" %1
