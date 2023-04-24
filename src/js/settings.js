const userNameInput = document.querySelector('.settings__form .username__input');
const userNameVal = localStorage.getItem('username');
const baseCurrencySelect = document.querySelector('.base__currency-select');
const baseCurrencyVal = localStorage.getItem('base__currency');
const changeBtns = document.querySelectorAll('.settings__form .change');
const saveChangesBtn = document.querySelector('.user__info .save');
const headUserName = document.querySelector('.head .username');
const cancelChangesBtn = document.querySelector('.user__info .cancel');

// Display username
userNameInput.value = userNameVal;

// Fetch currencies data
fetch("../static/data/countriesInfo.json")
  .then((res) => res.json())
  .then((countriesInfo) => {
    countriesInfo.forEach(country => {
      const countryName = country.countryName;
      const currencyName = country.currencyName;
      const currencyCode = country.currencyCode;
      const currencyOptionEl = `<option ${currencyCode === baseCurrencyVal ? 'selected' : ''} value="${currencyCode}" data-country-name=${countryName}>${currencyCode} - ${currencyName}</option>`;
      baseCurrencySelect.insertAdjacentHTML('beforeend', currencyOptionEl);
    })
});

// Enable change data on click change button
changeBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const inputField = e.target.previousElementSibling;
    inputField.classList.remove('disabled');
    inputField.focus();
  })
})


// Save changes
saveChangesBtn.addEventListener('click', e => {
  const accountsObj = JSON.parse(localStorage.getItem('accountsObj'));
  const userNameInputVal = userNameInput.value;
  const baseCurrencySelectVal = baseCurrencySelect.value;

  if (userNameInputVal &&  userNameInputVal !== userNameVal) {
    localStorage.setItem('username', `${userNameInputVal}`);
    // Get first name
    const firstName = userNameInputVal.split(' ')[0];
    // Display username
    headUserName.innerText = firstName;
  }

  if (baseCurrencySelectVal !== baseCurrencyVal) {
    localStorage.setItem('base__currency', `${baseCurrencySelectVal}`);
    // Change base currency in base account
    accountsObj['account-1'].currency = baseCurrencySelectVal;
    localStorage.setItem('accountsObj', JSON.stringify(accountsObj));
  }
  e.preventDefault();
})

// Cancel changes when click cancel button
cancelChangesBtn.addEventListener('click', e => {
  e.preventDefault();
  userNameInput.value = localStorage.getItem('username');

  const baseCurrencyVal = localStorage.getItem('base__currency');
  const allOptions =  baseCurrencySelect.options;
  for (let i = 0; i < allOptions.length; i++) {
    const optionCountryName = baseCurrencySelect[i].value;
    if (optionCountryName === baseCurrencyVal) {
      baseCurrencySelect[i].selected = true;
    }
  }
})