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
      const imdbIdArr = response.Search.map((movie) => movie.imdbID);
      Promise.all(
        imdbIdArr
          .map((id) => fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)),
      ).then((data) => Promise.all(data.map((r) => r.json()))).then((data) => {
        const movieArr = response.Search;
        if (movieArr != null && movieArr.length > 1) {
          movieArr.forEach((movie, i) => {
            const newMovie = new Movie(
              movie.Title,
              movie.Year,
              movie.Type,
              movie.Poster,
              data[i].imdbRating,
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
      });
    }).catch((err) => alert(err));
}
