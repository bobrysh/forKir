var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  slidesPerView: 1,
  spaceBetween: 10,
  direction: 'horizontal',
  loop: true,
  preloadImages: true,
  simulateTouch: true,
  roundLengths: true,
  updateOnImagesReady: true,
  updateOnImageResize: false,
  uniqueNavElements:false,
  centeredSlidesBounds: true,
  CenterInsufficientSlides:true,
  speed: 400,
  breakpoints:{
      320:{
          slidesPerView: 2,
          spaceBetween: 20
      },
      480:{
          slidesPerView: 3,
          spaceBetween: 30
      },
      640:{
          slidesPerView: 4,
          spaceBetween: 40
      }
  },

//   If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
  // And if we need scrollbar
//   scrollbar: {
//     el: '.swiper-scrollbar',
//   },
});
mySwiper.slideTo(0,500,false)
window.onresize = mySwiper.update()