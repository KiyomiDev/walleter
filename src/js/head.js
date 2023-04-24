const userName = localStorage.getItem('username');
const userNameEl = document.querySelector('.head .user__info .username');
const profileImgUrl = localStorage.getItem('profile-image');

// Get first name
const firstName = userName.split(' ')[0];
// Display username
userNameEl.innerText = firstName;

if (profileImgUrl) {
  document.querySelector('.head .user__image').style.backgroundImage =  profileImgUrl;
}