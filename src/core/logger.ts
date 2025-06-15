// Adicione tipos Node ao tsconfig.json e atualize o logger:
import * as vscode from 'vscode';
import { writeFileSync, appendFileSync } from 'fs';
import { join } from 'path';

export class Logger {
    private static outputChannel: vscode.OutputChannel;
    private static logFile: string;

    static initialize(context: vscode.ExtensionContext) {
        this.outputChannel = vscode.window.createOutputChannel('DevAI Logs');
        this.logFile = join(context.extensionPath, 'devai.log');
    }

    static log(message: string) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}\n`;
        
        this.outputChannel.appendLine(message);
        appendFileSync(this.logFile, logMessage);
    }

    static error(message: string, error?: Error) {
        const errorMessage = error ? `${message}: ${error.message}` : message;
        this.log(`ERROR: ${errorMessage}`);
        if (error?.stack) {
            this.log(`Stack: ${error.stack}`);
        }
    }

    static clear() {
        this.outputChannel.clear();
        writeFileSync(this.logFile, '');
    }
}