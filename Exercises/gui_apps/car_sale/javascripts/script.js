const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];


class App {
  constructor() {
    this.carsContainer = document.querySelector('.cars');
    this.filters = document.querySelectorAll('.car-filter');
    this.filterButton = document.querySelector('#filter-action');


    // Event listeners
    this.filterButton.addEventListener('click', this.handleFilterClick.bind(this));

    // render page
    
  }
}

/*
Render options for filter types
renderFilterOptions
  when page loads read from object of cars to load each filter type's options

  intialize a Set for makes, models, years, and prices
  iterate over the cars array 
    get the make, model, year, price values for current iteration's car object
      add these values to respective sets (sets will ensure unique values)

  iterate over each set
    create new option element in respective filter element


Render all cars on page load
renderCars
  takes optional filter criteria argument
  iterate over cars object and create car elements in dom with correct info

*/