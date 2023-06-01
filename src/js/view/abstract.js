import { SHAKE_TIMEOUT } from '@utils/const.js';

export default class Abstract {
  #element = null;

  #newElement = null;

  callback = {};

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
      this.#element = this.#createElement(this.getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

  shake(callback) {
    this.getElement().style.animation = `shake ${SHAKE_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = '';

      if (callback) {
        callback();
      }
    }, SHAKE_TIMEOUT);
  }

  #createElement(template) {
    this.#newElement = document.createElement('div');
    this.#newElement.innerHTML = template;

    return this.#newElement.firstChild;
  }
}
