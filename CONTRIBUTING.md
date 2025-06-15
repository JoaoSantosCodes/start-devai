# Guia de Contribuição

Obrigado pelo seu interesse em contribuir com o DevAI Assistant! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## Código de Conduta

Por favor, leia nosso [Código de Conduta](CODE_OF_CONDUCT.md) antes de contribuir. Esperamos que todos os contribuidores sigam estas diretrizes.

## Como Contribuir

### 1. Configuração do Ambiente

```bash
# Clone o repositório
git clone https://github.com/JoaoSantosCodes/start-devai.git

# Instale as dependências
npm install

# Configure o ambiente de desenvolvimento
npm run setup
```

### 2. Padrões de Código

#### TypeScript

-   Use TypeScript estrito
-   Documente interfaces e tipos
-   Siga o estilo de código do projeto
-   Use ESLint e Prettier

#### Commits

-   Use mensagens claras e descritivas
-   Siga o padrão: `tipo(escopo): descrição`
-   Exemplo: `feat(ui): adiciona novo painel de controle`

#### Branches

-   `main`: código em produção
-   `develop`: desenvolvimento
-   `feature/*`: novas funcionalidades
-   `fix/*`: correções
-   `docs/*`: documentação

### 3. Processo de Pull Request

1. **Preparação**

    - Atualize sua branch com a main
    - Resolva conflitos
    - Atualize documentação

2. **Checklist**

    - [ ] Código segue padrões
    - [ ] Testes passam
    - [ ] Documentação atualizada
    - [ ] Sem conflitos
    - [ ] Descrição clara

3. **Revisão**
    - Aguarde feedback
    - Responda comentários
    - Faça ajustes necessários

### 4. Testes

#### Unitários

```bash
npm run test
```

#### Integração

```bash
npm run test:integration
```

#### Cobertura

```bash
npm run test:coverage
```

### 5. Documentação

-   Atualize README se necessário
-   Documente novas funcionalidades
-   Mantenha exemplos atualizados
-   Atualize fluxogramas

### 6. Checklist de Contribuição

-   [ ] Código segue padrões
-   [ ] Testes escritos e passando
-   [ ] Documentação atualizada
-   [ ] Sem warnings/erros
-   [ ] Commits organizados
-   [ ] PR descritiva

### 7. Suporte

-   Issues para bugs
-   Discussões para ideias
-   Pull requests para contribuições
-   Documentação para dúvidas

### 8. Reconhecimento

-   Contribuidores listados no README
-   Menção em releases
-   Badges de contribuição
-   Agradecimentos especiais

## Recursos

-   [Documentação da API](https://github.com/DevAI-Assistant/DevAI-Assistant/wiki)
-   [Guia de Estilo](https://github.com/DevAI-Assistant/DevAI-Assistant/wiki/Style-Guide)
-   [FAQ](https://github.com/DevAI-Assistant/DevAI-Assistant/wiki/FAQ)

## Suporte

Se você tiver dúvidas ou precisar de ajuda:

-   Abra uma issue no GitHub
-   Entre em contato via Discord
-   Consulte a documentação

## Agradecimentos

Obrigado por contribuir com o DevAI Assistant! Sua ajuda é muito importante para o projeto.
