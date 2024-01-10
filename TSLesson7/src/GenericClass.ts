class DataStorage <T extends string | number | boolean> {
    //union types way:
    //private data: (string | number | boolean) [] = [];
    //subsequently change T into string | number | boolean 
    //however, Union accepts every type of values
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if(this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // -1
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string> ();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();



/* const objStorage = new DataStorage<object>();
const maxObj = {name: 'Max'};

objStorage.addItem({name: "Max"});
objStorage.addItem({name: "Manu"});
objStorage.removeItem(maxObj);
console.log(objStorage.getItems()); */