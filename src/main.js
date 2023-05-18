import UserProfileView from '@view/profile.js';
import FilmCounterView from '@view/film-counter.js';

import { render, RenderPosition } from '@utils/render.js';
import { AUTHORIZATION, END_POINT } from '@utils/const.js';

import FilmsModel from '@model/films.js';
import FiltersModel from '@model/filters.js';

import BoardPresenter from '@presenter/board.js';
import StatsPresenter from '@presenter/stats.js';
import FilterPresenter from '@presenter/filter.js';

import Api from './js/api';

const api = new Api(END_POINT, AUTHORIZATION);

const mainElement = document.querySelector('main');

const filtersModel = new FiltersModel();
const filmsModel = new FilmsModel(api);

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
    new FilmCounterView(filmsModel.films.length),
    RenderPosition.BEFOREEND,
  );
};

renderHeader();
filterPresenter.init();
filterPresenter.setPresenters(boardPresenter, statsPresenter);
boardPresenter.init();
renderStats();
