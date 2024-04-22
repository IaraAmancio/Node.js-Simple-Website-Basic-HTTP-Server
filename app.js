const http = require('http'); //funcionamento do Servidor http 
const fs = require('fs'); // Manipulação de arquivos
const path = require('path'); // Lidar com caminhos de arquivos

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html')
    {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data)=>{
            if (err){
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Erro interno no servidor');
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
            
        }
        );
       
    } else if (req.url === '/style.css'){
        fs.readFile(path.join(__dirname, req.url), (err, data)=>{
            if (err){
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Erro interno no servidor');
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(data);
            }
            
        });
    }
    else if (req.url.startsWith('/assets/')){
        fs.readFile(path.join(__dirname, req.url), (err, data)=>{
            if (err){
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Erro interno no servidor');
            }
            else{
                res.writeHead(200, {'Content-Type': 'image/jpg'});
                res.end(data);
            }
            
        });
    }
    
    else {
        // Se a URL não for '/' ou '/index.html', envie uma resposta 404 (não encontrado)
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada.');
    }
}
);
const PORT = 3000;
server.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:${PORT}');
});

