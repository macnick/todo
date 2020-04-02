import '../node_modules/uikit';
import Data from './modules/data';
import '../dist/css/main.css';

const View = (() => {
  const render = project => {
    // first remove the old list
    let parent = document.getElementById('list');
    let child = parent.getElementsByTagName('ul');
    parent.removeChild(child[0]);
    // then render the new one
    let x = document.getElementById('list');
    let y = document.getElementById('projects');
    let ul = document.createElement('ul');
    ul.classList.add('uk-text-normal', 'uk-list', 'uk-list-striped');

    project.todos.forEach((el, i) => {
      let f = document.createElement('li');
      let input = document.createElement('input');

      let elem = document.createElement('span');
      

      let trashBtn = document.createElement('button');
      trashBtn.className = 'uk-align-right trash';
      trashBtn.setAttribute('uk-icon', 'icon: trash');

      input.setAttribute('type', 'checkbox');
      input.classList.add('uk-checkbox');

      
      f.setAttribute('id', i);
      if (el.completed) input.setAttribute('checked', '');
      elem.innerHTML = `${el.title} ${el.completed}`;
      f.append(input, elem, trashBtn);
      ul.appendChild(f);
    });
    x.appendChild(ul);
  };

  const renderProjects = pList => {
    let projects = Object.keys(pList);
    let x = document.getElementById('projects');
    let ul = document.createElement('ul');
    ul.classList.add('uk-text-normal', 'uk-list', 'uk-list-striped');
    projects.forEach(project => {
      let f = document.createElement('li');
      f.innerHTML = project;
      ul.appendChild(f);
    });
    x.appendChild(ul);
  };

  const toggleForm = event => {
    event.preventDefault();
    let form = document.getElementById('toggle-form');
    if (form.style.display === '' || form.style.display === 'none') {
      form.style.display = 'block';
    } else {
      form.style.display = 'none';
    }
  };

  const toggleProject = event => {
    event.preventDefault();
    let form = document.getElementById('showInput');
    if (form.style.display === '' || form.style.display === 'none') {
      form.style.display = 'block';
    } else {
      form.style.display = 'none';
    }
  };

  const clearInputs = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => (input.value = ''));
  };

  const readInput = () => {
    const title = document.getElementById('title');
    const desc = document.getElementById('desc');
    const date = document.getElementById('date');
    let todo = {
      title: title.value,
      desc: desc.value,
      date: date.value
    };
    clearInputs();
    return todo;
  };

  return {
    render,
    renderProjects,
    toggleForm,
    readInput,
    toggleProject
  };
})();

const Controller = ((ui, data) => {
  let myProjects = data.projectList();
  let proj = data.project('My first project');
  let prj = data.project('Dummy project');

  myProjects[proj.title] = proj;
  ui.renderProjects(myProjects);

  const exampleTodos = [
    `Walk the dog`,
    `Go for our daily exercise`,
    `Garbage Out today`,
    'Wash the car',
    `Take kids to schools7`
  ];

  exampleTodos.forEach(el => {
    let td = data.todo(el);
    proj.todos.push(td);
    localStorage.setItem('todos', JSON.stringify(td));
  });

  const getTodo = e => {
    let td = ui.readInput();
    proj.todos.push(td);
    ui.toggleForm(event);
    ui.render(proj);
  };

  const deleteTodo = e => {
    let clickedLi = e.target.parentElement.parentElement.id;
    if (clickedLi >= 0) {
      proj.todos.splice(clickedLi, 1);
      ui.render(proj);
    }
  };

  const completeTodo = e => {
    console.log(e.target.parentElement.id);
    let id = e.target.parentElement.id;
    proj.todos[id].completed = true;
    let clickedLi = e.target.parentElement;
    clickedLi.setAttribute('style', 'text-decoration:line-through');
  };

  const handleClick = e => {
    if (e.target.parentElement.tagName == 'BUTTON') {
      deleteTodo(e);
    }
    if (e.target.tagName == 'INPUT') {
      completeTodo(e);
    }
  };

  const send = e => {
    if (e.which == 13) {
      e.preventDefault();
      alert('sent');
    }
  };

  // ui.render(prj);
  ui.render(proj);

  // first render then attach Listeners
  document.getElementById('toggle').addEventListener('click', ui.toggleForm);
  document.getElementById('submit').addEventListener('click', getTodo);
  document
    .getElementById('addProject')
    .addEventListener('click', ui.toggleProject);
  document.getElementById('project').addEventListener('keydown', send);
  document.getElementById('cancel').addEventListener('click', close);

  // Try to attach eventListeners to all todos
  let todoList = document.getElementById('list');
  todoList.addEventListener('click', handleClick);

  // Get the field input data one for the project of task

  // Add the project or task to the proper structure

  // Display the item to the UI
})(View, Data);