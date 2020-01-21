const url = require('url');

const URL = url.URL;
const myURL = new URL('https://https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Default_parameters.naver.com');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('------------------------------------------------------------');

const parsedUrl = url.parse('https://github.com/manggong/TIL/tree/master/Algorithm');
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl));