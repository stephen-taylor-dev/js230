document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');
  let content = document.querySelector('.content');
  let intervalId;

  textField.addEventListener('click', event => {
    event.stopPropagation();
    textField.classList.add('focused');
      intervalId = intervalId || setInterval(() => textField.classList.toggle('cursor'), 500);
  });

  document.addEventListener('click', event => {
    textField.classList.remove('focused');
    textField.classList.remove('cursor');
    clearInterval(intervalId);
    intervalId = null;
  });

  document.addEventListener('keydown', event => {
    if (textField.classList.contains('focused')) {
      
      if (event.key === 'Backspace' || event.key === 'Delete') {
        content.textContent = content.textContent.slice(0, -1);
      } else if (event.key.length === 1) {
        content.textContent += event.key;
      }
    }
  });
});