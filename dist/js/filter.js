export function filter(e,t){return e.filter((e=>e.innerText.toLowerCase().includes(t)))}export function displayFilteredEl(e){for(const t of e){t.closest(".account").style.display=""}}