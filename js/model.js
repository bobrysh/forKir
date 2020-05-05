class Movie {
    director;
    runtime;
    genre;
    plot;
    rated;

    constructor(title, year, type, poster, imdbID) {
        this.title = title;
        this.year = year;
        this.type = type;
        this.poster = poster;
        this.imdbID = imdbID;
    }

    validate() {
        return !((this.imdbID == null || this.imdbID == '') ||
            (this.title == null || this.title == '') ||
            (this.year == null || this.year == '') ||
            (this.type == null || this.type == '') ||
            (this.poster == null || this.poster == '')
        );
    }

    validateDetails() {
        return !((this.director == null || this.director == '') ||
            (this.runtime == null || this.runtime == '') ||
            (this.genre == null || this.genre == '') ||
            (this.plot == null || this.plot == '') ||
            (this.rated == null || this.rated == '')
        );
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
}


const BASE_URL = 'http://www.omdbapi.com/?';
const API_KEY = '6bfb8cae';

/**
*API поиска вызовов и возвращаемый массив свойств
* @param {Строка поиска} query 
*/

function searchMovies(query) {
    let COMPLETE_URL = `${BASE_URL}&s=${query}&apikey=${API_KEY}`;
    const aDisplayMovies = [];

    fetch(COMPLETE_URL)
        .then(response => response.json())
        .then((response) => {
            const movieArr = response.Search;

            if (movieArr != null && movieArr.length > 1) {
                movieArr.forEach(movie => {
                    const newMovie = new Movie(
                        movie.Title,
                        movie.Year,
                        movie.Type,
                        movie.Poster,
                        movie.imdbID
                    );

                    if (newMovie.validate()) {
                        aDisplayMovies.push(newMovie);
                    } else {
                        console.warn('Не верный фильм');
                    }
                });
            } else {
                alert('Ничего не найдено');
            }

            createCards(aDisplayMovies);
        }).catch(err => alert(err));
}

/**
 * Функция, которая создает карты, имеющие в качестве параметра массив Movie, полученный из вызова API
 * @param {Массив фильмов} aDisplayMovies 
 */
function createCards(aDisplayMovies) {
    let container = document.getElementById('container');
    let row = document.createElement('div');
    row.className = 'row';
    row.id = 'row';

    aDisplayMovies.forEach(movieElement => {
        let mainCol = document.createElement('div');
        mainCol.className = 'col-4';

        let card = document.createElement('div');
        card.className = 'card mb-3';
        card.style = 'max-width: fit-content';

        let cardRow = document.createElement('div');
        cardRow.className = 'row no-gutters';

        let cardCol = document.createElement('div');
        cardCol.className = 'col-md-4';

        let poster = document.createElement('img');
        poster.src = movieElement.poster;

        let cardColBody = document.createElement('div');
        cardColBody.className = 'col-md-8';

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = movieElement.title;

        let pYear = document.createElement('p');
        pYear.className = 'card-text';
        pYear.textContent = `Year: ${movieElement.year}`;

        let pType = document.createElement('p');
        pType.className = 'card-text';
        pType.textContent = `Type: ${movieElement.type}`;

        // let rating = document.createElement('p');
        // rating.className = 'card-text';
        // rating.textContent = `Rating: https://www.imdb.com/title/${ID}`;

        let detailsButton = document.createElement('btn');
        detailsButton.className = 'btn btn-primary';
        detailsButton.textContent = 'Details';
        detailsButton.id = 'detailsButton';

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(pYear);
        cardBody.appendChild(pType);
        // cardBody.appendChild(rating);
        cardBody.appendChild(detailsButton);
        cardColBody.appendChild(cardBody);
        cardRow.appendChild(poster);
        cardRow.appendChild(cardColBody);
        card.appendChild(cardRow);
        mainCol.appendChild(card);

        row.appendChild(mainCol);
        container.appendChild(row);

        showMovieModalDetails(movieElement, detailsButton);
    });
}


let modal = document.getElementById('movieDetails');

/**
Функция закрытия модального окна при нажатии за пределами его области
 */
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.cssText = 'display: none;';
        modal.removeChild(modal.lastChild);
    }
}

let input = document.getElementById('search');
let keyboard = document.getElementById('keyboardButton');
let searchButton = document.getElementById('searchButton')

// клик по клавиатуре

keyboard.addEventListener('click', function(event){
    document.getElementById('keyboard').classList.toggle('hidden');
});

// ПОИСК
input.addEventListener('keyup', function(event){
    if(event.keyCode == 13){
        event.preventDefault();
            let preloader = document.querySelector('.preloader__wrap');
            preloader.classList.toggle('unload');
        setTimeout(function() {
            preloader.classList.toggle('unload');
            onSearchClick();
        }, 1000);
    }

});

searchButton.addEventListener('click', function(event){
        event.preventDefault();
            let preloader = document.querySelector('.preloader__wrap');
            preloader.classList.toggle('unload');
        setTimeout(function() {
            preloader.classList.toggle('unload');
            onSearchClick();
        }, 1000);
});



function onSearchClick() {
    let textToSearch = document.getElementById('search').value;
    clearCards();
    searchMovies(textToSearch);
}

function clearCards() {
    let elem = document.getElementById('row');
    if (elem != null) {
        elem.remove();
    }
}

function init() {
    searchMovies('Star%20Wars');
}

/**
Функция, которая вызывает API для получения деталей фильма передан в 
качестве параметра Детали сохраняются в параметрах класса
 * @param {Детали фильмов} movie 
 */

async function getMovieDetails(movie) {
    try {
        const details = await fetch(`${BASE_URL}i=${movie.imdbID}&apikey=${API_KEY}`);
        const result = await details.json();

        movie.setDirector(result.Director);
        movie.setRuntime(result.Runtime);
        movie.setGenre(result.Genre);
        movie.setPlot(result.Plot);
        movie.setRated(result.Rated);

        if (!movie.validateDetails()) {
            console.warn('Неверные данные');
            movie.setDirector('Не найден');
            movie.setRuntime('Не найден');
            movie.setGenre('Не найден');
            movie.setPlot('Не найден');
            movie.setRated('Не найден');
        }

    } catch (err) {
        console.warn(err);
    }
}

/**
Функция, которая по нажатию кнопки:
       - получает детали фильма
      - генерирует модал с его деталями
 * @param {Фильмы модального окна} movie 
 * @param {Кнопка модального окна} button 
 */
function showMovieModalDetails(movie, button) {

    button.onclick = async function () {
        await getMovieDetails(movie);

        let cardDetails = document.getElementById('movieDetails');
        cardDetails.style.cssText = 'display: block;';

        let modalDialog = document.createElement('div');
        modalDialog.className = 'modal-dialog';

        let modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        let modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';

        let modalHeaderText = document.createElement('h5');
        modalHeaderText.className = 'card-title';
        modalHeaderText.textContent = movie.title;

        let modalBody = document.createElement('div');
        modalBody.className = 'modal-body';

        let modalPoster = document.createElement('img');
        modalPoster.className = 'img-fluid';
        modalPoster.style.paddingBottom = '20px';
        modalPoster.src = movie.poster;

        let modalPYear = document.createElement('p');
        modalPYear.className = 'card-text';
        modalPYear.textContent = `Year: ${movie.year}`;

        let modalPDirector = document.createElement('p');
        modalPDirector.className = 'card-text';
        modalPDirector.textContent = `Director: ${movie.director}`;

        let modalPGenre = document.createElement('p');
        modalPGenre.className = 'card-text';
        modalPGenre.textContent = `Genre: ${movie.genre}`;

        let modalPRuntime = document.createElement('p');
        modalPRuntime.className = 'card-text';
        modalPRuntime.textContent = `Runtime: ${movie.runtime}`;

        let modalPRating = document.createElement('p');
        modalPRating.className = 'card-text';
        modalPRating.textContent = `Rated: ${movie.rated}`;

        let modalPPlot = document.createElement('p');
        modalPPlot.className = 'card-text';
        modalPPlot.textContent = `Plot: ${movie.plot}`;


        let closeButton = document.createElement('a');
        closeButton.className = 'btn btn-primary';
        closeButton.id = 'closeModal';
        closeButton.textContent = 'Back';


        modalHeader.appendChild(modalHeaderText);

        modalBody.appendChild(modalPoster);
        modalBody.appendChild(modalPYear);
        modalBody.appendChild(modalPDirector);
        modalBody.appendChild(modalPGenre);
        modalBody.appendChild(modalPRating);
        modalBody.appendChild(modalPRuntime);
        modalBody.appendChild(modalPPlot);
        modalBody.appendChild(closeButton);

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);

        modalDialog.appendChild(modalContent);

        cardDetails.appendChild(modalDialog);

        closeModalWithButton(cardDetails, closeButton);
    }

}

function closeModalWithButton(modal, button) {
    button.onclick = function () {
        modal.style.cssText = 'display: none;';
        modal.removeChild(modal.lastChild);
    }
}


