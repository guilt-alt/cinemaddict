import { createElement } from '@utils/render.js';

export default class Abstract {
  #element = null;
  _callback = {};

  #templateError = new Error('Abstract method not implemented: getTemplate');

  constructor() {
    if (new.target === Abstract) {
      throw Error('Can\'t instantiate Abstarct, only concrete one.');
    }
  }

  getTemplate() {
    throw this.#templateError;
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
