# DevAI Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI/CD](https://github.com/DevAI-Assistant/DevAI-Assistant/actions/workflows/ci.yml/badge.svg)](https://github.com/DevAI-Assistant/DevAI-Assistant/actions/workflows/ci.yml)
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/devai-assistant.devai-assistant)](https://marketplace.visualstudio.com/items?itemName=devai-assistant.devai-assistant)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/devai-assistant.devai-assistant)](https://marketplace.visualstudio.com/items?itemName=devai-assistant.devai-assistant)

Uma extensão do VS Code que integra assistentes de IA para desenvolvimento, oferecendo uma experiência moderna e intuitiva.

![DevAI Assistant](media/icons/devai.png)

## 🚀 Recursos

-   🤖 Interface moderna e responsiva com WebView
-   📊 Painel de controle com estatísticas em tempo real
-   ⚡ Inicialização automática do assistente
-   ⚙️ Configurações personalizáveis via VS Code Settings
-   🧠 Suporte a múltiplos modelos de IA (OpenAI, Ollama)
-   🎯 Integração completa com VS Code
-   📝 Comandos rápidos via paleta de comandos
-   🔄 Status bar integration com indicador de status

## 📋 Pré-requisitos

-   Node.js v18 ou superior
-   VS Code 1.85.0 ou superior
-   Ollama (opcional, para modelos locais)

## 🛠️ Instalação

### Método 1: VS Code Marketplace (Recomendado)

1. Abra o VS Code
2. Pressione `Ctrl+Shift+X`
3. Procure por "DevAI Assistant"
4. Clique em "Install"

### Método 2: Instalação Manual

1. Clone o repositório:

```bash
git clone https://github.com/DevAI-Assistant/DevAI-Assistant.git
cd DevAI-Assistant
```

2. Instale as dependências:

```bash
npm install
```

3. Compile a extensão:

```bash
npm run compile
```

4. Execute a extensão:

```bash
npm run watch
```

## 🎮 Como Usar

### Início Rápido

1. Instale a extensão
2. Configure suas credenciais de API (se necessário)
3. Use o ícone na barra de status ou Ctrl+Shift+P
4. Selecione "DevAI: Start Assistant"

### Comandos Disponíveis

-   `DevAI: Start Assistant` - Inicia o assistente
-   `DevAI: Stop Assistant` - Para o assistente
-   `DevAI: Configure Assistant` - Abre as configurações
-   `DevAI: Toggle Assistant Panel` - Mostra/esconde o painel
-   `DevAI: Clear Chat History` - Limpa o histórico de chat
-   `DevAI: Export Chat History` - Exporta o histórico de chat

### Configurações

Acesse as configurações em:

1. File > Preferences > Settings
2. Procure por "DevAI Assistant"

Configurações disponíveis:

-   `devai-assistant.autoStart`: Iniciar automaticamente (padrão: true)
-   `devai-assistant.model`: Modelo de IA (gpt-3.5-turbo, gpt-4, llama2, codellama, mistral)
-   `devai-assistant.maxTokens`: Máximo de tokens (padrão: 2000)
-   `devai-assistant.temperature`: Temperatura para geração (padrão: 0.7)
-   `devai-assistant.apiKey`: Chave da API (OpenAI)
-   `devai-assistant.ollamaEndpoint`: Endpoint do Ollama (padrão: http://localhost:11434)

## 🎨 Interface

O DevAI Assistant oferece uma interface moderna e intuitiva:

-   **Painel de Controle**: Acesso rápido a todas as funcionalidades via WebView
-   **Status Bar**: Indicador de status e acesso rápido
-   **Estatísticas**: Monitoramento em tempo real
-   **Configurações**: Personalização completa via VS Code Settings

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Guia de Contribuição

Veja nosso [Guia de Contribuição](CONTRIBUTING.md) para mais detalhes sobre como contribuir com o projeto.

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

-   VS Code Team
-   Ollama Team
-   OpenAI Team
-   Todos os contribuidores

## 📞 Suporte

-   [Issues](https://github.com/DevAI-Assistant/DevAI-Assistant/issues)
-   [Documentação](https://github.com/DevAI-Assistant/DevAI-Assistant/wiki)
-   [Discord](https://discord.gg/devai-assistant)

## 🔄 Atualizações

Veja o [ROADMAP](ROADMAP.md) para as próximas atualizações e recursos planejados.
