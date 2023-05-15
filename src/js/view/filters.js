import Abstract from '@view/abstract.js';
import { MenuItem } from '@utils/const.js';

const createFilters = (filters, currentFilter) => {
  const links = filters.map(({ type, name, count }) => (
    `<a href="#${type}" data-filter="${type}" data-menu="${MenuItem.FILMS}"
      class="main-navigation__item ${type === currentFilter ? 'main-navigation__item--active' : ''}">
      ${name} <span class="main-navigation__item-count">${count}</span>
    </a>`
  )).join('');

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${links}
      </div >
      <a href="#stats" data-menu="${MenuItem.STATS}"
        class="main-navigation__additional ${!currentFilter ? 'main-navigation__item--active' : ''}">Stats</a>
    </nav >`
  );
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

  set menuClickHandler(callback) {
    this.callback.menu = callback;
    this.getElement().addEventListener('click', this.#menuClickHandler);
  }

  set filterChangeHandler(callback) {
    this.callback.filter = callback;
    this.getElement().addEventListener('click', this.#filterChangeHandler);
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();

    switch (evt.target.tagName) {
      case 'A':
        this.callback.menu(evt.target.dataset.menu);
        break;
      case 'SPAN':
        this.callback.menu(evt.target.parentElement.dataset.menu);
        break;
      default:
    }
  };

  #filterChangeHandler = (evt) => {
    evt.preventDefault();

    switch (evt.target.tagName) {
      case 'A':
        this.callback.filter(evt.target.dataset.filter);
        break;
      case 'SPAN':
        this.callback.filter(evt.target.parentElement.dataset.filter);
        break;
      default:
    }
  };
}
