# Tutorial do DevAI Extension

Este tutorial guiará você através do uso do DevAI Extension, desde a instalação até recursos avançados.

## 1. Instalação

### Requisitos

-   VS Code
-   Node.js 16+
-   Python 3.8+
-   GPU NVIDIA (recomendado)

### Passos

1. **Instale o VS Code**

    - Baixe em: https://code.visualstudio.com/

2. **Instale a Extensão**

    - Abra o VS Code
    - Pressione `Ctrl+Shift+X`
    - Pesquise "DevAI"
    - Clique em "Instalar"

3. **Primeira Execução**
    - Pressione `Ctrl+Shift+P`
    - Digite "DevAI: Validar Extensões"
    - Siga as recomendações

## 2. Configuração Inicial

### 1. Preparação do Ambiente

```bash
# Clone o repositório
git clone https://github.com/JoaoSantosCodes/start-devai.git
cd start-devai

# Crie um ambiente virtual Python
python -m venv .venv
.venv\Scripts\activate

# Instale as dependências Python
pip install -r requirements.txt

# Instale as dependências Node.js
npm install
```

### 2. Instalação do DevAI

```bash
# Execute o script de setup
python src/core/setup_manager.py

# Siga as instruções na tela:
# - Verifique o ambiente
# - Configure o npm
# - Instale dependências
# - Inicie o servidor
```

### 3. Configuração do VS Code

-   Abra o VS Code
-   Pressione `Ctrl+Shift+P`
-   Digite "DevAI: Configure"
-   Ajuste as configurações:
    -   Limite de VRAM
    -   Processos protegidos
    -   Logs
    -   Performance

## 3. Recursos Básicos

### 1. Organizador de Extensões

-   Comando: `DevAI: Organizar Extensões`
-   Agrupa e gerencia suas extensões
-   Recomenda novas extensões
-   Otimiza o ambiente

### 2. Perfis Inteligentes

-   Comando: `DevAI: Validar Extensões`
-   Detecta o tipo de projeto
-   Sugere configurações ideais
-   Aplica perfis automaticamente

### 3. Análise de Desempenho

-   Comando: `DevAI: Analisar Desempenho`
-   Monitora uso de recursos
-   Identifica gargalos
-   Sugere otimizações

## 4. Recursos Avançados

### 1. Perfis Personalizados

```json
// .vscode/devai-profile.json
{
    "name": "Meu Perfil",
    "extensions": ["ms-python.python", "ms-vscode.vscode-typescript-tslint-plugin"],
    "settings": {
        "python.linting.enabled": true,
        "typescript.tsdk": "node_modules/typescript/lib"
    }
}
```

### 2. Scripts de Automação

```bash
# Organização automática
node scripts/organizar-projeto.js

# Análise de desempenho
node scripts/analisar-desempenho.js

# Backup de configurações
node scripts/backup-config.js
```

### 3. Integração com GitHub

```bash
# Atualização automática
node scripts/atualizar-github.js

# Backup no GitHub
node scripts/backup-github.js
```

## 5. Fluxo de Trabalho

### 1. Início do Projeto

```bash
# Clone o repositório
git clone https://github.com/JoaoSantosCodes/start-devai.git

# Instale dependências
npm install

# Compile o projeto
npm run compile
```

### 2. Organização Diária

-   Use `DevAI: Organizar Extensões` para manter o ambiente limpo
-   Aplique perfis inteligentes para cada projeto
-   Monitore o desempenho regularmente

### 3. Manutenção

-   Execute `node organizar-projeto.js` para organização automática
-   Revise os relatórios gerados
-   Mantenha os perfis atualizados

## 6. Solução de Problemas

### 1. Problemas Comuns

-   Extensão não inicia
-   Erro de permissão
-   Performance lenta
-   Configurações perdidas

### 2. Logs

```bash
# Acesse os logs
cat ~/.vscode/extensions/devai-extension/logs/error.log

# Limpe os logs
rm -rf ~/.vscode/extensions/devai-extension/logs/*
```

### 3. Recuperação

```bash
# Restaure configurações
node scripts/restaurar-config.js

# Limpe cache
rm -rf ~/.vscode/extensions/devai-extension/cache
```

## 7. Dicas e Truques

### 1. Atalhos

-   `Ctrl+Shift+P`: Abre a paleta de comandos
-   `Ctrl+Shift+X`: Abre o gerenciador de extensões
-   `Ctrl+Shift+G`: Abre o gerenciador de perfis

### 2. Configurações

```json
// settings.json
{
    "devai.autoUpdate": true,
    "devai.performanceMode": true,
    "devai.backupEnabled": true
}
```

### 3. Perfis

-   Crie perfis para diferentes tipos de projeto
-   Compartilhe perfis com a equipe
-   Mantenha os perfis atualizados

## 8. Recursos Adicionais

### 1. Documentação

-   [Guia de Implementação](IMPLEMENTACAO.md)
-   [Roadmap](ROADMAP.md)
-   [Fluxograma](FLUXOGRAMA.md)

### 2. Suporte

-   Consulte a [documentação](docs/)
-   Abra uma issue no GitHub
-   Entre em contato com a equipe

### 3. Comunidade

-   Participe das discussões
-   Compartilhe seus perfis
-   Ajude outros usuários

## 9. Próximos Passos

### 1. Exploração

-   Teste todos os comandos
-   Crie seus próprios perfis
-   Experimente as integrações

### 2. Contribuição

-   Reporte bugs
-   Sugira melhorias
-   Ajude com a documentação

### 3. Aprendizado

-   Leia a documentação
-   Assista tutoriais
-   Participe da comunidade
