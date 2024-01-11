function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        //this would refer to whatever is triggering this getter method
        //this getter method will triggered by concrete object to which it belongs
        //therefore, this would point to the object that defined the getter,
        //preventing this from getting overwritten.
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works';

   /*  constructor(message: string) {
        this.message = message;
    } */
    
    @AutoBind
    showMessage() {
        //this
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

//when pointed method is evoked in eventListener,
//addEventListener binds the event that evoked the eventListener