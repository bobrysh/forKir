import {
  russianKeys, russianKeysUP, englishKeys, englishKeysUP,
} from './keyboardConstants';
import { onSearchClick } from '../search/clickSearch';
import { keyboard } from '../constants/constants';

window.onload = function init() {
  let languageKeys = '';
  const rows = [];
  const inputPlace = document.getElementById('search');
  const keyboardPlace = document.createElement('div');
  keyboardPlace.className = 'keyboard';
  keyboardPlace.id = 'keyboard';
  document.body.append(keyboardPlace);
  keyboardPlace.classList.add('hidden');

  for (let i = 0; i < 5; i++) {
    const row = document.createElement('div');
    row.className = `row${i}`;
    rows.push(row);
  }

  languageKeys = localStorage.getItem('language') === 'rus' ? languageKeys = russianKeys : languageKeys = englishKeys;

  for (let i = 0; i < languageKeys.length; i++) {
    const button = document.createElement('div');
    button.textContent = languageKeys[i];
    button.className = 'key';
    if (i < 14) {
      rows[0].append(button);
    } else if (i < 29) {
      rows[1].append(button);
    } else if (i < 42) {
      rows[2].append(button);
    } else if (i < 55) {
      rows[3].append(button);
    } else {
      rows[4].append(button);
    }
  }

  keyboardPlace.append(rows[0], rows[1], rows[2], rows[3], rows[4]);

  function changeLanguage(language) {
    if (language === 'en') {
      for (let i = 0; i < englishKeys.length; i++) {
        const key = document.getElementsByClassName('key');
        key[i].textContent = englishKeys[i];
      }
    } else if (language === 'enUP') {
      for (let i = 0; i < englishKeysUP.length; i++) {
        const key = document.getElementsByClassName('key');
        key[i].textContent = englishKeysUP[i];
      }
    } else if (language === 'rusUP') {
      for (let i = 0; i < russianKeysUP.length; i++) {
        const key = document.getElementsByClassName('key');
        key[i].textContent = russianKeysUP[i];
      }
    } else {
      for (let i = 0; i < russianKeys.length; i++) {
        const key = document.getElementsByClassName('key');
        key[i].textContent = russianKeys[i];
      }
    }
  }

  function texting() {
    keyboardPlace.addEventListener('click', () => {
      event.target.classList.remove('animate');
      const carriage = inputPlace.selectionStart;
      inputPlace.focus();
      if (event.target.textContent === 'Backspace') {
        inputPlace.value = inputPlace.value.slice(0, carriage - 1) + inputPlace.value.slice(carriage);
        inputPlace.selectionStart = carriage - 1;
        inputPlace.selectionEnd = carriage - 1;
      } else if (event.target.textContent === 'Space') {
        inputPlace.value += ' ';
      } else if (event.target.textContent === 'Tab') {
        inputPlace.setRangeText('    ');
        inputPlace.selectionStart = carriage + 4;
      } else if (event.target.textContent === 'Enter') {
        onSearchClick();
      } else if (event.target.textContent === 'Delete') {
        inputPlace.value = inputPlace.value.slice(0, carriage) + inputPlace.value.slice(carriage + 1);
        inputPlace.selectionStart = carriage;
        inputPlace.selectionEnd = carriage;
      } else if (event.target.textContent === 'Caps Lock') {
        document.querySelector('.keyboard').classList.toggle('toUpperCase');
        if (document.querySelector('.keyboard').classList.contains('toUpperCase')) {
          if (localStorage.getItem('language') === 'rus') {
            changeLanguage('rusUP');
          } else {
            changeLanguage('enUP');
          }
        } else if (localStorage.getItem('language') === 'rus') {
          changeLanguage('rus');
        } else {
          changeLanguage('en');
        }
      } else if (event.target.textContent === 'FN') {
        if (localStorage.getItem('language') === 'rus') {
          changeLanguage('en');
          localStorage.setItem('language', 'eng');
        } else if (localStorage.getItem('language') === 'rus') {
          changeLanguage('enUP');
          localStorage.setItem('language', 'eng');
        } else if (localStorage.getItem('language') === 'eng') {
          changeLanguage('rusUP');
          localStorage.setItem('language', 'rus');
        } else {
          changeLanguage('rus');
          localStorage.setItem('language', 'rus');
        }
      } else if (event.target.className !== 'key' || event.target.textContent === 'Ctrl' || event.target.textContent == 'Win' || event.target.textContent == 'Alt' || event.target.textContent == 'FN') return;
      else {
        event.target.classList.add('animate');
        inputPlace.value += event.target.textContent;
      }
    });
  }

  texting();
};


keyboard.addEventListener('click', () => {
  document.getElementById('keyboard').classList.toggle('hidden');
});
