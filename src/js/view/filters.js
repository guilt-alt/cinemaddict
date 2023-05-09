import Abstract from '@view/abstract.js';

const createFilters = (filters, currentFilter) => {
  const links = filters.map(({ type, name, count }) => (
    `<a href="#${type}" data-filter="${type}"
      class="main-navigation__item ${type === currentFilter ? 'main-navigation__item--active' : ''}">
      ${name} <span class="main-navigation__item-count">${count}</span>
    </a>`
  )).join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${links}
    </div >
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav >`;
};

export default class FiltersView extends Abstract {
  #data = null;

  #currentFilter = null;

  constructor(data, currentFilter) {
    super();
    this.#data = data;
    this.#currentFilter = currentFilter;
  }

  getTemplate() {
    return createFilters(this.#data, this.#currentFilter);
  }

  set filterChangeHandler(callback) {
    this.callback.filter = callback;
    this.getElement().querySelector('.main-navigation__items').addEventListener('click', this.#filterChangeHandler);
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName === 'A') {
      this.callback.filter(evt.target.dataset.filter);
    }

    if (evt.target.tagName === 'SPAN') {
      this.callback.filter(evt.target.parentElement.dataset.filter);
    }
  };
}
