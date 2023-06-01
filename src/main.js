import { AUTHORIZATION, END_POINT } from '@utils/const.js';

import FilmsModel from '@model/films.js';
import FiltersModel from '@model/filters.js';

import BoardPresenter from '@presenter/board.js';
import StatsPresenter from '@presenter/stats.js';
import FilterPresenter from '@presenter/filter.js';

import Api from './js/api';

const container = {
  main: document.querySelector('main'),
  header: document.querySelector('.header'),
  footer: document.querySelector('.footer__statistics'),
};

const api = new Api(END_POINT, AUTHORIZATION);

const filtersModel = new FiltersModel();
const filmsModel = new FilmsModel(api);

const filterPresenter = new FilterPresenter(container.main, filtersModel, filmsModel);
const boardPresenter = new BoardPresenter(container, filtersModel, filmsModel);
const statsPresenter = new StatsPresenter(container.main, filmsModel);

filterPresenter.init();
filterPresenter.setPresenters(boardPresenter, statsPresenter);
boardPresenter.init();
