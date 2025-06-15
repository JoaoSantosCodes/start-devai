import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export interface SmartProfile {
    name: string;
    description: string;
    extensions: string[];
    settings: { [key: string]: any };
    filePatterns: string[];
    dependencies: string[];
}

export class SmartProfileManager {
    private readonly profiles: Map<string, SmartProfile> = new Map();
    private readonly output: vscode.OutputChannel;

    constructor() {
        this.output = vscode.window.createOutputChannel('DevAI: Smart Profiles');
        this.initializeDefaultProfiles();
    }

    private initializeDefaultProfiles() {
        // Perfil Web
        this.profiles.set('web', {
            name: 'Desenvolvimento Web',
            description:
                'Perfil para desenvolvimento web com React, TypeScript e ferramentas modernas',
            extensions: [
                'dbaeumer.vscode-eslint',
                'esbenp.prettier-vscode',
                'ms-vscode.vscode-typescript-next',
                'dsznajder.es7-react-js-snippets',
                'formulahendry.auto-rename-tag',
                'christian-kohler.path-intellisense',
                'bradlc.vscode-tailwindcss',
                'ms-vscode.vscode-typescript-tslint-plugin',
            ],
            settings: {
                'editor.formatOnSave': true,
                'editor.defaultFormatter': 'esbenp.prettier-vscode',
                'editor.codeActionsOnSave': {
                    'source.fixAll.eslint': true,
                },
            },
            filePatterns: ['*.tsx', '*.jsx', '*.ts', '*.js', '*.html', '*.css', '*.scss'],
            dependencies: ['react', 'typescript', 'tailwindcss'],
        });

        // Perfil Python
        this.profiles.set('python', {
            name: 'Desenvolvimento Python',
            description: 'Perfil para desenvolvimento Python com ferramentas de análise e testes',
            extensions: [
                'ms-python.python',
                'ms-python.vscode-pylance',
                'ms-python.black-formatter',
                'ms-python.pylint',
                'njpwerner.autodocstring',
                'kevinrose.vsc-python-indent',
                'ms-python.debugpy',
            ],
            settings: {
                'python.formatting.provider': 'black',
                'python.linting.enabled': true,
                'python.linting.pylintEnabled': true,
            },
            filePatterns: ['*.py', '*.pyi', '*.pyx', '*.pyd'],
            dependencies: ['pytest', 'black', 'pylint'],
        });

        // Perfil TypeScript
        this.profiles.set('typescript', {
            name: 'Desenvolvimento TypeScript',
            description: 'Perfil para desenvolvimento TypeScript com ferramentas de qualidade',
            extensions: [
                'dbaeumer.vscode-eslint',
                'esbenp.prettier-vscode',
                'ms-vscode.vscode-typescript-next',
                'ms-vscode.vscode-typescript-tslint-plugin',
                'streetsidesoftware.code-spell-checker',
                'eamodio.gitlens',
            ],
            settings: {
                'typescript.updateImportsOnFileMove.enabled': 'always',
                'typescript.suggest.completeFunctionCalls': true,
                'typescript.preferences.importModuleSpecifier': 'relative',
            },
            filePatterns: ['*.ts', '*.tsx'],
            dependencies: ['typescript', '@types/node'],
        });
    }

    async detectProjectType(): Promise<string | null> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) return null;

        const rootPath = workspaceFolders[0].uri.fsPath;
        const files = await vscode.workspace.findFiles('**/*');

        // Contar arquivos por tipo
        const fileCounts = new Map<string, number>();
        files.forEach((file) => {
            const ext = path.extname(file.fsPath);
            fileCounts.set(ext, (fileCounts.get(ext) || 0) + 1);
        });

        // Verificar package.json
        const packageJsonPath = path.join(rootPath, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            const dependencies = {
                ...packageJson.dependencies,
                ...packageJson.devDependencies,
            };

            // Detectar tipo de projeto
            if (dependencies['react'] || dependencies['next']) {
                return 'web';
            } else if (dependencies['typescript']) {
                return 'typescript';
            }
        }

        // Verificar arquivos Python
        if (fileCounts.get('.py') || fileCounts.get('.pyi')) {
            return 'python';
        }

        return null;
    }

    async suggestProfile(): Promise<SmartProfile | null> {
        const projectType = await this.detectProjectType();
        if (!projectType) return null;

        return this.profiles.get(projectType) || null;
    }

    async applyProfile(profileName: string) {
        const profile = this.profiles.get(profileName);
        if (!profile) {
            throw new Error(`Perfil ${profileName} não encontrado`);
        }

        this.output.show();
        this.output.appendLine(`Aplicando perfil: ${profile.name}`);

        // Aplicar extensões
        for (const ext of profile.extensions) {
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

        // Aplicar configurações
        for (const [key, value] of Object.entries(profile.settings)) {
            try {
                await vscode.workspace.getConfiguration().update(key, value, true);
                this.output.appendLine(`✅ Configurado: ${key}`);
            } catch (error) {
                this.output.appendLine(
                    `❌ Erro ao configurar ${key}: ${
                        error instanceof Error ? error.message : 'Erro desconhecido'
                    }`
                );
            }
        }

        // Verificar dependências
        const packageJsonPath = path.join(vscode.workspace.rootPath || '', 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            const missingDeps = profile.dependencies.filter(
                (dep) => !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
            );

            if (missingDeps.length > 0) {
                this.output.appendLine('\n⚠️ Dependências faltando:');
                missingDeps.forEach((dep) => {
                    this.output.appendLine(`  - ${dep}`);
                });
            }
        }

        this.output.appendLine('\n✅ Perfil aplicado com sucesso!');
    }

    getAvailableProfiles(): SmartProfile[] {
        return Array.from(this.profiles.values());
    }

    async createProfile(profile: SmartProfile): Promise<void> {
        this.profiles.set(profile.name.toLowerCase(), profile);
        await this.saveProfiles();
    }

    async deleteProfile(profileName: string): Promise<void> {
        this.profiles.delete(profileName.toLowerCase());
        await this.saveProfiles();
    }

    private async saveProfiles(): Promise<void> {
        const config = vscode.workspace.getConfiguration('devai');
        await config.update('profiles', Object.fromEntries(this.profiles), true);
    }
}
