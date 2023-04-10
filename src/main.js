import UserProfileView from '@view/profile.js';
import FiltersView from '@view/filters.js';
import FilmListView from '@view/film-list.js';
import MoreButtonView from '@view/more-button.js';
import FilmCardView from '@view/film-card.js';
import FilmCounterView from '@view/film-counter.js';
import MainNavigationView from '@view/navigation.js';
import FilmDetailsView from '@view/film-details.js';
import getFilmData from '@mocks/film.js';
import getCountByFilmsState from '@mocks/filters.js';
import {
  render, RenderPosition,
  getMostRatedFilms, getMostCommentedFilms,
} from '@utils/render.js';
import { onEscKeyDown } from '@utils/utils.js';

const FILMS_COUNT = 22;
const EXTRA_FILMS_COUNT = 2;
const FILMS_COUNT_PER_STEP = 5;

let renderFilmsCount = FILMS_COUNT_PER_STEP;

const films = new Array(FILMS_COUNT).fill().map(getFilmData) ?? [];
const mainElement = document.querySelector('.main');

const renderHeader = () => {
  const filtersByFilmsState = getCountByFilmsState(films);
  const headerElement = document.querySelector('.header');

  render(
    headerElement,
    new UserProfileView().getElement(),
    RenderPosition.BEFOREEND,
  );
  render(
    mainElement,
    new MainNavigationView(filtersByFilmsState).getElement(),
    RenderPosition.BEFOREEND,
  );
  render(
    mainElement,
    new FiltersView().getElement(),
    RenderPosition.BEFOREEND,
  );
};

const removeFilmDetails = (filmDetails) => (evt) => {
  if (onEscKeyDown(evt) || evt.target.matches('.film-details__close-btn')) {
    filmDetails.getElement().remove();
    filmDetails.removeElement();
    document.body.classList.remove('hide-overflow');
  }
};

const showMoreFilms = (filmContainer, button) => (evt) => {
  evt.preventDefault();

  films
    .slice(renderFilmsCount, renderFilmsCount + FILMS_COUNT_PER_STEP)
    .forEach((film) => render(
      filmContainer,
      new FilmCardView(film).getElement(),
      RenderPosition.BEFOREEND,
    ));

  renderFilmsCount += FILMS_COUNT_PER_STEP;

  if (renderFilmsCount >= films.length) {
    button.getElement().remove();
    button.removeElement();
  }
};

const renderMoreButton = (container, filmContainer) => {
  const moreButtonView = new MoreButtonView();
  render(container, moreButtonView.getElement(), RenderPosition.BEFOREEND);

  const showMoreFilmsHandler = showMoreFilms(filmContainer, moreButtonView);
  moreButtonView.getElement().addEventListener('click', showMoreFilmsHandler);
};

const openFilmDetailsHandler = (evt) => {
  if (evt.target.matches('.film-card__title, .film-card__poster, .film-card__comments')) {
    evt.preventDefault();

    const currentFilm = films.find(({ id }) => id === evt.target.parentNode.dataset.id);
    const filmDetails = new FilmDetailsView(currentFilm);

    const removeFilmDetailsHandler = removeFilmDetails(filmDetails);
    render(document.body, filmDetails.getElement(), RenderPosition.BEFOREEND);

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', removeFilmDetailsHandler, { once: true });
    filmDetails.getElement().addEventListener('click', removeFilmDetailsHandler, { once: true });
  }
};

const renderFilms = () => {
  const filmListView = new FilmListView(films.length);

  const filmsList = filmListView.getElement().querySelector('.films-list');
  const filmMainElement = filmListView.getElement().querySelector('.js-film-list-main');
  const filmRatedElement = filmListView.getElement().querySelector('.js-film-list-rated');
  const filmCommentedElement = filmListView.getElement().querySelector('.js-film-list-commented');

  const filmsPerStep = films.slice(0, FILMS_COUNT_PER_STEP);
  const mostRated = getMostRatedFilms(films, EXTRA_FILMS_COUNT);
  const mostCommented = getMostCommentedFilms(films, EXTRA_FILMS_COUNT);

  render(mainElement, filmListView.getElement(), RenderPosition.BEFOREEND);

  filmsPerStep.forEach((film) => render(
    filmMainElement,
    new FilmCardView(film).getElement(),
    RenderPosition.BEFOREEND,
  ));
  mostRated.forEach((film) => render(
    filmRatedElement,
    new FilmCardView(film).getElement(),
    RenderPosition.BEFOREEND,
  ));
  mostCommented.forEach((film) => render(
    filmCommentedElement,
    new FilmCardView(film).getElement(),
    RenderPosition.BEFOREEND,
  ));

  renderMoreButton(filmsList, filmMainElement);
  filmListView.getElement().addEventListener('click', openFilmDetailsHandler);
};

const renderStats = () => {
  const footerStatsElement = document.querySelector('.footer__statistics');
  render(
    footerStatsElement,
    new FilmCounterView(films.length).getElement(),
    RenderPosition.BEFOREEND,
  );
};

renderHeader();
renderFilms();
renderStats();
