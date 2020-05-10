import { getMovieDetails } from './movieDetails';
import { modal } from '../constants/constants';

export function showMovieModalDetails(movie, button) {
  button.addEventListener('click', async () => {
    await getMovieDetails(movie);

    const cardDetails = document.getElementById('movieDetails');
    cardDetails.style.cssText = 'display: block;';

    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    const modalHeaderText = document.createElement('h5');
    modalHeaderText.className = 'card-title';
    modalHeaderText.textContent = movie.title;

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    const modalPoster = document.createElement('img');
    modalPoster.className = 'img-fluid';
    modalPoster.style.paddingBottom = '20px';
    modalPoster.src = movie.poster;

    const modalPYear = document.createElement('p');
    modalPYear.className = 'card-text';
    modalPYear.textContent = `Year: ${movie.year}`;

    const modalPDirector = document.createElement('p');
    modalPDirector.className = 'card-text';
    modalPDirector.textContent = `Director: ${movie.director}`;

    const modalPGenre = document.createElement('p');
    modalPGenre.className = 'card-text';
    modalPGenre.textContent = `Genre: ${movie.genre}`;

    const modalPRuntime = document.createElement('p');
    modalPRuntime.className = 'card-text';
    modalPRuntime.textContent = `Runtime: ${movie.runtime}`;

    const modalPRating = document.createElement('p');
    modalPRating.className = 'card-text';
    modalPRating.textContent = `Rated: ${movie.rated}`;

    const modalPPlot = document.createElement('p');
    modalPPlot.className = 'card-text';
    modalPPlot.textContent = `Plot: ${movie.plot}`;

    modalHeader.appendChild(modalHeaderText);

    modalBody.appendChild(modalPoster);
    modalBody.appendChild(modalPYear);
    modalBody.appendChild(modalPDirector);
    modalBody.appendChild(modalPGenre);
    modalBody.appendChild(modalPRating);
    modalBody.appendChild(modalPRuntime);
    modalBody.appendChild(modalPPlot);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    modalDialog.appendChild(modalContent);

    cardDetails.appendChild(modalDialog);
  });
}


window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.cssText = 'display: none;';
    modal.removeChild(modal.lastChild);
  }
};
