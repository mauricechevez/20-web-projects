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
function checkEmail(element){
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // return re.test(String(element).toLocaleLowerCase())
    console.log(re.test(element.value))
    if (re.test(element.value)) {
        showSuccess(element)
    } else {
        showError(element,`Not a valid email`)
    }
}
// Capitalize the first letter of the element name
function getFieldName(element){
    return element.id.charAt(0).toUpperCase() + element.id.slice(1);
}
// Check for rquired fields
function checkRequiredFields(elementArray){
    elementArray.forEach(element => {
        if(element.value.trim() === ""){
            showError(element,`${getFieldName(element)} is required.`)
        } else{
            showSuccess(element)
        }
    }
)}
// Check if Passwords match
function checkPasswordsMatch(element1,element2){
    if (element1.value != element2.value ) {
        showError(element2,`Passwords do not match.`)
    } else {
        showSuccess(element2)
    }
}

// Check field length reqirements
function checkLength(element,min,max){
    if(element.value.length < min ){
        showError(element,`${getFieldName(element)} must be larger than ${min} characters`)
    } else if(element.value.length > max){
        showError(element,`${getFieldName(element)} must be less than ${max} characters`)
    } else {
        showSuccess(element)
    }
}

// 👂 Event Listener 👂
form.addEventListener('submit', function(e){
    // pass in all the required fields
    checkRequiredFields([username,email,password,passwordVerify])
    checkLength(username,3,15)
    checkLength(password,6,15)
    checkEmail(email)
    checkPasswordsMatch(password,passwordVerify)
    e.preventDefault()
})
