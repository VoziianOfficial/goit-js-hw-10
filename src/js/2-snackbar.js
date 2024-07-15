import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector("form");

//обробник події сабміту форми
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Запобігаємо стандартній поведінці форми

  //значення затримки та стану форми
  const delayInput = event.target.elements.delay;
  const stateInput = event.target.elements.state;

  // Конверуваня затримки в число
  const delay = parseInt(delayInput.value);
  const state = stateInput.value;


  const promise = new Promise((resolve, reject) => {
    //  створення затримки
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // Викон проміс 
      } else {
        reject(delay); // Відхил проміс 
      }
    }, delay);
  });

  // Обробка результату
  promise
    .then((delay) => {
      // Вивод повідомлення
      iziToast.success({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch((delay) => {
      // Вивод повідомлення відхилення
      iziToast.error({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});

