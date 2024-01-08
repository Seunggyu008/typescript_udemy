"use strict";
var _a;
const fetchedUserData = {
    id: 'u1',
    name: 'max',
    job: { title: "CEO", description: 'My Own Company' }
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const userInput = undefined;
const storedData = userInput !== null && userInput !== void 0 ? userInput : 'DEFAULT';
console.log(storedData);
