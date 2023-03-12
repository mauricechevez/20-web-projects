# Expense Tracker

## Dummy Data
To begin this project, we use dummy data to simulate what will come in from Local Storage. Here is the data

```js
const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];
```
The dummy data is stored in a global state-like variable called `transactions`. This will be used later by the data from Local Storage
```js
// Global State for transactions
let transactions = dummyTransactions;
```


## History Section (List Items)
To grab the list items and display in the DOM, the following function is called on.

```js
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

```

## Initialization
When the app is opened, it will run the `init()` function to begin processing the list items

**Using Dummy Data**
```js
// Init app
function init(){
    list.innerHTML = ``;
    // Run through the transaction items and display in the DOM
    transactions.forEach(transaction =>{
        addTransactionDOM(transaction)
    })
}
init();
```

**Using Local Storage**
```js
// Placeholder for code here
```