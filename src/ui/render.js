import { store } from "../state/store.js";
import { deleteTask, toggleTask } from "../state/actions.js";

const taskListEl = document.getElementById("taskList");
const taskCounterEl = document.getElementById("taskCounter");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

function getVisibleTasks() {
    if (store.filter === "active") {
        return store.tasks.filter(t => !t.completed);
    }
     if (store.filter === "completed") {
        return store.tasks.filter(t => t.completed);
    }
    return store.tasks;
}

export function render() {

    taskListEl.innerHTML = "";

    /*if(uiState.loading) {
        taskListEl.innerHTML = "<li>Loading tasks...</li>";
        return;
    }

    if(uiState.error) {
        taskListEl.innerHTML = `<li style="color:red">❌ ${uiState.error}</li>`;
        return;
    }*/

    for (const task of getVisibleTasks()) {
        const li = document.createElement("li");
        li.textContent = task.title;

        li.tabIndex = 0;

        li.setAttribute("role", "checkbox");
        li.setAttribute("aria-checked", task.completed);


        li.addEventListener("keydown", e => {
            if (e === "Enter" || e === " ") {
                e.preventDefault();
                toggleTask(task.id);
            };
        });

        li.addEventListener("click", () => 
            toggleTask(task.id)
        );

        if (task.completed) {
            li.classList.add("completed");
        }

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";

        delBtn.addEventListener("click", e => {
            e.stopPropagation();
            deleteTask(task.id)
        });

        li.appendChild(delBtn);
        taskListEl.appendChild(li);
    }

    const activeCount = store.tasks.filter(t => !t.completed).length;
    taskCounterEl.textContent = `${activeCount} task${activeCount !== 1 ? "s" : ""} left`;

    clearCompletedBtn.style.display =
        store.tasks.some(t => t.completed) ? "inline-block" : "none";

}