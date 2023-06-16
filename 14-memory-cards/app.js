// Document Object Model selectors
const cardsContainer = document.getElementById('card-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM Cards
const cardsEl = [];


// Store card data
const cardsData = getCardsData();
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Give an example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// Create all cards

// Clear button disabled if cardsEl is empty
  cardsData.length === 0 ? clearBtn.disabled = true : clearBtn.disabled = false; 
cardsData.length === 0 ? console.log("disable the button") : console.log("NOT Empty");


function createCards(){
    cardsData.forEach((data,index) => createCard(data,index));
}

// Create a single card in the DOM
function createCard(data,index){
    const card = document.createElement('div');
    card.classList.add('card');
    if(index === 0){
        card.classList.add('active');
    }
    card.innerHTML = `
    <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
    </div>
    `;
    
    card.addEventListener('click',()=>{
        card.classList.toggle('show-answer');
    })

    // add to DOM card
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

// show number of cards
function updateCurrentText(){
    currentEl.innerText = `${ currentActiveCard +1 } / ${cardsEl.length}`
}

// Gets cards from local storage
function getCardsData(){
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Write cards TO local storage
function setCardsData(cards){
  localStorage.setItem('cards', JSON.stringify(cards));
  // reload page
  window.location.reload();
}

// Clear all cards
function clearCards(){
  console.log('cleared!')
  // Clear local storage
  localStorage.clear();
  // clear questions from DOM
  cardsContainer.innerHTML = '';
  // reload page
  window.location.reload();
}

// init
createCards();

// 🎧 Event Listeners 🎧
nextBtn.addEventListener('click', ()=>{
  // hide the card to the left
  cardsEl[currentActiveCard].className = 'card left';
  // get new card index
  currentActiveCard = currentActiveCard + 1;

  if(currentActiveCard > cardsEl.length -1){
    // Always keep the current active card as the last one
    currentActiveCard = cardsEl.length - 1;
  } 
  cardsEl[currentActiveCard].className = 'card active';
  // Show number of cards
  updateCurrentText();
})

prevBtn.addEventListener('click', ()=>{
  // hide the card to the right
  cardsEl[currentActiveCard].className = 'card right';
  // get new card index
  currentActiveCard = currentActiveCard - 1;

  if(currentActiveCard < 0 ){
    // Always keep the current active card as the last one
    currentActiveCard = 0;
  } 
  cardsEl[currentActiveCard].className = 'card active';
  // Show number of cards
  updateCurrentText();
})

showBtn.addEventListener('click',()=>{
  addContainer.classList.add('show');
  // Focus on question
  questionEl.focus();
});

hideBtn.addEventListener('click', ()=>addContainer.classList.remove('show'))

addCardBtn.addEventListener('click', ()=>{
  const question = questionEl.value;
  const answer = answerEl.value;
  if(question.trim() && answer.trim()){
    const newCard = {question: question, answer: answer};
    createCard(newCard);
    questionEl.value = '';
    answerEl.value = '';
    // Hide add container
    addContainer.classList.remove('show');
    // Add card to cards data array
    cardsData.push(newCard);
    // Add card to Local Storage
    setCardsData(cardsData);
  }
})

clearBtn.addEventListener('click', ()=>{
  if(confirm('Delete all the cards?')){
    clearCards();
  }
})