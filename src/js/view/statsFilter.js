import Abstract from '@view/abstract.js';

const createStatsFilters = (filters, currentFilter) => {
  const filtersElements = filters.map(({ type, name }) => (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter"
            id="statistic-${type}" value="${type}" ${type === currentFilter ? 'checked' : ''}>
    <label for="statistic-${type}" class="statistic__filters-label">${name}</label>`
  )).join('');

  return (
    `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${filtersElements}
    </form>`
  );
};

export default class StatsFilters extends Abstract {
  #filters = null;

  #currentFilter = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  getTemplate() {
    return createStatsFilters(this.#filters, this.#currentFilter);
  }

  set filterChangeHandler(callback) {
    this.callback.filter = callback;
    this.getElement().addEventListener('change', this.#filterChangeHandler);
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.callback.filter(evt.target.value);
  };
}
