/* type Admin = {
    name: string;
    privileges: string;
}; */

//interface를 사용하던, type를 사용하던

interface Admin {
    name: string;
    privileges: string[];
};

/* type Employee = {
    name: string;
    startDate: Date;
}; */

interface Employee {
    name: string;
    startDate: Date;
};

interface ElevatedEmployee extends Employee, Admin {

}

//type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()

}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

