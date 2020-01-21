const fs = require('fs');

setInterval(() => {
    fs.unlink('./abcdef.js', (err) => {
        if (err) {
            console.log(err);
        }
        console.log("에러 후에도 실행 됨");
    });
}, 1000);