@echo off
setlocal enabledelayedexpansion

REM Pastikan script dijalankan sebagai administrator
NET SESSION >nul 2>&1
if %errorLevel% neq 0 (
    echo This script must be run as Administrator
    pause
    exit /b 1
)

REM Variabel untuk IP dan port
set SERVER_IP=192.168.137.1
set SERVER_PORT=80
set NEST_PORT=3000

REM Hapus aturan firewall yang mungkin sudah ada sebelumnya
netsh advfirewall firewall delete rule name="Captive Portal HTTP Redirect" >nul 2>&1

REM Tambahkan aturan firewall baru untuk HTTP
netsh advfirewall firewall add rule name="Captive Portal HTTP Redirect" dir=in action=allow protocol=TCP localport=%SERVER_PORT%

REM Konfigurasi port forwarding untuk HTTP
netsh interface portproxy delete v4tov4 listenport=%SERVER_PORT% listenaddress=0.0.0.0 >nul 2>&1
netsh interface portproxy add v4tov4 listenport=%SERVER_PORT% listenaddress=0.0.0.0 connectport=%NEST_PORT% connectaddress=%SERVER_IP%

echo Configuration completed successfully.
echo Port %SERVER_PORT% (HTTP) requests will be forwarded to Nest.js application on %SERVER_IP%:%NEST_PORT%.
pause