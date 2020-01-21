const fs = require('fs');

fs.readFile('./readme.txt', (err, buffer) => {
    if (err) {
        throw err;
    }
    console.log(buffer);
    console.log(buffer.toString());
});