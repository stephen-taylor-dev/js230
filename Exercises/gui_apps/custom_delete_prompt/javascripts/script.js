let todoItems = [
  {id: 1, title: 'Homework'},
  {id: 2, title: 'Shopping'},
  {id: 3, title: 'Calling Mom'},
  {id: 4, title: 'Coffee with Elphaba'},
];

document.addEventListener('DOMContentLoaded', () => {
  loadTodos();

  document.querySelector('main').addEventListener('click', resetPage);

  [...document.querySelectorAll('.todo')].forEach(todo => {
    todo.addEventListener('click', (event) => {
      event.stopPropagation();

      if (event.target.tagName === 'BUTTON') {
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

    });
  });

  document.querySelector('.confirmation').addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.submitter.value === "Yes") {
      let todoId = document.querySelector('#clicked-todo').value;
      document.querySelector(`[data-id="${todoId}"]`).remove();
    }

    resetPage();
  });
});

function resetPage() {
  console.log('main page clicked');
  document.querySelector('main').className = '';
  document.querySelector('.prompt').className = 'prompt hide';
}

function loadTodos() {
  const todoContainer = document.querySelector('#container');

  todoItems.forEach(todo => {
    const html = `<div data-id="${todo.id}" class="todo">
                    <p>${todo.title}</p>
                    <button class="delete">&#10005</button>
                  </div>`;

    todoContainer.insertAdjacentHTML('beforebegin', html);
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
  set the value in the hidden input field of the form to the dataset id of the todo


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