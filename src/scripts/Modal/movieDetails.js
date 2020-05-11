
import { BASE_URL, API_KEY } from '../constants/constants';


export async function getMovieDetails(movie) {
  try {
    const details = await fetch(
      `${BASE_URL}i=${movie.imdbID}&apikey=${API_KEY}`,
    );
    const result = await details.json();

    movie.setDirector(result.Director);
    movie.setRuntime(result.Runtime);
    movie.setGenre(result.Genre);
    movie.setPlot(result.Plot);
    movie.setRated(result.Rated);
    movie.setimdbRating(result.imdbRating);
    movie.setPoster(result.Poster);
    movie.validate();
  } catch (err) {
    console.warn(err);
  }
}
