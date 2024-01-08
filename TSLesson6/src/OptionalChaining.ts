const fetchedUserData = {
    id: 'u1',
    name: 'max',
    job: { title: "CEO", description: 'My Own Company' }
};

console.log(fetchedUserData?.job?.title);

const userInput = undefined;

const storedData = userInput ?? 'DEFAULT';

console.log(storedData);