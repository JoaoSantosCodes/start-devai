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

function atualizarGitHub() {
    relatorio.push('Iniciando atualização do GitHub...');

    // Verificar status do git
    const status = executarComando('git status');
    if (!status) {
        relatorio.push('Falha ao verificar status do git');
        return;
    }

    // Verificar se há mudanças
    if (status.includes('nothing to commit')) {
        relatorio.push('Não há mudanças para commitar');
        return;
    }

    // Adicionar todas as mudanças
    relatorio.push('Adicionando mudanças...');
    executarComando('git add .');

    // Criar commit
    relatorio.push('Criando commit...');
    const data = new Date().toISOString().split('T')[0];
    executarComando(`git commit -m "Organização do projeto: ${data}"`);

    // Fazer push
    relatorio.push('Fazendo push para o repositório remoto...');
    executarComando('git push');

    relatorio.push('Atualização do GitHub concluída com sucesso!');
}

// Executar atualização
atualizarGitHub();

// Salvar relatório
const relatorioPath = path.join(raiz, 'relatorio-github.txt');
fs.writeFileSync(relatorioPath, relatorio.join('\n'));
console.log(`Relatório gerado em ${relatorioPath}`);
