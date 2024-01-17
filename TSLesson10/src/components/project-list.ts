import { Component } from "../components/base-components.js";
import { AutoBind } from "../decorators/autobind.js";
import { Project, ProjectStatus } from "../models/project.js";
import { DragTarget } from "../models/drag-drop.js";
import { projectState } from "../state/project-state.js";
import { ProjectItem } from "./project-item.js";


    //ProjectList Class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
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
