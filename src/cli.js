import chalk from "chalk";
import fs from 'fs';
import pegaArquivo from "./index.js";

const caminho = process.argv;

function imprimeResultado(resultado, identificador='') {
    console.log(
        chalk.yellow("Lista de Links"),
        chalk.black.bgGreen(identificador), 
        resultado)
}

async function processaTexto (argumentos) {
    const caminho = argumentos[2]

    try {
        fs.statSync(caminho);
    } catch (erro) {
        if (erro.code === "ENOENT") {
            console.log("Arquivo ou diretório não existe.");
            return;
        }
    }
    if (fs.statSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho);
        imprimeResultado(resultado);
    } else if (fs.statSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDoArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
            imprimeResultado(lista, nomeDoArquivo);
        })
    }

}

processaTexto(caminho);
