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

const correctLetters = [];
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
// Update the Wrong Letters
function updateWrongLettersEl(){
    console.log('Update wrong letters')
}

// Show Notification
function showNotification(){
    notification.classList.add('show')
    setTimeout(function(){
        notification.classList.remove('show')
    },3000)
}

// Keydown letter press
window.addEventListener('keydown', e=>{
    const keyPressed = e.code;
// If Key pressed is a letter, do something.
    if(keyPressed.search("Key") === 0){
        // add the actual key pressed to a variable to match later
        const letter = e.key;
        if(selectedWord.includes(letter)){
            // Check if letter already exists in our correctLetters array
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord()
            } else {
                // Show user the letter they pressed already exists / was used.
                showNotification()
            }
        } else {
           if(!wrongLetters.includes(letter)){
            // Push letter to the wrongLetters array, but prevent the same wrong letter
            // from being added to the array
                wrongLetters.push(letter)
                updateWrongLettersEl()
           } else {
                showNotification()
           }
        }
    }
})

// init
displayWord()
