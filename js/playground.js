let activities = [
  { id: 1, title: "Learn JS", completed: false },
  { id: 2, title: "Build app", completed: true },
  { id: 3, title: "Get hired", completed: false }
];

const toggled = activities.map(activities => 
    activities.id === 1
    ? {...activities, completed: !activities.completed}
    : activities
);

console.log("Original", activities);
console.log("Toggled", toggled);

const removed = activities.filter(activities => activities.id !== 2);
console.log("Removed", removed);

console.log("Has completed?", activities.some(activities => activities.completed));
console.log("All completed?", activities.every(t => t.completed));

const activeCount = activities.filter(t => !t.completed).length;
console.log(activeCount);

function fakeSaveToServer(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data) {
        reject("No data received");
      } else {
        resolve("Saved successfully");
      }
    }, 2000);
  });
}

fakeSaveToServer(activities)
  .then(message => console.log(message))
  .catch(error => console.error(error));

async function saveTasksAsync() {
  try {
    const message = await fakeSaveToServer(activities);
    console.log(message);
  } catch (error) {
    console.error("Error:", error);
  }
}

saveTasksAsync();


