import { accountsObj, increaseAccountsNumber, displayAccounts, addAccToDashboard, initializeFormToEdit} from "./add-account.js"

document.addEventListener('DOMContentLoaded', _ => {
  if (localStorage.getItem('base-account-created')) {
    const color = '#000000';
    const getBaseData = _ => {
      const accountName = `Cash`;
      const accountType = `Cash`;
      const accountBaseCurrency = localStorage.getItem('base__currency');
      const accountCashBalance = localStorage.getItem('cash__balance');
      const dataArr = [accountName, accountBaseCurrency, accountCashBalance, accountType];
      return dataArr;
    }

    const [accountName, accountBaseCurrency, accountCashBalance, accountType] = getBaseData();

    // Save base account data
    const setBaseAccount = (accountName, accountType, accountBaseCurrency, accountCashBalance, color) => {
      accountsObj['account-1'] = {
        name: accountName,
        type: accountType,
        currency: accountBaseCurrency,
        amount: accountCashBalance,
        color: color,
      }
      localStorage.setItem("accountsObj", JSON.stringify(accountsObj));
      if (!localStorage.getItem('accounts-count')) {
        increaseAccountsNumber()
      }
    }

    setBaseAccount(accountName, accountType, accountBaseCurrency, accountCashBalance, color);
    displayAccounts(addAccToDashboard);
    initializeFormToEdit();
    localStorage.removeItem('base-account-created')
  }
});