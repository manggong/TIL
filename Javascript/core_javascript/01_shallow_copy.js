/*
  얇은 복사는 바로 아래 단계의 값만 복사하는 방법이고,
  깊은 복사는 내부으 모든 값들을 하나하나 찾아서 전부 복사하는 방법이다.
*/

var user = {
  name: 'kim',
  urls: {
    portfolio: 'http://blabla.com',
    blog: 'http://blog.com',
    facebook: 'http://fb.com',
  },
};

var copyObject = function (target) {
  var result = {};
  for (var prop in target) {
    //console.log(prop);
    result[prop] = target[prop];
  }
  //console.log(result);
  return result;
};

var copyObjectDeep = function (target) {
  var result = {};
  if (typeof target === 'object' && target !== null) {
    for (var prop in target) {
      result[prop] = copyObjectDeep(target[prop]);
    }
  } else {
    result = target;
  }
  return result;
};

var copyObjectViaJSON = function (target) {
  return JSON.parse(JSON.stringify(target));
};

var user2 = copyObject(user);
user2.urls = copyObject(user.urls);

// user2.name = 'yang';
// console.log(user.name === user2.name);

// user.urls.portfolio = 'http://portfolio.coom';
// console.log(user.urls.portfolio === user2.urls.portfolio);

// user2.urls.blog = '';
// console.log(user.urls.blog === user2.urls.blog);

var obj = {
  a: 1,
  b: {
    c: null,
    d: [1, 2],
  },
};

var obj2 = copyObjectDeep(obj);

obj2.a = 3;
obj2.b.c = 4;
obj.b.d[1] = 3;

console.log(obj);
console.log(obj2);
