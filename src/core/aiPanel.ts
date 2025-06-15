import * as vscode from 'vscode';
import { AIManager } from './aiManager';

export class DevAIPanel {
    public static currentPanel: DevAIPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private readonly _aiManager: AIManager;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, aiManager: AIManager) {
        this._panel = panel;
        this._extensionUri = extensionUri;
        this._aiManager = aiManager;

        this._update();
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    public static createOrShow(context: vscode.ExtensionContext, aiManager: AIManager) {
        if (DevAIPanel.currentPanel) {
            DevAIPanel.currentPanel._panel.reveal();
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'devAI',
            'DevAI Assistant',
            vscode.ViewColumn.Two,
            { enableScripts: true }
        );
        
        DevAIPanel.currentPanel = new DevAIPanel(panel, context.extensionUri, aiManager);
    }

    private _update() {
        const webview = this._panel.webview;
        this._panel.webview.html = this._getHtmlForWebview(webview);
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DevAI Assistant</title>
        </head>
        <body>
            <div id="app">
                <h1>DevAI Assistant</h1>
                <div id="chat-container"></div>
                <div id="input-container">
                    <textarea id="prompt-input" placeholder="Type your prompt here..."></textarea>
                    <button id="send-button">Send</button>
                </div>
            </div>
            <script>
                (function() {
                    const vscode = acquireVsCodeApi();
                    // Add your webview JavaScript here
                })();
            </script>
        </body>
        </html>`;
    }

    public dispose() {
        DevAIPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
}