//works
const imgWrapper = document.querySelector('.works__wrapper');
const worksItems = document.querySelectorAll('.works__item');
const popup = document.querySelector('.popup');
const popupBG = document.querySelector('.popup_bg');
const arrowNext = document.querySelector('.popup-next');
const arrowPrev = document.querySelector('.popup-prev');
let currentImg = 0;

//functions works
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



   //section works
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

  //При клике на BG скрывать модальное изображение
  popupBG.addEventListener('click', (e) => {
    document.body.style.overflow = "";
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



  // swipe section works

  let startPoint={};
  let nowPoint;
  let ldelay;
  
  popup.addEventListener('touchstart', function(event) {
    // event.preventDefault();
    event.stopPropagation();
    startPoint.x=event.changedTouches[0].pageX;
    startPoint.y=event.changedTouches[0].pageY;
    ldelay=new Date();
  });

  /*Ловим движение пальцем*/
  popup.addEventListener('touchmove', function(event) {
    // event.preventDefault();
    event.stopPropagation();
    let otk={};
    nowPoint=event.changedTouches[0];
    otk.x=nowPoint.pageX-startPoint.x;
    /*Обработайте данные*/
    /*Для примера*/
    if(Math.abs(otk.x)>140){
      if(otk.x<0){
        // СВАЙП ВЛЕВО
        popupBG.innerHTML = '';
        const img = createImg(takeCurrentImg(1) + 1);
        popupBG.append(img);
      }
      if(otk.x>0){
        // СВАЙП ВПРАВО
        popupBG.innerHTML = '';
        const img = createImg(takeCurrentImg(-1) + 1);
        popupBG.append(img);
      }
      startPoint={x:nowPoint.pageX,y:nowPoint.pageY};
    }
  });

  /*Ловим отпускание пальца*/
  popup.addEventListener('touchend', function(event) {
    var pdelay=new Date();
    nowPoint=event.changedTouches[0];
    var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
    var yAbs = Math.abs(startPoint.y - nowPoint.pageY);

    if ((xAbs > 20 || yAbs > 20) && (pdelay.getTime()-ldelay.getTime())<200) {
      if (xAbs > yAbs) {
        if (nowPoint.pageX < startPoint.x){
          /*СВАЙП ВЛЕВО*/
          popupBG.innerHTML = '';
          const img = createImg(takeCurrentImg(1) + 1);
          popupBG.append(img);
        }
        else{
          /*СВАЙП ВПРАВО*/
          popupBG.innerHTML = '';
          const img = createImg(takeCurrentImg(-1) + 1);
          popupBG.append(img);
        }
      }
      else {
        if (nowPoint.pageY < startPoint.y){
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

