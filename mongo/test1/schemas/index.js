const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true); // 에러 시 콘솔에 로그를 찍어주세용
        }
        mongoose.connect('mongodb://localhost:27017/nodejs', {
            dbName: 'nodejs'
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('connection ok!!!');
            }
        });
    }
    connect();
    mongoose.connection.on('error', (err) => {
        console.log(err);
    });
    mongoose.connection.on('disconnected', () => {
        console.log("연결 재시도")
        connect();
    });
    require('./user');
    require('./comment');

};