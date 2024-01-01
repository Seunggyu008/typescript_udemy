var Role;
(function (Role) {
    Role["ADMIN1"] = "ADMIN";
})(Role || (Role = {}));
;
var person1 = {
    firstName: "Seung",
    age: 26,
    role: Role.ADMIN1
};
var firstName = person1.firstName, age = person1.age;
console.log(person1);
