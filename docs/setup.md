# Guia de Instalação e Configuração

Este guia detalha o processo de instalação e configuração do DevAI Assistant.

## Requisitos do Sistema

### Hardware
- GPU NVIDIA com 4GB+ VRAM
- 8GB+ RAM
- 10GB+ espaço em disco

### Software
- Windows 10/11
- Python 3.8+
- Node.js v18+
- VS Code
- Git

## Instalação

### 1. Preparação do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/JoaoSantosCodes/DevAI-Assistant.git
cd DevAI-Assistant
```

2. Crie um ambiente virtual Python:
```bash
python -m venv .venv
.venv\Scripts\activate
```

3. Instale as dependências Python:
```bash
pip install -r requirements.txt
```

4. Instale as dependências Node.js:
```bash
npm install
```

### 2. Instalação do DevAI Assistant

1. Execute o script de setup:
```bash
python src/core/setup_manager.py
```

2. Siga as instruções na tela:
   - Verifique o ambiente
   - Configure o npm
   - Instale dependências
   - Inicie o servidor

3. Instale a extensão no VS Code:
```bash
npm run package
code --install-extension devai-assistant-*.vsix
```

### 3. Configuração

1. Abra o VS Code
2. Pressione `Ctrl+Shift+P`
3. Digite "DevAI: Configure"
4. Ajuste as configurações:
   - Limite de VRAM
   - Processos protegidos
   - Logs
   - Performance

## Verificação

### Ambiente
- Python instalado e configurado
- Node.js instalado e configurado
- npm disponível no PATH
- VS Code com extensão instalada

### Dependências
- Python packages instalados
- Node.js modules instalados
- Ollama instalado e configurado
- GPU detectada e configurada

### Serviços
- Servidor local rodando
- Ollama rodando
- Logs funcionando
- Monitoramento ativo

## Solução de Problemas

### Python
1. Verifique a instalação:
```bash
python --version
pip list
```

2. Reinstale dependências:
```bash
pip install -r requirements.txt --force-reinstall
```

3. Limpe cache:
```bash
pip cache purge
```

### Node.js
1. Verifique a instalação:
```bash
node --version
npm --version
```

2. Reinstale dependências:
```bash
npm ci
```

3. Limpe cache:
```bash
npm cache clean --force
```

### Ollama
1. Verifique a instalação:
```bash
ollama --version
```

2. Reinicie o serviço:
```bash
ollama serve
```

3. Verifique modelos:
```bash
ollama list
```

### GPU
1. Verifique drivers:
```bash
nvidia-smi
```

2. Monitore VRAM:
```bash
nvidia-smi -l 1
```

3. Verifique processos:
```bash
tasklist | findstr "ollama"
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

## Atualização

### Manual
1. Atualize o código:
```bash
git pull origin main
```

2. Atualize dependências:
```bash
pip install -r requirements.txt --upgrade
npm update
```

3. Reconstrua a extensão:
```bash
npm run package
```

### Automática
1. Configure atualizações automáticas
2. Verifique periodicamente
3. Mantenha backups
4. Teste antes de atualizar

## Backup

### Configurações
- Salve arquivos de configuração
- Mantenha logs importantes
- Backup de modelos
- Backup de dados

### Restauração
1. Restaure configurações
2. Verifique dependências
3. Teste funcionalidades
4. Verifique logs

## Segurança

### Boas Práticas
- Mantenha senhas seguras
- Use HTTPS
- Atualize regularmente
- Monitore logs

### Configurações
- Configure firewalls
- Ajuste permissões
- Monitore acesso
- Mantenha backups

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