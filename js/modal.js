//modal window
const button = document.querySelectorAll('.button');
const overlay = document.querySelector('.overlay');
const btnGetInfo = document.querySelector('.btn-signin');

// hamburger
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.navigator-menu__list');

//modal window
for (let btn of button) {
    btn.addEventListener('click', () => {
      overlay.style.display = 'block';
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay')) {
      overlay.style.display = 'none';
    }
  });

  btnGetInfo.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Успех');
    overlay.style.display = 'none';
  });

  //hamgurger

  hamburger.addEventListener("click", (e) => {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('navigator-menu__list_active');
  });

  for (let btn of button) {
  btn.addEventListener('click', () => {
      overlay.style.display = 'block';
  });
  }

  overlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('overlay')) {
      overlay.style.display = 'none';
  }
  });

  btnGetInfo.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Успех');
  overlay.style.display = 'none';
  });