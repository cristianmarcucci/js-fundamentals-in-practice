//DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskListEl = document.getElementById("taskList");

//State
let currentFilter = localStorage.getItem("filter") || "all";
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(title) {
    const task = {
        id: Date.now(),
        title: title,
        completed: false,
    }

    tasks.push(task);
    return task;
}

function deleteTask(taskId) {
    const index = tasks.findIndex(task => task.id === taskId);

    if(index === -1) return;

    tasks.splice(index, 1);
    saveTasks();
    renderTasks(getFilteredTasks());
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
            task.completed = !task.completed;
            saveTasks();
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

