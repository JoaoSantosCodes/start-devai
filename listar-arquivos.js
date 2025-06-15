const fs = require('fs');
const path = require('path');

function listarArquivos(dir, lista = []) {
    const arquivos = fs.readdirSync(dir);
    for (const arquivo of arquivos) {
        const caminhoCompleto = path.join(dir, arquivo);
        const stat = fs.statSync(caminhoCompleto);
        if (stat.isDirectory()) {
            lista.push({ type: 'dir', path: caminhoCompleto });
            listarArquivos(caminhoCompleto, lista);
        } else {
            lista.push({ type: 'file', path: caminhoCompleto });
        }
    }
    return lista;
}

const raiz = process.cwd();
const inventario = listarArquivos(raiz);

// Salvar como TXT
const txt = inventario.map((item) => `[${item.type}] ${item.path}`).join('\n');
fs.writeFileSync('inventario-arquivos.txt', txt, 'utf8');

// Salvar como JSON
fs.writeFileSync('inventario-arquivos.json', JSON.stringify(inventario, null, 2), 'utf8');

console.log('Inventário de arquivos gerado com sucesso!');
