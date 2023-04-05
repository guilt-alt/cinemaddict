import createUserProfile from '@view/profile.js';
import createFilters from '@view/filters.js';
import createFilmList from '@view/film-list.js';
import createMoreButton from '@view/more-button.js';
import createFilmCard from '@view/film-card.js';
import createFilmCounter from '@view/film-counter.js';
import createMainNavigation from '@view/navigation.js';
// import createFilmDetails from '@view/film-details.js';
import getFilmData from '@mocks/film.js';
import getCountByFilmsState from '@mocks/filters.js';

const FILMS_COUNT = 22;
const EXTRA_FILMS_COUNT = 2;
const FILMS_COUNT_PER_STEP = 5;

let renderFilmsCount = FILMS_COUNT_PER_STEP;

const films = new Array(FILMS_COUNT).fill().map(getFilmData);
const filtersByFilmsState = getCountByFilmsState(films);
const filmsPerStep = films.slice(0, FILMS_COUNT_PER_STEP);

const mostRated = films.slice().sort((b, a) => {
  if (a.rating > b.rating) {
    return 1;
  }
  if (a.rating < b.rating) {
    return -1;
  }
  return 0;
}).slice(0, EXTRA_FILMS_COUNT);

const mostCommented = films.slice().sort((b, a) => {
  if (a.comments.length > b.comments.length) {
    return 1;
  }
  if (a.comments.length < b.comments.length) {
    return -1;
  }
  return 0;
}).slice(0, EXTRA_FILMS_COUNT);

const render = (container, content, place, arr) => (arr === undefined
  ? container.insertAdjacentHTML(place, content)
  : arr.map((el) => container.insertAdjacentHTML(place, content(el))));

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('footer');
const footerStatisticsElement = footerElement.querySelector('.footer__statistics');

render(headerElement, createUserProfile(), 'beforeend');
render(mainElement, createMainNavigation(filtersByFilmsState), 'beforeend');
render(mainElement, createFilters(), 'beforeend');
render(mainElement, createFilmList(), 'beforeend');
render(footerStatisticsElement, createFilmCounter(films.length), 'beforeend');
// render(footerElement, createFilmDetails(films[0]), `afterend`);

const filmMainElement = mainElement.querySelector('.js-film-list-main');
const filmRatedElement = mainElement.querySelector('.js-film-list-rated');
const filmCommentedElement = mainElement.querySelector('.js-film-list-commented');

render(filmMainElement, createFilmCard, 'beforeend', filmsPerStep);
render(filmMainElement, createMoreButton(), 'afterend');

const showMoreButton = mainElement.querySelector('.films-list__show-more');
const showMoreFilms = (evt) => {
  evt.preventDefault();
  films
    .slice(renderFilmsCount, renderFilmsCount + FILMS_COUNT_PER_STEP)
    .forEach((film) => {
      render(filmMainElement, createFilmCard(film), 'beforeend');
    });

  renderFilmsCount += FILMS_COUNT_PER_STEP;

  if (renderFilmsCount >= films.length) {
    showMoreButton.remove();
  }
};
showMoreButton.addEventListener('click', showMoreFilms);

render(filmRatedElement, createFilmCard, 'beforeend', mostRated);
render(filmCommentedElement, createFilmCard, 'beforeend', mostCommented);
