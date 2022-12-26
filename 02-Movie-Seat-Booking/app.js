/* Global Variables */
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const totalPrice = document.getElementById('total');
const movieSelection = document.getElementById('movie');
// + can be substituted for parseInt(). ex: +movieSelection.value

populateUI()

// This had to move down because we populate the UI first, then let this grab the value (Movie ticket price)
let ticketPrice = parseInt(movieSelection.value);
/* END Global Variables */

/* Functions */
//Save Selected movie index and price
function setMovieData(index,price){
    // No need for stringify here as we just have 2 values.
    localStorage.setItem('selectedMovieIndex',index);
    localStorage.setItem('selectedMoviePrice',price);
}

// Update total seat count
function updateSelectedCount(){
     // get number of selected seats
     const selectedSeats = document.querySelectorAll('.container .selected');
    // Copy selected seats to an array
    // map through array
    // return a new array of indexes
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat)
    })
    // Send to LocalStorage
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex))
    
    count.textContent = selectedSeats.length;
     // Ticket Price Calculation
    totalPrice.textContent = selectedSeats.length * ticketPrice;
}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    // Check to see if anything is in selectedSeats
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }
    // Selected Movie dropdown
    if(selectedMovieIndex !== null){
        movieSelection.selectedIndex = selectedMovieIndex;
    }
}
/* End of Functions */

/* 👂 Event Listeners👂 */
container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
})

movieSelection.addEventListener('change', (e)=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, +e.target.value);
    updateSelectedCount();
})

// On Page Load. Initial count and total
updateSelectedCount();