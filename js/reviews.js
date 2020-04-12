//reviews
const contentWrapper = document.querySelectorAll(".reviews__content");
const nextArrow = document.querySelector(".next-arrow");
const prevArrow = document.querySelector(".prev-arrow");
const dotsWrapper = document.querySelector(".reviews__dots");
const dots = document.querySelectorAll(".reviews__dot");
let currentSlide = 1;

//MORE
const description = document.querySelectorAll('.reviews__descr');
const oldText = [];


//functions reviews
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
  
  //functions MORE
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



  // reviews carousel
  showSlide(currentSlide);

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


  //swipe
  let startPoint2={};
  let nowPoint2;
  let ldelay2;

  const reviews = document.querySelector('.reviews');
  reviews.addEventListener('touchstart', function(event) {
    // event.preventDefault();
    event.stopPropagation();
    startPoint2.x=event.changedTouches[0].pageX;
    startPoint2.y=event.changedTouches[0].pageY;
    ldelay2=new Date();
  });

  /*Ловим движение пальцем*/
  reviews.addEventListener('touchmove', function(event) {
    // event.preventDefault();
    event.stopPropagation();
    let otk={};
    nowPoint2=event.changedTouches[0];
    otk.x=nowPoint2.pageX-startPoint2.x;
    /*Обработайте данные*/
    /*Для примера*/
    if(Math.abs(otk.x)>140){
      if(otk.x<0){
        // СВАЙП ВЛЕВО
        plusSlide(-1);
      }
      if(otk.x>0){
        // СВАЙП ВПРАВО
        plusSlide(1);
      }
      startPoint2={x:nowPoint2.pageX,y:nowPoint2.pageY};
    }
  });

  /*Ловим отпускание пальца*/
  reviews.addEventListener('touchend', function(event) {
    var pdelay=new Date();
    nowPoint2=event.changedTouches[0];
    var xAbs = Math.abs(startPoint2.x - nowPoint2.pageX);
    var yAbs = Math.abs(startPoint2.y - nowPoint2.pageY);

    if ((xAbs > 20 || yAbs > 20) && (pdelay.getTime()-ldelay2.getTime())<200) {
      if (xAbs > yAbs) {
        if (nowPoint2.pageX < startPoint2.x){
          /*СВАЙП ВЛЕВО*/
          plusSlide(-1);
        }
        else{
          /*СВАЙП ВПРАВО*/
          plusSlide(1);
        }
      }
      else {
        if (nowPoint2.pageY < startPoint2.y){
          /*СВАЙП ВВЕРХ*/
          console.log("SWIPE UP");
        }
        else{
          /*СВАЙП ВНИЗ*/
          console.log("SWIPE BOT");
        }
      }
    }
  });