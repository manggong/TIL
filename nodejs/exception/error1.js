setInterval(() => {
    console.log('시작');
    try {
        throw new Error('서버를 부수겠다');
    } catch (err) {
        console.log(err);
    }
    console.log('끝');
}, 1000);