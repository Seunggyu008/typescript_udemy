//type AddFn = (a: number, b: number) => number;

interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
}

//interface keyword only exists in typescript
interface Named {
    readonly name?: string;
    //adding ? or !=> will mark the string as optional
    outputName?: string;

    greet(phrase: string): void;
}

interface Talkable extends Named{
    topic: string;

    talk(phrase: string): void;
}

//multiple interfaces can be implemented to a class
//if interface is used, the class have to strictly follow its implementation
//

class Person implements Talkable {
    name?: string;
    age = 30;
    topic = "Weather"

    constructor(n?: string) {
        if(n) {
            this.name = n;n
        }
    }

    greet(phrase: string) {
        if(this.name) {
            console.log(phrase + '' + this.name);
        }
    }

    talk(phrase: string) {
        if(this.topic) {
            console.log(phrase + '' + this.topic)
        }
    }
}

//1. interfaces can be used to type check an variable by using interface as an type
let user1: Talkable;

user1 = new Person('Seunggyu');
user1.greet("Hi there ");
user1.talk("What a great ")

 

//user1.greet('Hi There I am Seunggyu');

//2. interface is not equal to custom types
//interfaces can only be used to describe structure of an object,
//whereas custom types can also store union types and whatnot.
//the advantage of interface is that it is clearer than custom types.