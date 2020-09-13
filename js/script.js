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

  render(key) {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(task => this.createElement(task, key));
    this.saveToStorage();
  }

  createElement(task, key) {
    const elem = document.createElement('li');
    elem.classList.add('todo-item');
    if (key === task.key) {
      setTimeout(() => elem.classList.remove('todo-item-transparent'), 100);
      elem.classList.add('todo-item-transparent');
    }
    elem.key = task.key;
    elem.insertAdjacentHTML('beforeend',
      `<span class="text-todo">${task.value}</span>
            <div class="todo-buttons">
              <button class="todo-remove" type="button"></button>
              <button class="todo-complete" type="button"></button>
            </div>`);

    if (task.completed) this.todoCompleted.append(elem);
    else {
      const editBtn = document.createElement('button');
      editBtn.classList.add('todo-edit');
      editBtn.type = 'button';
      elem.querySelector('.todo-buttons').prepend(editBtn);

      this.todoList.append(elem);
    }
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

      this.resetInput();
    } else {
      this.input.value = '';
      this.input.placeholder = 'Введите задачу!';
      this.input.closest('.header').style.backgroundColor = '#c53838';
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  resetInput() {
    this.input.value = '';
    this.input.placeholder = 'Какие планы?';
    this.input.closest('.header').style.backgroundColor = '';
  }

  removeTask(key) {
    this.todoData.delete(key);
    this.render(key);
  }

  completeTask(key) {
    this.todoData.get(key).completed = !this.todoData.get(key).completed;
    this.render(key);
  }

  editTask(task) {
    const taskText = task.querySelector('.text-todo');
    taskText.contentEditable = true;
    taskText.style.outline = 'none';
    taskText.style.fontWeight = 'bold';
    taskText.focus();
    taskText.addEventListener('keydown', evt => {
      if (evt.code === 'Enter') {
        evt.preventDefault();
        taskText.blur();
      }
    });
    taskText.addEventListener('blur', () => {
      this.todoData.get(task.key).value = taskText.textContent.trim();
      this.saveToStorage();
      taskText.contentEditable = false;
      taskText.style.outline = '';
      taskText.style.fontWeight = '';
    });
  }

  handler(evt) {
    const target = evt.target;

    if (!target.closest('.todo-item')) return;

    if (target.classList.contains('todo-remove')) {
      target.closest('.todo-item').classList.add('todo-item-transparent');
      setTimeout(() => this.removeTask(target.closest('.todo-item').key), 300);
    } else if (target.classList.contains('todo-complete')) {
      target.closest('.todo-item').classList.add('todo-item-transparent');
      setTimeout(() => this.completeTask(target.closest('.todo-item').key), 300);
    } else if (target.classList.contains('todo-edit')) {
      this.editTask(target.closest('.todo-item'));
    }
  }

  init() {
    this.form.addEventListener('submit', this.addTask.bind(this));
    this.input.addEventListener('blur', this.resetInput.bind(this));
    this.tasksContainer.addEventListener('click', this.handler.bind(this));
    this.render();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-container','.todo-list', '.todo-completed');

todo.init();
