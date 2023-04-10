import { createElement } from '@utils/render.js';

const createFilters = () => `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`;

export default class FiltersView {
  #element = null;

  constructor() {
    this.createFilters = createFilters();
  }

  getTemplate() {
    return this.createFilters;
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
