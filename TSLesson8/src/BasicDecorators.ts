//decorators usually start with uppercase, but not required
//function Logger(constructor: Function) {
function Logger(logString: string){
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    //underscore is used to tell typescript that we are aware something of type function is returned
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}

//decorators can be used by using @
//decorators executed when class is defined, not when instantiated
//@Logger('LOGGING - PERSON')
@WithTemplate('<h1>Hello Friend</h1>', 'app')
class Person {
    name = 'Max'

    constructor() {
        console.log('Creating person object...')
    }
}

const pers = new Person();


