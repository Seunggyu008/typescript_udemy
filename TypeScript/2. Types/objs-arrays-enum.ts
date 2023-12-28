enum Role { ADMIN = 'ADMIN', READ_ONLY = "READ-ONLY", AUTHOR = 'AUTHOR'};

const person = {
    name: "Seunggyu",
    age: 30,
    hobbies: ["Gym", "Game"],
    role: Role.ADMIN
}

for (const hobby of person.hobbies) {
    console.log(hobby);
}