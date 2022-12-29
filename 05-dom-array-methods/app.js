const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaresBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

/* Functions */

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];
    // console.log(user.name.first)
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addUser(newUser);
}

function doubleMoney(){
    data = data.map(user => {
        return {...user, money: user.money * 2}
    })
    updateDOM();
}

function sortByRichest(){
    data = data.sort((a,b)=> {
        return b.money - a.money;
    })
    updateDOM();
}

function showOnlyMillionares(){
    // Check if any millionares exist:
    if(data.every(isBelowThreshold)){
        alert('No millionaire exist')
    } else {
        data = data.filter(user =>{
        return user.money > 1000000;
    })
    updateDOM();
    }
}

function calculateWealth(){
    const initialValue = 0;
    const wealthTotal = data.reduce((accumulator, currentItem) => (accumulator + currentItem.money), initialValue)
    
    // Add to the DOM
    const totalWealthEl = document.createElement('div');
    totalWealthEl.innerHTML = `<h3><strong>Total Wealth</strong> ${formatMoney(wealthTotal)}</h3>`;
    main.appendChild(totalWealthEl);
}

// Used for the every() method
function isBelowThreshold(value){
  return value.money < 1000000;
}

function addUser(obj){
    data.push(obj);
    updateDOM()
}

function updateDOM(providedData = data){
    // Clear the main div
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
    providedData.forEach(data =>{
        const element = document.createElement('div');
        element.className = 'person';
        element.innerHTML = `<strong>${data.name}</strong> ${formatMoney(data.money)}`;
        main.appendChild(element)
    })
}

function formatMoney(number){
    const formatter = new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD'
    })
    return formatter.format(number);
}

/* 👂 Event Listeners 👂 */
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionaresBtn.addEventListener('click',showOnlyMillionares);
calculateWealthBtn.addEventListener('click',calculateWealth);

getRandomUser()
getRandomUser()
getRandomUser()
/* END of Functions */