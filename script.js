// Getting elements from the dom
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

// It's a li into the ul item(?)
addButton.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const li = document.createElement('li');
        li.textContent = todoText + ' '; 
        const liDeleteButton = document.createElement('button');
        liDeleteButton.textContent = 'Delete';
        liDeleteButton.onclick = () => {
            todoList.removeChild(li);
        };

        li.appendChild(liDeleteButton);
        todoList.appendChild(li);
        todoInput.value = '';
    }
});
