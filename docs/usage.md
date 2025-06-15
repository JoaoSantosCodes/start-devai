# Guia de Uso

Este guia descreve como usar o DevAI Assistant e suas principais funcionalidades.

## Interface Principal

### Menu Principal

-   **Verificar Ambiente**: Verifica requisitos e configurações
-   **Configurar npm**: Configura o npm no sistema
-   **Instalar Dependências**: Instala dependências necessárias
-   **Iniciar Servidor**: Inicia o servidor local
-   **Gerenciador Ollama**: Abre o gerenciador de modelos

### Painel de IA

-   **Completamento**: Sugestões de código
-   **Documentação**: Geração de documentação
-   **Refatoração**: Sugestões de refatoração
-   **Debugging**: Assistência em debugging
-   **Explicação**: Explicação de código

## Modelos Disponíveis

### DeepSeek-Coder 6.7B

-   Otimizado para desenvolvimento
-   Suporte a múltiplas linguagens
-   Completamento inteligente
-   Documentação automática

### CodeLlama 7B

-   Modelo geral para programação
-   Suporte a várias linguagens
-   Explicação de código
-   Sugestões de otimização

## Monitoramento

### GPU

-   Uso de VRAM em tempo real
-   Temperatura da GPU
-   Processos em execução
-   Performance do sistema

### Ollama

-   Status do servidor
-   Uso de memória
-   Modelos carregados
-   Logs de execução

## Gerenciamento de Processos

### Processos Protegidos

-   code.exe (VS Code)
-   devenv.exe (Visual Studio)
-   chrome.exe (Chrome)
-   firefox.exe (Firefox)

### Processos Monitorados

-   ollama.exe
-   python.exe
-   node.exe
-   npm.exe

## Configurações

### VRAM

-   Limite máximo: 3500 MB
-   Limpeza automática
-   Otimização inteligente
-   Monitoramento contínuo

### Processos

-   Lista de processos protegidos
-   Lista de processos monitorados
-   Limpeza automática
-   Logs de processos

## Comandos VS Code

### Atalhos

-   `Ctrl+Shift+P`: Abrir paleta de comandos
-   `Ctrl+Shift+A`: Abrir painel de IA
-   `Ctrl+Shift+M`: Abrir monitor
-   `Ctrl+Shift+L`: Abrir logs

### Integração

-   Completamento de código
-   Documentação automática
-   Refatoração assistida
-   Debugging inteligente

### Novos Comandos

-   **DevAI: Validar Extensões**: Detecta o tipo de projeto, sugere e aplica perfis inteligentes de extensões e configurações.
-   **DevAI: Organizar Extensões**: Gera relatório, recomenda, ativa/desativa e instala extensões por categoria.
-   **DevAI: Analisar Desempenho**: Mostra relatório de uso de memória, CPU e impacto das extensões, com sugestões de otimização.
-   **DevAI: Criar Perfil de Extensões**: Cria perfis personalizados com suas extensões favoritas.
-   **DevAI: Aplicar Perfil de Extensões**: Aplica um perfil salvo ao ambiente.
-   **DevAI: Excluir Perfil de Extensões**: Remove um perfil personalizado.
-   **DevAI: Gerenciar Grupos de Extensões**: Ativa/desativa grupos de extensões por categoria (linguagens, produtividade, temas, etc).

## Exemplos de Uso

### Organizar Extensões

1. Pressione `Ctrl+Shift+P` e digite `DevAI: Organizar Extensões`.
2. Veja o relatório de extensões instaladas, não utilizadas e recomendadas.
3. Escolha desativar extensões não utilizadas ou instalar recomendadas.

### Validar e Aplicar Perfis

1. Pressione `Ctrl+Shift+P` e digite `DevAI: Validar Extensões`.
2. Veja o perfil sugerido para o projeto.
3. Aplique o perfil ou veja detalhes das recomendações.

### Analisar Desempenho

1. Pressione `Ctrl+Shift+P` e digite `DevAI: Analisar Desempenho`.
2. Veja o relatório de uso de recursos e sugestões de otimização.

### Gerenciar Perfis

1. Crie um perfil: `DevAI: Criar Perfil de Extensões`
2. Aplique um perfil: `DevAI: Aplicar Perfil de Extensões`
3. Exclua um perfil: `DevAI: Excluir Perfil de Extensões`

### Gerenciar Grupos de Extensões

1. Pressione `Ctrl+Shift+P` e digite `DevAI: Gerenciar Grupos de Extensões`
2. Ative/desative grupos ou veja detalhes das categorias.

## Integração com Scripts de Organização

-   Para organizar o projeto e garantir que tudo está em ordem:

```bash
node organizar-projeto.js
```

-   Verifique os relatórios gerados:
    -   `relatorio-organizacao.txt`
    -   `relatorio-github.txt`

## Dicas e Troubleshooting

-   Sempre faça backup antes de grandes mudanças.
-   Consulte os relatórios para identificar problemas.
-   Use os comandos do VS Code para manter o ambiente otimizado.
-   Consulte a documentação para exemplos e detalhes avançados.

## Suporte

-   Consulte a [documentação de implementação](IMPLEMENTACAO.md)
-   Veja o [roadmap](ROADMAP.md)
-   Abra uma issue no GitHub para dúvidas ou sugestões.

## Logs

### Localização

-   `logs/devai_setup.log`: Logs de setup
-   `logs/ollama.log`: Logs do Ollama
-   `logs/system.log`: Logs do sistema
-   `logs/performance.log`: Logs de performance

### Níveis

-   INFO: Informações gerais
-   WARNING: Avisos
-   ERROR: Erros
-   DEBUG: Debugging
