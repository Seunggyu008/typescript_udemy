"use strict";
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["READ_ONLY"] = "READ-ONLY";
    Role["AUTHOR"] = "AUTHOR";
})(Role || (Role = {}));
;
const person = {
    name: "Seunggyu",
    age: 30,
    hobbies: ["Gym", "Game"],
    role: Role.ADMIN
};
for (const hobby of person.hobbies) {
    console.log(hobby);
}
