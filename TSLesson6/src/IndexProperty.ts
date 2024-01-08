interface ErrorContainer { 
    // { email: 'Not a valid email', username: 'Must Start With a character' }
    //this means that every property added to this object must be interpreted as string, 
    //and the value must be string as well
    //this is called index type.
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    notValidEmail: 'Not a valid Email',
    notValidUsername: 'Not a valid Username'
};

//alternative for React.js
//add "! as (type)" behind the selector. 
//const input1 = document.getElementById('user-input')! as HTMLInputElement
input1.value = 'Hi there!';
