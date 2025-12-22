const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

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

addTaskBtn.addEventListener('click', function(){
    const taskTitle = taskInput.value;

    if (taskTitle === ""){
        return;
    }

    addTask(taskTitle);
    console.log(tasks);
    taskInput.value = "";
})


