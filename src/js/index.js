const startBtn = document.querySelector('.start .nav__link');

if (localStorage.getItem('isUser')) {
  startBtn.innerText = 'Dashboard';
  startBtn.href = 'dashboard.html';
}