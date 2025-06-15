# DevAI Extension

## Visão Geral

DevAI Extension é uma extensão para o VS Code que integra capacidades de IA para auxiliar no desenvolvimento. O projeto inclui um sistema automatizado de organização e atualização que mantém o código limpo e atualizado no GitHub.

## Funcionalidades Principais

### Extensão

-   Integração com IA para desenvolvimento
-   Painel de controle intuitivo
-   Gerenciamento de configurações
-   Logging e monitoramento

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
│   │   └── setup_manager.ts
│   └── ui/            # Interface do usuário
│       └── aiPanel.ts
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

### Extensão

1. Instale a extensão no VS Code
2. Ative a extensão
3. Use o painel de controle para interagir com a IA

### Sistema de Organização

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
