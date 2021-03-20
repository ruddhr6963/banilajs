import "./styles.css";

const toDoForm = document.querySelector(".js-toDoForm"),
  inputTodo = toDoForm.querySelector("input"),
  pending = document.querySelector(".js-pending"),
  finished = document.querySelector(".js-finished");

const PENDING = "PENDING",
  FINISHED = "FINISHED";

let toDoPending = [];
let toDoFinished = [];
let pendingNewId;

function addToDos(event) {
  event.preventDefault();

  const currentValue = inputTodo.value;
  printToDo(PENDING, pendingNewId, currentValue);
  pendingNewId++;
  inputTodo.value = "";
}

function printToDo(location, id, text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const btn = document.createElement("button");

  li.id = id;
  span.innerText = text;
  delBtn.innerText = "❌";
  delBtn.classList.add("image");
  location === PENDING ? (btn.innerText = "☐") : (btn.innerText = "✅");
  btn.classList.add("image");
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(btn);
  location === PENDING ? pending.appendChild(li) : finished.appendChild(li);

  delBtn.addEventListener("click", deleteToDo);
  btn.addEventListener("click", handleTodoBtn);

  const toDoObj = {
    id: id,
    text: text
  };

  if (location === PENDING) {
    toDoPending.push(toDoObj);
    saveToDos(PENDING);
  } else {
    toDoFinished.push(toDoObj);
    saveToDos(FINISHED);
  }
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;

  if (ul.classList.contains("js-pending")) {
    const cleanToDos = toDoPending.filter(function (toDo) {
      return toDo.id !== parseInt(li.id, 10);
    });
    toDoPending = cleanToDos;
    saveToDos(PENDING);
  } else {
    const cleanToDos = toDoFinished.filter(function (toDo) {
      return toDo.id !== parseInt(li.id, 10);
    });
    toDoFinished = cleanToDos;
    saveToDos(FINISHED);
  }

  ul.removeChild(li);
}

function handleTodoBtn(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span");
  const ul = li.parentNode;

  if (ul.classList.contains("js-pending")) {
    const cleanToDos = toDoPending.filter(function (toDo) {
      return toDo.id !== parseInt(li.id, 10);
    });
    toDoPending = cleanToDos;
    saveToDos(PENDING);

    const finished = document.querySelector(".js-finished");
    btn.innerText = "✅";
    btn.classList.add("image");
    finished.appendChild(li);

    const finishToDoObj = {
      id: parseInt(li.id, 10),
      text: span.innerText
    };
    toDoFinished.push(finishToDoObj);
    saveToDos(FINISHED);
  } else {
    const cleanToDos = toDoFinished.filter(function (toDo) {
      return toDo.id !== parseInt(li.id, 10);
    });
    toDoFinished = cleanToDos;
    saveToDos(FINISHED);

    const pending = document.querySelector(".js-pending");
    btn.innerText = "☐";
    pending.appendChild(li);

    const pendingToDoObj = {
      id: parseInt(li.id, 10),
      text: span.innerText
    };
    toDoPending.push(pendingToDoObj);
    saveToDos(PENDING);
  }
}

function saveToDos(key) {
  if (key === PENDING) localStorage.setItem(key, JSON.stringify(toDoPending));
  else localStorage.setItem(key, JSON.stringify(toDoFinished));
}

function loadToDos() {
  const pendingToDos = localStorage.getItem(PENDING);
  const finishedToDos = localStorage.getItem(FINISHED);
  let maxId = 0;

  if (pendingToDos !== null) {
    const parsedToDos = JSON.parse(pendingToDos);
    parsedToDos.forEach(function (toDo) {
      printToDo(PENDING, toDo.id, toDo.text);
      maxId = maxId < toDo.id ? toDo.id : maxId;
    });
  }

  if (finishedToDos !== null) {
    const parsedToDos = JSON.parse(finishedToDos);
    parsedToDos.forEach(function (toDo) {
      printToDo(FINISHED, toDo.id, toDo.text);
      maxId = maxId < toDo.id ? toDo.id : maxId;
    });
  }

  pendingNewId = maxId + 1;
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", addToDos);
}

init();
