### Javascript Array Helper Method



#### Array.`concat()`

- 배열 합치기!

~~~javascript
const arr1 = [1,2,3]
const arr2 = [3,4,5]

arr1.concat(arr2)

>[1,2,3,4,5]
~~~



#### Array.`every()`

- 모든 요소들이 조건을 통과하면 true, 아니면 false

~~~javascript
const numbers = [1,2,3,4,5,6];

const isEven = function(num) {
	return (num % 2 == 0) ? true : false;
}	
const even1 = numbers.every(isEven);

console.log(even1); 

> false 

const evenNumbers = [2,4,6];

const even2 = evenNumbers.every(isEven);

console.log(even2); 

> true
~~~



#### Array.`some()`

- 요소 중에 하나라도 통과하면 trun, 아니면 false, 빈 배열도 false

~~~javascript
const numbers = [1,2,3,4,5]

const even = (number) => number % 2 === 0

console.log(numbers.some(even))

> true
~~~



#### Array.`forEach()`

- 배열의 요소를 반복하고 각 요소별로 액션!!!

~~~javascript
const colors = ["red", "blue", "green"];

for (let color of colors) {
  console.log(color);
}

> red
  blue
  green
~~~



#### Array.`filter()`

- 조건에 해당하는 요소들 리턴

~~~javascript
const numbers = [-20, -15, 5, 10];

const positiveNumber = numbers.filter((number) => number > 0);

> [5,10]
~~~



#### Array.`map()`

- 순회를 하며, 내부의, 모든 요소에 동일한 작업을 해야하는 경우

- 숫자 배열 <-> 글자배열, 동일한 데이터를 적용해야하는 경우

~~~javascript
const inputs = ["1", "5", "3,", "6"];

const Numbers = inputs.map((input) => {
  return parseInt(input);
});

>[1,5,3,6]
~~~



#### Array.`reduce()`

- 순회를 하며, 내부의 모든 요소를 하나의 값으로 환원해야되는 경우
- reduce((`누적값`, `현재값`)=>{})

~~~javascript
const Numbers = [1,2,3,4]

let sumResult = Numbers.reduce((acc, cur) => {
  return acc + cur;
});

> 10
~~~



#### Array.`indexOf()`

- 인자로 전달된 문자열과 매치되는 첫 번째 원소의 인덱스를 반환

~~~javascript
const names = ["jihwan", "sohyun"]
console.log(names.indexOf("jihwan"))

> 0
~~~



#### Array.`find()`

- 조건을 만족하는 첫 번째 요소를 리턴, 없으면 undefined

~~~javascript
const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found);

> 12
~~~

