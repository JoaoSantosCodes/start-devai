@echo off
chcp 65001 > nul

:: Verifica se já está rodando como administrador
net session >nul 2>&1
if %errorLevel% == 0 (
    :: Se já for admin, executa o script original
    call setup-ollama.bat
    
    echo.
    echo Compilando a extensão...
    call npm run compile
    
    echo.
    echo Verificando VS Code...
    where code >nul 2>&1
    if %errorLevel% == 0 (
        echo Abrindo VS Code...
        start "" code .
    ) else (
        echo Procurando VS Code no local padrão...
        if exist "%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" (
            echo Abrindo VS Code...
            start "" "%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" .
        ) else (
            echo VS Code não encontrado.
            echo Por favor, instale o VS Code ou adicione-o ao PATH do sistema.
            echo Você pode baixar o VS Code em: https://code.visualstudio.com/
        )
    )
    
    echo.
    echo Para usar o DevAI Assistant:
    echo 1. Pressione Ctrl+Shift+P
    echo 2. Digite "Open DevAI Assistant"
    echo 3. Selecione o comando para abrir o painel de chat
    echo.
    pause
) else (
    :: Se não for admin, cria um arquivo temporário VBS para elevar privilégios
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\elevate.vbs"
    echo UAC.ShellExecute "start-ollama.bat", "", "", "runas", 1 >> "%temp%\elevate.vbs"
    
    :: Executa o VBS e remove ele
    start "" "%temp%\elevate.vbs"
    timeout /t 1 /nobreak > nul
    del "%temp%\elevate.vbs"
) 