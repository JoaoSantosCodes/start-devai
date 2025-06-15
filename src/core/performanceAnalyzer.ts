import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface PerformanceMetrics {
    memory: {
        total: number;
        used: number;
        free: number;
        vscode: number;
    };
    cpu: {
        usage: number;
        cores: number;
        load: number[];
    };
    extensions: {
        id: string;
        name: string;
        activationTime: number;
        memory: number;
        cpu: number;
    }[];
    startup: {
        totalTime: number;
        extensionsTime: number;
        workspaceTime: number;
    };
    workspace: {
        fileCount: number;
        totalSize: number;
        largestFiles: { path: string; size: number }[];
    };
}

export class PerformanceAnalyzer {
    private readonly output: vscode.OutputChannel;
    private metrics: PerformanceMetrics | null = null;

    constructor() {
        this.output = vscode.window.createOutputChannel('DevAI: Performance Analysis');
    }

    async analyze(): Promise<PerformanceMetrics> {
        this.output.show();
        this.output.appendLine('Iniciando análise de desempenho...\n');

        this.metrics = {
            memory: await this.getMemoryMetrics(),
            cpu: await this.getCPUMetrics(),
            extensions: await this.getExtensionMetrics(),
            startup: await this.getStartupMetrics(),
            workspace: await this.getWorkspaceMetrics(),
        };

        this.output.appendLine('✅ Análise concluída!\n');
        return this.metrics;
    }

    private async getMemoryMetrics(): Promise<PerformanceMetrics['memory']> {
        const total = os.totalmem();
        const free = os.freemem();
        const used = total - free;

        let vscodeMemory = 0;
        try {
            if (process.platform === 'win32') {
                const output = execSync(
                    'tasklist /FI "IMAGENAME eq Code.exe" /FO CSV /NH'
                ).toString();
                const stats = output.split(',');
                vscodeMemory = parseInt(stats[4].replace(/[^0-9]/g, '')) * 1024;
            } else {
                const output = execSync(`ps -p ${process.pid} -o %mem`).toString();
                const memPercent = parseFloat(output.split('\n')[1]);
                vscodeMemory = (memPercent / 100) * total;
            }
        } catch (error) {
            this.output.appendLine(
                `⚠️ Erro ao obter memória do VS Code: ${
                    error instanceof Error ? error.message : 'Erro desconhecido'
                }`
            );
        }

        return {
            total,
            used,
            free,
            vscode: vscodeMemory,
        };
    }

    private async getCPUMetrics(): Promise<PerformanceMetrics['cpu']> {
        const cores = os.cpus().length;
        const load = os.loadavg();

        let usage = 0;
        try {
            if (process.platform === 'win32') {
                const output = execSync('wmic cpu get loadpercentage').toString();
                usage = parseInt(output.split('\n')[1]);
            } else {
                const output = execSync('top -bn1 | grep "Cpu(s)"').toString();
                const match = output.match(/(\d+\.\d+) us/);
                usage = match ? parseFloat(match[1]) : 0;
            }
        } catch (error) {
            this.output.appendLine(
                `⚠️ Erro ao obter uso de CPU: ${
                    error instanceof Error ? error.message : 'Erro desconhecido'
                }`
            );
        }

        return {
            usage,
            cores,
            load,
        };
    }

    private async getExtensionMetrics(): Promise<PerformanceMetrics['extensions']> {
        const extensions = vscode.extensions.all;
        const metrics: PerformanceMetrics['extensions'] = [];

        for (const ext of extensions) {
            try {
                const packageJson = JSON.parse(
                    fs.readFileSync(ext.extensionPath + '/package.json', 'utf-8')
                );
                const activationTime = ext.isActive ? 0 : await this.measureActivationTime(ext);

                metrics.push({
                    id: ext.id,
                    name: packageJson.displayName || ext.id,
                    activationTime,
                    memory: 0, // Implementar medição de memória por extensão
                    cpu: 0, // Implementar medição de CPU por extensão
                });
            } catch (error) {
                this.output.appendLine(
                    `⚠️ Erro ao analisar extensão ${ext.id}: ${
                        error instanceof Error ? error.message : 'Erro desconhecido'
                    }`
                );
            }
        }

        return metrics;
    }

    private async measureActivationTime(extension: vscode.Extension<any>): Promise<number> {
        const start = Date.now();
        try {
            await extension.activate();
        } catch (error) {
            this.output.appendLine(
                `⚠️ Erro ao ativar extensão ${extension.id}: ${
                    error instanceof Error ? error.message : 'Erro desconhecido'
                }`
            );
        }
        return Date.now() - start;
    }

    private async getStartupMetrics(): Promise<PerformanceMetrics['startup']> {
        // Implementar medição de tempo de inicialização
        return {
            totalTime: 0,
            extensionsTime: 0,
            workspaceTime: 0,
        };
    }

    private async getWorkspaceMetrics(): Promise<PerformanceMetrics['workspace']> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            return {
                fileCount: 0,
                totalSize: 0,
                largestFiles: [],
            };
        }

        const files = await vscode.workspace.findFiles('**/*');
        const fileSizes = new Map<string, number>();

        for (const file of files) {
            try {
                const stats = fs.statSync(file.fsPath);
                fileSizes.set(file.fsPath, stats.size);
            } catch (error) {
                this.output.appendLine(
                    `⚠️ Erro ao obter tamanho do arquivo ${file.fsPath}: ${
                        error instanceof Error ? error.message : 'Erro desconhecido'
                    }`
                );
            }
        }

        const totalSize = Array.from(fileSizes.values()).reduce((a, b) => a + b, 0);
        const largestFiles = Array.from(fileSizes.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([path, size]) => ({ path, size }));

        return {
            fileCount: files.length,
            totalSize,
            largestFiles,
        };
    }

    generateReport(): string {
        if (!this.metrics) {
            return 'Nenhuma análise realizada ainda.';
        }

        const report: string[] = [];

        // Memória
        report.push('📊 Métricas de Memória:');
        report.push(`  Total: ${(this.metrics.memory.total / 1024 / 1024 / 1024).toFixed(2)} GB`);
        report.push(`  Usada: ${(this.metrics.memory.used / 1024 / 1024 / 1024).toFixed(2)} GB`);
        report.push(`  Livre: ${(this.metrics.memory.free / 1024 / 1024 / 1024).toFixed(2)} GB`);
        report.push(`  VS Code: ${(this.metrics.memory.vscode / 1024 / 1024).toFixed(2)} MB\n`);

        // CPU
        report.push('📊 Métricas de CPU:');
        report.push(`  Uso: ${this.metrics.cpu.usage.toFixed(1)}%`);
        report.push(`  Cores: ${this.metrics.cpu.cores}`);
        report.push(`  Load: ${this.metrics.cpu.load.map((l) => l.toFixed(2)).join(', ')}\n`);

        // Extensões
        report.push('📊 Métricas de Extensões:');
        const slowExtensions = this.metrics.extensions
            .filter((ext) => ext.activationTime > 1000)
            .sort((a, b) => b.activationTime - a.activationTime);

        if (slowExtensions.length > 0) {
            report.push('  Extensões Lentas:');
            slowExtensions.forEach((ext) => {
                report.push(`    - ${ext.name}: ${ext.activationTime}ms`);
            });
        }
        report.push('');

        // Workspace
        report.push('📊 Métricas do Workspace:');
        report.push(`  Total de Arquivos: ${this.metrics.workspace.fileCount}`);
        report.push(
            `  Tamanho Total: ${(this.metrics.workspace.totalSize / 1024 / 1024).toFixed(2)} MB`
        );

        if (this.metrics.workspace.largestFiles.length > 0) {
            report.push('  Maiores Arquivos:');
            this.metrics.workspace.largestFiles.forEach((file) => {
                report.push(
                    `    - ${path.basename(file.path)}: ${(file.size / 1024 / 1024).toFixed(2)} MB`
                );
            });
        }

        return report.join('\n');
    }

    getOptimizationSuggestions(): string[] {
        if (!this.metrics) {
            return ['Execute uma análise primeiro.'];
        }

        const suggestions: string[] = [];

        // Sugestões de memória
        if (this.metrics.memory.vscode > 1024 * 1024 * 1024) {
            // > 1GB
            suggestions.push('⚠️ O VS Code está usando mais de 1GB de memória. Considere:');
            suggestions.push('  - Desativar extensões não utilizadas');
            suggestions.push('  - Limpar o cache do VS Code');
            suggestions.push('  - Reiniciar o VS Code');
        }

        // Sugestões de CPU
        if (this.metrics.cpu.usage > 80) {
            suggestions.push('⚠️ Uso de CPU está alto. Considere:');
            suggestions.push('  - Fechar projetos não utilizados');
            suggestions.push('  - Desativar extensões pesadas');
            suggestions.push('  - Verificar processos em segundo plano');
        }

        // Sugestões de extensões
        const slowExtensions = this.metrics.extensions
            .filter((ext) => ext.activationTime > 1000)
            .sort((a, b) => b.activationTime - a.activationTime);

        if (slowExtensions.length > 0) {
            suggestions.push('⚠️ Algumas extensões estão lentas:');
            slowExtensions.slice(0, 3).forEach((ext) => {
                suggestions.push(`  - ${ext.name} (${ext.activationTime}ms)`);
            });
            suggestions.push('  Considere desativar ou substituir por alternativas mais leves.');
        }

        // Sugestões de workspace
        if (this.metrics.workspace.fileCount > 10000) {
            suggestions.push('⚠️ Workspace muito grande:');
            suggestions.push('  - Considere excluir arquivos desnecessários');
            suggestions.push('  - Use .gitignore para ignorar arquivos grandes');
            suggestions.push('  - Divida o projeto em workspaces menores');
        }

        return suggestions;
    }
}
