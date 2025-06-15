import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

export async function validateExtensions() {
    const output = vscode.window.createOutputChannel('DevAI: Extensões');
    output.show();

    try {
        // Listar extensões instaladas
        output.appendLine('🔍 Analisando extensões instaladas...');
        const extensoesInstaladas = execSync('code --list-extensions', { encoding: 'utf-8' });
        const listaExtensoes = extensoesInstaladas.split('\n').filter(Boolean);

        // Extensões necessárias
        const extensoesNecessarias = [
            'dbaeumer.vscode-eslint', // ESLint
            'esbenp.prettier-vscode', // Prettier
            'ms-vscode.vscode-typescript-tslint-plugin', // TypeScript
            'vscode-icons-team.vscode-icons', // Ícones
        ];

        // Extensões recomendadas
        const extensoesRecomendadas = [
            'ms-vscode.test-adapter-converter', // Testes
            'hbenl.vscode-test-explorer', // Explorador de testes
            'ms-vscode.vscode-typescript-next', // TypeScript Next
        ];

        // Analisar dependências
        output.appendLine('\n📦 Analisando dependências do projeto...');
        const packageJson = JSON.parse(
            fs.readFileSync(path.join(vscode.workspace.rootPath || '', 'package.json'), 'utf-8')
        );

        // Mostrar dependências
        output.appendLine('\nDependências de desenvolvimento:');
        Object.keys(packageJson.devDependencies || {}).forEach((dep) => {
            output.appendLine(`  - ${dep}`);
        });

        output.appendLine('\nDependências de produção:');
        Object.keys(packageJson.dependencies || {}).forEach((dep) => {
            output.appendLine(`  - ${dep}`);
        });

        // Verificar extensões necessárias
        output.appendLine('\n✅ Extensões necessárias:');
        const extensoesFaltantes: string[] = [];
        extensoesNecessarias.forEach((ext) => {
            if (listaExtensoes.includes(ext)) {
                output.appendLine(`  ✓ ${ext}`);
            } else {
                output.appendLine(`  ✗ ${ext}`);
                extensoesFaltantes.push(ext);
            }
        });

        // Verificar extensões recomendadas
        output.appendLine('\n💡 Extensões recomendadas:');
        extensoesRecomendadas.forEach((ext) => {
            if (listaExtensoes.includes(ext)) {
                output.appendLine(`  ✓ ${ext}`);
            } else {
                output.appendLine(`  ⚠ ${ext} (opcional)`);
            }
        });

        // Identificar extensões desnecessárias
        output.appendLine('\n⚠️ Extensões potencialmente desnecessárias:');
        const extensoesDesnecessarias = listaExtensoes.filter(
            (ext) => !extensoesNecessarias.includes(ext) && !extensoesRecomendadas.includes(ext)
        );

        if (extensoesDesnecessarias.length > 0) {
            extensoesDesnecessarias.forEach((ext) => {
                output.appendLine(`  - ${ext}`);
            });
        } else {
            output.appendLine('  Nenhuma extensão desnecessária encontrada.');
        }

        // Gerar comandos para ajustar
        output.appendLine('\n🔧 Ações disponíveis:');

        // Criar botões de ação
        const botoes = [];

        if (extensoesFaltantes.length > 0) {
            botoes.push('Instalar Extensões Necessárias');
        }

        if (extensoesDesnecessarias.length > 0) {
            botoes.push('Remover Extensões Desnecessárias');
        }

        botoes.push('Abrir Gerenciador de Extensões');

        // Mostrar botões e aguardar escolha
        const escolha = await vscode.window.showQuickPick(botoes, {
            placeHolder: 'Escolha uma ação',
        });

        if (escolha) {
            switch (escolha) {
                case 'Instalar Extensões Necessárias':
                    // Instalar extensões necessárias
                    for (const ext of extensoesFaltantes) {
                        try {
                            execSync(`code --install-extension ${ext}`);
                            output.appendLine(`✅ Instalada: ${ext}`);
                        } catch (error: unknown) {
                            const errorMessage =
                                error instanceof Error ? error.message : 'Erro desconhecido';
                            output.appendLine(`❌ Erro ao instalar ${ext}: ${errorMessage}`);
                        }
                    }
                    vscode.window.showInformationMessage('Extensões necessárias instaladas!');
                    break;

                case 'Remover Extensões Desnecessárias':
                    // Confirmar remoção
                    const confirmar = await vscode.window.showWarningMessage(
                        `Deseja remover ${extensoesDesnecessarias.length} extensões desnecessárias?`,
                        'Sim',
                        'Não'
                    );

                    if (confirmar === 'Sim') {
                        for (const ext of extensoesDesnecessarias) {
                            try {
                                execSync(`code --uninstall-extension ${ext}`);
                                output.appendLine(`✅ Removida: ${ext}`);
                            } catch (error: unknown) {
                                const errorMessage =
                                    error instanceof Error ? error.message : 'Erro desconhecido';
                                output.appendLine(`❌ Erro ao remover ${ext}: ${errorMessage}`);
                            }
                        }
                        vscode.window.showInformationMessage('Extensões desnecessárias removidas!');
                    }
                    break;

                case 'Abrir Gerenciador de Extensões':
                    // Abrir gerenciador de extensões
                    vscode.commands.executeCommand(
                        'workbench.extensions.action.showInstalledExtensions'
                    );
                    break;
            }
        }

        // Mostrar resumo
        if (extensoesFaltantes.length > 0) {
            vscode.window
                .showWarningMessage(
                    'Algumas extensões necessárias estão faltando!',
                    'Ver Relatório'
                )
                .then((selection) => {
                    if (selection === 'Ver Relatório') {
                        output.show();
                    }
                });
        } else {
            vscode.window.showInformationMessage(
                'Todas as extensões necessárias estão instaladas!'
            );
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        output.appendLine(`\n❌ Erro: ${errorMessage}`);
        vscode.window.showErrorMessage(
            'Erro ao validar extensões. Verifique o output para mais detalhes.'
        );
    }
}
