const refs = {
  startBtn: document.querySelector("[data-start]"),
  stopBtn: document.querySelector("[data-stop]"),
};

let timerId = null;

refs.startBtn.addEventListener("click", onStartBtn);
refs.stopBtn.addEventListener("click", onStopBtn);

refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;

function onStartBtn(evt) {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  changeColor();
  timerId = setInterval(changeColor, 1000);
}

function onStopBtn() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearInterval(timerId);
}

function changeColor() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
