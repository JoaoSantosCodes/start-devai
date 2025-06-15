# Guia de Onboarding

Bem-vindo ao DevAI Extension! Este guia ajudará você a começar rapidamente, seja como usuário ou contribuidor.

## Para Usuários

### 1. Requisitos do Sistema

#### Hardware

-   GPU NVIDIA com 4GB+ VRAM
-   8GB+ RAM
-   10GB+ espaço em disco

#### Software

-   Windows 10/11
-   Python 3.8+
-   Node.js v18+
-   VS Code
-   Git

### 2. Instalação Rápida

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

### 3. Configuração Inicial

1. **Preparação do Ambiente**

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

2. **Instalação do DevAI**

    ```bash
    # Execute o script de setup
    python src/core/setup_manager.py

    # Siga as instruções na tela:
    # - Verifique o ambiente
    # - Configure o npm
    # - Instale dependências
    # - Inicie o servidor
    ```

3. **Configuração do VS Code**
    - Abra o VS Code
    - Pressione `Ctrl+Shift+P`
    - Digite "DevAI: Configure"
    - Ajuste as configurações:
        - Limite de VRAM
        - Processos protegidos
        - Logs
        - Performance

### 4. Verificação

#### Ambiente

-   Python instalado e configurado
-   Node.js instalado e configurado
-   npm disponível no PATH
-   VS Code com extensão instalada

#### Dependências

-   Python packages instalados
-   Node.js modules instalados
-   Ollama instalado e configurado
-   GPU detectada e configurada

#### Serviços

-   Servidor local rodando
-   Ollama rodando
-   Logs funcionando
-   Monitoramento ativo

### 5. Recursos Essenciais

-   **Organizador de Extensões**

    -   Comando: `DevAI: Organizar Extensões`
    -   Agrupa e gerencia suas extensões
    -   Recomenda novas extensões
    -   Otimiza o ambiente

-   **Perfis Inteligentes**

    -   Comando: `DevAI: Validar Extensões`
    -   Detecta o tipo de projeto
    -   Sugere configurações ideais
    -   Aplica perfis automaticamente

-   **Análise de Desempenho**
    -   Comando: `DevAI: Analisar Desempenho`
    -   Monitora uso de recursos
    -   Identifica gargalos
    -   Sugere otimizações

### 6. Fluxo de Trabalho Recomendado

1. **Início do Projeto**

    ```bash
    # Clone o repositório
    git clone https://github.com/JoaoSantosCodes/start-devai.git

    # Instale dependências
    npm install

    # Compile o projeto
    npm run compile
    ```

2. **Organização Diária**

    - Use `DevAI: Organizar Extensões` para manter o ambiente limpo
    - Aplique perfis inteligentes para cada projeto
    - Monitore o desempenho regularmente

3. **Manutenção**
    - Execute `node organizar-projeto.js` para organização automática
    - Revise os relatórios gerados
    - Mantenha os perfis atualizados

## Para Contribuidores

### 1. Configuração do Ambiente

1. **Requisitos**

    - Node.js 16+
    - VS Code
    - Git

2. **Setup do Projeto**

    ```bash
    # Clone o repositório
    git clone https://github.com/JoaoSantosCodes/start-devai.git

    # Instale dependências
    npm install

    # Compile o projeto
    npm run compile
    ```

### 2. Estrutura do Projeto

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

### 3. Fluxo de Desenvolvimento

1. **Criando uma Feature**

    ```bash
    # Crie uma branch
    git checkout -b feature/nova-funcionalidade

    # Desenvolva a feature
    # Teste localmente
    npm run compile

    # Faça commit
    git add .
    git commit -m "feat: nova funcionalidade"

    # Envie para o GitHub
    git push origin feature/nova-funcionalidade
    ```

2. **Testes**

    - Execute os testes unitários
    - Teste manualmente no VS Code
    - Verifique a compilação

3. **Documentação**
    - Atualize a documentação relevante
    - Adicione exemplos de uso
    - Atualize o README se necessário

### 4. Boas Práticas

1. **Código**

    - Siga o estilo de código do projeto
    - Adicione comentários explicativos
    - Mantenha a cobertura de testes

2. **Commits**

    - Use mensagens claras e descritivas
    - Siga o padrão de commits
    - Referencie issues quando relevante

3. **Pull Requests**
    - Descreva as mudanças
    - Inclua screenshots se aplicável
    - Referencie issues relacionadas

### 5. Recursos para Desenvolvimento

-   [Documentação de Implementação](IMPLEMENTACAO.md)
-   [Guia de Uso](usage.md)
-   [Roadmap](ROADMAP.md)
-   [Fluxograma do Sistema](FLUXOGRAMA.md)

## Suporte

### Para Usuários

-   Consulte a [documentação](docs/)
-   Abra uma issue no GitHub
-   Entre em contato com a equipe

### Para Contribuidores

-   Participe das discussões no GitHub
-   Revise o código de outros contribuidores
-   Ajude a manter a documentação atualizada

## Próximos Passos

1. **Usuários**

    - Explore os comandos disponíveis
    - Crie seus próprios perfis
    - Compartilhe feedback

2. **Contribuidores**
    - Revise issues abertas
    - Proponha melhorias
    - Ajude com a documentação
