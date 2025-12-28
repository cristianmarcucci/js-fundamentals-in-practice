// DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskListEl = document.getElementById("taskList");
const taskCounterEl = document.getElementById("taskCounter");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const undoBtn = document.getElementById("undoBtn");

// State
let tasks = loadTasks();
let history = [];
let currentFilter = "all";
let isLoading = false;

// ---------- Helpers ----------

function saveToHistory() {
    history.push([...tasks]);
}

function updateAddButtonState() {
    addTaskBtn.disabled = !taskInput.value.trim();
}

function setLoading(value) {
    isLoading = value;
    addTaskBtn.disabled = value;
}

// ---------- State mutations ----------

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
}

/*function addTask(title) {
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
}*/

import { apiAddTask, apiDeleteTask } from "../api/taskService.js";

async function handleAddTask(title) {
    try{
        setLoading(true);

        const newTask = {
            id: Date.now(),
            title,
            completed: false,
        };

        await apiAddTask(newTask);

        tasks = [...tasks, newTask];
        saveTasks();
        render();
    } catch(error){
        alert(error.message);
    } finally {
        setLoading(false);
    }
}

async function handleDeletedTask(taskId) {
    try{
        setLoading(true);
        saveToHistory();

        await apiDeleteTask(taskId);

        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        render();
    } catch {
        alert(error.message);
    } finally {
        setLoading(false);
    }
}

/*function deleteTask(id) {
    saveToHistory();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    render();
}*/

function toggleTask(id) {
    saveToHistory();
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );
    saveTasks();
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
    saveTasks();
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
             handleDeletedTask(task.id);
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

    handleAddTask(value);
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
