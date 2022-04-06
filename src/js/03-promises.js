const formEl = document.querySelector('.form');
formEl.addEventListener('submit', callPromiseCreator);
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function callPromiseCreator(e,) {
  e.preventDefault();
  const {
    elements: { delay, step, amount } 
  } = e.currentTarget;
  let promiseDelay = Number(delay.value);
  for (let i = 1; i <= amount.value; i++) {
    if (i > 1) {
      promiseDelay += Number(step.value);
    }
    const promisePosition = i;
    createPromise(promisePosition, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  })
}

