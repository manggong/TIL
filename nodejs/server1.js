const http = require('http');

http.createServer((req, res) => {
    res.write('<h1>Hello Sohyun</h1>');
    res.end('<p>Hello Jihwan</p>');
}).listen(9000, () => {
    console.log('9000번 포트에서 서버 실행 중이지롱!!!');
});
