function Log(target: any, propertyName: string) {
    console.log('Property Decorator is printed below');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accessor Decorator is printed below");
    console.log(target);
    console.log(name);
    console.log(descriptor);
    
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log("Method Decorator is printed below");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}  

function Log4(target: any, name: string | Symbol, position: number) {
    console.log("Parameter Decorator is printed below");
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    //adding decorator to a property, decorator accepts two properties
    //one is the target, and the second is the propertyname
    @Log
    title: string;
    private _price: number;


    @Log2
    set price(val: number) {
        if(val > 0) {
            this._price = val;
        } else {
            throw new Error("Invalid Price - shoudl be positive");
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}