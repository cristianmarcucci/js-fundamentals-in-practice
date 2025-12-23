const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskListEl = document.getElementById("taskList");

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
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskListEl.appendChild(li);
    }
}

function deleteTask(taskId) {
    const index = tasks.findIndex(task => task.id === taskId);

    if(index === -1) return;

    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

addTaskBtn.addEventListener('click', function(){
    const taskTitle = taskInput.value;

    if (!taskTitle.trim()) return;

    addTask(taskTitle);
    saveTasks();
    renderTasks();

    taskInput.value = "";
})

function getAllTasks(){
    return tasks;
}

function getActiveTasks(){
    return tasks.filter(task => !task.completed)
}

function getCompletedTasks(){
    return tasks.filter(task => task.completed)
}

document.getElementById("filter-all").addEventListener("click", () => {
    renderTasks(getAllTasks());
});

document.getElementById("filter-active").addEventListener("click", () => {
    renderTasks(getActiveTasks());
});

document.getElementById("filter-completed").addEventListener("click", () => {
    renderTasks(getCompletedTasks());
});

renderTasks();

