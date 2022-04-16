
const bntStart = document.querySelector("button[data-start]");
const bntStop = document.querySelector("button[data-stop]");
const bodyBackground = document.querySelector('body');


bntStart.addEventListener('click', startChangrColor);
bntStop.addEventListener('click', stopChangrColor);

bntStop.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

let timer = null;

function startChangrColor() {

    timer = setInterval( () => bodyBackground.style.backgroundColor = getRandomHexColor(), 1000);
    bntStart.setAttribute('disabled', true);
    bntStop.removeAttribute('disabled');
};

function stopChangrColor() {
    clearInterval(timer);
    bntStop.setAttribute('disabled', true);
    bntStart.removeAttribute('disabled');
};

