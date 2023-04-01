import { Notify } from "notiflix/build/notiflix-notify-aio";
import "notiflix/dist/notiflix-3.2.6.min.css";

Notify.init({
  position: "center-top",
});

const refs = {
  form: document.querySelector(".form"),
};

refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const formInput = refs.form.elements;
  const firstDelay = Number(formInput.delay.value);
  const delayStep = Number(formInput.step.value);

  let delay = firstDelay;

  for (let i = 1; i <= formInput.amount.value; i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onReject);
    delay += delayStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
