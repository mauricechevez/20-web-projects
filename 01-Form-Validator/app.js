/* Global Variables */
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordVerify = document.getElementById('password-verify');
const submit = document.getElementById('submit');

// Event Listener
form.addEventListener('submit', function(e){
    console.log('hello');

    e.preventDefault()
})
