import * as vscode from 'vscode';
import { AIPanel } from './ui/aiPanel';
import { SetupManager } from './core/setup_manager';
import { Logger } from './utils/logger';

let aiPanel: AIPanel;
let setupManager: SetupManager;
let logger: Logger;

export async function activate(context: vscode.ExtensionContext) {
    logger = new Logger();
    setupManager = new SetupManager(logger);
    aiPanel = new AIPanel(context);

    // Registrar comandos
    let startCommand = vscode.commands.registerCommand('devai-assistant.start', async () => {
        try {
            await setupManager.start();
            aiPanel.createOrShow();
            vscode.window.showInformationMessage('DevAI Assistant started successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to start DevAI Assistant: ${error}`);
        }
    });

    let stopCommand = vscode.commands.registerCommand('devai-assistant.stop', async () => {
        try {
            await setupManager.stop();
            vscode.window.showInformationMessage('DevAI Assistant stopped successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to stop DevAI Assistant: ${error}`);
        }
    });

    let configureCommand = vscode.commands.registerCommand(
        'devai-assistant.configure',
        async () => {
            try {
                await setupManager.configure();
                vscode.window.showInformationMessage('DevAI Assistant configured successfully!');
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to configure DevAI Assistant: ${error}`);
            }
        }
    );

    let togglePanelCommand = vscode.commands.registerCommand('devai-assistant.togglePanel', () => {
        aiPanel.createOrShow();
    });

    // Adicionar comandos ao contexto
    context.subscriptions.push(startCommand, stopCommand, configureCommand, togglePanelCommand);

    // Iniciar automaticamente se configurado
    const config = vscode.workspace.getConfiguration('devai-assistant');
    if (config.get('autoStart')) {
        try {
            await setupManager.start();
            aiPanel.createOrShow();
        } catch (error) {
            logger.error('Failed to auto-start DevAI Assistant:', error);
        }
    }

    // Mostrar mensagem de boas-vindas
    vscode.window.showInformationMessage(
        'DevAI Assistant is ready! Use the status bar icon or press Ctrl+Shift+P and type "DevAI" to get started.'
    );
}

export function deactivate() {
    if (setupManager) {
        setupManager.stop().catch((error) => {
            logger.error('Error during deactivation:', error);
        });
    }
    if (aiPanel) {
        aiPanel.dispose();
    }
}
