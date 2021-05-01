// 객체의 가변성에 따른 문제점

// var user = {
//   name: 'kim',
//   gender: 'male',
// };

// var changeName = function (user, newName) {
//   var newUser = user;
//   newUser.name = newName;
//   return newUser;
// };

// var user2 = changeName(user, 'yang');

// if (user !== user2) {
//   console.log('유저 정보가 변경되었습니다.');
// }

// console.log(user.name, user2.name);
// console.log(user === user2);

// 해결

var user = {
  name: 'kim',
  gender: 'male',
};

// 불필요한 정보를 다 넣어줘야 함.
var changeName = function (user, newName) {
  return {
    name: newName,
    gender: user.gender,
  };
};

// 얇은 복사를 이용
var copyObject = function (target) {
  var result = {};
  for (var prop in target) {
    result[prop] = target[prop];
  }
  return result;
};

var user2 = copyObject(user);
user.name = 'yang';

if (user !== user2) {
  console.log('유저 정보가 변경되었습니다.');
}

console.log(user.name, user2.name);
console.log(user === user2);
