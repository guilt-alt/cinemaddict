import FiltersView from '@view/filters.js';
import {
  render, RenderPosition, replace, remove,
} from '@utils/render.js';
import { FilterType, UpdateType } from '@utils/const.js';
import filter from '@utils/filters.js';

export default class Filter {
  #filterContainer = null;

  #filtersModel = null;

  #filmsModel = null;

  #currentFilter = null;

  #filterComponent = null;

  constructor(filterContainer, filtersModel, filmsModel) {
    this.#filterContainer = filterContainer;
    this.#filtersModel = filtersModel;
    this.#filmsModel = filmsModel;

    this.#filtersModel.addObserver(this.#handleModelEvent);
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#currentFilter = this.#filtersModel.filter;

    const filters = this.#getFilters();
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView(filters, this.#currentFilter);
    this.#filterComponent.filterChangeHandler = this.#handleFilterChange;

    if (!prevFilterComponent) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterChange = (filterType) => {
    if (filterType === this.#currentFilter) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #getFilters() {
    const { films } = this.#filmsModel;

    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.WATCHED,
        name: 'History',
        count: filter[FilterType.WATCHED](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}
