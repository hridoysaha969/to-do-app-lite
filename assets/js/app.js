// Add and Remove Task Form Event
let addBtn = document.getElementById('add-btn');
let timesIcon = document.getElementById('times-icon');
let taskForm = document.getElementById('task-form');

addBtn.addEventListener('click', () => {
    taskForm.classList.add('show-task-form');
})
timesIcon.addEventListener('click', removeTaskForm)
function removeTaskForm() {
    taskForm.classList.remove('show-task-form');
}

/* ========== Task Form Functionality ========== */
// Task Constructor
function Task(title, date, time) {
    this.title = title
    this.date = date
    this.time = time
}

// Form
const mainForm = document.getElementById('form');
let taskTitle = document.getElementById('title');
let taskDate = document.getElementById('date');
let taskTime = document.getElementById('time');
let addTask = document.getElementById('add-task');

addTask.addEventListener('click', submitForm);
function submitForm(e) {
    e.preventDefault();

    // Task title validation
    let taskRegx = /^[a-zA-z]([0-9a-zA-Z -]){3,30}$/;

    if(!taskRegx.test(taskTitle.value)) {
        taskTitle.classList.add('invalid__task');
        onInputFunc(taskTitle)
    } else if(taskDate.value == '') {
        taskDate.classList.add('invalid__task');
        onInputFunc(taskDate)
    } else if(taskTime.value == '') {
        taskTime.classList.add('invalid__task');
        onInputFunc(taskTime)
    } else {
        let newTask = new Task(taskTitle.value, taskDate.value, taskTime.value)
        mainForm.reset();
        removeTaskForm();

        manageTaskData(newTask);
        showListData();
        pendingTask();
    }
}

// OnInput function
function onInputFunc(inpVal) {
    inpVal.addEventListener('input', () => {
        inpVal.classList.remove('invalid__task');
    })
}

// Store data into Local Storage
function manageTaskData(obj) {
    let taskArr = JSON.parse(localStorage.getItem('taskObj'));
    if(taskArr == null) {
        let newArr = [obj];
        localStorage.setItem('taskObj', JSON.stringify(newArr));
    } else {
        taskArr.push(obj);
        localStorage.setItem('taskObj', JSON.stringify(taskArr));
    }
}

let taskContainer = document.getElementById('task-container');

// Show List Data in front end
function showListData() {
    let listArr = JSON.parse(localStorage.getItem('taskObj'));
    if(listArr == null) {
        taskContainer.innerHTML = `<h3 class="message">No task available</h3>`
    } else {
        let htmlTemplate = '';
        listArr.forEach((val, ind) => {
            // Customize Date
            let newDate = val.date
            let jsDate = new Date(newDate);
            let monthArr = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']

            htmlTemplate += `<div class="single__task">
                                <div class="description">
                                    <h3 class="title search-title">${val.title}</h3>
                                    <span class="date">${jsDate.getDate()} ${monthArr[jsDate.getMonth()]}, ${jsDate.getFullYear()}</span>
                                    <span class="time">${val.time} AM/PM</span>
                                </div>
                                <div class="action__btn">
                                    <button class="btn edit-btn">Edit</button>
                                    <button class="btn danger" id="${ind}" onclick="deleteTask(this.id)">Delete</button>
                                </div>
                            </div>
        `;
        })
        taskContainer.innerHTML = htmlTemplate;
    }
}
showListData()

// Delete Task Function
function deleteTask(ind) {
    let listArr = JSON.parse(localStorage.getItem('taskObj'));
    if(listArr == null) {
        console.log('No Data Found')
    } else {
        listArr.splice(ind, 1);
        localStorage.setItem('taskObj', JSON.stringify(listArr));
        showListData();
        pendingTask();
        msg()
    }
}


// Show pending task at Top
function pendingTask() {
    let totalTask = document.getElementById('total-task');
    let taskArr = [...taskContainer.children];
    totalTask.innerHTML = taskArr.length
    console.log(taskArr.length)
}
pendingTask()

function msg() {
    let taskArr = [...taskContainer.children];

    if(taskArr.length == 0) {
        taskContainer.innerHTML = `<h3 class="message">No task available</h3>`
    }
}
msg()

// Search Function
let search = document.getElementById('searchTxt');

search.addEventListener('input', () => {
    let serachTxt = search.value.toLowerCase();
    let singleTask = document.getElementsByClassName('single__task');
    Array.from(singleTask).forEach(function(val) {
        let taskTitle = val.getElementsByTagName('h3')[0].innerText.toLowerCase();
        if(taskTitle.includes(serachTxt)) {
            val.style.display = 'flex'
        } else {
            val.style.display = 'none'
        }
    })

})