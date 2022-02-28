export const getTasks = () => JSON.parse(localStorage.tasks);

export const checkTaskStyle = (task) => {
  if (!task.classList.contains('bg-yellow')) return;
  task.classList.remove('bg-yellow');
  const taskDescription = task.querySelector('.description');
  taskDescription.disabled = true;
  const icon = task.querySelector('.svg-inline--fa');
  icon.classList.toggle('fa-ellipsis-vertical');
  icon.classList.toggle('fa-trash-can');
};

export const showToDoList = (taskList) => {
  if (!window.localStorage.tasks) {
    return;
  }
  const list = getTasks();
  const ul = document.querySelector('.list');
  if (!list.length) {
    ul.classList.add('dn');
  }
  list.forEach((task) => {
    taskList.loadTask(task);
  });
};
