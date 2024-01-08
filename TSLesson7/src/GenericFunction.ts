//defining object is too unspecific, so using a generic types,
//will then tell typescript that theses are of two unique different types.
//by using generic types, typescript will automatically infer what type of object is passed on
//'extends' keyword binds the generic type to be of an specific type
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({name: "Max", hobbies: ['Sports']}, {age: 30});

//typescript only understands the type, but it does not understand the value
//one way is to use type casting, but it can be bothersome and too much conversion
//mergedObj.age;

console.log(mergedObj.age);



//form a custom constraints then use extends keyword 
//to ensure the element property have a length property
interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = "Got no value."
    if(element.length === 1) {
        descriptionText = "Got " + element.length + " element.";
    } else if (element.length > 1) {
        descriptionText = "Got " + element.length + " elements.";
    } 
    return [element, descriptionText];
}

let newDescribe = countAndDescribe(["Sports", "Cooking"]);

//this would throw an error because typescript cant tell whether object will actually contain a key
//therefore, using keyof keyword will tell that K is an generic type for key of T
function extractAndConvert<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

extractAndConvert({name: "Seunggyu"}, 'name');