import { fakeApi } from "./fakeApi.js";

export async function apiAddTask(tasks) {
    return fakeApi(tasks);    
}

export async function apiDeleteTask(tasksId) {
    return fakeApi(tasksId);    
}

export async function apiToggleTask(tasksId) {
    return fakeApi(tasksId);
}