export class Movie {
  constructor(title, year, type, poster, imdbRating, imdbID) {
    this.title = title;
    this.year = year;
    this.type = type;
    this.poster = poster;
    this.imdbRating = imdbRating;
    this.imdbID = imdbID;
  }

  validate() {
    Object.keys(this).filter((el) => !this[el]).forEach((el) => { this[el] = 'no information'; });
  }

  setDirector(director) {
    this.director = director;
  }

  setRuntime(runtime) {
    this.runtime = runtime;
  }

  setGenre(genre) {
    this.genre = genre;
  }

  setPlot(plot) {
    this.plot = plot;
  }

  setRated(rated) {
    this.rated = rated;
  }

  setimdbRating(imdbRating) {
    this.imdbRating = imdbRating;
  }

  setPoster(poster) {
    this.poster = poster;
  }
}
