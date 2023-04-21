import UserProfileView from '@view/profile.js';
import FilmCounterView from '@view/film-counter.js';
import getFilmData from '@mocks/film.js';

import { FILMS_COUNT } from '@utils/const.js';
import { render, RenderPosition } from '@utils/render.js';

import MainPresenter from '@presenter/main.js';

const films = new Array(FILMS_COUNT).fill().map(getFilmData) ?? [];
const mainPresenter = new MainPresenter(films);

const renderHeader = () => {
  const headerElement = document.querySelector('.header');

  render(
    headerElement,
    new UserProfileView(),
    RenderPosition.BEFOREEND,
  );
};

mainPresenter.init();

const renderStats = () => {
  const footerStatsElement = document.querySelector('.footer__statistics');
  render(
    footerStatsElement,
    new FilmCounterView(films.length),
    RenderPosition.BEFOREEND,
  );
};

renderHeader();
renderStats();
