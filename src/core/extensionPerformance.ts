import * as vscode from 'vscode';
import { execSync } from 'child_process';

export interface ExtensionPerformance {
    id: string;
    name: string;
    activationTime: number;
    memoryUsage: number;
    cpuUsage: number;
    isActive: boolean;
}

export class ExtensionPerformanceAnalyzer {
    private performanceData: Map<string, ExtensionPerformance> = new Map();
    private readonly output: vscode.OutputChannel;

    constructor() {
        this.output = vscode.window.createOutputChannel('DevAI: Performance');
    }

    async analyzePerformance() {
        this.output.clear();
        this.output.show();
        this.output.appendLine('🔍 Analisando desempenho das extensões...');

        try {
            // Obter lista de extensões
            const extensions = vscode.extensions.all;

            // Analisar cada extensão
            for (const ext of extensions) {
                const performance: ExtensionPerformance = {
                    id: ext.id,
                    name: ext.packageJSON.displayName || ext.id,
                    activationTime: 0,
                    memoryUsage: 0,
                    cpuUsage: 0,
                    isActive: ext.isActive,
                };

                // Medir tempo de ativação
                if (ext.isActive) {
                    const startTime = Date.now();
                    await ext.activate();
                    performance.activationTime = Date.now() - startTime;
                }

                // Obter uso de memória e CPU
                try {
                    const stats = this.getProcessStats(ext.id);
                    performance.memoryUsage = stats.memory;
                    performance.cpuUsage = stats.cpu;
                } catch (error) {
                    console.error(`Erro ao obter estatísticas para ${ext.id}:`, error);
                }

                this.performanceData.set(ext.id, performance);
            }

            // Gerar relatório
            this.generateReport();
        } catch (error) {
            this.output.appendLine(
                `❌ Erro na análise: ${
                    error instanceof Error ? error.message : 'Erro desconhecido'
                }`
            );
        }
    }

    private getProcessStats(_extensionId: string): { memory: number; cpu: number } {
        try {
            // No Windows, usar tasklist
            if (process.platform === 'win32') {
                const output = execSync(
                    'tasklist /FI "IMAGENAME eq Code.exe" /FO CSV /NH'
                ).toString();
                const stats = output.split(',');
                return {
                    memory: parseInt(stats[4].replace(/[^0-9]/g, '')) * 1024, // Converter KB para bytes
                    cpu: 0, // Não disponível no Windows
                };
            }
            // No Linux/Mac, usar ps
            else {
                const output = execSync(`ps -p ${process.pid} -o %mem,%cpu`).toString();
                const stats = output.split('\n')[1].trim().split(/\s+/);
                return {
                    memory: parseFloat(stats[0]),
                    cpu: parseFloat(stats[1]),
                };
            }
        } catch (error) {
            console.error('Erro ao obter estatísticas do processo:', error);
            return { memory: 0, cpu: 0 };
        }
    }

    private generateReport() {
        this.output.appendLine('\n📊 Relatório de Desempenho\n');

        // Ordenar por uso de memória
        const sortedByMemory = Array.from(this.performanceData.values()).sort(
            (a, b) => b.memoryUsage - a.memoryUsage
        );

        // Mostrar top 5 extensões que mais consomem memória
        this.output.appendLine('🔝 Top 5 Extensões (Uso de Memória):');
        sortedByMemory.slice(0, 5).forEach((ext, index) => {
            this.output.appendLine(`${index + 1}. ${ext.name}`);
            this.output.appendLine(`   Memória: ${(ext.memoryUsage / 1024 / 1024).toFixed(2)} MB`);
            this.output.appendLine(`   CPU: ${ext.cpuUsage.toFixed(1)}%`);
            this.output.appendLine(`   Tempo de Ativação: ${ext.activationTime}ms`);
            this.output.appendLine('');
        });

        // Mostrar extensões inativas
        const inactiveExtensions = Array.from(this.performanceData.values()).filter(
            (ext) => !ext.isActive
        );

        if (inactiveExtensions.length > 0) {
            this.output.appendLine('⚠️ Extensões Inativas:');
            inactiveExtensions.forEach((ext) => {
                this.output.appendLine(`- ${ext.name}`);
            });
        }

        // Sugestões de otimização
        this.output.appendLine('\n💡 Sugestões de Otimização:');
        const highMemoryExtensions = sortedByMemory.filter(
            (ext) => ext.memoryUsage > 100 * 1024 * 1024
        ); // > 100MB
        if (highMemoryExtensions.length > 0) {
            this.output.appendLine(
                'Considere desativar ou remover as seguintes extensões que consomem muita memória:'
            );
            highMemoryExtensions.forEach((ext) => {
                this.output.appendLine(
                    `- ${ext.name} (${(ext.memoryUsage / 1024 / 1024).toFixed(2)} MB)`
                );
            });
        }

        // Mostrar resumo
        const totalMemory = Array.from(this.performanceData.values()).reduce(
            (sum, ext) => sum + ext.memoryUsage,
            0
        );
        const totalExtensions = this.performanceData.size;

        this.output.appendLine('\n📈 Resumo:');
        this.output.appendLine(`Total de Extensões: ${totalExtensions}`);
        this.output.appendLine(
            `Uso Total de Memória: ${(totalMemory / 1024 / 1024).toFixed(2)} MB`
        );
        this.output.appendLine(
            `Média de Memória por Extensão: ${(totalMemory / totalExtensions / 1024 / 1024).toFixed(
                2
            )} MB`
        );
    }

    getPerformanceData(): ExtensionPerformance[] {
        return Array.from(this.performanceData.values());
    }
}
