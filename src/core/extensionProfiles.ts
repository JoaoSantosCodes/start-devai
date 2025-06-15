import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export interface ExtensionProfile {
    name: string;
    description: string;
    extensions: string[];
    settings?: { [key: string]: any };
}

export class ExtensionProfileManager {
    private profiles: Map<string, ExtensionProfile> = new Map();
    private readonly profilesPath: string;

    constructor(context: vscode.ExtensionContext) {
        this.profilesPath = path.join(context.globalStoragePath, 'extension-profiles.json');
        this.loadProfiles();
    }

    private loadProfiles() {
        try {
            if (fs.existsSync(this.profilesPath)) {
                const data = JSON.parse(fs.readFileSync(this.profilesPath, 'utf-8'));
                this.profiles = new Map(Object.entries(data));
            }
        } catch (error) {
            console.error('Erro ao carregar perfis:', error);
        }
    }

    private saveProfiles() {
        try {
            const data = Object.fromEntries(this.profiles);
            fs.writeFileSync(this.profilesPath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Erro ao salvar perfis:', error);
        }
    }

    async createProfile(
        name: string,
        description: string,
        extensions: string[],
        settings?: { [key: string]: any }
    ) {
        const profile: ExtensionProfile = {
            name,
            description,
            extensions,
            settings,
        };

        this.profiles.set(name, profile);
        this.saveProfiles();
        return profile;
    }

    async deleteProfile(name: string) {
        this.profiles.delete(name);
        this.saveProfiles();
    }

    async applyProfile(name: string) {
        const profile = this.profiles.get(name);
        if (!profile) {
            throw new Error(`Perfil ${name} não encontrado`);
        }

        // Aplicar extensões
        for (const ext of profile.extensions) {
            try {
                await vscode.commands.executeCommand('workbench.extensions.installExtension', ext);
            } catch (error) {
                console.error(`Erro ao instalar extensão ${ext}:`, error);
            }
        }

        // Aplicar configurações
        if (profile.settings) {
            for (const [key, value] of Object.entries(profile.settings)) {
                await vscode.workspace.getConfiguration().update(key, value, true);
            }
        }
    }

    getProfiles(): ExtensionProfile[] {
        return Array.from(this.profiles.values());
    }

    getProfile(name: string): ExtensionProfile | undefined {
        return this.profiles.get(name);
    }
}
