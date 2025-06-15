# DevAI Extension

## Visão Geral

DevAI Extension é uma extensão para o VS Code que integra capacidades de IA e automação para auxiliar no desenvolvimento. O projeto inclui um sistema automatizado de organização, análise de desempenho, perfis inteligentes de extensões e atualização automática no GitHub.

## Funcionalidades Principais

### Extensão

-   Integração com IA para desenvolvimento
-   Painel de controle intuitivo
-   Gerenciamento de configurações
-   Logging e monitoramento
-   **Organizador de Extensões**: agrupa, recomenda, ativa/desativa e instala extensões por categoria
-   **Perfis Inteligentes**: detecta o tipo de projeto e sugere/aplica perfis de extensões e configurações
-   **Análise de Desempenho**: relatório de uso de memória, CPU e impacto das extensões
-   **Comandos VS Code**: comandos rápidos para organizar, validar, analisar e gerenciar perfis

### Sistema de Organização

-   Organização automática de arquivos
-   Backup automático
-   Validação de compilação
-   Atualização automática no GitHub

## Estrutura do Projeto

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
├── organizar-projeto.js
├── atualizar-github.js
├── relatorio-organizacao.txt
├── relatorio-github.txt
├── docs/              # Documentação
├── scripts/           # Scripts de automação
└── tests/             # Testes
```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/JoaoSantosCodes/start-devai.git
```

2. Instale as dependências:

```bash
npm install
```

3. Compile o projeto:

```bash
npm run compile
```

## Uso

### Comandos da Extensão (VS Code)

-   `DevAI: Validar Extensões` — Detecta e sugere perfis inteligentes para o projeto
-   `DevAI: Organizar Extensões` — Gera relatório, recomenda, ativa/desativa e instala extensões
-   `DevAI: Analisar Desempenho` — Mostra relatório de uso de recursos e sugestões de otimização
-   `DevAI: Criar/Aplicar/Excluir Perfil de Extensões` — Gerencia perfis personalizados
-   `DevAI: Gerenciar Grupos de Extensões` — Ativa/desativa grupos de extensões por categoria

### Scripts de Organização

1. Execute o script de organização:

```bash
node organizar-projeto.js
```

2. Verifique os relatórios gerados:

-   `relatorio-organizacao.txt`
-   `relatorio-github.txt`

## Documentação

-   [Implementação e Utilização](docs/IMPLEMENTACAO.md)
-   [Roadmap](docs/ROADMAP.md)
-   [Fluxograma do Sistema](docs/FLUXOGRAMA.md)
-   [Guia de Uso](docs/usage.md)

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Faça push para a branch
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Suporte

Para suporte:

1. Consulte a documentação
2. Abra uma issue no GitHub
3. Entre em contato com a equipe
