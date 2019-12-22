/*
function hello(name, age) {
    return `Hello ${name} you are ${age} years old`;
}


const thisIsTest = hello("jihwan",25)

console.log(thisIsTest);
*/

const calculator = {
    plus : function(a,b){
        return a + b ;
    },
    minus : function(a,b){
        return a - b ;
    }
}


const plus = calculator.plus(5,5)
console.log(plus)

const minus = calculator.minus(10,5)
console.log(minus)

/*
`을 이용해서 문자열을 출력해 보자.
`문자열 ${argument}`
*/