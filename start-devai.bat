@echo off
setlocal enabledelayedexpansion

echo ===================================
echo    Iniciando DevAI Assistant
echo ===================================
echo.

:: Debug do PATH
echo [DEBUG] PATH atual:
echo %PATH%
echo.

:: Verificar se o Python está instalado
echo Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Python nao encontrado! Por favor, instale o Python 3.8 ou superior.
    pause
    exit /b 1
) else (
    echo [OK] Python encontrado
)
echo [DEBUG] Fim da checagem do Python

:: Verificar se o Node.js está instalado
echo.
echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Node.js nao encontrado! Por favor, instale o Node.js v18 ou superior.
    pause
    exit /b 1
) else (
    echo [OK] Node.js encontrado
)
echo [DEBUG] Fim da checagem do Node.js

:: Verificar npm (versão simplificada)
echo.
echo Verificando npm...
where npm >nul 2>&1
if errorlevel 1 (
    echo [AVISO] npm nao encontrado no PATH, mas continuando...
) else (
    echo [OK] npm encontrado
)
echo [DEBUG] Fim da checagem do npm

:: Ativar ambiente virtual
echo.
echo Ativando ambiente virtual...
if not exist .venv (
    echo Criando ambiente virtual...
    python -m venv .venv
    if errorlevel 1 (
        echo [ERRO] Falha ao criar ambiente virtual
        pause
        exit /b 1
    )
)

call .venv\Scripts\activate
if errorlevel 1 (
    echo [ERRO] Falha ao ativar ambiente virtual
    pause
    exit /b 1
)
echo [OK] Ambiente virtual ativado
echo [DEBUG] Fim da ativação do ambiente virtual

:: Instalar dependências se necessário
echo.
echo Verificando dependencias...
if not exist node_modules (
    echo Instalando dependencias Node.js...
    call npm install
    if errorlevel 1 (
        echo [AVISO] Falha ao instalar dependencias Node.js, mas continuando...
    ) else (
        echo [OK] Dependencias Node.js instaladas
    )
) else (
    echo [OK] Dependencias Node.js ja instaladas
)
echo [DEBUG] Fim da checagem das dependencias Node.js

if not exist .venv\Lib\site-packages\psutil (
    echo Instalando dependencias Python...
    call pip install -r requirements.txt
    if errorlevel 1 (
        echo [AVISO] Falha ao instalar dependencias Python, mas continuando...
    ) else (
        echo [OK] Dependencias Python instaladas
    )
) else (
    echo [OK] Dependencias Python ja instaladas
)
echo [DEBUG] Fim da checagem das dependencias Python

:: Verificar se o Ollama está instalado
echo.
echo Verificando Ollama...
where ollama >nul 2>&1
if errorlevel 1 (
    echo [AVISO] Ollama nao encontrado! Por favor, instale o Ollama.
    echo Voce pode baixar em: https://ollama.ai/
    echo Continuando sem Ollama...
) else (
    echo [OK] Ollama encontrado
)
echo [DEBUG] Fim da checagem do Ollama

:: Iniciar o servidor em segundo plano
echo.
echo Iniciando servidor...
start /B python src/core/setup_manager.py
echo [DEBUG] Servidor iniciado (ou tentativa)

:: Aguardar o servidor iniciar
echo Aguardando servidor iniciar...
timeout /t 5 /nobreak
echo [DEBUG] Fim do timeout de inicialização do servidor

:: Verificar se o servidor está rodando
tasklist /FI "IMAGENAME eq python.exe" | find "python.exe" >nul
if errorlevel 1 (
    echo [AVISO] Servidor pode nao ter iniciado corretamente.
    echo Verifique os logs em logs/devai_setup.log
    echo Continuando mesmo assim...
) else (
    echo [OK] Servidor iniciado com sucesso
)
echo [DEBUG] Fim da checagem do servidor

:: Abrir VS Code com a extensão
echo.
echo Abrindo VS Code...
start code . --new-window --install-extension devai-assistant
echo [DEBUG] VS Code aberto

:: Aguardar o VS Code abrir e a extensão ser carregada
echo Aguardando VS Code e extensao carregarem...
timeout /t 10 /nobreak

:: Executar comando para iniciar o assistente
echo Iniciando DevAI Assistant...
code --command "devai-assistant.start"
echo [DEBUG] Comando de inicio enviado

echo.
echo ===================================
echo    DevAI Assistant Iniciado!
echo ===================================
echo.
echo Para usar:
echo 1. O VS Code foi aberto com a extensao instalada
echo 2. O assistente foi iniciado automaticamente
echo 3. Use o icone na barra de status ou Ctrl+Shift+P
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause >nul 