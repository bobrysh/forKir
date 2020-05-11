import { showMovieModalDetails } from '../modal/modal';

export function createCards(aDisplayMovies) {
  return aDisplayMovies.map((movieElement) => {
    const card = document.createElement('div');
    card.className = 'card swiper-slide';
    card.style = 'max-width: fit-content';

    const cardRow = document.createElement('div');
    cardRow.className = 'row';

    const posterWrapper = document.createElement('div');
    posterWrapper.className = 'posterWrapper';

    const poster = document.createElement('img');
    poster.src = movieElement.poster === 'N/A' ? '../src/assets/No_image.svg' : movieElement.poster;

    const cardColBody = document.createElement('div');
    cardColBody.className = 'card-inner';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = movieElement.title;

    const pYear = document.createElement('p');
    pYear.className = 'card-text';
    pYear.textContent = `Year: ${movieElement.year}`;

    const imdbRating = document.createElement('p');
    imdbRating.className = 'card-text';
    imdbRating.textContent = `Rating: ${movieElement.imdbRating}`;

    const pType = document.createElement('p');
    pType.className = 'card-text';
    pType.textContent = `Type: ${movieElement.type}`;

    const detailsButton = document.createElement('btn');
    detailsButton.className = 'btn btn-primary';
    detailsButton.textContent = 'Подробнее';
    detailsButton.id = 'detailsButton';

    cardBody.appendChild(posterWrapper);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(pYear);
    cardBody.appendChild(pType);
    cardBody.appendChild(imdbRating);
    cardBody.appendChild(detailsButton);
    posterWrapper.appendChild(poster);
    cardColBody.appendChild(cardBody);
    cardRow.appendChild(cardColBody);
    card.appendChild(cardRow);

    showMovieModalDetails(movieElement, detailsButton);
    return card;
  });
}
