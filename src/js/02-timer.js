import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates[0]);
  },
};

const dateTimePicker = flatpickr('#datetime-picker', options);
const startButton = document.querySelector('[data-start]');
const timerElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

startButton.disabled = true;

let countdownInterval;

function handleDateSelection(selectedDate) {
  const currentDate = new Date();
  if (selectedDate <= currentDate) {
    window.alert('Please choose a date in the future');
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
}

function startCountdown(selectedDate) {
  const targetDate = new Date(selectedDate).getTime();

  countdownInterval = setInterval(() => {
    const currentDate = new Date().getTime();
    const timeRemaining = targetDate - currentDate;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0);
    } else {
      updateTimerDisplay(timeRemaining);
    }
  }, 1000);
}

function updateTimerDisplay(timeRemaining) {
  const timeObject = convertMs(timeRemaining);
  timerElements.days.textContent = addLeadingZero(timeObject.days);
  timerElements.hours.textContent = addLeadingZero(timeObject.hours);
  timerElements.minutes.textContent = addLeadingZero(timeObject.minutes);
  timerElements.seconds.textContent = addLeadingZero(timeObject.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
  const selectedDate = dateTimePicker.selectedDates[0];
  startCountdown(selectedDate);
  startButton.disabled = true;
});
