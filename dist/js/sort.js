import{displayDefault,resetAccounts}from"./accounts.js";import{addAccToAccounts}from"./add-account.js";let entries=[],sortedValues=[];const sortBy={"a-z":function(t,o){return t.name>o.name?1:o.name>t.name?-1:0},"z-a":function(t,o){return t.name<o.name?1:o.name<t.name?-1:0},"lowest-first":function(t,o){return t.amount>o.amount?1:o.amount>t.amount?-1:0},"highest-first":function(t,o){return t.amount<o.amount?1:o.amount<t.amount?-1:0}};export const sortByVal=t=>{let o=JSON.parse(localStorage.getItem("accountsObj"));const e=Number(localStorage.getItem("accounts-count")),n=[],a=[];"default"===t&&displayDefault(),o&&(entries=Object.entries(o)),entries.forEach((t=>n.push(t[1]))),sortedValues=n.sort(sortBy[`${t}`]),o={};for(let t=0;t<e;t++){const e=`account-${t+1}`;o[e]=sortedValues[t],a.push(e)}resetAccounts(),a.forEach((t=>{const e=o[t],n=e.name,a=e.type,c=e.color,s=e.currency,r=e.amount;addAccToAccounts(n,a,s,r,c)}))};