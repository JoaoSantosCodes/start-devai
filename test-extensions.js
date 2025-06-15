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

function testarFuncionalidades() {
    relatorio.push('Iniciando testes das funcionalidades...\n');

    // 1. Testar validação de extensões
    relatorio.push('1. Testando validação de extensões...');
    const extensoesInstaladas = executarComando('code --list-extensions');
    if (extensoesInstaladas) {
        const listaExtensoes = extensoesInstaladas.split('\n').filter(Boolean);
        relatorio.push(`✅ Encontradas ${listaExtensoes.length} extensões instaladas`);

        // Verificar extensões necessárias
        const extensoesNecessarias = [
            'dbaeumer.vscode-eslint',
            'esbenp.prettier-vscode',
            'ms-vscode.vscode-typescript-tslint-plugin',
            'vscode-icons-team.vscode-icons',
        ];

        extensoesNecessarias.forEach((ext) => {
            if (listaExtensoes.includes(ext)) {
                relatorio.push(`✅ ${ext} - Instalada`);
            } else {
                relatorio.push(`❌ ${ext} - Não instalada`);
            }
        });
    }

    // 2. Testar análise de desempenho
    relatorio.push('\n2. Testando análise de desempenho...');
    try {
        const tasklist = executarComando('tasklist /FI "IMAGENAME eq Code.exe" /FO CSV /NH');
        if (tasklist) {
            const stats = tasklist.split(',');
            const memoria = parseInt(stats[4].replace(/[^0-9]/g, '')) * 1024;
            relatorio.push(
                `✅ Uso de memória do VS Code: ${(memoria / 1024 / 1024).toFixed(2)} MB`
            );
        }
    } catch (error) {
        relatorio.push(`❌ Erro ao obter estatísticas: ${error.message}`);
    }

    // 3. Testar perfis de extensões
    relatorio.push('\n3. Testando perfis de extensões...');
    const profilesPath = path.join(raiz, '.vscode', 'extension-profiles.json');
    if (fs.existsSync(profilesPath)) {
        const profiles = JSON.parse(fs.readFileSync(profilesPath, 'utf-8'));
        relatorio.push(`✅ Encontrados ${Object.keys(profiles).length} perfis`);
        Object.entries(profiles).forEach(([name, profile]) => {
            relatorio.push(`  - ${name}: ${profile.extensions.length} extensões`);
        });
    } else {
        relatorio.push('⚠️ Nenhum perfil encontrado');
    }

    // 4. Verificar comandos registrados
    relatorio.push('\n4. Verificando comandos registrados...');
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const comandos = packageJson.contributes.commands;
    relatorio.push(`✅ ${comandos.length} comandos registrados:`);
    comandos.forEach((cmd) => {
        relatorio.push(`  - ${cmd.title}`);
    });

    // 5. Resultado final
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
testarFuncionalidades();

// Salvar relatório
const relatorioPath = path.join(raiz, 'relatorio-testes-extensoes.txt');
fs.writeFileSync(relatorioPath, relatorio.join('\n'));
console.log(`Relatório gerado em ${relatorioPath}`);
