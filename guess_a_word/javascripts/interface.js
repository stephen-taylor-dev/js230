"use strict";

import {Game} from './game.js';

let game;

document.addEventListener('DOMContentLoaded', () => {
  
  // initialize a new game
  newGame();

  // event listener for guesses
  document.addEventListener('keyup', processGuess);
  
  let newGameLink = document.querySelector('#replay');
  newGameLink.addEventListener('click', newGame);


});


// Event handler to process guesses
function processGuess(event) {
  const guess = event.key.toLowerCase();

  if (/^[a-z]$/gi.test(guess)) {
    game.makeGuess(guess);

    if (game.incorrectGuesses > 0) {
      document.querySelector('#apples').className = `guess_${game.incorrectGuesses}`;
    }

    updateGuesses();
    updateSpaces();
  }
}

function newGame() {
  // If previous game played, remove old guesses and word spaces
  [...document.querySelectorAll('span')].forEach(spaceElement => {
    spaceElement.remove();
  });
  
  game = new Game();

  initializeEmptySpaces();
  
  document.querySelector('#apples').className = '';

}

// initialize word space
function initializeEmptySpaces() {
  const spaces = document.querySelector('#spaces');

  for (let i = 0; i < game.word.length; i += 1) {
    const spaceElement = document.createElement('span');
    spaceElement.dataset.space = i;
    spaces.appendChild(spaceElement);
  }
}

// update display of guesses
function updateGuesses() {
  const guesses = document.querySelector('#guesses');

  const lastIndex = game.lettersGuessed.length - 1;
  const lastGuess = game.lettersGuessed[lastIndex];
  
  const newGuessElement = document.createElement('span');
  newGuessElement.append(`${lastGuess}`);
  guesses.appendChild(newGuessElement);


  // game.lettersGuessed.forEach((guess, idx) => {
  //   let guessElement = document.querySelector(`#guesses [data-guess="${idx}"]`);
    
  //   if (!guessElement) {
  //     let newGuessElement = document.createElement('span');
  //     newGuessElement.dataset.guess = idx;
  //     newGuessElement.append(`${guess}`);
  //     guesses.appendChild(newGuessElement);
  //   }
  // });
}

// update display of correct guessed spaces
function updateSpaces() {
  game.spaces.forEach((space, idx) => {
    const spaceElement = document.querySelector(`#spaces [data-space="${idx}"]`);
    spaceElement.textContent = space ? space : '';
  });
}