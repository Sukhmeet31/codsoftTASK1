document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Save tasks to local storage
    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        // Edit task
        li.querySelector('.edit').addEventListener('click', () => {
            const newTask = prompt('Edit task:', task);
            if (newTask) {
                li.querySelector('span').textContent = newTask;
                updateTaskInLocalStorage(task, newTask);
            }
        });

        // Delete task
        li.querySelector('.delete').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                taskList.removeChild(li);
                removeTaskFromLocalStorage(task);
            }
        });

        taskList.appendChild(li);
    };

    // Update task in local storage
    const updateTaskInLocalStorage = (oldTask, newTask) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const index = tasks.indexOf(oldTask);
        if (index !== -1) {
            tasks[index] = newTask;
            saveTasks(tasks);
        }
    };

    // Remove task from local storage
    const removeTaskFromLocalStorage = (task) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        saveTasks(tasks);
    };

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToDOM(task);
            taskInput.value = '';
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            saveTasks(tasks);
        }
    });

    // Initial load
    loadTasks();
});
