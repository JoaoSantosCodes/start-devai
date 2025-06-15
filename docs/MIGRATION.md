# Guia de Migração

Este guia ajudará você a migrar de versões anteriores do DevAI Extension para a versão mais recente.

## Migração da v0.8 para v1.0

### Mudanças Principais

1. **Nova Estrutura de Arquivos**

    ```
    devai-extension/
    ├── src/
    │   ├── core/           # Núcleo da extensão
    │   │   ├── aiManager.ts
    │   │   ├── logger.ts
    │   │   ├── setup_manager.ts
    │   │   ├── smartProfiles.ts
    │   │   ├── performanceAnalyzer.ts
    │   │   └── extensionOrganizer.ts
    │   └── ui/            # Interface do usuário
    │       └── aiPanel.ts
    ├── docs/              # Documentação
    ├── scripts/           # Scripts de automação
    └── tests/             # Testes
    ```

2. **Novos Recursos**

    - Organizador automático de extensões
    - Perfis inteligentes
    - Análise de desempenho
    - Comandos VS Code
    - Scripts de automação

3. **Mudanças na API**
    - Novos métodos no `aiManager`
    - Atualização do sistema de logs
    - Melhorias no gerenciamento de configurações

### Passos para Migração

1. **Backup**

    ```bash
    # Faça backup das configurações
    cp -r ~/.vscode/extensions/devai-extension ~/.vscode/extensions/devai-extension.backup
    ```

2. **Desinstalação**

    ```bash
    # Desinstale a versão antiga
    code --uninstall-extension devai-extension
    ```

3. **Instalação**

    ```bash
    # Instale a nova versão
    code --install-extension devai-extension
    ```

4. **Configuração**

    ```typescript
    // settings.json
    {
      "devai.autoUpdate": true,
      "devai.backupEnabled": true,
      "devai.performanceMonitoring": true
    }
    ```

5. **Migração de Dados**
    ```typescript
    // Os dados serão migrados automaticamente
    // Verifique o log de migração em:
    ~/.vscode/eeinnosstx / devai - extension / logs / migration.log;
    ```

### Compatibilidade

#### Compatível

-   Perfis de extensões
-   Configurações básicas
-   Logs e relatórios

#### Não Compatível

-   Scripts personalizados antigos
-   Plugins de terceiros
-   Configurações específicas da v0.8

### Solução de Problemas

1. **Erro de Migração**

    ```bash
    # Limpe o cache
    rm -rf ~/.vscode/extensions/devai-extension/cache

    # Reinicie o VS Code
    code --restart
    ```

2. **Perfis Não Carregados**

    ```typescript
    // Verifique o formato do perfil
    {
      "name": "Novo Perfil",
      "version": "1.0",
      "extensions": [...]
    }
    ```

3. **Configurações Perdidas**
    ```typescript
    // Restaure do backup
    cp ~/.vscode/extensions/devai-extension.backup/settings.json ~/.vscode/extensions/devai-extension/
    ```

## Migração da v0.9 para v1.0

### Mudanças Principais

1. **Novos Recursos**

    - Análise de desempenho
    - Comandos VS Code
    - Scripts de automação

2. **Melhorias**
    - Interface mais intuitiva
    - Melhor performance
    - Mais opções de personalização

### Passos para Migração

1. **Atualização**

    ```bash
    # Atualize a extensão
    code --update-extension devai-extension
    ```

2. **Configuração**

    ```typescript
    // settings.json
    {
      "devai.performanceMonitoring": true,
      "devai.autoOrganize": true
    }
    ```

3. **Verificação**
    ```bash
    # Verifique a instalação
    code --list-extensions --show-versions | grep devai-extension
    ```

### Compatibilidade

#### Compatível

-   Todos os recursos da v0.9
-   Perfis e configurações
-   Scripts e automações

#### Novos Recursos

-   Análise de desempenho
-   Comandos VS Code
-   Scripts de automação

## Suporte

Para ajuda com a migração:

1. Consulte a [documentação](docs/)
2. Abra uma issue no GitHub
3. Entre em contato com a equipe

## Recursos Adicionais

-   [Changelog](CHANGELOG.md)
-   [Tutorial](TUTORIAL.md)
-   [FAQ](FAQ.md)
-   [Troubleshooting](TROUBLESHOOTING.md)
