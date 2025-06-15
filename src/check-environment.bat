@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo Verificando ambiente...
echo.

:: Verifica VS Code
echo Verificando VS Code...
where code >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] VS Code encontrado no PATH
) else (
    echo [AVISO] VS Code não encontrado no PATH
    if exist "%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" (
        echo [INFO] VS Code encontrado no local padrão
        echo Adicionando VS Code ao PATH...
        setx PATH "%PATH%;%LOCALAPPDATA%\Programs\Microsoft VS Code\bin" /M
        echo [OK] VS Code adicionado ao PATH
    ) else (
        echo [ERRO] VS Code não encontrado
        echo Por favor, instale o VS Code em: https://code.visualstudio.com/
        pause
        exit /b 1
    )
)

:: Verifica Node.js
echo.
echo Verificando Node.js...
where node >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Node.js encontrado
) else (
    echo [ERRO] Node.js não encontrado
    echo Por favor, instale o Node.js em: https://nodejs.org/
    pause
    exit /b 1
)

:: Verifica npm
echo.
echo Verificando npm...
where npm >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] npm encontrado
) else (
    echo [ERRO] npm não encontrado
    echo Por favor, instale o Node.js (que inclui npm) em: https://nodejs.org/
    pause
    exit /b 1
)

:: Verifica Ollama
echo.
echo Verificando Ollama...
where ollama >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Ollama encontrado
) else (
    echo [ERRO] Ollama não encontrado
    echo Por favor, instale o Ollama em: https://ollama.ai/
    pause
    exit /b 1
)

:: Verifica dependências do projeto
echo.
echo Verificando dependências do projeto...
if not exist "node_modules" (
    echo [INFO] Instalando dependências...
    call npm install
    if %errorLevel% == 0 (
        echo [OK] Dependências instaladas
    ) else (
        echo [ERRO] Falha ao instalar dependências
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependências encontradas
)

:: Verifica modelo do Ollama
echo.
echo Verificando modelo do Ollama...
curl -s http://localhost:11434/api/tags > nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Ollama está rodando
    curl -s http://localhost:11434/api/tags | findstr "deepseek-coder:6.7b" > nul
    if %errorLevel% == 0 (
        echo [OK] Modelo deepseek-coder:6.7b encontrado
    ) else (
        echo [INFO] Baixando modelo deepseek-coder:6.7b...
        ollama pull deepseek-coder:6.7b
        if %errorLevel% == 0 (
            echo [OK] Modelo baixado com sucesso
        ) else (
            echo [ERRO] Falha ao baixar modelo
            pause
            exit /b 1
        )
    )
) else (
    echo [INFO] Iniciando Ollama...
    start "" ollama serve
    timeout /t 5 /nobreak > nul
    echo [INFO] Baixando modelo deepseek-coder:6.7b...
    ollama pull deepseek-coder:6.7b
    if %errorLevel% == 0 (
        echo [OK] Modelo baixado com sucesso
    ) else (
        echo [ERRO] Falha ao baixar modelo
        pause
        exit /b 1
    )
)

echo.
echo [OK] Verificação do ambiente concluída!
echo.
echo Pressione qualquer tecla para iniciar o DevAI Assistant...
pause > nul

:: Inicia o DevAI Assistant
start-ollama.bat 