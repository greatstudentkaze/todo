'use strict';

class Todo {
  constructor(form, input, taskContainer, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.tasksContainer = document.querySelector(taskContainer);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);

    this.todoData = new Map(JSON.parse(localStorage.getItem('todoData')));
  }

  saveToStorage() {
    localStorage.setItem('todoData', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createElement.bind(this));
    this.saveToStorage();
  }

  createElement(task) {
    const elem = document.createElement('li');
    elem.classList.add('todo-item');
    elem.key = task.key;
    elem.insertAdjacentHTML('beforeend',
      `<span class="text-todo">${task.value}</span>
            <div class="todo-buttons">
              <button class="todo-remove" type="button"></button>
              <button class="todo-complete" type="button"></button>
            </div>`);

    if (task.completed) this.todoCompleted.append(elem);
    else this.todoList.append(elem);
  }

  addTask(evt) {
    evt.preventDefault();

    if (this.input.value.trim()) {
      const task = {
        value: this.input.value,
        completed: false,
        key: this.generateKey()
      };

      this.todoData.set(task.key, task);
      this.render();

      this.input.value = '';
      this.input.placeholder = 'Какие планы?';
    } else {
      this.input.value = '';
      this.input.placeholder = 'Введите задачу!';
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  removeTask(key) {
    this.todoData.delete(key);
    this.render();
  }

  completeTask(key) {
    this.todoData.get(key).completed = !this.todoData.get(key).completed;
    this.render();
  }

  handler(evt) {
    const target = evt.target;

    if (!target.closest('.todo-item')) return;

    if (target.classList.contains('todo-remove')) this.removeTask(target.closest('.todo-item').key);
    else if (target.classList.contains('todo-complete')) this.completeTask(target.closest('.todo-item').key);
  }

  init() {
    this.form.addEventListener('submit', this.addTask.bind(this));
    this.tasksContainer.addEventListener('click', this.handler.bind(this));
    this.render();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-container','.todo-list', '.todo-completed');

todo.init();
