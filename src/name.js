const NAME = "NAME";
const inputForm = document.querySelector(".js-inputForm"),
  inputName = inputForm.querySelector("input"),
  nameDiv = document.querySelector(".js-name");

function printName(name) {
  const hourStatus = localStorage.getItem("HOURSTATUS");
  const label = document.createElement("label");
  label.innerHTML = `Good ${hourStatus}, ${name}`;

  nameDiv.appendChild(label);
  nameDiv.classList.add("input");
}

function getName() {
  const name = localStorage.getItem(NAME);

  if (name === null) inputName.classList.toggle("showing");
  else {
    inputName.classList.toggle("noShowing");
    printName(name);
  }
}

function setName(event) {
  event.preventDefault();

  if (inputName.value === "") {
    alert("이름을 입력하세요.");
    return;
  }

  localStorage.setItem(NAME, inputName.value);
  getName();
}

function init() {
  getName();
  inputForm.addEventListener("submit", setName);
}

init();
