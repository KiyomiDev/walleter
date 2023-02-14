import countriesInfo from '../static/data/countriesInfo.json' assert {type:'json'};

const currenciesList = document.querySelector('.currencies__list');
const confirmStepBtns = document.querySelectorAll('.confirm__step');
const setupForm = document.querySelectorAll('.setup__form');
let stepsCount = 0;
let barWidth = 50;
const selectedCurrency = document.querySelector('.selected__currency');
const cashBalance = document.querySelector('.cash__balance .input');
const confirmCashBtn = document.querySelector('.setup__form .cash');


const getCurrenciesInfo = _ => {
  countriesInfo.forEach(country => {
    const countryName = country.countryName;
    const currencyName = country.currencyName;
    const currencyCode = country.currencyCode;
    const currencyOptionEl = `<option value="${currencyCode}" data-country-name=${countryName}>${currencyCode} - ${currencyName}</option>`;
    currencyCode === 'USD' ? 0 : currenciesList.insertAdjacentHTML('beforeend', currencyOptionEl);
  })
}

getCurrenciesInfo();

const setUserCurrency = (userCountryName) => {
  const allOptions =   document.querySelectorAll('.currencies__list option');
  allOptions.forEach(option => {
    const optionCountryName = option.getAttribute('data-country-name');
  
    if (optionCountryName === userCountryName) {
      option.selected = true;
      selectedCurrency.innerText = option.value;
    }
  })
}

async function getUserCountry() {
  let res = await fetch('https://ipapi.co/json/'),
  resData = await res.json();
  const userCountryName = resData.country_name;
  setUserCurrency(userCountryName);
}

getUserCountry();

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

      if (stepsCount === steps.length) {
        localStorage.setItem('isUser', true);
        const setupContainer = document.querySelector('.setup__container');
        const accountCreatedEl = document.querySelector('.account__created');

        setupContainer.classList.add('hide');
        accountCreatedEl.classList.remove('hide');
        accountCreatedEl.classList.add('flex');

        document.documentElement.style.setProperty('--success', "success 1s forwards");
      }

    }

    localStorage.setItem(`${stepName}`, `${inputValue}`);
    localStorage.getItem('base__currency') ? cashBtnText() : confirmCashBtn.innerText = `Start with 0.00`;
  })
})

const cashBtnText = _ => confirmCashBtn.innerText = `Start with ${cashBalance.value} ${localStorage.getItem('base__currency')}`;

currenciesList.addEventListener('input', _ => selectedCurrency.innerText = currenciesList.value);
cashBalance.addEventListener('input', _ => cashBtnText());