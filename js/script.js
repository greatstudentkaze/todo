'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

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
      todoCompleted.append(elem);
    } else {
      todoList.append(elem);
    }

    const todoCompleteBtn = elem.querySelector('.todo-complete');
    todoCompleteBtn.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });
  });
};

todoControl.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const newTask = {
    value: headerInput.value,
    completed: false
  }

  todoData.push(newTask);

  headerInput.value = '';
  render();
});

render();
