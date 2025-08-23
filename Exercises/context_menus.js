document.addEventListener('DOMContentLoaded', () => {
  let mainElement = document.querySelector('main');
  let subElement = document.querySelector('section');
  
  mainElement.addEventListener('contextmenu', (event) => {
    event.preventDefault();
     alert(event.target.innerText);
  });
  
  subElement.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    event.stopPropagation();
     alert(event.target.innerText);
  });
});