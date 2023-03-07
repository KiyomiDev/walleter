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
const dashboardAccounts = document.querySelector('.dashboard .accounts');
const currentPathname = location.pathname;
let accountNum = 0;

let accountsObj = {};

if (localStorage.getItem('accountsObj') != null) {
  accountsObj = JSON.parse(localStorage.getItem('accountsObj'));
}

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
// Save account data in localstorage on click
saveAccountBtn.addEventListener('click', e => {
  e.preventDefault();
  if (accountModalTitle.innerText === 'ADD ACCOUNT') {
    saveAccountData();
    addAccount();
    closeModal();
  } else {
    initializeFormToEdit();
    editAccount();
    saveAccountData();
    closeModal();
  }
})

// Get the new account data from local storage
const getData = _ => {
  const accountName = localStorage.getItem('account-name');
  const accountType = localStorage.getItem('account-type');
  const accountCurrency = localStorage.getItem('account-currency');
  const accountStartingAmount = localStorage.getItem('account-starting-amount');
  const accountColor = localStorage.getItem('account-color');
  const dataArr = [accountName, accountType, accountCurrency, accountStartingAmount, accountColor]
  return dataArr;
} 

// Create and add the new account in the dashboard page
const addAccToDashboard = (name, type, currency, amount, color) => {
  const accountWidth = (dashboardAccounts.offsetWidth * (matchMedia(`(max-width: 368px)`) ? 25 : 18)) / 100;
  // Get the total width of the children
  const children = dashboardAccounts.children;
  let totalWidth = 0;

  for (let i = 0; i < children.length; i++) {
      totalWidth += parseInt(children[i].offsetWidth, 10);
  }

  const isThereSpace = totalWidth < dashboardAccounts.offsetWidth - accountWidth;

  if (isThereSpace) {
    const accountEl = document.createElement('div');
    accountEl.id = `account-${++accountNum}`;
    accountEl.classList.add('account');

    const accountTemp = `
          <i class="fa-solid fa-sack-dollar icon"></i>
          <div class="info">
            <h3 class="account__name">${name}</h3>
            <span class="currency">${currency} </span>
            <span class="amount">${amount}</span>
          </div>
          <i class="fa-solid fa-pen edit"></i>
      `

    accountEl.innerHTML = accountTemp;
    accountEl.style.backgroundColor = `${color}`;
    dashboardAccounts.insertBefore(accountEl, dashboardAccounts.lastChild);
  }
}

// Add Account Function
const addAccount =  _ => {
  let [name, type, currency, amount, color] = getData();
  if (currentPathname === '/dashboard.html') {
    addAccToDashboard(name, type, currency, amount, color);
    saveAllAccountsData(name, type, currency, amount, color);
    initializeFormToEdit();
  }
}
// Increase accounts number
const increaseAccountsNumber = _ => {
  let accountsCount = Number(localStorage.getItem('accounts-count'));
  localStorage.setItem('accounts-count', ++accountsCount);
}

// Save all accounts data in an object in local storage 
const saveAllAccountsData = (name, type, currency, amount, color) => {
  increaseAccountsNumber();
  const accountKey = `account-${localStorage.getItem('accounts-count')}`;
  accountsObj[accountKey] = {
    name: name,
    type: type,
    currency: currency,
    amount: amount,
    color: color,
  };

  localStorage.setItem("accountsObj", JSON.stringify(accountsObj));
}

// Display accounts from local storage
const displayAccounts = (fn) => {
  const accounts = JSON.parse(localStorage.getItem('accountsObj'));
  for (const account in accounts) {
    const name = accounts[account].name;
    const type = accounts[account].type;
    const amount = accounts[account].amount;
    const currency = accounts[account].currency;
    const color = accounts[account].color;
    fn(name, type, currency, amount, color);
  }
}

const formUpdate = accountId => {
  // Change form title
  accountModalTitle.innerText = 'edit account';
  // Disable currency change
  accountCurrencyEl.setAttribute('disabled', '');
  accountCurrencyEl.style.cursor = 'not-allowed';
  closeModalBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  localStorage.setItem('changed-id', accountId);

  // In the input fields, show the account data that will be modified
  const accountsObj = JSON.parse(localStorage.getItem('accountsObj'));
  accountNameEl.value = accountsObj[accountId].name;
  accountTypeEl.value = accountsObj[accountId].type;
  accountColorEl.value = accountsObj[accountId].color;
  accountStartingAmountEl.value = accountsObj[accountId].amount;
}

const initializeFormToEdit = _ => {
  const edit = Array.from(document.querySelectorAll('.edit'));

  edit.forEach(el => {
    el.addEventListener('click', e => {
      const accountId = e.target.parentNode.id;
      openModal();
      formUpdate(accountId);
    })
  })
}

function editAccount() {
  const changedAcc = localStorage.getItem('changed-id');
  const accountEl = document.getElementById(changedAcc) 
  const [name, type, , amount, color] = getData();
  
  const nameEl = document.querySelector(`#${changedAcc} .account__name`);
  const amountEl = document.querySelector(`#${changedAcc} .amount`);

  nameEl.innerText = name;
  amountEl.innerText = amount;
  accountEl.style.backgroundColor = `${color}`;

  let accountsObj = JSON.parse(localStorage.getItem('accountsObj'));
  accountsObj[changedAcc].name = name;
  accountsObj[changedAcc].amount = amount;
  accountsObj[changedAcc].type = type;
  accountsObj[changedAcc].color = color;

  localStorage.setItem('accountsObj', JSON.stringify(accountsObj));
}

if (currentPathname === '/dashboard.html') {
  displayAccounts(addAccToDashboard);
  initializeFormToEdit();
}