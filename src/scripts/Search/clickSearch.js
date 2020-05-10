import { clearCards } from '../cards/clearCards';
import { searchMovies } from './search';
import { searchButton, input, preloader } from '../constants/constants';

export function onSearchClick() {
  const textToSearch = document.getElementById('search').value;
  clearCards();
  searchMovies(textToSearch);
}

input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    preloader.classList.toggle('unload');
    onSearchClick();
  }
});

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  preloader.classList.toggle('unload');
  onSearchClick();
});
