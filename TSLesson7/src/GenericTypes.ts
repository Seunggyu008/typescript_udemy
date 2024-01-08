//generic types are types that are connected to another types
const names: Array<string> = []; // string[]
names[0].split(' ');

//types can be described in Promise and determine what type of data it yields.
const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(()=> {
        resolve('This is done')
    }, 2000);
});

promise.then(data => {
    data.split(' ');
})


