import {addTask, clearCompletedTasks, undo, setFilter, toggleTask, deleteTask} from "../state/actions.js";
import { store } from "../state/store.js";

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const undoBtn = document.getElementById("undoBtn");
const taskListEl = document.getElementById("taskList");

function updateAddButtonState() {
    addTaskBtn.disabled = !taskInput.value.trim();
}

taskInput.addEventListener("input", updateAddButtonState);

addTaskBtn.addEventListener("click", ()=>{
    const value = taskInput.value.trim();
    if (!value) return;

    addTask(value);
    taskInput.value = "";
    taskInput.focus();
});

/*taskInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});*/

clearCompletedBtn.addEventListener("click", clearCompletedTasks);
undoBtn.addEventListener("click", undo);

document.getElementById("filter-all").onclick = () => {
    setFilter("all");
};

document.getElementById("filter-active").onclick = () => {
    setFilter("active");
};

document.getElementById("filter-completed").onclick = () => {
    setFilter("completed");
};

document.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && document.activeElement === taskInput){
        const title = taskInput.value.trim();
        if(!title) return;

        addTask(title);
        taskInput.value = "";
    };

    if(e.key === " " && store.tasks.length > 0) {
        e.preventDefault();
        const lastTask = store.tasks[store.tasks.length - 1];
        toggleTask(lastTask.id);
    };

    if(e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo();
    };
});

taskListEl.addEventListener("click", e => {
    const li = e.target.closest("li");
    if(!li) return;

    const taskId = Number(li.dataset.id);

    if (e.target.classList.contains("delete-btn")) {
        deleteTask(taskId);
        return;
    }

    toggleTask(taskId);
});

taskListEl.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;

    const li = e.target.closest("li");
    if (!li) return;

    e.preventDefault();
    toggleTask(Number(li.dataset.id));
});
