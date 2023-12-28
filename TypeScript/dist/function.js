"use strict";
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result: ' + num);
}
//매개변수 cb는 아무런 함수도 return하지 않지만, callback function으로 number type인 num을 받게 선언할 수 있습니다.
function addAndHandle(n1, n2, cb) {
    const result = n1 + n2;
    cb(result);
}
printResult(add(5, 12));
// combineValues stores a functino that takes two numbers and returns a function.
let combineValues;
/* combineValues = add;
combineValues = printResult; */
console.log(combineValues(8, 8));
// let someValue: undefined; 
addAndHandle(10, 20, (result) => {
    return result;
});
