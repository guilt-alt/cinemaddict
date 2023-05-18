import FiltersView from '@view/filters.js';
import {
  render, RenderPosition, replace, remove,
} from '@utils/render.js';
import { MenuItem, FilterType, UpdateType } from '@utils/const.js';
import filter from '@utils/filters.js';

export default class Filter {
  #isLoading = true;

  #mainElement = null;

  #filterComponent = null;

  #filmsModel = null;

  #filtersModel = null;

  #boardPresenter = null;

  #statsPresenter = null;

  #currentFilter = null;

  #currentMenuItem = MenuItem.FILMS;

  constructor(mainElement, filtersModel, filmsModel) {
    this.#mainElement = mainElement;

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

    this.#filterComponent.menuClickHandler = this.#handleMenuClick;
    this.#filterComponent.filterChangeHandler = this.#handleFilterChange;

    if (!prevFilterComponent) {
      render(this.#mainElement, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  setPresenters(boardPresenter, statsPresenter) {
    this.#boardPresenter = boardPresenter;
    this.#statsPresenter = statsPresenter;
  }

  #handleModelEvent = () => {
    this.#isLoading = false;
    this.init();
  };

  #handleMenuClick = (menuItem) => {
    if (this.#isLoading) {
      return;
    }

    if (menuItem === this.#currentMenuItem) {
      return;
    }

    this.#currentMenuItem = menuItem;

    switch (menuItem) {
      case MenuItem.FILMS:
        this.#statsPresenter.destroy();
        this.#boardPresenter.init();
        break;
      case MenuItem.STATS:
        this.#boardPresenter.destroy();
        this.#statsPresenter.init();
        break;
      default:
    }
  };

  #handleFilterChange = (filterType) => {
    if (this.#isLoading) {
      return;
    }

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
