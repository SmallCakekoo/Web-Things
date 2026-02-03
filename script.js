// Getting elements from the dom
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

// It's a li into the ul item(?)
addButton.addEventListener('click', () => {
    const todoText = todoInput.value.trim(); // the trim is for removing the spaces
    if (todoText !== '') { // if the todoText is not empty
        const li = document.createElement('li'); // create a li
        li.textContent = todoText + ' '; 
        const liDeleteButton = document.createElement('button');
        liDeleteButton.textContent = 'Delete'; // the delete button
        liDeleteButton.onclick = () => { 
            todoList.removeChild(li); // remove the li from the ul
        };

        li.appendChild(liDeleteButton); // add the delete button to the li
        todoList.appendChild(li);
        todoInput.value = '';
    }
});
