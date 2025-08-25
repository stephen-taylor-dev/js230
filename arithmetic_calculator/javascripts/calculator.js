document.addEventListener('DOMContentLoaded', () => {

  let form = document.querySelector('form');
  let result = document.querySelector('#result');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let firstNumber = Number(document.querySelector('#first-number').value);
    let secondNumber = Number(document.querySelector('#second-number').value);
    const operator = document.querySelector('#operator').value;

    if (!Number.isNaN(firstNumber) && !Number.isNaN(secondNumber)) {
      switch(operator) {
        case '+':
          result.textContent = String(firstNumber + secondNumber);
          break;
        case '-':
          result.textContent = String(firstNumber - secondNumber);
          break;
        case '*':
          result.textContent = String(firstNumber * secondNumber);
          break;
        case '/':
          if (secondNumber !== 0) {
            result.textContent = String(firstNumber / secondNumber);
          } else {
            result.textContent = "Invalid input. Can't divide by zero.";
          }
          break;
      } 
    } else {
        result.textContent = 'Invalid input. Please only enter a positive or negative digits.';
    }
  });
  
});