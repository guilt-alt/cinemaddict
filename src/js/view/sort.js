import Abstract from '@view/abstract.js';
import { SortType } from '@utils/const.js';

const createSort = () => `<ul class="sort">
  <li><a href="#" data-sort="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" data-sort="${SortType.DATE}" class="sort__button">Sort by date</a></li>
  <li><a href="#" data-sort="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
</ul>`;

export default class SortView extends Abstract {
  #createSort = createSort();

  getTemplate() {
    return this.#createSort;
  }

  set changeSortHandler(callback) {
    this.callback.click = callback;
    this.getElement().addEventListener('click', this.#changeSortHandler);
  }

  #changeSortHandler = (evt) => {
    if (evt.target.tagName === 'A') {
      evt.preventDefault();
      this.callback.click(evt.target.dataset.sort);
    }
  };
}
