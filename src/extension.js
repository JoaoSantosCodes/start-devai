"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const aiPanel_1 = require("./ui/aiPanel");
const setup_manager_1 = require("./core/setup_manager");
const logger_1 = require("./core/logger");
let aiPanel;
let setupManager;
async function activate(context) {
    logger_1.Logger.initialize(context);
    setupManager = new setup_manager_1.SetupManager();
    aiPanel = new aiPanel_1.AIPanel(context);
    // Registrar comandos
    let startCommand = vscode.commands.registerCommand('devai-assistant.start', async () => {
        try {
            await setupManager.start();
            aiPanel.createOrShow();
            vscode.window.showInformationMessage('DevAI Assistant started successfully!');
        }
        catch (error) {
            logger_1.Logger.log('Failed to start DevAI Assistant: ' + error);
        }
    });
    let stopCommand = vscode.commands.registerCommand('devai-assistant.stop', async () => {
        try {
            await setupManager.stop();
            vscode.window.showInformationMessage('DevAI Assistant stopped successfully!');
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to stop DevAI Assistant: ${error}`);
        }
    });
    let configureCommand = vscode.commands.registerCommand('devai-assistant.configure', async () => {
        try {
            await setupManager.configure();
            vscode.window.showInformationMessage('DevAI Assistant configured successfully!');
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to configure DevAI Assistant: ${error}`);
        }
    });
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
        }
        catch (error) {
            logger_1.Logger.log('Failed to auto-start DevAI Assistant: ' + error);
        }
    }
    // Mostrar mensagem de boas-vindas
    vscode.window.showInformationMessage('DevAI Assistant is ready! Use the status bar icon or press Ctrl+Shift+P and type "DevAI" to get started.');
}
function deactivate() {
    if (setupManager) {
        setupManager.stop().catch((error) => {
            logger_1.Logger.log('Error during deactivation: ' + error);
        });
    }
    if (aiPanel) {
        aiPanel.dispose();
    }
}
//# sourceMappingURL=extension.js.map