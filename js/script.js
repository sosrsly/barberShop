window.addEventListener("DOMContentLoaded", () => {
  'use strict';
  //modal 
  const buttons = document.querySelectorAll("button");
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector("#modal-consultation");
  const close = document.querySelectorAll(".close");
  const modalButton = document.querySelector(".modal__button");
  const modalThanks = document.querySelector("#modal-thanks");

  buttons[0].addEventListener("click", openModalWindow);
  buttons[1].addEventListener("click", openModalWindow);
  modalButton.addEventListener("click", openModalThanks);
  close[0].addEventListener("click", hideModalWindow);
  close[1].addEventListener("click", hideModalWindow);

  function openModalWindow() {
    overlay.style.display = "block";
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function hideModalWindow() {
    overlay.style.display = "";
    modal.style.display = "";
    modalThanks.style.display = "";
    document.body.style.overflow = "";
  }

  function openModalThanks(e) {
    e.preventDefault();
    modal.style.display = "";
    modalThanks.style.display = "block";
  }

  //slider, tabs
  const tabWrapper = document.querySelector(".info__header");
  const tabs = document.querySelectorAll(".info__tab");
  const content = document.querySelectorAll(".info__tab-content");
  const next = document.querySelector(".arrow-right");
  const prev = document.querySelector(".arrow-left");
  let currentSlide = 0;

  showContent(currentSlide);

  function showContent(n) {
    if (n > content.length - 1) {
      n = 0;
    } else if (n < 0) {
      n = content.length - 1;
    }

    for (let i = 0; i < content.length; i++) {
      content[i].classList.add("hidden");
      content[i].classList.remove("show");
      tabs[i].classList.remove("info__tab_active");
    }
    content[n].classList.remove("hidden");
    content[n].classList.add("show");
    tabs[n].classList.add("info__tab_active");
    currentSlide = n;
  }


  tabWrapper.addEventListener("click", e => {
    if (e.target.classList.contains("info__tab")) {
      for (let i = 0; i < tabs.length; i++) {
        if (e.target == tabs[i]) {
          showContent(i);
          break;
        }
      }
    }
  });

  function plusSlide(n) {
    showContent(currentSlide += n);
  }
  next.addEventListener("click", e => {
    plusSlide(1);
  });
  prev.addEventListener("click", e => {
    plusSlide(-1);
  });

// pageup
const pageUp = document.querySelector(".pageup");

window.addEventListener("scroll", (e) => {
  if (window.pageYOffset > 1800) {
    pageUp.style.display = "block";
  } else {
    pageUp.style.display = "";
  }
});
pageUp.addEventListener("click", () => {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth'
  });
});



  
  






});

  