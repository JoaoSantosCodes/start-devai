# Exemplos Práticos

Este documento contém exemplos práticos de uso do DevAI Extension em diferentes cenários.

## 1. Organização de Extensões

### Exemplo 1: Projeto Web

```typescript
// Comando: DevAI: Organizar Extensões
{
  "extensions": {
    "languages": [
      "esbenp.prettier-vscode",
      "dbaeumer.vscode-eslint",
      "bradlc.vscode-tailwindcss"
    ],
    "git": [
      "eamodio.gitlens",
      "mhutchie.git-graph"
    ],
    "themes": [
      "pkief.material-icon-theme",
      "zhuangtongfa.material-theme"
    ]
  }
}
```

### Exemplo 2: Projeto Mobile

```typescript
// Comando: DevAI: Organizar Extensões
{
  "extensions": {
    "languages": [
      "dart-code.dart-code",
      "dart-code.flutter",
      "nash.awesome-flutter-snippets"
    ],
    "debugging": [
      "dart-code.flutter-debug",
      "ms-vscode.vscode-react-native"
    ],
    "testing": [
      "dart-code.flutter-test",
      "ryanluker.vscode-coverage-gutters"
    ]
  }
}
```

## 2. Perfis Inteligentes

### Exemplo 1: Perfil Web Full-Stack

```json
{
    "name": "Web Full-Stack",
    "description": "Perfil para desenvolvimento web full-stack",
    "extensions": {
        "frontend": [
            "esbenp.prettier-vscode",
            "dbaeumer.vscode-eslint",
            "bradlc.vscode-tailwindcss"
        ],
        "backend": ["ms-azuretools.vscode-docker", "mongodb.mongodb-vscode", "prisma.prisma"],
        "database": ["mtxr.sqltools", "mtxr.sqltools-driver-pg"]
    }
}
```

### Exemplo 2: Perfil Mobile React Native

```json
{
    "name": "React Native",
    "description": "Perfil para desenvolvimento mobile com React Native",
    "extensions": {
        "core": ["msjsdiag.vscode-react-native", "dsznajder.es7-react-js-snippets"],
        "styling": ["styled-components.vscode-styled-components", "naumovs.color-highlight"],
        "testing": ["orta.vscode-jest", "ryanluker.vscode-coverage-gutters"]
    }
}
```

## 3. Análise de Desempenho

### Exemplo 1: Relatório de Performance

```json
{
    "timestamp": "2024-03-20T10:00:00Z",
    "metrics": {
        "cpu": {
            "usage": "45%",
            "extensions": {
                "esbenp.prettier-vscode": "15%",
                "dbaeumer.vscode-eslint": "10%",
                "ms-azuretools.vscode-docker": "20%"
            }
        },
        "memory": {
            "total": "1.2GB",
            "extensions": {
                "esbenp.prettier-vscode": "200MB",
                "dbaeumer.vscode-eslint": "150MB",
                "ms-azuretools.vscode-docker": "400MB"
            }
        }
    },
    "suggestions": [
        "Desativar extensões não utilizadas",
        "Atualizar extensões desatualizadas",
        "Otimizar configurações do Docker"
    ]
}
```

### Exemplo 2: Otimização de Performance

```typescript
// Comando: DevAI: Analisar Desempenho
{
  "actions": [
    {
      "type": "disable",
      "extension": "ms-azuretools.vscode-docker",
      "reason": "Alto uso de CPU"
    },
    {
      "type": "update",
      "extension": "esbenp.prettier-vscode",
      "reason": "Versão desatualizada"
    },
    {
      "type": "configure",
      "extension": "dbaeumer.vscode-eslint",
      "settings": {
        "eslint.lintTask.enable": false,
        "eslint.run": "onSave"
      }
    }
  ]
}
```

## 4. Scripts de Automação

### Exemplo 1: Organização Automática

```bash
# organizar-projeto.js
const config = {
  backup: {
    enabled: true,
    path: "./backup"
  },
  organization: {
    rules: [
      {
        pattern: "*.ts",
        destination: "src"
      },
      {
        pattern: "*.test.ts",
        destination: "tests"
      }
    ]
  },
  validation: {
    compile: true,
    test: true
  }
};
```

### Exemplo 2: Atualização do GitHub

```bash
# atualizar-github.js
const config = {
  git: {
    branch: "main",
    commitMessage: "chore: atualização automática",
    push: true
  },
  validation: {
    checkStatus: true,
    checkConflicts: true
  }
};
```

## 5. Comandos VS Code

### Exemplo 1: Validação de Extensões

```typescript
// Comando: DevAI: Validar Extensões
{
  "project": {
    "type": "web",
    "languages": ["typescript", "javascript"],
    "frameworks": ["react", "node"],
    "tools": ["docker", "git"]
  },
  "recommendations": [
    {
      "extension": "esbenp.prettier-vscode",
      "reason": "Formatador recomendado para TypeScript"
    },
    {
      "extension": "dbaeumer.vscode-eslint",
      "reason": "Linter essencial para JavaScript/TypeScript"
    }
  ]
}
```

### Exemplo 2: Gerenciamento de Grupos

```typescript
// Comando: DevAI: Gerenciar Grupos de Extensões
{
  "groups": {
    "languages": {
      "enabled": true,
      "extensions": [
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint"
      ]
    },
    "git": {
      "enabled": true,
      "extensions": [
        "eamodio.gitlens",
        "mhutchie.git-graph"
      ]
    }
  }
}
```

## 6. Troubleshooting

### Exemplo 1: Erro de Compilação

```typescript
// Log de erro
{
  "error": {
    "type": "compilation",
    "message": "Erro ao compilar TypeScript",
    "details": {
      "file": "src/core/aiManager.ts",
      "line": 42,
      "column": 15,
      "code": "TS2322"
    }
  },
  "solution": {
    "steps": [
      "Verificar tipos no arquivo",
      "Atualizar dependências",
      "Limpar cache do TypeScript"
    ]
  }
}
```

### Exemplo 2: Problema de Performance

```typescript
// Log de performance
{
  "issue": {
    "type": "performance",
    "extension": "ms-azuretools.vscode-docker",
    "metric": "cpu",
    "value": "80%"
  },
  "solution": {
    "steps": [
      "Desativar extensão temporariamente",
      "Verificar configurações do Docker",
      "Limitar recursos do container"
    ]
  }
}
```
