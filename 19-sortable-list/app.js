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

// Insert list items into the DOM
function createList() {
  // spread operator will create a copy of the original, in this case
  [...richestPeople]
  .map (p =>({value: p, sort:Math.random()}))
  .sort(function(a,b){return a.sort - b.sort})
  .map(a => a.value)
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
    draggableList.appendChild(listItem)
  });
}
