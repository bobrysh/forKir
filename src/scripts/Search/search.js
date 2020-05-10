import { BASE_URL, API_KEY, preloader } from '../constants/constants';

import { mySwiper } from '../swiper/swiper';
import { Movie } from '../cards/movie';
import { createCards } from '../cards/createCards';


export function searchMovies(query) {
  const COMPLETE_URL = `${BASE_URL}&s=${query}&apikey=${API_KEY}`;
  const aDisplayMovies = [];

  fetch(COMPLETE_URL)
    .then((response) => response.json())
    .then((response) => {
      const movieArr = response.Search;
      if (movieArr != null && movieArr.length > 1) {
        movieArr.forEach((movie) => {
          const newMovie = new Movie(
            movie.Title,
            movie.Year,
            movie.Type,
            movie.Poster,
            movie.imdbID,
          );
          newMovie.validate();
          aDisplayMovies.push(newMovie);
        });
      } else {
        alert('Ничего не найдено');
      }

      preloader.classList.toggle('unload');
      mySwiper.removeAllSlides();
      mySwiper.appendSlide(createCards(aDisplayMovies));
      mySwiper.update();
    })

    .catch((err) => alert(err));
}
