const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body'),
}
let timerId = null;

refs.startBtn.addEventListener('click', () => {
    timerId = setInterval(bodyColorSwitcher, 1000);
    refs.startBtn.disabled = true;
});

refs.stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
})

function bodyColorSwitcher() {
    const randomColor = getRandomHexColor();
    refs.bodyEl.style.backgroundColor = `${randomColor}`;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

