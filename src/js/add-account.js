const addAccountBtn = document.querySelector('.add__account-btn');
const accountModal = document.querySelector('.account__modal');
const accountModalTitle = document.querySelector('.account__modal .title');
const overlay = document.querySelector('.overlay');

// Display modal function
const openModal = _ => {
  accountModalTitle.innerText = 'add account';
  accountModal.classList.remove('hide-2');
  overlay.classList.remove('hide-2'); 
};

// Display the add account form when clicking on the add account button
addAccountBtn.addEventListener('click', openModal);