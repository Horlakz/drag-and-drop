const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Becoz',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Micheal Bloomberg',
    'Larry Page'
];

//Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Sort() example
const numbers = [1, 7, 8, 85, 578];
console.log(numbers.sort(function(a, b) {
    return a - b
}))

// Insert list items into DOM
function createList() {
    [...richestPeople]
    .map(a => ({value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `;

        listItems.push(listItem);

        draggableList.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart() {
    // console.log('Event: ', 'dragstart')
    dragStartIndex = this.closest('li').getAttribute('data-index')
}

function dragEnter() {
    // console.log('Event: ', 'dragenter')
    this.classList.add('over')
}

function dragDrop() {
    // console.log('Event: ', 'dragdrop')
    const dragEndIndex = this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over')
}

function dragLeave() {
    // console.log('Event: ', 'dragsleave')
    this.classList.remove('over')

}

function dragOver(e) {
    // console.log('Event: ', 'dragover')
    e.preventDefault()
}


// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

// Check order the order of the list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim()

        if(personName !== richestPeople[index]){
            listItem.classList.add('wrong')
        } else {
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

check.addEventListener('click', checkOrder)