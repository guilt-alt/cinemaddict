import UserProfileView from '@view/profile.js';
import FilmCounterView from '@view/film-counter.js';
import getFilmData from '@mocks/film.js';

import { FILMS_COUNT } from '@utils/const.js';
import { render, RenderPosition } from '@utils/render.js';

import FiltersModel from '@model/filters.js';
import FilmsModel from '@model/films.js';

import FilterPresenter from '@presenter/filter.js';
import BoardPresenter from '@presenter/board.js';
import StatsPresenter from '@presenter/stats.js';

const mainElement = document.querySelector('main');
const films = new Array(FILMS_COUNT).fill().map(getFilmData) ?? [];

const filtersModel = new FiltersModel();
const filmsModel = new FilmsModel();

filmsModel.films = films;

const renderHeader = () => {
  const headerElement = document.querySelector('.header');

  render(
    headerElement,
    new UserProfileView(),
    RenderPosition.BEFOREEND,
  );
};

const filterPresenter = new FilterPresenter(mainElement, filtersModel, filmsModel);
const boardPresenter = new BoardPresenter(mainElement, filtersModel, filmsModel);
const statsPresenter = new StatsPresenter(mainElement, filmsModel);

const renderStats = () => {
  const footerStatsElement = document.querySelector('.footer__statistics');
  render(
    footerStatsElement,
    new FilmCounterView(films.length),
    RenderPosition.BEFOREEND,
  );
};

renderHeader();
filterPresenter.init();
filterPresenter.setPresenters(boardPresenter, statsPresenter);
boardPresenter.init();
renderStats();
