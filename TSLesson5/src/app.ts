class Department {
    name: string;
    private employees = [];

    constructor(n: string) {
        this.name = n;
    }

    //this being passed as parameter gives hint to what "this" should be referred to
    //therefore, defining type as Department will instruct that "this" should be 
    //instance of Department, not any other instance.
    describe(this: Department) {
        //name would not be printed as it wwill only refer to a property within describe() method
        //or it would find in global scope.
        //this case "name" does not throw error because there exists a constant with "name" in global scope.

        //therefore, "this" keyword can be used to point to an instance of the class below.
        console.log("Department name: " + this.name);
    }

    addEmployee(employee: string) {
        // validation etc
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}  

let newDepartment = new Department("Big Store");

newDepartment.describe();


//this will output "undefined" because this would point out to accountingCopy instance 
//which have no "name" property.

//Add name property in order to show that "this" in accountingCopy should point to 
//name property in accountingCopy.
const accountingCopy = {  name: 'DUMMY', describe: newDepartment.describe };


newDepartment.addEmployee("John")

newDepartment.printEmployeeInformation();