import Abstract from '@view/abstract.js';

const createFilters = () => `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`;

export default class FiltersView extends Abstract {
  #createFilters = createFilters();

  getTemplate() {
    return this.#createFilters;
  }
}
