import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  bodyEl: document.querySelector('body'),
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysValueEl: document.querySelector('span[data-days]'),
  hoursValueEl: document.querySelector('span[data-hours]'),
  minutesValueEl: document.querySelector('span[data-minutes]'),
  secondsValueEl: document.querySelector('span[data-seconds]'),
}

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedTime = selectedDates[0].getTime();
      const currentTime = Date.now();
      if (selectedTime < currentTime) {
        Notify.failure('Please choose a date in the future')
        refs.startBtn.disabled = true;
      }
      else {
        refs.startBtn.disabled = false;
      }
      console.log(selectedDates[0]);

      class Timer {
      constructor({time}) {
        this.time = time;
        this.timerId = null;
        this.isActive = false;
      }

        start() {
          refs.startBtn.disabled = true;

          this.timerId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;
            const timeToStart = this.convertMs(deltaTime);
          
            this.time(timeToStart);
            
            if (deltaTime < 1000) {
            this.stop();
            }
          }, 1000)
        }

        stop() {
          clearInterval(this.timerId);
          refs.startBtn.disabled = false;
        }

        convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = this.addLeadingZero(Math.floor(ms / day));
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
        }

        addLeadingZero(value) {
          return String(value).padStart(2, '0');
        }
    }

      function updateInterface({ days, hours, minutes, seconds }) {
        refs.daysValueEl.textContent = `${days}`;
        refs.hoursValueEl.textContent = `${hours}`;
        refs.minutesValueEl.textContent = `${minutes}`;
        refs.secondsValueEl.textContent = `${seconds}`;
      }

      const timer = new Timer({
        time: updateInterface
      })

      refs.startBtn.addEventListener('click', timer.start.bind(timer));
  },
};

flatpickr(refs.dateInput, options);

