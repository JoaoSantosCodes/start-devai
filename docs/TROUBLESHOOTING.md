# Guia de Troubleshooting

Este guia fornece soluções detalhadas para problemas comuns do DevAI Extension.

## Problemas de Instalação

### 1. Extensão não instala

**Sintomas:**

-   Erro ao instalar
-   Instalação incompleta
-   VS Code não reconhece a extensão

**Soluções:**

1. **Verifique os requisitos**

    ```bash
    # Verifique a versão do VS Code
    code --version

    # Verifique a versão do Node.js
    node --version
    ```

2. **Limpe o cache**

    ```bash
    # Remova o cache do VS Code
    rm -rf ~/.vscode/extensions/*

    # Reinicie o VS Code
    code --restart
    ```

3. **Instale manualmente**
    ```bash
    # Baixe a extensão
    # Instale via comando
    code --install-extension devai-extension.vsix
    ```

### 2. Erro de permissão

**Sintomas:**

-   Erro de acesso negado
-   Não consegue salvar configurações
-   Problemas com arquivos

**Soluções:**

1. **Verifique permissões**

    ```bash
    # Verifique permissões da pasta
    ls -la ~/.vscode/extensions/

    # Corrija permissões
    chmod -R 755 ~/.vscode/extensions/
    ```

2. **Execute como administrador**

    - Windows: Execute o VS Code como administrador
    - Linux/Mac: Use sudo

3. **Verifique antivírus**
    - Adicione exceções
    - Desative temporariamente
    - Verifique logs

## Problemas de Funcionamento

### 1. Extensão não inicia

**Sintomas:**

-   Comandos não aparecem
-   Interface não carrega
-   Erros no console

**Soluções:**

1. **Verifique logs**

    ```bash
    # Acesse os logs
    cat ~/.vscode/extensions/devai-extension/logs/error.log
    ```

2. **Reinicie serviços**

    ```bash
    # Reinicie o VS Code
    code --restart

    # Limpe cache
    rm -rf ~/.vscode/extensions/devai-extension/cache
    ```

3. **Verifique configurações**
    ```json
    // settings.json
    {
        "devai.enabled": true,
        "devai.debug": true
    }
    ```

### 2. Performance lenta

**Sintomas:**

-   VS Code lento
-   Alto uso de CPU
-   Alto uso de memória

**Soluções:**

1. **Analise recursos**

    ```bash
    # Use o analisador
    DevAI: Analisar Desempenho
    ```

2. **Otimize configurações**

    ```json
    // settings.json
    {
        "devai.performanceMode": true,
        "devai.autoUpdate": false
    }
    ```

3. **Limpe recursos**

    ```bash
    # Limpe cache
    rm -rf ~/.vscode/extensions/devai-extension/cache

    # Remova logs antigos
    rm -rf ~/.vscode/extensions/devai-extension/logs/*
    ```

## Problemas de Recursos

### 1. Organizador não funciona

**Sintomas:**

-   Extensões não organizadas
-   Erro ao mover arquivos
-   Configurações perdidas

**Soluções:**

1. **Verifique permissões**

    ```bash
    # Verifique permissões
    ls -la ~/.vscode/extensions/
    ```

2. **Verifique configurações**

    ```json
    // settings.json
    {
        "devai.organizer.enabled": true,
        "devai.organizer.autoOrganize": true
    }
    ```

3. **Execute manualmente**
    ```bash
    # Execute o script
    node organizar-projeto.js
    ```

### 2. Perfis não carregam

**Sintomas:**

-   Perfis não aparecem
-   Erro ao aplicar perfil
-   Configurações perdidas

**Soluções:**

1. **Verifique formato**

    ```json
    // Perfil correto
    {
      "name": "Perfil",
      "version": "1.0",
      "extensions": [...]
    }
    ```

2. **Recrie perfil**

    ```bash
    # Remova perfil
    rm ~/.vscode/extensions/devai-extension/profiles/old-profile.json

    # Crie novo
    DevAI: Criar Perfil de Extensões
    ```

3. **Verifique logs**
    ```bash
    # Acesse logs
    cat ~/.vscode/extensions/devai-extension/logs/profile.log
    ```

## Problemas de Integração

### 1. GitHub não atualiza

**Sintomas:**

-   Erro ao fazer push
-   Commits não criados
-   Status não atualizado

**Soluções:**

1. **Verifique git**

    ```bash
    # Verifique status
    git status

    # Verifique remoto
    git remote -v
    ```

2. **Verifique credenciais**

    ```bash
    # Configure git
    git config --global user.name "Seu Nome"
    git config --global user.email "seu@email.com"
    ```

3. **Execute manualmente**
    ```bash
    # Execute script
    node atualizar-github.js
    ```

### 2. Scripts não funcionam

**Sintomas:**

-   Erro ao executar
-   Comandos não encontrados
-   Permissões negadas

**Soluções:**

1. **Verifique Node.js**

    ```bash
    # Verifique versão
    node --version

    # Instale dependências
    npm install
    ```

2. **Verifique permissões**

    ```bash
    # Dê permissão
    chmod +x scripts/*.js
    ```

3. **Execute com debug**
    ```bash
    # Execute com debug
    node --inspect scripts/script.js
    ```

## Problemas de Atualização

### 1. Atualização falha

**Sintomas:**

-   Erro ao atualizar
-   Versão antiga mantida
-   Configurações perdidas

**Soluções:**

1. **Backup**

    ```bash
    # Faça backup
    cp -r ~/.vscode/extensions/devai-extension ~/.vscode/extensions/devai-extension.backup
    ```

2. **Reinstale**

    ```bash
    # Desinstale
    code --uninstall-extension devai-extension

    # Instale
    code --install-extension devai-extension
    ```

3. **Verifique logs**
    ```bash
    # Acesse logs
    cat ~/.vscode/extensions/devai-extension/logs/update.log
    ```

### 2. Configurações perdidas

**Sintomas:**

-   Configurações resetadas
-   Perfis perdidos
-   Preferências alteradas

**Soluções:**

1. **Restaure backup**

    ```bash
    # Restaure
    cp -r ~/.vscode/extensions/devai-extension.backup/* ~/.vscode/extensions/devai-extension/
    ```

2. **Reconfigure**

    ```json
    // settings.json
    {
        "devai.autoUpdate": true,
        "devai.backupEnabled": true
    }
    ```

3. **Verifique logs**
    ```bash
    # Acesse logs
    cat ~/.vscode/extensions/devai-extension/logs/config.log
    ```

## Suporte

Para ajuda adicional:

1. Consulte a [documentação](docs/)
2. Abra uma issue no GitHub
3. Entre em contato com a equipe

## Recursos

-   [FAQ](FAQ.md)
-   [Tutorial](TUTORIAL.md)
-   [Changelog](CHANGELOG.md)
-   [GitHub Issues](https://github.com/JoaoSantosCodes/start-devai/issues)
