const draggableElements = document.querySelectorAll('.draggable');
const droppableElements = document.querySelectorAll('.droppable');

draggableElements.forEach(draggable =>{
    draggable.addEventListener('dragstart', dragStart);
    // draggable.addEventListener('drag', drag);
    // draggable.addEventListener('dragend',dragEnd);
})

droppableElements.forEach(droppable =>{
    droppable.addEventListener('dragenter', dragEnter);
    droppable.addEventListener('dragover', dragOver);
    droppable.addEventListener('dragleave', dragLeave);
    droppable.addEventListener('drop', drop);
})

// Drag and Drop functions
function dragStart(event){
    if(!event.target.classList.contains("dragged")){
        // event.dataTransfer.setData("text",event.target.style.color)
        event.dataTransfer.setData('text', event.target.id);
    }
}

function dragEnter(e){
    if(!e.target.classList.contains("dropped")){
        // add the class droppable-hover to the target
        e.target.classList.add('droppable-hover');
    }
}

function dragLeave(e){
    e.target.classList.remove('droppable-hover');

}

function dragOver(e){
    // Prevent the default behavior of redirecting the browser to the source image/whatever you dropped
    e.preventDefault();
}

function drop(e){
    e.preventDefault();
    e.target.classList.remove('droppable-hover');
    const draggableElementData = e.dataTransfer.getData("text")
    // Get the ID from the dropped item
    const droppableElementData = e.target.getAttribute("data-draggable-id");
    // If match the ID of dragged element matches data-draggable-id
    if(draggableElementData == droppableElementData){
        e.target.classList.add("dropped");
        const draggableElement = document.getElementById(draggableElementData);
        // This approach only works with inline-styling
        e.target.style.backgroundColor = draggableElement.style.color;
        // If finding the color from CSS file, use the following:
        // e.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
        draggableElement.classList.add("dragged");
        draggableElement.setAttribute('draggable','false')
        e.target.insertAdjacentHTML("afterbegin",`<i class="fas fa-${draggableElementData}"></i>`);
    }

}