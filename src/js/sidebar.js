const menuBtn = document.querySelector('.sidebar .menu__icon');
const pageContainer = document.querySelector('.page__container');
const headMenuIcon = document.querySelector('.page__container > .head .menu__icon');
const sidbarLogo = document.querySelector('.sidebar .img');

menuBtn.addEventListener('click', e => {
  pageContainer.classList.toggle('sidebar-closed');
  sidbarLogo.classList.toggle('hide');

  if (menuBtn.classList.contains('open__menu')) {
    menuBtn.className = `fa-solid fa-bars menu__icon`;
  } else {
    menuBtn.className = `fa-solid fa-bars-staggered menu__icon open__menu`;
  }
})