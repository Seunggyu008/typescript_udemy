import { Component } from "../components/base-components.js";
import { Validatable, Validate } from "../util/validation.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

    //ProjectInput Class
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
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
