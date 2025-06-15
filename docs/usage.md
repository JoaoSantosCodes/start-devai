# Guia de Uso

Este guia descreve como usar o DevAI Assistant.

## Interface Principal

### Menu Principal
- **Verificar Ambiente**: Verifica requisitos e configurações
- **Configurar npm**: Configura o npm no sistema
- **Instalar Dependências**: Instala dependências necessárias
- **Iniciar Servidor**: Inicia o servidor local
- **Gerenciador Ollama**: Abre o gerenciador de modelos

### Painel de IA
- **Completamento**: Sugestões de código
- **Documentação**: Geração de documentação
- **Refatoração**: Sugestões de refatoração
- **Debugging**: Assistência em debugging
- **Explicação**: Explicação de código

## Modelos Disponíveis

### DeepSeek-Coder 6.7B
- Otimizado para desenvolvimento
- Suporte a múltiplas linguagens
- Completamento inteligente
- Documentação automática

### CodeLlama 7B
- Modelo geral para programação
- Suporte a várias linguagens
- Explicação de código
- Sugestões de otimização

## Monitoramento

### GPU
- Uso de VRAM em tempo real
- Temperatura da GPU
- Processos em execução
- Performance do sistema

### Ollama
- Status do servidor
- Uso de memória
- Modelos carregados
- Logs de execução

## Gerenciamento de Processos

### Processos Protegidos
- code.exe (VS Code)
- devenv.exe (Visual Studio)
- chrome.exe (Chrome)
- firefox.exe (Firefox)

### Processos Monitorados
- ollama.exe
- python.exe
- node.exe
- npm.exe

## Configurações

### VRAM
- Limite máximo: 3500 MB
- Limpeza automática
- Otimização inteligente
- Monitoramento contínuo

### Processos
- Lista de processos protegidos
- Lista de processos monitorados
- Limpeza automática
- Logs de processos

## Comandos VS Code

### Atalhos
- `Ctrl+Shift+P`: Abrir paleta de comandos
- `Ctrl+Shift+A`: Abrir painel de IA
- `Ctrl+Shift+M`: Abrir monitor
- `Ctrl+Shift+L`: Abrir logs

### Integração
- Completamento de código
- Documentação automática
- Refatoração assistida
- Debugging inteligente

## Otimização

### VRAM
- Ajuste o limite máximo
- Monitore o uso
- Configure limpeza
- Otimize processos

### Performance
- Monitore recursos
- Limpe processos
- Ajuste configurações
- Verifique logs

## Desenvolvimento

### Práticas
- Use modelos adequados
- Monitore recursos
- Mantenha logs
- Atualize modelos

### Troubleshooting
- Verifique logs
- Reinicie serviços
- Limpe processos
- Atualize dependências

## Exemplos

### Python
```python
# Completamento de código
def process_data(data):
    # O assistente sugere o código
    result = []
    for item in data:
        if item > 0:
            result.append(item * 2)
    return result

# Documentação
def calculate_total(items):
    """
    Calcula o total de uma lista de itens.
    
    Args:
        items (list): Lista de valores numéricos
        
    Returns:
        float: Soma total dos itens
    """
    return sum(items)

# Refatoração
def old_function():
    # Código antigo
    pass

# O assistente sugere a refatoração
def new_function():
    # Código refatorado
    pass
```

### JavaScript
```javascript
// Completamento
function processData(data) {
    // O assistente sugere o código
    return data
        .filter(item => item > 0)
        .map(item => item * 2);
}

// Documentação
/**
 * Calcula o total de uma lista de itens
 * @param {number[]} items - Lista de valores
 * @returns {number} Soma total
 */
function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item, 0);
}

// Refatoração
// O assistente sugere melhorias
class DataProcessor {
    process(data) {
        return this.transform(this.filter(data));
    }
}
```

## Logs

### Localização
- `logs/devai_setup.log`: Logs de setup
- `logs/ollama.log`: Logs do Ollama
- `logs/system.log`: Logs do sistema
- `logs/performance.log`: Logs de performance

### Níveis
- INFO: Informações gerais
- WARNING: Avisos
- ERROR: Erros
- DEBUG: Debugging

## Suporte

### Canais
- GitHub Issues
- Discord
- Email
- Stack Overflow

### Recursos
- Documentação
- Exemplos
- Tutoriais
- FAQs 