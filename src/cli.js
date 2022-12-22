import chalk from "chalk";
import fs from 'fs';
import pegaArquivo from "./index.js";
import {listaValidada, listaLinksQuebrados} from "./http-validacao.js";

const caminho = process.argv;

async function imprimeResultado(valida, quebrados, resultado, identificador='') {
    if (valida) {
        console.log(
            chalk.yellow("Lista Validada"),
            chalk.black.bgGreen(identificador), 
            await listaValidada(resultado))
    } else if (quebrados) {
        console.log(
            chalk.yellow("Lista de Links Quebrados"),
            chalk.black.bgGreen(identificador), 
            await listaLinksQuebrados(resultado))
    } else {
        console.log(
            chalk.yellow("Lista de Links"),
            chalk.black.bgGreen(identificador), 
            resultado)
    }
}

async function processaTexto (argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';
    const quebrados = argumentos[3] === '--quebrados'; 

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
        imprimeResultado(valida, quebrados, resultado);
    } else if (fs.statSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDoArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
            imprimeResultado(valida, quebrados, lista, nomeDoArquivo);
        })
    }

}

processaTexto(caminho);
