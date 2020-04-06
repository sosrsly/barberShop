
if (document.body.clientWidth >= 576) {

  // youtube player promo section
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '1040px',
      width: '2400px',
      videoId: 'RbfJTBBIrso',
      playerVars: { 'autoplay': 1, 'controls': 0 },
      loopPlaylists: true,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function onPlayerReady(event) {
    event.target.setVolume(0);
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      event.target.playVideo();
    }
  }
  
  function stopVideo() {
    player.stopVideo();
  }


// section reviews tabs content

const contentWrapper = document.querySelectorAll(".reviews__content");
const nextArrow = document.querySelector(".next-arrow");
const prevArrow = document.querySelector(".prev-arrow");
const dotsWrapper = document.querySelector(".reviews__dots");
const dots = document.querySelectorAll(".reviews__dot");
var currentSlide = 1;

showSlide(currentSlide);

function showSlide(slide) {
  if (slide > contentWrapper.length) {
    currentSlide = 1;
  } else if (slide < 1) {
    currentSlide = contentWrapper.length;
  }

  contentWrapper.forEach(item => item.classList.remove('show'));
  contentWrapper.forEach(item => item.classList.add('hidden'));

  dots.forEach(item => item.classList.remove('active-dot'));

  contentWrapper[currentSlide - 1].classList.remove('hidden');
  contentWrapper[currentSlide - 1].classList.add('show');
  dots[currentSlide - 1].classList.add('active-dot');
}

function plusSlide(n) {
  currentSlide += n;
  showSlide(currentSlide);
}

nextArrow.addEventListener("click", () => {
  plusSlide(1);
});

prevArrow.addEventListener("click", () => {
  plusSlide(-1);
});

dotsWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("reviews__dot")) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (dots[i - 1] == e.target) {
        currentSlide = i;
        showSlide(i);
      }
    }
  }
});


//MORE
const description = document.querySelectorAll('.reviews__descr');

function cutText(text, limit) {
  text = text.trim();
  if ( text.length <= limit) {
  return text;
  }

  text = text.slice(0, limit);

  return text.trim();
}

function createMore(i) {
  const more = document.createElement('span');
  more.textContent = '...';
  more.classList.add('more');
  more.setAttribute("data-index-more", i);
  return more;
}

function changeContent(item, i) {
  item.setAttribute("data-index-content", i);

  if (item.textContent.length > 195) {
    const more = createMore(i);
    let text = cutText(item.textContent, 195);
    item.textContent = text;
    item.append(more);
  }
}
const oldText = [];

description.forEach((item, i) => {
  oldText.push(item.textContent);
  changeContent(item, i);
});


const more = document.querySelectorAll('.more');

for (let i = 0; i < more.length; i++) {
  more[i].addEventListener('click', (e) => {
    for (let i = 0; i < description.length; i++) {
      if (e.target.getAttribute('data-index-more') === description[i].getAttribute('data-index-content')) {
        description[i].textContent = oldText[i];
      }
    }
  });
}

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

//section works

const imgWrapper = document.querySelector('.works__wrapper');
const worksItems = document.querySelectorAll('.works__item');
const popup = document.querySelector('.popup');
const popupBG = document.querySelector('.popup_bg');
const arrowNext = document.querySelector('.popup-next');
const arrowPrev = document.querySelector('.popup-prev');

//При наведение эффект увеличения картинки
imgWrapper.addEventListener('mouseover', (e) => {
  for (let i = 0; i < worksItems.length; i++) {
    if (e.target.classList.contains('works__item') && worksItems[i] === e.target) {
      worksItems[i].style.transform = 'scale(1.05)';
      worksItems[i].style.transition = 'transform 0.5s';
      worksItems[i].style.zIndex = '5';
    }
  } 
});
// Когда убираем курсор картинка плавно возврращается на исходное положение
imgWrapper.addEventListener('mouseout', (e) => {
  for (let i = 0; i < worksItems.length; i++) {
    if (e.target.classList.contains('works__item') && worksItems[i] === e.target) {
      worksItems[i].style.transform = 'scale(1.00)';
      worksItems[i].style.zIndex = '0';
    }
  } 
});
let currentImg = 0;
// Также отменить эффекты увеличения картинки при клике
imgWrapper.addEventListener('click', (e) => {
  for (let i = 0; i < worksItems.length; i++) {
    if (e.target.classList.contains('works__item') && worksItems[i] === e.target) {
      worksItems[i].style.transform = 'scale(1.00)';
      worksItems[i].style.zIndex = '0';
      currentImg = i;
    }
  } 
});

//При клике на картинку открыть модальное изображение
for (let i = 0; i < worksItems.length; i++) {
  let index = i + 1;
  worksItems[i].addEventListener('click', (e) => {
    popup.style.display = 'block';
    let img = createImg(index);
    popupBG.append(img);
  });
}

function createImg(index) {
  const img = document.createElement('img');
  img.src = `img/${index}.jpg`;
  img.classList.add('popup_img');
  img.classList.add('fade');
  return img;
}

function hideModal() {
  popup.style.display = 'none';
  popupBG.innerHTML = '';
}

function takeCurrentImg(n) {
  currentImg += n;
  if (currentImg > 8) {
    currentImg = 0;
  }
  if (currentImg < 0) {
    currentImg = 8;
  }
  return currentImg;
}

//При клике на BG скрывать модальное изображение
popupBG.addEventListener('click', (e) => {
  hideModal();
});



arrowNext.addEventListener('click', (e) => {
  popupBG.innerHTML = '';
  const img = createImg(takeCurrentImg(1) + 1);
  popupBG.append(img);
});

arrowPrev.addEventListener('click', (e) => {
  popupBG.innerHTML = '';
  const img = createImg(takeCurrentImg(-1) + 1);
  popupBG.append(img);
});


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

//modal window

const button = document.querySelectorAll('.button');
const overlay = document.querySelector('.overlay');
const btnGetInfo = document.querySelector('.btn-signin');

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
}


if (document.body.clientWidth < 768) {
  
//habgurger
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.navigator-menu__list');

hamburger.addEventListener("click", (e) => {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('navigator-menu__list_active');
});

const button = document.querySelectorAll('.button');
const overlay = document.querySelector('.overlay');
const btnGetInfo = document.querySelector('.btn-signin');

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



//section works
const imgWrapper = document.querySelector('.works__wrapper');
const worksItems = document.querySelectorAll('.works__item');
const popup = document.querySelector('.popup');
const popupBG = document.querySelector('.popup_bg');
const arrowNext = document.querySelector('.popup-next');
const arrowPrev = document.querySelector('.popup-prev');

let currentImg = 0;
//При клике на картинку открыть модальное изображение
for (let i = 0; i < worksItems.length; i++) {
  let index = i + 1;
  worksItems[i].addEventListener('click', (e) => {
    popup.style.display = 'block';
    let img = createImg(index);
    popupBG.append(img);
  });
}

//При клике на BG скрывать модальное изображение
popupBG.addEventListener('click', (e) => {
  hideModal();
});



arrowNext.addEventListener('click', (e) => {
  popupBG.innerHTML = '';
  const img = createImg(takeCurrentImg(1) + 1);
  popupBG.append(img);
});

arrowPrev.addEventListener('click', (e) => {
  popupBG.innerHTML = '';
  const img = createImg(takeCurrentImg(-1) + 1);
  popupBG.append(img);
});
}


  