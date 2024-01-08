//by marking abstract, Department class cannot be instantiated directly, 
//and only its sub-classes can be instantiated by following a strict set of rules;
abstract class Department {
    static fiscalYear = 2020;
    //private readonly id: string;
    //private name: string;
    //protected keyword is a keyword in typescript that allows us to access employees variable 
    //within its subclasses. 
    protected employees: string[] = [];


    constructor(protected readonly id: string, public name: string) {
        //this.id = id
        //this.name = name
        console.log(Department.fiscalYear);
    }

    static createEmployee(name: string) {
        return { name: name };
    }

    //this being passed as parameter gives hint to what "this" should be referred to
    //therefore, defining type as Department will instruct that "this" should be 
    //instance of Department, not any other instance.


    abstract describe(this: Department): void; 
        //name would not be printed as it will only refer to a property within describe() method
        //or it would find "name" proerty in global scope.
        //this case "name" does not throw error because there exists a constant with "name" in global scope.

        //therefore, "this" keyword can be used to point to an instance of the class below.
        //console.log(`Department (${this.id}): ${this.name}`);
    

    addEmployee(employee: string) {
        // validation etc
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}  

class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        //using super calls the constructor of base class, inside the sub-class.
        super(id, "IT");
        //super needs to be called first, before adding another property
        this.admins = admins;
    }

    describe (){
        console.log('IT Department - ID: ' + this.id);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    //get method requires return statement
    get mostRecentReport () {
        if(this.lastReport) {
            return this.lastReport;
        } 
        throw new Error("No report found!!!");
    }

    set mostRecentReport(value: string) {
        if(!value) {
            throw new Error("Please pass in a new value")
        }
        this.addReport(value);
        
    }

    //private keyword ensures no instance can be created outside the class
    
    private constructor(id: string, public reports: string[]) {
        super(id, "Accounting");
        this.lastReport = reports[0];
    }

    static getInstance() {
        if(AccountingDepartment.instance) {
            return this.instance;
        }
        //this code can only be ran once
        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    }

    describe() {
        console.log("Accounting Department - ID: " + this.id);
    }


    addEmployee(name: string): void {
        if(name === 'Max') {
            return;
        } 
        this.employees.push(name)
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

//let newDepartment = new Department("d1", "Big Store");
let newITDepartment = new ITDepartment("d2", ["Lucy"])
//let newAccountingDepartment = new AccountingDepartment("d3", []);
let newAccountingDepartment = AccountingDepartment.getInstance();

newAccountingDepartment.mostRecentReport = "Year End report";

//getter is executed without ();
console.log(newAccountingDepartment.mostRecentReport);


newAccountingDepartment.addReport("Something went wrong");


newAccountingDepartment.addEmployee("Max");
newAccountingDepartment.addEmployee("Seunggyu");

newAccountingDepartment.describe();


//newAccountingDepartment.printReports();


/* newDepartment.describe();
console.log(newITDepartment);
console.log(newAccountingDepartment);

//this will output "undefined" because this would point out to accountingCopy instance 
//which have no "name" property.

//Add name property in order to show that "this" in accountingCopy should point to 
//name property in accountingCopy.
const accountingCopy = {  name: 'DUMMY', describe: newDepartment.describe };


newDepartment.addEmployee("John")

newDepartment.printEmployeeInformation(); */