import { getTasks, checkTaskStyle } from './functions.js';

export const taskAdd = (event, list) => {
  const input = document.querySelector('#task');
  const ul = document.querySelector('.list');
  if (!input.value) {
    return;
  }
  if (event.keyCode === 13 || event.type === 'click') {
    list.addTask(input.value);
    ul.classList.remove('dn');
    input.value = null;
  }
};

export const taskCompleted = (event, list) => {
  const listOfTasks = document.querySelectorAll('.checkbox');
  const index = Array.from(listOfTasks).indexOf(event.target);
  const li = event.target.closest('.task');
  li.classList.toggle('disabled');
  const taskDescription = event.target.nextElementSibling;
  taskDescription.classList.toggle('completed');
  const checked = taskDescription.classList.contains('completed');
  const tasks = getTasks();
  tasks[index].completed = checked;
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
  list.completeTask(index, checked);
  checkTaskStyle(li);
};

export const taskEdit = (event, list) => {
  event.target.classList.toggle('fa-ellipsis-vertical');
  event.target.classList.toggle('fa-trash-can');
  const task = event.target.closest('.task');
  const taskDescription = task.querySelector('.description');
  if (event.target.classList.contains('fa-trash-can')) {
    task.classList.add('bg-yellow');
    taskDescription.disabled = false;
  } else {
    const icons = document.querySelectorAll('li .svg-inline--fa');
    const index = Array.from(icons).indexOf(event.target);
    task.classList.remove('bg-yellow');
    taskDescription.disabled = true;
    list.removeTask(index);
    if (!list.taskList.length) {
      task.parentNode.classList.add('dn');
    }
    task.remove();
  }
};

export const updateValue = (event, list) => {
  if (!event.target.value) {
    event.target.placeholder = "the task shouldn't be empty. Please, add value.";
    return;
  }
  if (event.keyCode === 13) {
    event.target.disabled = true;
    const li = event.target.closest('li');
    li.classList.remove('bg-yellow');
    const icon = li.querySelector('.svg-inline--fa');
    icon.classList.toggle('fa-ellipsis-vertical');
    icon.classList.toggle('fa-trash-can');
    const descriptions = document.querySelectorAll('.description');
    const index = Array.from(descriptions).indexOf(event.target);
    list.updateTaskDeskcription(index, event.target.value);
  }
};

export const removeCompleted = (event, list) => {
  const completedTasks = document.querySelectorAll('.disabled');
  Array.from(completedTasks).forEach((task) => task.remove());
  list.removeCompletedTask();
  if (!list.taskList.length) {
    const ul = document.querySelector('.list');
    ul.classList.add('dn');
  }
};