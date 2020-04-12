let mql2 = window.matchMedia('all and (max-width: 575px)');
if (!mql2.matches) {
  //section employees animation
  const workersWrapper = document.querySelector('.employees__wrapper');
  const item = document.querySelectorAll('.employees__item');


  for(let i = 0; i < item.length; i++) {
    item[i].addEventListener("mouseenter", (e) => {
      e.target.classList.add('darken');
      e.target.children[0].classList.remove('NoVis');
      e.target.children[0].style.transform = 'translateY(-30px)';
      e.target.children[0].style.transition = 'transform .5s';
    });
  }

  for(let i = 0; i < item.length; i++) {
    item[i].addEventListener("mouseleave", (e) => {
      e.target.classList.remove('darken');
      e.target.children[0].classList.add('NoVis');
      e.target.children[0].style.transform = 'translateY(0px)';
    });
  }

  // stocks animation mouseenter

  const stocksBlocks = document.querySelector('.stocks');
  const block = document.querySelectorAll('.stocks__block');
  const stocksButton = document.querySelectorAll('.stocks__button');
  const textContent = document.querySelectorAll('.stocks__text-coontent');

  for (let i = 0; i < block.length; i++) {
    block[i].addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.backgroundColor = 'rgba(1,1,1,.4)';
        stocksButton[i].classList.remove('NoVis');
        stocksButton[i].style.transform = 'translateY(40px)';
        stocksButton[i].style.transition = 'transform .3s';
        textContent[i].style.transform = 'translateY(-40px)';
        textContent[i].style.transition = 'transform .3s';
        
  });
  }

  for (let i = 0; i < block.length; i++) {
    block[i].addEventListener('mouseleave', (e) => {
      e.target.style.transform = 'scale(1.0)';
      e.target.style.backgroundColor = 'rgba(1,1,1,.7)';
      stocksButton[i].classList.add('NoVis');
      stocksButton[i].style.transform = 'translateY(0px)';
      textContent[i].style.transform = 'translateY(0px)';

    });
  }

  
  const scrollUp = document.querySelector('.scrollUp');
  window.addEventListener('scroll', (e) => {
    if (this.pageYOffset > 1600) {
      scrollUp.style.display = 'block';
    } else {
      scrollUp.style.display = 'none';
    }
  });

  scrollUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
} else {
 
}




  