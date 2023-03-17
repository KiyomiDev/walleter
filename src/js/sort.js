import { displayDefault,  resetAccounts} from "./accounts.js";
import { addAccToAccounts } from "./add-account.js";

let entries = [];
let sortedValues = [];

const sortBy = {
  "a-z": function (a, b) {
    if (a.name > b.name) {
      return 1;
    } else if (b.name > a.name) {
      return -1;
    } else return 0;
  },

  "z-a": function (a, b) {
    if (a.name < b.name) {
      return 1;
    } else if (b.name < a.name) {
      return -1;
    } else return 0;
  },

  "lowest-first": function (a, b) {
    if (a.amount > b.amount) {
      return 1;
    } else if (b.amount > a.amount) {
      return -1;
    } else return 0;
  },

  "highest-first": function (a, b) {
    if (a.amount < b.amount) {
      return 1;
    } else if (b.amount < a.amount) {
      return -1;
    } else return 0; 
  },
} 

export const sortByVal = optionVal => {
  let accountsObj = JSON.parse(localStorage.getItem('accountsObj'));
  const accountsCount = Number(localStorage.getItem('accounts-count'));
  const accountsValues = [];
  const accountsKeys = [];

  if (optionVal === 'default') displayDefault();
  
  if (accountsObj) entries = Object.entries(accountsObj);

  entries.forEach(el => accountsValues.push(el[1]));

  sortedValues = accountsValues.sort(sortBy[`${optionVal}`]);

  accountsObj = {};

  for (let i = 0; i < accountsCount; i++) {
    const accountKey = `account-${i + 1}`;
    accountsObj[accountKey] = sortedValues[i];
    accountsKeys.push(accountKey);
  }

  resetAccounts();

  accountsKeys.forEach(key => {
    const accountKey = accountsObj[key];
    const name = accountKey.name;
    const type = accountKey.type;
    const color = accountKey.color;
    const currency = accountKey.currency;
    const amount = accountKey.amount;
    addAccToAccounts(name, type, currency, amount, color);
  })
}