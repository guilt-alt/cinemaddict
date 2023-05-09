import UserProfileView from '@view/profile.js';
import FilmCounterView from '@view/film-counter.js';
import getFilmData from '@mocks/film.js';

import { FILMS_COUNT } from '@utils/const.js';
import { render, RenderPosition } from '@utils/render.js';

import FiltersModel from '@model/filters.js';
import FilmsModel from '@model/films.js';

import BoardPresenter from '@presenter/board.js';
import FilterPresenter from '@presenter/filter.js';

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

const filterPresenter = new FilterPresenter(document.querySelector('main'), filtersModel, filmsModel);
const boardPresenter = new BoardPresenter(filtersModel, filmsModel);

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
boardPresenter.init();
renderStats();
