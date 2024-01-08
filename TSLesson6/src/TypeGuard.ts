//type guard
class Car {
    drive() {
        console.log("Driving...");
    }
}

class Truck {
    drive() {
        console.log("Driving a truck...")
    }

    loadCargo(amount: number) {
        console.log('Loading cargo...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    //type guard case 1
    /* if('loadCargo' in vehicle) {
        vehicle.loadCargo(1000);
    } */

    //type guard case 2
    //instanceof is an normal operator from vanila javascript 
    //but instanceof is not usable with interfaces, as interfaces are not understood by Javascript
    if(vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);




//type guard case 3 (accessing DOM element)
const paragraph = document.querySelector('p');

//by using <> and specifying type of element inside the <>, we can tell typescript what type is the element is
const input1 = <HTMLInputElement>document.getElementById('user-input');

if(input1) {
    (input1 as HTMLInputElement).value = 'Hi there!';
}

