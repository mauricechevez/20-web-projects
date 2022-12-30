/* Global Variables */
const toggleBtn = document.getElementById('toggle');


/* 👂👂👂  Event Listeners 👂👂👂 */
toggleBtn.addEventListener('click', ()=>{
    document.getElementsByTagName('nav')[0].style.transform = "translateX(0)";
    // modal.style.transform = "translateX(100%)";
})