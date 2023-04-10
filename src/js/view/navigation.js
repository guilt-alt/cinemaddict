import { createElement } from '@utils/render.js';

const createMainNavigation = (filters) => {
  const links = filters.map(({ name, count }) => `<a href="#${name}" class="main-navigation__item">${name[0].toUpperCase() + name.slice(1)} <span class="main-navigation__item-count">${count}</span></a>`).join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>

      ${links}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav >`;
};

export default class MainNavigationView {
  #data = null;

  #element = null;

  constructor(data) {
    this.#data = data;
  }

  getTemplate() {
    return createMainNavigation(this.#data);
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
