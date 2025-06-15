# Guia do Desenvolvedor

Este guia é para desenvolvedores que desejam contribuir com o DevAI Assistant.

## Estrutura do Projeto

```
devai-extension/
├── src/                      # Código fonte
│   ├── core/                 # Núcleo da aplicação
│   │   ├── setup_manager.py  # Gerenciador de Setup
│   │   ├── extension.ts      # Ponto de entrada da extensão
│   │   ├── aiManager.ts      # Gerenciador de IA
│   │   ├── aiPanel.ts        # Painel de IA
│   │   └── logger.ts         # Sistema de logging
│   ├── ui/                   # Interface do usuário
│   └── utils/                # Utilitários
├── scripts/                  # Scripts auxiliares
│   ├── setup/               # Scripts de configuração
│   └── build/               # Scripts de build
├── tests/                    # Testes
├── docs/                     # Documentação
│   ├── setup.md             # Guia de instalação
│   ├── usage.md             # Guia de uso
│   └── development.md       # Guia do desenvolvedor
├── media/                    # Recursos mídia
│   ├── icons/               # Ícones
│   └── images/              # Imagens
└── .github/                 # Configurações GitHub
    └── workflows/           # Workflows CI/CD
```

## Ambiente de Desenvolvimento

### Requisitos
- Python 3.8+
- Node.js v18+
- VS Code
- Git

### Configuração

1. Clone o repositório:
```bash
git clone https://github.com/JoaoSantosCodes/DevAI-Assistant.git
cd DevAI-Assistant
```

2. Crie um ambiente virtual:
```bash
python -m venv .venv
.venv\Scripts\activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
npm install
```

4. Configure o VS Code:
   - Instale as extensões recomendadas
   - Configure o Python interpreter
   - Configure o Node.js

## Arquitetura

### Core
- **SetupManager**: Gerencia configuração e ambiente
  - Verificação de requisitos
  - Instalação de dependências
  - Configuração de npm
  - Setup de Node.js
  - Configuração de Python

- **AIManager**: Gerencia modelos e recursos
  - Integração com Ollama
  - Monitoramento de VRAM
  - Gerenciamento de processos
  - Otimização de performance
  - Cache de respostas

- **AIPanel**: Interface do usuário
  - Painel de controle
  - Visualização de recursos
  - Configurações
  - Histórico de interações
  - Templates

### UI
- **MainWindow**: Interface principal
  - Menu principal
  - Status do sistema
  - Configurações
  - Logs

- **OllamaWindow**: Interface do Ollama
  - Lista de modelos
  - Monitoramento
  - Configurações
  - Logs

### Utils
- **Logger**: Sistema de logging
  - Logs de sistema
  - Logs de erro
  - Logs de debug
  - Logs de performance

- **System**: Funções do sistema
  - Verificação de GPU
  - Monitoramento de recursos
  - Gerenciamento de processos
  - Configurações do sistema

## Desenvolvimento

### Convenções

#### Python
- PEP 8
- Docstrings
- Type hints
- Logging

#### JavaScript/TypeScript
- ESLint
- Prettier
- JSDoc
- TypeScript

### Testes

1. Testes Python:
```bash
python -m pytest
```

2. Testes TypeScript:
```bash
npm test
```

### Build

1. Build Python:
```bash
python scripts/build/build.py
```

2. Build TypeScript:
```bash
npm run compile
```

## Contribuindo

### Processo

1. Fork o projeto
2. Crie uma branch:
```bash
git checkout -b feature/nova-feature
```

3. Desenvolva:
   - Siga as convenções
   - Adicione testes
   - Atualize documentação

4. Commit:
```bash
git commit -m "feat: nova feature"
```

5. Push:
```bash
git push origin feature/nova-feature
```

6. Pull Request:
   - Descreva as mudanças
   - Referencie issues
   - Aguarde review

### Código de Conduta

- Respeite outros desenvolvedores
- Mantenha o código limpo
- Documente suas mudanças
- Ajude outros

## Roadmap Técnico

### Versão 1.1
- [ ] Refatoração do core
- [ ] Testes unitários
- [ ] CI/CD
- [ ] Documentação API

### Versão 1.2
- [ ] Cache de respostas
- [ ] Histórico de interações
- [ ] Templates personalizados
- [ ] Otimizações de performance

### Versão 2.0
- [ ] Arquitetura modular
- [ ] Sistema de plugins
- [ ] API pública
- [ ] Suporte multi-GPU

## Recursos

### Documentação
- [Python](https://docs.python.org/)
- [Node.js](https://nodejs.org/docs/)
- [VS Code API](https://code.visualstudio.com/api)
- [Ollama](https://github.com/ollama/ollama)

### Ferramentas
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)
- [Python](https://www.python.org/)
- [Node.js](https://nodejs.org/)

### Comunidade
- [Discord](https://discord.gg/devai)
- [GitHub Issues](https://github.com/JoaoSantosCodes/DevAI-Assistant/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/devai) 