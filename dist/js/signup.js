import countriesInfo from"../static/data/countriesInfo.json"assert{type:"json"};const currenciesList=document.querySelector(".currencies__list"),confirmStepBtns=document.querySelectorAll(".confirm__step"),setupForm=document.querySelectorAll(".setup__form");let stepsCount=0,barWidth=50;const selectedCurrency=document.querySelector(".selected__currency"),cashBalance=document.querySelector(".cash__balance .input"),confirmCashBtn=document.querySelector(".setup__form .cash"),getCurrenciesInfo=e=>{countriesInfo.forEach((e=>{const t=e.countryName,n=e.currencyName,s=e.currencyCode,c=`<option value="${s}" data-country-name=${t}>${s} - ${n}</option>`;"USD"!==s&&currenciesList.insertAdjacentHTML("beforeend",c)}))};countriesInfo.forEach((e=>{const t=e.countryName,n=e.currencyName,s=e.currencyCode,c=`<option value="${s}" data-country-name=${t}>${s} - ${n}</option>`;"USD"!==s&&currenciesList.insertAdjacentHTML("beforeend",c)})),confirmStepBtns.forEach((e=>{e.addEventListener("click",(t=>{setupForm[stepsCount].checkValidity()&&t.preventDefault();const n=e.getAttribute("data-step-name");if(document.querySelector(`.${n} .input`).value){const e=document.querySelector(`.${n}`);e.classList.remove("active"),e.addEventListener("animationend",(t=>{if(e.classList.add("hide"),e.nextElementSibling){const t=e.nextElementSibling;t.classList.remove("hide"),t.classList.add("active")}}));const t=document.querySelectorAll(".setup__header .step");if(stepsCount<t.length){if(t[stepsCount].classList.contains("step__active")){t[stepsCount].classList.remove("step__active"),t[stepsCount].classList.add("step__done");if(document.querySelector(".bar__done").style.cssText=`background-color: #5ec576; width: ${barWidth}%`,t[stepsCount].nextElementSibling){t[stepsCount].nextElementSibling.classList.add("step__active")}}stepsCount++,barWidth<100&&(barWidth*=2)}}}))}));