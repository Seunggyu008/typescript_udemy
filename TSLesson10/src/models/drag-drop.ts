//Drag & Drop
    export interface Draggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }
    
    export interface DragTarget {
        //permits the drop
        dragOverHandler(event: DragEvent): void
        //handle the drop
        dropHandler(event: DragEvent): void
        //gives visual feedback when a drop is happening
        dragLeaveHandler(event: DragEvent): void
    }

