/* Fatec 217 - Aula 19/08/2026 - 3 Sem - DSM
Nome: Ryan Santos - ryan.s.oliveira09@gmail.com
Descricao primeiro programa de node.js com webserver (sem framework).
Objetivo ter o primeiro contato com node.js e webserver.
Versao 04: Abrir arquivos no end point.
*/

// Carregar os modulos
const url = require('url');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Funcao para ler arquivo e enviar no http:
function readFile(response, filePath){
    const absolutePath = path.join(__dirname, filePath);

    // Mostra no CMD qual caminho o Node está tentando ler no seu HD
    console.log("Tentando ler o arquivo em:", absolutePath);

    fs.readFile(absolutePath, function(err, data){
        if (err) {
            console.error("ERRO DETALHADO:", err.message);
            response.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
            response.end(`<h1>Erro 404: Arquivo não encontrado</h1><p>O Node tentou procurar em: <code>${absolutePath}</code></p>`);
            return;
        }
        response.end(data);
    });
}

// Funcao Callback para utilizar no server http:
var callback = function(request, response){
    // Faz o parse da URL, separando o caminho (end-points)
    var parts = url.parse(request.url);

    // Ajuste dos end-points e direcionamento para os caminhos das pastas corretas:
    if(parts.path === "/" || parts.path === "/index"){
        response.writeHead(200, {"Content-Type": "text/html"});
        readFile(response, 'index.html');
    }
    else if(parts.path === "/Eduardo/Sobre1"){
        response.writeHead(200, {"Content-Type": "text/html"});
        readFile(response, 'Eduardo/Sobre1.html'); // Aponta para a pasta Eduardo/
    }
    else if(parts.path === "/Eduardo/curriculo-2"){
        response.writeHead(200, {"Content-Type": "application/pdf"});
        readFile(response, 'Eduardo/curriculo-2.pdf');
    }
    else if(parts.path === '/Eduardo/imagem/Eduardo'){
        response.writeHead(200, {"Content-Type": "image/jpeg"});
        readFile(response, 'Eduardo/Eduardo.jpeg');
    }
    else if(parts.path === "/Ryan/Sobre"){
        response.writeHead(200, {"Content-Type": "text/html"});
        readFile(response, 'Ryan/Sobre.html'); // Aponta para a pasta Ryan/
    }
    else if(parts.path === "/Ryan/Curriculo-1"){
        response.writeHead(200, {"Content-Type": "application/pdf"});
        readFile(response, 'Ryan/Curriculo-1.pdf');
    }
    else if(parts.path === '/Ryan/imagem/Ryan'){
        response.writeHead(200, {"Content-Type": "image/jpeg"});
        readFile(response, 'Ryan/Ryan.jpeg');
    }
    else if(parts.path === '/documentacao.pdf' || parts.path === '/documentacao')
        {
        response.writeHead(200, {"Content-Type": "application/pdf"});
        readFile(response, 'documentacao.pdf'); // Garanta que o arquivo no HD tenha exatamente esse nome
        }
    else {
        response.writeHead(404, {"Content-Type": "text/html"});
        readFile(response, 'erro404.html');
    }
};

// Criação e configuração de um Servidor http: 
var server = http.createServer(callback);
server.listen(3000);
console.log("Servidor Iniciado em http://localhost:3000/");