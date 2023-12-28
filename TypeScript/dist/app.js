"use strict";
let userInput;
let userName;
userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
    userName = userInput;
}
// throw error를 만드는 함수같은 경우 어떤값이 반환되기전에 javascript가 
// crash하기때문에 이 함수는 그 어떠한 값도 절대 반환할수 없습니다.
// code quality의 시점에선 never를 사용하는것이 가독성의 시점에선 좋다. 
function generateError(message, code) {
    throw {
        message: message,
        errorCode: code
    };
}
generateError('An error Occured', 500);
