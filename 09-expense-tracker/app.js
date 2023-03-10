// Required Elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Dummy Transactions (For Now!)
const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

// Global State for transactions
let transactions = dummyTransactions;

// Display transactions inside of history
function addTransactionDOM(transaction){
    // Get the sign
    const sign = transaction.amount < 0 ? '-':'+';
    const item = document.createElement('li');
    // Add class based on value;
    item.classList.add(transaction.amount < 0 ? 'minus':'plus' );
    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn">x</button>
    `
    list.appendChild(item);
}

function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add text and amount');

    } else{
        const transaction = {
            id:generateID(),
            text:text.value,
            amount: Number(amount.value)
        }
        console.log(transaction)
        // Add latest transaction to the list in DATA
        transactions.push(transaction)
        addTransactionDOM(transaction);
        updateValues();
        text.value = ``;
        amount.value = ``;
        text.focus();
    }
}

// Generate a random ID
function generateID(){
    return Math.floor(Math.random() * 100000000);
}

// Update balance, income and expense
function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((accumulator, item)=>(accumulator += item), 0).toFixed(2);
    
    // Any positive number
    const income = amounts.filter(item => item > 0).reduce((accumulator,item )=>(accumulator += item),0).toFixed(2);

    // Any negative number
    const expense = (amounts
            .filter(item => item < 0)
            .reduce((accumulator,item) => (accumulator += item),0) *
             -1).toFixed(2);

    // Insert values to the DOM
    balance.innerText = `$${total}`;
    money_plus.innerText = `+$${income}`;
    money_minus.innerText = `-$${expense}`;
}

// Init app
function init(){
    list.innerHTML = ``;
    // Run through the transaction items and display in the DOM
    transactions.forEach(transaction =>{
        addTransactionDOM(transaction)
    })
    updateValues();
}
init();

// Add transactions
form.addEventListener('submit',addTransaction)

// Delete transaction