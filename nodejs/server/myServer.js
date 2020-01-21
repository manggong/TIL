const http = require('http');

const server = http.createServer((req, res) => {
    console.log("서버로 요청옴");
    res.write('<h1>Hello Node</h1>');
    res.end("<p>Hello Server!</p>");
});

server.listen(9000, () => {
    console.log("서버가 리슨했지");
});