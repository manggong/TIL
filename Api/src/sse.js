const SSE = require("sse");

let price = 100;

sseStart = (server) => {
    const sseObj = new SSE(server);
    sseObj.on("connection", client => {
        setInterval(() => {
            client.send(`현재 입찰가는 ${price *= 2}`);
        }, 5000);
    });
};

module.exports = sseStart;