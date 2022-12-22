import fs from 'fs'; // biblioteca nativa do Node para acessar arquivos do computador
import chalk from "chalk"; // biblioteca para colorir o retorno no terminal

const textoTeste = 'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).'

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultado = capturas.map((captura) => ({[captura[1]]:captura[2]}))
    return resultado.length ? resultado : "não há links no arquivo"
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não foi encontrado o arquivo'));
}

// FUNÇÃO ASSÍNCRONA COM ASYNC E AWAIT
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const enconding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, enconding);
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro);
    }
}

export default pegaArquivo;

// VERSÃO ASSÍNCRONA DA FUNÇÃO COM THEN E CATCH
// function pegaArquivo(caminhoDoArquivo) {
//     const enconding = 'utf-8';
//     fs.promises
//       .readFile(caminhoDoArquivo, enconding)
//       .then((texto) => console.log(chalk.green(texto)))
//       .catch(trataErro)
// }

// VERSÃO SÍNCRONA DA FUNÇÃO
// function pegaArquivo(caminhoDoArquivo) {
//    const enconding = 'utf-8';
//    fs.readFile(caminhoDoArquivo, enconding, (erro, texto) => {
//        if (erro) {
//            trataErro(erro);
//        }
//        console.log(chalk.green(texto));
//    })
// }

// \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)
