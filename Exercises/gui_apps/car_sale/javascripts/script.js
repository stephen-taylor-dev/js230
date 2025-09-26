const CARS = [
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
    this.filtersContainer = document.querySelector('.filters');
    this.filterButton = null;
    this.filters = null;
    this.filterElements = null;
    this.makeFilter = null;

    // Render page
    this.renderFilters();
    this.renderFilterOptions();
    this.renderCars();

    // Event listeners
    this.filterButton.addEventListener('click', this.handleFilterClick.bind(this));

    this.makeFilter = document.querySelector('#car-make');
    this.makeFilter.addEventListener('change', this.handleMakeSelection.bind(this));
  }

  // Event handler for filter button
  handleFilterClick() {
    const filter = [...this.filterElements].reduce((filter, selectElement) => {
      filter[selectElement.name] = selectElement.value;
      return filter;
    }, {});

    const cars = this.filterCars(filter);
    this.renderCars(cars);
  }

  resetFilter(filter) {
    console.log(filter.children);
    [...filter.children].forEach(element => {
      element.remove();
    });

    filter.insertAdjacentHTML('beforeend', '<option value="Any">Any</option>');
  }

  handleMakeSelection(event) {
    let modelDiv = document.querySelector('#car-model');
    let make = this.makeFilter.value;
    this.resetFilter(modelDiv);

    let modelOptions = CARS.reduce((models, car) => {
      if (make === 'Any' || car['make'] === make) {
        models.add(car['model']);
      }
      return models;
    }, new Set());

    modelOptions.forEach((option) => {
      let optionElement = document.createElement('option');
      optionElement.value = String(option);
      optionElement.innerHTML = String(option);
      modelDiv.appendChild(optionElement);
    });

  }

  // Reset DOM of loaded cars
  resetCars() {
    [...this.carsContainer.children].forEach(carElement => {
      carElement.remove();
    });
  }

  // Returns array of cars that match given filter criteria
  // Takes filter object of key val pair (type and suppplied value)
  filterCars(filter) {
    return CARS.filter(car => {
      return Object.entries(filter).every(([filterType, filterValue]) => {
        return filterValue === 'Any' || String(car[filterType]) === String(filterValue);
      });
    });
  }

  // Main function to render cars on page
  renderCars(cars) {
    this.resetCars(cars = CARS);
    cars.forEach((car) => {
      const make = car['make'];
      const image = car['image'];
      const model = car['model'];
      const year = car['year'];
      const price = car['price'];

      let carElement = `<div class="car">
                          <img src="${image}" alt="${make}-${model}-car">
                          <div class="info">
                              <h4 id="make-model">${make} ${model}</h4>
                              <p id="year">Year: ${year}</p>
                              <p id="price">Price: $${price}</p>
                          </div>
                          <button class="purchase">Buy</button></div>`;

      this.carsContainer.insertAdjacentHTML('beforeend', carElement);
    });
  }

  // Render select dropdown menus based on supplied Car Data
  renderFilters() {
    this.initializeFilters();

    Object.keys(this.filters).forEach((type) => {
      let selectHTML = `<div class="filter">
                              <label for="car-${type}">${type[0].toUpperCase()}${type.slice(1)}</label>
                              <select class="car-filter" name="${type}" id="car-${type}">
                                  <option value="Any">Any</option>
                              </select>
                          </div>`;

      this.filtersContainer.insertAdjacentHTML('beforeend', selectHTML);
    });

    this.filtersContainer.insertAdjacentHTML('beforeend', `<button id="filter-action">Filter</button>`);

    // Make newly added elements available as instance properties
    this.filterButton = document.querySelector('#filter-action');
    this.filterElements = document.querySelectorAll('.car-filter');
  }

  // load required filter type options from supplied data
  initializeFilters() {
    this.filters = this.loadFilterTypes();
    this.loadFilterOptionValues(this.filters);
    this.sortFilterOptionsValues(this.filters);
  }

  // Main function to render filter option values on page
  renderFilterOptions() {
    this.populateAllFilterOptions(this.filters);
  }

  // Based on supplied CAR data, finds all filter types from Data
  // eturns new object
  loadFilterTypes() {
    return Object.keys(CARS[0]).reduce((filters, type) => {
      if (type !== 'image') {
        filters[type] = new Set();
      }
      return filters;
    }, {});
  }

  // Set the select dropdown values for each filter type from the
  // CAR object values.
  // Uses set to ensure unique values
  loadFilterOptionValues(filters) {
    CARS.forEach(car => {
      Object.keys(filters).forEach(filterType => {
        filters[filterType].add(car[filterType]);
      });
    });
  }

  // Takes object of all filter types and values
  // converts filter type values from set to sorted array
  sortFilterOptionsValues(filters) {
    Object.entries(filters).forEach(([type, val]) => {
      filters[type] = [...val].sort((a, b) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
    });
  }

  // On each select dropdown type, add the list of available options to the page
  populateAllFilterOptions(filters) {
    this.filterElements.forEach((filterElement) => {
      const options = filters[filterElement.name];

      options.forEach((option) => {
        let optionElement = document.createElement('option');
        optionElement.value = String(option);
        optionElement.innerHTML = String(option);
        filterElement.appendChild(optionElement);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});

/*
Render options for filter types
renderFilterOptions
  when page loads read from object of cars to load each filter type's options

  initialze object of sets
  iterate over keys in first car object
    add a new key of current key to object with value of empty set

    iterate over the cars array
    get the make, model, year, price values for current iteration's car object
      add these values to respective sets (sets will ensure unique values)

  iterate over each select drop down
    use name of select element to get key from object of sets
    iterate over the options
    add each element to the select elment as an option


Render all cars on page load
renderCars
  takes optional filter criteria argument
  iterate over cars object and create car elements in dom with correct info


filter cars
  takes object of key value pairs (key is filter type, value is filter value)
  filter over cars in cars object
    iterate over filter object entries (key value pairs)
    if every key value pair of filter object entries is in current car object
    add to returned array by filter

  return new filtered array (will be empty array if nothing)
*/