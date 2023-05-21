// all DOM Elements
const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const closeBtn = document.getElementById('close');
const toggleBtn = document.getElementById('toggle');

// Voice Data
const data = [
    {
      image: './img/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: './img/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: './img/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: './img/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: './img/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: './img/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: './img/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: './img/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: './img/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: './img/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: './img/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: './img/grandma.jpg',
      text: 'I Want To Go To Grandmas'
    }
  ];


// Create boxes
data.forEach(createBox);

function createBox(item){
    const box = document.createElement('div');
    const {image,text} = item;

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;

    // speak event
    box.addEventListener('click', ()=>{
        setTextMessage(text);
        speakText();
        box.classList.add('active');
        setTimeout(function(){
            box.classList.remove('active');
        },800)
    })

    main.appendChild(box);
}

// Init speech synthesis
const message = new SpeechSynthesisUtterance();

// Store Voices
let voices = [];

function getVoices(){
    voices = speechSynthesis.getVoices();
    voices.forEach(voice=>{
        // Build an option for each voice
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voiceSelect.appendChild(option);
    })
}

// Set text
function setTextMessage(text){
    message.text = text;
}
// Speak text
function speakText(){
    speechSynthesis.speak(message)
}

// Set Voice
function setVoice(e){
  message.voice = voices.find((voice)=> voice.name === e.target.value);
}

/* %%%%% Event Listeners %%%%% */

// voices change
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle Button
toggleBtn.addEventListener('click', ()=> {
  document.getElementById('text-box').classList.toggle('show');
  // Clear the text
  setTimeout(()=>textarea.value = "",1000);
});
// Close Button
closeBtn.addEventListener('click', ()=>{
   document.getElementById('text-box').classList.remove('show');
   // Clear the text
   setTimeout(()=>textarea.value = "",1000);
  });

// Select list
voiceSelect.addEventListener('change', setVoice)

// Read Text Button
readBtn.addEventListener('click', ()=>{
  setTextMessage(textarea.value);
  speakText();
})

// Init voices
getVoices();

