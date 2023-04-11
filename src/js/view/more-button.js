import Abstarct from '@view/abstract.js';

const createMoreButton = () => '<button class="films-list__show-more" type="button">Show more</button>';

export default class MoreButtonView extends Abstarct {
  #createMoreButton = createMoreButton();

  getTemplate() {
    return this.#createMoreButton;
  }

  setClickHandler(callback) {
    this.callback.click = callback;
    this.getElement().addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.callback.click();
  };
}
