const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks
function displayTasks(taskArray = tasks) {

    taskList.innerHTML = "";


    taskArray.forEach(function (task) {

        const li = document.createElement("li");

        li.innerHTML = `

            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div>

                <button 
                    class="complete-btn"
                    onclick="completeTask(${tasks.indexOf(task)})">

                    ✓

                </button>

                <button 
                    class="delete-btn"
                    onclick="deleteTask(${tasks.indexOf(task)})">

                    Delete

                </button>

            </div>

        `;

        taskList.appendChild(li);

    });


    updateStats();
}


// Add task
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


// Complete task
function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;


    saveTasks();


    displayTasks();

}


// Delete task
function deleteTask(index) {

    tasks.splice(index, 1);


    saveTasks();


    displayTasks();

}


// Update task stats
function updateStats() {

    totalTasks.textContent = tasks.length;


    const completed = tasks.filter(

        task => task.completed

    ).length;


    completedTasks.textContent = completed;


    pendingTasks.textContent = tasks.length - completed;

}


// Show all tasks
function showAll() {

    displayTasks(tasks);

}


// Show pending tasks
function showPending() {

    const pendingTasksList = tasks.filter(

        task => !task.completed

    );


    displayTasks(pendingTasksList);

}


// Show completed tasks
function showCompleted() {

    const completedTasksList = tasks.filter(

        task => task.completed

    );


    displayTasks(completedTasksList);

}


// Save tasks
function saveTasks() {

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );

}


// Add button click
addTaskBtn.addEventListener(

    "click",

    addTask

);


// Press Enter to add task
taskInput.addEventListener(

    "keypress",

    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }

);


// Display tasks on page load
displayTasks();
