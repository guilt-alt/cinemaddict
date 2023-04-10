import { createElement } from '@utils/render.js';

const createFilmCounter = (count) => `<p>${count} movies inside</p>`;

export default class FilmCounterView {
  #data = null;

  #element = null;

  constructor(data) {
    this.#data = data;
  }

  getTemplate() {
    return createFilmCounter(this.#data);
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
