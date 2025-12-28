// DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskListEl = document.getElementById("taskList");
const taskCounterEl = document.getElementById("taskCounter");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const undoBtn = document.getElementById("undoBtn");

// State
let tasks = [];
let history = [];
let currentFilter = "all";

// ---------- Helpers ----------

function saveToHistory() {
    history.push([...tasks]);
}

function updateAddButtonState() {
    addTaskBtn.disabled = !taskInput.value.trim();
}

// ---------- State mutations ----------

function addTask(title) {
    saveToHistory();

    tasks = [
        ...tasks,
        {
            id: Date.now(),
            title,
            completed: false
        }
    ];

    render();
}

function deleteTask(id) {
    saveToHistory();
    tasks = tasks.filter(task => task.id !== id);
    render();
}

function toggleTask(id) {
    saveToHistory();
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );
    render();
}

function clearCompleted() {
    if (!tasks.some(task => task.completed)) return;

    saveToHistory();
    tasks = tasks.filter(task => !task.completed);
    render();
}

function undo() {
    if (!history.length) return;
    tasks = history.pop();
    render();
}

// ---------- Rendering ----------

function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter(t => !t.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter(t => t.completed);
    }

    return tasks;
}

function render() {
    taskListEl.innerHTML = "";

    for (const task of getFilteredTasks()) {
        const li = document.createElement("li");
        li.textContent = task.title;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => toggleTask(task.id));

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.addEventListener("click", e => {
            e.stopPropagation();
            deleteTask(task.id);
        });

        li.appendChild(delBtn);
        taskListEl.appendChild(li);
    }

    const activeCount = tasks.filter(t => !t.completed).length;
    taskCounterEl.textContent = `${activeCount} task${activeCount !== 1 ? "s" : ""} left`;

    clearCompletedBtn.style.display =
        tasks.some(t => t.completed) ? "inline-block" : "none";

    undoBtn.style.display =
        history.length ? "inline-block" : "none";

    updateAddButtonState();
}

// ---------- Events ----------

taskInput.addEventListener("input", updateAddButtonState);

taskInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});

addTaskBtn.addEventListener("click", () => {
    const value = taskInput.value.trim();
    if (!value) return;

    addTask(value);
    taskInput.value = "";
    taskInput.focus();
});

clearCompletedBtn.addEventListener("click", clearCompleted);
undoBtn.addEventListener("click", undo);

document.getElementById("filter-all").onclick = () => {
    currentFilter = "all";
    render();
};

document.getElementById("filter-active").onclick = () => {
    currentFilter = "active";
    render();
};

document.getElementById("filter-completed").onclick = () => {
    currentFilter = "completed";
    render();
};

// Initial render
render();
