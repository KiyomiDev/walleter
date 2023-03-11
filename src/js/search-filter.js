export function filter(arr, searchVal) {
  const result = arr.filter(el => el.innerText.toLowerCase().includes(searchVal));
  return result;
}

export function displayFilteredEl(arr) {
  for (const el of arr) {
    const accountContainer = el.closest('.account');
    accountContainer.style.display = '';
  }
}