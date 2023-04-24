const userNameInput = document.querySelector('.settings__form .username__input');
const userNameVal = localStorage.getItem('username');
const baseCurrencySelect = document.querySelector('.base__currency-select');
const baseCurrencyVal = localStorage.getItem('base__currency');

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