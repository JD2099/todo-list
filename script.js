let tasks = [];


// ADD TASK
function addTask() {

    try {

        let input = document.getElementById("taskInput");
        let text = input.value.trim();

        if (text === "") {
            throw new Error("The task cannot be empty.");
        }

        let task = {
            id: Date.now(),
            text: text,
            completed: false
        };

        tasks.push(task);

        input.value = "";

        showTasks();

        Swal.fire({
            icon: "success",
            title: "Task added!"
        });

    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message
        });

    }
}


// COMPLETE TASK
function completeTask(id) {

    // find()
    let task = tasks.find(task => task.id === id);

    if (task) {
        task.completed = !task.completed;
        showTasks();
    }
}


// DELETE TASK
function deleteTask(id) {

    // filter()
    tasks = tasks.filter(task => task.id !== id);

    showTasks();
}


// SHOW TASKS
function showTasks() {

    let list = document.getElementById("taskList");

    // map()
    list.innerHTML = tasks.map(task => `
        <li class="${task.completed ? "completed" : ""}">

            ${task.text}

            <button onclick="completeTask(${task.id})">
                ${task.completed ? "Undo" : "Complete"}
            </button>

            <button onclick="deleteTask(${task.id})">
                Delete
            </button>

        </li>
    `).join("");
}


// RECURSIVE FUNCTION
function countTasks(index = 0) {

    if (index === tasks.length) {
        return 0;
    }

    return 1 + countTasks(index + 1);
}