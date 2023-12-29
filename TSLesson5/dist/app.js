"use strict";
class Department {
    constructor(n) {
        this.employees = [];
        this.name = n;
    }
    describe() {
        console.log("Department name: " + this.name);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
let newDepartment = new Department("Big Store");
newDepartment.describe();
const accountingCopy = { name: 'DUMMY', describe: newDepartment.describe };
newDepartment.addEmployee("John");
newDepartment.printEmployeeInformation();
