import "./styles.css";

const HOURS12CLOCK = "HOURS12CLOCK";
const HOURSTATUS = "HOURSTATUS";
const clockContainer = document.querySelector(".js-clock"),
  clock = clockContainer.querySelector("label");

function setStatus(hours) {
  let status;

  if (hours >= 5 && hours < 12) status = "morning";
  else if (hours >= 12 && hours < 18) status = "afternoon";
  else status = "evening";

  localStorage.setItem(HOURSTATUS, status);
}

function printTime(hours, minutes) {
  const hours12Clock = localStorage.getItem(HOURS12CLOCK);
  if (hours12Clock === null) localStorage.setItem(HOURS12CLOCK, true);
  hours = JSON.parse(hours12Clock) === true ? hours % 12 : hours;
  hours = hours % 12 === 0 ? 12 : hours;

  clock.innerHTML = `${hours < 10 ? `0${hours}` : `${hours}`}:${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  }`;
}

function getTime() {
  const date = new Date(),
    hours = date.getHours(),
    minutes = date.getMinutes();

  printTime(hours, minutes);
  setStatus(hours);
}

function init() {
  getTime();
  setInterval(getTime, 10000);
}

init();
