enum Role { ADMIN1 = 'ADMIN'};

const person1: {
    firstName: string,
    age: number,
    role: string
} = {
    firstName: "Seung",
    age: 26,
    role: Role.ADMIN1
}

const { firstName, age } = person1; 
 
console.log(person1); 