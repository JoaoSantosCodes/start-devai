# Script para detectar e adicionar o npm ao PATH do sistema
# Autor: Claude
# Data: 2025-06-14

# Verifica se está rodando como administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Elevando privilégios de administrador..."
    Start-Process powershell.exe -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

# Função para verificar se o npm está no PATH
function Test-NpmInPath {
    try {
        $npmVersion = npm --version
        Write-Host "npm encontrado no PATH: $npmVersion"
        return $true
    } catch {
        Write-Host "npm não encontrado no PATH."
        return $false
    }
}

# Verifica se o npm já está no PATH
if (Test-NpmInPath) {
    Write-Host "O npm já está no PATH. Nenhuma ação necessária."
    exit
}

# Caminhos comuns onde o npm pode estar instalado
$possiblePaths = @(
    "C:\Program Files\nodejs",
    "C:\Program Files (x86)\nodejs",
    "$env:APPDATA\npm"
)

# Procura o npm nos caminhos possíveis
$npmPath = $null
foreach ($path in $possiblePaths) {
    if (Test-Path "$path\npm.cmd") {
        $npmPath = $path
        break
    }
}

if ($npmPath) {
    Write-Host "npm encontrado em: $npmPath"
    
    # Adiciona o caminho ao PATH do sistema
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
    if ($currentPath -notlike "*$npmPath*") {
        $newPath = "$currentPath;$npmPath"
        [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
        Write-Host "Caminho do npm adicionado ao PATH do sistema."
    } else {
        Write-Host "O caminho do npm já está no PATH do sistema."
    }
} else {
    Write-Host "npm não encontrado nos caminhos comuns. Por favor, instale o Node.js ou adicione o npm manualmente ao PATH."
}

Write-Host "Script concluído. Reinicie o computador para aplicar as alterações." 