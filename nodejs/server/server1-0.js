const http = require('http');

const server = http.createServer((req, res) => {
    res.write('<h1>Hello Sohyun</h1>');
    res.end('<p>Hello Jihwan</p>');
});
server.listen(9000);
server.on('listening', () => {
    console.log('9000번 포트에서 서버 대기 중입니다');
});
server.on('error', (error) => {
    console.error(error);
});
