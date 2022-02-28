import { taskCompleted, taskEdit, updateValue } from './events.js';

class ToDoList {
  constructor() {
    this.taskList = [];
  }

  sortTasks() {
    this.taskList = this.taskList.map((task, i) => (
      { index: i + 1, description: task.description, completed: task.completed }
    ));
  }

  updateTasks() {
    window.localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  createTask(description) {
    const taskContainer = document.querySelector('.list');
    const index = taskContainer.children.length + 1;
    const li = document.createElement('li');
    li.className = 'task';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkbox';
    checkBox.addEventListener('change', (event) => taskCompleted(event, this));
    const taskDescription = document.createElement('input');
    taskDescription.className = 'description';
    taskDescription.value = description;
    taskDescription.disabled = true;
    taskDescription.required = true;
    taskDescription.addEventListener('keydown', (event) => updateValue(event, this));
    const dotsContainer = document.createElement('span');
    dotsContainer.className = 'dots-container';
    const dots = document.createElement('i');
    dots.className = 'fa-solid fa-ellipsis-vertical';
    dotsContainer.appendChild(dots);
    dotsContainer.addEventListener('click', (event) => taskEdit(event, this));
    li.appendChild(checkBox);
    li.appendChild(taskDescription);
    li.appendChild(dotsContainer);
    taskContainer.appendChild(li);
    return index;
  }

  addTask(description) {
    const index = this.createTask(description);
    this.taskList.push({ index, description, completed: false });
    this.updateTasks();
  }

  loadTask(task) {
    const index = this.createTask(task.description);
    this.taskList.push({ index, description: task.description, completed: task.completed });
    this.updateTasks();
    const checkBoxes = document.querySelectorAll('.checkbox');
    if (task.completed) {
      checkBoxes[index - 1].click();
    }
  }

  completeTask(index, checked) {
    this.taskList[index].completed = checked;
  }

  removeTask(index) {
    this.taskList.splice(index, 1);
    this.sortTasks();
    this.updateTasks();
  }

  updateTaskDeskcription(index, value) {
    this.taskList[index].description = value;
    this.updateTasks();
  }

  removeCompletedTask() {
    this.taskList = this.taskList.filter((task) => task.completed === false);
    this.sortTasks();
    this.updateTasks();
  }
}
const taskList = new ToDoList();
export default taskList;