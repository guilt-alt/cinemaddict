import { AUTHORIZATION, END_POINT, STORE_NAME } from '@utils/const.js';

import FilmsModel from '@model/films.js';
import FiltersModel from '@model/filters.js';

import BoardPresenter from '@presenter/board.js';
import StatsPresenter from '@presenter/stats.js';
import FilterPresenter from '@presenter/filter.js';

import Api from '@api/api.js';
import Store from '@api/store.js';
import Provider from '@api/provider.js';

const container = {
  main: document.querySelector('main'),
  header: document.querySelector('.header'),
  footer: document.querySelector('.footer__statistics'),
};

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const provider = new Provider(api, store);

const filtersModel = new FiltersModel();
const filmsModel = new FilmsModel(provider);

const filterPresenter = new FilterPresenter(container.main, filtersModel, filmsModel);
const boardPresenter = new BoardPresenter(container, filtersModel, filmsModel);
const statsPresenter = new StatsPresenter(container.main, filmsModel);

filterPresenter.init();
filterPresenter.setPresenters(boardPresenter, statsPresenter);
boardPresenter.init();

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  provider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    import.meta.env.MODE === 'production' ? '/cinemaddict/sw.js' : '/dev-sw.js?dev-sw'
  )
}
