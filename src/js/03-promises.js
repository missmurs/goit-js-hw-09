import Notiflix from 'notiflix';

const form = document.querySelector('form.form');

form.addEventListener('submit', onCreatePromiseClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onCreatePromiseClick(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name=delay]');
  const stepInput = document.querySelector('input[name=step]');
  const amountInput = document.querySelector('input[name=amount]');

  let inputDelay = Number(delayInput.value);
  let inputStep = Number(stepInput.value);
  let inputAmount = Number(amountInput.value);

  for (let i = 1; i <= inputAmount; i += 1) {
    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    inputDelay += inputStep;
  }
}
