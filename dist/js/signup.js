import countriesInfo from"../static/data/countriesInfo.json"assert{type:"json"};const currenciesList=document.querySelector(".currencies__list"),confirmStepBtns=document.querySelectorAll(".confirm__step"),setupForm=document.querySelectorAll(".setup__form");let stepsCount=0,barWidth=50;const selectedCurrency=document.querySelector(".selected__currency"),cashBalance=document.querySelector(".cash__balance .input"),confirmCashBtn=document.querySelector(".setup__form .cash"),getCurrenciesInfo=e=>{countriesInfo.forEach((e=>{const t=e.countryName,s=e.currencyName,n=e.currencyCode,c=`<option value="${n}" data-country-name=${t}>${n} - ${s}</option>`;"USD"!==n&&currenciesList.insertAdjacentHTML("beforeend",c)}))};countriesInfo.forEach((e=>{const t=e.countryName,s=e.currencyName,n=e.currencyCode,c=`<option value="${n}" data-country-name=${t}>${n} - ${s}</option>`;"USD"!==n&&currenciesList.insertAdjacentHTML("beforeend",c)}));const setUserCurrency=e=>{document.querySelectorAll(".currencies__list option").forEach((t=>{t.getAttribute("data-country-name")===e&&(t.selected=!0,selectedCurrency.innerText=t.value)}))};async function getUserCountry(){let e=await fetch("https://ipapi.co/json/");const t=(await e.json()).country_name;setUserCurrency(t)}getUserCountry(),confirmStepBtns.forEach((e=>{e.addEventListener("click",(t=>{setupForm[stepsCount].checkValidity()&&t.preventDefault();const s=e.getAttribute("data-step-name"),n=document.querySelector(`.${s} .input`).value;if(n){const e=document.querySelector(`.${s}`);e.classList.remove("active"),e.addEventListener("animationend",(t=>{if(e.classList.add("hide"),e.nextElementSibling){const t=e.nextElementSibling;t.classList.remove("hide"),t.classList.add("active")}}));const t=document.querySelectorAll(".setup__header .step");if(stepsCount<t.length){if(t[stepsCount].classList.contains("step__active")){t[stepsCount].classList.remove("step__active"),t[stepsCount].classList.add("step__done");if(document.querySelector(".bar__done").style.cssText=`background-color: #5ec576; width: ${barWidth}%`,t[stepsCount].nextElementSibling){t[stepsCount].nextElementSibling.classList.add("step__active")}}stepsCount++,barWidth<100&&(barWidth*=2)}if(stepsCount===t.length){localStorage.setItem("isUser",!0);const e=document.querySelector(".setup__container"),t=document.querySelector(".account__created");e.classList.add("hide"),t.classList.remove("hide"),t.classList.add("flex"),document.documentElement.style.setProperty("--success","success 1s forwards")}}localStorage.setItem(`${s}`,`${n}`)}))}));