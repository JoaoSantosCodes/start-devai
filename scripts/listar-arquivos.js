const fs = require('fs');
const path = require('path');

// Função para listar arquivos recursivamente
function listarArquivos(diretorio, nivel = 0) {
    const arquivos = fs.readdirSync(diretorio);
    const indentacao = '  '.repeat(nivel);

    arquivos.forEach((arquivo) => {
        const caminhoCompleto = path.join(diretorio, arquivo);
        const stats = fs.statSync(caminhoCompleto);

        if (stats.isDirectory()) {
            // Ignorar diretórios node_modules e .git
            if (arquivo !== 'node_modules' && arquivo !== '.git') {
                console.log(`${indentacao}📁 ${arquivo}/`);
                listarArquivos(caminhoCompleto, nivel + 1);
            }
        } else {
            // Ignorar arquivos .gitignore e package-lock.json
            if (arquivo !== '.gitignore' && arquivo !== 'package-lock.json') {
                const extensao = path.extname(arquivo);
                const tamanho = stats.size;
                const dataModificacao = stats.mtime.toLocaleDateString();
                console.log(
                    `${indentacao}📄 ${arquivo} (${tamanho} bytes, modificado em ${dataModificacao})`
                );
            }
        }
    });
}

// Diretório raiz do projeto
const diretorioRaiz = path.resolve(__dirname, '..');

console.log('\n📂 Estrutura de Arquivos do Projeto:\n');
listarArquivos(diretorioRaiz);
console.log('\n✨ Listagem concluída!\n');
