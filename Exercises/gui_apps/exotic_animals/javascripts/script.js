document.addEventListener('DOMContentLoaded', () => {
  let images = document.querySelectorAll('img')
  images.forEach((img) => {
    img.addEventListener('click', (event) => {
      console.log(event.target.closest('figcaption'));
      event.target.closest('figcaption').style.display = 'block';
    });
  });
});