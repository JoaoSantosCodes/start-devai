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
            // Ignorar apenas pastas de sistema, dependências e ambientes virtuais
            if (
                ![
                    '.git',
                    'node_modules',
                    backupDir,
                    '.venv',
                    'venv',
                    '__pycache__',
                    '.vscode',
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

// Nova função para verificar referências cruzadas
function verificarReferenciasCruzadas() {
    const arquivos = listarArquivos(raiz);
    const referencias = new Map();

    // Primeiro, coleta todas as referências
    for (const item of arquivos) {
        if (item.type !== 'file' || !item.path.endsWith('.md')) continue;

        const conteudo = fs.readFileSync(item.path, 'utf8');
        const links = conteudo.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];

        for (const link of links) {
            const match = link.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (match) {
                const [, texto, caminho] = match;
                if (!referencias.has(caminho)) {
                    referencias.set(caminho, []);
                }
                referencias.get(caminho).push({
                    arquivo: item.path,
                    texto,
                });
            }
        }
    }

    // Depois, verifica se os arquivos referenciados existem
    for (const [caminho, refs] of referencias) {
        const caminhoCompleto = path.join(raiz, caminho);
        if (!fs.existsSync(caminhoCompleto)) {
            relatorio.push(`\nAtenção: Arquivo referenciado não encontrado: ${caminho}`);
            relatorio.push('  Referenciado em:');
            for (const ref of refs) {
                relatorio.push(`  - ${ref.arquivo} (${ref.texto})`);
            }
        }
    }
}

// Nova função para analisar arquivo
function analisarArquivo(caminho) {
    const conteudo = fs.readFileSync(caminho, 'utf8');
    const stats = fs.statSync(caminho);

    return {
        caminho,
        tamanho: stats.size,
        linhas: conteudo.split('\n').length,
        ultimaModificacao: stats.mtime,
        conteudo,
        // Análise de conteúdo
        temLinks: conteudo.includes(']('),
        temTabelas: conteudo.includes('|'),
        temCodigo: conteudo.includes('```'),
        temImagens: conteudo.includes('!['),
        temTitulos: conteudo.match(/^#{1,6}\s/gm)?.length || 0,
        temListas: conteudo.match(/^[-*]\s/gm)?.length || 0,
        // Análise de estrutura
        temSecoes: conteudo.match(/^#{2,}\s/gm)?.length || 0,
        temExemplos: conteudo.includes('Exemplo:') || conteudo.includes('Example:'),
        temNotas: conteudo.includes('Nota:') || conteudo.includes('Note:'),
        temAvisos: conteudo.includes('Aviso:') || conteudo.includes('Warning:'),
        temReferencias: conteudo.includes('Referência:') || conteudo.includes('Reference:'),
        // Análise de qualidade
        temDataAtualizacao: conteudo.includes('Última atualização:'),
        temVersao: conteudo.includes('Versão:') || conteudo.includes('Version:'),
        temAutores: conteudo.includes('Autor:') || conteudo.includes('Author:'),
        temLicenca: conteudo.includes('Licença:') || conteudo.includes('License:'),
    };
}

// Nova função para comparar arquivos
function compararArquivos(arquivo1, arquivo2) {
    const analise1 = analisarArquivo(arquivo1);
    const analise2 = analisarArquivo(arquivo2);

    // Pontuação baseada em critérios
    let pontos1 = 0;
    let pontos2 = 0;

    // Critérios de pontuação
    const criterios = {
        tamanho: 2, // Arquivo maior
        linhas: 2, // Mais linhas
        temLinks: 3, // Tem links
        temTabelas: 2, // Tem tabelas
        temCodigo: 2, // Tem exemplos de código
        temImagens: 2, // Tem imagens
        temTitulos: 1, // Tem títulos
        temListas: 1, // Tem listas
        temSecoes: 2, // Tem seções
        temExemplos: 3, // Tem exemplos
        temNotas: 2, // Tem notas
        temAvisos: 2, // Tem avisos
        temReferencias: 2, // Tem referências
        temDataAtualizacao: 2, // Tem data de atualização
        temVersao: 2, // Tem versão
        temAutores: 1, // Tem autores
        temLicenca: 1, // Tem licença
    };

    // Calcula pontos para cada arquivo
    for (const [criterio, peso] of Object.entries(criterios)) {
        if (analise1[criterio]) pontos1 += peso;
        if (analise2[criterio]) pontos2 += peso;
    }

    // Arquivo mais recente ganha pontos extras
    if (analise1.ultimaModificacao > analise2.ultimaModificacao) {
        pontos1 += 5;
    } else if (analise2.ultimaModificacao > analise1.ultimaModificacao) {
        pontos2 += 5;
    }

    // Arquivo na raiz ganha pontos extras
    if (path.dirname(arquivo1) === raiz) pontos1 += 3;
    if (path.dirname(arquivo2) === raiz) pontos2 += 3;

    return {
        melhor: pontos1 >= pontos2 ? arquivo1 : arquivo2,
        pior: pontos1 >= pontos2 ? arquivo2 : arquivo1,
        analise1,
        analise2,
        pontos1,
        pontos2,
    };
}

// Modificar a função verificarDuplicados para usar a nova análise
function verificarDuplicados() {
    const arquivos = listarArquivos(raiz);
    const arquivosPorNome = new Map();
    const duplicados = {
        docs: [],
        config: [],
        build: [],
        source: [],
        outros: [],
    };

    // Primeiro, agrupa arquivos por nome
    for (const item of arquivos) {
        if (item.type !== 'file') continue;
        const nome = path.basename(item.path);
        if (!arquivosPorNome.has(nome)) {
            arquivosPorNome.set(nome, []);
        }
        arquivosPorNome.get(nome).push(item.path);
    }

    // Depois, verifica duplicados
    for (const [nome, caminhos] of arquivosPorNome) {
        if (caminhos.length > 1) {
            const extensao = path.extname(nome).toLowerCase();

            // Classifica o tipo de arquivo
            let tipo = 'outros';
            if (['.md', '.txt', '.rst'].includes(extensao)) {
                tipo = 'docs';
            } else if (['.json', '.config', '.rc', '.ini', '.yml', '.yaml'].includes(extensao)) {
                tipo = 'config';
            } else if (['.js', '.d.ts', '.js.map', '.py', '.bat', '.ps1'].includes(extensao)) {
                tipo = 'build';
            } else if (['.ts', '.tsx', '.jsx'].includes(extensao)) {
                tipo = 'source';
            }

            // Adiciona aos duplicados do tipo correspondente
            duplicados[tipo].push({
                nome,
                caminhos,
                extensao,
            });

            // Para documentação, analisa qual arquivo manter
            if (tipo === 'docs') {
                // Compara os arquivos dois a dois
                let melhorArquivo = caminhos[0];
                for (let i = 1; i < caminhos.length; i++) {
                    const comparacao = compararArquivos(melhorArquivo, caminhos[i]);
                    melhorArquivo = comparacao.melhor;

                    // Adiciona análise ao relatório
                    relatorio.push(`\nAnálise de ${nome}:`);
                    relatorio.push(`  Melhor: ${comparacao.melhor} (${comparacao.pontos1} pontos)`);
                    relatorio.push(`  Pior: ${comparacao.pior} (${comparacao.pontos2} pontos)`);
                    relatorio.push('  Critérios:');
                    relatorio.push(
                        `    - Tamanho: ${comparacao.analise1.tamanho} vs ${comparacao.analise2.tamanho} bytes`
                    );
                    relatorio.push(
                        `    - Linhas: ${comparacao.analise1.linhas} vs ${comparacao.analise2.linhas}`
                    );
                    relatorio.push(
                        `    - Seções: ${comparacao.analise1.temSecoes} vs ${comparacao.analise2.temSecoes}`
                    );
                    relatorio.push(
                        `    - Links: ${comparacao.analise1.temLinks} vs ${comparacao.analise2.temLinks}`
                    );
                    relatorio.push(
                        `    - Exemplos: ${comparacao.analise1.temExemplos} vs ${comparacao.analise2.temExemplos}`
                    );
                    relatorio.push(
                        `    - Última modificação: ${comparacao.analise1.ultimaModificacao} vs ${comparacao.analise2.ultimaModificacao}`
                    );
                }

                // Remove os arquivos piores
                for (const caminho of caminhos) {
                    if (caminho !== melhorArquivo) {
                        backupArquivo(caminho);
                        removerArquivo(caminho);
                        relatorio.push(`Removido arquivo duplicado: ${caminho}`);
                    }
                }
            }
        }
    }

    // Gera relatório detalhado
    relatorio.push('\n=== Relatório de Arquivos Duplicados ===');

    for (const [tipo, lista] of Object.entries(duplicados)) {
        if (lista.length > 0) {
            relatorio.push(`\n${tipo.toUpperCase()} (${lista.length} arquivos):`);
            for (const item of lista) {
                relatorio.push(`\n  ${item.nome}:`);
                for (const caminho of item.caminhos) {
                    relatorio.push(`    - ${caminho}`);
                }
            }
        }
    }

    return duplicados;
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

// Nova função para atualizar documentação
function atualizarDocumentacao() {
    relatorio.push('\nAtualizando documentação...');

    // Atualizar README.md
    const readmePath = path.join(raiz, 'README.md');
    if (fs.existsSync(readmePath)) {
        const readme = fs.readFileSync(readmePath, 'utf8');
        const dataAtualizacao = new Date().toISOString().split('T')[0];

        // Atualizar data de última atualização
        const readmeAtualizado = readme.replace(
            /Última atualização:.*/,
            `Última atualização: ${dataAtualizacao}`
        );

        fs.writeFileSync(readmePath, readmeAtualizado, 'utf8');
        relatorio.push('README.md atualizado com nova data.');
    }

    // Atualizar ROADMAP.md
    const roadmapPath = path.join(raiz, 'ROADMAP.md');
    if (fs.existsSync(roadmapPath)) {
        const roadmap = fs.readFileSync(roadmapPath, 'utf8');
        const dataAtualizacao = new Date().toISOString().split('T')[0];

        // Atualizar data de última atualização
        const roadmapAtualizado = roadmap.replace(
            /Última atualização:.*/,
            `Última atualização: ${dataAtualizacao}`
        );

        fs.writeFileSync(roadmapPath, roadmapAtualizado, 'utf8');
        relatorio.push('ROADMAP.md atualizado com nova data.');
    }

    // Atualizar documentação em docs/
    const docsDir = path.join(raiz, 'docs');
    if (fs.existsSync(docsDir)) {
        const arquivos = fs.readdirSync(docsDir);
        for (const arquivo of arquivos) {
            if (arquivo.endsWith('.md')) {
                const docPath = path.join(docsDir, arquivo);
                const conteudo = fs.readFileSync(docPath, 'utf8');
                const dataAtualizacao = new Date().toISOString().split('T')[0];

                // Atualizar data de última atualização
                const conteudoAtualizado = conteudo.replace(
                    /Última atualização:.*/,
                    `Última atualização: ${dataAtualizacao}`
                );

                fs.writeFileSync(docPath, conteudoAtualizado, 'utf8');
                relatorio.push(`${arquivo} atualizado com nova data.`);
            }
        }
    }
}

// Nova função para atualizar GitHub
function atualizarGitHub() {
    relatorio.push('\nAtualizando GitHub...');

    try {
        // Verificar status do git
        execSync('git status', { stdio: 'inherit' });

        // Adicionar todas as alterações
        execSync('git add .', { stdio: 'inherit' });

        // Commit com mensagem descritiva
        const data = new Date().toISOString().split('T')[0];
        execSync(`git commit -m "chore: atualização automática ${data}"`, { stdio: 'inherit' });

        // Push para o repositório remoto
        execSync('git push', { stdio: 'inherit' });

        relatorio.push('GitHub atualizado com sucesso.');
    } catch (e) {
        relatorio.push(`Erro ao atualizar GitHub: ${e.message}`);
        throw e;
    }
}

// 5. Execução principal
function main() {
    try {
        backupProjeto();
        organizarEstrutura();
        atualizarIgnores();

        // Verificar referências cruzadas
        relatorio.push('\nVerificando referências cruzadas...');
        verificarReferenciasCruzadas();

        // Verificar duplicados
        relatorio.push('\nVerificando arquivos duplicados...');
        const duplicados = verificarDuplicados();

        // Resumo de duplicados
        const totalDuplicados = Object.values(duplicados).reduce(
            (acc, curr) => acc + curr.length,
            0
        );
        relatorio.push(`\nTotal de arquivos duplicados encontrados: ${totalDuplicados}`);

        if (totalDuplicados > 0) {
            relatorio.push('\nResumo por tipo:');
            for (const [tipo, lista] of Object.entries(duplicados)) {
                if (lista.length > 0) {
                    relatorio.push(`- ${tipo}: ${lista.length} arquivos`);
                }
            }
        }

        if (!validarProjeto()) {
            restaurarBackup();
            relatorio.push(
                'Backup restaurado devido a erro. Nenhuma alteração permanente foi feita.'
            );
        } else {
            // Atualizar documentação
            atualizarDocumentacao();

            // Atualizar GitHub
            atualizarGitHub();

            limparBackup();
            relatorio.push('Organização concluída com sucesso.');
        }

        // Salvar relatório
        fs.writeFileSync('relatorio-organizacao.txt', relatorio.join('\n'), 'utf8');
        console.log('Relatório salvo em relatorio-organizacao.txt');
    } catch (e) {
        console.error('Erro:', e);
        restaurarBackup();
    }
}

main();
