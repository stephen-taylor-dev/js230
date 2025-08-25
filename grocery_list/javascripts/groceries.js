document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const list = document.querySelector('#grocery-list');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let itemName = document.querySelector('#name').value;
    let quantity = document.querySelector('#quantity').value;
    quantity = quantity ? +quantity : 1; // Default to quantity of 1 if no input

    // make sure name and valid quantity input is given
    if (itemName && !Number.isNaN(quantity)) {
      const listItem = document.createElement('li');
      listItem.textContent = `${String(quantity)} ${itemName}`;
      list.appendChild(listItem);
      form.reset();
    } else {
      alert('Invalid input');
    }
  });
});