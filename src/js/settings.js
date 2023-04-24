const userNameInput = document.querySelector('.settings__form .username__input');
const userNameVal = localStorage.getItem('username');

// Display username
userNameInput.value = userNameVal;