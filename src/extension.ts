import * as vscode from 'vscode';
import { SmartProfileManager } from './core/smartProfiles';
import { PerformanceAnalyzer } from './core/performanceAnalyzer';
import { ExtensionOrganizer } from './core/extensionOrganizer';

export async function activate(context: vscode.ExtensionContext) {
    const smartProfiles = new SmartProfileManager();
    const performanceAnalyzer = new PerformanceAnalyzer();
    const extensionOrganizer = new ExtensionOrganizer();

    // Comando para validar extensões
    let validateCommand = vscode.commands.registerCommand('devai.validateExtensions', async () => {
        const projectType = await smartProfiles.detectProjectType();
        if (!projectType) {
            vscode.window.showWarningMessage('Não foi possível detectar o tipo de projeto.');
            return;
        }

        const suggestedProfile = await smartProfiles.suggestProfile();
        if (!suggestedProfile) {
            vscode.window.showWarningMessage('Nenhum perfil sugerido para este projeto.');
            return;
        }

        const action = await vscode.window.showInformationMessage(
            `Perfil sugerido: ${suggestedProfile.name}\n${suggestedProfile.description}`,
            'Aplicar Perfil',
            'Ver Detalhes',
            'Ignorar'
        );

        if (action === 'Aplicar Perfil') {
            await smartProfiles.applyProfile(projectType);
        } else if (action === 'Ver Detalhes') {
            const details = [
                '📦 Extensões Recomendadas:',
                ...suggestedProfile.extensions.map((ext) => `  - ${ext}`),
                '\n⚙️ Configurações:',
                ...Object.entries(suggestedProfile.settings).map(
                    ([key, value]) => `  - ${key}: ${JSON.stringify(value)}`
                ),
                '\n📁 Padrões de Arquivo:',
                ...suggestedProfile.filePatterns.map((pattern) => `  - ${pattern}`),
                '\n📚 Dependências:',
                ...suggestedProfile.dependencies.map((dep) => `  - ${dep}`),
            ].join('\n');

            const doc = await vscode.workspace.openTextDocument({
                content: details,
                language: 'markdown',
            });
            await vscode.window.showTextDocument(doc);
        }
    });

    // Comando para análise de desempenho
    let analyzeCommand = vscode.commands.registerCommand('devai.analyzePerformance', async () => {
        await performanceAnalyzer.analyze();
        const report = performanceAnalyzer.generateReport();
        const suggestions = performanceAnalyzer.getOptimizationSuggestions();

        const doc = await vscode.workspace.openTextDocument({
            content: report + '\n\n' + suggestions.join('\n'),
            language: 'markdown',
        });
        await vscode.window.showTextDocument(doc);

        if (suggestions.length > 0) {
            const action = await vscode.window.showWarningMessage(
                'Foram encontradas sugestões de otimização. Deseja ver mais detalhes?',
                'Ver Detalhes',
                'Ignorar'
            );

            if (action === 'Ver Detalhes') {
                const detailsDoc = await vscode.workspace.openTextDocument({
                    content: suggestions.join('\n'),
                    language: 'markdown',
                });
                await vscode.window.showTextDocument(detailsDoc);
            }
        }
    });

    // Comando para criar perfil
    let createProfileCommand = vscode.commands.registerCommand('devai.createProfile', async () => {
        const name = await vscode.window.showInputBox({
            prompt: 'Nome do perfil',
            placeHolder: 'Ex: Desenvolvimento Web',
        });

        if (!name) return;

        const description = await vscode.window.showInputBox({
            prompt: 'Descrição do perfil',
            placeHolder: 'Ex: Perfil para desenvolvimento web com React e TypeScript',
        });

        if (!description) return;

        const currentExtensions = vscode.extensions.all.map((ext) => ext.id);
        const selectedExtensions = await vscode.window.showQuickPick(currentExtensions, {
            canPickMany: true,
            placeHolder: 'Selecione as extensões para o perfil',
        });

        if (!selectedExtensions) return;

        // Salvar perfil
        await smartProfiles.createProfile({
            name,
            description,
            extensions: selectedExtensions,
            settings: vscode.workspace.getConfiguration().get('editor') || {},
            filePatterns: ['**/*'],
            dependencies: [],
        });

        vscode.window.showInformationMessage(`Perfil "${name}" criado com sucesso!`);
    });

    // Comando para aplicar perfil
    let applyProfileCommand = vscode.commands.registerCommand('devai.applyProfile', async () => {
        const profiles = smartProfiles.getAvailableProfiles();
        const selectedProfile = await vscode.window.showQuickPick(
            profiles.map((p) => p.name),
            { placeHolder: 'Selecione o perfil para aplicar' }
        );

        if (!selectedProfile) return;

        const profile = profiles.find((p) => p.name === selectedProfile);
        if (!profile) return;

        await smartProfiles.applyProfile(profile.name);
    });

    // Comando para excluir perfil
    let deleteProfileCommand = vscode.commands.registerCommand('devai.deleteProfile', async () => {
        const profiles = smartProfiles.getAvailableProfiles();
        const selectedProfile = await vscode.window.showQuickPick(
            profiles.map((p) => p.name),
            { placeHolder: 'Selecione o perfil para excluir' }
        );

        if (!selectedProfile) return;

        const confirm = await vscode.window.showWarningMessage(
            `Tem certeza que deseja excluir o perfil "${selectedProfile}"?`,
            'Sim',
            'Não'
        );

        if (confirm === 'Sim') {
            await smartProfiles.deleteProfile(selectedProfile);
            vscode.window.showInformationMessage(
                `Perfil "${selectedProfile}" excluído com sucesso!`
            );
        }
    });

    // Comando para organizar extensões
    let organizeCommand = vscode.commands.registerCommand('devai.organizeExtensions', async () => {
        await extensionOrganizer.organizeExtensions();
    });

    // Comando para gerenciar grupos de extensões
    let manageGroupsCommand = vscode.commands.registerCommand(
        'devai.manageExtensionGroups',
        async () => {
            const groups = extensionOrganizer.getGroups();
            const selectedGroup = await vscode.window.showQuickPick(
                groups.map((g) => g.name),
                { placeHolder: 'Selecione o grupo para gerenciar' }
            );

            if (!selectedGroup) return;

            const group = groups.find((g) => g.name === selectedGroup);
            if (!group) return;

            const action = await vscode.window.showQuickPick(
                ['Ativar/Desativar Grupo', 'Ver Detalhes'],
                { placeHolder: 'Selecione uma ação' }
            );

            if (action === 'Ativar/Desativar Grupo') {
                await extensionOrganizer.toggleGroup(group.name.toLowerCase());
            } else if (action === 'Ver Detalhes') {
                const details = [
                    `📦 Grupo: ${group.name}`,
                    `📝 Descrição: ${group.description}`,
                    '\n🔌 Extensões:',
                    ...group.extensions.map((ext) => `  - ${ext}`),
                    `\n✅ Status: ${group.enabled ? 'Ativado' : 'Desativado'}`,
                ].join('\n');

                const doc = await vscode.workspace.openTextDocument({
                    content: details,
                    language: 'markdown',
                });
                await vscode.window.showTextDocument(doc);
            }
        }
    );

    context.subscriptions.push(
        validateCommand,
        analyzeCommand,
        createProfileCommand,
        applyProfileCommand,
        deleteProfileCommand,
        organizeCommand,
        manageGroupsCommand
    );
}

export function deactivate() {}
