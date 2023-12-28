"use strict";
const button = document.querySelector('button');
function clickHandler(message) {
    let userName = 'Max';
    console.log("Clicked");
}
if (button) {
    button.addEventListener('click', clickHandler.bind(null, "You're welcome"));
}
