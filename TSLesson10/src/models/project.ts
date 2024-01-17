
     //Project Status enum
     export enum ProjectStatus { ACTIVE, FINISHED }

     //Project Type
     export class Project {
         constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {}
     }
 
