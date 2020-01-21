const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, buffer) => {
    if (err) {
        throw err;
    }
    console.log("1번", buffer.toString());
});
fs.readFile('./readme2.txt', (err, buffer) => {
    if (err) {
        throw err;
    }
    console.log("2번", buffer.toString());
});
fs.readFile('./readme2.txt', (err, buffer) => {
    if (err) {
        throw err;
    }
    console.log("3번", buffer.toString());
});
console.log("끝");

// fs모듈은 비동기