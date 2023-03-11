import { filter, displayFilteredEl } from "./search-filter.js";

const accountsSearchInput = document.querySelector('.accounts .search-input');
const allAccountsEl = document.querySelectorAll('.accounts .account');
const accountsName = Array.from(document.querySelectorAll('h3.account__name'));
const accountsType = Array.from(document.querySelectorAll('h3.account__type'));
const accountsCurrency = Array.from(document.querySelectorAll('.accounts .currency'));

// Search account by name, type or currency
accountsSearchInput.addEventListener('keyup', () => {
  const searchVal = accountsSearchInput.value.toLowerCase().trim();
  const filteredNames = filter(accountsName, searchVal);
  const filteredTypes = filter(accountsType, searchVal);
  const filteredCurrencies = filter(accountsCurrency, searchVal);

  allAccountsEl.forEach(acc => acc.style.display = 'none');
  
  displayFilteredEl(filteredNames);
  displayFilteredEl(filteredTypes);
  displayFilteredEl(filteredCurrencies);
})