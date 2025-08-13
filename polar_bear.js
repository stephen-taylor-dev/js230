const wordCounts = [...document.querySelectorAll('h2')].map(node => {
   return node.textContent.split(' ').length; 
});

document.querySelector('.toc');
document.querySelector('#toc');
document.getElementById('toc')
document.getElementsByClassName('toc')[0];



[...document.querySelectorAll('.toc a')].forEach((node, idx) => {
    if (idx % 2 === 1) {
        node.style.color = 'green';
    }
});

[...document.querySelectorAll('.thumbcaption')].map(node => node.textContent.trim())

let tableRows = document.querySelector('.infobox').children[0].children;

// Get elements inside table that are part of scientific classification
[...document.querySelector('.infobox').children[0].children]
  .map(node => node.children)
  .filter(collections => collections.length === 2)
  .reduce((obj, nodes) => {
    let key = nodes[0].textContent.trim().slice(0, -1);
    let val = nodes[1].textContent.trim();
    obj[key] = val;
    return obj;
  }, {});


(e) => {
  e.preventDefault();
  const element = document.querySelector('#notice');
  if (element.className === 'hidden') {
    element.classList.remove('hidden');
    element.classList.add('visible');
  } else if (element.className === 'visible') {
    element.classList.remove('visible');
    element.classList.add('hidden');
  }
}

document.getElementById('notice').onclick = (e) => {
  e.currentTarget.setAttribute('class', 'hidden');
}