import os
import subprocess
import sys
import shutil
from datetime import datetime

def build_executable():
    print("Iniciando build do executável...")
    
    # Verificar se o arquivo principal existe
    if not os.path.exists('devai_setup.py'):
        print("Erro: Arquivo devai_setup.py não encontrado!")
        return False
    
    # Criar diretório de build se não existir
    if not os.path.exists('build'):
        os.makedirs('build')
        
    # Nome do executável com versão
    version = datetime.now().strftime("%Y%m%d_%H%M")
    exe_name = f"DevAI_Setup_{version}"
    
    # Comando PyInstaller
    cmd = [
        sys.executable,
        '-m',
        'PyInstaller',
        '--name', exe_name,
        '--onefile',
        '--windowed',
        '--clean',
        '--noconfirm',
        'devai_setup.py'
    ]
    
    # Adicionar ícone se existir
    if os.path.exists('media/icon.ico'):
        cmd.extend(['--icon', 'media/icon.ico'])
        print("Ícone encontrado e será incluído no executável")
    
    # Adicionar README se existir
    if os.path.exists('README.md'):
        cmd.extend(['--add-data', 'README.md;.'])
        print("README.md encontrado e será incluído no executável")
    
    try:
        print("\nExecutando comando:", ' '.join(cmd))
        # Executar PyInstaller
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            print("\nErro durante a execução do PyInstaller:")
            print(result.stderr)
            return False
            
        print("\nPyInstaller executado com sucesso!")
        print(result.stdout)
        
        # Mover executável para pasta build
        exe_path = os.path.join('dist', f"{exe_name}.exe")
        if os.path.exists(exe_path):
            build_path = os.path.join('build', f"{exe_name}.exe")
            shutil.move(exe_path, build_path)
            print(f"\nExecutável gerado com sucesso: {build_path}")
            
            # Limpar arquivos temporários
            if os.path.exists('dist'):
                shutil.rmtree('dist')
            if os.path.exists('build'):
                for file in os.listdir('build'):
                    if file.endswith('.spec'):
                        os.remove(os.path.join('build', file))
                        
            return True
        else:
            print(f"\nErro: Executável não encontrado em {exe_path}")
            return False
            
    except subprocess.CalledProcessError as e:
        print(f"\nErro ao executar PyInstaller: {e}")
        print("Saída de erro:", e.stderr)
        return False
    except Exception as e:
        print(f"\nErro inesperado: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    # Verificar se PyInstaller está instalado
    try:
        import PyInstaller
        print("PyInstaller encontrado!")
    except ImportError:
        print("PyInstaller não encontrado. Instalando...")
        subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'], check=True)
    
    if build_executable():
        print("\nBuild concluído com sucesso!")
    else:
        print("\nErro durante o build.")
        sys.exit(1) 