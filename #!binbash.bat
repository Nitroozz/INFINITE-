@echo off
D:
cd D:\SCRAMJET

echo Starting proxy with pnpm...
start /B pnpm start

echo Waiting 5 seconds for proxy to initialize...
timeout /t 5 /nobreak > nul

echo Starting ngrok tunnel...
ngrok http --url=repurpose-aneurism-overarch.ngrok-free.dev --authtoken=3HTODwJT983Mxkzhwav34Tf9WO1_26kX7AtqYffdsDnq2VrTe 8080