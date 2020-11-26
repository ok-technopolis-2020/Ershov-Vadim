let todoList = document.querySelector(".my-todos__list")
let input = document.getElementById("create-new-todo__input")
let buttonSelectAll = document.getElementById("select-all__button")
let buttonClearAll = document.getElementById("completed-button")
let itemsCount = document.getElementById("footer__items-left-text")

let allCount = 0
let countNow = 0

updateCountNow()

init()

function init() {
    input.addEventListener("keypress", addTask)

    buttonSelectAll.addEventListener("click", selectAll)

    todoList.addEventListener("click", (e) => {
        updateTask(e)
        deleteTask(e)
    })

    buttonClearAll.addEventListener("click", clearCompleted)

    document.getElementById("tabs_all").addEventListener("click", () => {
        showTabs("all")
    })

    document.getElementById("tabs_active").addEventListener("click", () => {
        showTabs("active")
    })

    document.getElementById("tabs_completed").addEventListener("click", () => {
        showTabs("completed")
    })
}

function updateTask(e) {
    if (e.target.classList.contains("item__todo-element-text")) {
        e.target.checked = true
    }
}

function addTask(e) {
    if (e.code === "Enter" && input === document.activeElement) {
        let inputValue = input.value;
        if (!inputValue.match(/^\s*$/)) {
            const current = allCount++
            const li = document.createElement('li')
            li.className = "list__item item"

            li.innerHTML =
                `                <div class="item__entry">    
                    <div class="item__view">
                        <input id="completed${current}" class="item__todo-element-checkbox" type="checkbox"
                               aria-label="Set as done">
                        <label for="completed${current}" class="item__todo-element-text">${inputValue}</label>
                    </div>
                    <div class="item__delete">
                        <button class="item__delete-button" aria-label="delete this todo">Del</button>
                    </div>
                    </div>
        `
            todoList.appendChild(li)
            input.value = "";
            allCount++;
            updateCountNow()
            showTabs("all")
            document.getElementById("tabs_all").checked = true
        } else {
            alert("Write anything")
        }
    }
}

function selectAll() {
    let elementsByTagName = todoList.getElementsByClassName("item");
    for (let i = 0; i < elementsByTagName.length; i++) {
        elementsByTagName.item(i)
            .getElementsByClassName("item__todo-element-checkbox").item(0).checked = true
    }
}

function deleteTask(toRemove) {
    if (toRemove.target.classList.contains("item__delete-button")) {
        todoList.removeChild(toRemove.target.parentElement.parentElement.parentElement)
        allCount--
        updateCountNow()
    }
}

function clearCompleted() {
    const elementsByTagName = todoList.getElementsByClassName("item");
    for (let i = elementsByTagName.length - 1; i >= 0; i--) {
        if (elementsByTagName.item(i)
            .getElementsByClassName("item__todo-element-checkbox").item(0).checked) {
            todoList.removeChild(elementsByTagName.item(i))
            allCount--
        }
    }
    updateCountNow()
}

function updateCountNow() {
    countNow = 0
    const elementsByTagName = todoList.getElementsByClassName("item");
    for (let i = 0; i < elementsByTagName.length; i++) {
        if (!elementsByTagName.item(i).hidden) {
            countNow++
        }
    }
    itemsCount.innerText = countNow + " items left"
}

function showTabs(category) {
    let elementsByTagName = todoList.getElementsByClassName("item");
    if (category === "all") {
        for (let i = 0; i < elementsByTagName.length; i++) {
            elementsByTagName.item(i).hidden = false
        }
    } else if (category === "active") {
        for (let i = 0; i < elementsByTagName.length; i++) {
            elementsByTagName.item(i).hidden = elementsByTagName.item(i)
                .getElementsByClassName("item__todo-element-checkbox").item(0).checked;
        }
    } else {
        for (let i = 0; i < elementsByTagName.length; i++) {
            elementsByTagName.item(i).hidden = !elementsByTagName.item(i)
                .getElementsByClassName("item__todo-element-checkbox").item(0).checked;
        }
    }
    updateCountNow()
}
