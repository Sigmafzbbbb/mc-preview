@echo off
chcp 65001 >nul
title 投影预览 - 本地服务器
echo.
echo  ╔══════════════════════════════════════╗
echo  ║   投影预览 - 本地服务器已启动        ║
echo  ╠══════════════════════════════════════╣
echo  ║                                      ║
echo  ║   浏览器访问: http://localhost:8080   ║
echo  ║                                      ║
echo  ║   按 Ctrl+C 停止服务器               ║
echo  ║                                      ║
echo  ╚══════════════════════════════════════╝
echo.

cd /d "%~dp0"

start "" "http://localhost:8080"

python -m http.server 8080 --bind 127.0.0.1

pause
