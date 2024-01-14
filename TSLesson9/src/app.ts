//Validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function Validate (validatableInput: Validatable) {
    let isValid = true;
    if(validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }

    if(validatableInput.minLength && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }

    if(validatableInput.maxLength && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }

    if(validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value > validatableInput.min;
    }

    if(validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value < validatableInput.max;
    }

    return isValid;
}

//autobind decorator
function AutoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}


//ProjectInput Class
class ProjectInput {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    element: HTMLFormElement;
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;
 
    constructor () {
        this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostEl = document.getElementById("app")! as HTMLDivElement;


        //content property provides reference to the content of the template
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputEl = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputEl = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputEl = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach();
    } 


    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputEl.value;
        const enteredDescription = this.descriptionInputEl.value;
        const enteredPeople = this.peopleInputEl.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
        };

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };

        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        if(
            !Validate(titleValidatable) ||
            !Validate(descriptionValidatable) ||
            !Validate(peopleValidatable) 
        ) {
            alert('Invalid input, please try again');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    @AutoBind
    private submitHandler(event: Event) : void {
        //prevent default form submission which triggers HTTP request
        event.preventDefault();

        //this is bind to the current target of the event
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
        }
    }

    private configure() {
        this.element.addEventListener(
            'submit', this.submitHandler
        );
    }

    private attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
    }
}

const prjInput = new ProjectInput();