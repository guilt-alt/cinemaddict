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

  #createElement(template) {
    this.#newElement = document.createElement('div');
    this.#newElement.innerHTML = template;

    return this.#newElement.firstChild;
  }
}
