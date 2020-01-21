process.on('uncaughtException', (err) => {
    console.log('예기치 못한 에러 발생!!!', err);
});

setInterval(() => {
    throw new Error('서버를 부수겠다!!!');
}, 1000);

setInterval(() => {
    console.log('에러났는데 실행되지롱!!!');
}, 2000);