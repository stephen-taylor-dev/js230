document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let paragraph = document.querySelector('p');
  let button = document.querySelector('[type="submit"]');
  let link = document.querySelector('a');
  let guesses;
  let answer;

  function newGame() {
    answer = Math.floor((Math.random() * 100) + 1);
    guesses = 0;
    input.disabled = false;
    form.reset();
    button.classList.remove('disabled');
    input.classList.remove('disabled');

    paragraph.textContent = 'Guess a number from 1 to 100';
  }

  function isValidInteger(string) {
    return /^\d+$/.test(string) && string[0] !== '0';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    guesses += 1;
    let message;
    let guess;

    if (isValidInteger(input.value)) {
      guess = parseInt(input.value, 10);
    }

    if (guess) {
      if (guess === answer) {
        message = `You guessed it! It took you ${guesses} guesses.`
        input.disabled = true;
        input.className = 'disabled';
        button.className = 'disabled';

      } else if (guess > answer) {
        message = `My number is lower than ${guess}.`
      } else {
        message = `My number is higher than ${guess}.`
      }
    } else {
      message = 'Invalid guess input. Please enter a number.'
    }
    
    paragraph.textContent = message;
  });

  link.addEventListener('click', (event) => {
    event.preventDefault();
    newGame();
  });

  newGame();
});