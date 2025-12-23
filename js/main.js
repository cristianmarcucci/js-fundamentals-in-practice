const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(title) {
    const task = {
        id: Date.now(),
        title: title,
        complete: false,
    }

    tasks.push(task);
    return task;
}

function renderTasks() {
    taskList.innerHTML = "";

    for (const task of tasks) {
        const li = document.createElement("li");
        li.textContent = task.title;

        if(task.complete){
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
            task.complete = !task.complete;
            saveTasks();
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
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

renderTasks();

