import Abstract from '@view/abstract.js';

export default class Smart extends Abstract {
  #data = {};

  #state = {};

  #errorRestoreHandlers = 'Abstract method not implemented: restoreHandlers';

  get state() {
    return this.#state;
  }

  get newComment() {
    return this.#data;
  }

  updateData(update, justDataUpdating, isState = false) {
    if (!update) {
      return;
    }

    if (isState === true) {
      this.#state = {
        ...this.#state,
        ...update,
      };
    } else {
      this.#data = {
        ...this.#data,
        ...update,
      };
    }

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(this.#errorRestoreHandlers);
  }
}
