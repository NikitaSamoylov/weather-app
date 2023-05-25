import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  slidesPerView: 9,
  loop: false,
  paginationClickable: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const defaultSwiperBtnNext = document.querySelector('.swiper-button-next');
const defaultSwiperBtnPrev = document.querySelector('.swiper-button-prev');

defaultSwiperBtnPrev.style.display = 'none';
defaultSwiperBtnNext.style.display = 'none';

const swiperCustomBtns = document.querySelectorAll('.swiper__img');

swiperCustomBtns.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
        evt.target.classList.contains('swiper__next-img') ? defaultSwiperBtnNext.click() : defaultSwiperBtnPrev.click();
    });
});





