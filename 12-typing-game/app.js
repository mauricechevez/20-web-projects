// All DOM elements required
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsEl = document.getElementById('settings');
const settingsBtn = document.getElementById('settings-btn');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// On page load, focus on the text input
text.focus();

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];

  // initialize word
  let randomWord;
  // init score
  let score = 0;
  // init time
  let time = 10;
  // init timer for difficulty setting
  let diffTimer = 7;
  // Set Difficulty
  let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
  // Set Difficulty value
  difficultySelect.value = difficulty

  // Start counting down for the game
const timeInterval = setInterval(function(){
  timeEl.innerHTML = time + 's';
  time--;
  
  if(time == 0){
    clearInterval(time);
    // End game
    gameOver();
  }
},1000)

// Generate random word from the array
  function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
  }
  
// Add Word to DOM
  function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
  }
addWordToDOM();

// Update the score
  function updateScore(){
    score++;
    scoreEl.innerHTML = score;
  }

// Game Over, show end screen
function gameOver(){
  endgameEl.innerHTML = `
  <h1>Time Ran out </h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = 'flex';
}

// Timer for Difficulty container
/* This hides the difficulty banner at the top of the page
at an automatic interval.
*/
function startDifficultyDivTimer(){
  const difficultySelectInterval = setInterval(function(){
    diffTimer--;
    console.log(diffTimer)
    if(diffTimer == 0){
      clearInterval(difficultySelectInterval)
      // hide the element
      settingsEl.classList.toggle('hide');
    }
  },1000)
}
startDifficultyDivTimer();


// Event Listeners
text.addEventListener('input', e=>{
    const insertedText = e.target.value;
    
    if(insertedText === randomWord){
        addWordToDOM()

        updateScore();
        // Clear the input
        text.value = "";

        // Append time based on diffuculty
        if(difficulty == 'hard'){
          time += 2;
        } else if(difficulty == 'medium'){
          time += 3;
        } else {
          time += 5;
        }
    }
})

// Settings button click

settingsBtn.addEventListener('click',()=>{
  settingsEl.classList.toggle('hide');
  // Restart the interval for the top div
  diffTimer = 7;
  startDifficultyDivTimer()
})

// Settings select
settingsForm.addEventListener('change',(e)=>{
  difficulty = e.target.value;
  localStorage.setItem('difficulty',difficulty)
})

// Changing the timer value for entering the settings area
settingsEl.addEventListener('mouseenter',()=>{
  diffTimer = 100;
})
// Changing the timer value for exiting the settings area
settingsEl.addEventListener('mouseleave',()=>{
  diffTimer = 7;
})