import{filter,displayFilteredEl}from"./search-filter.js";const accountsSearchInput=document.querySelector(".accounts .search-input"),allAccountsEl=document.querySelectorAll(".accounts .account"),accountsName=Array.from(document.querySelectorAll("h3.account__name")),accountsType=Array.from(document.querySelectorAll("h3.account__type")),accountsCurrency=Array.from(document.querySelectorAll(".accounts .currency"));accountsSearchInput.addEventListener("keyup",(()=>{const c=accountsSearchInput.value.toLowerCase().trim(),e=filter(accountsName,c),t=filter(accountsType,c),r=filter(accountsCurrency,c);allAccountsEl.forEach((c=>c.style.display="none")),displayFilteredEl(e),displayFilteredEl(t),displayFilteredEl(r)}));