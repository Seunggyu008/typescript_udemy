//Drag & Drop
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    //permits the drop
    dragOverHandler(event: DragEvent): void
    //handle the drop
    dropHandler(event: DragEvent): void
    //gives visual feedback when a drop is happening
    dragLeaveHandler(event: DragEvent): void
}

//Project Status enum
enum ProjectStatus { ACTIVE, FINISHED }

//Project Type
class Project {
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {}
}

//Listener Type
type Listener = (items: Project[]) => void;

//Project State Management
class ProjectState {
    private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {

    }

    static getInstance() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.ACTIVE);
        this.projects.push(newProject);

        for(const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

    //switch the status of the project when dragged to the finished project
    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if(project && project.status != newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for(const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

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

//Component Base Class
//make it abstract to prevent direct instantiation
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    hostEl: T;
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateEl = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostEl = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as U;
        if(newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }

    private attach(insertAtBeginning: boolean) {
        this.hostEl.insertAdjacentElement(insertAtBeginning ? `afterbegin` : 'beforeend', this.element)
    }

    abstract configure?(): void;

    abstract renderContent(): void;
}

//Project Item Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
    private project: Project;

    get persons() {
        if(this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} people`
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @AutoBind
    dragStartHandler(event: DragEvent) {
        //attaches data to a drag event
        event.dataTransfer!.setData('text/plain', this.project.id);
        //adds effect to an mouse movement which enhances visual indication of mouse movement
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent) {
        console.log("DragEnd")
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }


    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

//ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
    assignedProjects: Project[];

        constructor(private type: 'active' | 'finished') {
            super(
                'project-list',
                'app',
                false,
                `${type}-projects`
            );
            this.assignedProjects = [];
            
            this.configure();
            this.renderContent();
        };

        @AutoBind
        dragOverHandler(event: DragEvent) {
            if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                //default in javascript is to prevent dragging. Therefore, preventdefault
                //allows drop to occur
                event.preventDefault();
                const listEl = this.element.querySelector('ul')!;
                listEl.classList.add('droppable');
            }
        }

        @AutoBind
        dropHandler(event: DragEvent) {
           const prjId = event.dataTransfer!.getData('text/plain');
           projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
        }

        @AutoBind
        dragLeaveHandler(_: DragEvent) {
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('droppable');
        }

        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
            projectState.addListener((projects: Project[]) => {
                //filter() method executes on every item on prj item, 
                //when it returns true, it stores the item in a new array
                //and drops items that returned false
                const relevantProjects = projects.filter(prj => {
                    if(this.type === 'active') {
                        return prj.status === ProjectStatus.ACTIVE;
                    } else {
                        return prj.status === ProjectStatus.FINISHED;
                    }
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        };

         renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul')!.id = listId;
            this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
        };

        private renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
            listEl.innerHTML = '';
            for (const prjItem of this.assignedProjects) {
                new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
            }
        };
}

//ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;
 
    constructor () {
        super(
            'project-input',
            'app',
            true,
            'user-input'
        );

        this.titleInputEl = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputEl = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputEl = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    } 

    configure() {
        this.element.addEventListener(
            'submit', this.submitHandler
        );
    }

    renderContent() {
    };


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
            projectState.addProject(title, desc, people);
            console.log(title, desc, people);
        }
    }


}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');