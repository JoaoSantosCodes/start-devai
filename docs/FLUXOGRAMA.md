# Fluxograma do Sistema

## Fluxo Principal

```mermaid
graph TD
    A[Início] --> B[Executar organizar-projeto.js]
    B --> C[Fazer Backup]
    C --> D[Organizar Arquivos]
    D --> E[Atualizar Configurações]
    E --> F[Validar Compilação]
    F --> G{Compilou?}
    G -->|Sim| H[Atualizar GitHub]
    G -->|Não| I[Restaurar Backup]
    I --> J[Fim com Erro]
    H --> K[Gerar Relatórios]
    K --> L[Fim com Sucesso]
```

## Fluxo de Backup

```mermaid
graph TD
    A[Início do Backup] --> B[Listar Arquivos]
    B --> C{É Diretório?}
    C -->|Sim| D{Deve Ignorar?}
    D -->|Sim| E[Pular]
    D -->|Não| F[Recursão]
    C -->|Não| G[Copiar Arquivo]
    E --> H[Próximo]
    F --> H
    G --> H
    H --> I{Todos Processados?}
    I -->|Não| B
    I -->|Sim| J[Fim do Backup]
```

## Fluxo de Organização

```mermaid
graph TD
    A[Início da Organização] --> B[Ler Configuração]
    B --> C[Identificar Arquivos]
    C --> D{Criar Diretórios}
    D --> E[Mover Arquivos]
    E --> F[Atualizar .gitignore]
    F --> G[Atualizar .vscodeignore]
    G --> H[Fim da Organização]
```

## Fluxo de Atualização GitHub

```mermaid
graph TD
    A[Início GitHub] --> B[Verificar Status]
    B --> C{Há Mudanças?}
    C -->|Não| D[Fim]
    C -->|Sim| E[Adicionar Mudanças]
    E --> F[Criar Commit]
    F --> G[Fazer Push]
    G --> H[Gerar Relatório]
    H --> I[Fim]
```

## Fluxo de Validação

```mermaid
graph TD
    A[Início Validação] --> B[Executar Compilação]
    B --> C{Sucesso?}
    C -->|Sim| D[Validar Estrutura]
    C -->|Não| E[Registrar Erro]
    D --> F{Validação OK?}
    F -->|Sim| G[Sucesso]
    F -->|Não| E
    E --> H[Restaurar Backup]
    H --> I[Fim com Erro]
    G --> J[Fim com Sucesso]
```

## Fluxo de Relatórios

```mermaid
graph TD
    A[Início Relatórios] --> B[Criar relatorio-organizacao.txt]
    B --> C[Registrar Ações]
    C --> D[Registrar Erros]
    D --> E[Criar relatorio-github.txt]
    E --> F[Registrar Status Git]
    F --> G[Fim Relatórios]
```

## Notas

-   Os fluxogramas são gerados usando Mermaid
-   Podem ser visualizados em editores que suportam Mermaid
-   Representam o fluxo lógico do sistema
-   Incluem tratamento de erros e casos especiais
