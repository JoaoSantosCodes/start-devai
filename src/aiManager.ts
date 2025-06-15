// Substitua por:
import axios from 'axios';
import * as vscode from 'vscode';

export class AIManager {
    private readonly OLLAMA_API = 'http://localhost:11434/api/generate';
    
    public async generateCode(prompt: string): Promise<string> {
        try {
            const response = await axios.post(this.OLLAMA_API, {
                model: 'deepseek-coder:6.7b',
                prompt: prompt,
                stream: false
            });
            return response.data.response;
        } catch (error) {
            vscode.window.showErrorMessage('Erro na geração de código');
            return `// Erro: ${error instanceof Error ? error.message : String(error)}`;
        }
    }
}