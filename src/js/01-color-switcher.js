let intervalId;

const elements = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.body,
};

function getRandomHexColor() {
  return `#${Math.floor(16777215 * Math.random()).toString(16)}`;
}

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
