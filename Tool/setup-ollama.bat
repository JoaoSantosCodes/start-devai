@echo off
chcp 65001 > nul
echo Verificando privilégios de administrador...
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Privilégios de administrador confirmados.
) else (
    echo Este script precisa ser executado como administrador.
    echo Por favor, clique com o botão direito e selecione "Executar como administrador"
    pause
    exit /b 1
)

echo.
echo Verificando se o Ollama está instalado...
where ollama >nul 2>&1
if %errorLevel% neq 0 (
    echo Ollama não encontrado no sistema.
    echo Por favor, instale o Ollama primeiro.
    pause
    exit /b 1
)

echo.
echo Iniciando o Ollama...
start "" ollama serve

echo.
echo Aguardando o Ollama iniciar...
ping 127.0.0.1 -n 6 > nul

echo.
echo Verificando se o Ollama está respondendo...
curl -s http://localhost:11434/api/version > nul
if %errorLevel% == 0 (
    echo Ollama iniciado com sucesso!
    echo Agora você pode usar a extensão DevAI no VS Code.
) else (
    echo Erro: Ollama não está respondendo.
    echo Por favor, verifique se não há outro processo do Ollama rodando.
    echo Você pode tentar reiniciar o computador e executar este script novamente.
)
echo.
pause 