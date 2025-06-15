import * as vscode from 'vscode';
import { AIManager } from './aiManager';
import { DevAIPanel } from './aiPanel';
import { Logger } from './logger';

export function activate(context: vscode.ExtensionContext) {
    Logger.initialize(context);
    const aiManager = new AIManager();
    
    context.subscriptions.push(
        vscode.commands.registerCommand('devai.openPanel', () => {
            DevAIPanel.createOrShow(context, aiManager);
        })
    );
}

export function deactivate() {
    // Cleanup code here
}