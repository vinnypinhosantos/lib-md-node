# Biblioteca de validação de Links em arquivos Markdown
Biblioteca desenvolvida com NodeJS que busca identificar links em arquivos Markdown para verificar se ainda estão ativos. Feito no Curso de Node da Alura.
A biblioteca funciona no terminal com os seguintes comandos:

## Links sem validação
- npm run cli caminho_do_arquivo

Esse comando roda o código principal e vai returnar no terminal uma lista com todos os links encontrados.

Exemplo com o arquivo de teste:

`npm run cli ./arquivos/texto.md`

Também funciona passando apenas o diretório (nesse caso, serão percorridos todos os arquivos no diretório):

`npm run cli ./arquivos`

## Links com validação
- npm run cli camindo_do_arquivo -- --valida

Esse comando vai trazer a lista com o status HTTP atualizado.

Exemplo:

`npm run cli ./arquivos/texto.md -- --valida`

## Links quebrados
- npm run cli caminho_do_arquivo -- --quebrados

Esse comando vai trazer a lista apenas com os links quebrados (Status 404).

Exemplo:

`npm run cli ./arquivos/texto.md -- --quebrados`
