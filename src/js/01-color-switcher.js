let intervalId;

const elements = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.body,
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

elements.body.style.cssText =
  'display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;';
elements.start.style.cssText = 'margin: 5px; padding: 20px; font-size: 16px;';
elements.stop.style.cssText = 'margin: 5px; padding: 20px; font-size: 16px;';

elements.stop.disabled = true;

elements.start.addEventListener('click', function () {
  elements.body.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(() => {
    elements.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  elements.start.disabled = true;
  elements.stop.disabled = false;
});

elements.stop.addEventListener('click', function () {
  clearInterval(intervalId);
  elements.start.disabled = false;
  elements.stop.disabled = true;
});

function onClickStart() {
  startBtn.toggleAttribute('disabled');
  stopBtn.removeAttribute('disabled');
  timeId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickStop() {
  clearInterval(timeId);
  stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');
}
