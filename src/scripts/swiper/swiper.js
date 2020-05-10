import Swiper from 'swiper';

export const mySwiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 10,
  direction: 'horizontal',
  observer: true,
  initialSlide: 0,
  loop: false,
  grabCursor: true,
  preloadImages: true,
  simulateTouch: true,
  roundLengths: true,
  updateOnImagesReady: true,
  updateOnImageResize: true,
  uniqueNavElements: false,
  centeredSlidesBounds: true,
  CenterInsufficientSlides: true,
  speed: 400,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1500: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
mySwiper.slideTo(1, 500, true);
window.onresize = mySwiper.update();
