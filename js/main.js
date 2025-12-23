//DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskListEl = document.getElementById("taskList");

//State
let currentFilter = localStorage.getItem("filter") || "all";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(title) {
    const task = {
        id: Date.now(),
        title,
        completed: false,
    }

    tasks = [...tasks, task];
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks(getFilteredTasks());
}

function toggleTask(taskId) {
            tasks = tasks.map(task => 
                task.id === taskId
                ? {...task, completed: !task.completed}
                : task
            );
            saveTasks();
        }

function getAllTasks(){
    return tasks;
}

function getActiveTasks(){
    return tasks.filter(task => !task.completed)
}

function getCompletedTasks(){
    return tasks.filter(task => task.completed)
}

function getFilteredTasks(){

    if(currentFilter === "active"){
        return getActiveTasks();
    }

    if(currentFilter === "completed"){
        return getCompletedTasks();
    }

    return getAllTasks();
}

function renderTasks(taskArray = tasks) {
    taskListEl.innerHTML = "";

    for (const task of taskArray) {
        const li = document.createElement("li");
        li.textContent = task.title;

        if(task.completed){
            li.style.textDecoration = "line-through";
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.addEventListener("click", function(event){
            event.stopPropagation();
            deleteTask(task.id);
        });

        li.addEventListener("click", function(){
            toggleTask(task.id)
            renderTasks(getFilteredTasks());
        });

        li.appendChild(deleteBtn);
        taskListEl.appendChild(li);
    }
}

addTaskBtn.addEventListener('click', function(){
    const taskTitle = taskInput.value;

    if (!taskTitle.trim()) return;

    addTask(taskTitle);
    saveTasks();
    renderTasks(getFilteredTasks());

    taskInput.value = "";
    taskInput.focus();
})

taskInput.addEventListener("keydown", function(event) {
    if(event.key === "Enter"){
        addTaskBtn.click();
    }
})

taskInput.addEventListener("input", function() {
    addTaskBtn.disabled = !taskInput.value.trim();
})

document.getElementById("filter-all").addEventListener("click", () => {
    currentFilter = "all";
    localStorage.setItem("filter", currentFilter);
    renderTasks(getFilteredTasks());
});

document.getElementById("filter-active").addEventListener("click", () => {
    currentFilter = "active";
    localStorage.setItem("filter", currentFilter);
    renderTasks(getFilteredTasks());
});

document.getElementById("filter-completed").addEventListener("click", () => {
    currentFilter = "completed";
    localStorage.setItem("filter", currentFilter);
    renderTasks(getFilteredTasks());
});

renderTasks(getFilteredTasks());

