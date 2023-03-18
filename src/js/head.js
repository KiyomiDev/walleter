const userName = localStorage.getItem('username');
const userNameEl = document.querySelector('.head .user__info .username');

// Get first name
const firstName = userName.split(' ')[0];
// Display username
userNameEl.innerText = firstName;