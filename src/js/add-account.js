const addAccountBtn = document.querySelector('.add__account-btn');
const accountModal = document.querySelector('.account__modal');
const accountModalTitle = document.querySelector('.account__modal .title');
const closeModalBtn = document.querySelector('.account__modal .close__modal');
const overlay = document.querySelector('.overlay');

// Display modal function
const openModal = _ => {
  accountModalTitle.innerText = 'add account';
  accountModal.classList.remove('hide-2');
  overlay.classList.remove('hide-2'); 
};

// Close modal function
const closeModal = _ => {
  accountModal.classList.add('hide-2');
  overlay.classList.add('hide-2'); 
};

// Display the add account form when clicking on the add account button
addAccountBtn.addEventListener('click', openModal);
// Close form when clicking on the close button
closeModalBtn.addEventListener('click', closeModal);
// Close form when clicking on the overlay element
overlay.addEventListener('click', closeModal);
// Close the form when pressing esc button on keyboard
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !accountModal.classList.contains('hide-2')) {
    closeModal();
  }
});