"use strict";

import {Game} from './game.js';

let game;

document.addEventListener('DOMContentLoaded', () => {
  // initialize a new game
  newGame();
  
  // add event listener on new game link
  let newGameLink = document.querySelector('#replay');
  newGameLink.addEventListener('click', (e) => {
    e.preventDefault();
    newGame();
  });
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
    updateWordSpaces();
    processGameOver();
  }
}

// Initiates game over win or lost process or nothing if still going
function processGameOver() {
  if (game.hasWon()) {
    gameWon();
  } else if (game.hasLost()) {
    gameLost();
  }
}

function gameOver() {
  document.querySelector("#replay").style.display = 'block';
  document.removeEventListener('keyup', processGuess);
}

function gameWon() {
  document.body.className = 'win';
  document.querySelector('#message').textContent = 'You Win!';
  gameOver();
}

function gameLost() {
  document.body.className = 'lose';
  document.querySelector('#message').textContent = "Sorry! You're out of guesses.";
  gameOver();
}

// Helper to initiate start of a new game. 
function newGame() {
  // initialize a new game object
  try {
    game = new Game();
  } catch (error) {
    document.querySelector("#replay").style.display = 'none';
    document.querySelector("#message").textContent = "Sorry, I've run out of words";
    return;
  }

  // event listener for guesses
  document.addEventListener('keyup', processGuess);

  // remove previous game state for links, message, apples and body, and guesses
  document.querySelector("#replay").style.display = 'none';
  document.querySelector('#message').textContent = '';
  document.querySelector('#apples').className = '';
  document.body.className = '';
  [...document.querySelectorAll('span')].forEach(spaceElement => {
    spaceElement.remove();
  });
  
  initializeEmptySpaces();
}

// Helper to initialize empty word spaces at start of game
function initializeEmptySpaces() {
  const spaces = document.querySelector('#spaces');

  for (let i = 0; i < game.word.length; i += 1) {
    const spaceElement = document.createElement('span');
    spaceElement.dataset.space = i;
    spaces.appendChild(spaceElement);
  }
}

// Helper to update display of guesses
function updateGuesses() {
  const guesses = document.querySelector('#guesses');

  game.lettersGuessed.forEach((guess, idx) => {
    let guessElement = document.querySelector(`#guesses [data-guess="${idx}"]`);
    
    if (!guessElement) {
      let newGuessElement = document.createElement('span');
      newGuessElement.dataset.guess = idx;
      newGuessElement.append(`${guess}`);
      guesses.appendChild(newGuessElement);
    }
  });
}

// Helper to update display of correct guessed spaces
function updateWordSpaces() {
  game.spaces.forEach((space, idx) => {
    const spaceElement = document.querySelector(`#spaces [data-space="${idx}"]`);
    spaceElement.textContent = space ? space : '';
  });
}