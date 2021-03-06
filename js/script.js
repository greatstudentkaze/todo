'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('todoData')) || [];

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item) {
    const elem = document.createElement('li');
    elem.classList.add('todo-item');

    elem.innerHTML = `<span class="text-todo">${item.value}</span>
                      <div class="todo-buttons">
                        <button class="todo-remove" type="button"></button>
                        <button class="todo-complete" type="button"></button>
                      </div>`;

    if (item.completed) {
      todoCompleted.prepend(elem);
    } else {
      todoList.prepend(elem);
    }

    const todoCompleteBtn = elem.querySelector('.todo-complete'),
      todoRemoveBtn = elem.querySelector('.todo-remove');

    todoCompleteBtn.addEventListener('click', function () {
      item.completed = !item.completed;
      localStorage.setItem('todoData', JSON.stringify(todoData));
      render();
    });
    todoRemoveBtn.addEventListener('click', function () {
      todoData.splice(todoData.indexOf(item), 1);
      localStorage.setItem('todoData', JSON.stringify(todoData));
      render();
    });
  });
};

todoControl.addEventListener('submit', function (evt) {
  evt.preventDefault();

  if (headerInput.value.trim()) {
    const newTask = {
      id: `todo${(+new Date).toString(16)}!las65(3`,
      value: headerInput.value.trim(),
      completed: false
    }

    todoData.push(newTask);
    localStorage.setItem('todoData', JSON.stringify(todoData));

    headerInput.value = '';
    render();
  }
});

render();
