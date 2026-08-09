@echo off
D:
cd D:\SCRAMJET

echo Starting proxy with pnpm...
start /B pnpm start

echo Waiting 5 seconds for proxy to initialize...
timeout /t 5 /nobreak > nul

echo Starting ngrok tunnel...
ngrok http --url=bamboo-pucker-freebee.ngrok-free.dev --authtoken=3Hc79cjVFtUwba4q4pKG329zk1k_2p3oyKi2pzxDdFxbcPWHK 8080