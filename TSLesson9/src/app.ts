//autobind decorator
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
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
@AutoBind
class ProjectInput {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    element: HTMLFormElement;
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;
 
    constructor () {
        /* 
        const templateEl = document.getElementById('project-input') as HTMLTemplateElement;
        if(templateEl) {
            this.templateEl = templateEl;
        } */
        this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostEl = document.getElementById("app")! as HTMLDivElement;


        //content property provides reference to the content of the template
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputEl = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputEl = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputEl = this.element.querySelector('#number') as HTMLInputElement;


        this.configure();
        this.attach();
    } 

    private submitHandler(event: Event) {
        //prevent default form submission which triggers HTTP request
        event.preventDefault();
        //this is bind to the current target of the event
        console.log(this.titleInputEl.value);
    }

    private configure() {
        this.element.addEventListener(
            'submit', this.submitHandler.bind(this)
        )
    }

    private attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
    }
}

const prjInput = new ProjectInput();