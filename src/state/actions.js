import { store } from "./store.js";
import { saveTasks } from "../utils/storage.js";
import { render } from "../ui/render.js";

export function addTask(title) {
    store.history.push([...store.tasks]);

    store.tasks = [...store.tasks, {
        id: Date.now(),
        title,
        completed: false
    }];

    saveTasks(store.tasks);
    render();
}

export function deleteTask(taskId){
        store.history.push([...store.tasks]);

        store.tasks = store.tasks.filter(task => task.id !== taskId);
        saveTasks(store.tasks);
        render();
}

export function clearCompletedTasks() {
    if (!store.tasks.some(task => task.completed)) return;

    store.history.push([...store.tasks]);
    store.tasks = store.tasks.filter(task => !task.completed);
    saveTasks(store.tasks);
    render();
}

export function undo() {
    if (!store.history.length) return;

    store.tasks = store.history.pop();
    saveTasks(store.tasks);
    render();
}

export function setFilter(filter) {
    store.filter = filter;
    render();
}

export function toggleTask(taskId) {
    store.history.push([...store.tasks]);

    store.tasks = store.tasks.map(task => 
        task.id === taskId 
        ? {...task, completed : !task.completed} 
        : task
    );

    saveTasks(store.tasks);
    render();
}
