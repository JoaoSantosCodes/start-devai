const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurações
const raiz = process.cwd();
const relatorio = [];

// Extensões necessárias para o projeto
const extensoesNecessarias = [
    'dbaeumer.vscode-eslint', // ESLint
    'esbenp.prettier-vscode', // Prettier
    'ms-vscode.vscode-typescript-tslint-plugin', // TypeScript
    'vscode-icons-team.vscode-icons', // Ícones
];

// Extensões opcionais mas recomendadas
const extensoesRecomendadas = [
    'ms-vscode.test-adapter-converter', // Testes
    'hbenl.vscode-test-explorer', // Explorador de testes
    'ms-vscode.vscode-typescript-next', // TypeScript Next
];

function executarComando(comando) {
    try {
        return execSync(comando, { cwd: raiz, encoding: 'utf-8' });
    } catch (e) {
        relatorio.push(`Erro ao executar comando: ${comando}`);
        relatorio.push(`Mensagem de erro: ${e.message}`);
        return null;
    }
}

function analisarDependencias() {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const dependencias = {
        dev: Object.keys(packageJson.devDependencies || {}),
        prod: Object.keys(packageJson.dependencies || {}),
    };
    return dependencias;
}

function validarExtensoes() {
    relatorio.push('Iniciando validação de extensões...');

    // 1. Listar extensões instaladas
    relatorio.push('\n1. Extensões instaladas:');
    const extensoesInstaladas = executarComando('code --list-extensions');
    const listaExtensoes = extensoesInstaladas.split('\n').filter(Boolean);

    // 2. Analisar dependências do projeto
    relatorio.push('\n2. Analisando dependências do projeto...');
    const dependencias = analisarDependencias();
    relatorio.push('Dependências de desenvolvimento:');
    dependencias.dev.forEach((dep) => relatorio.push(`- ${dep}`));
    relatorio.push('\nDependências de produção:');
    dependencias.prod.forEach((dep) => relatorio.push(`- ${dep}`));

    // 3. Identificar extensões necessárias
    relatorio.push('\n3. Extensões necessárias:');
    extensoesNecessarias.forEach((ext) => {
        if (listaExtensoes.includes(ext)) {
            relatorio.push(`✅ ${ext} - Instalada`);
        } else {
            relatorio.push(`❌ ${ext} - Não instalada`);
        }
    });

    // 4. Identificar extensões recomendadas
    relatorio.push('\n4. Extensões recomendadas:');
    extensoesRecomendadas.forEach((ext) => {
        if (listaExtensoes.includes(ext)) {
            relatorio.push(`✅ ${ext} - Instalada`);
        } else {
            relatorio.push(`⚠️ ${ext} - Não instalada (opcional)`);
        }
    });

    // 5. Identificar extensões desnecessárias
    relatorio.push('\n5. Extensões potencialmente desnecessárias:');
    const extensoesDesnecessarias = listaExtensoes.filter(
        (ext) => !extensoesNecessarias.includes(ext) && !extensoesRecomendadas.includes(ext)
    );

    if (extensoesDesnecessarias.length > 0) {
        extensoesDesnecessarias.forEach((ext) => {
            relatorio.push(`⚠️ ${ext} - Pode ser desinstalada`);
        });
    } else {
        relatorio.push('Nenhuma extensão desnecessária encontrada.');
    }

    // 6. Gerar comandos para instalar/desinstalar
    relatorio.push('\n6. Comandos para ajustar extensões:');

    // Comandos para instalar extensões necessárias faltantes
    extensoesNecessarias.forEach((ext) => {
        if (!listaExtensoes.includes(ext)) {
            relatorio.push(`code --install-extension ${ext}`);
        }
    });

    // Comandos para desinstalar extensões desnecessárias
    extensoesDesnecessarias.forEach((ext) => {
        relatorio.push(`code --uninstall-extension ${ext}`);
    });

    // 7. Resultado final
    relatorio.push('\n7. Resumo:');
    const extensoesFaltantes = extensoesNecessarias.filter((ext) => !listaExtensoes.includes(ext));
    if (extensoesFaltantes.length > 0) {
        relatorio.push('❌ Algumas extensões necessárias estão faltando!');
        relatorio.push('Extensões faltantes:');
        extensoesFaltantes.forEach((ext) => relatorio.push(`- ${ext}`));
    } else {
        relatorio.push('✅ Todas as extensões necessárias estão instaladas!');
    }
}

// Executar validação
validarExtensoes();

// Salvar relatório
const relatorioPath = path.join(raiz, 'relatorio-extensoes.txt');
fs.writeFileSync(relatorioPath, relatorio.join('\n'));
console.log(`Relatório gerado em ${relatorioPath}`);
