
// ---------- State mutations ----------

/*

async function addTask(title) {
    saveToHistory();

    tasks = [
        ...tasks,
        {
            id: Date.now(),
            title,
            completed: false
        }
    ];

    uiState.loading = true;
    render();

    //syncTasksWithServer();

    try {
        await fakeApiSaveTasks(tasks);
        saveTasks();
    } catch {
        undo();
        uiState.error = "Failed to save task";
    } finally {
        uiState.loading = false;
        render();
    }
}

function deleteTask(id) {
    saveToHistory();

    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();

    syncTasksWithServer();
}

/*import { apiAddTask, apiDeleteTask } from "../api/taskService.js";

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
}*/

/*
async function initApp() {
    isLoading = true;
    errorMessage = "";
    render();

    try{
        tasks = await fakeApiFetchTasks();
    } catch (error){
        errorMessage = error.message;
    } finally {
        isLoading = false;
        render();
    }
}

async function syncTasksWithServer() {
    try{
        await fakeApiSaveTasks(tasks);
        console.log("Saved to server");
    } catch(err){
        alert(err.message);
        undo();
    }
}

function toggleTask(id) {
    saveToHistory();
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );
    saveTasks();
    render();
    syncTasksWithServer();
}



function updateControls() {
    addTaskBtn.disabled = uiState.loading || !taskInput.value.trim();
    clearCompletedBtn.disabled = uiState.loading;
    undoBtn.disabled = uiState.loading;
}

// ---------- Rendering ----------


function getFilteredTasks() {
    if (currentFilter === "active") {
        return store.tasks.filter(t => !t.completed);
    }

    if (currentFilter === "completed") {
        return store.tasks.filter(t => t.completed);
    }

    return store.tasks;
}

function render() {

}
*/
// ---------- Events ----------



// Initial render

import { store } from "./state/store.js";
import { loadTasks } from "./utils/storage.js";
import {render} from "./ui/render.js";
import "./ui/events.js";

store.tasks = loadTasks();
render();