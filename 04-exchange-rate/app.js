/* Global Variables */
const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rate_el = document.getElementById('rate');
const swapBtn = document.getElementById('swap');
/* END of Global Variables */

// Fetch Exchange Rate and update the DOM
function calculate(){
    const currency_one = currencyOne.value;
    const currency_two = currencyTwo.value;
    fetch(`https://v6.exchangerate-api.com/v6/[REDACTED]/latest/${currency_one}`)
    .then(res =>{
        return res.json();
    })
    .then(data =>{
        // Get value from conversion rate, using variable 2 as an index
        const rate = data.conversion_rates[currency_two];
        // Change the rate index text
        rate_el.innerHTML = `1 ${currencyOne.value} = ${rate} ${currencyTwo.value}`
        // Populate the second currency value
        amountTwo.value = (amountOne.value * rate).toFixed(2);
    })
}

// Event Listeners
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);

swapBtn.addEventListener('click',()=>{
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();

})

// Init
calculate()