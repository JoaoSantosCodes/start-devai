# Guia de Contribuição

Este guia fornece instruções detalhadas para contribuir com o DevAI Extension.

## Para Desenvolvedores

### 1. Configuração do Ambiente

#### Requisitos
- Node.js 16+
- VS Code
- Git
- Python 3.8+
- GPU NVIDIA (recomendado)

#### Setup Inicial
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

#### Criando uma Feature
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

#### Testes
- Execute os testes unitários
- Teste manualmente no VS Code
- Verifique a compilação

#### Documentação
- Atualize a documentação relevante
- Adicione exemplos de uso
- Atualize o README se necessário

### 4. Boas Práticas

#### Código
- Siga o estilo de código do projeto
- Adicione comentários explicativos
- Mantenha a cobertura de testes

#### Commits
- Use mensagens claras e descritivas
- Siga o padrão de commits
- Referencie issues quando relevante

#### Pull Requests
- Descreva as mudanças
- Inclua screenshots se aplicável
- Referencie issues relacionadas

### 5. Recursos para Desenvolvimento

- [Documentação de Implementação](IMPLEMENTACAO.md)
- [Guia de Uso](usage.md)
- [Roadmap](ROADMAP.md)
- [Fluxograma do Sistema](FLUXOGRAMA.md)

## Para Usuários

### 1. Reportando Bugs

#### Template de Bug Report
```markdown
## Descrição
[Descreva o bug em detalhes]

## Passos para Reproduzir
1. [Primeiro passo]
2. [Segundo passo]
3. [E assim por diante...]

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que está acontecendo]

## Screenshots
[Se aplicável, adicione screenshots]

## Ambiente
- VS Code Version: [versão]
- DevAI Version: [versão]
- OS: [sistema operacional]

## Logs
[Adicione logs relevantes]
```

### 2. Sugerindo Features

#### Template de Feature Request
```markdown
## Descrição
[Descreva a feature em detalhes]

## Caso de Uso
[Como esta feature seria útil]

## Alternativas Consideradas
[Quais alternativas você já tentou]

## Screenshots
[Se aplicável, adicione mockups]
```

### 3. Melhorando a Documentação

#### Áreas que Precisam de Atenção
- [ ] README.md
- [ ] Guias de uso
- [ ] Exemplos
- [ ] API docs

#### Como Contribuir
1. Identifique uma área que precisa de melhoria
2. Faça as alterações necessárias
3. Envie um pull request

## Processo de Contribuição

### 1. Fork e Clone
```bash
# Faça fork do repositório
# Clone seu fork
git clone https://github.com/seu-usuario/start-devai.git
```

### 2. Desenvolvimento
```bash
# Crie uma branch
git checkout -b feature/nova-funcionalidade

# Faça suas alterações
# Teste localmente
npm run compile

# Faça commit
git add .
git commit -m "feat: nova funcionalidade"
```

### 3. Envio
```bash
# Envie para seu fork
git push origin feature/nova-funcionalidade

# Crie um Pull Request
# Siga o template
# Aguarde a revisão
```

## Código de Conduta

### 1. Comunicação
- Seja respeitoso
- Use linguagem inclusiva
- Mantenha o foco no projeto

### 2. Colaboração
- Ajude outros contribuidores
- Seja aberto a feedback
- Mantenha a qualidade do código

### 3. Compromisso
- Mantenha suas promessas
- Comunique atrasos
- Peça ajuda quando necessário

## Suporte

### Para Desenvolvedores
- Participe das discussões no GitHub
- Revise o código de outros contribuidores
- Ajude a manter a documentação atualizada

### Para Usuários
- Consulte a [documentação](docs/)
- Abra uma issue no GitHub
- Entre em contato com a equipe

## Próximos Passos

### 1. Desenvolvedores
- Revise issues abertas
- Proponha melhorias
- Ajude com a documentação

### 2. Usuários
- Teste novas features
- Reporte bugs
- Sugira melhorias
