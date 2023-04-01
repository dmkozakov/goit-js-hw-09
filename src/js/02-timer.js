import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/material_blue.css");
import { Notify } from "notiflix/build/notiflix-notify-aio";
import "notiflix/dist/notiflix-3.2.6.min.css";

Notify.init({
  position: "center-top",
});

const refs = {
  startBtn: document.querySelector("[data-start]"),
  dataDays: document.querySelector("[data-days]"),
  dataHours: document.querySelector("[data-hours]"),
  dataMins: document.querySelector("[data-minutes]"),
  dataSecs: document.querySelector("[data-seconds]"),
};

refs.startBtn.disabled = true;

flatpickr("#datetime-picker", {
  enableTime: true,
  altInput: true,
  time_24hr: true,
  dateFormat: "Y-m-d H:i",
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    if (selectedDate <= Date.now()) {
      refs.startBtn.disabled = true;
      Notify.failure("Please choose a date in the future");
      return;
    }

    let isActive = false;
    let intervalId = null;

    refs.startBtn.disabled = false;
    refs.startBtn.addEventListener("click", onStartBtn);

    function onStartBtn() {
      if (isActive) {
        refs.dataDays.textContent = "00";
        refs.dataHours.textContent = "00";
        refs.dataMins.textContent = "00";
        refs.dataSecs.textContent = "00";
        clearInterval(intervalId);
        return;
      } else {
        intervalId = setInterval(() => {
          isActive = true;
          const currentDate = Date.now();
          const deltaTime = selectedDate - currentDate;

          if (deltaTime < 10) {
            clearInterval(intervalId);
            Notify.success("You've reached a goal!");
            return;
          }

          const { days, hours, minutes, seconds } = convertMs(deltaTime);

          refs.dataDays.textContent = `${days}`;
          refs.dataHours.textContent = `${hours}`;
          refs.dataMins.textContent = `${minutes}`;
          refs.dataSecs.textContent = `${seconds}`;
        }, 1000);
      }
    }
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
