"use strict";

export class Game {

  static words = ['apple', 'banana', 'orange', 'pear'];
  static maxIncorrectGuesses = 6;
  
  constructor() {
    this.#newGame();
  }
  
  #newGame() {
    const word = Game.getRandomWord();
    
    if (!word) {
      throw new Error('No more words to guess.');
    }

    this.word = word.split(''); // e.g., ['a', 'p', 'p', 'l', 'e']
    this.incorrectGuesses = 0; // initialize incorrect guesses to 0
    this.lettersGuessed = []; // total correct and incorrect guesses
    this.spaces = new Array(this.word.length); // current game state eg. guessed (a, b, e) => [a, _, _, _, e]
  }
  

  makeGuess(guessedLetter) {
    guessedLetter = guessedLetter.toLowerCase(); // convert to lowercase for consistent comparison
    
    if (/^[^a-z]$/gi.test(guessedLetter)) return; // make sure guess is letter
    if (this.lettersGuessed.includes(guessedLetter)) return; // make sure guess hasn't already been guessed.
    
    const foundIndices = this.#findMatchingIndices(guessedLetter);
    
    if (foundIndices.length > 0) {
      foundIndices.forEach(idx => this.spaces[idx] = guessedLetter);
    } else {
      this.incorrectGuesses += 1;
    }
    
    // add current guess to total correct and incorrect guesses
    this.lettersGuessed.push(guessedLetter);
  }

  #findMatchingIndices(letter) {
    return this.word.reduce((indices, wordLetter, idx) => {
      if (letter === wordLetter.toLowerCase()) {
        indices.push(idx);
      }
      return indices;
    }, []);
  }

  showState() {
    console.log(`
                 word: ${this.word}
                 spaces: ${this.spaces}
                 lettersGuessed: ${this.lettersGuessed}
                 incorrectGuessed: ${this.incorrectGuesses}
                 hasWon: ${this.#hasWon()}
                 hasLost: ${this.#hasLost()}`);
  }
  
  #hasLost() {
    return this.incorrectGuesses >= Game.maxIncorrectGuesses;
  }

  #hasWon() {
    return this.spaces.join('') === this.word.join('');
  }

  static getRandomWord() {
    const index = Math.floor(Math.random() * Game.words.length);
    const word = Game.words.splice(index, 1)[0];
    return word; // returns undefined if no more words in array
  }
}