"use strict";
let add;
add = (n1, n2) => {
    return n1 + n2;
};
class Person {
    constructor(n) {
        this.age = 30;
        this.topic = "Weather";
        if (n) {
            this.name = n;
            n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + '' + this.name);
        }
    }
    talk(phrase) {
        if (this.topic) {
            console.log(phrase + '' + this.topic);
        }
    }
}
let user1;
user1 = new Person('Seunggyu');
user1.greet("Hi there ");
user1.talk("What a great ");
