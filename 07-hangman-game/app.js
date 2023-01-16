const wrongLettersEl = document.getElementById('wrong-letters');
const wordEl = document.getElementById('word');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const notification = document.getElementById('notification-container');

// Parts
document.querySelectorAll('.figure-part');
// Word Selection
const word = ['application', 'programming', 'wizard','javascript'];
let selectedWord = word[Math.floor(Math.random() * word.length)];

const correctLetters = ['w','i','z','a','r','d'];
const wrongLetters = [];
// FUNCTIONS
function displayWord(){
    wordEl.innerHTML = `${selectedWord
        .split('')
        .map(letter => `<span class="letter">
        ${correctLetters.includes(letter)? letter : ''}
        </span>`)
        .join('')
    }`;

    // Check if word element matches the selectd word
    const innerWord = wordEl.innerText.replace(/\n/g,"")
    
    if(innerWord === selectedWord){
        finalMessage.innerText = 'You have won! 😀 ';
        popup.style.display = 'flex';
    }

}



// init
displayWord()
