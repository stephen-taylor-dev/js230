let todoItems = [
  {id: 1, title: 'Homework'},
  {id: 2, title: 'Shopping'},
  {id: 3, title: 'Calling Mom'},
  {id: 4, title: 'Coffee with Elphaba'},
];

document.addEventListener('DOMContentLoaded', () => {
  loadTodos();

  document.addEventListener('click', generalClickHandler);

  [...document.querySelectorAll('.todo')].forEach(addContextMenuListener);

  addConfirmationPromptListener();
});

function generalClickHandler(event) {
  if (event.target.tagName === 'BUTTON') {
    showPrompt(event);
  } else if (event.target.id === 'delete') {
    let todoId = event.target.dataset.id;
    document.querySelector(`[data-id="${todoId}"]`).remove();
    resetPage();
  } else if (event.target.className !== 'menu-item') {
    resetPage();
  }
}

function addContextMenuListener(todo) {
  todo.addEventListener('contextmenu', event => {
    event.preventDefault();

    let menu = document.querySelector('.context-menu');
    let top = event.y;
    let left = event.x;

    menu.querySelector('#delete').dataset.id = todo.dataset.id;

    menu.style.top = top + 'px';
    menu.style.left = left + 'px';
    menu.style.display = 'block';
  });
}

function showPrompt(event) {
  document.querySelector('.context-menu').style.display = 'none';
  // get the clicked on todo name and id
  let todoName = event.target.previousElementSibling.innerText;
  let todoId = event.target.parentElement.dataset.id;

  // set the values for the prompt form submission
  document.querySelector('#todo-name').textContent = todoName;
  document.querySelector('#clicked-todo').value = todoId;

  // Show the prompt and dim the background
  document.querySelector('.prompt').className = 'prompt show';
  document.querySelector('main').className = 'dimmed';
}

function addConfirmationPromptListener() {
  document.querySelector('.confirmation').addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.submitter.value === "Yes") {
      let todoId = document.querySelector('#clicked-todo').value;
      document.querySelector(`[data-id="${todoId}"]`).remove();
    }

    resetPage();
  });
}

function resetPage() {
  document.querySelector('main').className = '';
  document.querySelector('.prompt').className = 'prompt hide';
  document.querySelector('.context-menu').style.display = 'none';
}

function loadTodos() {
  const todoContainer = document.querySelector('#container');

  todoItems.forEach(todo => {
    const html = `<li data-id="${todo.id}" class="todo">
                    <p>${todo.title}</p>
                    <button class="delete">&#10005</button>
                  </li>`;

    todoContainer.insertAdjacentHTML('beforeend', html);
  });
}


/*
load the todos
  set ids in the data attribute

event listener on the main element
  reset confirmation prompt class hide
  reset main element class to nothing

event listener on the delete button
  dont propogate up to event listener on body
  set confrimation prompt class to "show"
  set the main element class to prompt
  set the hidden input value to dataset id
  set the name of the prompt message to clicked on todo
  set the value in the hidden input field of the form to the
    dataset id of the todo


event listener on the form for the prompt
  fire on submit
    get value of submit target
    if yes
      get element to delete from id in hidden form
      remove element from dom
    if no

      do nothing

    reset confirmation prompt class to hide
    reset main element class to nothing


*/