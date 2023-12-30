//interface keyword only exists in typescript
interface Person {
    name: string;
    age: number;

    greet(phrase: string): void;
}

//1. interfaces can be used to type check an variable by using interface as an type
let user1: Person;

user1 = {
    name: 'Max',
    age: 30,
    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
};

user1.greet('Hi There I am Seunggyu');

//2.