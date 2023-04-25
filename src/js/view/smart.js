import Abstract from '@view/abstract.js';

export default class Smart extends Abstract {
  #data = {};

  #errorRestoreHandlers = 'Abstract method not implemented: restoreHandlers';

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this.#data = {
      ...this.#data,
      update,
    };

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
