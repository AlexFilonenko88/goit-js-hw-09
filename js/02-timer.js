// import flatpickr from 'flatpickr';

// import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector("button[data-start]");
const input = document.querySelector('#datetime-picker');

const fieldDays = document.querySelector(".value[data-days]");
const fieldHours = document.querySelector('.value[data-hours]');
const fieldMinutes = document.querySelector('.value[data-minutes]');
const fieldSeconds = document.querySelector('.value[data-seconds]');



let inputChangeData = null;
btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      inputChangeData = selectedDates[0].getTime();
      console.log(inputChangeData);
      let timeNow = options.defaultDate.getTime();
      if (inputChangeData < timeNow) {
          alert("Please choose a date in the future");
          return;
      }
      btnStart.removeAttribute('disabled');
      btnStart.addEventListener('click', onClick);
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function onClick() {
    const timer = setInterval(() => {
        let result = inputChangeData - Date.now();
        if (result <= 1) {
            clearInterval(timer);
            result = 0;
            alert("Selected date has arrived!");
        };
        btnStart.setAttribute('disabled', true);
    
        const total = convertMs(result);
    
        fieldDays.textContent = `${pad(total.days)}`;
        fieldHours.textContent = `${pad(total.hours)}`;
        fieldMinutes.textContent = `${pad(total.minutes)}`;
        fieldSeconds.textContent = `${pad(total.seconds)}`;
    }, 1000);
};
    
function pad(value) {
  return String(value).padStart(2, '0');
};


