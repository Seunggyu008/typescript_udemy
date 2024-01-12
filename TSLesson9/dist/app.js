"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//autobind decorator
function AutoBind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
//ProjectInput Class
let ProjectInput = class ProjectInput {
    constructor() {
        /*
        const templateEl = document.getElementById('project-input') as HTMLTemplateElement;
        if(templateEl) {
            this.templateEl = templateEl;
        } */
        this.templateEl = document.getElementById('project-input');
        this.hostEl = document.getElementById("app");
        //content property provides reference to the content of the template
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputEl = this.element.querySelector('#title');
        this.descriptionInputEl = this.element.querySelector('#description');
        this.peopleInputEl = this.element.querySelector('#number');
        this.configure();
        this.attach();
    }
    submitHandler(event) {
        //prevent default form submission which triggers HTTP request
        event.preventDefault();
        //this is bind to the current target of the event
        console.log(this.titleInputEl.value);
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }
    attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
    }
};
ProjectInput = __decorate([
    AutoBind
], ProjectInput);
const prjInput = new ProjectInput();
