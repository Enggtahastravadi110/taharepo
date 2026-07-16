const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const taskCount = document.getElementById('task-count');
const clearButton = document.getElementById('clear-completed');

const STORAGE_KEY = 'todoApp.tasks';
let tasks = [];
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  tasks = saved ? JSON.parse(saved) : [];
}

function updateTaskCount() {
  const activeCount = tasks.filter(task => !task.completed).length;
  taskCount.textContent = `${activeCount} task${activeCount === 1 ? '' : 's'} left`;
}

function createTaskElement(task) {
  const item = document.createElement('li');
  item.className = 'task-item';
  if (task.completed) item.classList.add('completed');

  item.innerHTML = `
    <button class="task-checkbox" aria-label="Toggle task complete">
      <span>${task.completed ? '✓' : ''}</span>
    </button>
    <p class="task-text">${task.text}</p>
    <button class="task-delete" aria-label="Remove task">×</button>
  `;

  const checkbox = item.querySelector('.task-checkbox');
  const deleteButton = item.querySelector('.task-delete');

  checkbox.addEventListener('click', () => {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  });

  deleteButton.addEventListener('click', () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    renderTasks();
  });

  return item;
}

function renderTasks() {
  todoList.innerHTML = '';
  const filtered = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  filtered.forEach(task => todoList.appendChild(createTaskElement(task)));
  updateTaskCount();
  filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === currentFilter));
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks.unshift({
    id: Date.now().toString(),
    text: trimmed,
    completed: false,
  });

  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

todoForm.addEventListener('submit', event => {
  event.preventDefault();
  addTask(todoInput.value);
  todoInput.value = '';
  todoInput.focus();
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

clearButton.addEventListener('click', clearCompleted);

loadTasks();
renderTasks();

// Navbar mobile toggle
(function(){
  const nav = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!nav || !navToggle || !menu) return;

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close when switching to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 640 && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
