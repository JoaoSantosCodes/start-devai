import * as vscode from 'vscode';
import { StatusBarItem } from 'vscode';

export class AIPanel {
    private panel: vscode.WebviewPanel | undefined;
    private statusBarItem: StatusBarItem;
    private isActive: boolean = false;

    constructor(context: vscode.ExtensionContext) {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
        );
        this.statusBarItem.text = '$(robot) DevAI';
        this.statusBarItem.tooltip = 'DevAI Assistant';
        this.statusBarItem.command = 'devai-assistant.togglePanel';
        this.statusBarItem.show();

        context.subscriptions.push(this.statusBarItem);
    }

    public createOrShow() {
        const columnToShowIn = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (this.panel) {
            this.panel.reveal(columnToShowIn);
            return;
        }

        this.panel = vscode.window.createWebviewPanel(
            'devaiAssistant',
            'DevAI Assistant',
            columnToShowIn || vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [
                    vscode.Uri.joinPath(vscode.Uri.file(__dirname), '..', '..', 'media'),
                ],
            }
        );

        this.panel.webview.html = this.getWebviewContent();
        this.isActive = true;
        this.updateStatus();

        this.panel.onDidDispose(() => {
            this.panel = undefined;
            this.isActive = false;
            this.updateStatus();
        }, null);
    }

    private getWebviewContent(): string {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        padding: 20px;
                        background-color: var(--vscode-editor-background);
                        color: var(--vscode-editor-foreground);
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    .header {
                        display: flex;
                        align-items: center;
                        margin-bottom: 20px;
                        padding: 15px;
                        background-color: var(--vscode-editor-inactiveSelectionBackground);
                        border-radius: 8px;
                    }
                    .header img {
                        width: 40px;
                        height: 40px;
                        margin-right: 15px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                        color: var(--vscode-editor-foreground);
                    }
                    .status {
                        margin-left: auto;
                        padding: 5px 10px;
                        border-radius: 15px;
                        font-size: 14px;
                        background-color: #4CAF50;
                        color: white;
                    }
                    .controls {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 15px;
                        margin-bottom: 20px;
                    }
                    .control-card {
                        background-color: var(--vscode-editor-inactiveSelectionBackground);
                        padding: 15px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: transform 0.2s;
                    }
                    .control-card:hover {
                        transform: translateY(-2px);
                    }
                    .control-card h3 {
                        margin: 0 0 10px 0;
                        color: var(--vscode-editor-foreground);
                    }
                    .control-card p {
                        margin: 0;
                        font-size: 14px;
                        color: var(--vscode-descriptionForeground);
                    }
                    .stats {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        gap: 15px;
                        margin-bottom: 20px;
                    }
                    .stat-card {
                        background-color: var(--vscode-editor-inactiveSelectionBackground);
                        padding: 15px;
                        border-radius: 8px;
                        text-align: center;
                    }
                    .stat-card h4 {
                        margin: 0 0 5px 0;
                        color: var(--vscode-editor-foreground);
                    }
                    .stat-card p {
                        margin: 0;
                        font-size: 24px;
                        color: var(--vscode-editor-foreground);
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        padding: 15px;
                        background-color: var(--vscode-editor-inactiveSelectionBackground);
                        border-radius: 8px;
                        font-size: 14px;
                        color: var(--vscode-descriptionForeground);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="${this.panel?.webview.asWebviewUri(
                            vscode.Uri.joinPath(
                                vscode.Uri.file(__dirname),
                                '..',
                                '..',
                                'media',
                                'icons',
                                'devai.png'
                            )
                        )}" alt="DevAI Logo">
                        <h1>DevAI Assistant</h1>
                        <div class="status">Active</div>
                    </div>

                    <div class="controls">
                        <div class="control-card" onclick="startAssistant()">
                            <h3>Start Assistant</h3>
                            <p>Initialize the AI assistant</p>
                        </div>
                        <div class="control-card" onclick="stopAssistant()">
                            <h3>Stop Assistant</h3>
                            <p>Stop the AI assistant</p>
                        </div>
                        <div class="control-card" onclick="configureAssistant()">
                            <h3>Configure</h3>
                            <p>Adjust assistant settings</p>
                        </div>
                    </div>

                    <div class="stats">
                        <div class="stat-card">
                            <h4>Memory Usage</h4>
                            <p>2.1 GB</p>
                        </div>
                        <div class="stat-card">
                            <h4>Response Time</h4>
                            <p>0.3s</p>
                        </div>
                        <div class="stat-card">
                            <h4>Active Models</h4>
                            <p>2</p>
                        </div>
                    </div>

                    <div class="footer">
                        DevAI Assistant v1.0.0 | Powered by Ollama
                    </div>
                </div>

                <script>
                    function startAssistant() {
                        vscode.postMessage({ command: 'start' });
                    }
                    function stopAssistant() {
                        vscode.postMessage({ command: 'stop' });
                    }
                    function configureAssistant() {
                        vscode.postMessage({ command: 'configure' });
                    }
                </script>
            </body>
            </html>
        `;
    }

    private updateStatus() {
        this.statusBarItem.text = this.isActive ? '$(robot) DevAI Active' : '$(robot) DevAI';
    }

    public dispose() {
        if (this.panel) {
            this.panel.dispose();
        }
        this.statusBarItem.dispose();
    }
}
