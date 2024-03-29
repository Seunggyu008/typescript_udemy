import { Component } from "../components/base-components.js";
import { AutoBind } from "../decorators/autobind.js";
import { Draggable } from '../models/drag-drop.js';
import { Project } from "../models/project.js";


     //Project Item Class
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
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
