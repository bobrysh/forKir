import '../styles/header.css';
import '../styles/styles.css';
import '../styles/keyboard.css';
import '../styles/swiper.css';
import '../styles/swiper.min.css';
import '../styles/search.css';
import '../styles/footer.css';
import '../styles/modal.css';

import './keyboard/keyboardScript';
import './keyboard/keyboardConstants';

import { searchMovies } from './search/search';

function init() {
  searchMovies('Star%20Wars');
}
init();
