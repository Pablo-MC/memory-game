// Polifilling array methods, Promise, etc.
import 'core-js/stable';
// Polifilling async functions
import 'regenerator-runtime/runtime';

import 'animate.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import { cards } from './data.js';

// Elements
const board = document.querySelector('.board');
const tries = document.querySelector('.tries');
const btn = document.querySelector('.btn');

// State variables
let card1, card2, attempt;

// Functions
const mixCards = arr => arr.sort(() => Math.random() - 0.5);
const setPointerEvent = (str, ...cards) => cards.forEach(card => card.style.pointerEvents = str);
const match = (card1, card2) => card1.getAttribute('src') === card2.getAttribute('src');
const areAllCardsVisible = () => [...document.querySelectorAll('img')].every(card => !card.classList.contains('hidden'));

const displayCard = function (card) {
   card.classList.remove('hidden');
   card.classList.add('animate__animated', 'animate__flipInY');
};

const hiddenCards = function (...cards) {
   cards.forEach(card => {
      card.classList.add('hidden');
      card.classList.remove('animate__animated', 'animate__flipInY');
   });
};

const checkCards = function () {
   if (match(card1, card2)) {
      if (areAllCardsVisible()) tries.textContent = '😀 CONGRATULATIONS! 😀';
   } else if (attempt === 1) {
      tries.textContent = 'Game Over 😒';
   } else {
      setTimeout((card1, card2) => {
         hiddenCards(card1, card2);
         setPointerEvent('auto', card1, card2);
         tries.textContent = --attempt;
      }, 1200, card1, card2);
   }
   card1 = card2 = null;
};

const createBoard = function () {
   board.innerHTML = '';
   tries.textContent = attempt;
   mixCards(cards.concat(cards)).forEach(card => {
      const html = `<img class="card-board hidden" src="${card}">`;
      board.insertAdjacentHTML('afterbegin', html);
   });
};

const initGame = function () {
   attempt = 20;
   card1 = card2 = null;
   createBoard();
};

initGame();


// Event handlers
board.addEventListener('click', function (e) {
   card1 = e.target.closest('img');  // click fuera de la carta retorna null.
   if (!card1) return;

   displayCard(card1); 1
   setPointerEvent('none', card1);

   !card2 ? card2 = card1 : checkCards();
});

btn.addEventListener('click', initGame);