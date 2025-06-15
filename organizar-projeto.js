const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurações
const raiz = process.cwd();
const backupDir = path.join(raiz, '__backup_organizer');
const relatorio = [];

// Funções utilitárias
function copiarArquivo(origem, destino) {
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.copyFileSync(origem, destino);
}
function moverArquivo(origem, destino) {
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.renameSync(origem, destino);
}
function removerArquivo(arquivo) {
    if (fs.existsSync(arquivo)) {
        if (fs.lstatSync(arquivo).isDirectory()) {
            fs.rmSync(arquivo, { recursive: true, force: true });
        } else {
            fs.unlinkSync(arquivo);
        }
    }
}
function listarArquivos(dir, lista = []) {
    let arquivos;
    try {
        arquivos = fs.readdirSync(dir);
    } catch (e) {
        // Se não conseguir ler a pasta (permissão), apenas pula
        return lista;
    }
    for (const arquivo of arquivos) {
        const caminhoCompleto = path.join(dir, arquivo);
        let stat;
        try {
            stat = fs.statSync(caminhoCompleto);
        } catch (e) {
            // Se não conseguir acessar, pula
            continue;
        }
        if (stat.isDirectory()) {
            // Ignorar pastas de sistema, dependências, ambientes virtuais, .vscode, docs e media
            if (
                ![
                    '.git',
                    'node_modules',
                    backupDir,
                    '.venv',
                    'venv',
                    '__pycache__',
                    '.vscode',
                    'docs',
                    'media',
                ].includes(arquivo)
            ) {
                lista.push({ type: 'dir', path: caminhoCompleto });
                listarArquivos(caminhoCompleto, lista);
            }
        } else {
            lista.push({ type: 'file', path: caminhoCompleto });
        }
    }
    return lista;
}
function backupArquivo(arquivo) {
    // Só faz backup se for arquivo
    if (!fs.existsSync(arquivo) || fs.lstatSync(arquivo).isDirectory()) return;
    const destino = path.join(backupDir, path.relative(raiz, arquivo));
    try {
        copiarArquivo(arquivo, destino);
    } catch (e) {
        relatorio.push(`Falha ao fazer backup de ${arquivo}: ${e.message}`);
    }
}
function restaurarBackup() {
    if (!fs.existsSync(backupDir)) return;
    const arquivos = listarArquivos(backupDir);
    for (const item of arquivos) {
        if (item.type === 'file') {
            copiarArquivo(item.path, path.join(raiz, path.relative(backupDir, item.path)));
        }
    }
}
function limparBackup() {
    removerArquivo(backupDir);
}

// 1. Backup dos arquivos relevantes
function backupProjeto() {
    if (fs.existsSync(backupDir)) limparBackup();
    const arquivos = listarArquivos(raiz);
    for (const item of arquivos) {
        if (
            item.path.includes('node_modules') ||
            item.path.includes('.git') ||
            item.path.includes(backupDir)
        )
            continue;
        backupArquivo(item.path);
    }
    relatorio.push('Backup realizado.');
}

// 2. Organização automática
function organizarEstrutura() {
    // Exemplo: garantir que arquivos core estejam em src/core, ui em src/ui, etc
    const arquivos = listarArquivos(raiz);
    for (const item of arquivos) {
        if (item.type !== 'file') continue;
        const nome = path.basename(item.path);
        // Exemplo: mover aiManager.ts, logger.ts, setup_manager.ts para src/core
        if (
            ['aiManager.ts', 'logger.ts', 'setup_manager.ts'].includes(nome) &&
            path.dirname(item.path) !== path.join(raiz, 'src', 'core')
        ) {
            const destino = path.join(raiz, 'src', 'core', nome);
            backupArquivo(item.path);
            moverArquivo(item.path, destino);
            relatorio.push(`Movido: ${item.path} -> ${destino}`);
        }
        // Exemplo: mover aiPanel.ts para src/ui
        if (nome === 'aiPanel.ts' && path.dirname(item.path) !== path.join(raiz, 'src', 'ui')) {
            const destino = path.join(raiz, 'src', 'ui', nome);
            backupArquivo(item.path);
            moverArquivo(item.path, destino);
            relatorio.push(`Movido: ${item.path} -> ${destino}`);
        }
        // Exemplo: remover arquivos de inventário
        if (['inventario-arquivos.txt', 'inventario-arquivos.json'].includes(nome)) {
            backupArquivo(item.path);
            removerArquivo(item.path);
            relatorio.push(`Removido: ${item.path}`);
        }
    }
}

// 3. Atualizar .gitignore e .vscodeignore
function atualizarIgnores() {
    const gitignore = path.join(raiz, '.gitignore');
    const vscodeignore = path.join(raiz, '.vscodeignore');
    const ignores = [
        'out/',
        'dist/',
        'node_modules/',
        'inventario-arquivos.txt',
        'inventario-arquivos.json',
        '__backup_organizer/',
    ];
    for (const file of [gitignore, vscodeignore]) {
        let conteudo = '';
        if (fs.existsSync(file)) conteudo = fs.readFileSync(file, 'utf8');
        let alterado = false;
        for (const ign of ignores) {
            if (!conteudo.includes(ign)) {
                conteudo += `\n${ign}`;
                alterado = true;
            }
        }
        if (alterado) {
            fs.writeFileSync(file, conteudo, 'utf8');
            relatorio.push(`Atualizado: ${file}`);
        }
    }
}

// 4. Validação do projeto
function validarProjeto() {
    try {
        execSync('npm run compile', { stdio: 'inherit' });
        relatorio.push('Validação: Projeto compilou com sucesso.');
        return true;
    } catch (e) {
        relatorio.push('Validação: Erro ao compilar o projeto. Mudanças serão revertidas.');
        return false;
    }
}

// 5. Execução principal
function main() {
    try {
        backupProjeto();
        organizarEstrutura();
        atualizarIgnores();
        if (!validarProjeto()) {
            restaurarBackup();
            relatorio.push(
                'Backup restaurado devido a erro. Nenhuma alteração permanente foi feita.'
            );
        } else {
            limparBackup();
            relatorio.push('Organização concluída com sucesso.');

            // Atualizar GitHub
            relatorio.push('\nIniciando atualização do GitHub...');
            try {
                require('./atualizar-github.js');
            } catch (e) {
                relatorio.push(`Erro ao atualizar GitHub: ${e.message}`);
            }
        }
    } catch (e) {
        restaurarBackup();
        relatorio.push('Erro inesperado. Backup restaurado.');
        relatorio.push(e.toString());
    } finally {
        fs.writeFileSync('relatorio-organizacao.txt', relatorio.join('\n'), 'utf8');
        console.log('Relatório gerado em relatorio-organizacao.txt');
    }
}

main();
