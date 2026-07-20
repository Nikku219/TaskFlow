const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const searchInput = document.getElementById("searchInput");
const darkModeBtn = document.getElementById("darkModeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(taskArray = tasks) {

    taskList.innerHTML = "";

    taskArray.forEach(function(task) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div>
                <button class="complete-btn"
                    onclick="completeTask(${tasks.indexOf(task)})">
                    ✓
                </button>

                <button class="edit-btn"
                    onclick="editTask(${tasks.indexOf(task)})">
                    ✏️
                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${tasks.indexOf(task)})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    displayTasks();
}

function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();
}

function editTask(index) {

    const newTask = prompt(
        "Edit your task:",
        tasks[index].text
    );

    if (newTask !== null && newTask.trim() !== "") {

        tasks[index].text = newTask.trim();

        saveTasks();

        displayTasks();
    }
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();
}

function updateStats() {

    totalTasks.textContent = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = tasks.length - completed;
}

function showAll() {
    displayTasks(tasks);
}

function showPending() {

    const pending = tasks.filter(
        task => !task.completed
    );

    displayTasks(pending);
}

function showCompleted() {

    const completed = tasks.filter(
        task => task.completed
    );

    displayTasks(completed);
}

searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredTasks = tasks.filter(function(task) {

        return task.text.toLowerCase().includes(searchText);

    });

    displayTasks(filteredTasks);
});

darkModeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "☀️";
    } else {
        darkModeBtn.textContent = "🌙";
    }
});

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

displayTasks();
