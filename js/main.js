const tasks = [];

function addTask(title) {
    const task = {
        id: Date.now(),
        title: title,
        complete: false,
    }

    tasks.push(task)
}

addTask("Study JavaScript");
addTask("Practice Git");
addTask("Build projects");

console.log(tasks);
