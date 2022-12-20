/* Global Variables */
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordVerify = document.getElementById('password-verify');
const submit = document.getElementById('submit');

/* ⚡️ Functions ⚡️ */
function showError(element,message){
    const formControl = element.parentElement;
    formControl.className = `form-control error`;
    // Edit the message
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(element){
    const formControl = element.parentElement;
    formControl.className = `form-control success`;
}

// 👂 Event Listener 👂
form.addEventListener('submit', function(e){

    // Validate Username
    if(username.value === ""){
        showError(username,'Username is missing');
    } else {
        showSuccess(username);
    }
    e.preventDefault()
})
