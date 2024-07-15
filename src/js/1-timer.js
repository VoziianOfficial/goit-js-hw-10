
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// конвертації мілісекунд у об'єкт 
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

const mainInp = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

// зберігання обраної користувачем дати
let userSelectedDate;

// Поточна дата
const todayDate = new Date();

// Опції для календаря вибору дати та часу
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: todayDate,
  minuteIncrement: 1,

  // Обробник події закриття календаря
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      // перевірка якщо обрана дата менше поточної
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        backgroundColor: '#ef4040',
      });
      button.disabled = true; // вкл "Start"
    } else {
      button.disabled = false; // "Start" активна
    }
  },
};


flatpickr(mainInp, options);

// встановлення таймера
function setTimer(userDate) {
  if (userDate !== undefined) {
    button.setAttribute('disabled', ''); // Вимикаємо кнопку "Start"
    const currentTime = Date.now();
    const timeDiff = userDate.getTime() - currentTime;
    updateDate(timeDiff); // Оновлюємо відображення таймера

    // оновленя кождую секунду
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const timeDiff = userDate.getTime() - currentTime;

      if (timeDiff <= 0) {
        clearInterval(timer); // стоп якщо час вийшов
        resetTimer();
        iziToast.success({
          title: 'Completed',
          message: 'The countdown has ended!',
        });
        return;
      }
      updateDate(timeDiff);
    }, 1000);
  }
}

button.addEventListener('click', () => {
  setTimer(userSelectedDate);
});


function updateDate(timeDiff) {
  const { days, hours, minutes, seconds } = convertMs(timeDiff);

 
  spanDays.textContent = days.toString().padStart(2, '0');
  spanHours.textContent = hours.toString().padStart(2, '0');
  spanMinutes.textContent = minutes.toString().padStart(2, '0');
  spanSeconds.textContent = seconds.toString().padStart(2, '0');
}
