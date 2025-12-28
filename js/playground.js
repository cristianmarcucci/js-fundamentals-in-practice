let tasks = [
  { id: 1, title: "Learn JS", completed: false },
  { id: 2, title: "Build app", completed: true },
  { id: 3, title: "Get hired", completed: false }
];

const toggled = tasks.map(tasks => 
    tasks.id === 1
    ? {...tasks, completed: !tasks.completed}
    : tasks
);

console.log("Original", tasks);
console.log("Toggled", toggled);

const removed = tasks.filter(tasks => tasks.id !== 2);
console.log("Removed", removed);

console.log("Has completed?", tasks.some(tasks => tasks.completed));
console.log("All completed?", tasks.every(t => t.completed));

const activeCount = tasks.filter(t => !t.completed).length;
console.log(activeCount);
