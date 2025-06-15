# DevAI Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI/CD](https://github.com/seu-usuario/devai-assistant/actions/workflows/ci.yml/badge.svg)](https://github.com/seu-usuario/devai-assistant/actions/workflows/ci.yml)
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/seu-usuario.devai-assistant)](https://marketplace.visualstudio.com/items?itemName=seu-usuario.devai-assistant)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/seu-usuario.devai-assistant)](https://marketplace.visualstudio.com/items?itemName=seu-usuario.devai-assistant)

Uma extensão do VS Code que integra assistentes de IA para desenvolvimento, oferecendo uma experiência moderna e intuitiva.

![DevAI Assistant](media/icons/devai.png)

## 🚀 Recursos

-   🤖 Interface moderna e responsiva
-   📊 Painel de controle com estatísticas em tempo real
-   ⚡ Inicialização automática do assistente
-   ⚙️ Configurações personalizáveis
-   🧠 Suporte a múltiplos modelos de IA
-   🎯 Integração completa com VS Code
-   📝 Comandos rápidos via paleta de comandos
-   🔄 Status bar integration

## 📋 Pré-requisitos

-   Python 3.8 ou superior
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
git clone https://github.com/seu-usuario/devai-assistant.git
cd devai-assistant
```

2. Execute o script de inicialização:

```bash
start-devai.bat
```

O script irá:

-   Verificar e configurar o ambiente
-   Instalar dependências
-   Iniciar o VS Code com a extensão
-   Ativar o assistente automaticamente

## 🎮 Como Usar

### Início Rápido

1. Execute `start-devai.bat`
2. O VS Code abrirá automaticamente
3. O assistente será iniciado
4. Use o ícone na barra de status ou Ctrl+Shift+P

### Comandos Disponíveis

-   `DevAI: Start Assistant` - Inicia o assistente
-   `DevAI: Stop Assistant` - Para o assistente
-   `DevAI: Configure Assistant` - Abre as configurações
-   `DevAI: Toggle Assistant Panel` - Mostra/esconde o painel

### Configurações

Acesse as configurações em:

1. File > Preferences > Settings
2. Procure por "DevAI Assistant"

Configurações disponíveis:

-   `devai-assistant.autoStart`: Iniciar automaticamente
-   `devai-assistant.model`: Modelo de IA (llama2, codellama, mistral)
-   `devai-assistant.maxTokens`: Máximo de tokens
-   `devai-assistant.temperature`: Temperatura para geração

## 🎨 Interface

O DevAI Assistant oferece uma interface moderna e intuitiva:

-   **Painel de Controle**: Acesso rápido a todas as funcionalidades
-   **Status Bar**: Indicador de status e acesso rápido
-   **Estatísticas**: Monitoramento em tempo real
-   **Configurações**: Personalização completa

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
-   Todos os contribuidores

## 📞 Suporte

-   [Issues](https://github.com/seu-usuario/devai-assistant/issues)
-   [Documentação](https://github.com/seu-usuario/devai-assistant/wiki)
-   [Discord](https://discord.gg/seu-servidor)

## 🔄 Atualizações

Veja o [ROADMAP](ROADMAP.md) para as próximas atualizações e recursos planejados.

## 📊 Estatísticas

![Estatísticas do Repositório](https://repobeats.axiom.co/api/embed/your-repobeats-hash.svg 'Repobeats analytics image')
