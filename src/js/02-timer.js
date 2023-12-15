import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const elements = {
  start: document.querySelector('[data-start]'),
  datetimePicker: document.getElementById('datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

elements.start.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return (timer = { days, hours, minutes, seconds });
}

function updateTimerDisplay(time) {
  elements.days.textContent = addLeadingZero(time.days);
  elements.hours.textContent = addLeadingZero(time.hours);
  elements.minutes.textContent = addLeadingZero(time.minutes);
  elements.seconds.textContent = addLeadingZero(time.seconds);
}

flatpickr(elements.datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      alert('Please choose a date in the future');
      elements.start.disabled = true;
    } else {
      elements.start.disabled = false;
    }
  },
});

let countdownInterval;

elements.start.addEventListener('click', function () {
  const selectedDate = flatpickr.parseDate(elements.datetimePicker.value);
  const currentDate = new Date();
  const timeDifference = selectedDate - currentDate;

  elements.start.disabled = true;

  if (timeDifference <= 0) {
    return;
  }

  updateTimerDisplay(convertMs(timeDifference));

  countdownInterval = setInterval(function () {
    const currentTime = new Date();
    const timeRemaining = selectedDate - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      elements.start.disabled = true;
    } else {
      updateTimerDisplay(convertMs(timeRemaining));
    }
  }, 1000);
});
