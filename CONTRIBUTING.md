# Guia de Contribuição

Obrigado pelo seu interesse em contribuir com o DevAI Assistant! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## Código de Conduta

Por favor, leia nosso [Código de Conduta](CODE_OF_CONDUCT.md) antes de contribuir. Esperamos que todos os contribuidores sigam estas diretrizes.

## Como Contribuir

### 1. Configuração do Ambiente

1. Faça um fork do repositório
2. Clone seu fork:
    ```bash
    git clone https://github.com/seu-usuario/DevAI-Assistant.git
    cd DevAI-Assistant
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Compile o projeto:
    ```bash
    npm run compile
    ```

### 2. Fluxo de Trabalho

1. Crie uma branch para sua feature:
    ```bash
    git checkout -b feature/nome-da-feature
    ```
2. Faça suas alterações
3. Execute os testes:
    ```bash
    npm test
    ```
4. Commit suas alterações:
    ```bash
    git commit -m "feat: descrição da feature"
    ```
5. Push para sua branch:
    ```bash
    git push origin feature/nome-da-feature
    ```
6. Abra um Pull Request

### 3. Convenções de Código

-   Use TypeScript para todo o código novo
-   Siga o estilo de código existente
-   Use ESLint e Prettier para formatação
-   Escreva testes para novas funcionalidades
-   Documente novas APIs e funções
-   Mantenha o código limpo e organizado

### 4. Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

-   `feat:` para novas features
-   `fix:` para correções de bugs
-   `docs:` para documentação
-   `style:` para formatação
-   `refactor:` para refatoração
-   `test:` para testes
-   `chore:` para tarefas de manutenção

### 5. Pull Requests

1. Atualize sua branch com a main:
    ```bash
    git checkout main
    git pull
    git checkout feature/nome-da-feature
    git rebase main
    ```
2. Resolva conflitos se houver
3. Certifique-se que todos os testes passam
4. Atualize a documentação se necessário
5. Descreva suas alterações no PR

### 6. Documentação

-   Atualize o README.md se necessário
-   Documente novas APIs e funções
-   Adicione exemplos de uso
-   Atualize o CHANGELOG.md

### 7. Testes

-   Escreva testes unitários
-   Escreva testes de integração
-   Mantenha a cobertura de testes alta
-   Execute todos os testes antes de submeter

### 8. Revisão de Código

-   Responda aos comentários dos revisores
-   Faça as alterações solicitadas
-   Mantenha o PR atualizado
-   Seja paciente com o processo de revisão

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
