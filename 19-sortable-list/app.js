const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];
// Store the list items
const listItems = [];

// Keep track of items
let dragStartIndex;

// init
createList();
addEventListeners();

// Check if items are in correct order
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();
    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong-answer');
      listItem.lastElementChild.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong-answer');
      listItem.lastElementChild.classList.remove('wrong');
      listItem.classList.add('right-answer');
      listItem.lastElementChild.classList.add('right');
    }
  });
}

// Insert list items into the DOM
function createList() {
  // spread operator will create a copy of the original, in this case
  [...richestPeople]
    .map((p) => ({ value: p, sort: Math.random() }))
    .sort(function (a, b) {
      return a.sort - b.sort;
    })
    .map((a) => a.value)
    .forEach((person, index) => {
      // Create a new LI element and insert into the DOM
      const listItem = document.createElement('li');

      // keep track of each item
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `<span class="number">${index + 1}
    </span>
    <div class="draggable" draggable="true">
    <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>

    </div>
    `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
}

function addEventListeners() {
  // get all Draggables
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function dragStart() {
  // Get a value from the closest DOM element. The + makes it a number
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  // swap what we dragged
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}
function dragEnter() {
  this.classList.add('over');
}
function dragLeave() {
  //   console.log('dropped!');
  this.classList.remove('over');
}

check.addEventListener('click', checkOrder);
