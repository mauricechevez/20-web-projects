/* Global Variables */
const toggleBtn = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');


/* 👂👂👂  Event Listeners 👂👂👂 */
toggleBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('show-nav');
})
// Hide the modal
close.addEventListener('click',()=>{
    modal.classList.toggle('show-modal');
})

// Show the modal
open.addEventListener('click',()=>{
    modal.classList.toggle('show-modal');
})

// Hide modal on outside region (opaque)
window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal') : false)