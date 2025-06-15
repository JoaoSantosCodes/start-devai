const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurações
const raiz = process.cwd();
const relatorio = [];

function executarComando(comando) {
    try {
        return execSync(comando, { cwd: raiz, encoding: 'utf-8' });
    } catch (e) {
        relatorio.push(`Erro ao executar comando: ${comando}`);
        relatorio.push(`Mensagem de erro: ${e.message}`);
        return null;
    }
}

function testarExtensao() {
    relatorio.push('Iniciando testes da extensão...');

    // 1. Compilar
    relatorio.push('\n1. Compilando projeto...');
    executarComando('npm run compile');

    // 2. Verificar estrutura
    relatorio.push('\n2. Verificando estrutura...');
    const arquivos = [
        'dist/extension.js',
        'src/core/aiManager.ts',
        'src/core/logger.ts',
        'src/core/setup_manager.ts',
        'src/ui/aiPanel.ts',
    ];

    arquivos.forEach((arquivo) => {
        if (fs.existsSync(path.join(raiz, arquivo))) {
            relatorio.push(`✅ ${arquivo} encontrado`);
        } else {
            relatorio.push(`❌ ${arquivo} não encontrado`);
        }
    });

    // 3. Verificar dependências
    relatorio.push('\n3. Verificando dependências...');
    executarComando('npm list --depth=0');

    // 4. Verificar configuração
    relatorio.push('\n4. Verificando configuração...');
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    relatorio.push(`Nome: ${packageJson.name}`);
    relatorio.push(`Versão: ${packageJson.version}`);
    relatorio.push(`Comandos: ${packageJson.contributes.commands.length}`);

    // 5. Resultado
    relatorio.push('\n5. Resultado dos testes:');
    const erros = relatorio.filter((line) => line.includes('❌'));
    if (erros.length > 0) {
        relatorio.push('❌ Testes falharam!');
        relatorio.push('Erros encontrados:');
        erros.forEach((erro) => relatorio.push(erro));
    } else {
        relatorio.push('✅ Todos os testes passaram!');
    }
}

// Executar testes
testarExtensao();

// Salvar relatório
const relatorioPath = path.join(raiz, 'relatorio-testes.txt');
fs.writeFileSync(relatorioPath, relatorio.join('\n'));
console.log(`Relatório gerado em ${relatorioPath}`);
