const currenciesList = document.querySelector('.currencies__list');
const confirmStepBtns = document.querySelectorAll('.confirm__step');
const setupForm = document.querySelectorAll('.setup__form');
let stepsCount = 0;
let barWidth = 50;
const selectedCurrency = document.querySelector('.selected__currency');
const cashBalance = document.querySelector('.cash__balance .input');
const confirmCashBtn = document.querySelector('.setup__form .cash');


confirmStepBtns.forEach(btn => {
  btn.addEventListener('click', e => {

    if (setupForm[stepsCount].checkValidity()) {
      e.preventDefault();
    }

    const stepName = btn.getAttribute('data-step-name');
    const inputEl = document.querySelector(`.${stepName} .input`);
    const inputValue = inputEl.value;

    if (inputValue) {
      const stepEl = document.querySelector(`.${stepName}`);
      stepEl.classList.remove('active');
      
      stepEl.addEventListener('animationend', _ => {
        stepEl.classList.add('hide')
        if (stepEl.nextElementSibling) {
          const nextStep = stepEl.nextElementSibling;
          nextStep.classList.remove('hide');
          nextStep.classList.add('active'); 
        }
      })
      
      const steps = document.querySelectorAll('.setup__header .step');
      
      if (stepsCount < steps.length) {
        if (steps[stepsCount].classList.contains('step__active')) {
          steps[stepsCount].classList.remove('step__active');
          steps[stepsCount].classList.add('step__done');
          const bar = document.querySelector('.bar__done');
          bar.style.cssText = `background-color: #5ec576; width: ${barWidth}%`;
          if (steps[stepsCount].nextElementSibling) {
            const nextEl = steps[stepsCount].nextElementSibling;
            nextEl.classList.add('step__active');
          }
        }
        stepsCount++;
        if (barWidth < 100) barWidth *= 2;
      } 
    }
  })
})
