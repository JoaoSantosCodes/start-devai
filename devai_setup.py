import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import subprocess
import os
import sys
import logging
import json
import threading
import webbrowser
from datetime import datetime
import requests
import time
import shutil

# Configuração do logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('devai_setup.log'),
        logging.StreamHandler()
    ]
)

class DevAISetup:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("DevAI Setup")
        self.root.geometry("800x600")
        
        # Configuração do estilo
        self.style = ttk.Style()
        self.style.configure("TButton", padding=6, relief="flat", background="#2196F3")
        self.style.configure("TLabel", padding=6)
        self.style.configure("TFrame", background="#f0f0f0")
        
        # Frame principal
        self.main_frame = ttk.Frame(self.root, padding="10")
        self.main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Título
        title_label = ttk.Label(
            self.main_frame,
            text="DevAI Setup",
            font=("Helvetica", 24, "bold")
        )
        title_label.pack(pady=20)
        
        # Frame para os botões
        button_frame = ttk.Frame(self.main_frame)
        button_frame.pack(pady=20)
        
        # Botões
        self.create_button(button_frame, "Verificar Ambiente", self.check_environment)
        self.create_button(button_frame, "Configurar npm", self.configure_npm)
        self.create_button(button_frame, "Instalar Dependências", self.install_dependencies)
        self.create_button(button_frame, "Iniciar Servidor", self.start_server)
        self.create_button(button_frame, "Sair", self.root.quit)
        
        # Status
        self.status_var = tk.StringVar()
        self.status_var.set("Pronto")
        status_label = ttk.Label(
            self.main_frame,
            textvariable=self.status_var,
            font=("Helvetica", 10)
        )
        status_label.pack(pady=10)
        
        # Log
        self.log_text = tk.Text(self.main_frame, height=10, width=70)
        self.log_text.pack(pady=10, padx=10, fill=tk.BOTH, expand=True)
        
        # Scrollbar para o log
        scrollbar = ttk.Scrollbar(self.log_text, command=self.log_text.yview)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.log_text.config(yscrollcommand=scrollbar.set)
        
        # Configurar redirecionamento do logging
        self.setup_logging()
        
        # Verificar ambiente ao iniciar
        self.check_environment()

    def create_button(self, parent, text, command):
        btn = ttk.Button(
            parent,
            text=text,
            command=command,
            style="TButton",
            width=20
        )
        btn.pack(pady=5)
        return btn

    def setup_logging(self):
        class TextHandler(logging.Handler):
            def __init__(self, text_widget):
                logging.Handler.__init__(self)
                self.text_widget = text_widget

            def emit(self, record):
                msg = self.format(record)
                def append():
                    self.text_widget.configure(state='normal')
                    self.text_widget.insert(tk.END, msg + '\n')
                    self.text_widget.configure(state='disabled')
                    self.text_widget.see(tk.END)
                self.text_widget.after(0, append)

        text_handler = TextHandler(self.log_text)
        text_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
        logging.getLogger().addHandler(text_handler)

    def check_environment(self):
        """Verifica o ambiente de desenvolvimento"""
        logging.info("Verificando ambiente...")
        self.status_var.set("Verificando ambiente...")
        
        # Verificar Node.js
        try:
            node_version = subprocess.check_output(['node', '--version']).decode().strip()
            logging.info(f"Node.js encontrado: {node_version}")
        except:
            logging.error("Node.js não encontrado. Por favor, instale o Node.js.")
            messagebox.showerror("Erro", "Node.js não encontrado. Por favor, instale o Node.js.")
            return

        # Verificar npm
        try:
            npm_version = subprocess.check_output(['npm', '--version']).decode().strip()
            logging.info(f"npm encontrado: {npm_version}")
        except:
            logging.warning("npm não encontrado no PATH. Use a opção 'Configurar npm' para resolver.")
            return

        # Verificar Python
        try:
            python_version = subprocess.check_output(['python', '--version']).decode().strip()
            logging.info(f"Python encontrado: {python_version}")
        except:
            logging.error("Python não encontrado. Por favor, instale o Python.")
            messagebox.showerror("Erro", "Python não encontrado. Por favor, instale o Python.")
            return

        # Verificar pip
        try:
            pip_version = subprocess.check_output(['pip', '--version']).decode().strip()
            logging.info(f"pip encontrado: {pip_version}")
        except:
            logging.error("pip não encontrado. Por favor, instale o pip.")
            messagebox.showerror("Erro", "pip não encontrado. Por favor, instale o pip.")
            return

        # Verificar Ollama
        try:
            ollama_version = subprocess.check_output(['ollama', '--version']).decode().strip()
            logging.info(f"Ollama encontrado: {ollama_version}")
        except:
            logging.warning("Ollama não encontrado. Use a opção 'Instalar Dependências' para instalar.")
            return

        logging.info("Verificação do ambiente concluída!")
        self.status_var.set("Ambiente verificado")
        messagebox.showinfo("Sucesso", "Verificação do ambiente concluída com sucesso!")

    def configure_npm(self):
        """Configura o npm no PATH do sistema"""
        logging.info("Configurando npm...")
        self.status_var.set("Configurando npm...")
        
        # Criar script PowerShell temporário
        ps_script = """
        # Verifica se está rodando como administrador
        $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
        if (-not $isAdmin) {
            Write-Host "Elevando privilégios de administrador..."
            Start-Process powershell.exe -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
            exit
        }

        # Caminhos comuns onde o npm pode estar instalado
        $possiblePaths = @(
            "C:\\Program Files\\nodejs",
            "C:\\Program Files (x86)\\nodejs",
            "$env:APPDATA\\npm"
        )

        # Procura o npm nos caminhos possíveis
        $npmPath = $null
        foreach ($path in $possiblePaths) {
            if (Test-Path "$path\\npm.cmd") {
                $npmPath = $path
                break
            }
        }

        if ($npmPath) {
            Write-Host "npm encontrado em: $npmPath"
            
            # Adiciona o caminho ao PATH do sistema
            $currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
            if ($currentPath -notlike "*$npmPath*") {
                $newPath = "$currentPath;$npmPath"
                [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
                Write-Host "Caminho do npm adicionado ao PATH do sistema."
            } else {
                Write-Host "O caminho do npm já está no PATH do sistema."
            }
        } else {
            Write-Host "npm não encontrado nos caminhos comuns. Por favor, instale o Node.js."
        }
        """
        
        # Salvar script temporário
        temp_script = "temp_npm_config.ps1"
        with open(temp_script, "w") as f:
            f.write(ps_script)
        
        try:
            # Executar script PowerShell
            subprocess.run(["powershell", "-ExecutionPolicy", "Bypass", "-File", temp_script], check=True)
            
            # Verificar se o npm está funcionando
            try:
                npm_version = subprocess.check_output(['npm', '--version']).decode().strip()
                logging.info(f"npm configurado com sucesso! Versão: {npm_version}")
                self.status_var.set("npm configurado")
                
                # Perguntar se deseja reiniciar
                if messagebox.askyesno("Reiniciar", "A configuração foi concluída. Deseja reiniciar o computador agora?"):
                    subprocess.run(["shutdown", "/r", "/t", "0"])
            except:
                logging.warning("npm ainda não está disponível. Reinicie o computador e tente novamente.")
                if messagebox.askyesno("Reiniciar", "É necessário reiniciar o computador para aplicar as alterações. Deseja reiniciar agora?"):
                    subprocess.run(["shutdown", "/r", "/t", "0"])
                
        except subprocess.CalledProcessError as e:
            logging.error(f"Erro ao configurar npm: {str(e)}")
            messagebox.showerror("Erro", "Erro ao configurar npm. Verifique o log para mais detalhes.")
        finally:
            # Limpar script temporário
            if os.path.exists(temp_script):
                os.remove(temp_script)

    def install_dependencies(self):
        """Instala as dependências do projeto"""
        logging.info("Instalando dependências...")
        self.status_var.set("Instalando dependências...")
        
        try:
            # Instalar dependências Python
            subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], check=True)
            logging.info("Dependências Python instaladas com sucesso!")
            
            # Instalar dependências Node.js
            subprocess.run(["npm", "install"], check=True)
            logging.info("Dependências Node.js instaladas com sucesso!")
            
            self.status_var.set("Dependências instaladas")
            messagebox.showinfo("Sucesso", "Dependências instaladas com sucesso!")
        except subprocess.CalledProcessError as e:
            logging.error(f"Erro ao instalar dependências: {str(e)}")
            messagebox.showerror("Erro", "Erro ao instalar dependências. Verifique o log para mais detalhes.")

    def start_server(self):
        """Inicia o servidor de desenvolvimento"""
        logging.info("Iniciando servidor...")
        self.status_var.set("Iniciando servidor...")
        
        try:
            # Iniciar servidor de desenvolvimento
            subprocess.Popen(["npm", "run", "dev"], creationflags=subprocess.CREATE_NEW_CONSOLE)
            logging.info("Servidor iniciado com sucesso!")
            self.status_var.set("Servidor iniciado")
            messagebox.showinfo("Sucesso", "Servidor iniciado com sucesso!")
        except subprocess.CalledProcessError as e:
            logging.error(f"Erro ao iniciar servidor: {str(e)}")
            messagebox.showerror("Erro", "Erro ao iniciar servidor. Verifique o log para mais detalhes.")

    def run(self):
        """Inicia a aplicação"""
        self.root.mainloop()

if __name__ == "__main__":
    app = DevAISetup()
    app.run() 