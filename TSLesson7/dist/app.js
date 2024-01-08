"use strict";
const names = [];
names[0].split(' ');
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done');
    }, 2000);
});
promise.then(data => {
    data.split(' ');
});
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Max", hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj.age);
function countAndDescribe(element) {
    let descriptionText = "Got no value.";
    if (element.length === 1) {
        descriptionText = "Got " + element.length + " element.";
    }
    else if (element.length > 1) {
        descriptionText = "Got " + element.length + " elements.";
    }
    return [element, descriptionText];
}
let newDescribe = countAndDescribe(["Sports", "Cooking"]);
function extractAndConvert(obj, key) {
    return obj[key];
}
extractAndConvert({ name: "Seunggyu" }, 'name');
