interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[] // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    }
}

function PositiveNumber(target: any, propName: string | number) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}

function Validate(obj: any) {
    //constructor exists on prototype of obj property
    //allowing us to have access to constructor property directly through obj property
    //through prototype chain
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if(!objValidatorConfig) {
        return true;
    }
    let isValid = true;
        for (const prop in objValidatorConfig) {
            
            for (const validator of objValidatorConfig [prop]) {
                switch(validator) {
                    case 'required':
                        isValid = isValid && !!obj[prop];
                    case 'positive':
                        isValid = isValid && obj[prop] > 0;
                }
            }
        }
        return isValid;
}

class Course {
    @Required 
    title: string;

    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

//adding ! would tell typescript that there WILL be a value, and it wont be null
const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    
    if(!Validate(createdCourse)) {
        alert('Invalid Input, please try again');
        return;
    }

    console.log(createdCourse);
})

