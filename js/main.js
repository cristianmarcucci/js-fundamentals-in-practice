const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const tasks = [];

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

        taskList.appendChild(li);
    }
}

addTaskBtn.addEventListener('click', function(){
    const taskTitle = taskInput.value;

    if (!taskTitle.trim()) return;

    addTask(taskTitle);
    renderTasks();

    taskInput.value = "";
})


