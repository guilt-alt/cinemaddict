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
import { render, RenderPosition } from '@utils/render.js';
import { onEscKeyDown } from '@utils/utils.js';

const FILMS_COUNT = 22;
const EXTRA_FILMS_COUNT = 2;
const FILMS_COUNT_PER_STEP = 5;
const ELEMENT_MATCHES = '.film-card__title, .film-card__poster, .film-card__comments';

let renderFilmsCount = FILMS_COUNT_PER_STEP;

const films = new Array(FILMS_COUNT).fill().map(getFilmData);
const filmsPerStep = films.slice(0, FILMS_COUNT_PER_STEP);
const filtersByFilmsState = getCountByFilmsState(films);

const mostRated = films.sort((
  { filmDetails: { rating: b } },
  { filmDetails: { rating: a } },
) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}).slice(0, EXTRA_FILMS_COUNT);

const mostCommented = films.sort((
  { comments: b },
  { comments: a },
) => {
  if (a.length > b.length) {
    return 1;
  }
  if (a.length < b.length) {
    return -1;
  }
  return 0;
}).slice(0, EXTRA_FILMS_COUNT);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('footer');
const footerStatisticsElement = footerElement.querySelector('.footer__statistics');

render(headerElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MainNavigationView(filtersByFilmsState)
  .getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilmListView().getElement(), RenderPosition.BEFOREEND);
render(footerStatisticsElement, new FilmCounterView(films.length)
  .getElement(), RenderPosition.BEFOREEND);

const FilmListViewElement = mainElement.querySelector('.films-list');
const filmMainElement = mainElement.querySelector('.js-film-list-main');
const filmRatedElement = mainElement.querySelector('.js-film-list-rated');
const filmCommentedElement = mainElement.querySelector('.js-film-list-commented');

filmsPerStep.forEach((film) => render(filmMainElement, new FilmCardView(film)
  .getElement(), RenderPosition.BEFOREEND));
render(FilmListViewElement, new MoreButtonView().getElement(), RenderPosition.BEFOREEND);

const showMoreButton = mainElement.querySelector('.films-list__show-more');
const showMoreFilms = (evt) => {
  evt.preventDefault();
  films
    .slice(renderFilmsCount, renderFilmsCount + FILMS_COUNT_PER_STEP)
    .forEach((film) => {
      render(filmMainElement, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND);
    });

  renderFilmsCount += FILMS_COUNT_PER_STEP;

  if (renderFilmsCount >= films.length) {
    showMoreButton.remove();
  }
};
showMoreButton.addEventListener('click', showMoreFilms);

mostRated.forEach((film) => render(filmRatedElement, new FilmCardView(film)
  .getElement(), RenderPosition.BEFOREEND));
mostCommented.forEach((film) => render(filmCommentedElement, new FilmCardView(film)
  .getElement(), RenderPosition.BEFOREEND));

const removeFilmDetails = (filmDetails) => (evt) => {
  if (onEscKeyDown(evt) || evt.target.matches('.film-details__close-btn')) {
    filmDetails.getElement().remove();
    filmDetails.removeElement();
    document.body.classList.remove('hide-overflow');
  }
};

const openFilmDetailsHandler = (evt) => {
  if (evt.target.matches(ELEMENT_MATCHES)) {
    evt.preventDefault();

    const currentFilm = films.find(({ id }) => id === evt.target.parentNode.dataset.id);
    const filmDetails = new FilmDetailsView(currentFilm);

    const removeFilmDetailsHandler = removeFilmDetails(filmDetails);
    render(footerElement, filmDetails.getElement(), RenderPosition.BEFOREEND);

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', removeFilmDetailsHandler, { once: true });
    filmDetails.getElement().addEventListener('click', removeFilmDetailsHandler, { once: true });
  }
};

mainElement.addEventListener('click', openFilmDetailsHandler);
