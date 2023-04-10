import { createElement } from '@utils/render.js';

const createMoreButton = () => '<button class="films-list__show-more" type="button">Show more</button>';

export default class MoreButtonView {
  #element = null;

  constructor() {
    this.createMoreButton = createMoreButton();
  }

  getTemplate() {
    return this.createMoreButton;
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
