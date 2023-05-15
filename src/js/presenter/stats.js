import StatsView from '@view/stats.js';
import RankView from '@view/rank.js';
import FiltersView from '@view/statsFilter.js';
import StatsListView from '@view/statsList.js';
import ChartView from '@view/chart.js';

import getUserStats from '@utils/stats.js';
import { StatsFilterType } from '@utils/const.js';
import filter, { getFilters } from '@utils/filterStats.js';
import {
  render, remove, replace, RenderPosition,
} from '@utils/render.js';

export default class Stats {
  #mainElement = null;

  #statsView = null;

  #statsListView = null;

  #chartView = null;

  #filmsModel = null;

  #films = null;

  #currentFilter = StatsFilterType.ALL;

  constructor(mainElement, filmsModel) {
    this.#mainElement = mainElement;
    this.#filmsModel = filmsModel;

    this.#getFilms();
  }

  init() {
    this.#getFilms();
    this.#renderStats();
    this.#renderRank();
    this.#renderFilters();
    this.#renderStatsList();
    this.#renderChart();
  }

  destroy() {
    this.#statsListView = null;
    this.#chartView = null;

    remove(this.#statsView);
  }

  #getFilms() {
    this.#films = filter[this.#currentFilter](this.#filmsModel.films);
  }

  #renderStats() {
    this.#statsView = new StatsView();

    render(this.#mainElement, this.#statsView, RenderPosition.BEFOREEND);
  }

  #renderRank() {
    const { rank } = getUserStats(this.#films);
    const rankView = new RankView(rank);

    render(this.#statsView, rankView, RenderPosition.BEFOREEND);
  }

  #renderFilters() {
    const filters = getFilters();
    const filtersView = new FiltersView(filters, this.#currentFilter);

    filtersView.filterChangeHandler = this.#handleFilterChange;
    render(this.#statsView, filtersView, RenderPosition.BEFOREEND);
  }

  #renderStatsList() {
    const stats = getUserStats(this.#films);
    const prevStatsListView = this.#statsListView;

    this.#statsListView = new StatsListView(stats);

    if (!prevStatsListView) {
      render(this.#statsView, this.#statsListView, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#statsListView, prevStatsListView);
    remove(prevStatsListView);
  }

  #renderChart() {
    const { genres } = getUserStats(this.#films);
    const prevChartView = this.#chartView;

    this.#chartView = new ChartView(genres);

    if (!prevChartView) {
      render(this.#statsView, this.#chartView, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#chartView, prevChartView);
    remove(prevChartView);
  }

  #handleFilterChange = (filterType) => {
    if (filterType === this.#currentFilter) {
      return;
    }

    this.#currentFilter = filterType;

    this.#getFilms();
    this.#renderStatsList();
    this.#renderChart();
  };
}
