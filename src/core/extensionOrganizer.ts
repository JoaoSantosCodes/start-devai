import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

interface ExtensionGroup {
    name: string;
    description: string;
    extensions: string[];
    enabled: boolean;
}

interface ExtensionStats {
    id: string;
    name: string;
    lastUsed: number;
    usageCount: number;
    category: string;
}

export class ExtensionOrganizer {
    private readonly output: vscode.OutputChannel;
    private groups: Map<string, ExtensionGroup> = new Map();
    private stats: Map<string, ExtensionStats> = new Map();
    private readonly statsFile: string;

    constructor() {
        this.output = vscode.window.createOutputChannel('DevAI: Extension Organizer');
        this.statsFile = path.join(
            vscode.workspace.rootPath || '',
            '.vscode',
            'extension-stats.json'
        );
        this.initializeGroups();
        this.loadStats();
    }

    private initializeGroups() {
        // Grupo de Linguagens
        this.groups.set('languages', {
            name: 'Linguagens',
            description: 'Extensões para suporte a linguagens de programação',
            extensions: [
                'ms-python.python',
                'ms-vscode.vscode-typescript-next',
                'ms-dotnettools.csharp',
                'golang.go',
                'rust-lang.rust-analyzer',
                'redhat.java',
                'ms-azuretools.vscode-docker',
            ],
            enabled: true,
        });

        // Grupo de Formatação
        this.groups.set('formatting', {
            name: 'Formatação',
            description: 'Extensões para formatação e linting de código',
            extensions: [
                'esbenp.prettier-vscode',
                'dbaeumer.vscode-eslint',
                'ms-python.black-formatter',
                'ms-python.pylint',
                'ms-vscode.vscode-typescript-tslint-plugin',
            ],
            enabled: true,
        });

        // Grupo de Git
        this.groups.set('git', {
            name: 'Git',
            description: 'Extensões para integração com Git',
            extensions: [
                'eamodio.gitlens',
                'mhutchie.git-graph',
                'donjayamanne.githistory',
                'codezombiech.gitignore',
            ],
            enabled: true,
        });

        // Grupo de Temas
        this.groups.set('themes', {
            name: 'Temas',
            description: 'Extensões de temas e ícones',
            extensions: [
                'vscode-icons-team.vscode-icons',
                'PKief.material-icon-theme',
                'zhuangtongfa.material-theme',
                'dracula-theme.theme-dracula',
            ],
            enabled: true,
        });

        // Grupo de Produtividade
        this.groups.set('productivity', {
            name: 'Produtividade',
            description: 'Extensões para aumentar a produtividade',
            extensions: [
                'formulahendry.auto-rename-tag',
                'christian-kohler.path-intellisense',
                'streetsidesoftware.code-spell-checker',
                'aaron-bond.better-comments',
                'naumovs.color-highlight',
            ],
            enabled: true,
        });
    }

    private loadStats() {
        try {
            if (fs.existsSync(this.statsFile)) {
                const data = JSON.parse(fs.readFileSync(this.statsFile, 'utf-8'));
                this.stats = new Map(Object.entries(data));
            }
        } catch (error) {
            this.output.appendLine(
                `⚠️ Erro ao carregar estatísticas: ${
                    error instanceof Error ? error.message : 'Erro desconhecido'
                }`
            );
        }
    }

    private saveStats() {
        try {
            const dir = path.dirname(this.statsFile);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(
                this.statsFile,
                JSON.stringify(Object.fromEntries(this.stats), null, 2)
            );
        } catch (error) {
            this.output.appendLine(
                `⚠️ Erro ao salvar estatísticas: ${
                    error instanceof Error ? error.message : 'Erro desconhecido'
                }`
            );
        }
    }

    async organizeExtensions() {
        this.output.show();
        this.output.appendLine('Iniciando organização de extensões...\n');

        const installedExtensions = vscode.extensions.all;
        const unusedExtensions: string[] = [];
        const recommendedExtensions: string[] = [];

        // Analisar extensões instaladas
        for (const ext of installedExtensions) {
            const stats = this.stats.get(ext.id) || {
                id: ext.id,
                name: ext.packageJSON.displayName || ext.id,
                lastUsed: 0,
                usageCount: 0,
                category: 'unknown',
            };

            // Verificar se a extensão está em algum grupo
            let found = false;
            for (const [, group] of this.groups) {
                if (group.extensions.includes(ext.id)) {
                    stats.category = group.name.toLowerCase();
                    found = true;
                    break;
                }
            }

            if (!found) {
                unusedExtensions.push(ext.id);
            }

            this.stats.set(ext.id, stats);
        }

        // Verificar extensões recomendadas
        for (const [, group] of this.groups) {
            if (group.enabled) {
                for (const ext of group.extensions) {
                    if (!installedExtensions.find((e) => e.id === ext)) {
                        recommendedExtensions.push(ext);
                    }
                }
            }
        }

        // Gerar relatório
        const report = [
            '📊 Relatório de Organização de Extensões\n',
            '📦 Extensões Instaladas:',
            ...Array.from(this.stats.values())
                .sort((a, b) => b.usageCount - a.usageCount)
                .map((stat) => `  - ${stat.name} (${stat.category})`),
            '\n⚠️ Extensões Não Utilizadas:',
            ...unusedExtensions.map((id) => `  - ${id}`),
            '\n✨ Extensões Recomendadas:',
            ...recommendedExtensions.map((id) => `  - ${id}`),
        ].join('\n');

        // Mostrar relatório
        const doc = await vscode.workspace.openTextDocument({
            content: report,
            language: 'markdown',
        });
        await vscode.window.showTextDocument(doc);

        // Salvar estatísticas
        this.saveStats();

        // Oferecer ações
        if (unusedExtensions.length > 0 || recommendedExtensions.length > 0) {
            const action = await vscode.window.showInformationMessage(
                'Deseja realizar alguma ação?',
                'Desativar Extensões Não Utilizadas',
                'Instalar Extensões Recomendadas',
                'Ignorar'
            );

            if (action === 'Desativar Extensões Não Utilizadas') {
                await this.disableExtensions(unusedExtensions);
            } else if (action === 'Instalar Extensões Recomendadas') {
                await this.installExtensions(recommendedExtensions);
            }
        }
    }

    private async disableExtensions(extensions: string[]) {
        for (const ext of extensions) {
            try {
                await vscode.commands.executeCommand('workbench.extensions.disableExtension', ext);
                this.output.appendLine(`✅ Desativada: ${ext}`);
            } catch (error) {
                this.output.appendLine(
                    `❌ Erro ao desativar ${ext}: ${
                        error instanceof Error ? error.message : 'Erro desconhecido'
                    }`
                );
            }
        }
    }

    private async installExtensions(extensions: string[]) {
        for (const ext of extensions) {
            try {
                await vscode.commands.executeCommand('workbench.extensions.installExtension', ext);
                this.output.appendLine(`✅ Instalada: ${ext}`);
            } catch (error) {
                this.output.appendLine(
                    `❌ Erro ao instalar ${ext}: ${
                        error instanceof Error ? error.message : 'Erro desconhecido'
                    }`
                );
            }
        }
    }

    async toggleGroup(groupName: string) {
        const group = this.groups.get(groupName);
        if (!group) return;

        group.enabled = !group.enabled;
        const action = group.enabled ? 'ativar' : 'desativar';

        if (group.enabled) {
            await this.installExtensions(group.extensions);
        } else {
            await this.disableExtensions(group.extensions);
        }

        vscode.window.showInformationMessage(`Grupo "${group.name}" ${action}do com sucesso!`);
    }

    getGroups(): ExtensionGroup[] {
        return Array.from(this.groups.values());
    }

    getStats(): ExtensionStats[] {
        return Array.from(this.stats.values());
    }
}
