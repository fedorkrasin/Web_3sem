const http = require('http');
const fs = require('fs');

const port = 3000;

const requestHandler = (request, response) => {
    console.log(request.url)
    if (request.method === 'GET' && request.url === '/' || request.url === '/?') {
        fs.readFile('./index.html', 'utf8', (err, html) => {
            response.end(html);
        });
    }
    if (request.method === 'GET' && request.url === '/style.css') {
        fs.readFile('./style.css', 'utf8', (err, contents) => {
            response.end(contents);
        });
    }
    if (request.method === 'GET' && request.url === '/script.js') {
        fs.readFile('./script.js', 'utf8', (err, contents) => {
            response.end(contents);
        });
    }
    if (request.method === 'POST' && request.url === '/json') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            fs.writeFile('./json/students.json', body, () => {
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify({ success: true }));
            });
        });
        return;
    }
    if (request.method === 'GET' && request.url === '/json') {
        fs.readFile('./json/students.json', 'utf8', (err, contents) => {
            response.setHeader("Content-Type", "application/json");
            response.end(contents);
        });
        return;
    }
}

const server = http.createServer(requestHandler)
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
