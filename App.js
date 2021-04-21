const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Wake up in the morning and have a cup of delicious, hot coffee\r\n',
    title: 'To drink coffee.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'After I woke up and drank coffee, I did my exercises and go for a run.\r\n',
    title:
      'Exercise',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Go to your favorite job, have a good time and return home in a good.\r\n',
    title: 'Go to work.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'After a pleasant day, go to your soft bed and sleep.\r\n',
    title:
      'Go to bed.',
  },
];

(function(arrOfTasks) {
  const objectOfTasks = arrOfTasks.reduce((acc, item) => {
    acc[item._id] = item;
    return acc
  },{})

//Elements UI
  const container = document.querySelector('.task-list-section .list-group');
  const form = document.forms["addTask"];
  const imputTitle = form.elements['title'];
  const imputBody = form.elements['body'];


//Events
  renderAllTasks(objectOfTasks);
  form.addEventListener("submit", onFormSubmitHandler);
  container.addEventListener("click", onDeleteHandler)

  function renderAllTasks(tasksList) {

    if(!tasksList){
      console.error("Pass the task list");
      return;
    }

    const fragment = document.createDocumentFragment();

    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li)
    })
    container.appendChild(fragment)
  }
  function listItemTemplate (task) {
    const li = document.createElement("li")
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
    li.setAttribute("data-task-id",task._id);

    const title = document.createElement("span");
    title.textContent =task.title;
    title.style.fontWeight = "bold";

    const article = document.createElement("p");
    article.classList.add('mt-3','w-100');
    article.textContent= task.body;

    const button = document.createElement("button");
    button.classList.add('btn','btn-outline-danger','ms-auto','delete-btn');
    button.textContent = "Delete task";

    li.appendChild(title);
    li.appendChild(article);
    li.appendChild(button);

    return li;

  }
  function onFormSubmitHandler (e) {
    e.preventDefault()

    const titleValue = imputTitle.value;
    const bodyValue = imputBody.value;

    if(!titleValue || !bodyValue){
      alert("Write something in the fields title and body");
      return;
    }

    const task = createNewTask (titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    container.insertAdjacentElement("afterbegin",listItem);
    form.reset()
  }
  function createNewTask (title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `Task/${Math.random()}`
    }
    objectOfTasks[newTask._id] = newTask;

    return {...newTask}
  }
  function deleteTaskFromHTML (confirm, parent) {
    if(!confirm) return;
    parent.remove();
  }
  function deleteTask (id) {
    const { title } = objectOfTasks[id];
    const isConfirm = confirm(`Are you sure you want to delete the task ${title} ?`);
    if(!isConfirm) return isConfirm;
    delete objectOfTasks[id];
    return isConfirm;

  }
  function onDeleteHandler ({ target }) {
    if(target.classList.contains("delete-btn")){
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHTML(confirmed, parent);
    }
  }

})(tasks);
