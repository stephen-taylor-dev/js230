document.addEventListener('DOMContentLoaded', () => {
  let container = document.querySelector('#images');

  let timer;

  container.addEventListener('mouseenter', (event) => {
    console.log(event.target);
    if (event.target.tagName === 'IMG') {
      console.log(`mouseenter - ${event.target}`);
      console.log(event.target.nextElementSibling);
      timer = setTimeout(() => {
        event.target.nextElementSibling.className = 'show';
      }, 1000);
    }
  }, true);
  
  container.addEventListener('mouseleave', (event) => {
    console.log(event.target);
    if (event.target.tagName === 'IMG') {
      clearTimeout(timer);
      timer = null;
      console.log(`mouseleave - ${event.target}`)
      console.log(event.target.nextElementSibling);
      event.target.nextElementSibling.className = '';
    }
  }, true);
});