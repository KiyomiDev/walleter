const addAccountBtn = document.querySelector('.add__account-btn');
const accountModal = document.querySelector('.account__modal');
const accountModalTitle = document.querySelector('.account__modal .title');
const closeModalBtn = document.querySelector('.account__modal .close__modal');
const overlay = document.querySelector('.overlay');
const accountNameEl = document.querySelector('.account__modal .account__name');
const accountColorEl = document.querySelector('.account__modal .account__color');
const accountTypeEl = document.querySelector('.account__modal .account__type');
const accountStartingAmountEl = document.querySelector('.account__modal .starting__amount');
const accountCurrencyEl = document.querySelector('.account__modal .account__currency');
const saveAccountBtn = document.querySelector('.account__modal .save__account');

// Display modal function
const openModal = _ => {
  accountModalTitle.innerText = 'add account';
  accountModal.classList.remove('hide-2');
  overlay.classList.remove('hide-2'); 
  accountNameEl.focus();
};

// Close modal function
const closeModal = _ => {
  accountModal.classList.add('hide-2');
  overlay.classList.add('hide-2'); 
};

// Display the add account form when clicking on the add account button
addAccountBtn.addEventListener('click', openModal);
// Close form when clicking on the close button
closeModalBtn.addEventListener('click', closeModal);
// Close form when clicking on the overlay element
overlay.addEventListener('click', closeModal);
// Close the form when pressing esc button on keyboard
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !accountModal.classList.contains('hide-2')) {
    closeModal();
  }
});

// Save new account data function
const saveAccountData = _ => {
  const accountNameVal = accountNameEl.value;
  const accountColorVal = accountColorEl.value;
  const accountTypeVal = accountTypeEl.value;
  const accountStartingAmountVal = accountStartingAmountEl.value;
  const accountCurrencyVal = accountCurrencyEl.value;
  localStorage.setItem('account-name', accountNameVal);
  localStorage.setItem('account-color', accountColorVal);
  localStorage.setItem('account-type', accountTypeVal);
  localStorage.setItem('account-starting-amount', accountStartingAmountVal);
  localStorage.setItem('account-currency', accountCurrencyVal);
}
// Save new account data in localstorage on click
saveAccountBtn.addEventListener('click', e => {
  e.preventDefault();
  saveAccountData();
  closeModal();
})