// DOM elements
const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number: ' + randomNum)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
recognition.maxAlternatives = 2;
recognition.interimResults = true;

// Start Recognition
recognition.start();

/* FUNCTIONS */
function getRandomNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

// Write message to page
function writeMsg(message){
    msgEl.innerHTML = `
    <div>You said:</div>
        <span class="box">${message}</span>
    `
}

// Check the message against the number;
function checkNumber(message){
    const num = +message;
    // Check if valid number
    if(Number.isNaN(num)){
        msgEl.innerHTML = `<div>That is not a valid number</div>`;
        return;
    }

    if(num > 100 || num < 1){
        msgEl.innerHTML = `<div>Number must be between 1 - 100</div>`;
        return;
    }

    // Checking for a match
    if(num === randomNum){
        document.body.innerHTML = `
        <h2>congrats! You have guessed the number <br><br>
        It was ${num}
        </h2>
        <button class="play-again" id="play-again" >Play Again</div>
        `;
        recognition.stop();
    } else if(num > randomNum){
        msgEl.innerHTML += `<div>Go Lower!</div>`
    } else {
        msgEl.innerHTML += `<div>Go Higher!</div>`
    }
}

function onSpeak(e){
    console.log(e.results[0][0])
    const msg = e.results[0][0].transcript;
    writeMsg(msg);
    checkNumber(msg);
}

/* 🎧🎧🎧 Event Listeners 🎧🎧🎧  */

// Speak result
recognition.addEventListener('result',onSpeak);

// End SR service
recognition.addEventListener('end', ()=> recognition.start());

// Button event 
document.body.addEventListener('click', (e)=>{
    if(e.target.id === 'play-again'){
        window.location.reload();
    }
})